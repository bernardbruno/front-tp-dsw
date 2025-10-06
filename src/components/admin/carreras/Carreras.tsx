import { useState, useEffect } from "react";
import FormularioAgregarCarrera from "./FormularioAgregarCarrera";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { carreraService } from "../../../services/carrera.service";

export default function Carreras() {
  const [carreras, setCarreras] = useState<any[]>([]);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [carreraAEliminar, setCarreraAEliminar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buscador, setBuscador] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await carreraService.getAll();
        setCarreras(data);
      } catch (error) {
        console.error("Error cargando carreras:", error);
        toast.error("❌ Error al cargar las carreras", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (modalAgregar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalAgregar]);

  const agregarCarrera = (nuevaCarrera: any) => {
    setCarreras([...carreras, nuevaCarrera]);
    setModalAgregar(false);
  };

  const eliminarCarrera = async (id: number) => {
    try {
      await carreraService.delete(id);
      setCarreras(carreras.filter((c) => c.id !== id));
      toast.success("¡Carrera eliminada con éxito!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error: any) {
      console.error("Error al eliminar la carrera:", error);
      toast.error(`❌ ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  const confirmarEliminacion = (carrera: any) => {
    setCarreraAEliminar(carrera);
    setModalEliminar(true);
  };

  const eliminarConfirmado = () => {
    if (carreraAEliminar) {
      eliminarCarrera(carreraAEliminar.id);
      setModalEliminar(false);
      setCarreraAEliminar(null);
    }
  };

  const cancelarEliminacion = () => {
    setModalEliminar(false);
    setCarreraAEliminar(null);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado?.toLowerCase()) {
      case "disponible":
        return "from-green-600 to-green-500";
      case "completada":
        return "from-red-600 to-red-500";
      case "en preparacion":
        return "from-yellow-600 to-yellow-500";
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
          <p className="text-white text-lg">Cargando carreras...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-16 pt-16 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden min-h-screen">
      <div className="container relative mx-auto px-6">
        <div className="mb-8">
          <Link
            to="/admin"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105"
          >
            ← Volver al Panel Admin
          </Link>
        </div>

        <div className="mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white font-bold text-4xl">🏁</span>
          </div>
          <h2 className="font-montserrat text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
            Panel de Carreras
          </h2>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Gestiona todas las carreras de Fórmula 1
          </p>
          <div className="mt-8 mx-auto w-24 h-1 bg-gradient-to-r from-red-600 via-white to-red-600 rounded-full"></div>
        </div>

        {/* Buscador */}
        <div className="max-w-lg mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={buscador}
              onChange={(e) => setBuscador(e.target.value)}
              className="w-full px-5 py-3 pl-12 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/40 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              🔍
            </div>
          </div>
        </div>

        {/* Lista de carreras */}
        {carreras.length === 0 ? (
          <div className="text-center py-12 mt-24">
            <h3 className="text-xl font-semibold text-white mb-2">
              No hay carreras
            </h3>
            <p className="text-gray-400 mb-6">
              Agrega la primera carrera para comenzar
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {carreras
              .filter((carrera) => {
                return (
                  carrera.nombre.toLowerCase().includes(buscador.toLowerCase())
                );
              })
              .map((carrera) => (
              <div
                key={carrera.id}
                className="min-h-96 p-7 m-1 relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 bg-gradient-to-br from-red-950/20 to-black/40 backdrop-blur-sm"
              >
                {/* Efectos decorativos */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/10 via-transparent to-black/20"></div>
                  <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-500 via-transparent to-red-500 animate-pulse"></div>
                </div>

                {/* Header con nombre y estado */}
                <div className="pb-4 relative z-10">
                  <div className="font-montserrat text-xl font-bold text-white leading-tight mb-3">
                    {carrera.nombre}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`bg-gradient-to-r ${getEstadoColor(
                        carrera.estado
                      )} text-white border-red-400 shadow-lg shadow-red-500/20 font-semibold px-3 py-1 rounded-full text-xs`}
                    >
                      {carrera.estado}
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="relative z-10 space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Fecha:</span>
                    <span className="text-white font-medium text-sm">
                      {new Date(carrera.fecha_carrera).toLocaleDateString(
                        "es-ES"
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Hora:</span>
                    <span className="text-white font-medium text-sm">
                      {carrera.hora_carrera}:00
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Circuito:</span>
                    <span className="text-white font-medium text-sm">
                      {carrera.circuito?.nombre || carrera.circuito || "—"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Vuelta Rápida:</span>
                    <span className="text-white font-medium text-sm">
                      {carrera.vuelta_rapida?.apellido || "-"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Pole:</span>
                    <span className="text-white font-bold text-sm flex items-center gap-1">
                      {carrera.pole?.apellido || "-"}
                    </span>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-3 justify-center z-10 xl:mx-6">
                  <Link
                    to={`/admin/carreras/${carrera.id}`}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-white rounded-lg shadow-lg shadow-green-500/30 border border-green-400/50 transition-all hover:scale-105 text-center font-medium cursor-pointer"
                    title="Editar carrera"
                  >
                    ✏️ Editar
                  </Link>
                  <button
                    onClick={() => confirmarEliminacion(carrera)}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 text-center font-medium cursor-pointer"
                    title="Eliminar carrera"
                  >
                    🗑️ Eliminar
                  </button>
                </div>

                {/* Barra inferior */}
                <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>

                {/* Decoraciones en esquinas */}
                <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-red-500/30 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-red-500/30 to-transparent"></div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de confirmación de eliminación */}
        {modalEliminar && carreraAEliminar && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-xl shadow-lg border border-red-600/40 max-w-md w-full relative">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/50">
                <span className="text-red-400 text-3xl">⚠️</span>
              </div>

              <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Confirmar Eliminación
              </h3>

              <p className="text-gray-300 text-center mb-2">
                ¿Estás seguro de eliminar la carrera
              </p>
              <p className="text-white font-bold text-center text-lg mb-6 bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
                "{carreraAEliminar.nombre}"?
              </p>
              <p className="text-gray-400 text-center text-sm mb-8">
                Esta acción no se puede deshacer
              </p>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={cancelarEliminacion}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-md transition-all hover:scale-105 border border-gray-600 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={eliminarConfirmado}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Botón flotante para agregar */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setModalAgregar(true)}
            className="group w-16 h-16 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-full shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-110 hover:rotate-90 duration-300 cursor-pointer"
            title="Agregar nueva carrera"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">
              ➕
            </span>
          </button>
        </div>

        {/* Modal Agregar */}
        {modalAgregar && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-xl shadow-lg border border-red-600/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setModalAgregar(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer z-10"
                title="Cerrar"
              >
                ✕
              </button>
              <FormularioAgregarCarrera
                onAgregarCarrera={agregarCarrera}
                onCancelar={() => setModalAgregar(false)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
