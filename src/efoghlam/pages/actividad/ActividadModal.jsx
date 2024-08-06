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
import { useActividadStore } from '../../../hooks/useActividadStore';
import { getAlumno } from '../../../helpers/getAlumno';
import { getCursos } from '../../../helpers/getCursos';
import { getCurso } from '../../../helpers/getCurso';
import { cargarAlumnosActividad } from '../../../helpers/cargarAlumnosActividad';

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
export const ActividadModal = () => {
  const { isActModalOpen, closeActModal } = useUiStore();
  const { activeActividad, startSavingActividad } = useActividadStore();
  const [isOpen, setIsOpen] = useState(true);
  const [alumnoSeleccion, setAlumnoSeleccion] = useState([]);
  const [cursoLista, setCurso] = useState([]);
  const [activeCurso, setActiveCurso] = useState([]);
  const [inputFields, setInputfields] = useState([{value: ""}]);
  const [show, setShow] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    descripcion: '',
    tipoActividad: '',
    fechaFin: new Date(),
    consigna: '',
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

  //Obtener Cursos
  const getListaCursos = async () => {
    const newCursos = await getCursos();
    // console.log(newCursos);
    setCurso(newCursos);
  };
  useEffect(() => {
    getListaCursos();
  }, []);

  // el valor se va a memorizar si el titulo cambia o si el formSubmitted cambia
  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';
    return formValues.descripcion.length > 0 ? '' : ' is-invalid';
  }, [formValues.descripcion, formSubmitted]);

  useEffect(() => {
    if (activeActividad !== null) {
      setFormValues({ ...activeActividad });
    }
  }, [activeActividad]);

  // para solo sobrescribir el valor del  target
  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
    if (target.value === 'examen') {
      // x = true;
      setShow(true);
    }else if (target.value === 'trabajoPractico') {setShow(false)}
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });    
  };

  const getCursoId = async (id) => {
    console.log(id)
    const newCurso = await getCurso(id);
    // console.log(newCurso);
    setActiveCurso(newCurso);
    console.log(activeCurso[0].comision.alumnos)
  };

  const onInputChangedCursos = ({ target }) => {
    console.log(target.value)
    getCursoId(target.value)
  };

  //Funcion para actualizar el valor de un campo de ingreso
  const handleValueChange = (index, event) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputfields(values);
    console.log(inputFields);
  };

  //Funcion para agregar un nuevo campo
  const handleAddFields = () => {
    setInputfields([...inputFields, {value: ""}]);
  };

   //Funcion para remover campo
  const handleRemoveFields = (index) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputfields(newInputFields);
  };

  const onCloseModal = () => {
    closeActModal();
    setInputfields([])
    setShow(false)
  };

  // const handleCheckboxChange = event => {
  //   let newObj = {"idAlumno":event.target.value, "estado":"pendiente", "respuesta":""};
  //   if (event.target.checked) {
  //     formValues.alumnos.push(newObj)
  //     // setFormValues( [...formValues.alumnos, {"idAlumno":event.target.value, "estado":"pendiente", "respuesta":""} ] );
  //   } else {
  //     formValues.alumnos = formValues.alumnos.filter(function (filtObj) {
  //       return filtObj.idAlumno !== newObj.idAlumno;
  //     });
  //   }
  //   console.log(formValues)
  // };

  const parseDataAlumno = () => {
    const dataAlumno = cargarAlumnosActividad(activeCurso[0].comision.alumnos, inputFields);
    console.log(dataAlumno);
    setFormValues({...formValues, alumnos: dataAlumno});
    // formValues.alumnos.push(dataAlumno)
  }

  const onSubmit = async (event) => {
    parseDataAlumno();

    // console.log(formValues)
    event.preventDefault();
    setFormSubmitted(true);    

    // const difference = differenceInSeconds(formValues.end, formValues.start);
    // if (isNaN(difference) || difference <= 0) {
    //   Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
    //   return;
    // }

    if (formValues.descripcion.length <= 0) return;
    console.log(formValues);

    await startSavingActividad(formValues);
    closeActModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
    isOpen={isActModalOpen}
    onRequestClose={onCloseModal}
    style={customStyles}
    className='modal'
    overlayClassName='modal-fondo'
    closeTimeoutMS={200}
    >
      <h1>
        {' '}
        Nuevo Actividad
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
      <div className='row mt-3'>
          <div className='col-sm-4'>
            <div className='box p-3 mb-3 mt-5' style={{ border: '1px solid #d0d0d0' }}>

              <form onSubmit={onSubmit}>
                <h5 className='mb-3 '>Agregar Actividad</h5>
                <div className='form-group'>
                    <input type='text' 
                        className='form-control  mb-4' 
                        name='descripcion' 
                        value={formValues.descripcion} 
                        onChange={onInputChanged} 
                        placeholder='Descripción de la Actividad' 
                        required='true' 
                    />
                    <select 
                        className='form-control mb-4' 
                        name='tipoActividad' value={formValues.tipoActividad} 
                        onChange={onInputChanged}>
                            <option value="">Seleccione tipo de actividad</option>
                            <option value="examen">Examen</option>
                            <option value="trabajoPractico">Trabajo Práctico</option>
                            {/* <option value="presentacion">Presentación</option> */}
                    </select>
                    <input type="date" 
                        className='form-control  mb-4' 
                        name='fechaFin' 
                        value={formValues.fechaFin} 
                        onChange={onInputChanged}  
                        required='true' />
                    <textarea type='text' 
                        className='form-control  mb-4' 
                        name='consigna' 
                        value={formValues.consigna} 
                        onChange={onInputChanged} 
                        placeholder='Consigna' 
                        required='' 
                    />
                    
                    <select 
                        className='form-control mb-4' 
                        name='curso' value={formValues.curso} 
                        onChange={onInputChangedCursos}
                        >
                          <option value="">Seleccionar Cursos</option>
                          {cursoLista.map((cursos) => (
                            <option value={cursos._id}>{cursos.descripcion}</option>
                          ))}
                    </select>
                    
                    <button type='submit' 
                        className='btn btn-primary btn-block mt-4'>
                            Crear Actividad
                    </button>
                    
                </div>
            </form>
          </div>
        </div>
        <div className='col-sm-8'>
          {/* <table className='table table-hover  table-striped table-bordered ml-4 '>
            <thead>
            <tr>
                <th>Alumno</th>
                <th>--</th>
            </tr>
            </thead>
            <tbody>
              {alumnoSeleccion.map((alumno) => (
                  <tr 
                    key={alumno}
                  >
                  <td>{alumno.nombre} {alumno.apellido}</td>
                  <td>
                      <input class="form-check-input" type="checkbox" value={alumno._id} name="idAlumno" onChange={handleCheckboxChange}></input>
                  </td>
                  </tr>
                ))}
              </tbody>
          </table> */}
          {show ? (<h2>Lista de Preguntas</h2>) : null}
	
          {inputFields.map((inputField, index) => (
            <div className="" key={index}>
              {show ? (<input
                type="text"
                placeholder="Ingrese Pregunta"
                value={inputField.value}
                onChange={(e) => handleValueChange(index, e)}
                style={{ width:'500px' }}
                />) : null}
              
              {show ? (<button className="text-danger mr-2" onClick={(e) => handleRemoveFields(index)}>
                <span class="far fa-trash-alt"></span>
              </button>) : null}
            </div>
          ))}
          {show ? (<button className="mr-2" onClick={handleAddFields}>
            <span class="far fa-add"></span>
          </button>) : null}
        </div>
        
        </div>
    </Modal>
  );
};
