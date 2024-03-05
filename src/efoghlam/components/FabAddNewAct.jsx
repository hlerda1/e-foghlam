import { addHours } from 'date-fns';
import { useActividadStore } from '../../hooks/useActividadStore';
import { useUiStore } from '../../hooks/useUiStore';

export const FabAddNewAct = () => {
  const { openActModal } = useUiStore();
  const { setActiveActividad } = useActividadStore();

  const handleClickNew = () => {
    setActiveActividad({
      bgColor: '#fafafa',
    
      descripcion: '',
      tipoActividad: '',
      fechaFin: '',
      consigna: '',
      alumnos: [],
    });
    openActModal();
  };

  return (
    <button className='btn btn-primary fab' onClick={handleClickNew}>
      <i className='fas fa-plus'></i>
    </button>
  );
};
