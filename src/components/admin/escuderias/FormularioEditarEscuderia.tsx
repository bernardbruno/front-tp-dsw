import { useState } from "react";

export default function FormularioEditarEscuderia({ escuderia, onEditarEscuderia, onCancelar }) {
    const [nombre, setNombreEditado] = useState(escuderia.nombre);
    const [pais_base, setPaisBaseEditado] = useState(escuderia.pais_base);
    const [jefe_equipo, setJefeEquipoEditado] = useState(escuderia.jefe_equipo);
    const [motor, setMotorEditado] = useState(escuderia.motor);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const escuderiaActualizada = {...escuderia, nombre, pais_base, jefe_equipo, motor};

        try {
            const response = await fetch(`http://localhost:3000/escuderias/${escuderia.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(escuderiaActualizada)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            onEditarEscuderia(data);
            onCancelar();
        } catch (error) {
            console.error('Error al editar la escuderia:', error);
        }
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="mt-3 space-y-3 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-center mb-2 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                ✏️ Editar Escudería
            </h3>

            <label className="block text-white mb-0 mt-2">Nombre</label>
            <input
                value={nombre}
                onChange={(e) => setNombreEditado(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"/>

            <label className="block text-white mb-0 mt-2">País base</label>
            <input
                value={pais_base}
                onChange={(e) => setPaisBaseEditado(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"/>

            <label className="block text-white mb-0 mt-2">Jefe de equipo</label>
            <input
                value={jefe_equipo}
                onChange={(e) => setJefeEquipoEditado(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"/>

            <label className="block text-white mb-0 mt-2">Motor</label>
            <input
                value={motor}
                onChange={(e) => setMotorEditado(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"/>

            <div className="flex justify-center mt-4">
                <button
                type="button"
                onClick={onCancelar}
                className="px-4 py-2 mx-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-md transition-all cursor-pointer">
                    Cancelar
                </button>
                <button
                type="submit"
                className="px-4 py-2 mx-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer">
                    Guardar
                </button>
            </div>
        </form>
    );
}
