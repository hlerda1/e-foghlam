import { Link } from 'react-router-dom';
import { getComision } from '../../../helpers/getComision';
import { getAlumno } from '../../../helpers/getAlumno';
import { useEffect, useState } from 'react';

import efoghlamApi from '../../../api/efoghlamApi';
import Swal from 'sweetalert2';

export const ComisionGrid = () => {
  // const [record, setRecord] = useState([]);
  const [cargarComision, setCargarComision] = useState([]);

  const [comision, setComision] = useState({
    nombre: '',
    año: '',
    turno: '',
    alumno: '',
  });

  // setAlumnoSeleccion permite cargar valores al dropdown
  const [alumnoSeleccion, setAlumnoSeleccion] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  //obtener alumnos para dropdown, mapeo
  const getAlumnos = async () => {
    const newAlumnos = await getAlumno();
    console.log(newAlumnos);
    setAlumnoSeleccion(newAlumnos);
  };
  useEffect(() => {
    getAlumnos();
  }, []);

  const { nombre, año, turno, alumno } = comision;

  const onInputChange = (e) => {
    setComision({ ...comision, [e.target.name]: e.target.value });
  };

  //cargar comisiones
  const getComisiones = async () => {
    const newComisiones = await getComision();
    console.log(newComisiones);
    setCargarComision(newComisiones);
  };

  useEffect(() => {
    getComisiones();
  }, []);

  // agregar comisiones
  const addComisiones = async (e) => {
    e.preventDefault();
    e.target.reset();
    await efoghlamApi.post('http://localhost:4000/api/comision', comision);
    // alert('Comision Agregada');
    Swal.fire({
      text: 'Comision creada!',
      icon: 'info',
    });
    getComisiones();
  };

  return (
    <>
      <section>
        <div className='container'>
          <h4 className='mb-3 text-center mt-4'>Comisiones</h4>
          <div className='row mt-3'>
            <div className='col-sm-4'>
              <div
                className='box p-3 mb-3 mt-5'
                style={{ border: '1px solid #d0d0d0' }}
              >
                <form onSubmit={addComisiones}>
                  <h5 className='mb-3 '>Agregar comision</h5>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control  mb-4'
                      name='nombre'
                      value={nombre}
                      onChange={(e) => onInputChange(e)}
                      placeholder='Nombre de Comision'
                      required=''
                    />
                  </div>

                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control  mb-4'
                      name='año'
                      value={año}
                      onChange={(e) => onInputChange(e)}
                      placeholder='Año'
                      required=''
                    />
                  </div>

                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control mb-4'
                      name='turno'
                      value={turno}
                      onChange={(e) => onInputChange(e)}
                      placeholder='Turno'
                      required=''
                    />
                  </div>

                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control mb-4'
                      name='alumno'
                      value={alumno}
                      onChange={(e) => onInputChange(e)}
                      // onChange={onInputChange}
                      placeholder='Alumno'
                      required=''
                    />

                    <h5>Alumnos</h5>
                    <select value={selectedValue} onChange={handleChange}>
                      {alumnoSeleccion.map((op) => (
                        <option key={op}>{op.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type='submit'
                    className='btn btn-primary btn-block mt-4'
                  >
                    Agregar
                  </button>
                </form>
              </div>
            </div>
            <div className='col-sm-8'>
              {/* <h5 className='text-center  ml-4 mt-4  mb-5'>View Records</h5> */}
              <div className='input-group mb-4 mt-3'>
                <div className='form-outline'>
                  <input
                    type='text'
                    id='form1'
                    // onChange={(e) => setSearch(e.target.value)}
                    className='form-control'
                    placeholder='Buscar comision'
                    style={{ backgroundColor: '#ececec' }}
                  />
                </div>
                <button
                  type='button'
                  // onClick={searchRecords}
                  className='btn btn-success'
                >
                  <i className='fa fa-search' aria-hidden='true'></i>
                </button>
              </div>
              <table className='table table-hover  table-striped table-bordered ml-4 '>
                <thead>
                  <tr>
                    <th>Nombre de la Comision</th>
                    <th>Año</th>
                    <th>Turno</th>
                    <th>Alumno</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cargarComision.map((comision) => (
                    <tr key={comision}>
                      <td>{comision.nombre}</td>
                      <td>{comision.año}</td>
                      <td>{comision.turno}</td>
                      <td>{comision.alumno}</td>
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

                        <Link
                          className=' mr-2'
                          to={`/EditEmployee/editID/${name.id}`}
                        >
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
      </section>
    </>
  );
};
