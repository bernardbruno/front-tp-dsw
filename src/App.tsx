import { useState } from 'react'
import './App.css'
import Notas from './components/notas'
import Contador from './components/contador'
import FetchJson from './components/FetchJson'


function App() {

  // Pasar props de padre a hijo
    const notasProps = [
        { id: crypto.randomUUID(), title: 'Nota sobre la carrera' },
        { id: crypto.randomUUID(), title: 'Resumen de la clasificación' },
        { id: crypto.randomUUID(), title: 'Análisis de pilotos' },
        { id: crypto.randomUUID(), title: 'Estrategias de equipo'},
        { id: crypto.randomUUID(), title: 'Impacto de las condiciones climáticas'}
    ]


  return (
    <>
      <Contador />
      {/* <Notas notasProps={notasProps}/> */}
      <FetchJson />
    </>
  )
}

export default App
