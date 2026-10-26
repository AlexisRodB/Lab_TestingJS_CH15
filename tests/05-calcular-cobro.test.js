const test = require("node:test");
const assert = require("node:assert/strict");
const { tarifas, cuerpoDe } = require("./utilidades");

test("un carro de 7:45 a 9:10 paga 6000", () => {
  assert.equal(tarifas().calcularCobro("carro", "07:45", "09:10"), 6000, 'calcularCobro("carro", "07:45", "09:10") debería retornar 6000 (85 min → 2 h × 3000). Si falla, revisa los ejercicios 01 y 02');
});

test("una moto de 8:00 a 8:10 no paga", () => {
  assert.equal(tarifas().calcularCobro("moto", "08:00", "08:10"), 0, 'calcularCobro("moto", "08:00", "08:10") debería retornar 0 (10 minutos son cortesía)');
});

test("un carro todo el día paga el tope", () => {
  assert.equal(tarifas().calcularCobro("carro", "06:00", "18:30"), 24000, 'calcularCobro("carro", "06:00", "18:30") debería retornar 24000 (¿aplicaste aplicarTope?)');
});

test("una moto de 7:00 a 12:20 paga 9000 y una de 6:00 a 21:00 paga su tope", () => {
  const { calcularCobro } = tarifas();
  assert.equal(calcularCobro("moto", "07:00", "12:20"), 9000, 'calcularCobro("moto", "07:00", "12:20") debería retornar 9000 (320 min → 6 h × 1500)');
  assert.equal(calcularCobro("moto", "06:00", "21:00"), 12000, 'calcularCobro("moto", "06:00", "21:00") debería retornar 12000 (tope de la moto)');
});

test("una bicicleta nunca paga", () => {
  assert.equal(tarifas().calcularCobro("bicicleta", "07:00", "18:00"), 0, 'calcularCobro("bicicleta", "07:00", "18:00") debería retornar 0');
});

test("reutiliza las cuatro funciones en vez de repetir cuentas", () => {
  const codigo = cuerpoDe("calcularCobro");
  for (const funcion of ["calcularMinutos", "horasACobrar", "tarifaPorHora", "aplicarTope"]) {
    assert.match(codigo, new RegExp(`\\b${funcion}\\s*\\(`), `calcularCobro debería llamar a ${funcion}(...) en vez de repetir esa cuenta`);
  }
});
