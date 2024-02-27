import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { EventosGrid } from './eventos/EventosGrid';

export const Calendario = () => {
  const [calendario, setCalendario] = useState(['']);
  return (
    <>
      <NavBar />
      {calendario.map((calendario) => (
        <EventosGrid key={calendario} calendario={calendario} />
      ))}
    </>
  );
};
