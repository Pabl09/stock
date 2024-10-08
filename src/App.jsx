import React, { useReducer, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from './componentes/Navbar/Navbar';
import AppRoutes from './routes/Routes';
import { ItemsContext, ItemsReducer } from './context/itemsContext'

const initialState = []

function App() {

  const [items, dispatch] = useReducer(ItemsReducer, initialState)

  return (
    <>
      <Router>
        <ItemsContext.Provider value={{items, dispatch}}>
          <Navbar />
          <AppRoutes />
        </ItemsContext.Provider>
      </Router>
    </>
  )
}

export default App
