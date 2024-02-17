import { useState } from 'react';
import { AlumnoGrid } from './AlumnoGrid';

export const AlumnoLista = () => {
  const [alumnos, setAlumnos] = useState(['']);

  return (
    <>
      {alumnos.map((category) => (
        <AlumnoGrid key={category} category={category} />
      ))}
    </>
  );
};
