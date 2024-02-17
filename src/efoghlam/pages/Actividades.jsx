import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { ActividadesGrid } from './actividades/ActividadesGrid';

export const Actividades = () => {
  const [actividades, setActividades] = useState(['']);
  return (
    <>
      <NavBar />
      {actividades.map((actividad) => (
        <ActividadesGrid key={actividad} actividad={actividad} />
      ))}
    </>
  );
};
