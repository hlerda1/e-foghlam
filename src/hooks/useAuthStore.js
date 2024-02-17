import { useDispatch, useSelector } from 'react-redux';
import efoghlamApi from '../api/efoghlamApi';
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from '../store/slices/authSlice';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    console.log({ email, password });
    //2 respuestas
    try {
      const { data } = await efoghlamApi.post('/auth', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ nombre: data.nombre, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout('Credenciales invalidas'));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  // metodo startRegister
  const startRegister = async ({
    nombre,
    apellido,
    dni,
    fechaNacimiento,
    email,
    password,
    rol,
}) => {
    dispatch(onChecking());
    console.log({ email, password });
    //2 respuestas
    try {
      const { data } = await efoghlamApi.post('/auth/new', {
        nombre,
        apellido,
        dni,
        fechaNacimiento,
        email,
        password,
        rol,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ nombre: data.nombre, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || ''));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return dispatch(onLogout('token expirado'));
    }
    try {
      const { data } = await efoghlamApi.post('/auth/renew');
      console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ nombre: data.nombre, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    // regresa status, usuario, error
    status,
    user,

    errorMessage,
    startLogin,
    startRegister,
    startLogout,
    checkAuthToken,
  };
};
