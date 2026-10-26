const test = require("node:test");
const { revisarQuePasan, revisarQueAtrapan } = require("./utilidades");

test("escribiste mínimo 4 pruebas y pasan con la función correcta", () => {
  revisarQuePasan("aplicarTope", "aplicarTope", "correcta", 4);
});

test("atrapan el error: no aplica ningún tope", () => {
  revisarQueAtrapan("aplicarTope", "aplicarTope", "correcta", "sinTope",
    "una versión sin tope pasa tus pruebas. Prueba un cobro más alto que el tope, como 39000 para un carro");
});

test("atrapan el error: siempre cobra el tope", () => {
  revisarQueAtrapan("aplicarTope", "aplicarTope", "correcta", "siempreElTope",
    "una versión que siempre retorna el tope pasa tus pruebas. Prueba un cobro más bajo que el tope, como 6000");
});

test("atrapan el error: la moto usa el tope del carro", () => {
  revisarQueAtrapan("aplicarTope", "aplicarTope", "correcta", "motoConTopeDeCarro",
    "una versión donde la moto tiene tope de 24000 pasa tus pruebas. Prueba una moto con un cobro entre 12000 y 24000");
});

test("atrapan el error: los topes están cruzados", () => {
  revisarQueAtrapan("aplicarTope", "aplicarTope", "correcta", "topesCruzados",
    "una versión con el tope del carro en 12000 pasa tus pruebas. Prueba un carro con un cobro entre 12000 y 24000");
});
