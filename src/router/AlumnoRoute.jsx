import { userRoles } from '../data/userRole';
import { Alumno } from '../efoghlam/pages/Alumno';
import { Calendario } from '../efoghlam/pages/Calendario';
import { Comunicaciones } from '../efoghlam/pages/Comunicaciones';

export const alumno_route = [
  {
    path: '/staff-alumno',
    ele: <Alumno />,
    availability: [userRoles.alumno],
  },
  {
    path: '/calendario',
    ele: <Calendario />,
    //availability: [userRoles.alumno],
  },

  {
    path: '/comunicaciones',
    ele: <Comunicaciones />,
    //availability: [userRoles.alumno],
  },
];
