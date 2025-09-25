import Dock from "../dock/Dock";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";

const PILOTOS_POR_PAGINA = 6;

export default function PilotosPage() {
  const [pilotos, setPilotos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [estadoFiltro, setEstadoFiltro] = useState("todos");
  const [escuderiaFiltro, setEscuderiaFiltro] = useState("todas");
  const [loading, setLoading] = useState(true);
  const [buscador, setBuscador] = useState("");

  useEffect(() => {
    const fetchPilotos = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/piloto/");

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const { data } = await response.json();
        setPilotos(data);
      } catch (err) {
        console.error("Error cargando pilotos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPilotos();
  }, []);

  // Obtener escuderías únicas (sin null/undefined)
  const escuderiasUnicas = [
    ...new Set(
      pilotos
        .map((p) => p.escuderia?.nombre)
        .filter((e) => e && e.trim() !== "")
    ),
  ];

  // Filtrado
  const pilotosFiltrados = pilotos.filter((p) => {
    const estadoOk =
      estadoFiltro === "todos" ||
      p.estado.toLowerCase() === estadoFiltro.toLowerCase();
    const escuderiaOk =
      escuderiaFiltro === "todas" ||
      (escuderiaFiltro === "sin" && (!p.escuderia || !p.escuderia.nombre)) ||
      p.escuderia?.nombre === escuderiaFiltro;
    const nombreOk =
      p.nombre.toLowerCase().includes(buscador.toLowerCase()) ||
      p.apellido.toLowerCase().includes(buscador.toLowerCase()) ||
      (p.escuderia?.nombre &&
        p.escuderia.nombre.toLowerCase().includes(buscador.toLowerCase()));
    return estadoOk && escuderiaOk && nombreOk;
  });

  const totalPaginas = Math.ceil(pilotosFiltrados.length / PILOTOS_POR_PAGINA);
  const pilotosPagina = pilotosFiltrados.slice(
    (pagina - 1) * PILOTOS_POR_PAGINA,
    pagina * PILOTOS_POR_PAGINA
  );

  // Resetear página si cambia el filtro
  useEffect(() => {
    setPagina(1);
  }, [estadoFiltro, escuderiaFiltro]);

  // Función para obtener el color del estado
  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case "activo":
        return "text-green-400";
      case "inactivo":
        return "text-yellow-400";
      case "retirado":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  // Función para obtener el ícono del estado
  const getEstadoIcon = (estado) => {
    switch (estado?.toLowerCase()) {
      case "activo":
        return "🟢";
      case "inactivo":
        return "🟡";
      case "retirado":
        return "🔴";
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-12 relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Cargando Pilotos
          </h2>
          <p className="text-gray-400">
            Obteniendo información de los pilotos...
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
    <Navbar />
    <section className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Título */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white font-bold text-4xl">🏎️</span>
          </div>
          <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent mb-4">
            Conoce a los Pilotos
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Descubre a los talentos que compiten en la máxima categoría del
            automovilismo mundial
          </p>
          <div className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-red-600 via-white to-red-600 rounded-full"></div>
        </div>

        {/* Buscador */}
        <div className="max-w-lg mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre o apellido..."
              value={buscador}
              onChange={(e) => setBuscador(e.target.value)}
              className="w-full px-5 py-3 pl-12 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/40 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              🔍
            </div>
          </div>
        </div>
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
          <div className="flex items-center gap-3">
            <label className="text-gray-300 text-sm font-semibold">
              🏁 Estado:
            </label>
            <select
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
              className="px-4 py-2 rounded-lg bg-black/80 text-white border-2 border-red-800/40 focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
            >
              <option value="todos">Todos los Estados</option>
              <option value="activo">🟢 Activo</option>
              <option value="inactivo">🟡 Inactivo</option>
              <option value="retirado">🔴 Retirado</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-gray-300 text-sm font-semibold">
              🏢 Escudería:
            </label>
            <select
              value={escuderiaFiltro}
              onChange={(e) => setEscuderiaFiltro(e.target.value)}
              className="px-4 py-2 rounded-lg bg-black/80 text-white border-2 border-red-800/40 focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
            >
              <option value="todas">Todas las Escuderías</option>
              <option value="sin">Sin Escuderia</option>
              {escuderiasUnicas.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid de pilotos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {pilotosPagina.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No hay pilotos
              </h3>
              <p className="text-gray-400">
                No se encontraron pilotos con los filtros seleccionados.
              </p>
            </div>
          )}

          {pilotosPagina.map((piloto) => (
            <div
              key={piloto.id}
              className="relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 backdrop-blur-sm rounded-xl flex bg-black/50"
            >
              {/* Efectos decorativos */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/10 via-transparent to-black/20"></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-500 via-transparent to-red-500 animate-pulse"></div>
              </div>

              {/* Imagen piloto */}
              <div className="flex-shrink-0 w-48 h-48 overflow-hidden flex items-center justify-center rounded-l-xl relative h-full pl-2">
                <img
                  src={piloto.piloto_img || "/assets/pilotoSinFondo.png"}
                  alt={`${piloto.nombre} ${piloto.apellido}`}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/piloto.png";
                  }}
                />
                {/* Número del piloto */}
                <div className="absolute top-2 left-2 w-10 h-10 bg-red-600/90 rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg">
                  <span className="text-white font-bold text-sm">
                    {piloto.numero}
                  </span>
                </div>
              </div>

              {/* Datos piloto */}
              <div className="flex flex-col justify-center flex-1 p-6 relative z-10">
                {/* Nombre */}
                <div className="mb-4">
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {piloto.nombre} {piloto.apellido}
                  </h3>
                  <span
                    className={`font-semibold flex items-center gap-1 ${getEstadoColor(
                      piloto.estado
                    )}`}
                  >
                    {getEstadoIcon(piloto.estado)} {piloto.estado}
                  </span>
                </div>

                {/* Información del piloto */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Nacionalidad:</span>
                    <span className="text-white font-medium">
                      {piloto.nacionalidad}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Escuderia:</span>
                    <span className="text-white font-medium">
                      {piloto.escuderia ? (
                        piloto.escuderia.nombre
                      ) : (
                        <span className="text-red-400">Sin Escuderia</span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Fecha de Nacimiento:</span>
                    <span className="text-white font-medium">
                      {new Date(piloto.fecha_nacimiento).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Debut:</span>
                    <span className="text-white font-medium">
                      {piloto.debut || "—"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Títulos:</span>
                    <span className="text-yellow-400 font-bold flex items-center gap-1">
                      {piloto.titulos > 0 ? "🏆" : ""} {piloto.titulos}
                    </span>
                  </div>
                </div>
              </div>

              {/* Franja inferior decorativa */}
              <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>

              {/* Decoraciones en esquinas */}
              <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-red-500/30 to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-red-500/30 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg border border-red-400/50 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer flex items-center gap-2"
            >
              ← Anterior
            </button>

            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg bg-gray-900/50 border border-red-700/40 rounded-lg px-4 py-2 backdrop-blur-sm">
                Página {pagina} de {totalPaginas}
              </span>
            </div>

            <button
              onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg border border-red-400/50 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer flex items-center gap-2"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </section>
    <Dock />
    </>
  );
}
