import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import FormularioEditarCarrera from "./FormularioEditarCarrera";
import FormularioAgregarResultado from "./FormularioAgregarResultado";
import FormularioEditarResultado from "./FormularioEditarResultado";
import type { Resultado, Carrera } from "../../../types/carrera.types";
import { resultadoService } from "../../../services/resultado.service";

export default function CarreraDetalle() {
  const { id } = useParams<{ id: string }>();
  const carreraId = Number(id);
  const [carrera, setCarrera] = useState<Carrera | null>(null);
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAgregarResultado, setModalAgregarResultado] = useState(false);
  const [modalEditarResultado, setModalEditarResultado] = useState(false);
  const [modalEliminarResultado, setModalEliminarResultado] = useState(false);
  const [resultadoEditando, setResultadoEditando] = useState<Resultado | null>(
    null
  );
  const [resultadoAEliminar, setResultadoAEliminar] =
    useState<Resultado | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await resultadoService.getByCarreraId(carreraId);
      data.resultados.sort((a: Resultado, b: Resultado) => {
        if (a.posicion == null && b.posicion == null) return 0;
        if (a.posicion == null) return 1;
        if (b.posicion == null) return -1;
        return a.posicion - b.posicion;
      });

      setCarrera(data.carrera);
      setResultados(data.resultados);
    } catch (err: any) {
      console.error(err);
      toast.error(`❌ ${err.message}`, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [carreraId]);

  const handleEditCarrera = (c: Carrera) => {
    setCarrera(c);
    setModalEditar(false);
  };

  const handleAfterAddResultados = async () => {
    setModalAgregarResultado(false);
    await loadData();
    toast.success("✅ Resultados agregados", {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
    });
  };

  const openEditResultado = (r: Resultado) => {
    setResultadoEditando(r);
    setModalEditarResultado(true);
  };

  const finishEditingResultado = async (message: string) => {
    setModalEditarResultado(false);
    setResultadoEditando(null);
    await loadData();
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
    });
  };

  // Nueva función para abrir modal de eliminación
  const openDeleteResultado = (pilotoId: number) => {
    const resultado = resultados.find((r) => r.piloto.id === pilotoId);
    if (!resultado) return;

    setResultadoAEliminar(resultado);
    setModalEliminarResultado(true);
  };

  // Función para confirmar eliminación
  const confirmarEliminacion = async () => {
    if (!resultadoAEliminar) return;

    try {
      await resultadoService.deleteResultado(carreraId, resultadoAEliminar.piloto.id);
      setModalEliminarResultado(false);
      setResultadoAEliminar(null);
      await finishEditingResultado("🗑️ Resultado eliminado");
    } catch (err: any) {
      console.error(err);
      toast.error(`❌ ${err.message}`, { position: "top-right" });
    }
  };

  // Función para cancelar eliminación
  const cancelarEliminacion = () => {
    setModalEliminarResultado(false);
    setResultadoAEliminar(null);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado?.toLowerCase()) {
      case "disponible":
        return "from-green-600 to-green-500";
      case "completada":
        return "from-red-600 to-red-500";
      case "en preparacion":
        return "from-yellow-600 to-yellow-500";
      default:
        return "from-gray-600 to-gray-500";
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

    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-gray-600 to-gray-500 text-white shadow-lg">
        {posicion}°
      </span>
    );
  };

  if (loading || !carrera) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
          <p className="text-white text-lg">
            Cargando detalles de la carrera...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-16 pt-10 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden min-h-screen">
      <div className="container relative mx-auto px-6">
        {/* Botón Volver */}
        <div className="mb-8">
          <Link
            to="/admin/carreras"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105"
          >
            ← Volver a Carreras
          </Link>
        </div>

        {/* Header de la Carrera */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl lg:text-5xl text-white font-bold mb-2 bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
              {carrera.nombre}
            </h1>
            <div
              className={`inline-flex px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${getEstadoColor(
                carrera.estado
              )} text-white shadow-lg `}
            >
              {carrera.estado.toUpperCase()}
            </div>
          </div>
          <button
            onClick={() => setModalEditar(true)}
            className="px-5 py-2 mt-3 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-400 hover:to-green-300 text-white rounded-lg shadow-lg shadow-green-500/30 border border-green-400/50 transition-all hover:scale-105 text-center font-medium cursor-pointer"
          >
            ✏️ Editar Carrera
          </button>
        </div>

        {/* Info de la Carrera */}
        <div className="bg-gradient-to-br from-red-900/80 via-black/40 to-red-900/80 backdrop-blur-sm p-8 rounded-xl mb-10 border-2 border-red-700/40 shadow-2xl shadow-red-500/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 text-sm font-medium">
                📅 Fecha
              </span>
              <span className="text-white text-lg font-bold">
                {new Date(carrera.fecha_carrera).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 text-sm font-medium">🕐 Hora</span>
              <span className="text-white text-lg font-bold">
                {carrera.hora_carrera}:00 CEST
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 text-sm font-medium">
                🏁 Circuito
              </span>
              <span className="text-white text-lg font-bold">
                {carrera.circuito?.nombre || "—"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 text-sm font-medium">
                🥇 Pole Position
              </span>
              <span className="text-white text-lg font-bold">
                {carrera.pole
                  ? `${carrera.pole.nombre} ${carrera.pole.apellido}`
                  : "—"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 text-sm font-medium">
                ⚡ Vuelta Rápida
              </span>
              <span className="text-white text-lg font-bold">
                {carrera.vuelta_rapida
                  ? `${carrera.vuelta_rapida.nombre} ${carrera.vuelta_rapida.apellido}`
                  : "—"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 text-sm font-medium">
                👥 Pilotos
              </span>
              <span className="text-white text-lg font-bold">
                {resultados.length}
              </span>
            </div>
          </div>
        </div>

        {/* Tabla de Resultados */}
        <div className="bg-gradient-to-br from-red-900/80 via-black/40 to-red-900/80 backdrop-blur-sm rounded-xl border-2 border-red-700/40 shadow-2xl shadow-red-500/10 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-red-900/50 to-red-800/50 border-b border-red-700/40">
            <h3 className="text-2xl font-bold text-white">
              🏆 Resultados de la Carrera
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full hidden sm:table">
              <thead className="bg-black/70 border-b border-red-700/40">
                <tr>
                  <th className="px-6 py-4 pl-16 text-left text-sm font-bold text-gray-200 uppercase tracking-wider">
                    Piloto
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider">
                    Posición
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-200 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {resultados.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gradient-to-r hover:from-red-900/20 hover:to-transparent transition-all duration-300 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                          {r.piloto.nombre.charAt(0)}
                          {r.piloto.apellido.charAt(0)}
                        </div>
                        <span className="text-white font-medium text-lg">
                          {r.piloto.nombre} {r.piloto.apellido}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getPositionBadge(r.posicion)}
                    </td>
                    <td className="px-6 py-4 text-center text-white font-medium">
                      {r.estado || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEditResultado(r)}
                          className="px-3 py-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-lg shadow-lg shadow-orange-500/30 border border-orange-400/50 transition-all hover:scale-105 cursor-pointer group-hover:shadow-orange-500/50"
                          title="Editar resultado"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => openDeleteResultado(r.piloto.id)}
                          className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer group-hover:shadow-red-500/50"
                          title="Eliminar resultado"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {resultados.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-gray-400 text-2xl">🏁</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-2">
                            No hay resultados
                          </h4>
                          <p className="text-gray-400">
                            Agrega pilotos para comenzar a registrar resultados
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Mobile */}
            <div className="sm:hidden flex flex-col gap-4 p-4">
              {resultados.length === 0 && (
                <div className="flex flex-col items-center gap-4 py-8">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-2xl">🏁</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      No hay resultados
                    </h4>
                    <p className="text-gray-400">
                      Agrega pilotos para comenzar a registrar resultados
                    </p>
                  </div>
                </div>
              )}
              {resultados.map((r, i) => (
                <div
                  key={i}
                  className="bg-black rounded-xl shadow-lg border border-red-700/40 p-2 flex flex-inline gap-2"
                >
                  <div className="flex flex-1 items-center gap-3 text-center">
                    <span className="text-white font-medium text-lg">
                      {r.piloto.nombre} {r.piloto.apellido}
                    </span>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    {getPositionBadge(r.posicion)}
                  </div>
                  <div className="flex gap-1 mt-2">
                    <button
                      onClick={() => openEditResultado(r)}
                      className="flex-1 px-2 py-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-lg shadow-lg shadow-orange-500/30 border border-orange-400/50 transition-all hover:scale-105 cursor-pointer"
                      title="Editar resultado"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => openDeleteResultado(r.piloto.id)}
                      className="flex-1 px-2 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
                      title="Eliminar resultado"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botón flotante para agregar */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setModalAgregarResultado(true)}
            className="group w-16 h-16 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-full shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-110 hover:rotate-90 duration-300 cursor-pointer"
            title="Agregar piloto a la carrera"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">
              ➕
            </span>
          </button>
        </div>
      </div>

      {/* Modal de Confirmación de Eliminación */}
      {modalEliminarResultado && resultadoAEliminar && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/90 p-8 rounded-xl shadow-2xl border border-red-600/40 max-w-md w-full relative">
            <div className="relative z-10">
              {/* Icono de advertencia */}
              <div className="w-20 h-20 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-500/30 shadow-lg shadow-red-500/20">
                <span className="text-red-400 text-4xl animate-pulse">⚠️</span>
              </div>

              {/* Título */}
              <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Confirmar Eliminación
              </h3>

              {/* Información del piloto */}
              <div className="bg-gradient-to-r from-red-950/30 to-red-900/20 border border-red-800/40 rounded-lg p-4 mb-6">
                <div>
                  <p className="text-white font-bold text-lg text-center">
                    {resultadoAEliminar.piloto.nombre}{" "}
                    {resultadoAEliminar.piloto.apellido}
                  </p>
                </div>
              </div>

              {/* Mensaje de confirmación */}
              <div className="text-center mb-6">
                <p className="text-gray-300 mb-2">
                  ¿Estás seguro de que quieres eliminar este resultado?
                </p>
                <p className="text-gray-400 text-sm">
                  Esta acción no se puede deshacer y el piloto será removido de
                  la carrera.
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4">
                <button
                  onClick={cancelarEliminacion}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-lg transition-all hover:scale-105 border border-gray-600 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarEliminacion}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Carrera */}
      {modalEditar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black p-6 rounded-xl shadow-2xl border border-red-600/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setModalEditar(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer transition-colors z-10"
            >
              ✕
            </button>
            <FormularioEditarCarrera
              carrera={carrera}
              onEditarCarrera={handleEditCarrera}
              onCancelar={() => setModalEditar(false)}
              assignedPilotos={resultados.map((r) => r.piloto)}
            />
          </div>
        </div>
      )}

      {/* Modal Agregar Resultado */}
      {modalAgregarResultado && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black p-6 rounded-xl shadow-2xl border border-red-600/40 max-w-xl w-full overflow-y-auto relative">
            <button
              onClick={() => setModalAgregarResultado(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer transition-colors z-10"
            >
              ✕
            </button>
            <FormularioAgregarResultado
              carreraId={carreraId}
              assignedIds={resultados.map((r) => r.piloto.id)}
              onAgregar={handleAfterAddResultados}
              onCancelar={() => setModalAgregarResultado(false)}
            />
          </div>
        </div>
      )}

      {/* Modal Editar Resultado */}
      {modalEditarResultado && resultadoEditando && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black p-6 rounded-xl shadow-2xl border border-red-600/40 max-w-md w-full relative">
            <button
              onClick={() => setModalEditarResultado(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer transition-colors z-10"
            >
              ✕
            </button>
            <FormularioEditarResultado
              carreraId={carreraId}
              resultado={resultadoEditando}
              onSave={() => finishEditingResultado("Resultado editado correctamente")}
              onCancel={() => setModalEditarResultado(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
}
