import './LoginPage.css';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// objeto para manejar formulario login
const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};
// objeto para manejar formulario registro
const registerFormFields = {
  RegisterNombre: '',
  RegisterApellido: '',
  RegisterDNI: '',
  RegisterFechaNac: '',
  RegisterEmail: '',
  RegisterPassword: '',
  RegisterPassword2: '',
  RegisterRol: '',
};



export const LoginPage = () => {
  const { startLogin, errorMessage, user, startRegister } = useAuthStore();
  // estado inicial es loginFormFields  
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  //
  const [userRole, setUserRole] = useState();
  const navigate = useNavigate();

  // metodo para enviar datos al formulario login
  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
    console.log(user.nombre);
    localStorage.setItem('user', JSON.stringify(userRole));
    navigate('/auth/login');
  };

  const {
    RegisterNombre,
    RegisterApellido,
    RegisterDNI,
    RegisterFechaNac,
    RegisterEmail,
    RegisterPassword,
    RegisterPassword2,
    RegisterRol,

    onInputChange: onRegisterInputChange,
    // poner cada register en cada campo con onRegisterInputChange
  } = useForm(registerFormFields);

  //
  const registerSubmit = (event) => {
    event.preventDefault();
    //
    if (RegisterPassword !== RegisterPassword2) {
      Swal.fire({
        text: 'Error, las contraseñas no coinciden',
        icon: 'warning',
      });
      // return;
    } else {
      Swal.fire({
        text: 'Usuario creado!',
        icon: 'success',
      });
    }
    startRegister({
      nombre: RegisterNombre,
      apellido: RegisterApellido,
      dni: RegisterDNI,
      fechaNacimiento: RegisterFechaNac,
      email: RegisterEmail,
      password: RegisterPassword,
      rol: RegisterRol,
    });
  };

  //useEffect me permite disparar error alerta cuando usuario es invalido
  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticacion', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <div className='container login-container'>
      <div className='row'>
        <div className='col-md-6 login-form-1'>
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Email'
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='loginPassword'
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>

            <div className='form-group mb-2'>
              <select
                required
                className='form-control'
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option value='' selected disabled>
                  Selecciona Usuario
                </option>
                <option value={'Docente'}>Docente</option>
                <option value={'Alumno'}>Alumno</option>
                <option value={'Tutor'}>Tutor</option>
              </select>
            </div>

            <div className='form-group mb-2'>
              <input type='submit' className='btnSubmit' value='Login' />
            </div>
          </form>
        </div>

        <div className='col-md-6 login-form-2'>
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Nombre'
                name='RegisterNombre'
                value={RegisterNombre}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Apellido'
                name='RegisterApellido'
                value={RegisterApellido}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='dni'
                name='RegisterDNI'
                value={RegisterDNI}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Fecha nacimiento'
                name='RegisterFechaNac'
                value={RegisterFechaNac}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className='form-group mb-2'>
              <input
                type='email'
                className='form-control'
                placeholder='Email'
                name='RegisterEmail'
                value={RegisterEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='RegisterPassword'
                value={RegisterPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Repita la contraseña'
                name='RegisterPassword2'
                value={RegisterPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Ingrese rol '
                name='RegisterRol'
                value={RegisterRol}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className='form-group mb-2'>
              <input type='submit' className='btnSubmit' value='Crear cuenta' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
