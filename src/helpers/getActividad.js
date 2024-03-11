import efoghlamApi from '../api/efoghlamApi';

export const getActividad = async () => {
  const response = await efoghlamApi.get('/actividad');
  const actividades = response.data.actividades.map((actividad) => ({
    _id: actividad._id,
    descripcion: actividad.descripcion,
    tipoActividad: actividad.tipoActividad,
    fechaFin: actividad.fechaFin,
    consigna: actividad.consigna,
    alumnos: actividad.alumnos,
  }));
  return actividades;
};