import { useState } from 'react';

const FormularioEditarPiloto = ({ piloto, onEditarPiloto, onCancelar }) => {
    const [nombre, setNombreEditado] = useState(piloto.nombre);
    const [apellido, setApellidoEditado] = useState(piloto.apellido);
    const [edad, setEdadEditado] = useState(piloto.edad);
    const [nacionalidad, setNacionalidad] = useState(piloto.nacionalidad);
    const [equipo, setEquipoEditado] = useState(piloto.equipo);
    const [debut, setDebutEditado] = useState(piloto.debut);
    const [titulos, setTitulosEditado] = useState(piloto.titulos);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pilotoActualizado = { ...piloto, nombre, apellido, edad, nacionalidad, equipo, debut, titulos };

        try {
            const response = await fetch(`http://localhost:3000/pilotos/${piloto.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pilotoActualizado)
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            onEditarPiloto(data);
            onCancelar();
        } catch (error) {
            console.error('Error al editar el piloto:', error);
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
                value={apellido} 
                onChange={(e) => setApellidoEditado(e.target.value)} placeholder="Apellido" 
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"/>
            <input 
                value={edad} 
                onChange={(e) => setEdadEditado(e.target.value)} placeholder="Edad" 
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"/>
            <input 
                value={nacionalidad} 
                onChange={(e) => setNacionalidad(e.target.value)} placeholder="Nacionalidad" 
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"/>
            <input 
                value={equipo}
                onChange={(e) => setEquipoEditado(e.target.value)} placeholder="Equipo" 
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"/>
            <input 
                value={debut} 
                onChange={(e) => setDebutEditado(e.target.value)} placeholder="Debut" 
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"/>
            <input 
                value={titulos}
                onChange={(e) => setTitulosEditado(e.target.value)} placeholder="Titulos" 
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

export default FormularioEditarPiloto;
