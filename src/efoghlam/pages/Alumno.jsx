import { NavBar } from '../components/NavBar';
import { DatosAlumno } from './alumno/DatosAlumno';
import { useState } from 'react';

//Seccion alumno donde solo entra el alumno
export const Alumno = () => {
  const [alumno, setAlumno] = useState(['']);
  return (
    <>
      <NavBar />
      {alumno.map((alumno) => (
        <DatosAlumno key={alumno} alumno={alumno} />
      ))}
    </>
  )
};
