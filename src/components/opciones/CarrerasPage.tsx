import { useState, useEffect } from "react";
import Dock from "../dock/Dock";
import Navbar from "../navbar/Navbar";
import CarrerasCalecita from "./CarrerasCalecita";
import { carreraService } from "../../services/carrera.service";
import type { Carrera } from "../../types/carrera.types";
import { resultadoService } from "../../services/resultado.service";

export default function Carreras() {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [carreraSeleccionada, setCarreraSeleccionada] =
    useState<Carrera | null>(null);
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultadosCarrera, setResultadosCarrera] = useState<any[]>([]);
  const [loadingResultados, setLoadingResultados] = useState(false);

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

  useEffect(() => {
    if (carreraSeleccionada) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [carreraSeleccionada]);

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getEstadoCarrera = (fecha, estado) => {
    const hoy = new Date();
    const fechaCarrera = new Date(fecha);

    if (estado === "completada") {
      return {
        texto: "Completada",
        color: "from-green-600 to-green-500",
        textColor: "text-green-400",
        icon: "🏁",
      };
    } else if (estado === "disponible") {
      return {
        texto: "Disponible",
        color: "from-yellow-600 to-yellow-500",
        textColor: "text-yellow-400",
        icon: "⏳",
      };
    } else {
      return {
        texto: "En preparación",
        color: "from-blue-600 to-blue-500",
        textColor: "text-blue-400",
        icon: "🔧",
      };
    }
  };

  const cargarResultados = async (carreraId: number) => {
    try {
      setLoadingResultados(true);
      const data = await resultadoService.getByCarreraId(carreraId);
      const resultadosOrdenados = data.resultados
        .filter((r: any) => r.posicion !== null)
        .sort((a: any, b: any) => a.posicion - b.posicion);
      setResultadosCarrera(resultadosOrdenados);
    } catch (err) {
      console.error("Error cargando resultados:", err);
      setResultadosCarrera([]);
    } finally {
      setLoadingResultados(false);
    }
  };

  const getPositionBadge = (posicion: number | null) => {
    if (posicion === null) return "—";
    if (posicion === 1)
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 text-black shadow-lg">
          🥇 {posicion}°
        </span>
      );
    if (posicion === 2)
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-gray-400 to-gray-300 text-black shadow-lg">
          🥈 {posicion}°
        </span>
      );
    if (posicion === 3)
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg">
          🥉 {posicion}°
        </span>
      );
    if (posicion <= 10)
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg">
          {posicion}°
        </span>
      );
  };

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
      <section className="py-10 sm:py-14 bg-gradient-to-r from-black via-gray-950 to-black backdrop-blur-md min-h-screen relative overflow-hidden">
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
              onClick={() => setMostrarTodas((v) => !v)}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
            >
              {mostrarTodas
                ? "🔼 Ocultar todas las carreras"
                : "🔽 Ver todas las carreras"}
            </button>
          </div>

          {/* Lista de las carreras */}
          {mostrarTodas && (
            <div className="flex flex-col gap-4 items-center mt-10">
              {carreras.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-2xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No se encontraron carreras
                  </h3>
                </div>
              ) : (
                carreras.map((carrera) => {
                  const estadoInfo = getEstadoCarrera(
                    carrera.fecha_carrera,
                    carrera.estado
                  );
                  const fechaCarrera = new Date(carrera.fecha_carrera);
                  const hoy = new Date();
                  const yaPaso = fechaCarrera < hoy;

                  return (
                    <div
                      key={carrera.id}
                      className="group relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 backdrop-blur-sm rounded-xl flex flex-col w-full max-w-5xl bg-black/40"
                    >
                      {/* Efectos decorativos */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/10 via-transparent to-black/20"></div>
                        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-500 via-transparent to-red-500 animate-pulse"></div>
                      </div>

                      <div className="relative z-10 p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between text-center lg:text-left gap-6">
                          {/* Información principal */}
                          <div className="flex-1">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${estadoInfo.color} text-white shadow-lg mb-2`}
                            >
                              {estadoInfo.texto}
                            </div>
                            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 mb-4">
                              <h3 className="text-2xl font-bold text-white mb-2 lg:mb-0 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                {carrera.nombre}
                              </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center justify-center lg:justify-start gap-2">
                                <span className="text-gray-400">📅 Fecha:</span>
                                <span className="text-white font-medium">
                                  {formatearFecha(carrera.fecha_carrera)}
                                </span>
                              </div>
                              <div className="flex items-center justify-center lg:justify-start gap-2">
                                <span className="text-gray-400">
                                  🏁 Circuito:
                                </span>
                                <span className="text-white font-medium">
                                  {carrera.circuito?.nombre}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Información de resultados/estado */}
                          <div className="flex-shrink-0">
                            <div className="bg-red-800/30 rounded-lg p-4 border border-red-800/30 shadow-inner min-w-[200px]">
                              {yaPaso ? (
                                <div>
                                  <h4 className="text-white font-semibold mb-2 text-center">
                                    🏆 Aca iria el podio
                                  </h4>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <p
                                    className={`font-semibold mb-2 ${estadoInfo.textColor}`}
                                  >
                                    {estadoInfo.texto}
                                  </p>
                                  <p className="text-gray-400 text-sm">
                                    {!yaPaso
                                      ? "Próxima carrera"
                                      : "Pendiente de resultados"}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Botón Ver más */}
                          <div className="flex-shrink-0">
                            <button
                              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
                              onClick={() => {
                                setCarreraSeleccionada(carrera);
                                cargarResultados(carrera.id);
                                // Forzar scroll al top después de abrir
                                setTimeout(() => window.scrollTo(0, 620), 0);
                              }}
                            >
                              📋 Ver detalles
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Franja inferior decorativa */}
                      <div
                        className={`absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r ${estadoInfo.color} shadow-lg`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </div>

                      {/* Decoraciones en esquinas */}
                      <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-red-500/30 to-transparent"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-red-500/30 to-transparent"></div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Modal de detalle */}
          {carreraSeleccionada && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-black/30 p-8 rounded-xl shadow-2xl border border-red-600/40 max-w-2xl w-full my-8 relative">
                <div className="relative z-10">
                  <button
                    onClick={() => setCarreraSeleccionada(null)}
                    className="absolute top-0 right-0 text-gray-400 hover:text-white text-2xl cursor-pointer transition-colors"
                  >
                    ✕
                  </button>

                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                      {carreraSeleccionada.nombre}
                    </h3>
                    <p className="text-gray-400 text-lg">
                      {formatearFecha(carreraSeleccionada.fecha_carrera)} -{" "}
                      {carreraSeleccionada.hora_carrera}:00
                    </p>
                    <div
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${
                        getEstadoCarrera(
                          carreraSeleccionada.fecha_carrera,
                          carreraSeleccionada.estado
                        ).color
                      } text-white shadow-lg mt-2`}
                    >
                      {
                        getEstadoCarrera(
                          carreraSeleccionada.fecha_carrera,
                          carreraSeleccionada.estado
                        ).icon
                      }{" "}
                      {
                        getEstadoCarrera(
                          carreraSeleccionada.fecha_carrera,
                          carreraSeleccionada.estado
                        ).texto
                      }
                    </div>
                  </div>

                  {/* Información del circuito */}
                  <div className="mb-6 bg-black/80 rounded-lg p-6 py-3 border border-red-800/30">
                    <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      Información del Circuito
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Nombre:</span>
                        <span className="text-white font-medium">
                          {carreraSeleccionada.circuito?.nombre}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">País:</span>
                        <span className="text-white font-medium">
                          {carreraSeleccionada.circuito?.pais}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Ubicación:</span>
                        <span className="text-white font-medium">
                          {carreraSeleccionada.circuito?.ubicacion}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Vueltas:</span>
                        <span className="text-white font-medium">
                          {carreraSeleccionada.circuito?.vueltas}
                        </span>
                      </div>
                      <div className="flex justify-between md:col-span-2">
                        <span className="text-gray-400">Longitud:</span>
                        <span className="text-white font-medium">
                          {carreraSeleccionada.circuito?.longitud_km} km
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Resultados de la carrera */}
                  {carreraSeleccionada.estado === "completada" && (
                    <div className="mb-6 bg-black rounded-lg p-6 py-3 border border-red-800/30">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        Resultados de la Carrera
                      </h4>
                      {loadingResultados ? (
                        <div className="flex justify-center py-8">
                          <div className="w-8 h-8 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
                        </div>
                      ) : resultadosCarrera.length > 0 ? (
                        <div className="space-y-2 max-h-65 overflow-y-auto scrollbar-personalizada">
                          {resultadosCarrera.map((resultado, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between bg-black/40 p-1 md:px-10 border-b border-red-900/30 hover:border-red-700/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                  {resultado.piloto.nombre.charAt(0)}
                                  {resultado.piloto.apellido.charAt(0)}
                                </div>
                                <span className="text-white font-medium">
                                  {resultado.piloto.nombre}{" "}
                                  {resultado.piloto.apellido}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                {resultado.estado && (
                                  <span className="text-gray-400 text-sm">
                                    {resultado.estado}
                                  </span>
                                )}
                                {getPositionBadge(resultado.posicion)}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-400">
                            No hay resultados disponibles
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Botón cerrar */}
                  <div className="text-center">
                    <button
                      onClick={() => {
                        setCarreraSeleccionada(null);
                        setResultadosCarrera([]);
                      }}
                      className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Dock />
    </>
  );
}
