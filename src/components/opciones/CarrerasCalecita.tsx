import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { carreraService } from "../../services/carrera.service";
import { resultadoService } from "../../services/resultado.service";

export default function CarrerasCalecita() {
  const [carreras, setCarreras] = useState([]);
  const [indexCentral, setIndexCentral] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await carreraService.getAll();

        const carrerasOrdenadas = data.sort(
          (a, b) =>
            new Date(a.fecha_carrera).getTime() -
            new Date(b.fecha_carrera).getTime()
        );

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const idx = data.findIndex((c) => new Date(c.fecha_carrera) >= hoy);
        setCarreras(carrerasOrdenadas);
        setIndexCentral(idx === -1 ? carrerasOrdenadas.length - 1 : idx);
      } catch (err) {
        console.error("Error cargando carreras:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const carreraAnterior = carreras[indexCentral - 1];
  const carreraCentral = carreras[indexCentral];
  const carreraSiguiente = carreras[indexCentral + 1];

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Función para obtener el podio de una carrera
  const getPodio = async (carreraId) => {
    try {
      const data = await resultadoService.getByCarreraId(carreraId);
      const resultadosOrdenados = data.resultados
        .filter((r) => r.posicion !== null)
        .sort((a, b) => a.posicion - b.posicion)
        .slice(0, 3);

      return resultadosOrdenados;
    } catch (err) {
      console.error("Error obteniendo podio:", err);
      return null;
    }
  };

  const [podioAnterior, setPodioAnterior] = useState([]);

  // Cargar podio cuando cambie la carrera anterior
  useEffect(() => {
    if (carreraAnterior) {
      getPodio(carreraAnterior.id).then((podio) => {
        setPodioAnterior(podio || []);
      });
    } else {
      setPodioAnterior([]);
    }
  }, [carreraAnterior]);

  if (loading) {
    return (
      <section className="pb-16 pt-16 bg-gradient-to-r from-black via-gray-950 to-black backdrop-blur-md relative overflow-hidden">
        <div className="container relative mx-auto flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 animate-spin mx-auto mb-4"></div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Cargando Carreras
            </h3>
            <p className="text-gray-400">
              Obteniendo el calendario de carreras...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (carreras.length === 0) {
    return (
      <section className="pb-16 pt-16 bg-black backdrop-blur-md relative overflow-hidden">
        <div className="container relative mx-auto flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              No hay carreras
            </h3>
            <p className="text-gray-400">
              No se encontraron carreras en el calendario.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 pt-8 bg-black backdrop-blur-md relative overflow-hidden">
      <div className="container relative mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Carrera anterior */}
          <div className="min-h-60 max-h-70 p-3 m-1 relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 bg-gradient-to-br from-red-950/20 to-black/40 backdrop-blur-sm flex flex-col justify-between ">
            {/* Decoracion */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/10 via-transparent to-black/20"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-500 via-transparent to-red-500 animate-pulse"></div>
            </div>
            {carreraAnterior ? (
              <>
                {/* Información de la carrera */}
                <div className="pb-2 relative z-10">
                  <div className="font-montserrat text-xl font-bold text-white mt-4 leading-tight text-center mb-1">
                    {carreraAnterior.nombre}
                  </div>
                  <div className="text-gray-400 text-sm text-center">
                    {formatearFecha(carreraAnterior.fecha_carrera)}
                  </div>
                  <div className="text-gray-300 text-center mt-1 text-sm">
                    {carreraAnterior.circuito?.nombre} (
                    {carreraAnterior.circuito?.pais})
                  </div>
                </div>

                {/* Podio */}
                <div className="relative z-10 flex-1 flex items-center justify-center">
                  {podioAnterior.length > 0 ? (
                    <div className="text-center w-full">
                      <div className="space-y-2">
                        {podioAnterior.map((resultado, idx) => {
                          const icons = ["🥇", "🥈", "🥉"];
                          const colors = [
                            "text-yellow-400",
                            "text-gray-300",
                            "text-amber-600",
                          ];
                          return (
                            <div
                              key={idx}
                              className={`${colors[idx]} text-md font-semibold `}
                            >
                              {icons[idx]} {resultado.piloto.nombre}{" "}
                              {resultado.piloto.apellido}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-400 text-sm">
                        Sin resultados disponibles
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-center flex items-center justify-center h-full relative z-10">
                No hay carrera anterior
              </div>
            )}
            {/* Decoracion */}
            <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r bg-gradient-to-br from-red-950/20 to-black/40 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
            <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-red-500 to-red-400 shadow-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-red-500/30 to-transparent"></div>
          </div>

          {/* Carrera central (más grande) */}
          <div className="min-h-72 p-10 m-1 relative overflow-hidden border-2 border-red-400/70 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 bg-gradient-to-br from-red-600/40 to-black/60 backdrop-blur-md flex flex-col justify-between scale-105 lg:scale-110">
            {/* Decoracion */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/20 via-transparent to-black/30"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-500 via-transparent to-red-500 animate-pulse"></div>
            </div>
            {carreraCentral ? (
              <>
                <div className="pb-2 relative z-10">
                  <div className="font-montserrat text-2xl font-bold text-white mt-2 leading-tight text-center">
                    {carreraCentral.nombre}
                  </div>
                  <div className="text-gray-100 text-lg text-center mb-2">
                    {formatearFecha(carreraCentral.fecha_carrera)} -{" "}
                    {carreraCentral.hora_carrera}:00
                  </div>
                  <div className="text-gray-200 text-center mb-3">
                    {carreraCentral.circuito?.nombre} (
                    {carreraCentral.circuito?.pais})
                  </div>

                  <div className="flex flex-col items-center gap-1 mb-4">
                    <span className="text-gray-300 text-sm">
                      <b>Ubicación:</b> {carreraCentral.circuito?.ubicacion}
                    </span>
                    <span className="text-gray-300 text-sm">
                      <b>Vueltas:</b> {carreraCentral.circuito?.vueltas}
                    </span>
                    <span className="text-gray-300 text-sm">
                      <b>Longitud:</b> {carreraCentral.circuito?.longitud_km} km
                    </span>
                  </div>
                </div>

                <div className="flex justify-center mt-6 relative z-10">
                  {carreraCentral.estado === "disponible" ? (
                    <a
                      href="/prediccion"
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-semibold shadow-lg shadow-green-500/30 border border-green-400/50 transition-all hover:scale-105 cursor-pointer"
                    >
                      Predecir Carrera
                    </a>
                  ) : (
                    <div className="text-center">
                      <div className="px-6 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-300 text-sm mb-2">
                        Estado: {carreraCentral.estado}
                      </div>
                      <p className="text-gray-400 text-xs">
                        {carreraCentral.estado === "en preparacion"
                          ? "Carrera en preparación"
                          : "Próximamente disponible"}
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-center mt-10 relative z-10">
                No hay carrera central
              </div>
            )}
            {/* Decoracion */}
            <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r bg-gradient-to-br from-red-600/30 to-black/40 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
            <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-red-700 to-red-500 shadow-lg"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-red-500/40 to-transparent"></div>
          </div>

          {/* Carrera siguiente */}
          <div className="min-h-60 max-h-70 p-3 m-1 relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 bg-gradient-to-br from-red-950/20 to-black/40 backdrop-blur-sm flex flex-col justify-between ">
            {/* Decoracion */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/10 via-transparent to-black/20"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-500 via-transparent to-red-500 animate-pulse"></div>
            </div>
            {carreraSiguiente ? (
              <>
                <div className="pb-2 relative z-10">
                  <div className="font-montserrat text-xl font-bold text-white mt-4 leading-tight text-center mb-1">
                    {carreraSiguiente.nombre}
                  </div>
                  <div className="text-gray-400 text-sm text-center">
                    {formatearFecha(carreraSiguiente.fecha_carrera)}
                  </div>
                  <div className="text-gray-300 text-center mt-1 text-sm">
                    {carreraSiguiente.circuito?.nombre} (
                    {carreraSiguiente.circuito?.pais})
                  </div>
                </div>
                <div className="relative z-10 mt-4 mb-12 flex flex-col items-center flex-1 justify-center">
                  <span className="text-center bg-red-950/50 px-4 py-3 rounded-full text-white text-lg border border-red-800">
                    📅 Próximamente
                  </span>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-center mt-10 relative z-10">
                No hay carrera siguiente
              </div>
            )}
            {/* Decoracion */}
            <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r bg-gradient-to-br from-red-950/20 to-black/40 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
            <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-red-500 to-red-400 shadow-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-red-500/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
