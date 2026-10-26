// Versiones de aplicarTope para revisar TUS pruebas.
// "correcta" es la misma de tarifas.js; las demás tienen un error escondido.

module.exports = {
  correcta(cobro, vehiculo) {
    const tope = vehiculo === "moto" ? 12000 : 24000;
    return cobro > tope ? tope : cobro;
  },
  sinTope(cobro) {
    return cobro;
  },
  siempreElTope(cobro, vehiculo) {
    return vehiculo === "moto" ? 12000 : 24000;
  },
  motoConTopeDeCarro(cobro) {
    return cobro > 24000 ? 24000 : cobro;
  },
  topesCruzados(cobro, vehiculo) {
    const tope = vehiculo === "moto" ? 24000 : 12000;
    return cobro > tope ? tope : cobro;
  },
};
