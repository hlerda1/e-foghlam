import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../hooks/useAuthStore';
import Accordion from 'react-bootstrap/Accordion';
//import { getUsuario } from '../../../helpers/getUsuario';
import { useCalificacionStore } from '../../../hooks/useCalificacionStore';
import { getAlumno } from '../../../helpers/getAlumno';
import { getUsuarioDato } from '../../../helpers/getUsuarioDato';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const CalificacionGrid = () => {
    const [ alumnos, setAlumnos,] = useState([]);
    const {  user } = useAuthStore();

    let x;
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
        }else 
        {
            x = 3; //Tutor
        }

    

      return(
        <div  className='container' style={{ border: '1px solid #d0d0d0' }}>
            <hr />
            <h3>Alumno/s</h3>
            <div>
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
            </div>
        </div>
      )
}