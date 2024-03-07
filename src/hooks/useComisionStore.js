import { useDispatch, useSelector } from 'react-redux';
import {
    onSetActiveComision,
    onAddNewComision,
    onUpdateComision,
    onDeleteComision,
    onLoadComisiones,
} from '../store/comisiones/comisionSlice';
import efoghlamApi from '../api/efoghlamApi';
import Swal from 'sweetalert2';


export const useComisionStore = () => {
  const dispatch = useDispatch();
  const { comisiones, activeComision } = useSelector((state) => state.comision);
  const setActiveComision = (newComision) => {
    dispatch(onSetActiveComision(newComision));
  };

  const startSavingComision = async (newComision) => {
    try {
      if (newComision._id) {
        await efoghlamApi.put(`/comision/${newComision._id}`, newComision);

        dispatch(onUpdateComision({ ...newComision }));
        return;
      }
      const { data } = await efoghlamApi.post('/comision', newComision);
      console.log(data);
      dispatch(onAddNewComision({ ...newComision, _id: data.comision._id }));
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  };

  const startDeletingComision = async () => {
    console.log(activeComision)
    try {
      await efoghlamApi.delete(`/comision/${activeComision._id}`);
      dispatch(onDeleteComision());
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  };

  //Posiblemente no se necesite al ser para convertir eventos.
  const startLoadingComisiones = async () => {
    try {
      const { data } = await efoghlamApi.get('/comision');
      const comisiones = (data.comisiones);      
      dispatch(onLoadComisiones(comisiones));
      console.log(comisiones)
    } catch (error) {
      console.log('Error al cargar eventos');
      console.log(error);
    }
  };

  return {
    activeComision,
    comisiones,
    // hasActividadSelected: !!activeComision,

    startDeletingComision,
    setActiveComision,
    startSavingComision,
    startLoadingComisiones,
  };
};
