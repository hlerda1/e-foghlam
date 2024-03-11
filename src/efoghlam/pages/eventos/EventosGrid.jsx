import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../../../helpers/calendarLocalizer';
import { getMessagesES } from '../../../helpers/getMessages';
import { Evento } from './Evento';
import { useEffect, useState } from 'react';
import { EventoModal } from './EventoModal';
import { useUiStore } from '../../../hooks/useUiStore';
import { useCalendarStore } from '../../../hooks/useCalendarStore';
import { FabAddNew } from '../../components/FabAddNew';
import { FabDelete } from '../../components/FabDelete';

export const EventosGrid = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
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

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);
  return (
    <>
      <h1>Eventos</h1>
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
          event: Evento,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <EventoModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
