import { useAuthStore } from '../../hooks/useAuthStore';
import { Link, NavLink } from 'react-router-dom';

export const NavBar = () => {
  const { startLogout, user } = useAuthStore();

  let currentUserRole;
  if (localStorage.getItem('user')) {
    currentUserRole = JSON.parse(localStorage.getItem('user'));
  }
  return (
    <div className='navbar navbar-expand navbar-dark bg-dark mb px-4'>
      <span className='navbar-brand'>
        <i className='fa-solid fa-chalkboard-user'></i>
        &nbsp;
        {user.nombre}
      </span>

      <div className='container-fluid'>
        <h6 className='alert alert-info fw-bold  '>
          Bienvenido: {' ' + currentUserRole}
        </h6>

        <Link to='/comisiones' className='navbar-brand' href='#'>
          Comisiones
        </Link>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
              to='/actividades'
            >
              Actividades
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
              to='/notas'
            >
              Notas
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
              to='/comunicaciones'
            >
              Comunicaciones
            </NavLink>
          </ul>
        </div>
      </div>

      <button onClick={startLogout} className='btn btn-outline-danger'>
        <i className='fas fa-sign-out alt'></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  );
};
