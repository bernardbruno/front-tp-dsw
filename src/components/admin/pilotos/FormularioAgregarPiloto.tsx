import { useState } from "react";

const FormularioAgregarPiloto = ({ onAgregarPiloto , onCancelar}) => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState("");
    const [nacionalidad, setNacionalidad] = useState("");
    const [equipo, setEquipo] = useState("");
    const [debut, setDebut] = useState("");
    const [titulos, setTitulos] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre || !apellido || !edad || !nacionalidad || !equipo || !debut || !titulos) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        const nuevoPiloto = { nombre, apellido, edad: Number(edad), 
            nacionalidad, equipo, debut, titulos: Number(titulos)
         };

        fetch('http://localhost:3000/pilotos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoPiloto)
        })
            .then(res => res.json())
            .then(data => {
                onAgregarPiloto(data);
                setNombre("");
                setApellido("");
                setEdad("");
                setNacionalidad("");
                setEquipo("");
                setDebut("");
                setTitulos("");
            });
    };

    return (
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
                value={apellido} 
                onChange={(e) => setApellido(e.target.value)} 
                placeholder="Apellido" 
            />
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={edad} 
                onChange={(e) => setEdad(e.target.value)} 
                placeholder="Edad" 
            />
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={nacionalidad} 
                onChange={(e) => setNacionalidad(e.target.value)} 
                placeholder="Nacionalidad" 
            />
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={equipo}
                onChange={(e) => setEquipo(e.target.value)} 
                placeholder="Equipo" 
            />
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={debut} 
                onChange={(e) => setDebut(e.target.value)} 
                placeholder="Debut" 
            />
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={titulos}
                onChange={(e) => setTitulos(e.target.value)} 
                placeholder="Titulos" 
            />
            <div className="flex gap-4">
                <div
                    type="button"
                    onClick={onCancelar}
                    className="cursor-pointer flex ml-4 px-2 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all">
                        Cancelar
                </div>
                <button 
                    type="submit"
                    className="cursor-pointer flex px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all">
                        Agregar
                </button>
            </div>
        </form>
    );
};

export default FormularioAgregarPiloto;
