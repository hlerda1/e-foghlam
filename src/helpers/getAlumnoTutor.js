import efoghlamApi from '../api/efoghlamApi';
import { filtrarAlumnosTutor } from './filtrarAlumnosTutor';

export const getAlumnoTutor = async (id) => {
  const response = await efoghlamApi.get('/auth/usuario/?rol=alumno');
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

  const alumnosTutor = filtrarAlumnosTutor (alumnos, id)

  return alumnosTutor;
};
