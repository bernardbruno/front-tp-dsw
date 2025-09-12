import { useState, useEffect } from "react";
import ModalCarrera from "./ModalCarrera";

export default function Carreras() {
  const [carreras, setCarreras] = useState([]);
  const [circuitos, setCircuitos] = useState([]);
  const [pilotos, setPilotos] = useState([]);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [carreraEditando, setCarreraEditando] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/carreras")
      .then((res) => res.json())
      .then(setCarreras);
    fetch("http://localhost:3000/circuitos")
      .then((res) => res.json())
      .then(setCircuitos);
    fetch("http://localhost:3000/pilotos")
      .then((res) => res.json())
      .then(setPilotos);
  }, []);

  const agregarCarrera = (nuevaCarrera) => {
    setCarreras([...carreras, nuevaCarrera]);
    setModalAgregar(false);
  };

  const editarCarrera = (carreraActualizada) => {
    setCarreras(
      carreras.map((c) =>
        c.id === carreraActualizada.id ? carreraActualizada : c
      )
    );
    setModalEditar(false);
  };

  const eliminarCarrera = (id) => {
    setCarreras(carreras.filter((c) => c.id !== id));
    fetch(`http://localhost:3000/carreras/${id}`, { method: "DELETE" });
  };

  return (
    <section className="py-10 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden min-h-screen">
      {/* Líneas decorativas */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        <div className="absolute top-2/4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="absolute top-1/4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      </div>

      <div className="container relative mx-auto px-6">
        <div className="mb-10">
          <a
            href="/admin"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105"
          >
            ← Volver al Panel Admin
          </a>
        </div>

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-red-600  to-red-500 to-red-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white font-bold text-4xl">🏆</span>
          </div>
          <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
            Panel de Carreras
          </h2>
        </div>

        {/* Lista de carreras */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {carreras.map((carrera) => (
            <div
              key={carrera.id}
              className="group relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 backdrop-blur-sm p-6 rounded-lg min-h-[220px] flex flex-col"
            >
              <div className="relative z-10 flex flex-col h-full text-center">
                <h3 className="text-2xl font-bold text-white">
                  {carrera.nombre || "Carrera"}
                </h3>
                <p className="mt-2 text-gray-300 text-md">
                  Fecha: {carrera.fechaCarrera}
                </p>
                <p className="mt-2 text-gray-300 text-md">
                  Hora: {carrera.horaCarrera}
                </p>
                <p className="mt-2 text-gray-300 text-md">
                  Circuito: {carrera.circuito?.nombre || "-"}
                </p>
              </div>
              <div className="mt-4 flex gap-3 justify-center">
                <div
                  onClick={() => {
                    setCarreraEditando(carrera);
                    setModalEditar(true);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-red-200 to-red-400 hover:from-red-500 hover:to-red-300 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
                >
                  ✏️
                </div>
                <div
                  onClick={() => eliminarCarrera(carrera.id)}
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
                >
                  🗑️
                </div>
              </div>
              {/* Franja inferior */}
              <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-red-600 to-red-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón agregar */}
        <div className="flex justify-center mt-10">
          <div
            onClick={() => setModalAgregar(true)}
            className="w-20 h-20 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-full shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
          >
            ➕
          </div>
        </div>

        {/* Modal Agregar */}
        {modalAgregar && (
          <ModalCarrera
            circuitos={circuitos}
            pilotos={pilotos}
            onSubmit={async (carrera) => {
              const res = await fetch("http://localhost:3000/carreras", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(carrera),
              });
              const data = await res.json();
              agregarCarrera(data);
            }}
            onCancelar={() => setModalAgregar(false)}
          />
        )}

        {/* Modal Editar */}
        {modalEditar && carreraEditando && (
          <ModalCarrera
            carrera={carreraEditando}
            circuitos={circuitos}
            pilotos={pilotos}
            onSubmit={async (carrera) => {
              const res = await fetch(
                `http://localhost:3000/carreras/${carrera.id}`,
                {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(carrera),
                }
              );
              const data = await res.json();
              editarCarrera(data);
            }}
            onCancelar={() => setModalEditar(false)}
          />
        )}
      </div>
    </section>
  );
}
