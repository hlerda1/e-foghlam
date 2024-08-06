import efoghlamApi from '../api/efoghlamApi';

export const getCurso = async (id) => {
  const response = await efoghlamApi.get(`/curso/?_id=${id}`);
  const cursos = response.data.cursos.map((curso) => ({
    _id: curso._id,
    descripcion: curso.descripcion,
    modalidad: curso.modalidad,
    materias: curso.materias,
    comision: curso.comision,
  }));
  return cursos;
};


