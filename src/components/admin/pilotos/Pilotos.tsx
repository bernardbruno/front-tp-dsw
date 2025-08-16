import { useState, useEffect } from 'react';
import FormularioAgregarPiloto from './FormularioAgregarPiloto';
import FormularioEditarPiloto from './FormularioEditarPiloto';
import { Link } from 'react-router-dom';

function Pilotos() {
    const [pilotos, setPilotos] = useState([]);
    const [pilotoEditando, setPilotoEditando] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/pilotos');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
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
    };

    const eliminarPiloto = (id) => {
        setPilotos(pilotos.filter(piloto => piloto.id !== id));
        fetch(`http://localhost:3000/pilotos/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                console.log('Piloto eliminado con éxito');
            })
            .catch(error => console.error('Error al eliminar el piloto:', error));
    };

    const editarPiloto = (pilotoActualizado) => {
        setPilotos(pilotos.map(piloto =>
            piloto.id === pilotoActualizado.id ? pilotoActualizado : piloto
        ));
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
                <div className="absolute inset-0 circuit-pattern opacity-20"></div>
                <div className="relative z-10 container mx-auto px-4 py-12">
                    {/* Título y botón volver */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mb-6 shadow-lg">
                            <span className="text-white font-bold text-3xl">🏁</span>
                        </div>
                        <h1 className="text-4xl font-racing text-white mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                            Gestión de Pilotos
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
                        {pilotos.map((piloto) => (
                        <div
                            key={piloto.id}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-red-800/30 hover:scale-105 transition-all duration-300 hover:shadow-red-500/20"
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">{piloto.nombre} {piloto.apellido}</h3>
                                <p className="text-gray-300">Edad: {piloto.edad}</p>
                                <p className="text-gray-300">Nacionalidad: {piloto.nacionalidad}</p>
                                <p className="text-gray-300">Equipo: {piloto.equipo}</p>
                                <p className="text-gray-300">Debut: {piloto.debut}</p>
                                <p className="text-gray-300">Titulos: {piloto.titulos}</p>
                            </div>
                            <div className="mt-4 flex gap-3 justify-center">
                                <div
                                    onClick={() => setPilotoEditando(piloto.id)}
                                    className="px-4 py-2 bg-gray-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-all cursor-pointer">
                                        Editar
                                </div>
                                <div
                                    onClick={() => eliminarPiloto(piloto.id)}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all cursor-pointer ml-3">
                                        Eliminar
                                </div>
                            </div>

                            {pilotoEditando === piloto.id && (
                                <div className="mt-4">
                                    <FormularioEditarPiloto
                                        piloto={piloto}
                                        onEditarPiloto={editarPiloto}
                                        onCancelar={() => setPilotoEditando(null)}
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
                            <FormularioAgregarPiloto
                                onAgregarPiloto={agregarPiloto}
                                onCancelar={() => setMostrarFormulario(false)} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Pilotos;