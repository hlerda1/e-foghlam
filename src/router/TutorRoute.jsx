import { userRoles } from '../data/userRole';
import { Tutor } from '../efoghlam/pages/Tutor';

//cambiar path por /staff-tutores
export const tutor_route = [
  {
    path: '/staff-tutor',
    ele: <Tutor />,
    availability: [userRoles.tutor],
  },
];
