import { NavBar } from "../components/NavBar";
import { useState } from "react";
import { DatosTutor } from './tutor/DatosTutor';

export const Tutor = () => {
  const [tutor, setTutor] = useState(['']);
  return (
    <>
      <NavBar/>
      {tutor.map((tutor) => (
        <DatosTutor key={tutor} tutor={tutor} />
      ))}
    </>
  )
 
};
