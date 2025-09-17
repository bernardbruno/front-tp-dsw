import { useState } from "react";
import { toast } from "react-toastify";

export default function FormularioAgregarCircuito({
  onAgregarCircuito,
  onCancelar,
}: {
  onAgregarCircuito: (c: any) => void;
  onCancelar: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [pais, setPais] = useState("");
  const [vueltas, setVueltas] = useState("");
  const [longitud_km, setLongitudKm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !ubicacion || !pais || !vueltas || !longitud_km) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    const nuevoCircuito = {
      nombre,
      ubicacion,
      pais,
      vueltas: Number(vueltas),
      longitud_km: Number(longitud_km),
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/circuito/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoCircuito),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      // el backend retorna { message, data: circuito }
      onAgregarCircuito(result.data);

      toast.success("¡Circuito agregado exitosamente!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });

      // reset campos
      setNombre("");
      setUbicacion("");
      setPais("");
      setVueltas("");
      setLongitudKm("");

      onCancelar();
    } catch (error: any) {
      console.error("Error al agregar el circuito:", error);
      toast.error(`❌ ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 space-y-3 p-6 rounded-xl"
      autoComplete="off"
    >
      <h3 className="text-xl font-semibold text-center mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
        ➕ Agregar Circuito
      </h3>

      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />
      <input
        type="text"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        placeholder="Ubicación"
        className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />
      <input
        type="text"
        value={pais}
        onChange={(e) => setPais(e.target.value)}
        placeholder="País"
        className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />
      <input
        value={vueltas}
        onChange={(e) => setVueltas(e.target.value)}
        placeholder="Vueltas"
        className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />
      <input
        value={longitud_km}
        onChange={(e) => setLongitudKm(e.target.value)}
        placeholder="Longitud (km)"
        className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />

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
          Agregar
        </button>
      </div>
    </form>
  );
}
