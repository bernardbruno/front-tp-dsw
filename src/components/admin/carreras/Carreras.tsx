import { useState, useEffect } from "react";
import FormularioAgregarCarrera from "./FormularioAgregarCarrera";
import FormularioEditarCarrera from "./FormularioEditarCarrera";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Carreras() {
  const [carreras, setCarreras] = useState<any[]>([]);
  const [carreraEditando, setCarreraEditando] = useState<any>(null);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/carrera/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setCarreras(result.data || []);
      } catch (error) {
        console.error("Error cargando carreras:", error);
        toast.error("❌ Error al cargar las carreras", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    };
    fetchData();
  }, []);

  const agregarCarrera = (nuevaCarrera: any) => {
    setCarreras([...carreras, nuevaCarrera]);
    setModalAgregar(false);
  };

  const eliminarCarrera = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/carrera/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      setCarreras(carreras.filter((c) => c.id !== id));
      toast.success("¡Carrera eliminada correctamente!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error: any) {
      console.error("Error al eliminar la carrera:", error);
      toast.error(`❌ ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  const editarCarrera = (carreraActualizada: any) => {
    setCarreras(
      carreras.map((c) =>
        c.id === carreraActualizada.id ? carreraActualizada : c
      )
    );
    setModalEditar(false);
  };

  return (
    <section className="py-10 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden min-h-screen">
      {/* Líneas decorativas */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      </div>

      <div className="container relative mx-auto px-6">
        <div className="mb-8">
          <Link
            to="/admin"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105"
          >
            ← Volver al Panel Admin
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white font-bold text-4xl">🏎️</span>
          </div>
          <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
            Panel de Carreras
          </h2>
        </div>

        {/* Lista de carreras */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {carreras.map((c) => (
            <div
              key={c.id}
              className="group relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 backdrop-blur-sm p-6 rounded-lg min-h-[240px] flex flex-col"
            >
              <div className="relative z-10 flex flex-col h-full text-center">
                <h3 className="text-2xl font-bold text-white pb-3">
                  {c.nombre}
                </h3>
                <p className="text-gray-400 text-md flex-grow">
                  Número: {c.numero}
                </p>
                <p className="text-gray-400 text-md flex-grow">
                  Fecha: {new Date(c.fecha_carrera).toLocaleDateString()}
                </p>
                <p className="text-gray-400 text-md flex-grow">
                  Hora: {c.hora_carrera}:00
                </p>
                <p className="text-gray-400 text-md flex-grow">
                  Circuito: {c.circuito?.nombre || c.circuito}
                </p>
                <p className="text-gray-400 text-md flex-grow">
                  Vuelta rápida:{" "}
                  {c.vuelta_rapida?.nombre || c.vuelta_rapida || "—"}
                </p>
                <p className="text-gray-400 text-md flex-grow">
                  Pole: {c.pole?.nombre || c.pole || "—"}
                </p>
              </div>

              <div className="mt-4 flex gap-3 justify-center">
                <div
                  onClick={() => {
                    setCarreraEditando(c);
                    setModalEditar(true);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-300 hover:from-red-500 hover:to-red-300 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
                >
                  ✏️
                </div>
                <div
                  onClick={() => eliminarCarrera(c.id)}
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
                >
                  🗑️
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Agregar */}
        {modalAgregar && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-xl shadow-lg border border-red-600/40 max-w-lg w-full relative mx-3">
              <button
                onClick={() => setModalAgregar(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer"
              >
                ✕
              </button>
              <FormularioAgregarCarrera
                onAgregarCarrera={agregarCarrera}
                onCancelar={() => setModalAgregar(false)}
              />
            </div>
          </div>
        )}

        {/* Modal Editar */}
        {modalEditar && carreraEditando && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-xl shadow-lg border border-red-600/40 max-w-lg w-full relative mx-3">
              <button
                onClick={() => setModalEditar(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl cursor-pointer"
              >
                ✕
              </button>
              <FormularioEditarCarrera
                carrera={carreraEditando}
                onEditarCarrera={editarCarrera}
                onCancelar={() => setModalEditar(false)}
              />
            </div>
          </div>
        )}

        {/* Botón para abrir modal agregar */}
        <div className="flex justify-center mt-10">
          <div
            onClick={() => setModalAgregar(true)}
            className="w-20 h-20 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-full shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
          >
            ➕
          </div>
        </div>
      </div>
    </section>
  );
}
