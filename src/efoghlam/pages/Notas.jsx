import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { CalificacionGrid } from './calificacion/CalificacionGrid';

export const Notas = () => {
  const [calificacion, setCalificacion] = useState(['']);
  return (
    <>
      <NavBar />
      {calificacion.map((calificacion) => (
        <CalificacionGrid key={calificacion} calificacion={calificacion} />
      ))}
    </>
  )
}
