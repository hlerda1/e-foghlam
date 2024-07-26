import efoghlamApi from '../api/efoghlamApi';

export const getAlumnoDato = async () => {
  const response = await efoghlamApi.get(`/auth/usuario/?tutorAsignado[0]=${id}`);
  const { msg } = await response.data;

  const alumnos = msg.map((alumno) => ({
    _id: alumno._id,
    nombre: alumno.nombre,
    apellido: alumno.apellido,
    email: alumno.email,
    dni: alumno.dni,
    fechaNacimiento: alumno.fechaNacimiento,
    rol: alumno.rol,
    tutorAsignado: alumno.tutorAsignado,
  }));

  return alumnos;
};
