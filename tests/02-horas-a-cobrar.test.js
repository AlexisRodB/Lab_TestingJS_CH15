const test = require("node:test");
const assert = require("node:assert/strict");
const { tarifas, codigoSinComentarios } = require("./utilidades");

test("10 minutos son gratis y 16 se cobran como 1 hora", () => {
  const { horasACobrar } = tarifas();
  assert.equal(horasACobrar(10), 0, "horasACobrar(10) debería retornar 0 (cortesía)");
  assert.equal(horasACobrar(16), 1, "horasACobrar(16) debería retornar 1 (hora o fracción: ¿redondeas hacia arriba?)");
});

test("15 minutos exactos son gratis y 30 se cobran como 1 hora", () => {
  const { horasACobrar } = tarifas();
  assert.equal(horasACobrar(15), 0, "horasACobrar(15) debería retornar 0 (15 o menos es cortesía)");
  assert.equal(horasACobrar(30), 1, "horasACobrar(30) debería retornar 1 (media hora ya se cobra completa)");
});

test("61 minutos se cobran como 2 horas", () => {
  assert.equal(tarifas().horasACobrar(61), 2, "horasACobrar(61) debería retornar 2 (Math.floor redondea hacia abajo, Math.ceil hacia arriba)");
});

test("150 minutos se cobran como 3 horas", () => {
  assert.equal(tarifas().horasACobrar(150), 3, "horasACobrar(150) debería retornar 3");
});

test("arreglaste el código sin tocar las pruebas", () => {
  const pruebas = codigoSinComentarios("tarifas.test.js").replace(/\s+/g, "");
  const originales = [
    "expect(horasACobrar(10)).toBe(0)",
    "expect(horasACobrar(15)).toBe(0)",
    "expect(horasACobrar(16)).toBe(1)",
    "expect(horasACobrar(61)).toBe(2)",
    "expect(horasACobrar(150)).toBe(3)",
  ];
  for (const linea of originales) {
    assert.ok(pruebas.includes(linea), `Cambiaste o borraste la prueba ${linea}: déjala como estaba, el error está en el código`);
  }
  assert.equal(tarifas().horasACobrar(16), 1, "horasACobrar(16) debería retornar 1: corrige el código, no la prueba");
});
