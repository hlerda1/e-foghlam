import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { ComisionGrid } from './comision/ComisionGrid';


export const Comisiones = () => {
  const [comision, setComision] = useState(['']);
  return (
    <>
      <NavBar />
      {comision.map((comisionid) => (
        <ComisionGrid key={comisionid} category={comisionid} />
      ))}
    </>
  );
};
