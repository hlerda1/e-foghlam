import { useDispatch, useSelector } from 'react-redux';
import {
    onSetActiveCalificacion,
    onAddNewCalificacion,
    onUpdateCalificacion,
    onDeleteCalificacion,
    onLoadCalificacion,
} from '../store/calificaciones/calificacionSlice';
import efoghlamApi from '../api/efoghlamApi';
import Swal from 'sweetalert2';


export const useCalificacionStore = () => {
  const dispatch = useDispatch();
  const { calificaciones, activeCalificacion } = useSelector((state) => state.calificacion);

 
  const setActiveCalificacion = (newCalificacion) => {
    dispatch(onSetActiveCalificacion(newCalificacion));
  };


  const startSavingCalificacion = async (newCalificacion) => {

    try {
      if (newCalificacion._id) {
        await efoghlamApi.put(`/calificacion/${newCalificacion._id}`, newCalificacion);

        dispatch(onUpdateCalificacion({ ...newCalificacion }));
        Swal.fire('Actualizada!', 'La calificacin ha sido actualizada con éxito.', 'info');
        return;
      }
      const { data } = await efoghlamApi.post('/calificacion', newCalificacion);
      console.log(data);
      dispatch(onAddNewCalificacion({ ...newCalificacion, _id: data.calificacion._id }));
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
     
    }
   
  };

  const startDeletingCalificacion = async (calificacion) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: `Está a punto de eliminar la calficacion de ${calificacion.valor}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await efoghlamApi.delete(`/calificacion/${turno._id}`);
        dispatch(onDeleteCalificacion(calificacion._id));
        Swal.fire('Eliminada!', 'La calificacion ha sido eliminada.', 'success');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  };

  const startLoadingCalificacion = async () => {
    try {
      const { data } = await efoghlamApi.get('/calificacion');
      const calificaciones = (data.calificaciones);      
      dispatch(onLoadCalificacion(calficaciones));
     
    } catch (error) {
      console.log('Error al cargar calificaciones');
      console.log(error);
    }
  };

  return {
    activeCalificacion,
    calificaciones,
    startDeletingCalificacion,
    setActiveCalificacion,
    startSavingCalificacion,
    startLoadingCalificacion,
  };
};
