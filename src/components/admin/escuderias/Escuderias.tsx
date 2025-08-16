import { useState, useEffect } from 'react';
import FormularioAgregarEscuderia from './FormularioAgregarEscuderia';
import FormularioEditarEscuderia from './FormularioEditarEscuderia';
import { Link } from 'react-router-dom';

function Escuderias() {
    const [escuderias, setEscuderias] = useState([]);
    const [escuderiaEditando, setEscuderiaEditando] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
                console.log('Escuderia eliminada con éxito');
            })
            .catch(error => console.error('Error al eliminar la escuderia:', error));
    };

    const editarEscuderia = (escuderiaActualizada) => {
        setEscuderias(escuderias.map(escuderia =>
            escuderia.id === escuderiaActualizada.id ? escuderiaActualizada : escuderia
        ));
    };

    return (
        <>
            <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
                <div className="absolute inset-0 circuit-pattern opacity-20"></div>
                <div className="relative z-10 container mx-auto px-4 py-12">
                    {/* Título y botón volver */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mb-6 shadow-lg">
                            <span className="text-white font-bold text-3xl">🏁</span>
                        </div>
                        <h1 className="text-4xl font-racing text-white mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                            Gestión de Escuderías
                        </h1>
                        <Link
                            to="/admin"
                            className="mt-4 px-6 py-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold shadow-lg transition-all duration-300"
                        >
                            ← Volver al Panel Admin
                        </Link>
                    </div>
                    {/* Lista de escuderías */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {escuderias.map((escuderia) => (
                            <div
                                key={escuderia.id}
                                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-red-800/30 hover:scale-105 transition-all duration-300 hover:shadow-red-500/20"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{escuderia.nombre}</h3>
                                    <p className="text-gray-300">País base: {escuderia.pais_base}</p>
                                    <p className="text-gray-300">Jefe de Equipo: {escuderia.jefe_equipo}</p>
                                    <p className="text-gray-300">Motor: {escuderia.motor}</p>
                                </div>
                                <div className="mt-4 flex gap-3 justify-center">
                                    <div
                                        onClick={() => setEscuderiaEditando(escuderia.id)}
                                        className="px-4 py-2 bg-gray-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-all cursor-pointer">
                                            Editar
                                    </div>
                                    <div
                                        onClick={() => eliminarEscuderia(escuderia.id)}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all cursor-pointer ml-3">
                                            Eliminar
                                    </div>
                                </div>

                                {escuderiaEditando === escuderia.id && (
                                    <div className="mt-4">
                                        <FormularioEditarEscuderia
                                            escuderia={escuderia}
                                            onEditarEscuderia={editarEscuderia}
                                            onCancelar={() => setEscuderiaEditando(null)}
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
                            <FormularioAgregarEscuderia
                                onAgregarEscuderia={agregarEscuderia}
                                onCancelar={() => setMostrarFormulario(false)} />
                        </div>
                        )}
                </div>
            </div>
        </>
    );
}

export default Escuderias;