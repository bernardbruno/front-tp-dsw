import { useState, useEffect } from "react";
import Dock from "../Dock";
import Navbar from "../Navbar";
import CarrerasCalecita from "./CarrerasCalecita";
import { carreraService } from "../../services/carrera.service";
import type { Carrera } from "../../types/carrera.types";
import { useNavigate } from "react-router-dom";

export default function Carreras() {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await carreraService.getAll();
        const carrerasOrdenadas = data.sort(
          (a, b) =>
            new Date(a.fecha_carrera).getTime() -
            new Date(b.fecha_carrera).getTime()
        );
        setCarreras(carrerasOrdenadas);
      } catch (err) {
        console.error("Error al obtener las carreras:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-14 bg-gradient-to-r from-black via-gray-950 to-black backdrop-blur-md min-h-screen relative overflow-hidden">
        <div className="container relative mx-auto px-4 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Cargando Calendario
            </h2>
            <p className="text-gray-400">
              Obteniendo todas las carreras de la temporada...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Navbar />
      <section className="py-10 sm:py-14 bg-gradient-to-b from-[#100000] via-[#1b0000] via-60% to-black backdrop-blur-md min-h-screen relative overflow-hidden">
        <div className="container relative mx-auto px-4">
          {/* Título */}
          <div className="text-center mb-2 sm:mb-12">
            <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent mb-4">
              Carreras de la Temporada
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Consulta el calendario completo y los resultados de todas las
              carreras
            </p>
            <div className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-red-600 via-white to-red-600 rounded-full"></div>
          </div>

          <CarrerasCalecita />

          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => navigate("/carreras/todas")}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer mt-6 mb-16 sm:mt-20"
            >
              Ver todas las carreras
            </button>
          </div>
        </div>
      </section>
      <Dock />
    </>
  );
}
