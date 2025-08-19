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
import AdminRoute from './components/AdminRoute'
import UserRoute from "./components/UserRoute"
import PerfilPage from './pages/PerfilPage'
import ConfiguracionPage from './pages/ConfiguracionPage'
import './app.css'
import LandingPage from './pages/LandingPage'
import RankingPage from './components/opciones/RankingPage'
import CarrerasPage from './components/opciones/CarrerasPage'
import PilotosPage from './components/opciones/PilotosPage'
import TorneosPage from './components/opciones/TorneosPage'
import ForoPage from './components/opciones/ForoPage'


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
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={
            <AdminRoute>  <AdminPage /> </AdminRoute> 
          } />
          <Route path="/admin/circuitos" element={<Circuitos />} />
          <Route path="/admin/pilotos" element={<Pilotos />} />
          <Route path="/admin/escuderias" element={<Escuderias />} />
          <Route path="/torneos" element={<TorneosPage />} />
          <Route path="/foro" element={<ForoPage />} />
          <Route path="/perfil" element={
            <UserRoute> <PerfilPage /> </UserRoute>
          } />
          <Route path="/configuracion" element={
            <UserRoute> <ConfiguracionPage /> </UserRoute>
          } />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/carreras" element={<CarrerasPage />} />
          <Route path="/pilotos" element={<PilotosPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
