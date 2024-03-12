import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { EfoghlamPage } from '../efoghlam/pages/EfoghlamPage';
import { getEnvVariables } from '../helpers/getEnvVariables.js';
import { useAuthStore } from '../hooks/useAuthStore';
import { useEffect } from 'react';

import { RequireAuth } from '../utils/RequireAuth.jsx';
import { docente_route } from '../router/DocenteRoute.jsx';
import { alumno_route } from '../router/AlumnoRoute.jsx';
import { tutor_route } from '../router/TutorRoute.jsx';
import { Alumno } from '../efoghlam/pages/Alumno.jsx';
import { Docente } from '../efoghlam/pages/Docente.jsx';
import { Tutor } from '../efoghlam/pages/Tutor.jsx';
import { Calendario } from '../efoghlam/pages/Calendario.jsx';
import { Comunicaciones } from '../efoghlam/pages/Comunicaciones.jsx';
import { Notas } from '../efoghlam/pages/Notas.jsx'
// import { Comisiones } from '../efoghlam/pages/Comisiones.jsx';
// import { Actividades } from '../efoghlam/pages/Actividades.jsx';

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status == 'checking') {
    // return <h3>Cargando..</h3>;
    return <div className='img-position'><img src='/public/images/cargando.gif'></img><h3>Cargando..</h3></div>;
  }

  const protectedRoutes = [...docente_route, ...alumno_route, ...tutor_route];
  console.log(getEnvVariables());
  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          {/* si no estoy autenticado muestra login y registro */}
          <Route path='/auth/*' element={<LoginPage />} />
          <Route path='/*' element={<Navigate to={'/auth/login'} />} />
        </>
      ) : (
        <>
          {/* Rutas publicas  */}
          <Route path='/auth/login' element={<EfoghlamPage />} />
          <Route path='/alumnos' element={<Alumno />} />
          <Route path='/docentes' element={<Docente />} />
          <Route path='/tutores' element={<Tutor />} />
          {/* <Route path='/comisiones' element={<Comisiones />} /> */}
          {/* <Route path='/actividades' element={<Actividades />} /> */}
          <Route path='/calendario' element={<Calendario />} />
          <Route path='/comunicaciones' element={<Comunicaciones />} />
          <Route path='/notas' element={<Notas />} />
        </>
      )}
      {protectedRoutes.map((e) => {
        return (
          <Route
            key={e.path}
            exact
            path={e.path}
            element={
              <RequireAuth userroles={e?.availability}>{e.ele}</RequireAuth>
            }
          />
        );
      })}
    </Routes>
  );
};
