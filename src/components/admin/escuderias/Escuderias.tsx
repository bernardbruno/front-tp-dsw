import { useState, useEffect } from "react";
import FormularioAgregarEscuderia from "./FormularioAgregarEscuderia";
import FormularioEditarEscuderia from "./FormularioEditarEscuderia";
import { Link } from "react-router-dom";


export default function Escuderias() {
  const [escuderias, setEscuderias] = useState([]);
  const [escuderiaEditando, setEscuderiaEditando] = useState(null);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [feedback, setFeedback] = useState({ open: false, mensaje: "", tipo: "exito" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/escuderias');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEscuderias(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const agregarEscuderia = (nuevaEscuderia) => {
        setEscuderias([...escuderias, nuevaEscuderia]);
        setModalAgregar(false);
        setFeedback({ open: true, mensaje: "¡Escuderia agregada correctamente!", tipo: "exito" });
    };

    const eliminarEscuderia = (id) => {
        setEscuderias(escuderias.filter(escuderia => escuderia.id !== id));
        fetch(`http://localhost:3000/escuderias/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setFeedback({ open: true, mensaje: "¡Escuderia eliminada correctamente!", tipo: "exito" });
            })
            .catch(error => console.error('Error al eliminar la escuderia:', error));
    };

    const editarEscuderia = (escuderiaActualizada) => {
        setEscuderias(escuderias.map(escuderia =>
            escuderia.id === escuderiaActualizada.id ? escuderiaActualizada : escuderia
        ));
        setModalEditar(false);
        setFeedback({ open: true, mensaje: "¡Escuderia editada correctamente!", tipo: "exito" });
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
            Panel de Escuderías
          </h2>
        </div>

        {/* Lista */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {escuderias.map((escuderia) => (
            <div
            key={escuderia.id}
            className="group relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 backdrop-blur-sm p-6 rounded-lg min-h-[220px] flex flex-col">
                <div className="relative z-10 flex flex-col h-full text-center">
                    <h3 className="text-2xl font-bold text-white pb-5">{escuderia.nombre}</h3>
                    <p className="text-gray-300 text-md flex-grow">
                      País: {escuderia.pais_base}
                    </p>
                    <p className="text-gray-300 text-md flex-grow">
                      Jefe de Equipo: {escuderia.jefe_equipo}
                    </p>
                    <p className="text-gray-300 text-md flex-grow">
                      Motor: {escuderia.motor}
                    </p>
                </div>

                <div className="mt-4 flex gap-3 justify-center">
                    <div
                    onClick={() => {
                      setEscuderiaEditando(escuderia);
                      setModalEditar(true);}}
                    className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-300 hover:from-red-500 hover:to-red-300 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer">
                        ✏️
                    </div>
                    <div
                    onClick={() => eliminarEscuderia(escuderia.id)}
                    className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer">
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
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer">
                  ✕
              </button>
              <FormularioAgregarEscuderia
                onAgregarEscuderia={agregarEscuderia}
                onCancelar={() => setModalAgregar(false)}/>
            </div>
          </div>
        )}
        {/* Modal Editar */}
        {modalEditar && escuderiaEditando && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-xl shadow-lg border border-red-600/40 max-w-lg w-full relative mx-3">
                <button
                  onClick={() => setModalEditar(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl cursor-pointer">
                    ✕
                </button>
                <FormularioEditarEscuderia
                  escuderia={escuderiaEditando}
                  onEditarEscuderia={editarEscuderia}
                  onCancelar={() => setModalEditar(false)}/>
              </div>
            </div>
        )}
        
        {/* Botón para abrir modal agregar */}
        <div className="flex justify-center mt-10">
          <div
            onClick={() => setModalAgregar(true)}
            className="w-20 h-20 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-full shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer">
              ➕
          </div>
        </div>

        {/* Modal de feedback reutilizable */}
        {feedback.open && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-xl shadow-lg border border-red-600/40 max-w-md w-full relative mx-3">
              <button
                onClick={() => setFeedback({ ...feedback, open: false })}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl cursor-pointer">
                    ✕
              </button>
              <h3 className={`text-2xl font-bold mb-4 text-center bg-gradient-to-r ${feedback.tipo === "exito" ? "from-red-400 to-red-600" : "from-yellow-400 to-red-600"} bg-clip-text text-transparent`}>
                  {feedback.mensaje}
              </h3>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setFeedback({ ...feedback, open: false })}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-md transition-all cursor-pointer">
                      Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}