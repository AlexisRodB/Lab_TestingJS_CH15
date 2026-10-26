const test = require("node:test");
const assert = require("node:assert/strict");
const { tarifas } = require("./utilidades");

test("un carro paga 3000 por hora", () => {
  assert.equal(tarifas().tarifaPorHora("carro"), 3000, 'tarifaPorHora("carro") debería retornar 3000 (¿usaste return?)');
});

test("una moto paga 1500 por hora", () => {
  assert.equal(tarifas().tarifaPorHora("moto"), 1500, 'tarifaPorHora("moto") debería retornar 1500');
});

test("una bicicleta parquea gratis", () => {
  assert.equal(tarifas().tarifaPorHora("bicicleta"), 0, 'tarifaPorHora("bicicleta") debería retornar 0 (cualquier otro vehículo es gratis)');
});

test("una patineta también parquea gratis", () => {
  assert.equal(tarifas().tarifaPorHora("patineta"), 0, 'tarifaPorHora("patineta") debería retornar 0 (cualquier vehículo que no sea carro ni moto)');
});
