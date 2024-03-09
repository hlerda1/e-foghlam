import { Docente } from '../efoghlam/pages/Docente';
import { userRoles } from '../data/userRole';
import { Comisiones } from '../efoghlam/pages/Comisiones';
import { Calendario } from '../efoghlam/pages/Calendario';
import { Actividades } from '../efoghlam/pages/Actividades';
import { Comunicaciones } from '../efoghlam/pages/Comunicaciones';

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

  {
    path: '/calendario',
    ele: <Calendario />,
    //availability: [userRoles.docente],
  },

  {
    path: '/comunicaciones',
    ele: <Comunicaciones />,
    //availability: [userRoles.docente],
  },
];
