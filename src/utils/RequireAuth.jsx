import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

export const RequireAuth = ({ children, userroles }) => {
  let currentUserRole;
  if (localStorage.getItem('user')) {
    currentUserRole = JSON.parse(localStorage.getItem('user'));
  }
  const location = useLocation();
  if (currentUserRole) {
    if (userroles) {
      if (userroles.includes(currentUserRole)) {
        return children;
      } else {
        Swal.fire('Acceso denegado !', '', 'warning');
        return <Navigate to={'/auth/login'}></Navigate>;
      }
    } else {
      return children;
    }
  } else {
    return (
      <Navigate
        to={'/auth/login'}
        state={{ path: location.pathname }}
      ></Navigate>
    );
  }
};
