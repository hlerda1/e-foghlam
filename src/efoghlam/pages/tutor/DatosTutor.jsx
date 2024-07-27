import { getUsuarioDato } from '../../../helpers/getUsuarioDato';
import { getAlumnoTutor } from '../../../helpers/getAlumnoTutor';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const DatosTutor = () => {
    const [tutor, setTutor] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const {  user } = useAuthStore();

    const getTutor = async () => {
        const newTutor = await getUsuarioDato(user.uid);
        // console.log(user.uid);
        setTutor(newTutor);
      };
      useEffect(() => {
        getTutor();
        // console.log(alumno)
      }, []);
    
    const getAlumnos = async () => {
        const newAlumnos = await getAlumnoTutor(user.uid);
        // console.log(newAlumnos);
        setAlumnos(newAlumnos);
      };
      useEffect(() => {
        getAlumnos();
        // console.log(alumnos)
      }, []);

      return(
        <div  className='container' style={{ border: '1px solid #d0d0d0' }}>
            <div>
                <h1 >Información del Tutor</h1>            
                {tutor.map((a) => (
                    <ul>
                        <li>
                            <label>Nombre: </label>
                            <span> {a.nombre} </span>
                            <span> {a.apellido} </span>
                        </li>
                        <li>
                            <label>DNI: </label>
                            <span> {a.dni} </span>
                        </li>
                        <li>
                            <label>Correo: </label>
                            <span> {a.email} </span>
                        </li>
                    </ul>
                ))}            
            </div>
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
                        <Button variant="primary">Consulta</Button>
                    </Card.Body>
                </Card>
                ))}
            </div>
        </div>
      )
}