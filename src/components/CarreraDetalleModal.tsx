import type { Carrera } from "../types/carrera.types";

interface CarreraDetalleModalProps {
  carrera: Carrera;
  resultados: any[];
  loading: boolean;
  onClose: () => void;
  formatearFecha: (fecha: string) => string;
}

export default function CarreraDetalleModal({
  carrera,
  resultados,
  loading,
  onClose,
  formatearFecha,
}: CarreraDetalleModalProps) {
  const getEstadoInfo = (fecha: string, estado: string) => {
    if (estado === "completada") {
      return {
        texto: "Completada",
        color: "from-green-600 to-green-500",
        icon: "✓",
      };
    } else if (estado === "disponible") {
      return {
        texto: "Disponible",
        color: "from-yellow-600 to-yellow-500",
        icon: "⏳",
      };
    } else {
      return {
        texto: "En preparación",
        color: "from-blue-600 to-blue-500",
        icon: "🔧",
      };
    }
  };

  const estadoInfo = getEstadoInfo(carrera.fecha_carrera, carrera.estado);

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
    if (posicion <= 20)
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-gray-600 to-gray-500 text-white shadow-lg">
          {posicion}°
        </span>
      );
  };

  return (
    <div className="fixed inset-0 bg-black/97 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-red-950 px-8 py-4 shadow-2xl max-w-4xl w-full my-8 relative overflow-hidden max-h-[80vh] overflow-y-auto scrollbar-personalizada">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl cursor-pointer transition-colors"
        >
          ✕
        </button>
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3 bg-white bg-clip-text text-transparent">
              {carrera.nombre}
            </h2>
            <p className="text-gray-300 text-lg">
              {formatearFecha(carrera.fecha_carrera)} - {carrera.hora_carrera}
              :00
            </p>
          </div>

          {/* Grid de información */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Información del circuito */}
            <div className="bg-black/60 rounded-lg p-6 border border-red-800/30">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                Circuito
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Nombre:</span>
                  <span className="text-white font-medium">
                    {carrera.circuito?.nombre}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">País:</span>
                  <span className="text-white font-medium">
                    {carrera.circuito?.pais}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ubicación:</span>
                  <span className="text-white font-medium">
                    {carrera.circuito?.ubicacion}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Vueltas:</span>
                  <span className="text-white font-medium">
                    {carrera.circuito?.vueltas}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Longitud:</span>
                  <span className="text-white font-medium">
                    {carrera.circuito?.longitud_km} km
                  </span>
                </div>
              </div>
            </div>

            {/* Información de la carrera */}
            <div className="bg-black/60 rounded-lg p-6 border border-red-800/30">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                Carrera
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Estado:</span>
                  <span className="text-white font-medium">
                    {estadoInfo.texto}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fecha:</span>
                  <span className="text-white font-medium">
                    {formatearFecha(carrera.fecha_carrera)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hora:</span>
                  <span className="text-white font-medium">
                    {carrera.hora_carrera}:00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          {carrera.estado === "completada" && (
            <div className="bg-black/60 p-6 border border-red-800/30 mb-8 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">
                Resultados de la Carrera
              </h3>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
                </div>
              ) : resultados.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-red-800/50">
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                          Posición
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                          Piloto
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultados.map((resultado, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-red-900/20 transition-colors"
                        >
                          <td className="py-3 px-4">
                            {getPositionBadge(resultado.posicion)}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-xs">
                                {resultado.piloto.nombre.charAt(0)}
                                {resultado.piloto.apellido.charAt(0)}
                              </div>
                              <span className="text-white font-medium">
                                {resultado.piloto.nombre}{" "}
                                {resultado.piloto.apellido}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No hay resultados disponibles</p>
                </div>
              )}
            </div>
          )}

          {/* Botón cerrar */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
