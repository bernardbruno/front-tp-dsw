import { useState } from 'react';

const FormularioEditarCircuito = ({ circuito, onEditarCircuito, onCancelar }) => {
    const [nombre, setNombre] = useState(circuito.nombre);
    const [ubicacion, setUbicacion] = useState(circuito.ubicacion);
    const [pais, setPais] = useState(circuito.pais);
    const [vueltas, setVueltas] = useState(circuito.vueltas);
    const [longitud_km, setLongitudKm] = useState(circuito.longitud_km);

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
        <form onSubmit={handleSubmit}>
            <h2>Editar Circuito</h2>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
            <input value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} placeholder="Ubicación" />
            <input value={pais} onChange={(e) => setPais(e.target.value)} placeholder="País" />
            <input value={vueltas} onChange={(e) => setVueltas(e.target.value)} placeholder="Vueltas" />
            <input value={longitud_km} step="0.001" onChange={(e) => setLongitudKm(e.target.value)} placeholder="Longitud (km)" />
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={onCancelar}>Cancelar</button>
        </form>
    );
};

export default FormularioEditarCircuito;
