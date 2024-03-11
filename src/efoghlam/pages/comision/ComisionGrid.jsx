import { Link } from 'react-router-dom';
import { getComision } from '../../../helpers/getComision';
import { getAlumno } from '../../../helpers/getAlumno';
import { useEffect, useState } from 'react';

import efoghlamApi from '../../../api/efoghlamApi';
import Swal from 'sweetalert2';
import { TablaComision } from '../../components/TablaComision';
import { FabAddNewCom } from '../../components/FabAddNewCom';
import { ComisionModal } from './ComisionModal';

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
    await efoghlamApi.post('/comision', comision);
    // alert('Comision Agregada');
    Swal.fire({
      text: 'Comision creada!',
      icon: 'info',
    });
    getComisiones();
  };

  return (
    <>
      <TablaComision />
      <FabAddNewCom />
      <ComisionModal />
    </>
  );
};
