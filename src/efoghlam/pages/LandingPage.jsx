import './LandingPage.css';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <>
      <div className='container text-center'>
        <div className='row'>
          <div className='col'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Docentes</h5>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
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
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>

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
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
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
