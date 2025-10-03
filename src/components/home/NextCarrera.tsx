import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { carreraService } from "../../services/carrera.service";
import type { Carrera } from "../../types/carrera.types";

export function NextCarrera() {
  const [proximaCarrera, setProximaCarrera] = useState<Carrera | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProximaCarrera = async () => {
      try {
        setLoading(true);
        const carrera = await carreraService.getProxima();
        setProximaCarrera(carrera);
        setError(null);
      } catch (err) {
        console.error('Error cargando próxima carrera:', err);
        setError('No se pudo cargar la información de la próxima carrera');
      } finally {
        setLoading(false);
      }
    };

    fetchProximaCarrera();
  }, []);

  // Función para formatear la fecha
  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Función para formatear la hora
  const formatearHora = (hora: number) => {
    return `${hora.toString().padStart(2, '0')}:00`;
  };

  if (loading) {
    return (
      <section className="pt-14 pb-10 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        <div className="container relative mx-auto max-w-6xl px-4">
          <div className="p-5 px-15 m-1 border-2 border-red-900/50 flex items-center justify-center min-h-[200px]">
            <p className="text-gray-400 text-lg">Cargando próxima carrera...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !proximaCarrera) {
    return (
      <section className="pt-14 pb-10 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        <div className="container relative mx-auto max-w-6xl px-4">
          <div className="p-5 px-15 m-1 border-2 border-red-900/50 flex items-center justify-center min-h-[200px]">
            <p className="text-gray-400 text-lg">
              {error || 'No hay carreras programadas en este momento'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-14 pb-0 md:pb-10 bg-black relative overflow-hidden">
      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="p-5 px-15 m-1 md:flex overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2">
          <div className="flex-1 md:text-left pb-3 text-center md:px-5">
            <h2 className="font-montserrat text-3xl font-bold text-red-500 mb-2 bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
              Próxima Carrera
            </h2>
            <h3 className="text-xl font-semibold text-white">
              {proximaCarrera.nombre}
            </h3>
            {/*<p className="text-gray-300">{proximaCarrera.circuito.ubicacion}</p>*/}
            <p className="mt-2 text-gray-400 text-lg">
              {formatearFecha(proximaCarrera.fecha_carrera)} - {formatearHora(proximaCarrera.hora_carrera)}
            </p>
          </div>

          {/* Botón */}
          <div className="flex items-center justify-center md:justify-end">
            <Link
              to="/prediccion"
              className="text-lg md:text-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-8 py-3 rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-transform hover:scale-105"
            >
              Haz tu predicción
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
