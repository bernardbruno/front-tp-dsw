import { useState } from "react"

const Formulario = ({onAgregarNota}) => {
    const [tituloNota, setTituloNota] = useState("")
    const [contenidoNota, setContenidoNota] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        if (tituloNota === "" || contenidoNota === "") {
            console.error("El título y el contenido de la nota no pueden estar vacíos")
            return
        }
        const nuevaNota = {
            title: tituloNota,
            content: contenidoNota
        }
        onAgregarNota(nuevaNota)

        fetch('http://localhost:3000/notas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaNota)
        })
        .then(response => response.json())
        .then(data => {
            onAgregarNota(data)
            setTituloNota("") // Limpiar el campo de título
            setContenidoNota("") // Limpiar el campo de contenido
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                id="titulo"
                name="titulo"
                type="text" 
                value={tituloNota} 
                onChange={e => setTituloNota(e.target.value)} 
                placeholder="Título de la nota"
            />
            <input 
                id="nota"
                name="nota"
                type="text" 
                value={contenidoNota} 
                onChange={e => setContenidoNota(e.target.value)} 
                placeholder="Escribe tu nota aquí"
            />
            <button type="submit">Crear Nota</button>
        </form>
    )
}

export default Formulario