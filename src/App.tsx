import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "./api";
import "./app.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import PrediccionPage from "./pages/PrediccionPage";
import PerfilPage from "./pages/PerfilPage";
import ConfiguracionPage from "./pages/ConfiguracionPage";
import LandingPage from "./pages/LandingPage";

import Circuitos from "./components/admin/circuitos/Circuitos";
import Pilotos from "./components/admin/pilotos/Pilotos";
import Escuderias from "./components/admin/escuderias/Escuderias";
import Carreras from "./components/admin/carreras/Carreras";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";

import RankingPage from "./components/opciones/RankingPage";
import CarrerasPage from "./components/opciones/CarrerasPage";
import PilotosPage from "./components/opciones/PilotosPage";
import TorneosPage from "./components/opciones/TorneosPage";
import ForoPage from "./components/opciones/ForoPage";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    api()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Configuración de rutas y componentes

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                {" "}
                <AdminPage />{" "}
              </AdminRoute>
            }
          />
          <Route
            path="/admin/circuitos"
            element={
              <AdminRoute>
                {" "}
                <Circuitos />{" "}
              </AdminRoute>
            }
          />
          <Route
            path="/admin/pilotos"
            element={
              <AdminRoute>
                {" "}
                <Pilotos />{" "}
              </AdminRoute>
            }
          />
          <Route
            path="/admin/escuderias"
            element={
              <AdminRoute>
                {" "}
                <Escuderias />{" "}
              </AdminRoute>
            }
          />
          <Route
            path="/admin/carreras"
            element={
              <AdminRoute>
                {" "}
                <Carreras />{" "}
              </AdminRoute>
            }
          />
          <Route path="/torneos" element={<TorneosPage />} />
          <Route path="/foro" element={<ForoPage />} />
          <Route
            path="/perfil"
            element={
              <UserRoute>
                {" "}
                <PerfilPage />{" "}
              </UserRoute>
            }
          />
          <Route
            path="/configuracion"
            element={
              <UserRoute>
                {" "}
                <ConfiguracionPage />{" "}
              </UserRoute>
            }
          />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/carreras" element={<CarrerasPage />} />
          <Route path="/pilotos" element={<PilotosPage />} />
          <Route path="/prediccion" element={<PrediccionPage />} />
        </Routes>
      </BrowserRouter>

      {/* Toast Container global */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: "#111827",
          color: "#f3f4f6",
          border: "1px solid #dc2626",
        }}
      />
    </>
  );
}

export default App;
