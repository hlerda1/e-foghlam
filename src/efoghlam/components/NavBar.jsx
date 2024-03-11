import { useEffect, useState } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { Link, NavLink } from 'react-router-dom';
import {Navbar,Nav,Container,NavDropdown} from "react-bootstrap";

export const NavBar = () => {
  const { startLogout, user } = useAuthStore();
  const [show, setShow] = useState(false);

  let x;
  let currentUserRole;
  if (localStorage.getItem('user')) {
    currentUserRole = JSON.parse(localStorage.getItem('user'));
  }

  if (currentUserRole === 'docente') {
    x = true;
  }
  useEffect(() => {
    setShow(x);
  }, []);

  return (

    <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark" className='space '>
      {/* <Container > */}
        <Navbar.Brand className='text-size'>
          <span 
          // className='navbar-brand'
          >
            <img src="src/images/Foghlan_logo_trans.png" alt="Logo" width={40} height={40}/>
              &nbsp;
            {user.nombre}
          </span>
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
               <div className='navbar navbar-expand navbar-dark bg-dark mb px-4'> 
                <div className='container-fluid'>
                  <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/auth/login'>Inicio</NavLink>
                      {show ? (
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/comisiones'>Comisiones</NavLink>
                      ) : null}
                      <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/calendario'>Calendario</NavLink>
                      {show ? (
                      <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/actividades'>Actividades</NavLink>
                      ) : null}
                      <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/notas'>Notas</NavLink>
                      <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/comunicaciones'>Comunicaciones</NavLink>
                      
                      <button onClick={startLogout} className='btn btn-outline-danger'>
                        <i className='fas fa-sign-out alt'></i>
                        &nbsp;
                        <span>Salir</span>
                      </button>

                    </ul>
                  </div>
                </div>
              
            </div>
          </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
  );
};
