import { useState } from "react";

const FormularioAgregarPiloto = ({ onAgregarPiloto, onCancelar }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [equipo, setEquipo] = useState("");
  const [debut, setDebut] = useState("");
  const [titulos, setTitulos] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !nombre ||
      !apellido ||
      !edad ||
      !nacionalidad ||
      !equipo ||
      !debut ||
      !titulos
    ) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    const nuevoPiloto = {
      nombre,
      apellido,
      edad: Number(edad),
      nacionalidad,
      equipo,
      debut,
      titulos: Number(titulos),
    };

    fetch("http://localhost:3000/pilotos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoPiloto),
    })
      .then((res) => res.json())
      .then((data) => {
        onAgregarPiloto(data);
        setNombre("");
        setApellido("");
        setEdad("");
        setNacionalidad("");
        setEquipo("");
        setDebut("");
        setTitulos("");
        if (onCancelar) onCancelar();
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3 p-6 rounded-xl">
      <h3 className="text-xl font-semibold text-center mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
        Agregar Piloto
      </h3>
      <div className="flex gap-2">
        <input
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition2"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <input
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          placeholder="Nacionalidad"
          value={nacionalidad}
          onChange={(e) => setNacionalidad(e.target.value)}
        />
      </div>
      <input
        className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
        placeholder="Equipo"
        value={equipo}
        onChange={(e) => setEquipo(e.target.value)}
      />
      <div className="flex gap-2">
        <input
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          placeholder="Debut"
          value={debut}
          onChange={(e) => setDebut(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          placeholder="Títulos"
          value={titulos}
          onChange={(e) => setTitulos(e.target.value)}
        />
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold hover:from-red-500 hover:to-red-400 transition cursor-pointer"
        >
          Agregar
        </button>
      </div>
    </form>
  );
};

export default FormularioAgregarPiloto;
