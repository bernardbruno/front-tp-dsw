import { useState } from 'react';

const FormularioEditarCircuito = ({ circuito, onEditarCircuito, onCancelar }) => {
    const [nombre, setNombreEditado] = useState(circuito.nombre);
    const [ubicacion, setUbicacionEditado] = useState(circuito.ubicacion);
    const [pais, setPaisEditado] = useState(circuito.pais);
    const [vueltas, setVueltasEditado] = useState(circuito.vueltas);
    const [longitud_km, setLongitudKmEditado] = useState(circuito.longitud_km);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const circuitoActualizado = { ...circuito, nombre, ubicacion, pais, vueltas, longitud_km };

        try {
            const response = await fetch(`http://localhost:3000/circuitos/${circuito.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(circuitoActualizado)
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            onEditarCircuito(data);
            onCancelar();
        } catch (error) {
            console.error('Error al editar el circuito:', error);
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
                value={ubicacion} 
                onChange={(e) => setUbicacionEditado(e.target.value)} placeholder="Ubicación" 
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"/>
            <input 
                value={pais} 
                onChange={(e) => setPaisEditado(e.target.value)} placeholder="País" 
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"/>
            <input 
                value={vueltas} 
                onChange={(e) => setVueltasEditado(e.target.value)} placeholder="Vueltas" 
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"/>
            <input 
                value={longitud_km} step="0.001" 
                onChange={(e) => setLongitudKmEditado(e.target.value)} placeholder="Longitud (km)" 
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
};

export default FormularioEditarCircuito;
