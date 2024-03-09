import { getAlumnoDato } from '../../../helpers/getAlumnoDato';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useActividadStore } from '../../../hooks/useActividadStore';
import { Link } from 'react-router-dom';

export const DatosAlumno = () => {
    const [alumno, setAlumno] = useState([]);
    const {  user } = useAuthStore();
    const { actividades, startLoadingActividades, startLoadingActividadesAlumno } = useActividadStore();
    
    const getAlumno = async () => {
        const newAlumno = await getAlumnoDato(user.uid);
        // console.log(user.uid);
        setAlumno(newAlumno);
      };
      useEffect(() => {
        getAlumno();
        // console.log(alumno)
      }, []);

      useEffect(() => {
        startLoadingActividadesAlumno(user.uid);
        // startLoadingActividades();
        // let index = actividades.alumnos[1].idAlumno.indexOf(user.uid);
        // let index = actividades.alumnos.findIndex(x => x.idAlumno === user.uid);
        // const actividadesUsuario = actividades.filter(function (filtObj) {return filtObj.alumnos[index].idAlumno === user.uid;})
        console.log(actividades);
      }, []);

      return(
        <div  className='container' style={{ border: '1px solid #d0d0d0' }}>
            <div>
                <h1 >Información del Alumno</h1>            
                {alumno.map((a) => (
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
            <div> 
                <table className='table table-hover  table-striped table-bordered ml-4 '>
                    <thead>
                    <tr>
                        <th>Nombre de la Actividad</th>
                        <th>Tipo Actividad</th>
                        <th>Fecha Finalización</th>
                        <th>Consigna</th>
                        <th>Estado</th>
                        <th>--</th>
                    </tr>
                    </thead>
                    <tbody>
                    {actividades.map((actividad) => (
                        <tr key={actividad.actividad}>
                        <td>{actividad.descripcion}</td>
                        <td>{actividad.tipoActividad}</td>
                        <td>{actividad.fechaFin}</td>
                        <td>{actividad.consigna}</td>
                        <td>{actividad.alumnos[0].estado}</td>
                        <td>
                            <Link
                            className=' mr-2'
                            // to={`/EditEmployee/editID/${name.id}`}
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
      )
}