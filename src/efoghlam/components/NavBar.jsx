import { useEffect, useState } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { Link, NavLink } from 'react-router-dom';
// import {Navbar,Nav,Container,NavDropdown} from "react-bootstrap";


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

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

    // <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark" className='space '>
    //   {/* <Container > */}
    //     <Navbar.Brand className='text-size'>
    //       <span 
    //       // className='navbar-brand'
    //       >
    //         <img src="public/Images/Foghlan_logo_trans.png" alt="Logo" width={40} height={40}/>
    //           &nbsp;
    //         {user.nombre}
    //       </span>
    //     </Navbar.Brand>
    //       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //         <Navbar.Collapse id="responsive-navbar-nav">
    //            <div className='navbar navbar-expand navbar-dark bg-dark mb px-4'> 
    //             <div className='container-fluid'>
    //               <div className='collapse navbar-collapse' id='navbarNav'>
    //                 <ul className='navbar-nav'>
    //                     <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/auth/login'>Inicio</NavLink>
    //                   {show ? (
    //                     <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/comisiones'>Comisiones</NavLink>
    //                   ) : null}
    //                   <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/calendario'>Calendario</NavLink>
    //                   {show ? (
    //                   <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/actividades'>Actividades</NavLink>
    //                   ) : null}
    //                   <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/notas'>Notas</NavLink>
    //                   <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/comunicaciones'>Comunicaciones</NavLink>
                      
    //                   <button onClick={startLogout} className='btn btn-outline-danger'>
    //                     <i className='fas fa-sign-out alt'></i>
    //                     &nbsp;
    //                     <span>Salir</span>
    //                   </button>

    //                 </ul>
    //               </div>
    //             </div>
              
    //         </div>
    //       </Navbar.Collapse>
    //     {/* </Container> */}
    //   </Navbar>

    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-dark mb-3" variant="dark">
          <Container fluid>
            <Navbar.Brand href="/auth/login">
              <span>
                <img src="public/Images/Foghlan_logo_trans.png" alt="Logo" width={40} height={40}/>
                  &nbsp;
                {user.nombre}
              </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  E-Foghlam
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {show ? (<Nav.Link href="/comisiones">Comisiones</Nav.Link>) : null}
                  <Nav.Link href="/calendario">Calendario</Nav.Link>
                  {show ? (<Nav.Link href="/actividades">Actividades</Nav.Link>) : null}
                  <Nav.Link href="/notas">Notas</Nav.Link>
                  <Nav.Link href="/comunicaciones">Comunicaciones</Nav.Link>
                  <button onClick={startLogout} className='btn btn-outline-danger'>
                       <i className='fas fa-sign-out alt'></i>
                        &nbsp;
                        <span>Salir</span>
                      </button>
                  {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>


  );
};
