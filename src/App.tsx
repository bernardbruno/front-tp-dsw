import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/navbar/Navbar'
import Dock from './components/dock/Dock'
import Footer from './components/footer/Footer'
import { useEffect, useState } from 'react'
import { api } from './api'

function App() {

  const [data, setData] = useState('');
  // Llamada a la API para obtener datos al iniciar la aplicación
  // Esto se puede usar para cargar datos iniciales o configurar el estado de la aplicación
  useEffect(() => {
    api().then(data => {
      setData(data)
    }).catch(error => {
      console.error('Error:', error);
    });
  }, [])

  // Configuración de rutas y componentes

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
        <Dock />
      </BrowserRouter>
    </>
  )
}

export default App
