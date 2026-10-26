// Ayudas para el calificador.
// 1. Leer tu código sin comentarios (tests de estructura).
// 2. Correr TUS pruebas de Jest contra la función correcta y contra
//    versiones con errores escondidos, para saber si tus pruebas los atrapan.
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const RAIZ = path.join(__dirname, "..");
const CARPETA = path.join(RAIZ, "parqueadero");
const JEST = process.env.JEST_BIN || path.join(RAIZ, "node_modules", "jest", "bin", "jest.js");

function leer(archivo) {
  const ruta = path.join(CARPETA, archivo);
  if (!fs.existsSync(ruta)) throw new Error(`No encuentro parqueadero/${archivo}: no le cambies el nombre ni la carpeta`);
  return fs.readFileSync(ruta, "utf8");
}

function codigoSinComentarios(archivo) {
  return leer(archivo).replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

// El cuerpo de una función de tarifas.js, sin comentarios
function cuerpoDe(nombre) {
  const codigo = codigoSinComentarios("tarifas.js");
  const inicio = codigo.search(new RegExp(`function\\s+${nombre}\\s*\\(`));
  if (inicio < 0) throw new Error(`No encuentro la función ${nombre} en tarifas.js: no le cambies el nombre`);
  const siguiente = codigo.slice(inicio + 1).search(/\n(function\s|module\.exports)/);
  return siguiente < 0 ? codigo.slice(inicio) : codigo.slice(inicio, inicio + 1 + siguiente);
}

// Tus funciones, cargadas de cero en cada llamada
function tarifas() {
  const ruta = path.join(CARPETA, "tarifas.js");
  delete require.cache[require.resolve(ruta)];
  try {
    return require(ruta);
  } catch (error) {
    if (error.name === "SyntaxError") {
      throw new Error(`tarifas.js tiene un error de sintaxis (SyntaxError: ${error.message}): revisa paréntesis, llaves y comillas`);
    }
    throw new Error(`tarifas.js se detuvo al cargar: ${error.message}`);
  }
}

const memoria = new Map();

// Corre las pruebas de tu grupo `grupo` (por ejemplo "calcularMinutos").
// `version`: nombre de una versión de tests/versiones/<funcion>.js que
// reemplaza tu función, o null para usar tu propio código.
function correrMisPruebas(grupo, funcion, version) {
  const llave = `${grupo}|${funcion}|${version}`;
  if (memoria.has(llave)) return memoria.get(llave);

  if (!fs.existsSync(JEST)) {
    throw new Error("No encuentro Jest: corre npm install en la carpeta del repo");
  }
  tarifas();

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mis-pruebas-"));
  let resultado;
  try {
    fs.writeFileSync(path.join(tmp, "tarifas.test.js"), leer("tarifas.test.js"));
    fs.writeFileSync(path.join(tmp, "tarifas-estudiante.js"), leer("tarifas.js"));

    let puente = 'module.exports = require("./tarifas-estudiante");\n';
    if (version) {
      fs.copyFileSync(path.join(__dirname, "versiones", `${funcion}.js`), path.join(tmp, "versiones.js"));
      puente =
        'const tuyas = require("./tarifas-estudiante");\n' +
        `module.exports = { ...tuyas, ${funcion}: require("./versiones")[${JSON.stringify(version)}] };\n`;
    }
    fs.writeFileSync(path.join(tmp, "tarifas.js"), puente);

    const salida = path.join(tmp, "resultado-jest.json");
    const config = JSON.stringify({ rootDir: tmp, testEnvironment: "node" });
    const proceso = spawnSync(
      process.execPath,
      [JEST, "--config", config, "--ci", "--runInBand", "--json", "--outputFile", salida,
        "--testNamePattern", `^${grupo} `],
      { cwd: tmp, encoding: "utf8", timeout: 20000 }
    );

    if (proceso.error && proceso.error.code === "ETIMEDOUT") {
      resultado = { error: "tus pruebas tardaron demasiado: revisa si hay un ciclo infinito" };
    } else if (!fs.existsSync(salida)) {
      resultado = { error: `Jest no pudo correr tus pruebas: ${(proceso.stderr || "").trim().split("\n")[0]}` };
    } else {
      const json = JSON.parse(fs.readFileSync(salida, "utf8"));
      const archivo = json.testResults[0] || {};
      if (json.numRuntimeErrorTestSuites > 0 || archivo.testExecError) {
        const lineas = (archivo.message || "").replace(/\x1b\[[0-9;]*m/g, "").split("\n").map((l) => l.trim());
        const detalle = (lineas.find((l) => /Error/.test(l) && !/Test suite failed/.test(l)) || "").replace(/\S*tarifas\.test\.js: /, "");
        resultado = { error: `tarifas.test.js no se pudo ejecutar${detalle ? ` (${detalle})` : ""}: revisa paréntesis, llaves y comillas` };
      } else {
        const delGrupo = (archivo.assertionResults || []).filter((r) => r.status === "passed" || r.status === "failed");
        resultado = {
          total: delGrupo.length,
          pasadas: delGrupo.filter((r) => r.status === "passed").length,
          fallidas: delGrupo.filter((r) => r.status === "failed").map((r) => r.title),
        };
      }
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }

  memoria.set(llave, resultado);
  return resultado;
}

// Revisa que tu grupo tenga pruebas y que todas pasen con la versión correcta
function revisarQuePasan(grupo, funcion, version, minimo) {
  const r = correrMisPruebas(grupo, funcion, version);
  if (r.error) throw new Error(r.error);
  if (r.total < minimo) {
    throw new Error(`En el grupo ${grupo} hay ${r.total} prueba(s): escribe mínimo ${minimo} (dentro de describe("${grupo}", ...))`);
  }
  if (r.fallidas.length > 0) {
    if (version === "correcta") {
      throw new Error(`Con la ${funcion} correcta, falla tu prueba "${r.fallidas[0]}": revisa el valor que esperas con toBe`);
    }
    throw new Error(`Con tu ${funcion}, falla tu prueba "${r.fallidas[0]}": en TDD es normal al empezar. Escribe el código (Ejercicio 07) hasta verla en verde; si ya lo escribiste, revisa la cuenta de la prueba`);
  }
}

// Revisa que tus pruebas atrapen una versión con error (alguna debe fallar)
function revisarQueAtrapan(grupo, funcion, correcta, conError, pista) {
  const inicial = correrMisPruebas(grupo, funcion, correcta);
  if (!inicial.error && inicial.total === 0) {
    throw new Error(`Todavía no hay pruebas dentro de describe("${grupo}", ...): escríbelas primero`);
  }
  revisarQuePasan(grupo, funcion, correcta, 1);
  const r = correrMisPruebas(grupo, funcion, conError);
  if (r.error) throw new Error(r.error);
  if (r.fallidas.length === 0) {
    throw new Error(`Tus pruebas de ${funcion} no atrapan este error: ${pista}`);
  }
}

module.exports = { codigoSinComentarios, cuerpoDe, tarifas, correrMisPruebas, revisarQuePasan, revisarQueAtrapan };
