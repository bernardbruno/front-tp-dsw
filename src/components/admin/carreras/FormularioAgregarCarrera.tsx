import { useState } from "react";
import { toast } from "react-toastify";

export default function FormularioAgregarCarrera({
  onAgregarCarrera,
  onCancelar,
}: {
  onAgregarCarrera: (c: any) => void;
  onCancelar: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState("");
  const [fechaCarrera, setFechaCarrera] = useState("");
  const [horaCarrera, setHoraCarrera] = useState("");
  const [vueltaRapida, setVueltaRapida] = useState("");
  const [pole, setPole] = useState("");
  const [circuito, setCircuito] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !numero || !fechaCarrera || !horaCarrera || !circuito) {
      console.error("Faltan campos obligatorios");
      return;
    }

    const nuevaCarrera = {
      nombre,
      numero: Number(numero),
      fecha_carrera: fechaCarrera,
      hora_carrera: Number(horaCarrera),
      vuelta_rapida: vueltaRapida ? Number(vueltaRapida) : undefined,
      pole: pole ? Number(pole) : undefined,
      circuito: Number(circuito),
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/carrera/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevaCarrera),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      onAgregarCarrera(result.data);

      toast.success("¡Carrera agregada exitosamente!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });

      // reset campos
      setNombre("");
      setNumero("");
      setFechaCarrera("");
      setHoraCarrera("");
      setVueltaRapida("");
      setPole("");
      setCircuito("");

      onCancelar();
    } catch (error: any) {
      console.error("Error al agregar la carrera:", error);
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
        ➕ Agregar Carrera
      </h3>

      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />
      <input
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        placeholder="Número"
        className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />
      <input
        type="date"
        value={fechaCarrera}
        onChange={(e) => setFechaCarrera(e.target.value)}
        className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />
      <input
        type="number"
        min="0"
        value={horaCarrera}
        onChange={(e) => setHoraCarrera(e.target.value)}
        placeholder="Hora (0-23)"
        className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />
      <input
        value={vueltaRapida}
        onChange={(e) => setVueltaRapida(e.target.value)}
        placeholder="ID Piloto Vuelta Rápida (opcional)"
        className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />
      <input
        value={pole}
        onChange={(e) => setPole(e.target.value)}
        placeholder="ID Piloto Pole (opcional)"
        className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />
      <input
        value={circuito}
        onChange={(e) => setCircuito(e.target.value)}
        placeholder="ID Circuito"
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
