// Versiones de calcularMinutos para revisar TUS pruebas.
// "correcta" es la misma de tarifas.js; las demás tienen un error escondido.

function partes(hora) {
  const [h, m] = hora.split(":");
  return { h: Number(h), m: Number(m) };
}

module.exports = {
  correcta(entrada, salida) {
    const a = partes(entrada);
    const b = partes(salida);
    return b.h * 60 + b.m - (a.h * 60 + a.m);
  },
  ignoraLosMinutos(entrada, salida) {
    return partes(salida).h * 60 - partes(entrada).h * 60;
  },
  restaAlReves(entrada, salida) {
    const a = partes(entrada);
    const b = partes(salida);
    return a.h * 60 + a.m - (b.h * 60 + b.m);
  },
  horasDeCienMinutos(entrada, salida) {
    const a = partes(entrada);
    const b = partes(salida);
    return b.h * 100 + b.m - (a.h * 100 + a.m);
  },
  siempreUnaHora() {
    return 60;
  },
};
