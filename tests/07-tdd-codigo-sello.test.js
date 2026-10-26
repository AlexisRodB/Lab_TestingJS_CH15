const test = require("node:test");
const assert = require("node:assert/strict");
const { tarifas, cuerpoDe } = require("./utilidades");

test("un carro con cobro de 6000 paga 3000 con sello", () => {
  assert.equal(tarifas().aplicarSello(6000, "carro"), 3000, 'aplicarSello(6000, "carro") debería retornar 3000 (¿usaste return?)');
});

test("una moto con cobro de 4500 paga 3000 con sello", () => {
  assert.equal(tarifas().aplicarSello(4500, "moto"), 3000, 'aplicarSello(4500, "moto") debería retornar 3000 (a la moto se le descuenta 1500)');
});

test("un cobro igual a una hora queda en 0", () => {
  const { aplicarSello } = tarifas();
  assert.equal(aplicarSello(3000, "carro"), 0, 'aplicarSello(3000, "carro") debería retornar 0');
  assert.equal(aplicarSello(1500, "moto"), 0, 'aplicarSello(1500, "moto") debería retornar 0');
});

test("el cobro nunca queda negativo", () => {
  const { aplicarSello } = tarifas();
  assert.equal(aplicarSello(0, "carro"), 0, 'aplicarSello(0, "carro") debería retornar 0, no un número negativo');
  assert.equal(aplicarSello(1000, "moto"), 0, 'aplicarSello(1000, "moto") debería retornar 0, no un número negativo');
});

test("usa tarifaPorHora en vez de escribir los precios otra vez", () => {
  assert.match(cuerpoDe("aplicarSello"), /\btarifaPorHora\s*\(/, "aplicarSello debería llamar a tarifaPorHora(vehiculo) para saber cuánto vale una hora");
});
