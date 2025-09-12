import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CarrerasCalecita() {
  const [carreras, setCarreras] = useState([]);
  const [indexCentral, setIndexCentral] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/carreras");
      const data = await res.json();
      data.sort(
        (a, b) =>
          new Date(a.fechaCarrera).getTime() -
          new Date(b.fechaCarrera).getTime()
      );

      const hoy = new Date();
      const idx = data.findIndex((c) => new Date(c.fechaCarrera) >= hoy);
      setCarreras(data);
      setIndexCentral(idx === -1 ? data.length - 1 : idx);
    };
    fetchData();
  }, []);

  const carreraAnterior = carreras[indexCentral - 1];
  const carreraCentral = carreras[indexCentral];
  const carreraSiguiente = carreras[indexCentral + 1];

  return (
    <section className="pb-16 pt-16 bg-gradient-to-r from-black via-gray-950 to-black backdrop-blur-md relative overflow-hidden">
      {/* Decoracion */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute top-2/4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      </div>

      <div className="container relative mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Carrera anterior */}
          <div className="min-h-60 max-h-70 p-7 m-1 relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 bg-gradient-to-br from-red-950/20 to-black/40 backdrop-blur-sm flex flex-col justify-between lg:flex hidden">
            {/* Decoracion */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/10 via-transparent to-black/20"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-500 via-transparent to-red-500 animate-pulse"></div>
            </div>
            {carreraAnterior ? (
              <>
                <div className="pb-2 relative z-10">
                  <div className="font-montserrat text-xl font-bold text-white mt-2 leading-tight text-center">
                    {carreraAnterior.nombre}
                  </div>
                  <div className="text-gray-400 text-sm text-center">
                    {carreraAnterior.fechaCarrera} -{" "}
                    {carreraAnterior.horaCarrera}
                  </div>
                  <div className="text-gray-300 text-center mt-1">
                    {carreraAnterior.circuito?.nombre} (
                    {carreraAnterior.circuito?.pais})
                  </div>
                </div>
                <div className="relative z-10 mt-4">
                  <h4 className="text-white font-semibold text-center mb-1">
                    Resultados
                  </h4>
                  {carreraAnterior.resultados &&
                  carreraAnterior.resultados.length > 0 ? (
                    <ol className="text-gray-100 text-center text-base">
                      {carreraAnterior.resultados
                        .slice(0, 3)
                        .map((piloto, idx) => (
                          <li key={idx}>
                            {idx === 0 && "🥇"}
                            {idx === 1 && "🥈"}
                            {idx === 2 && "🥉"} {piloto.nombre}{" "}
                            {piloto.apellido ? piloto.apellido : ""}{" "}
                            {piloto.escuderia ? `(${piloto.escuderia})` : ""}
                          </li>
                        ))}
                    </ol>
                  ) : (
                    <p className="text-red-400 text-center">Sin resultados</p>
                  )}
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-center mt-10">
                No hay carrera anterior
              </div>
            )}
            {/* Decoracion */}
            <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r bg-gradient-to-br from-red-950/20 to-black/40 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
            <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-red-500/30 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-red-500/30 to-transparent"></div>
          </div>

          {/* Carrera central (más grande) */}
          <div className="min-h-72 p-10 m-1 relative overflow-hidden border-2 border-red-400/70 hover:border-red-500/80 transition-all duration-500 shadow-2xl shadow-red-500/20 transform hover:-translate-y-2 bg-gradient-to-br from-red-600/40 to-black/60 backdrop-blur-md flex flex-col justify-between scale-115">
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
                  <div className="text-gray-100 text-lg text-center">
                    {carreraCentral.fechaCarrera} - {carreraCentral.horaCarrera}
                  </div>
                  <div className="text-gray-200 text-center mb-2">
                    {carreraCentral.circuito?.nombre} (
                    {carreraCentral.circuito?.pais})
                  </div>
                  <div className="flex flex-col items-center gap-1 mb-2">
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
                  <button
                    onClick={() => navigate("/prediccion")}
                    className="px-7 py-3 bg-gradient-to-r from-black via-red-700 to-black hover:from-red-700 hover:to-red-500 text-white rounded-lg font-semibold shadow-lg border border-red-400/60 transition-all hover:scale-105 cursor-pointer"
                  >
                    Predecir
                  </button>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-center mt-10">
                No hay carrera próxima
              </div>
            )}
            {/* Decoracion */}
            <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r bg-gradient-to-br from-red-600/30 to-black/40 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
            <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-red-500/40 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-red-500/40 to-transparent"></div>
          </div>

          {/* Carrera siguiente */}
          <div className="min-h-60 max-h-70 p-3 m-1 relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 bg-gradient-to-br from-red-950/20 to-black/40 backdrop-blur-sm flex flex-col justify-between lg:flex hidden">
            {/* Decoracion */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/10 via-transparent to-black/20"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-500 via-transparent to-red-500 animate-pulse"></div>
            </div>
            {carreraSiguiente ? (
              <>
                <div className="pb-2 relative z-10">
                  <div className="font-montserrat text-xl font-bold text-white mt-2 leading-tight text-center">
                    {carreraSiguiente.nombre}
                  </div>
                  <div className="text-gray-400 text-sm text-center">
                    {carreraSiguiente.fechaCarrera} -{" "}
                    {carreraSiguiente.horaCarrera}
                  </div>
                  <div className="text-gray-300 text-center mt-1">
                    {carreraSiguiente.circuito?.nombre} (
                    {carreraSiguiente.circuito?.pais})
                  </div>
                </div>
                <div className="relative z-10 mt-4 mb-12 flex flex-col items-center">
                  <span className="text-center bg-red-950 px-2 py-1 rounded-full text-white">
                    Próximamente
                  </span>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-center mt-10">
                No hay carrera siguiente
              </div>
            )}
            {/* Decoracion */}
            <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r bg-gradient-to-br from-red-950/20 to-black/40 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
            <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-red-500/30 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-red-500/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
