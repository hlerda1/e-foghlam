import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { localizer } from '../../../helpers/CalendarLocalizer';
import { getMessagesES } from '../../../helpers/getMessages';
import { ActividadEvent } from './ActividadEvent';
import { useState } from 'react';
import { ActividadModal } from './ActividadModal';
import { useUiStore } from '../../../hooks/useUiStore';

const events = [
  {
    title: 'Examen',
    notes: 'Examen escrito',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Carla',
    },
  },
];

export const ActividadesGrid = () => {
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  );

  const eventStyleGetter = (actividad, start, end, isSelected) => {
    //console.log({ actividad, start, end, isSelected });
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };
    return {
      style,
    };
  };

  // 3 eventos
  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    console.log({ click: event });
  };

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    //console.log({ viewChanged: event });
  };
  return (
    <>
      <h1>Actividades</h1>
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          //event se envia como prop a ActividadEvent
          event: ActividadEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <ActividadModal />
    </>
  );
};
