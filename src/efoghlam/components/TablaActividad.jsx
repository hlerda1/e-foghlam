import { Link } from 'react-router-dom';
import { getActividad } from '../../helpers/getActividad';
import { useEffect, useState } from 'react';

// import efoghlamApi from '../../../api/efoghlamApi';
import Swal from 'sweetalert2';
import { useActividadStore } from '../../hooks/useActividadStore';
import { FabAddNewAct } from './FabAddNewAct';

export const TablaActividad = () => {
    const [cargarActividad, setCargarActividad] = useState([]);
    const { actividades, startDeletingActividad, startLoadingActividades, setActiveActividad } = useActividadStore();

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

    //   const getActividades = async () => {
    //     const newActividades = await getActividad();
    //     // console.log(newActividades);
    //     setCargarActividad(newActividades);
    //   };
    //   useEffect(() => {
    //     getActividades();
    //   }, []); 

      useEffect(() => {
        startLoadingActividades();
        console.log(actividades);
      }, []);
      
      const { descripcion, tipoActividad, fechaFin, consigna, alumnos } = actividad;
      
      const onInputChange = (e) => {
        setActividad({ ...actividad, [e.target.name]: e.target.value });
      };

      const handleDelete = (e) => {

        setActiveActividad(e);
        console.log(e)
        startDeletingActividad();
      };

    return (
        <section>
            <div className='container'>
                <h4 className='mb-3 text-center mt-4'>Actividades</h4>
                    {/* <div className='row mt-3'> */}
                    <div className='mb-3 text-center mt-4'>
                        <div className=''>
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
                                    <button type='button'  
                                    //onClick={searchRecords} 
                                    //className='btn btn-success'
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
                                <th>--</th>
                            </tr>
                            </thead>
                            <tbody>
                            {actividades.map((actividad) => (
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
                                        if (confirmBox === true) {
                                            handleDelete(actividad);
                                        }
                                    }}
                                    >
                                    <i
                                        className='far fa-trash-alt'
                                        style={{ fontSize: '18px', marginRight: '5px' }}
                                    ></i>
                                    </Link>

                                    {/* <Link
                                    className=' mr-2'
                                    to={`/EditEmployee/editID/${name.id}`}
                                    >
                                    <i className='fa fa-edit' aria-hidden='true'></i>
                                    </Link> */}
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