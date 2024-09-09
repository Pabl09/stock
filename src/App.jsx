import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Home from './pages/Home'
import CreateProduct from './pages/CreateProduct'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <>
      <Router>

        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Item>
                <Link to='/'>Home</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to='/create'>Crear</Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateProduct />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
