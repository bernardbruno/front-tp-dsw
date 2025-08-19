import { useState, useEffect } from "react";
import Dock from "../dock/Dock";
import Navbar from "../navbar/Navbar"
import CarrerasCalecita from "./CarrerasCalecita";

export default function Carreras() {
  const [carreras, setCarreras] = useState([]);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState(null);
  const [mostrarTodas, setMostrarTodas] = useState(false); // <-- Faltaba esto

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/carreras");
      const data = await res.json();
      setCarreras(data);
    };
    fetchData();
  }, []);

  const hoy = new Date();

  return (
    <>
      <Navbar />
      <section className="py-14 bg-gradient-to-r from-black via-gray-950 to-black backdrop-blur-md min-h-screen relative overflow-hidden">
        {/* Líneas decorativas */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          <div className="absolute top-2/4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </div>

        <div className="container relative mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
              Carreras de la Temporada
            </h2>
            <p className="mt-4 text-gray-300 text-lg">
              Consulta el calendario y resultados de las carreras
            </p>
          </div>

          <CarrerasCalecita />

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setMostrarTodas((v) => !v)}
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer">
              {mostrarTodas ? "Ocultar carreras" : "Ver todas las carreras"}
            </button>
          </div>

          {mostrarTodas && (
            <div className="flex flex-col gap-8 items-center mt-10">
              {carreras.map((carrera) => {
                const fechaCarrera = new Date(carrera.fechaCarrera);
                const yaPaso = fechaCarrera < hoy;
                return (
                  <div
                    key={carrera.id}
                    className="group relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 backdrop-blur-sm p-6 rounded-lg flex flex-col w-full max-w-4xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{carrera.nombre}</h3>
                        <p className="text-gray-400 text-sm">
                          {carrera.fechaCarrera} - {carrera.horaCarrera}
                        </p>
                        <p className="text-gray-300 mt-2">
                          {carrera.circuito?.nombre} ({carrera.circuito?.pais})
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        {yaPaso && carrera.resultados && carrera.resultados.length > 0 ? (
                          <div className="text-sm text-gray-200">
                            <p className="text-yellow-400">
                              🥇 {carrera.resultados[0]?.nombre}
                            </p>
                            <p className="text-gray-300">
                              🥈 {carrera.resultados[1]?.nombre}
                            </p>
                            <p className="text-gray-400">
                              🥉 {carrera.resultados[2]?.nombre}
                            </p>
                          </div>
                        ) : (
                          <p className="text-red-400 font-semibold">📅 Próximamente</p>
                        )}
                      </div>
                      <div className="mt-6 md:mt-0 flex justify-center md:justify-end">
                        <button
                          className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
                          onClick={() => setCarreraSeleccionada(carrera)}>
                          Ver más
                        </button>
                      </div>
                    </div>
                    {/* Franja inferior */}
                    <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-red-600 to-red-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Modal de detalle */}
          {carreraSeleccionada && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-xl shadow-lg border border-red-600/40 max-w-2xl w-full relative mx-3">
                <button
                  onClick={() => setCarreraSeleccionada(null)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl">
                  ✕
                </button>
                <h3 className="text-2xl font-bold mb-2 text-center bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  {carreraSeleccionada.nombre}
                </h3>
                <p className="text-gray-400 text-center mb-4">
                  {carreraSeleccionada.fechaCarrera} - {carreraSeleccionada.horaCarrera}
                </p>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-white mb-1">Circuito</h4>
                  <div className="text-gray-300">
                    <p><span className="font-semibold">Nombre:</span> {carreraSeleccionada.circuito?.nombre}</p>
                    <p><span className="font-semibold">Ubicación:</span>      {carreraSeleccionada.circuito?.ubicacion}</p>
                    <p><span className="font-semibold">País:</span> {carreraSeleccionada.circuito?.pais}</p>
                    <p><span className="font-semibold">Vueltas:</span>{carreraSeleccionada.circuito?.vueltas}</p>
                    <p><span className="font-semibold">Longitud:</span> {carreraSeleccionada.circuito?.longitud_km} km</p>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-white mb-1">Pilotos</h4>
                  <ul className="text-gray-300 list-disc list-inside">
                    {carreraSeleccionada.pilotos?.map((piloto, idx) => (
                      <li key={idx}>
                        {piloto.nombre} {piloto.apellido ? piloto.apellido : ""} {piloto.escuderia ? `(${piloto.escuderia})` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Resultados</h4>
                  {carreraSeleccionada.resultados && carreraSeleccionada.resultados.length > 0 ? (
                    <ol className="text-gray-300 list-decimal list-inside">
                      {carreraSeleccionada.resultados.map((piloto, idx) => (
                        <li key={idx}>
                          {piloto.nombre} {piloto.apellido ? piloto.apellido : ""} {piloto.escuderia ? `(${piloto.escuderia})` : ""}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-gray-400">Aún no hay resultados.</p>
                  )}
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setCarreraSeleccionada(null)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-md transition-all cursor-pointer">
                    Cerrar
                  </button>
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