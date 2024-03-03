import { Link } from 'react-router-dom';
import { useEffect, useState, Component } from 'react';
import Modal from 'react-modal';
import { useUiStore } from '../../../hooks/useUiStore';
import { getActividad } from '../../../helpers/getActividad';
import { getAlumno } from '../../../helpers/getAlumno';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const ActividadModal = () => {
  const { isActModalOpen, closeActModal } = useUiStore();
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

  const [alumno, setAlumno] = useState({
    _id: '',
    nombre: '',
    apellido: '',
    email: '',
    dni: '',
    fechaNacimiento: '',
    rol: '',
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
  const { nombre, apellido, email, dni, fechaNacimiento, rol } = alumno;
  
  const onInputChange = (e) => {
    setActividad({ ...actividad, [e.target.name]: e.target.value });
    setAlumno({...alumno, [e.target.name]: e.target.value })
  };

  //checkbox to array
  const handleCheckboxChange = event => {
    let newArray = [...actividad.alumnos, event.target.id];
    if (actividad.alumnos.includes(event.target.id)) {
      newArray = newArray.filter(x => x !== event.target.id);
    } 
    this.setActividad({
      alumnos: { id: newArray, estado:'pendiente',respuesta:''}
    });
    console.log(actividad)
  };


  const onCloseModal = () => {
      closeActModal();
    };

      return (
        <Modal
        isOpen={isActModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={200
        }>

          <h1>
          {' '}
          Nueva Actividad
          <button
            className='btn btn-outline-danger btn-block'
            onClick={onCloseModal}
            style={{ marginLeft: '15px' }}
          >
            <i className='far fa-save'></i>
            <span> Cancelar</span>
          </button>          
          </h1>  

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
          <table className='table table-hover  table-striped table-bordered ml-4 '>
            <thead>
            <tr>
                <th>Alumno</th>
                <th>--</th>
            </tr>
            </thead>
            <tbody>
              {alumnoSeleccion.map((alumno) => (
                  <tr key={alumno}>
                  <td>{alumno.nombre} {alumno.apellido}</td>
                  <td>
                      <input class="form-check-input" type="checkbox" value={alumno._id} id="alumnoCheckbox" onChange={handleCheckboxChange}></input>
                  </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
        </div>
        </Modal>
      )
}