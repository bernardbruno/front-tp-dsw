import { useState } from "react"

const FormularioAgregarEscuderia = ({onAgregarEscuderia}) => {
    const [nombreEscuderia, setNombreEscuderia] = useState("")
    const [paisBaseEscuderia, setPaisBaseEscuderia] = useState("")
    const [jefeEquipoEscuderia, setJefeEquipoEscuderia] = useState("")
    const [motorEscuderia, setMotorEscuderia] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        if (nombreEscuderia === "" || paisBaseEscuderia === ""|| jefeEquipoEscuderia === "" || motorEscuderia === "") {
            console.error("Los campos no pueden estar vacíos")
            return
        }
        const nuevaEscuderia = {
            nombre: nombreEscuderia,
            pais_base: paisBaseEscuderia,
            jefe_equipo: jefeEquipoEscuderia,
            motor: motorEscuderia
        }
        onAgregarEscuderia(nuevaEscuderia)

        fetch('http://localhost:3000/escuderias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaEscuderia)
        })
        .then(response => response.json())
        .then(data => {
            onAgregarEscuderia(data)
            setNombreEscuderia("") 
            setPaisBaseEscuderia("")
            setJefeEquipoEscuderia("")
            setMotorEscuderia("")
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                className="input input-neutral" 
                type="text" 
                value={nombreEscuderia} 
                onChange={e => setNombreEscuderia(e.target.value)} 
                placeholder="Nombre de la escudería"
            />
            <input
                className="input input-neutral"
                type="text" 
                value={paisBaseEscuderia} 
                onChange={e => setPaisBaseEscuderia(e.target.value)} 
                placeholder="País base de la escudería"
            />
            <input
                className="input input-neutral"
                type="text" 
                value={jefeEquipoEscuderia} 
                onChange={e => setJefeEquipoEscuderia(e.target.value)} 
                placeholder="Jefe equpo de la escudería"
            />
            <input
                className="input input-neutral"
                type="text" 
                value={motorEscuderia} 
                onChange={e => setMotorEscuderia(e.target.value)} 
                placeholder="Motor de la escudería"
            />
            <button type="submit">Crear Escuderia</button>
        </form>
    )
}

export default FormularioAgregarEscuderia