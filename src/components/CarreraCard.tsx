import type { Carrera } from "../types/carrera.types";

interface CarreraCardProps {
  carrera: Carrera;
  podio: any[];
  onVerDetalles: () => void;
}

export default function CarreraCard({
  carrera,
  podio,
  onVerDetalles,
}: CarreraCardProps) {
  const getEstadoInfo = (fecha: string, estado: string) => {
    if (estado === "completada") {
      return {
        texto: "Completada",
        color: "from-green-600 to-green-500",
        textColor: "text-green-400",
      };
    } else if (estado === "disponible") {
      return {
        texto: "Disponible",
        color: "from-yellow-600 to-yellow-500",
        textColor: "text-yellow-400",
      };
    } else {
      return {
        texto: "En preparación",
        color: "from-blue-600 to-blue-500",
        textColor: "text-blue-400",
      };
    }
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const estadoInfo = getEstadoInfo(carrera.fecha_carrera, carrera.estado);
  const yaPaso = new Date(carrera.fecha_carrera) < new Date();

  return (
    <div className="group relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/30 transform hover:-translate-y-2 backdrop-blur-sm rounded-xl bg-gradient-to-br from-black/60 to-black/30 h-full flex flex-col">
      <div className="relative z-10 p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-4 flex flex-col items-center justify-between">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-red-600 group-hover:bg-clip-text transition-all">
            {carrera.nombre}
          </h3>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${estadoInfo.color} text-white shadow-lg mb-3`}
          >
            {estadoInfo.texto}
          </div>
        </div>

        {/* Información */}
        <div className="space-y-2 mb-6 flex-1">
          <div className="flex items-center gap-2 text-md">
            <span className="text-gray-400">📅</span>
            <span className="text-gray-300">{formatearFecha(carrera.fecha_carrera)}</span>
          </div>
          <div className="flex items-center gap-2 text-md">
            <span className="text-gray-400">🏁</span>
            <span className="text-gray-300">{carrera.circuito?.nombre}</span>
          </div>
          <div className="flex items-center gap-2 text-md">
            <span className="text-gray-400">🌍</span>
            <span className="text-gray-300">{carrera.circuito?.pais}</span>
          </div>
        </div>
        <div className="mt-2 mx-auto w-36 h-1 bg-gradient-to-r from-red-600 via-white to-red-600 rounded-full"></div>
        {/* Podio o estado */}
        {yaPaso && podio.length > 0 ? (
          <div className="mb-6 p-4">
            <div className="space-y-2">
              {podio.map((resultado, idx) => (
                <div key={idx} className="flex items-center gap-2 justify-start sm:pl-30">
                  <span className="text-xl">
                    {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                  </span>
                  <span className="text-white text-sm font-medium">
                    {resultado.piloto.nombre} {resultado.piloto.apellido}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 mt-4 text-center">
            <p className={`text-sm font-medium ${estadoInfo.textColor}`}>
              {estadoInfo.texto}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Pendiente de resultados
            </p>
          </div>
        )}

        {/* Botón */}
        <button
          onClick={onVerDetalles}
          className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/20 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
        >
          Ver más
        </button>
      </div>

      {/* Franja inferior decorativa */}
      <div
        className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${estadoInfo.color} shadow-lg`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}