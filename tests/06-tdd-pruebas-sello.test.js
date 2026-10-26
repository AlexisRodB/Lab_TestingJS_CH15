const test = require("node:test");
const { revisarQuePasan, revisarQueAtrapan } = require("./utilidades");

test("escribiste mínimo 4 pruebas y pasan con tu aplicarSello", () => {
  revisarQuePasan("aplicarSello", "aplicarSello", null, 4);
});

test("atrapan el error: no descuenta nada", () => {
  revisarQueAtrapan("aplicarSello", "aplicarSello", null, "noDescuentaNada",
    "una versión que devuelve el mismo cobro pasa tus pruebas. Usa la fila 6000 carro → 3000 de la tabla");
});

test("atrapan el error: a la moto le descuenta la hora del carro", () => {
  revisarQueAtrapan("aplicarSello", "aplicarSello", null, "siempreDescuentaHoraDeCarro",
    "una versión que siempre resta 3000 pasa tus pruebas. Usa la fila 4500 moto → 3000 de la tabla");
});

test("atrapan el error: el cobro queda negativo", () => {
  revisarQueAtrapan("aplicarSello", "aplicarSello", null, "quedaNegativo",
    "una versión que deja cobros negativos pasa tus pruebas. Usa la fila 0 carro → 0 de la tabla");
});

test("atrapan el error: todo queda gratis", () => {
  revisarQueAtrapan("aplicarSello", "aplicarSello", null, "siempreGratis",
    "una versión que siempre retorna 0 pasa tus pruebas. Necesitas un caso donde el resultado no sea 0");
});
