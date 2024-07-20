import efoghlamApi from '../api/efoghlamApi';

export const getUsuarioDato = async (id) => {
  const response = await efoghlamApi.get(`/auth/usuario/?_id=${id}`);
  const { msg } = await response.data;

  const usuarios = msg.map((img) => ({
    _id: img._id,
    nombre: img.nombre,
    apellido: img.apellido,
    email: img.email,
    dni: img.dni,
    fechaNacimiento: img.fechaNacimiento,
    rol: img.rol,
  }));

  return usuarios;
};