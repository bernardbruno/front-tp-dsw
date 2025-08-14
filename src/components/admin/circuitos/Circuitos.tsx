import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormularioAgregarCircuito from './FormularioAgregarCircuito';
import FormularioEditarCircuito from './FormularioEditarCircuito';

function Circuitos() {
    const [circuitos, setCircuitos] = useState([]);
    const [circuitoEditando, setCircuitoEditando] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
            c.id === circuitoActualizado.id ? circuitoActualizado : c
        ));
    };

    return (
        <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
            <div className="absolute inset-0 circuit-pattern opacity-20"></div>
            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Título y botón volver */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mb-6 shadow-lg">
                        <span className="text-white font-bold text-3xl">🏁</span>
                    </div>
                    <h1 className="text-4xl font-racing text-white mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                        Gestión de Circuitos
                    </h1>
                    <Link
                        to="/admin"
                        className="mt-4 px-6 py-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold shadow-lg transition-all duration-300"
                    >
                        ← Volver al Panel Admin
                    </Link>
                </div>

                {/* Lista de circuitos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {circuitos.map((circuito) => (
                        <div
                            key={circuito.id}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-red-800/30 hover:scale-105 transition-all duration-300 hover:shadow-red-500/20"
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">{circuito.nombre}</h3>
                                <p className="text-gray-300">Ubicación: {circuito.ubicacion}</p>
                                <p className="text-gray-300">País: {circuito.pais}</p>
                                <p className="text-gray-300">Vueltas: {circuito.vueltas}</p>
                                <p className="text-gray-300">Longitud: {circuito.longitud_km} km</p>
                            </div>
                            <div className="mt-4 flex gap-3 justify-center">
                                <div
                                    onClick={() => setCircuitoEditando(circuito.id)}
                                    className="px-4 py-2 bg-gray-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-all cursor-pointer">
                                        Editar
                                </div>
                                <div
                                    onClick={() => eliminarCircuito(circuito.id)}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all cursor-pointer ml-3">
                                        Eliminar
                                </div>
                            </div>

                            {circuitoEditando === circuito.id && (
                                <div className="mt-4">
                                    <FormularioEditarCircuito
                                        circuito={circuito}
                                        onEditarCircuito={editarCircuito}
                                        onCancelar={() => setCircuitoEditando(null)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Formulario agregar */}

                {!mostrarFormulario ? (
                    <div className="flex justify-center">
                        <div
                            onClick={() => setMostrarFormulario(true)}
                            className="w-20 h-20 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white text-5xl rounded-full shadow-lg transition-all cursor-pointer">
                            +
                        </div>
                    </div>) : (
                    <div>
                        <FormularioAgregarCircuito
                            onAgregarCircuito={agregarCircuito}
                            onCancelar={() => setMostrarFormulario(false)} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Circuitos;
