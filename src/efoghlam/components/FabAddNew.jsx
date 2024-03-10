import { addHours } from 'date-fns';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from '../../hooks/useUiStore';
import { useEffect, useState } from 'react';

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();
  const [disableButton, setDisableButton] = useState(false);

  let x;
  let currentUserRole;
  if (localStorage.getItem('user')) {
    currentUserRole = JSON.parse(localStorage.getItem('user'));
  }

  if (currentUserRole === 'alumno') {
    x = true;
  }

  useEffect(() => {
    setDisableButton(x);
  }, []);

  const handleClickNew = () => {
    setActiveEvent({
      title: '',
      descripcion: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      // user: {
      //   _id: '123',
      //   name: 'Docente',
      // },
    });
    openDateModal();
  };

  return (
    <button
      className='btn btn-primary fab'
      onClick={handleClickNew}
      disabled={disableButton}
    >
      <i className='fas fa-plus'></i>
    </button>
  );
};
