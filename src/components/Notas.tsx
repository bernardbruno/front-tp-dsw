import { useState } from 'react'
import './Notas.css'

function Notas({notasProps}) {

    const [notas, setNotas] = useState(notasProps)

    return (
        <>
            <h1>Componente Notas</h1>
            <h2>Notas relacionadas</h2>
            <ul>
                {notas.map( (nota, index) => (
                    <li key={nota.id}>{nota.title}</li>
                ))
                }
            </ul>
        </>
    )
}

export default Notas