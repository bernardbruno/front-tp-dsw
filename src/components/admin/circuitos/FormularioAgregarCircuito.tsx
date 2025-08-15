import { useState } from "react";

const FormularioAgregarCircuito = ({ onAgregarCircuito, onCancelar }) => {
    const [nombre, setNombre] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [pais, setPais] = useState("");
    const [vueltas, setVueltas] = useState("");
    const [longitud_km, setLongitudKm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre || !ubicacion || !pais || !vueltas || !longitud_km) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        const nuevoCircuito = {
            nombre,
            ubicacion,
            pais,
            vueltas: Number(vueltas),
            longitud_km: Number(longitud_km)
        };

        fetch('http://localhost:3000/circuitos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoCircuito)
        })
            .then(res => res.json())
            .then(data => {
                onAgregarCircuito(data);
                setNombre("");
                setUbicacion("");
                setPais("");
                setVueltas("");
                setLongitudKm("");
            });
    };

    return (
        <>
        <form onSubmit={handleSubmit}
            className="space-y-4 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg border border-red-600">
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Nombre" 
            />
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={ubicacion} 
                onChange={(e) => setUbicacion(e.target.value)} 
                placeholder="Ubicación" 
            />
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={pais} 
                onChange={(e) => setPais(e.target.value)} 
                placeholder="País" 
            />
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={vueltas} 
                onChange={(e) => setVueltas(e.target.value)} 
                placeholder="Vueltas" 
            />
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={longitud_km} step="0.001" 
                onChange={(e) => setLongitudKm(e.target.value)} 
                placeholder="Longitud (km)" 
            />
            <div className="flex gap-4">
                <div
                    type="button"
                    onClick={onCancelar}
                    className="cursor-pointer flex ml-4 px-2 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all">
                        Cancelar
                </div>
                <div 
                    type="submit"
                    className="cursor-pointer flex px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all">
                        Agregar
                </div>
            </div>
        </form>
    </>
    );
};

export default FormularioAgregarCircuito;
