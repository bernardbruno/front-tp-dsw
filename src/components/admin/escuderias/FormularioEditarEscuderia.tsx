import { useState } from 'react'

const FormularioEditarEscuderia = ({ escuderia, onEditarEscuderia, onCancelar }) => {
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
        <form onSubmit={handleSubmit}
            className="mt-4 space-y-4 bg-gray-800 p-4 rounded-lg border border-red-800/30">
            <input 
                value={nombre} 
                onChange={(e) => setNombreEditado(e.target.value)} placeholder="Nombre" 
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"/>
            <input 
                value={pais_base} 
                onChange={(e) => setPaisBaseEditado(e.target.value)} placeholder="País Base" 
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white" />
            <input 
                value={jefe_equipo} 
                onChange={(e) => setJefeEquipoEditado(e.target.value)} placeholder="Jefe de Equipo" 
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"/>
            <input 
                value={motor} 
                onChange={(e) => setMotorEditado(e.target.value)} placeholder="motor" 
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"/>
            <div className="flex gap-4">
                <div 
                    type="button" 
                    onClick={onCancelar}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all cursor-pointer ml-3">
                        Cancelar
                </div>
                <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded-lg font-semibold transition-all cursor-pointer">
                        Guardar
                </button>
            </div>
        </form>
    );
}

export default FormularioEditarEscuderia;