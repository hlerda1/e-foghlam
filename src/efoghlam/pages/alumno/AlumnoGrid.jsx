import { Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getAlumno } from '../../../helpers/getAlumno';
import efoghlamApi from '../../../api/efoghlamApi';
import Swal from 'sweetalert2';

// agregar alertas de Swal alumno borrar y actualizar
export const AlumnoGrid = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [idSeleccionado, setIdSeleccionado] = useState('');
  const [nombreSeleccionado, setNombreSeleccionado] = useState('');
  const [apellidoSeleccionado, setApellidoSeleccionado] = useState('');
  const [emailSeleccionado, setEmailSeleccionado] = useState('');
  const [dniSeleccionado, setDniSeleccionado] = useState('');
  const [fechaNacimientoSeleccionado, setfechaNacimientoSeleccionado] =
    useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState('');

  const [busqueda, setBusqueda] = useState('');
  const [tablaUsuarios, setTablaUsuarios] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    const studentEdit = alumnos.filter((alumno) => alumno._id === id)[0];
    setIdSeleccionado(studentEdit._id);
    setNombreSeleccionado(studentEdit.nombre);
    setApellidoSeleccionado(studentEdit.apellido);
    setEmailSeleccionado(studentEdit.email);
    setDniSeleccionado(studentEdit.dni);
    setfechaNacimientoSeleccionado(studentEdit.fechaNacimiento);
    setRolSeleccionado(studentEdit.rol);

    console.log(studentEdit);
    setShow(true);
  };

  const buscarAlumno = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  // metodo para buscar y filtrar por nombre y dni
  const filtrar = (terminoBusqueda) => {
    let resultadosBusqueda = tablaUsuarios.filter((student) => {
      if (
        student.nombre
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        student.dni
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return student;
      }
    });

    setAlumnos(resultadosBusqueda);
  };

  // metodo para actualizar alumno
  const handleUpdate = (event) => {
    event.preventDefault();

    // Obtener los datos actualizados del formulario
    const updatedStudent = {
      id: idSeleccionado,
      nombre: nombreSeleccionado,
      apellido: apellidoSeleccionado,
      email: emailSeleccionado,
      dni: dniSeleccionado,
      fechaNacimiento: fechaNacimientoSeleccionado,
      rol: rolSeleccionado,
    };

    efoghlamApi
      .put(`/auth/usuario/${idSeleccionado}`, updatedStudent)
      .then((response) => {
        if (response.status === 200) {
          console.log('Alumno actualizado correctamente');
          handleClose();
          getAlumnos();
        } else {
          console.error('Error al actualizar el alumno');
        }
      });
  };

  //metodo eliminar alumno
  const handleDelete = () => {
    const deleteStudent = {
      id: idSeleccionado,
    };

    efoghlamApi
      .delete(`/auth/usuario/${idSeleccionado}`, deleteStudent)
      .then((response) => {
        if (response.status === 200) {
          //console.log('Alumno eliminado correctamente');
          getAlumnos();
        } else {
          console.error('Error al eliminar el alumno');
        }
      });
  };

  // metodo para obtener alumnos
  const getAlumnos = async () => {
    const newAlumnos = await getAlumno();
    console.log(newAlumnos);
    setAlumnos(newAlumnos);
    setTablaUsuarios(newAlumnos);
  };
  useEffect(() => {
    getAlumnos();
  }, []);

  return (
    <>
      <div className='container '>
        <div className='crud shadow-lg p-3 mb-5 mt-5 bg-body rounded'>
          <div className='row '>
            <div className='col-sm-3 mt-5 mb-4 text-gred'>
              <div className='search'>
                <form className='form-inline'>
                  <input
                    className='form-control mr-sm-2'
                    type='search'
                    placeholder='Buscar alumno'
                    aria-label='Search'
                    value={busqueda}
                    onChange={buscarAlumno}
                  />
                </form>
              </div>
            </div>
            <div
              className='col-sm-3 offset-sm-2 mt-5 mb-4 text-gred'
              style={{ color: 'black' }}
            >
              <h2>
                <b>Alumnos</b>
              </h2>
            </div>
            {/* <div className='col-sm-3 offset-sm-1  mt-5 mb-4 text-gred'>
              <Button variant='primary'>Agregar a la comision</Button>
            </div> */}
          </div>
          <div className='row'>
            <div className='table-responsive '>
              <table className='table table-striped table-hover table-bordered'>
                <thead>
                  <tr>
                    <th>Nombre </th>
                    <th>Apellido</th>
                    <th>Email </th>
                    <th>Dni</th>
                    <th>Fecha Nacimiento</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map((student) => (
                    <tr key={student}>
                      {/* <td>{student._id}</td> */}
                      <td>{student.nombre}</td>
                      <td>{student.apellido}</td>
                      <td>{student.email}</td>
                      <td>{student.dni}</td>
                      <td>{student.fechaNacimiento}</td>
                      <td>{student.rol}</td>
                      <td>
                        <a
                          href='#'
                          className='edit'
                          title='Edit'
                          data-toggle='tooltip'
                          onClick={() => handleShow(student._id)}
                        >
                          <i className='material-icons'>&#xE254;</i>
                        </a>
                        <a
                          href='#'
                          className='delete'
                          title='Delete'
                          data-toggle='tooltip'
                          style={{ color: 'red' }}
                          onClick={() => handleShow(student._id)}
                        >
                          <i className='material-icons'>&#xE872;</i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Formulario modal */}
          <div className='model_box'>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop='static'
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Datos</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleUpdate}>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      id='exampleInputNombre1'
                      aria-describedby='emailHelp'
                      placeholder='Nombre'
                      value={nombreSeleccionado}
                      onChange={(event) =>
                        setNombreSeleccionado(event.target.value)
                      }
                    />
                  </div>
                  <div className='form-group mt-3'>
                    <input
                      type='text'
                      className='form-control'
                      id='exampleInputApellido1'
                      aria-describedby='emailHelp'
                      placeholder='Apellido'
                      value={apellidoSeleccionado}
                      onChange={(event) =>
                        setApellidoSeleccionado(event.target.value)
                      }
                    />
                  </div>
                  <div className='form-group mt-3'>
                    <input
                      type='email'
                      className='form-control'
                      id='exampleInputEmail1'
                      aria-describedby='emailHelp'
                      placeholder='Email'
                      value={emailSeleccionado}
                      onChange={(event) =>
                        setEmailSeleccionado(event.target.value)
                      }
                    />
                  </div>
                  <div className='form-group mt-3'>
                    <input
                      type='text'
                      className='form-control'
                      id='exampleInputDni'
                      placeholder='Dni'
                      value={dniSeleccionado}
                      onChange={(event) => {
                        setDniSeleccionado(event.target.value);
                      }}
                    />
                  </div>

                  <div className='form-group mt-3'>
                    <input
                      type='text'
                      className='form-control'
                      id='exampleInputFechaNacimiento'
                      placeholder='Fecha Nacimiento'
                      value={fechaNacimientoSeleccionado}
                      onChange={(event) => {
                        setfechaNacimientoSeleccionado(event.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <input
                      type='text'
                      className='form-control'
                      id='exampleInputRol'
                      placeholder='Rol'
                      value={rolSeleccionado}
                      onChange={(event) => {
                        setRolSeleccionado(event.target.value);
                      }}
                    />
                  </div>

                  <button
                    type='submit'
                    className='btn btn-warning mt-4'
                    onClick={() => {
                      handleUpdate();
                    }}
                  >
                    Actualizar
                  </button>

                  <button
                    type='submit'
                    className='btn btn-danger mt-4'
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    Borrar
                  </button>
                </form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};
