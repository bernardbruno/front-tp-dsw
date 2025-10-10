import { useState, useEffect } from "react";
import FormularioAgregarEscuderia from "./FormularioAgregarEscuderia";
import FormularioEditarEscuderia from "./FormularioEditarEscuderia";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { escuderiaService } from '../../../services/escuderia.service';
import type { Escuderia } from '../../../types/escuderia.types';

export default function Escuderias() {
  const [escuderias, setEscuderias] = useState<Escuderia[]>([]);
  const [escuderiaEditando, setEscuderiaEditando] = useState(null);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [escuderiaAEliminar, setEscuderiaAEliminar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buscador, setBuscador] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await escuderiaService.getAll();
        setEscuderias(data);
      } catch (error) {
        console.error("Error cargando escuderías:", error);
        toast.error("❌ Error al cargar las escuderías", {
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

  const agregarEscuderia = (nuevaEscuderia) => {
    setEscuderias([...escuderias, nuevaEscuderia]);
    setModalAgregar(false);
  };

  const eliminarEscuderia = async (id) => {
    try {
      await escuderiaService.delete(id);
      setEscuderias(escuderias.filter((e) => e.id !== id));

      toast.success("¡Escudería eliminada con éxito!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error : any) {
      console.error("Error al eliminar la escudería:", error);
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

  const editarEscuderia = (escuderiaActualizada) => {
    setEscuderias(
      escuderias.map((escuderia) =>
        escuderia.id === escuderiaActualizada.id
          ? escuderiaActualizada
          : escuderia
      )
    );
    setModalEditar(false);
  };

  const confirmarEliminacion = (escuderia) => {
    setEscuderiaAEliminar(escuderia);
    setModalEliminar(true);
  };

  const eliminarConfirmado = () => {
    if (escuderiaAEliminar) {
      eliminarEscuderia(escuderiaAEliminar.id);
      setModalEliminar(false);
      setEscuderiaAEliminar(null);
    }
  };

  const cancelarEliminacion = () => {
    setModalEliminar(false);
    setEscuderiaAEliminar(null);
  };

  const escuderiasFiltradas = escuderias.filter((escuderia) =>
    escuderia.nombre.toLowerCase().includes(buscador.toLowerCase()) ||
    escuderia.pais_base.toLowerCase().includes(buscador.toLowerCase())
  );

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
          <p className="text-white text-lg">Cargando escuderías...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-16 bg-black relative overflow-hidden min-h-screen">
      <div className="container relative mx-auto px-6  max-w-6xl">
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
        <div className="mb-8 text-center">
          <h2 className="font-montserrat text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent mb-2">
            Panel de Escuderías
          </h2>
          <p className="text-lg text-gray-300">
            Gestiona todas las escuderías de Fórmula 1
          </p>
        </div>

        {/* Buscador y botón agregar */}
        <div className="flex flex-col sm:flex-row gap-10 mb-8 mt-10 max-w-3xl mx-auto">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar escudería..."
              value={buscador}
              onChange={(e) => setBuscador(e.target.value)}
              className="w-full px-5 py-3 pl-12 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-gray-800 transition-all"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
          <button
            onClick={() => setModalAgregar(true)}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            Agregar nueva
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto rounded-lg border border-red-900/30 max-w-6xl mx-auto bg-gradient-to-br from-gray-900/50 via-red-950/40 to-gray-900/50">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-b border-red-900/30">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                  Nombre
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                  País
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-white">
                  Títulos
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                  Motor
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-white">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {escuderiasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <p className="text-gray-400">
                        {buscador
                          ? "No se encontraron escuderías"
                          : "No hay escuderías"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                escuderiasFiltradas.map((escuderia) => (
                  <tr
                    key={escuderia.id}
                    className="hover:bg-red-900/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-white">
                      {escuderia.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {escuderia.pais_base}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-yellow-400 font-bold">
                      {escuderia.campeonatos_constructores}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {escuderia.motor}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => {
                            setEscuderiaEditando(escuderia);
                            setModalEditar(true);
                          }}
                          className="px-3 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded shadow-lg shadow-green-500/20 border border-green-400/50 transition-all hover:scale-105 text-sm font-medium cursor-pointer"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => confirmarEliminacion(escuderia)}
                          className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded shadow-lg shadow-red-500/20 border border-red-400/50 transition-all hover:scale-105 text-sm font-medium cursor-pointer"
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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
              <FormularioAgregarEscuderia
                onAgregarEscuderia={agregarEscuderia}
                onCancelar={() => setModalAgregar(false)}
              />
            </div>
          </div>
        )}

        {/* Modal Editar */}
        {modalEditar && escuderiaEditando && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-black p-6 rounded-xl shadow-lg border border-red-600/40 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setModalEditar(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer z-10"
                title="Cerrar"
              >
                ✕
              </button>
              <FormularioEditarEscuderia
                escuderia={escuderiaEditando}
                onEditarEscuderia={editarEscuderia}
                onCancelar={() => setModalEditar(false)}
              />
            </div>
          </div>
        )}

        {/* Modal de confirmación de eliminación */}
        {modalEliminar && escuderiaAEliminar && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-xl shadow-lg border border-red-600/40 max-w-md w-full relative">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/50">
                <span className="text-red-400 text-3xl">⚠️</span>
              </div>

              <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Confirmar Eliminación
              </h3>

              <p className="text-gray-300 text-center mb-2">
                ¿Estás seguro de eliminar la escudería
              </p>
              <p className="text-white font-bold text-center text-lg mb-6 bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
                "{escuderiaAEliminar.nombre}"?
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
      </div>
    </section>
  );
}