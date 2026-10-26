// Versiones de aplicarSello con un error escondido, para revisar TUS pruebas.
// La versión correcta es la tuya (Ejercicio 07).

module.exports = {
  noDescuentaNada(cobro) {
    return cobro;
  },
  siempreDescuentaHoraDeCarro(cobro) {
    return Math.max(cobro - 3000, 0);
  },
  quedaNegativo(cobro, vehiculo) {
    return cobro - (vehiculo === "moto" ? 1500 : 3000);
  },
  siempreGratis() {
    return 0;
  },
};
