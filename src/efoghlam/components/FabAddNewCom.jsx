// import { addHours } from 'date-fns';
import { useComisionStore } from '../../hooks/useComisionStore';
import { useUiStore } from '../../hooks/useUiStore';

export const FabAddNewCom = () => {
  const { openComModal } = useUiStore();
  const { setActiveComision } = useComisionStore();

  const handleClickNew = () => {
    setActiveComision({
      nombre: '',
      año: '',
      turno: '',
      alumnos: [],
    });
    openComModal();
  };

  return (
    <button className='btn btn-primary fab' onClick={handleClickNew}>
      <i className='fas fa-plus'></i>
    </button>
  );
};
