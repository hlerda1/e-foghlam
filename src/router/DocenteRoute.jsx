import { Docente } from '../efoghlam/pages/Docente';
import { userRoles } from '../data/userRole';
import { Comisiones } from '../efoghlam/pages/Comisiones';
import { Actividades } from '../efoghlam/pages/Actividades';

export const docente_route = [
  {
    path: '/staff-docente',
    ele: <Docente />,
    availability: [userRoles.docente],
  },

  {
    path: '/comisiones',
    ele: <Comisiones />,
    availability: [userRoles.docente],
  },
  {
    path: '/actividades',
    ele: <Actividades />,
    availability: [userRoles.docente],
  },
];
