import { useEffect, useState } from 'react';
import { getComunicacion } from '../../../helpers/getComunicacion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../hooks/useAuthStore';
import Accordion from 'react-bootstrap/Accordion';
import { AgregarComunicacion } from './AgregarComunicacion';
import './AgregarComunicacion.css';
//import { getUsuario } from '../../../helpers/getUsuario';

export const ComunicacionGrid = () => {
  const [cargarComunicacion, setCargarComunicacion] = useState([]);
  const [cargarRemitente, setCargarRemitente] = useState([]);
  const [comunicacion, setComunicacion] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const toggle = () => setComunicacion(!comunicacion);
  const { user } = useAuthStore();
  const idDestinatario = user.uid;

  //cargar comunicaciones
  const getComunicaciones = async () => {
    const newComunicaciones = await getComunicacion(idDestinatario);
    console.log(newComunicaciones);
    setCargarComunicacion(newComunicaciones);
  };

  let x;
  let currentUserRole;
  if (localStorage.getItem('user')) {
    currentUserRole = JSON.parse(localStorage.getItem('user'));
  }

  if (currentUserRole === 'alumno') {
    x = true;
  }

  useEffect(() => {
    setDisableButton(x);
  }, []);

  // const getRemNombre = async () => {
  //   const newRemNombre = await getUsuario(idRemitente);
  //   console.log(newRemNombre);
  //   setCargarRemitente(newRemNombre);
  // };

  useEffect(() => {
    getComunicaciones();
  }, []);

  return (
    <>
      <div className='container'>
      <div className='header text-center'>
        <h3>Mensajes</h3>
        <button
          className='btn btn-primary mt-2'
          onClick={() => setComunicacion(true)}
          disabled={disableButton}
        >
          Crear Mensaje
        </button>
      </div>
      <div className='task-container'></div>
      <AgregarComunicacion toggle={toggle} comunicacion={comunicacion} />
        <div className='mb-3 text-center mt-4'>
          <div className=''>
          <table className='table table-hover  table-striped table-bordered ml-4 '>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Remitente</th>
                <th>Mensaje</th>
                <th>Fecha</th>
                {/* <th>Destinatarios</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cargarComunicacion.map((comunicacion) => (
                <tr key={comunicacion.comunicacion}>
                  <td>{comunicacion.titulo}</td>
                  <td>{comunicacion.idRemitente}</td>

                  <Accordion>
                    <Accordion.Item eventKey='0'>
                      <Accordion.Header>
                        {comunicacion.cuerpo.substring(0, 15) + '...'}
                      </Accordion.Header>
                      <Accordion.Body>
                        <td>{comunicacion.cuerpo}</td>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <td>{comunicacion.fecha}</td>

                  {/* <td>{comunicacion.destinatarios}</td> */}
                  <td>
                    <Link
                      className='text-danger mr-2'
                      onClick={() => {
                        const confirmBox = window.confirm(
                          'Do you really want to delete ' + name.first_name
                        );
                        // if (confirmBox === true) {
                        //   deleteRecord(name.id);
                        // }
                      }}
                    >
                      <i
                        className='far fa-trash-alt'
                        style={{ fontSize: '18px', marginRight: '5px' }}
                      ></i>
                    </Link>

                    <Link className=' mr-2' to={`/EditEmployee/editID/${name.id}`}>
                      <i className='fa fa-edit' aria-hidden='true'></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </>
  );
};
