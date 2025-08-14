import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminPage from './pages/AdminPage'
import { useEffect, useState } from 'react'
import { api } from './api'
import Circuitos from './components/admin/circuitos/Circuitos'
import Pilotos from './components/admin/pilotos/Pilotos'
import Escuderias from './components/admin/escuderias/Escuderias'
import TorneosPage from './pages/TorneosPage'
import ForoPage from './pages/ForoPage'
import AdminRoute from './components/AdminRoute'
import UserRoute from "./components/UserRoute"
import PerfilPage from './pages/PerfilPage'
import ConfiguracionPage from './pages/ConfiguracionPage'
import './app.css'

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={
            <AdminRoute>  <AdminPage /> </AdminRoute> 
          } />
          <Route path="/circuitos" element={<Circuitos />} />
          <Route path="/pilotos" element={<Pilotos />} />
          <Route path="/escuderias" element={<Escuderias />} />
          <Route path="/torneosPage" element={<TorneosPage />} />
          <Route path="/foroPage" element={<ForoPage />} />
          <Route path="/perfil" element={
            <UserRoute> <PerfilPage /> </UserRoute>
          } />
          <Route path="/configuracion" element={
            <UserRoute> <ConfiguracionPage /> </UserRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
