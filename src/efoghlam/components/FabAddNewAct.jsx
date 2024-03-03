import { addHours } from 'date-fns';
import { useActividadStore } from '../../hooks/useActividadStore';
import { useUiStore } from '../../hooks/useUiStore';

export const FabAddNewAct = () => {
  const { openActModal } = useUiStore();
  const { setActiveActividad } = useActividadStore();

  const handleClickNew = () => {
    setActiveActividad({
      title: '',
      descripcion: '',
      // start: new Date(),
      // end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      // user: {
      //   _id: '123',
      //   name: 'Docente',
      // },
    });
    openActModal();
  };

  return (
    <button className='btn btn-primary fab' onClick={handleClickNew}>
      <i className='fas fa-plus'></i>
    </button>
  );
};
