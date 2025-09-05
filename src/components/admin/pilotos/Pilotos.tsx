import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormularioAgregarPiloto from './FormularioAgregarPiloto';
import FormularioEditarPiloto from './FormularioEditarPiloto';

export default function Pilotos() {
    const [pilotos, setPilotos] = useState([]);
    const [pilotoEditando, setPilotoEditando] = useState(null);
    const [modalAgregar, setModalAgregar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [feedback, setFeedback] = useState({ open: false, mensaje: "", tipo: "exito" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/pilotos');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setPilotos(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const agregarPiloto = (nuevoPiloto) => {
        setPilotos([...pilotos, nuevoPiloto]);
        setModalAgregar(false);
        setFeedback({ open: true, mensaje: "¡Piloto agregado correctamente!", tipo: "exito" }); 
    };

    const eliminarPiloto = (id) => {
        setPilotos(pilotos.filter(p => p.id !== id));
        fetch(`http://localhost:3000/pilotos/${id}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                setFeedback({ open: true, mensaje: "¡Piloto eliminado correctamente!", tipo: "exito" });
            })
            .catch(err => console.error('Error al eliminar el piloto:', err));
    };

    const editarPiloto = (pilotoActualizado) => {
        setPilotos(pilotos.map(p =>
            p.id === pilotoActualizado.id ? pilotoActualizado : p
        ));
        setModalEditar(false);
        setFeedback({ open: true, mensaje: "¡Piloto editado correctamente!", tipo: "exito" });
    };

    return (
        <section className="py-10 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden min-h-screen">
            <div className="container relative mx-auto px-6">
                <Link
                    to="/admin"
                    className="mb-10 inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105">
                        ← Volver al Panel Admin
                </Link>
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-red-600  to-red-500 to-red-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span className="text-white font-bold text-4xl">
                            👨‍✈️
                        </span>
                    </div>
                    <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
                        Panel de Pilotos
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pilotos.map((piloto) => (
                        <div
                            key={piloto.id}
                            className="group relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 backdrop-blur-sm p-6 rounded-lg min-h-[220px] flex flex-col">
                            <div className="relative z-10 flex flex-col h-full text-center">
                                <h3 className="text-2xl font-bold text-white">{piloto.nombre} {piloto.apellido}</h3>
                                <p className="mt-2 text-gray-300 text-md flex-grow">
                                    Edad: {piloto.edad}
                                </p>
                                <p className="mt-2 text-gray-300 text-md flex-grow">
                                    Nacionalidad: {piloto.nacionalidad}
                                </p>
                                <p className="mt-2 text-gray-300 text-md flex-grow">
                                    Equipo: {piloto.equipo}
                                </p>
                                <p className="mt-2 text-gray-300 text-md flex-grow">
                                    Debut: {piloto.debut}
                                </p>
                                <p className="mt-2 text-gray-300 text-md flex-grow">
                                    Títulos: {piloto.titulos}
                                </p>
                            </div>
                            <div className="mt-4 flex gap-3 justify-center">
                                <div
                                    onClick={() => {
                                        setPilotoEditando(piloto);
                                        setModalEditar(true);
                                    }}
                                    className="px-4 py-2 bg-gradient-to-r from-red-200 to-red-400 hover:from-red-500 hover:to-red-300 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer">
                                        ✏️
                                </div>
                                <div
                                    onClick={() => eliminarPiloto(piloto.id)}
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
                                className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl cursor-pointer">
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
                                className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl cursor-pointer">
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