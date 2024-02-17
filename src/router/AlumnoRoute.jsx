import { userRoles } from '../data/userRole';
import { Alumno } from '../efoghlam/pages/Alumno';

export const alumno_route = [
  {
    path: '/staff-alumno',
    ele: <Alumno />,
    availability: [userRoles.alumno],
  },
];
