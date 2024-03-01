import efoghlamApi from '../api/efoghlamApi';

export const getComunicacion = async (idDestinatario) => {
  const response = await efoghlamApi.get(
    `http://localhost:4000/api/mensaje/?destinatarios=${idDestinatario}`
  );

  const mensajes = response.data.mensajes.map((comunicacion) => ({
    titulo: comunicacion.titulo,
    cuerpo: comunicacion.cuerpo,
    idRemitente: comunicacion.idRemitente,
    destinatarios: comunicacion.destinatarios,
    fecha: comunicacion.createDtt,
  }));

  return mensajes;
};
