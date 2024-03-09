import { useDispatch, useSelector } from 'react-redux';
import {
    onSetActiveActividad,
    onAddNewActividad,
    onUpdateActividad,
    onDeleteActividad,
    onLoadActividades,
} from '../store/actividades/actividadSlice';
import efoghlamApi from '../api/efoghlamApi';
import { filtrarActividadAlumno } from '../helpers/filtrarActividadAlumno';
import Swal from 'sweetalert2';


export const useActividadStore = () => {
  const dispatch = useDispatch();
  const { actividades, activeActividad } = useSelector((state) => state.actividad);
  // const { actividades } = useSelector((state) => state);
  const setActiveActividad = (newActividad) => {
    dispatch(onSetActiveActividad(newActividad));
  };

  const startSavingActividad = async (newActividad) => {
    try {
      if (newActividad._id) {
        await efoghlamApi.put(`/actividad/${newActividad._id}`, newActividad);

        dispatch(onUpdateActividad({ ...newActividad }));
        return;
      }
      const { data } = await efoghlamApi.post('/actividad', newActividad);
      console.log(data);
      dispatch(onAddNewActividad({ ...newActividad, _id: data.actividad._id }));
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  };

  const startDeletingActividad = async () => {
    console.log(activeActividad)
    try {
      await efoghlamApi.delete(`/actividad/${activeActividad._id}`);
      dispatch(onDeleteActividad());
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  };

  //Posiblemente no se necesite al ser para convertir eventos.
  const startLoadingActividades = async () => {
    try {
      const { data } = await efoghlamApi.get('/actividad');
      const actividades = (data.actividades);      
      dispatch(onLoadActividades(actividades));
      console.log(actividades)
    } catch (error) {
      console.log('Error al cargar eventos');
      console.log(error);
    }
  };

  const startLoadingActividadesAlumno = async (id) => {
    try {
      const { data } = await efoghlamApi.get('/actividad');
      const actividades = filtrarActividadAlumno(data.actividades, id);
      // const actividades = (data.actividades);    

      console.log(actividades);
      dispatch(onLoadActividades(actividades));
    } catch (error) {
      console.log('Error al cargar Actividades');
      console.log(error);
    }
  };

  return {
    activeActividad,
    actividades,
    // hasActividadSelected: !!activeActividad,

    startDeletingActividad,
    setActiveActividad,
    startSavingActividad,
    startLoadingActividades,
    startLoadingActividadesAlumno
  };
};
