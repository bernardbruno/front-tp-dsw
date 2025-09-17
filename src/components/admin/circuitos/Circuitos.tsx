import { useState, useEffect } from "react";
import FormularioAgregarCircuito from "./FormularioAgregarCircuito";
import FormularioEditarCircuito from "./FormularioEditarCircuito";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Circuitos() {
  const [circuitos, setCircuitos] = useState<any[]>([]);
  const [circuitoEditando, setCircuitoEditando] = useState<any>(null);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/circuito/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setCircuitos(result.data || []);
      } catch (error) {
        console.error("Error cargando circuitos:", error);
        toast.error("❌ Error al cargar los circuitos", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    };
    fetchData();
  }, []);

  const agregarCircuito = (nuevoCircuito: any) => {
    setCircuitos([...circuitos, nuevoCircuito]);
    setModalAgregar(false);
  };

  const eliminarCircuito = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/circuito/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      setCircuitos(circuitos.filter((c) => c.id !== id));
      toast.success("¡Circuito eliminado correctamente!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error: any) {
      console.error("Error al eliminar el circuito:", error);
      toast.error(`❌ ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  const editarCircuito = (circuitoActualizado: any) => {
    setCircuitos(
      circuitos.map((c) =>
        c.id === circuitoActualizado.id ? circuitoActualizado : c
      )
    );
    setModalEditar(false);
  };

  return (
    <section className="py-10 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden min-h-screen">
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
            <span className="text-white font-bold text-4xl">📍</span>
          </div>
          <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
            Panel de Circuitos
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {circuitos.map((c) => (
            <div
              key={c.id}
              className="group relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 backdrop-blur-sm p-6 rounded-lg min-h-[220px] flex flex-col"
            >
              <div className="relative z-10 flex flex-col h-full text-center">
                <h3 className="text-2xl font-bold text-white pb-5">{c.nombre}</h3>
                <p className="text-gray-400 text-md flex-grow">Ubicación: {c.ubicacion}</p>
                <p className="text-gray-400 text-md flex-grow">País: {c.pais}</p>
                <p className="text-gray-400 text-md flex-grow">Vueltas: {c.vueltas}</p>
                <p className="text-gray-400 text-md flex-grow">Longitud (km): {c.longitud_km}</p>
              </div>

              <div className="mt-4 flex gap-3 justify-center">
                <div
                  onClick={() => {
                    setCircuitoEditando(c);
                    setModalEditar(true);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-300 hover:from-red-500 hover:to-red-300 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
                >
                  ✏️
                </div>
                <div
                  onClick={() => eliminarCircuito(c.id)}
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
                >
                  🗑️
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalAgregar && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-xl shadow-lg border border-red-600/40 max-w-lg w-full relative mx-3">
              <button
                onClick={() => setModalAgregar(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer"
              >
                ✕
              </button>
              <FormularioAgregarCircuito
                onAgregarCircuito={agregarCircuito}
                onCancelar={() => setModalAgregar(false)}
              />
            </div>
          </div>
        )}

        {modalEditar && circuitoEditando && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-xl shadow-lg border border-red-600/40 max-w-lg w-full relative mx-3">
              <button
                onClick={() => setModalEditar(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl cursor-pointer"
              >
                ✕
              </button>
              <FormularioEditarCircuito
                circuito={circuitoEditando}
                onEditarCircuito={editarCircuito}
                onCancelar={() => setModalEditar(false)}
              />
            </div>
          </div>
        )}

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
