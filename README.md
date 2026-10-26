# 🅿️ Lab de pruebas · Parqueadero La Esquina

Generation Colombia · Cohorte 15 · JavaScript para la web · Taller calificable

---

## 🧭 ¿Qué es esto?

### La situación

Mariela administra el **Parqueadero La Esquina**, en el centro de Bogotá.

El mes pasado, un cambio en el sistema empezó a cobrar 0 horas a quien se quedaba 16 minutos. Nadie se dio cuenta en tres semanas. ¿Cuántos pesos se perdieron?

Mariela no quiere que vuelva a pasar. Hoy tú escribes las **pruebas** que cuidan las reglas del cobro.

### Lo que practicas

Es lo mismo que hicimos en clase con Café Origen, ahora en otro negocio:

| En Café Origen | En el parqueadero |
|---|---|
| `negocio.js` | `parqueadero/tarifas.js` |
| `negocio.test.js` | `parqueadero/tarifas.test.js` |
| El error de Andrés (`>` por `>=`) | El error del cobro por hora (Ejercicio 02) |
| El descuento de oficina con TDD | El sello de la panadería con TDD (Ejercicios 06 y 07) |

### Las reglas del parqueadero

| Regla | Valor |
|---|---|
| Cortesía | 15 minutos o menos no pagan |
| Cobro | Por hora o fracción: 16 minutos ya son 1 hora |
| Tarifa por hora | Carro $3.000 · Moto $1.500 · Bicicleta gratis |
| Tope del día | Carro $24.000 · Moto $12.000 |
| Sello de la panadería | Descuenta 1 hora; nunca queda negativo |

### La calificación es automática

Cada vez que subes tu código, GitHub corre unos **tests** y en pocos minutos ves tu nota de **0.0 a 5.0** y qué te falta.

En este taller pasa algo nuevo: **también se califican TUS pruebas.**

### ¿Qué es un test?

**Definición técnica:** un test es código que llama una función con datos fijos y compara lo que devuelve con lo que se esperaba.

**En la vida real:** es como el inspector que revisa la báscula del mercado con una pesa de 1 kilo: si marca otra cosa, la báscula está mal.

### ¿Cómo se califican tus pruebas?

El calificador corre tus pruebas dos veces:

1. Contra la función **correcta**: todas tus pruebas deben pasar.
2. Contra **versiones con errores escondidos** (por ejemplo, una que se olvida de los minutos): alguna de tus pruebas debe fallar.

Si una versión con error pasa todas tus pruebas, tus pruebas no la vieron. El mensaje te dice qué caso te faltó.

---

## 📋 Los 7 ejercicios

Todo pasa en dos archivos de la carpeta `parqueadero/`. El enunciado de cada ejercicio está en `tarifas.js`, encima de su función.

| # | Qué haces | Dónde escribes | Función |
|---|---|---|---|
| 01 | Haces pasar pruebas que ya existen | `tarifas.js` | `tarifaPorHora` |
| 02 | Depuras un error **sin tocar la prueba** | `tarifas.js` | `horasACobrar` |
| 03 | Escribes tus pruebas (mínimo 3) | `tarifas.test.js` | `calcularMinutos` |
| 04 | Escribes tus pruebas (mínimo 4) | `tarifas.test.js` | `aplicarTope` |
| 05 | Juntas las reglas y haces pasar sus pruebas | `tarifas.js` | `calcularCobro` |
| 06 | TDD: **primero** las pruebas (mínimo 4) | `tarifas.test.js` | `aplicarSello` |
| 07 | TDD: **después** el código | `tarifas.js` | `aplicarSello` |

> Hazlos en orden. El 05 usa lo que hiciste en el 01 y el 02, y el 06 y el 07 van juntos.

---

## 🍴 Paso 1 · Fork

### ¿Qué es un fork?

**Definición técnica:** un fork es una copia de un repositorio de otra persona dentro de tu cuenta de GitHub. Puedes cambiarla sin afectar el original.

**En la vida real:** es como sacarle fotocopia al cuaderno de una compañera: escribes en tu copia y el de ella queda igual.

### Cómo hacerlo

1. Abre el repositorio de la profe en GitHub.
2. Arriba a la derecha, haz clic en **Fork**.
3. Deja el nombre como está y haz clic en **Create fork**.

### ¿Quedó bien?

Arriba a la izquierda debe decir **tu-usuario / Lab_TestingJS_CH15** y, debajo, "forked from…".

---

## 💻 Paso 2 · Clone

1. En **tu** fork, haz clic en el botón verde **Code** y copia la URL.
2. En VS Code abre la terminal (**Terminal → New Terminal**).
3. Escribe, cambiando la URL por la tuya:

```bash
git clone https://github.com/TU-USUARIO/Lab_TestingJS_CH15.git
cd Lab_TestingJS_CH15
code .
```

### Instalar Jest

Este taller usa Jest, igual que la clase. En la terminal, **dentro de la carpeta del repo**:

```bash
npm install
```

Tarda menos de un minuto. Al final aparece la carpeta `node_modules`. No la subas: el `.gitignore` ya la ignora.

---

## ✍️ Paso 3 · Resolver

### Las tres reglas de oro

1. **No cambies los nombres** de las funciones ni de los grupos `describe`.
2. **No borres** el `module.exports` del final de `tarifas.js`.
3. Las funciones **retornan** su resultado con `return`.

