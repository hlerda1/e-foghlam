import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useEffect, useState } from 'react';

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
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

  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      className='btn btn-danger fab-danger'
      onClick={handleDelete}
      disabled={disableButton}
      style={{
        display: hasEventSelected ? '' : 'none',
      }}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  );
};
