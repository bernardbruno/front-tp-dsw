import { useState, useEffect } from "react";
import FormularioAgregarCircuito from "./FormularioAgregarCircuito";
import FormularioEditarCircuito from "./FormularioEditarCircuito";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { circuitoService } from "../../../services/circuito.service";
import type { Circuito } from "../../../types/circuito.types";

export default function Circuitos() {
  const [circuitos, setCircuitos] = useState<Circuito[]>([]);
  const [circuitoEditando, setCircuitoEditando] = useState<any>(null);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [circuitoAEliminar, setCircuitoAEliminar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buscador, setBuscador] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await circuitoService.getAll();
        setCircuitos(data);
      } catch (error) {
        console.error("Error cargando circuitos:", error);
        toast.error("❌ Error al cargar los circuitos", {
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
    const modalAbierto = modalAgregar || modalEditar || modalEliminar;
    if (modalAbierto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalAgregar, modalEditar, modalEliminar]);

  const agregarCircuito = (nuevoCircuito: any) => {
    setCircuitos([...circuitos, nuevoCircuito]);
    setModalAgregar(false);
  };

  const eliminarCircuito = async (id: number) => {
    try {
      await circuitoService.delete(id);
      setCircuitos(circuitos.filter((c) => c.id !== id));
      toast.success("¡Circuito eliminado con éxito!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error: any) {
      console.error("Error al eliminar el circuito:", error);
      let errorMessage = "Error desconocido";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      toast.error(`❌ ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  const editarCircuito = (circuitoActualizado: any) => {
    setCircuitos(
      circuitos.map((c) =>
        c.id === circuitoActualizado.id ? circuitoActualizado : c
      )
    );
    setModalEditar(false);
  };

  const confirmarEliminacion = (circuito: any) => {
    setCircuitoAEliminar(circuito);
    setModalEliminar(true);
  };

  const eliminarConfirmado = () => {
    if (circuitoAEliminar) {
      eliminarCircuito(circuitoAEliminar.id);
      setModalEliminar(false);
      setCircuitoAEliminar(null);
    }
  };

  const cancelarEliminacion = () => {
    setModalEliminar(false);
    setCircuitoAEliminar(null);
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
          <p className="text-white text-lg">Cargando circuitos...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-16 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden min-h-screen">
      <div className="container relative mx-auto px-6">
        {/* Botón volver */}
        <div className="mb-8">
          <Link
            to="/admin"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105"
          >
            ← Volver al Panel Admin
          </Link>
        </div>

        {/* Header */}
        <div className="mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white font-bold text-4xl">🗺️</span>
          </div>
          <h2 className="font-montserrat text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
            Panel de Circuitos
          </h2>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Gestiona todos los circuitos de Fórmula 1 del mundo
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

        {/* Lista de circuitos */}
        {circuitos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🏁</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No hay circuitos
            </h3>
            <p className="text-gray-400 mb-6">
              Agrega el primer circuito para comenzar
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {circuitos
              .filter((circuito) => {
                return (
                  circuito.nombre.toLowerCase().includes(buscador.toLowerCase())
                );
              })
              .map((circuito) => (
                <div
                  key={circuito.id}
                  className="min-h-80 p-7 m-1 relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 bg-gradient-to-br from-red-950/20 to-black/40 backdrop-blur-sm"
                >
                  {/* Efectos decorativos */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/10 via-transparent to-black/20"></div>
                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-500 via-transparent to-red-500 animate-pulse"></div>
                  </div>

                  {/* Header con nombre */}
                  <div className="pb-4 relative z-10">
                    <div className="font-montserrat text-xl font-bold text-white leading-tight mb-4">
                      {circuito.nombre}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white border-red-400 shadow-lg shadow-red-500/30 font-semibold px-3 py-1 rounded-full text-xs">
                        {circuito.vueltas} vueltas
                      </div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="relative z-10 space-y-2 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Ubicación:</span>
                      <span className="text-white font-medium text-sm">
                        {circuito.ubicacion}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Longitud:</span>
                      <span className="text-white font-medium text-sm">
                        {circuito.longitud_km} km
                      </span>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3 justify-center z-10 xl:mx-6">
                    <button
                      onClick={() => {
                        setCircuitoEditando(circuito);
                        setModalEditar(true);
                      }}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-white rounded-lg shadow-lg shadow-green-500/30 border border-green-400/50 transition-all hover:scale-105 text-center font-medium cursor-pointer"
                      title="Editar circuito"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => confirmarEliminacion(circuito)}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 text-center font-medium cursor-pointer"
                      title="Eliminar circuito"
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

        {/* Modal Agregar */}
        {modalAgregar && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-black p-6 rounded-xl shadow-lg border border-red-600/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setModalAgregar(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer z-10"
                title="Cerrar"
              >
                ✕
              </button>
              <FormularioAgregarCircuito
                onAgregarCircuito={agregarCircuito}
                onCancelar={() => setModalAgregar(false)}
              />
            </div>
          </div>
        )}

        {/* Modal Editar */}
        {modalEditar && circuitoEditando && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-black p-6 rounded-xl shadow-lg border border-red-600/40 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setModalEditar(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer z-10"
                title="Cerrar"
              >
                ✕
              </button>
              <FormularioEditarCircuito
                circuito={circuitoEditando}
                onEditarCircuito={editarCircuito}
                onCancelar={() => setModalEditar(false)}
              />
            </div>
          </div>
        )}

        {/* Modal de confirmación de eliminación */}
        {modalEliminar && circuitoAEliminar && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-xl shadow-lg border border-red-600/40 max-w-md w-full relative">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/50">
                <span className="text-red-400 text-3xl">⚠️</span>
              </div>

              <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Confirmar Eliminación
              </h3>

              <p className="text-gray-300 text-center mb-2">
                ¿Estás seguro de eliminar el circuito
              </p>
              <p className="text-white font-bold text-center text-lg mb-6 bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
                "{circuitoAEliminar.nombre}"?
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
            title="Agregar nuevo circuito"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">
              ➕
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
