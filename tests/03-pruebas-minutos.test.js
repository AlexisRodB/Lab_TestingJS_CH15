const test = require("node:test");
const { revisarQuePasan, revisarQueAtrapan } = require("./utilidades");

test("escribiste mínimo 3 pruebas y pasan con la función correcta", () => {
  revisarQuePasan("calcularMinutos", "calcularMinutos", "correcta", 3);
});

test("atrapan el error: ignora los minutos", () => {
  revisarQueAtrapan("calcularMinutos", "calcularMinutos", "correcta", "ignoraLosMinutos",
    'una versión que solo cuenta horas completas pasa tus pruebas. Prueba un caso con minutos distintos, como "07:45" a "09:10"');
});

test("atrapan el error: resta al revés", () => {
  revisarQueAtrapan("calcularMinutos", "calcularMinutos", "correcta", "restaAlReves",
    "una versión que resta entrada menos salida pasa tus pruebas. ¿Tienes un caso donde el resultado no sea 0?");
});

test("atrapan el error: horas de 100 minutos", () => {
  revisarQueAtrapan("calcularMinutos", "calcularMinutos", "correcta", "horasDeCienMinutos",
    "una versión que multiplica las horas por 100 pasa tus pruebas. Prueba un caso donde cambie la hora, no solo los minutos");
});

test("atrapan el error: siempre responde 60", () => {
  revisarQueAtrapan("calcularMinutos", "calcularMinutos", "correcta", "siempreUnaHora",
    "una versión que siempre retorna 60 pasa tus pruebas. Usa casos con resultados distintos entre sí");
});
