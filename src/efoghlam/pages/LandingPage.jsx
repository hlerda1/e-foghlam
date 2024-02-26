import './LandingPage.css';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';

export const LandingPage = () => {
  const { startLogout, user } = useAuthStore();
  return (
    <>
      <div className='navbar navbar-expand navbar-dark bg-dark mb px-4'>
        <span className='navbar-brand'>
          <i className='fa-solid fa-chalkboard-user'></i>
          &nbsp;
          {user.nombre}
        </span>
        <button onClick={startLogout} className='btn btn-outline-danger'>
          <i className='fas fa-sign-out alt'></i>
          &nbsp;
          <span>Salir</span>
        </button>
      </div>

      <div className='container text-center'>
        <div className='row'>
          <div className='col'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Docentes</h5>
                <p className='card-text'>Area Docente</p>
                <Link to='/staff-docente' className='btn btn-primary'>
                  Ingresar docente
                </Link>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Alumnos</h5>
                <p className='card-text'>Area Alumno</p>

                <Link to='/staff-alumno' className='btn btn-primary'>
                  Ingresar Alumno
                </Link>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Tutores</h5>
                <p className='card-text'>Area Tutor</p>
                <Link to='/staff-tutor' className='btn btn-primary'>
                  Ingresar Tutor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
