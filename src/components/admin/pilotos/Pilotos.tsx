import { useState, useEffect } from "react";
import FormularioAgregarPiloto from "./FormularioAgregarPiloto";
import FormularioEditarPiloto from "./FormularioEditarPiloto";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { pilotoService } from "../../../services/piloto.service";
import type { Piloto } from "../../../types/piloto.types";

export default function Pilotos() {
  const [pilotos, setPilotos] = useState<Piloto[]>([]);
  const [pilotoEditando, setPilotoEditando] = useState<any>(null);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [pilotoAEliminar, setPilotoAEliminar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buscador, setBuscador] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await pilotoService.getAll();
        setPilotos(data);
      } catch (error) {
        console.error("Error cargando pilotos:", error);
        toast.error("❌ Error al cargar los pilotos", {
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

  const agregarPiloto = (nuevoPiloto: any) => {
    setPilotos([...pilotos, nuevoPiloto]);
    setModalAgregar(false);
  };

  const eliminarPiloto = async (id: number) => {
    try {
      await pilotoService.delete(id);
      setPilotos(pilotos.filter((p) => p.id !== id));
      toast.success("🏎️ ¡Piloto eliminado con éxito!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error: any) {
      console.error("Error al eliminar el piloto:", error);
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

  const editarPiloto = (pilotoActualizado: any) => {
    setPilotos(
      pilotos.map((p) =>
        p.id === pilotoActualizado.id ? pilotoActualizado : p
      )
    );
    setModalEditar(false);
  };

  const confirmarEliminacion = (piloto: any) => {
    setPilotoAEliminar(piloto);
    setModalEliminar(true);
  };

  const eliminarConfirmado = () => {
    if (pilotoAEliminar) {
      eliminarPiloto(pilotoAEliminar.id);
      setModalEliminar(false);
      setPilotoAEliminar(null);
    }
  };

  const cancelarEliminacion = () => {
    setModalEliminar(false);
    setPilotoAEliminar(null);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado?.toLowerCase()) {
      case "activo":
        return "from-green-600 to-green-500";
      case "retirado":
        return "from-gray-600 to-gray-500";
      default:
        return "from-yellow-600 to-yellow-500";
    }
  };

  const pilotosFiltrados = pilotos.filter((piloto) =>
    piloto.nombre.toLowerCase().includes(buscador.toLowerCase()) ||
    piloto.apellido.toLowerCase().includes(buscador.toLowerCase())
  );

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
          <p className="text-white text-lg">Cargando pilotos...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-16 bg-black relative overflow-hidden min-h-screen">
      <div className="container relative mx-auto px-6 max-w-6xl">
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
            Panel de Pilotos
          </h2>
          <p className="text-lg text-gray-300">
            Gestiona todos los pilotos de Fórmula 1
          </p>
        </div>

        {/* Buscador y botón agregar */}
        <div className="flex flex-col sm:flex-row gap-10 mb-8 mt-10 max-w-3xl mx-auto">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar piloto..."
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
            ➕ Agregar
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto rounded-lg border border-red-900/30 max-w-6xl mx-auto bg-gradient-to-br from-gray-900/50 via-red-950/40 to-gray-900/50">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-b border-red-900/30">
              <tr>
                <th className="px-6 py-4 text-center text-sm font-bold text-white">
                  #
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                  Piloto
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                  Nacionalidad
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                  Escudería
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-white">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {pilotosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <p className="text-gray-400">
                        {buscador
                          ? "No se encontraron pilotos"
                          : "No hay pilotos"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                pilotosFiltrados.map((piloto) => (
                  <tr
                    key={piloto.id}
                    className="hover:bg-red-900/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-center text-gray-300 font-bold">
                      {piloto.numero}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">
                      {piloto.nombre} {piloto.apellido}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {piloto.nacionalidad}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div
                        className={`bg-gradient-to-r ${getEstadoColor(
                          piloto.estado
                        )} text-white font-semibold px-3 py-1 rounded-full text-xs inline-flex items-center gap-1`}
                      >
                        {piloto.estado}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {piloto.escuderia?.nombre || "Sin escudería"}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => {
                            setPilotoEditando(piloto);
                            setModalEditar(true);
                          }}
                          className="px-3 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded shadow-lg shadow-green-500/20 border border-green-400/50 transition-all hover:scale-105 text-sm font-medium cursor-pointer"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => confirmarEliminacion(piloto)}
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
              <FormularioAgregarPiloto
                onAgregarPiloto={agregarPiloto}
                onCancelar={() => setModalAgregar(false)}
              />
            </div>
          </div>
        )}

        {/* Modal Editar */}
        {modalEditar && pilotoEditando && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-black p-6 rounded-xl shadow-lg border border-red-600/40 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setModalEditar(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer z-10"
                title="Cerrar"
              >
                ✕
              </button>
              <FormularioEditarPiloto
                piloto={pilotoEditando}
                onEditarPiloto={editarPiloto}
                onCancelar={() => setModalEditar(false)}
              />
            </div>
          </div>
        )}

        {/* Modal de confirmación de eliminación */}
        {modalEliminar && pilotoAEliminar && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-xl shadow-lg border border-red-600/40 max-w-md w-full relative">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/50">
                <span className="text-red-400 text-3xl">⚠️</span>
              </div>

              <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Confirmar Eliminación
              </h3>

              <p className="text-gray-300 text-center mb-2">
                ¿Estás seguro de eliminar al piloto
              </p>
              <p className="text-white font-bold text-center text-lg mb-6 bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
                "{pilotoAEliminar.nombre} {pilotoAEliminar.apellido}"?
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