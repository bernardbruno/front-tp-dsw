import { useState } from "react";

export default function FormularioAgregarEscuderia({
  onAgregarEscuderia,
  onCancelar,
}) {
  const [nombre, setNombre] = useState("");
  const [paisBase, setPaisBase] = useState("");
  const [jefeEquipo, setJefeEquipo] = useState("");
  const [motor, setMotor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre === "" || paisBase === "" || jefeEquipo === "" || motor === "") {
      console.error("Los campos no pueden estar vacíos");
      return;
    }
    const nuevaEscuderia = {
      nombre: nombre,
      pais_base: paisBase,
      jefe_equipo: jefeEquipo,
      motor: motor,
    };
    onAgregarEscuderia(nuevaEscuderia);

    fetch("http://localhost:3000/escuderias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaEscuderia),
    })
      .then((response) => response.json())
      .then((data) => {
        onAgregarEscuderia(data);
        setNombre("");
        setPaisBase("");
        setJefeEquipo("");
        setMotor("");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 space-y-3 p-6 rounded-xl mx-auto"
    >
      <h3 className="text-xl font-semibold text-center mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
        ➕ Agregar Escudería
      </h3>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />
      <input
        value={paisBase}
        onChange={(e) => setPaisBase(e.target.value)}
        placeholder="País base"
        className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />
      <input
        value={jefeEquipo}
        onChange={(e) => setJefeEquipo(e.target.value)}
        placeholder="Jefe de Equipo"
        className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />
      <input
        value={motor}
        onChange={(e) => setMotor(e.target.value)}
        placeholder="Motor"
        className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />

      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-md transition-all cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 mx-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
        >
          Agregar
        </button>
      </div>
    </form>
  );
}
