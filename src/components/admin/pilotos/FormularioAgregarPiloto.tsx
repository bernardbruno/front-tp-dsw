import { useState } from "react";

const FormularioAgregarPiloto = ({ onAgregarPiloto }) => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState("");
    const [nacionalidad, setNacionalidad] = useState("");
    const [equipo, setEquipo] = useState("");
    const [debut, setDebut] = useState("");
    const [titulos, setTitulos] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre || !apellido || !edad || !nacionalidad || !equipo || !debut || !titulos) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        const nuevoPiloto = { nombre, apellido, edad: Number(edad), 
            nacionalidad, equipo, debut, titulos: Number(titulos)
         };

        fetch('http://localhost:3000/pilotos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoPiloto)
        })
            .then(res => res.json())
            .then(data => {
                onAgregarPiloto(data);
                setNombre("");
                setApellido("");
                setEdad("");
                setNacionalidad("");
                setEquipo("");
                setDebut("");
                setTitulos("");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={nombre} 
                className="input input-neutral"
                type="text" 
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Nombre" 
            />
            <input 
                value={apellido} 
                className="input input-neutral"
                type="text" 
                onChange={(e) => setApellido(e.target.value)} 
                placeholder="Apellido" 
            />
            <input 
                value={edad} 
                className="input input-neutral"
                type="text" 
                onChange={(e) => setEdad(e.target.value)} 
                placeholder="Edad" 
            />
            <input 
                value={nacionalidad} 
                className="input input-neutral"
                type="text" 
                onChange={(e) => setNacionalidad(e.target.value)} 
                placeholder="Nacionalidad" 
            />
            <input 
                value={equipo}
                className="input input-neutral"
                type="text" 
                onChange={(e) => setEquipo(e.target.value)} 
                placeholder="Equipo" 
            />
            <input 
                value={debut}
                className="input input-neutral"
                type="text" 
                onChange={(e) => setDebut(e.target.value)} 
                placeholder="Fecha de Debut (YYYY-MM-DD)"
            />
            <input 
                type= "text"
                className="input input-neutral"
                value={titulos} 
                type="text" onChange={(e) => setTitulos(e.target.value)} 
                placeholder="Títulos"
            />
            <button type="submit">Agregar Piloto</button>
        </form>
    );
};

export default FormularioAgregarPiloto;
