import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { ActividadList } from './actividad/ActividadList';

export const Actividades = () => {
  // const [actividad, setActividad] = useState(['']);
  return (
    <>
      <NavBar />
      <ActividadList />
    </>
  );
};
