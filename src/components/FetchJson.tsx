import { useState, useEffect } from 'react'
import Formulario from './Formulario';

function FetchJson() {

    const [notas, setNotas] = useState([])
    
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

    return (
        <>
            <h1>Componente FetchJson</h1>
            <Formulario onAgregarNota={agregarNota} />
            <h2>Notas obtenidas del servidor</h2>
            <ul>
                {notas.map((nota) => (
                    <li key={nota.id}>{nota.title}: {nota.content}</li>
                ))}
            </ul>
        </>
    )
}

export default FetchJson