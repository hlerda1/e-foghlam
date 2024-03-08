import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { useMemo } from 'react';
import { useUiStore } from '../../../hooks/useUiStore';
import { useComisionStore } from '../../../hooks/useComisionStore';
import { getAlumno } from '../../../helpers/getAlumno';

registerLocale('es', es);

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

// funcion para manejar formulario
export const ComisionModal = () => {
  const { isComModalOpen, closeComModal } = useUiStore();
  const { activeComision, startSavingComision } = useComisionStore();
  const [isOpen, setIsOpen] = useState(true);
  const [alumnoSeleccion, setAlumnoSeleccion] = useState([]);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    nombre: '',
    año: '',
    turno: '',
    alumnos: [],
  });

  //Obtener Alumnos
  const getAlumnos = async () => {
    const newAlumnos = await getAlumno();
    // console.log(newAlumnos);
    setAlumnoSeleccion(newAlumnos);
  };
  useEffect(() => {
    getAlumnos();
  }, []);

  // el valor se va a memorizar si el titulo cambia o si el formSubmitted cambia
  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';
    return formValues.nombre.length > 0 ? '' : ' is-invalid';
  }, [formValues.descripcion, formSubmitted]);

  useEffect(() => {
    if (activeComision !== null) {
      setFormValues({ ...activeComision });
    }
  }, [activeComision]);

  // para solo sobrescribir el valor del  target
  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    closeComModal();
  };

  const handleCheckboxChange = event => {
        
    const newObj = alumnoSeleccion.find(({ _id }) => _id === event.target.value);

    console.log(event.target.value)
    
    if (event.target.checked) {
      formValues.alumnos.push(newObj)
      // setFormValues( {...formValues, alumnos: [newObj] } );
    } else {
      formValues.alumnos = formValues.alumnos.filter(function (filtObj) {
        return filtObj.idAlumno !== newObj.idAlumno;
      });
    }
    console.log(formValues)
  };

  const onSubmit = async (event) => {
    console.log(formValues)
    event.preventDefault();
    setFormSubmitted(true);

    // const difference = differenceInSeconds(formValues.end, formValues.start);
    // if (isNaN(difference) || difference <= 0) {
    //   Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
    //   return;
    // }

    if (formValues.nombre.length <= 0) return;
    console.log(formValues);

    await startSavingComision(formValues);
    closeComModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
    isOpen={isComModalOpen}
    onRequestClose={onCloseModal}
    style={customStyles}
    className='modal'
    overlayClassName='modal-fondo'
    closeTimeoutMS={200}
    >
      <h1>
        {' '}
        Nueva Comision
        <button
          className='btn btn-outline-danger btn-block'
          onClick={onCloseModal}
          style={{ marginLeft: '15px' }}
        >
          <i className='far fa-save'></i>
          <span> Cancelar</span>
        </button>
      </h1>
      <hr />
      <form onSubmit={onSubmit}>
      <div className='row mt-3'>
          <div className='col-sm-4'>
            <div className='box p-3 mb-3 mt-5' style={{ border: '1px solid #d0d0d0' }}>

              
                <h5 className='mb-3 '>Agregar Comision</h5>
                <div className='form-group'>
                    <input type='text' 
                        className='form-control  mb-4' 
                        name='nombre' 
                        value={formValues.nombre} 
                        onChange={onInputChanged} 
                        placeholder='Nombre de la Comision' 
                        required='' 
                    />
                    <select 
                        className='form-control mb-4' 
                        name='año' value={formValues.año} 
                        onChange={onInputChanged}>
                            <option value="">Año</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                    </select>
                    <select 
                        className='form-control mb-4' 
                        name='turno' value={formValues.turno} 
                        onChange={onInputChanged}>
                            <option value="">Turno</option>
                            <option value="Mañana">Mañana</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noche">Noche</option>
                    </select>
                    {/* <input type="date" 
                        className='form-control  mb-4' 
                        name='fechaFin' 
                        value={formValues.fechaFin} 
                        onChange={onInputChanged}  
                        required='' /> */}
                    
                    <button type='submit' 
                        className='btn btn-primary btn-block mt-4'>
                            Crear Comision
                    </button>
                </div>
            
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
                  <tr 
                    key={alumno.alumno}
                  >
                  <td>{alumno.nombre} {alumno.apellido}</td>
                  <td>
                      <input class="form-check-input" type="checkbox" value={alumno._id} name="Alumno" onChange={handleCheckboxChange}></input>
                  </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
        </div>
        </form>
    </Modal>
  );
};
