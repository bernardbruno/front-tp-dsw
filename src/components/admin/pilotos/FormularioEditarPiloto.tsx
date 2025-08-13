import { useState } from 'react';

const FormularioEditarPiloto = ({ piloto, onEditarPiloto, onCancelar }) => {
    const [nombre, setNombre] = useState(piloto.nombre);
    const [apellido, setApellido] = useState(piloto.apellido);
    const [edad, setEdad] = useState(piloto.edad);
    const [nacionalidad, setNacionalidad] = useState(piloto.nacionalidad);
    const [equipo, setEquipo] = useState(piloto.equipo);
    const [debut, setDebut] = useState(piloto.debut);
    const [titulos, setTitulos] = useState(piloto.titulos);

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
        <form onSubmit={handleSubmit}>
            <h2>Editar Piloto</h2>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
            <input value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" />
            <input value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Edad" />
            <input value={nacionalidad} onChange={(e) => setNacionalidad(e.target.value)} placeholder="Nacionalidad" />
            <input value={equipo} onChange={(e) => setEquipo(e.target.value)} placeholder="Equipo" />
            <input value={debut}  onChange={(e) => setDebut(e.target.value)} placeholder="Debut" />
            <input value={titulos} onChange={(e) => setTitulos(e.target.value)} placeholder="Títulos" />
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={onCancelar}>Cancelar</button>
        </form>
    );
};

export default FormularioEditarPiloto;
