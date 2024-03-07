import { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import efoghlamApi from '../../../api/efoghlamApi';
import { getAlumno } from '../../../helpers/getAlumno';
import Swal from 'sweetalert2';

export const AgregarComunicacion = ({ comunicacion, toggle }) => {
  const [alumnoSeleccion, setAlumnoSeleccion] = useState([]);

  const [message, setMessage] = useState({
    titulo: '',
    idRemitente: '',
    cuerpo: '',
    destinatarios: [],
  });
  const { titulo, cuerpo, destinatarios, idRemitente } = message;

  const onInputChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;

    if (checked) {
      setMessage({
        ...message,
        destinatarios: [...message.destinatarios, value],
      });
    } else {
      setMessage({
        ...message,
        destinatarios: message.destinatarios.filter((id) => id !== value),
      });
    }
  };

  const addMensajes = async (e) => {
    console.log(e.target.value);
    e.preventDefault();
    e.target.reset();
    await efoghlamApi.post('http://localhost:4000/api/mensaje', message);
    Swal.fire({
      text: 'Mensaje enviado!',
      icon: 'info',
    });
  };

  const getAlumnos = async () => {
    const newAlumnos = await getAlumno();
    console.log(newAlumnos);
    setAlumnoSeleccion(newAlumnos);
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  return (
    <Modal isOpen={comunicacion} toggle={toggle}>
      <ModalHeader toggle={toggle}>Crear Mensaje</ModalHeader>
      <ModalBody>
        <form onSubmit={addMensajes}>
          <div className='form-group'>
            <label>Titulo</label>
            <input
              type='text'
              className='form-control'
              name='titulo'
              value={titulo}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className='form-group'>
            <label>Remitente</label>
            <input
              type='text'
              className='form-control'
              name='idRemitente'
              value={idRemitente}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className='form-group'>
            <label>Mensaje</label>
            <textarea
              rows='2'
              type='text'
              className='form-control'
              name='cuerpo'
              value={cuerpo}
              onChange={(e) => onInputChange(e)}
            ></textarea>
          </div>
          <div className='form-group'>
            <label>Destinatario</label>
            <div className='col-sm-8'>
              <table className='table table-hover  table-striped table-bordered ml-4 '>
                <thead></thead>
                <tbody>
                  {alumnoSeleccion.map((alumno) => (
                    <tr key={alumno}>
                      <td>
                        {alumno.nombre} {alumno.apellido}
                      </td>
                      <td>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value={alumno._id}
                          name='idAlumno'
                          onChange={(e) => handleCheckboxChange(e)}
                        ></input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Button color='primary' onClick={toggle} type='submit'>
            Enviar
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancelar
          </Button>
        </form>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
};
