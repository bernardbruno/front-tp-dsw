import { useState } from "react";

export default function FormularioEditarCircuito({ circuito, onEditarCircuito, onCancelar }) {
  const [nombre, setNombre] = useState(circuito.nombre);
  const [ubicacion, setUbicacion] = useState(circuito.ubicacion);
  const [pais, setPais] = useState(circuito.pais);
  const [vueltas, setVueltas] = useState(circuito.vueltas);
  const [longitud_km, setLongitudKm] = useState(circuito.longitud_km);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const circuitoActualizado = { ...circuito, nombre, ubicacion, pais, vueltas, longitud_km };

    const response = await fetch(`http://localhost:3000/circuitos/${circuito.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(circuitoActualizado),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    onEditarCircuito(data);
    onCancelar();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 space-y-3 p-6 rounded-xl">

      <h3 className="text-lg font-semibold text-center mb-2 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
        ✏️ Editar Circuito
      </h3>

      <label className="block text-gray-300 mb-1">Nombre</label>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full px-4 py-1 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"/>

      <label className="block text-gray-300 mb-1">Ubicación</label>
      <input
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        className="w-full px-4 py-1 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"/>

      <label className="block text-gray-300 mb-1">País</label>
      <input
        value={pais}
        onChange={(e) => setPais(e.target.value)}
        className="w-full px-4 py-1 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"/>

      <label className="block text-gray-300 mb-1">Vueltas</label>
      <input
        value={vueltas}
        onChange={(e) => setVueltas(e.target.value)}
        placeholder="Vueltas"
        className="w-full px-4 py-1 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"/>
      
      <label className="block text-gray-300 mb-1">Longitud</label>
      <input
        value={longitud_km}
        step="0.001"
        onChange={(e) => setLongitudKm(e.target.value)}
        placeholder="Longitud (km)"
        className="w-full px-4 py-1 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />

      <div className="flex justify-center mt-4 gap-4">
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-md transition-all cursor-pointer">
            Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer">
            Guardar
        </button>
      </div>
    </form>
  );
}
