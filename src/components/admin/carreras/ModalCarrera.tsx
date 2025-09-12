import { useState } from "react";

// Modal para agregar/editar carrera
export default function ModalCarrera({
  carrera = {},
  circuitos,
  pilotos,
  onSubmit,
  onCancelar,
}) {
  const [nombre, setNombre] = useState(carrera.nombre || "");
  const [fechaCarrera, setFechaCarrera] = useState(carrera.fechaCarrera || "");
  const [horaCarrera, setHoraCarrera] = useState(carrera.horaCarrera || "");
  const [circuitoId, setCircuitoId] = useState(carrera.circuito?.id || "");
  const [pilotosSeleccionados, setPilotosSeleccionados] = useState(
    carrera.pilotos ? carrera.pilotos.map((p) => p.id) : []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const circuito = circuitos.find((c) => c.id === Number(circuitoId));
    const pilotosCarrera = pilotos.filter((p) =>
      pilotosSeleccionados.includes(p.id)
    );
    onSubmit({
      ...carrera,
      nombre,
      fechaCarrera,
      horaCarrera,
      circuito,
      pilotos: pilotosCarrera,
    });
  };

  const togglePiloto = (id) => {
    setPilotosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-xl shadow-lg border border-red-600/40 max-w-lg w-full relative mx-3"
      >
        <button
          type="button"
          onClick={onCancelar}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer"
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold text-center mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          {carrera.id ? "✏️ Editar Carrera" : "➕ Agregar Carrera"}
        </h3>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
        />
        <input
          type="date"
          value={fechaCarrera}
          onChange={(e) => setFechaCarrera(e.target.value)}
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
        />
        <input
          type="time"
          value={horaCarrera}
          onChange={(e) => setHoraCarrera(e.target.value)}
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
        />
        <select
          value={circuitoId}
          onChange={(e) => setCircuitoId(e.target.value)}
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          required
        >
          <option value="">Seleccionar circuito</option>
          {circuitos.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre} ({c.pais})
            </option>
          ))}
        </select>
        <div className="my-2">
          <label className="block text-gray-300 mb-1">
            Pilotos participantes:
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {pilotos.map((p) => (
              <label
                key={p.id}
                className="flex items-center gap-2 text-gray-200"
              >
                <input
                  type="checkbox"
                  checked={pilotosSeleccionados.includes(p.id)}
                  onChange={() => togglePiloto(p.id)}
                  className="accent-red-500"
                />
                {p.nombre} {p.apellido}
              </label>
            ))}
          </div>
        </div>
        <div className="flex mt-4 justify-center gap-4">
          <button
            type="button"
            onClick={onCancelar}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-md transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
          >
            {carrera.id ? "Guardar" : "Agregar"}
          </button>
        </div>
      </form>
    </div>
  );
}
