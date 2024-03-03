import { Link } from 'react-router-dom';
import { getActividad } from '../../../helpers/getActividad';
import { getAlumno } from '../../../helpers/getAlumno';
import { useEffect, useState } from 'react';

import efoghlamApi from '../../../api/efoghlamApi';
import Swal from 'sweetalert2';

export const ActividadList = () => {

    const [alumnoSeleccion, setAlumnoSeleccion] = useState([]);
    const [actividadSeleccion, setActividadSeleccion] = useState([]);
    const [cargarActividad, setCargarActividad] = useState([]);

   

    const [actividad, setActividad] = useState({
        descripcion: '',
        tipoActividad: '',
        fechaFin: '',
        consigna: '',
        alumnos: [ 
            { 
                idAlumno:'',
                estado:'',
                respuesta:''
            } 
        ],
      });

      const getAlumnos = async () => {
        const newAlumnos = await getAlumno();
        // console.log(newAlumnos);
        setAlumnoSeleccion(newAlumnos);
      };
      useEffect(() => {
        getAlumnos();
      }, []);

      const getActividades = async () => {
        const newActividades = await getActividad();
        // console.log(newActividades);
        setCargarActividad(newActividades);
      };
      useEffect(() => {
        getActividades();
      }, []); 
      
      const { descripcion, tipoActividad, fechaFin, consigna, alumnos } = actividad;
      
      const onInputChange = (e) => {
        setActividad({ ...actividad, [e.target.name]: e.target.value });
      };

    //   console.log(actividad.alumnos[0].idAlumno)

      return (

        <section>
            <div className='container'>
                <h4 className='mb-3 text-center mt-4'>Actividades</h4>
                    <div className='row mt-3'>
                        <div className='col-sm-4'>
                            <div
                                className='box p-3 mb-3 mt-5'
                                style={{ border: '1px solid #d0d0d0' }}
                            >
                                <form onSubmit={null}>
                                    <h5 className='mb-3 '>Agregar Actividad</h5>
                                    <div className='form-group'>
                                        <input type='text' 
                                            className='form-control  mb-4' 
                                            name='descripcion' 
                                            value={descripcion} 
                                            onChange={(e) => onInputChange(e)} 
                                            placeholder='Descripción de la Actividad' 
                                            required='' 
                                        />
                                        <select 
                                            className='form-control mb-4' 
                                            name='tipoActividad' value={tipoActividad} 
                                            onChange={(e) => onInputChange(e)}>
                                                <option value="">Seleccione tipo de actividad</option>
                                                <option value="examen">Examen</option>
                                                <option value="trabajoPractico">Trabajo Práctico</option>
                                                <option value="presentacion">Presentación</option>
                                        </select>
                                        <input type="date" 
                                            className='form-control  mb-4' 
                                            name='fechaFin' 
                                            value={fechaFin} 
                                            onChange={(e) => onInputChange(e)}  
                                            required='' />
                                        <textarea type='text' 
                                            className='form-control  mb-4' 
                                            name='consigna' 
                                            value={consigna} 
                                            onChange={(e) => onInputChange(e)} 
                                            placeholder='Consigna' 
                                            required='' 
                                        />
                                        
                                        <button type='submit' 
                                            className='btn btn-primary btn-block mt-4'>
                                                Crear Actividad
                                        </button>
                                    </div>
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
                                    placeholder='Buscar Actividad'
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
                                <th>Nombre de la Actividad</th>
                                <th>Tipo Actividad</th>
                                <th>Fecha Finalización</th>
                                <th>Consigna</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cargarActividad.map((actividad) => (
                                <tr key={actividad}>
                                <td>{actividad.descripcion}</td>
                                <td>{actividad.tipoActividad}</td>
                                <td>{actividad.fechaFin}</td>
                                <td>{actividad.consigna}</td>
                                <td>
                                    <Link
                                    className='text-danger mr-2'
                                    onClick={() => {
                                        const confirmBox = window.confirm(
                                        'Do you really want to delete ' + actividad.descripcion
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

      ) 
}