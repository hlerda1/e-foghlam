import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useComisionStore } from '../../hooks/useComisionStore';

export const TablaComision = () => {
    const { comisiones, startLoadingComisiones, startDeletingComision, setActiveComision} = useComisionStore();

    const [ comision, setComision] = useState({})

    useEffect(() => {
        startLoadingComisiones();
        console.log(comisiones);
      }, []);
    
      const handleDelete = (e) => {
        setActiveComision(e);
        console.log(e)
        startDeletingComision();
      };

    return (
       <>
        <section>
        <div className='container'>
                <h4 className='mb-3 text-center mt-4'>Comisiones</h4>
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
                            {/* <th>Alumno</th> */}
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {comisiones.map((comision) => (
                            <tr key={comision}>
                            <td>{comision.nombre}</td>
                            <td>{comision.año}</td>
                            <td>{comision.turno}</td>
                            {/* <td>{comision.alumno}</td> */}
                            <td>
                                <Link
                                className='text-danger mr-2'
                                onClick={() => {
                                    const confirmBox = window.confirm(
                                        'Do you really want to delete ' + comision.descripcion
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
      </>
    )
}