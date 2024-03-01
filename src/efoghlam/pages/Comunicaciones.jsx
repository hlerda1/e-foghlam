import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { ComunicacionGrid } from './comunicaciones/ComunicacionGrid';

export const Comunicaciones = () => {
  const [comunicacion, setComision] = useState(['']);
  return (
    <>
      <NavBar />
      {comunicacion.map((comunicacion) => (
        <ComunicacionGrid key={comunicacion} category={comunicacion} />
      ))}
    </>
  );
};
