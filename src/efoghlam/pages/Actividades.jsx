import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { ActividadList } from './actividad/ActividadList';
import { FabAddNewAct } from '../components/FabAddNewAct';
import { ActividadModal } from './actividad/ActividadModal';
import { TablaActividad } from '../components/TablaActividad';

export const Actividades = () => {
  const [actividad, setActividad] = useState(['']);
  return (
    <>
      <NavBar />
      {actividad.map((actividad) => (
        <ActividadList key={actividad} actividad={actividad} />
      ))}
      {/* <TablaActividad /> */}
      {/* <ActividadModal /> */}
      {/* <FabAddNewAct /> */}
    </>
  );
};