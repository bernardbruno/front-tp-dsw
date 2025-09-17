import { useState, useEffect } from "react";
import FormularioAgregarPiloto from "./FormularioAgregarPiloto";
import FormularioEditarPiloto from "./FormularioEditarPiloto";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Pilotos() {
  const [pilotos, setPilotos] = useState<any[]>([]);
  const [pilotoEditando, setPilotoEditando] = useState<any>(null);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/piloto/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setPilotos(result.data || []);
      } catch (error) {
        console.error("Error cargando pilotos:", error);
        toast.error("❌ Error al cargar los pilotos", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    };
    fetchData();
  }, []);

  const agregarPiloto = (nuevoPiloto: any) => {
    setPilotos([...pilotos, nuevoPiloto]);
    setModalAgregar(false);
  };

  const eliminarPiloto = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/piloto/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      setPilotos(pilotos.filter((p) => p.id !== id));
      toast.success("¡Piloto eliminado correctamente!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error: any) {
      console.error("Error al eliminar el piloto:", error);
      toast.error(`❌ ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  const editarPiloto = (pilotoActualizado: any) => {
    setPilotos(
      pilotos.map((p) =>
        p.id === pilotoActualizado.id ? pilotoActualizado : p
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
            <span className="text-white font-bold text-4xl">🏁</span>
          </div>
          <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
            Panel de Pilotos
          </h2>
        </div>

        {/* Lista */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pilotos.map((p) => (
            <div
              key={p.id}
              className="group relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 backdrop-blur-sm p-6 rounded-lg min-h-[260px] flex flex-col"
            >
              <div className="relative z-10 flex flex-col h-full text-center">
                <h3 className="text-2xl font-bold text-white pb-3">
                  {p.nombre} {p.apellido}
                </h3>
                <p className="text-gray-400 text-md flex-grow">
                  Nacionalidad: {p.nacionalidad}
                </p>
                <p className="text-gray-400 text-md flex-grow">
                  Número: {p.numero}
                </p>
                <p className="text-gray-400 text-md flex-grow">
                  Nacimiento:{" "}
                  {new Date(p.fecha_nacimiento).toLocaleDateString()}
                </p>
                <p className="text-gray-400 text-md flex-grow">
                  Estado: {p.estado}
                </p>
                <p className="text-gray-400 text-md flex-grow">
                  Debut: {p.debut || "—"}
                </p>
                <p className="text-gray-400 text-md flex-grow">
                  Títulos: {p.titulos}
                </p>
                <p className="text-gray-400 text-md flex-grow">
                  Escudería: {p.escuderia?.nombre || p.escuderia}
                </p>
              </div>

              <div className="mt-4 flex gap-3 justify-center">
                <div
                  onClick={() => {
                    setPilotoEditando(p);
                    setModalEditar(true);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-300 hover:from-red-500 hover:to-red-300 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
                >
                  ✏️
                </div>
                <div
                  onClick={() => eliminarPiloto(p.id)}
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
              <FormularioAgregarPiloto
                onAgregarPiloto={agregarPiloto}
                onCancelar={() => setModalAgregar(false)}
              />
            </div>
          </div>
        )}

        {/* Modal Editar */}
        {modalEditar && pilotoEditando && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-xl shadow-lg border border-red-600/40 max-w-lg w-full relative mx-3">
              <button
                onClick={() => setModalEditar(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl cursor-pointer"
              >
                ✕
              </button>
              <FormularioEditarPiloto
                piloto={pilotoEditando}
                onEditarPiloto={editarPiloto}
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
