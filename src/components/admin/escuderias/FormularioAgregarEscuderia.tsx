import { useState } from "react"

const FormularioAgregarEscuderia = ({onAgregarEscuderia, onCancelar}) => {
    const [nombre, setNombre] = useState("")
    const [paisBase, setPaisBase] = useState("")
    const [jefeEquipo, setJefeEquipo] = useState("")
    const [motor, setMotor] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        if (nombre === "" || paisBase === ""|| jefeEquipo === "" || motor === "") {
            console.error("Los campos no pueden estar vacíos")
            return
        }
        const nuevaEscuderia = {
            nombre: nombre,
            pais_base: paisBase,
            jefe_equipo: jefeEquipo,
            motor: motor
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
            setNombre("") 
            setPaisBase("")
            setJefeEquipo("")
            setMotor("")
        })
    }

    return(
        <form onSubmit={handleSubmit}
            className="space-y-4 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg border border-red-600">
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Nombre" 
            />
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={paisBase} 
                onChange={(e) => setPaisBase(e.target.value)} 
                placeholder="País base" 
            />
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={jefeEquipo} 
                onChange={(e) => setJefeEquipo(e.target.value)} 
                placeholder="Jefe de Equipo" 
            />
            <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-black-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                value={motor} 
                onChange={(e) => setMotor(e.target.value)} 
                placeholder="Motor" 
            />
            <div className="flex gap-4">
                <div
                    type="button"
                    onClick={onCancelar}
                    className="cursor-pointer flex ml-4 px-2 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all">
                        Cancelar
                </div>
                <button 
                    type="submit"
                    className="cursor-pointer flex px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all">
                        Agregar
                </button>
            </div>
        </form>
    )
}

export default FormularioAgregarEscuderia