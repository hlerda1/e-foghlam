import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { getUsuarioDato } from '../../../helpers/getUsuarioDato';
import { getAlumnoTutor } from '../../../helpers/getAlumnoTutor';
import { getAlumno } from '../../../helpers/getAlumno';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useCalificacionStore } from '../../../hooks/useCalificacionStore';

export const CalificacionGrid = () => {
  const { user } = useAuthStore();
  const { calificaciones, startLoadingCalificacion } = useCalificacionStore();
  const [alumnos, setAlumnos] = useState([]);
  const [selectedCalificaciones, setSelectedCalificaciones] = useState([]);
  const [show, setShow] = useState(false);

  let currentUserRole;
  if (localStorage.getItem('user')) {
    currentUserRole = JSON.parse(localStorage.getItem('user'));
  }

  useEffect(() => {
    startLoadingCalificacion();

    const fetchAlumnos = async () => {
      if (currentUserRole === 'alumno') {
        const newAlumno = await getUsuarioDato(user.uid);
        setAlumnos([newAlumno]);
      } else if (currentUserRole === 'docente') {
        const newAlumnos = await getAlumno();
        setAlumnos(newAlumnos);
      } else if (currentUserRole === 'tutor') {
        const newAlumnos = await getAlumnoTutor(user.uid);
        setAlumnos(newAlumnos);
      }
    };

    fetchAlumnos();
  }, [user.uid, currentUserRole, startLoadingCalificacion]);

  const handleShowCalificaciones = (alumnoId) => {
    const alumnoCalificaciones = calificaciones.filter(
      (calificacion) => calificacion.alumno._id === alumnoId
    );
    setSelectedCalificaciones(alumnoCalificaciones);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  // toma las calificaciones y calcula el promedio para cada materia
  // devuelve objeto, las claves son los nombres de las materias y
  // los valores son los promedios
  const calculatePromedioPorMateria = (calificaciones) => {
    const promedioPorMateria = {};

    calificaciones.forEach((calificacion) => {
      const { materia, valor } = calificacion;

      if (!promedioPorMateria[materia.descripcion]) {
        promedioPorMateria[materia.descripcion] = {
          suma: 0,
          cantidad: 0,
        };
      }

      promedioPorMateria[materia.descripcion].suma += valor;
      promedioPorMateria[materia.descripcion].cantidad += 1;
    });

    const resultadoPromedio = {};
    for (const materia in promedioPorMateria) {
      const { suma, cantidad } = promedioPorMateria[materia];
      resultadoPromedio[materia] = suma / cantidad;
    }

    return resultadoPromedio;
  };

  return (
    <div className='container' style={{ border: '1px solid #d0d0d0' }}>
      <h3>Alumno/s</h3>
      <div>
        <Row xs={1} md={2} className='g-4'>
          {alumnos.map((b) => (
            <Card style={{ width: '14rem' }} key={b._id}>
              <Card.Img variant='top' src='./head.png' />
              <Card.Body>
                <Card.Title>
                  {b.nombre} {b.apellido}
                </Card.Title>
                <Card.Text>{b.dni}</Card.Text>
                <Card.Text>{b.fechaNacimiento}</Card.Text>
                <Button
                  variant='primary'
                  onClick={() => handleShowCalificaciones(b._id)}
                >
                  Calificaciones
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Calificaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCalificaciones.length > 0 ? (
            <>
     
              <h4>Promedios por Materia</h4>
              {/* Object.entries devuelve una matriz de pares clave-valor,
              cada par representa una materia y su promedio */}
              {Object.entries(calculatePromedioPorMateria(selectedCalificaciones)).map(
                ([materia, promedio]) => (
                  <p key={materia}>
                    {/* para formatear el promedio a dos decimales */}
                    <strong>{materia}:</strong> {promedio.toFixed(2)}
                  </p>
                )
              )}
            </>
          ) : (
            <p>No hay calificaciones disponibles para este alumno.</p>
          )}
        </Modal.Body>
     
      </Modal>
    </div>
  );
}
