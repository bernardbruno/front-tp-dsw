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

  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const formatearHora = (hora: number) => {
    return `${hora.toString().padStart(2, '0')}:00`;
  };

  if (loading) {
    return (
      <section className="pt-14 pb-10 bg-black">
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="relative bg-black/40 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-red-950/20"></div>
            <div className="relative flex flex-col items-center justify-center min-h-[250px] gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-red-950/30 rounded-full"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-t-red-500 border-r-red-500/50 rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-400 text-lg font-medium">Cargando próxima carrera...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !proximaCarrera) {
    return (
      <section className="pt-14 pb-10 bg-black">
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="relative bg-black/40 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-red-950/20"></div>
            <div className="relative flex items-center justify-center min-h-[250px]">
              <p className="text-gray-400 text-lg text-center font-medium">
                {error || 'No hay carreras programadas en este momento'}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-14 pb-10">
      <div className="container relative mx-auto max-w-7xl px-4">
        <div className="relative bg-black/40 backdrop-blur-xl border border-red-600/60 p-1 overflow-hidden group hover:border-red-600/80 transition-all duration-500 max-w-6xl mx-auto hover:shadow-xl hover:shadow-red-500/20">

          <div className="relative bg-gradient-to-b from-black via-[#1b0000] via-60% to-black p-8">

            {/* Líneas decorativas esquina inferior derecha */}
            <div className="absolute bottom-0 right-0 rotate-180">
              <div className="hidden sm:flex flex-col gap-1 p-6">
                <div className="w-20 h-0.5 bg-gradient-to-r from-red-500 to-transparent"></div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-transparent"></div>
                <div className="w-12 h-0.5 bg-gradient-to-r from-red-500 to-transparent"></div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">       
              <div className="flex-1 space-y-5">
                <div className="inline-flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500 blur-xl opacity-50"></div>
                    <div className="relative px-5 py-2 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-lg overflow-hidden">
                      <span className="relative text-white text-xs font-black tracking-widest uppercase flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        Próxima Carrera
                      </span>
                    </div>
                  </div>
                </div>

                {/* Título con efecto de velocidad */}
                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-montserrat tracking-tight leading-tight">
                    {proximaCarrera.nombre}
                  </h3>
                  <div className="h-1 w-24 bg-gradient-to-r from-red-500 via-white to-transparent rounded-full"></div>
                </div>

                {/* Información de fecha y hora con diseño moderno */}
                <div className="flex flex-col sm:flex-row gap-4 ">
                  <div className="flex items-center gap-3 bg-white/3 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10 hover:border-red-500/30 transition-colors duration-300">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                        <line x1="16" x2="16" y1="2" y2="6"/>
                        <line x1="8" x2="8" y1="2" y2="6"/>
                        <line x1="3" x2="21" y1="10" y2="10"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Fecha</p>
                      <p className="text-white font-bold text-sm sm:text-base">
                        {formatearFecha(proximaCarrera.fecha_carrera)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/3 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10 hover:border-red-500/30 transition-colors duration-300">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Hora</p>
                      <p className="text-white font-bold text-sm sm:text-base">
                        {formatearHora(proximaCarrera.hora_carrera)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/prediccion"
                className="group/btn relative w-full lg:w-auto overflow-hidden"
              >
                
                {/* Botón principal */}
                <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-2xl p-[2px] overflow-hidden">
                  <div className="relative bg-gradient-to-b from-red-600 to-red-700 rounded-2xl px-10 py-5 flex items-center justify-center gap-3 group-hover/btn:from-red-500 group-hover/btn:to-red-600 transition-all duration-300">
                    <span className="text-white text-lg sm:text-xl font-black tracking-wide uppercase">
                      Predecir Ahora
                    </span>
                  </div>
                </div>

                {/* Efecto abajo del botón */}
                <div className="mt-3 flex justify-center gap-1">
                  <div className="w-8 h-0.5 bg-red-500/50 group-hover/btn:bg-red-500 transition-colors duration-300"></div>
                  <div className="w-12 h-0.5 bg-red-500/50 group-hover/btn:bg-red-500 transition-colors duration-300 delay-75"></div>
                  <div className="w-16 h-0.5 bg-red-500/50 group-hover/btn:bg-red-500 transition-colors duration-300 delay-150"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}