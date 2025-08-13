import { useState, useEffect } from 'react';
import FormularioAgregarEscuderia from './FormularioAgregarEscuderia';
import FormularioEditarEscuderia from './FormularioEditarEscuderia';
import './escuderias.css';
import { Link } from 'react-router-dom';

function Escuderias() {

    const [escuderias, setEscuderias] = useState([])
    const [escuderiaEditando, setEscuderiaEditando] = useState(null);

    // Obtengo las escuderias del servidor de db.json
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/escuderias')
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                setEscuderias(data)
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, [])  

    const agregarEscuderia = (nuevaEscuderia) => {
        setEscuderias([...escuderias, nuevaEscuderia])
    } 

    const eliminarEscuderia = (id) => {
        setEscuderias(escuderias.filter(escuderias => escuderias.id !== id))
        fetch(`http://localhost:3000/escuderias/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                console.log('Escuderia eliminada con éxito')
            })
            .catch(error => console.error('Error al eliminar la escuderia:', error))
    }

    const editarNota = (escuderiaActualizada) => {
        setEscuderias(escuderias.map(escuderia => {
            return escuderia.id === escuderiaActualizada.id ? escuderiaActualizada : nota;
            })
        );
    }

    return (
        <>
            <h1>CRUD ESCUDERIA</h1>
            <div><Link to={"/admin"} className="link link-hover">Volver al Menú Admin</Link></div>
            <FormularioAgregarEscuderia onAgregarEscuderia={agregarEscuderia} />
            <h2>Escuderias obtenidas del servidor</h2>
            <ul>
                {escuderias.map((escuderia) => (
                    <li key={escuderia.id}>
                        <h2>{escuderia.nombre}</h2>
                        <p>{escuderia.pais_base}</p>
                        <p>{escuderia.jefe_equipo}</p>
                        <p>{escuderia.motor}</p>
                        <button onClick={() => eliminarEscuderia(escuderia.id)}>Eliminar</button>
                        <button onClick={() => setEscuderiaEditando(escuderia.id)}>Editar</button>
                        {escuderiaEditando === escuderia.id && (
                            <FormularioEditarEscuderia 
                                escuderia={escuderia} 
                                onEditarEscuderia={editarEscuderia} 
                                onCancelar={() => setEscuderiaEditando(null)} 
                            />
                        )}
                    </li>

                ))}
            </ul>
        </>
    )
}

export default Escuderias