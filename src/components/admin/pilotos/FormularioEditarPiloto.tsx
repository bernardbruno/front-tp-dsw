import { useState } from "react";

const FormularioEditarPiloto = ({ piloto, onEditarPiloto, onCancelar }) => {
  const [nombre, setNombre] = useState(piloto.nombre);
  const [apellido, setApellido] = useState(piloto.apellido);
  const [edad, setEdad] = useState(piloto.edad);
  const [nacionalidad, setNacionalidad] = useState(piloto.nacionalidad);
  const [equipo, setEquipo] = useState(piloto.equipo);
  const [debut, setDebut] = useState(piloto.debut);
  const [titulos, setTitulos] = useState(piloto.titulos);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pilotoActualizado = {
      ...piloto,
      nombre,
      apellido,
      edad,
      nacionalidad,
      equipo,
      debut,
      titulos,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/pilotos/${piloto.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pilotoActualizado),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      onEditarPiloto(data);
      onCancelar();
    } catch (error) {
      console.error("Error al editar el piloto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3 p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-center mb-2 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
        ✏️ Editar Piloto
      </h3>

      <label className="block text-gray-300 mb-1">Nombre</label>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full px-4 py-1 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />

      <label className="block text-gray-300 mb-1">Apellido</label>
      <input
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        className="w-full px-4 py-1 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />

      <label className="block text-gray-300 mb-1">Edad</label>
      <input
        type="number"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
        className="w-full px-4 py-1 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />

      <label className="block text-gray-300 mb-1">Nacionalidad</label>
      <input
        value={nacionalidad}
        onChange={(e) => setNacionalidad(e.target.value)}
        className="w-full px-4 py-1 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />

      <label className="block text-gray-300 mb-1">Equipo</label>
      <input
        value={equipo}
        onChange={(e) => setEquipo(e.target.value)}
        className="w-full px-4 py-1 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />

      <label className="block text-gray-300 mb-1">Debut</label>
      <input
        value={debut}
        onChange={(e) => setDebut(e.target.value)}
        className="w-full px-4 py-1 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />

      <label className="block text-gray-300 mb-1">Títulos</label>
      <input
        type="number"
        value={titulos}
        onChange={(e) => setTitulos(e.target.value)}
        className="w-full px-4 py-1 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
      />

      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2 mx-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-md transition-all cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 mx-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default FormularioEditarPiloto;
