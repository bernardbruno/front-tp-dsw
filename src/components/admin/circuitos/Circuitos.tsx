import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormularioAgregarCircuito from './FormularioAgregarCircuito';
import FormularioEditarCircuito from './FormularioEditarCircuito';

export default function Circuitos() {
    const [circuitos, setCircuitos] = useState([]);
    const [circuitoEditando, setCircuitoEditando] = useState(null);
    const [modalAgregar, setModalAgregar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalExito, setModalExito] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/circuitos');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setCircuitos(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const agregarCircuito = (nuevoCircuito) => {
        setCircuitos([...circuitos, nuevoCircuito]);
        setModalAgregar(false);
        setModalExito(true); 
    };

    const eliminarCircuito = (id) => {
        setCircuitos(circuitos.filter(c => c.id !== id));
        fetch(`http://localhost:3000/circuitos/${id}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                console.log('Circuito eliminado con éxito');
            })
            .catch(err => console.error('Error al eliminar el circuito:', err));
    };

    const editarCircuito = (circuitoActualizado) => {
        setCircuitos(circuitos.map(c =>
            c.id === circuitoActualizado.id ? circuitoActualizado : c));
        setModalEditar(false);
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
                <Link
                    to="/admin"
                    className="mb-10 inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105">
                        ← Volver al Panel Admin
                </Link>

                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-red-600  to-red-500 to-red-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span className="text-white font-bold text-4xl">
                            🏁</span>
                    </div>
                    <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
                        Panel de Circuitos
                    </h2>
                </div>

                {/* Lista de circuitos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {circuitos.map((circuito) => (
                        <div
                            key={circuito.id}
                            className="group relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 backdrop-blur-sm p-6 rounded-lg min-h-[220px] flex flex-col">

                            <div className="relative z-10 flex flex-col h-full text-center">
                                <h3 className="text-2xl font-bold text-white">{circuito.nombre}</h3>
                                <p className="mt-2 text-gray-300 text-md flex-grow">
                                Ubicacion: {circuito.ubicacion}
                                </p>
                                <p className="mt-2 text-gray-300 text-md flex-grow">
                                Pais base: {circuito.pais}
                                </p>
                                <p className="mt-2 text-gray-300 text-md flex-grow">
                                Vueltas: {circuito.vueltas}
                                </p>
                                <p className="mt-2 text-gray-300 text-md flex-grow">
                                Longitud: {circuito.longitud_km} km
                                </p>
                            </div>
                            <div className="mt-4 flex gap-3 justify-center">
                                <div
                                    onClick={() => {
                                        setCircuitoEditando(circuito);
                                        setModalEditar(true);}}
                                    className="px-4 py-2 bg-gradient-to-r from-red-200 to-red-400 hover:from-red-500 hover:to-red-300 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer">
                                        ✏️
                                </div>
                                <div
                                    onClick={() => eliminarCircuito(circuito.id)}
                                    className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer">
                                        🗑️
                                </div>
                            </div>

                            {/* Franja inferior */}
                            <div
                                className={"absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-red-600 to-red-500"}>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal y formulario para agregar */}
                <div className="flex justify-center mt-10">
                    <div
                        onClick={() => setModalAgregar(true)}
                        className="w-20 h-20 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-full shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer">
                        ➕
                    </div>
                </div>
                
                {modalAgregar && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-xl shadow-lg border border-red-600/40 max-w-lg w-full relative mx-3">
                            <button
                                onClick={() => setModalAgregar(false)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer">
                                    ✕
                            </button>
                            <FormularioAgregarCircuito
                                onAgregarCircuito={agregarCircuito}
                                onCancelar={() => setModalAgregar(false)}
                            />
                        </div>
                    </div>
                )}

                {/* Modal Editar */}
                {modalEditar && circuitoEditando && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-2xl shadow-lg border border-red-600/40 max-w-lg w-full relative mx-3">
                            <button
                                onClick={() => setModalEditar(false)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl cursor-pointer">
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

                {/* ESTE MODAL VEMOS SI SE QUEDA O NO, MUY MOLESTO A VECES  */}
                {/* Modal de éxito */}
                {modalExito && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-xl shadow-lg border border-red-600/40 max-w-md w-full relative mx-3">
                            <button
                                onClick={() => setModalExito(false)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl cursor-pointer">
                                    ✕
                            </button>
                            <h3 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                                ¡Circuito agregado!
                            </h3>
                            <p className="text-gray-300 text-center">
                                El circuito se agregó correctamente.
                            </p>
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={() => setModalExito(false)}
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
