import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { ActividadList } from './actividad/ActividadList';
import { FabAddNewAct } from '../components/FabAddNewAct';
import { ActividadModal } from './actividad/ActividadModal';

export const Actividades = () => {
  // const [actividad, setActividad] = useState(['']);
  return (
    <>
      <NavBar />
      <ActividadList />
      <ActividadModal />
      <FabAddNewAct />
    </>
  );
};
