import { Navigate } from 'react-router-dom';
import { LandingPage } from './LandingPage';

export const EfoghlamPage = () => {
  let x = '';
  let currentUserRole;
  if (localStorage.getItem('user')) {
    currentUserRole = JSON.parse(localStorage.getItem('user'));
    switch(currentUserRole){
      case "docente":
        x = "/staff-docente"
        break;
      case "alumno":
        x = "/staff-alumno"
        break;
      case "tutor":
        x = "/staff-tutor"
        break;
    }
  }
  return (
    <Navigate to={x} />
    // <>
    //   <LandingPage />
    // </>
  );
};
