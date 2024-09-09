import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBs from 'react-bootstrap/Navbar';
import './navbar.css'

const Navbar = () => {
    return (
        <NavbarBs bg="dark" data-bs-theme="dark">
            <Container fluid>
                <NavbarBs.Brand href="#home">Tienda</NavbarBs.Brand>
                <Nav className="nav-container justify-content-evenly">
                    <Nav.Item>
                        <Link to='/' className='nav-link'>Home</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/create' className='nav-link'>Crear</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/show' className='nav-link'>Listar</Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </NavbarBs>
    )
}

export default Navbar