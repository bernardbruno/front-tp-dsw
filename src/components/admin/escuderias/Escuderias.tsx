import { useState, useEffect } from 'react';
import FormularioAgregarEscuderia from './FormularioAgregarEscuderia';
import FormularioEditarEscuderia from './FormularioEditarEscuderia';
import './escuderias.css';
import { Link } from 'react-router-dom';

function Escuderias() {
    const [escuderias, setEscuderias] = useState([]);
    const [escuderiaEditando, setEscuderiaEditando] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/escuderias');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEscuderias(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const agregarEscuderia = (nuevaEscuderia) => {
        setEscuderias([...escuderias, nuevaEscuderia]);
    };

    const eliminarEscuderia = (id) => {
        setEscuderias(escuderias.filter(escuderia => escuderia.id !== id));
        fetch(`http://localhost:3000/escuderias/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log('Escuderia eliminada con éxito');
            })
            .catch(error => console.error('Error al eliminar la escuderia:', error));
    };

    const editarEscuderia = (escuderiaActualizada) => {
        setEscuderias(escuderias.map(escuderia =>
            escuderia.id === escuderiaActualizada.id ? escuderiaActualizada : escuderia
        ));
    };

    return (
        <>
            <h1>CRUD ESCUDERIAS</h1>
            <div><Link to={"/admin"} className="link link-hover">Volver al Menú Admin</Link></div>
            <FormularioAgregarEscuderia onAgregarEscuderia={agregarEscuderia} />
            <h2>Escuderias obtenidas del servidor</h2>
            <ul>
                {escuderias.map((escuderia) => (
                    <li key={escuderia.id}>
                        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-escuderias" />
                            <div className="collapse-title font-semibold">{escuderia.nombre}</div>
                            <div className="collapse-content text-sm">
                                <p>País base: {escuderia.pais_base}</p>
                                <p>Jefe de equipo: {escuderia.jefe_equipo}</p>
                                <p>Motor: {escuderia.motor}</p>
                                <button onClick={() => eliminarEscuderia(escuderia.id)}>Eliminar</button>
                                <button onClick={() => setEscuderiaEditando(escuderia.id)}>Editar</button>
                                {escuderiaEditando === escuderia.id && (
                                    <FormularioEditarEscuderia
                                        escuderia={escuderia}
                                        onEditarEscuderia={editarEscuderia}
                                        onCancelar={() => setEscuderiaEditando(null)}
                                    />
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Escuderias;