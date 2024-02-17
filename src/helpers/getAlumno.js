import efoghlamApi from '../api/efoghlamApi';

export const getAlumno = async () => {
  const response = await efoghlamApi.get('/auth/usuario/?rol=alumno');
  const { msg } = await response.data;

  const alumnos = msg.map((img) => ({
    _id: img._id,
    nombre: img.nombre,
    apellido: img.apellido,
    email: img.email,
    dni: img.dni,
    fechaNacimiento: img.fechaNacimiento,
    rol: img.rol,
  }));

  return alumnos;
};
