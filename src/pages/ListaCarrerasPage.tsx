import { useState, useEffect } from "react";
import Dock from "../components/Dock";
import Navbar from "../components/Navbar";
import CarreraCard from "../components/CarreraCard";
import { carreraService } from "../services/carrera.service";
import { resultadoService } from "../services/resultado.service";
import type { Carrera } from "../types/carrera.types";
import CarreraDetalleModal from "../components/CarreraDetalleModal";

export default function TodasLasCarrerasPage() {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [carrerasFiltradas, setCarrerasFiltradas] = useState<Carrera[]>([]);
  const [loading, setLoading] = useState(true);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState<Carrera | null>(null);
  const [resultadosCarrera, setResultadosCarrera] = useState<any[]>([]);
  const [loadingResultados, setLoadingResultados] = useState(false);
  const [podios, setPodios] = useState<{ [id: number]: any[] }>({});

  // Filtros
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

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
        setCarrerasFiltradas(carrerasOrdenadas);

        // Cargar todos los podios
        const nuevosPodios: { [id: number]: any[] } = {};
        for (const carrera of carrerasOrdenadas) {
          try {
            const dataResultados = await resultadoService.getByCarreraId(carrera.id);
            const podio = dataResultados.resultados
              .filter((r: any) => r.posicion !== null)
              .sort((a: any, b: any) => a.posicion - b.posicion)
              .slice(0, 3);
            nuevosPodios[carrera.id] = podio;
          } catch {
            nuevosPodios[carrera.id] = [];
          }
        }
        setPodios(nuevosPodios);
      } catch (err) {
        console.error("Error al obtener las carreras:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let filtered = carreras;

    // Filtro por estado
    if (filtroEstado !== "todos") {
      filtered = filtered.filter((c) => c.estado === filtroEstado);
    }

    // Filtro por rango de fechas
    if (fechaDesde) {
      const desde = new Date(fechaDesde);
      filtered = filtered.filter((c) => new Date(c.fecha_carrera) >= desde);
    }

    if (fechaHasta) {
      const hasta = new Date(fechaHasta);
      filtered = filtered.filter((c) => new Date(c.fecha_carrera) <= hasta);
    }

    setCarrerasFiltradas(filtered);
  }, [filtroEstado, fechaDesde, fechaHasta, carreras]);

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

  const handleAbrirCarrera = (carrera: Carrera) => {
    setCarreraSeleccionada(carrera);
    cargarResultados(carrera.id);
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="py-14 bg-gradient-to-r from-black via-gray-950 to-black backdrop-blur-md min-h-screen relative overflow-hidden">
        <div className="container relative mx-auto px-4 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Cargando Carreras
            </h2>
            <p className="text-gray-400">
              Obteniendo todas las carreras disponibles...
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
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent mb-4">
              Todas las Carreras
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Explora el calendario completo y los resultados de todas las carreras de la temporada
            </p>
            <div className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-red-600 via-white to-red-600 rounded-full"></div>
          </div>

          {/* Filtros */}
          <div className="mb-12 bg-black/40 p-6">
            <div className="flex gap-8 flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto">
              {/* Filtro Estado */}
              <div className="w-full">
                <label className=" block text-gray-300 font-medium mb-2">
                  Estado de la Carrera
                </label>
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black text-white border border-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all cursor-pointer"
                >
                  <option value="todos">Todas</option>
                  <option value="completada">Completada</option>
                  <option value="disponible">Disponible</option>
                  <option value="preparacion">En preparación</option>
                </select>
              </div>

              {/* Filtro Fecha Desde */}
              <div className="w-full">
                <label className="block text-gray-300 font-medium mb-2">
                  Desde
                </label>
                <input
                  type="date"
                  value={fechaDesde}
                  onChange={(e) => setFechaDesde(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/60 text-white border border-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>

              {/* Filtro Fecha Hasta */}
              <div className="w-full">
                <label className="block text-gray-300 font-medium mb-2">
                  Hasta
                </label>
                <input
                  type="date"
                  value={fechaHasta}
                  onChange={(e) => setFechaHasta(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/60 text-white border border-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Grid de carreras */}
          {carrerasFiltradas.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">🏁</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                No se encontraron carreras
              </h3>
              <p className="text-gray-400">
                Intenta ajustar los filtros
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carrerasFiltradas.map((carrera) => (
                <CarreraCard
                  key={carrera.id}
                  carrera={carrera}
                  podio={podios[carrera.id] || []}
                  onVerDetalles={() => handleAbrirCarrera(carrera)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal de detalle */}
      {carreraSeleccionada && (
        <CarreraDetalleModal
          carrera={carreraSeleccionada}
          resultados={resultadosCarrera}
          loading={loadingResultados}
          onClose={() => {
            setCarreraSeleccionada(null);
            setResultadosCarrera([]);
          }}
          formatearFecha={formatearFecha}
        />
      )}

      <Dock />
    </>
  );
}
