import { useState } from 'react'

const FormularioEditarEscuderia = ({ escuderia, onEditarEscuderia, onCancelar }) => {
    const [nombreEditado, setNombreEditado] = useState(escuderia.nombre);
    const [paisBaseEditado, setPaisBaseEditado] = useState(escuderia.pais_base);
    const [jefeEquipoEditado, setJefeEquipoEditado] = useState(escuderia.jefe_equipo);
    const [motorEditado, setMotorEditado] = useState(escuderia.motor);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/notas/${escuderia.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombreEditado,
                    pais_base: paisBaseEditado,
                    jefe_equipo: jefeEquipoEditado,
                    motor: motorEditado
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const escuderiaActualizada = await response.json();
            onEditarEscuderia(escuderiaActualizada);
            onCancelar();
        } catch (error) {
            console.error('Error al editar la escuderia:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar Escuderia</h2>
            <input
                type="text"
                value={nombreEditado}
                onChange={(e) => setNombreEditado(e.target.value)}
                placeholder="Nombre"
            />
            <input
                type="text"
                value={paisBaseEditado}
                onChange={(e) => setPaisBaseEditado(e.target.value)}
                placeholder="País base"
            />
            <input
                type="text"
                value={jefeEquipoEditado}
                onChange={(e) => setJefeEquipoEditado(e.target.value)}
                placeholder="Jefe de equipo"
            />
            <input
                type="text"
                value={motorEditado}
                onChange={(e) => setMotorEditado(e.target.value)}
                placeholder="Motor"
            />
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={onCancelar}>Cancelar</button>
        </form>
    );
}

export default FormularioEditarEscuderia;