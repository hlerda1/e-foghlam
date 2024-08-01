import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { getUsuarioDato } from '../../../helpers/getUsuarioDato';
import { getAlumnoTutor } from '../../../helpers/getAlumnoTutor';
import { getAlumno } from '../../../helpers/getAlumno';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const CalificacionGrid = () => {
    const [ alumnos, setAlumnos,] = useState([]);
    const {  user } = useAuthStore();

    let currentUserRole;
    if (localStorage.getItem('user')) {
        currentUserRole = JSON.parse(localStorage.getItem('user'));
    }

    if (currentUserRole === 'alumno')
      {
          // x = 1; //Alumno
          const getAlumno = async () => {
              const newAlumno = await getUsuarioDato(user.uid);
              // console.log(user.uid);
              setAlumnos(newAlumno);
            };
            useEffect(() => {
              getAlumno();
              // console.log(alumno)
            }, []);
      }else if (currentUserRole === 'docente')
      {
          // x = 2; //Docente
          const getAlumnos = async () => {
              const newAlumnos = await getAlumno();
              setAlumnos(newAlumnos);
            };
            useEffect(() => {
              getAlumnos();
            }, []);
      }else if (currentUserRole === 'docente')
      {
        const getAlumnosT = async () => {
          const newAlumnos = await getAlumnoTutor(user.uid);
          setAlumnos(newAlumnos);
        };
        useEffect(() => {
          getAlumnosT();
        }, []);
      }

    
    // switch(currentUserRole){
    //   case "docente":
    //     const getAlumnos = async () => {
    //       const newAlumnos = await getAlumno();
    //       setAlumnos(newAlumnos);
    //     };
    //     useEffect(() => {
    //       getAlumnos();
    //     }, []);
    //     break;
    //   case "alumno":
    //     const getAlumno = async () => {
    //       const newAlumno = await getUsuarioDato(user.uid);
    //       setAlumnos(newAlumno);
    //     };
    //     useEffect(() => {
    //       getAlumno();
    //     }, []);
    //     break;
    //   case "tutor":
    //     const getAlumnosT = async () => {
    //       const newAlumnos = await getAlumnoTutor(user.uid);
    //       setAlumnos(newAlumnos);
    //     };
    //     useEffect(() => {
    //       getAlumnosT();
    //     }, []);
    //     break;
    // }

      return(
        <div  className='container' style={{ border: '1px solid #d0d0d0' }}>
            {/* <hr /> */}
            <h3>Alumno/s</h3>
            <div>
              <Row xs={1} md={2} className="g-4">
                {alumnos.map((b) => (
                <Card style={{ width: '14rem' }}>
                    <Card.Img variant="top" src="./head.png"/>
                    <Card.Body>
                        <Card.Title>{b.nombre} {b.apellido}</Card.Title>
                        <Card.Text>{b.dni}</Card.Text>
                        <Card.Text>{b.fechaNacimiento}</Card.Text>
                        <Button variant="primary">Calificaciones</Button>
                    </Card.Body>
                </Card>
                ))}
              </Row>
            </div>
        </div>
      )
}