### La forma de una prueba

Así se escribe una prueba dentro de un grupo. Este ejemplo **no** resuelve ningún ejercicio:

```js
describe("nombreDeLaFuncion", () => {
    test("frase que dice qué se espera", () => {
        expect(nombreDeLaFuncion(datoDeEntrada)).toBe(resultadoEsperado);
    });
});
```

- `test` necesita un nombre que se lea como una frase y una función flecha.
- `toBe` compara números, textos y `true`/`false`.

### Piensa en las fronteras

Las mejores pruebas están donde una regla cambia: justo en el tope, justo debajo, un carro y una moto. Es lo que hicimos con las 6 y las 7 de la mañana en Café Origen.

---

## 🧪 Paso 4 · Probar en tu computador

Hay **dos** comandos, y sirven para cosas distintas.

### `npm test` · Tus pruebas con Jest

```bash
npm test
```

Corre las pruebas de `tarifas.test.js`, igual que en clase. Al empezar verás muchas en rojo: es el punto de partida.

### `npm run nota` · Tu nota

```bash
npm run nota
```

Corre el calificador, el mismo que usa GitHub. Para ver solo un ejercicio:

```bash
npm run nota -- 03
```

### Cómo leer la nota

- ✅ el ejercicio está completo.
- 🟡 vas bien, pero faltan tests.
- ❌ todavía no pasa ninguno.

Debajo de cada ✗ hay una pista. Léela antes de cambiar código.

---

## 📦 Paso 5 · Subir tu código

```bash
git add .
git commit -m "Resuelvo los ejercicios 01 y 02"
git push
```

- `git add .` mete tus cambios en la caja.
- `git commit -m "..."` cierra la caja y le pone una etiqueta.
- `git push` envía la caja a tu fork en GitHub.

Puedes subir cuantas veces quieras.

---

## 📬 Paso 6 · Pull Request (solo UNO)

### ¿Qué es un Pull Request?

**Definición técnica:** un Pull Request (PR) es una solicitud para que el dueño de un repositorio revise los cambios de tu fork.

**En la vida real:** es como radicar un documento en una oficina: lo entregas una vez, y después le puedes agregar páginas sin volver a radicar.

### Cómo abrirlo

1. En tu fork, haz clic en **Contribute → Open pull request**.
2. Revisa que vaya hacia el repositorio de **la profe**.
3. En el título escribe tu **nombre completo**.
4. Haz clic en **Create pull request**.

Abre **un solo** PR. Cada `git push` lo actualiza solo.

---

## 🎯 Paso 7 · Ver tu nota

En pocos minutos aparece en tu PR:

- Un **comentario** con tu nota y una tabla por ejercicio.
- Una **etiqueta** `Nota X.X`.
- Un enlace **"Ver qué falta por corregir"** con los mensajes de cada test.

Para subir la nota: corrige, haz `git push` y espera. El comentario se actualiza solo.

### Ojo con la fecha límite

Si la profe pone una fecha de cierre, después de esa hora los `push` ya no cambian tu nota. Si abres tu primer PR después del cierre, queda con la etiqueta `⏰ Fuera de plazo`.

---

## 🚫 Archivos que NO debes modificar

- La carpeta `tests/` (el calificador).
- La carpeta `scripts/`.
- La carpeta `.github/`.
- `package.json` y `package-lock.json`.

Si los modificas, tu PR queda con la etiqueta `⚠️ Revisar` y la profe lo revisa a mano. Tu nota se calcula igual con los archivos originales.

---

## 🆘 Errores frecuentes

### `'npm' no se reconoce como un comando…`

No tienes Node.js instalado, o la terminal se abrió antes de instalarlo. Instálalo, cierra VS Code y ábrelo de nuevo.

### `No encuentro Jest: corre npm install…`

Te faltó el `npm install` del Paso 2, o lo corriste en otra carpeta.

### "Tu función retorna undefined" o `Received: undefined`

A tu función le falta el `return`.

### "No encuentro tu función"

Le cambiaste el nombre o borraste el `module.exports`.

### "En el grupo … hay 0 prueba(s)"

Tus pruebas deben ir **dentro** de las llaves de su `describe`, con el nombre del grupo tal como viene.

### "Con la … correcta, falla tu prueba …"

El valor que esperas en `toBe` está mal. Haz la cuenta a mano con las reglas del parqueadero.

### "Tus pruebas de … no atrapan este error"

Tus pruebas pasan con una versión que tiene un error. Lee la pista: dice qué caso te falta.

### "Cambiaste o borraste la prueba …" (Ejercicio 02)

Deja las pruebas de `horasACobrar` como estaban. El error está en el código.

### "tarifas.test.js no se pudo ejecutar"

Hay un error de sintaxis en tu archivo de pruebas. Revisa que cada `test(` cierre con `});`.

### Error de sintaxis (SyntaxError) en `tarifas.js`

Revisa paréntesis, llaves y comillas. Un error ahí afecta a todos los ejercicios.

### "Please tell me who you are"

Git no sabe quién eres. Escribe, con tus datos:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"
```

### Error 403 al hacer `git push`

Clonaste el repo de la profe en lugar de tu fork. Vuelve al Paso 2 y clona **tu** fork.

---

> © 2026 Ana Alvarado · Educadora Tech & Desarrolladora Full Stack · Todos los derechos reservados · linkedin.com/in/ana-alvarado-instructora-full-stack
