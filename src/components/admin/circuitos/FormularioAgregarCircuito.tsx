import { useState } from "react";

const FormularioAgregarCircuito = ({ onAgregarCircuito }) => {
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
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                className="input input-neutral" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Nombre" 
            />
            <input 
                type="text" 
                className="input input-neutral" 
                value={ubicacion} 
                onChange={(e) => setUbicacion(e.target.value)} 
                placeholder="Ubicación" 
            />
            <input 
                type="text" 
                className="input input-neutral" 
                value={pais} 
                onChange={(e) => setPais(e.target.value)} 
                placeholder="País" 
            />
            <input 
                type="text" 
                className="input input-neutral" 
                value={vueltas} 
                onChange={(e) => setVueltas(e.target.value)} 
                placeholder="Vueltas" 
            />
            <input 
                type="text" 
                className="input input-neutral" 
                value={longitud_km} step="0.001" 
                onChange={(e) => setLongitudKm(e.target.value)} 
                placeholder="Longitud (km)" 
            />
            <button type="submit">Agregar Circuito</button>
        </form>
    );
};

export default FormularioAgregarCircuito;
