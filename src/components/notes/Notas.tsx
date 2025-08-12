import { useState, useEffect } from 'react';
import FormularioAgregarNota from './FormularioAgregarNota';
import FormularioEditarNota from './FormularioEditarNota';
import './Notas.css';
function Notas() {

    const [notas, setNotas] = useState([])
    const [notaEditando, setNotaEditando] = useState(null);

    // Obtengo las notas del servidor de db.json
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/notas')
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                setNotas(data)
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, [])  

    const agregarNota = (nuevaNota) => {
        setNotas([...notas, nuevaNota])
    } 

    const eliminarNota = (id) => {
        setNotas(notas.filter(nota => nota.id !== id))
        fetch(`http://localhost:3000/notas/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                console.log('Nota eliminada con éxito')
            })
            .catch(error => console.error('Error al eliminar la nota:', error))
    }

    const editarNota = (notaActualizada) => {
        setNotas(notas.map(nota => {
            return nota.id === notaActualizada.id ? notaActualizada : nota;
            })
        );
    }

    return (
        <>
            <h1>Componente Notas</h1>
            <FormularioAgregarNota onAgregarNota={agregarNota} />
            <h2>Notas obtenidas del servidor</h2>
            <ul>
                {notas.map((nota) => (
                    <li key={nota.id}>
                        <h3>{nota.title}</h3>
                        <p>{nota.content}</p>
                        <button onClick={() => eliminarNota(nota.id)}>Eliminar</button>
                        <button onClick={() => setNotaEditando(nota.id)}>Editar</button>
                        {notaEditando === nota.id && (
                            <FormularioEditarNota 
                                nota={nota} 
                                onEditarNota={editarNota} 
                                onCancelar={() => setNotaEditando(null)} 
                            />
                        )}
                    </li>

                ))}
            </ul>
        </>
    )
}

export default Notas