import efoghlamApi from '../api/efoghlamApi';

export const getUsuario = async (idUsuario) => {
  const response = await efoghlamApi.get(
    `http://localhost:4000/auth/api/usuario/?_id=${idUsuario}`
  );

  const usuario = response.data.usuario.map((usuario) => ({
    _id: usuario._id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    dni: usuario.dni,
    fechaNacimiento: usuario.fechaNacimiento,
    rol: usuario.rol,
  }));

  return usuario;
};
