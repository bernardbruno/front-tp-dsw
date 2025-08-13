import { useState } from 'react'

const FormularioEditarNota = ({ nota, onEditarNota, onCancelar }) => {
    const [tituloEditado, setTituloEditado] = useState(nota.title);
    const [textoEditado, setTextoEditado] = useState(nota.content);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/notas/${nota.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: tituloEditado,
                    content: textoEditado,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const notaActualizada = await response.json();
            onEditarNota(notaActualizada);
            onCancelar();
        } catch (error) {
            console.error('Error al editar la nota:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar Nota</h2>
            <input
                type="text"
                value={tituloEditado}
                onChange={(e) => setTituloEditado(e.target.value)}
                placeholder="Título"
            />
            <textarea className='formulario-editar-nota-textarea'
                type="text"
                value={textoEditado}
                onChange={(e) => setTextoEditado(e.target.value)}
                placeholder="Contenido"
            />
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={onCancelar}>Cancelar</button>
        </form>
    );
}

export default FormularioEditarNota;