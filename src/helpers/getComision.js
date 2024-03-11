import efoghlamApi from '../api/efoghlamApi';

export const getComision = async () => {
  const response = await efoghlamApi.get('/comision');
  const comisiones = response.data.comisiones.map((comision) => ({
    _id: comision._id,
    nombre: comision.nombre,
    año: comision.año,
    turno: comision.turno,
    alumno: comision.alumno,
  }));
  return comisiones;
};
