import { useState, useEffect } from 'react';
import FormularioAgregarCircuito from './FormularioAgregarCircuito';
import FormularioEditarCircuito from './FormularioEditarCircuito';
import '../escuderias/escuderias.css';
import { Link } from 'react-router-dom';

function Circuitos() {
    const [circuitos, setCircuitos] = useState([]);
    const [circuitoEditando, setCircuitoEditando] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/circuitos');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCircuitos(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const agregarCircuito = (nuevoCircuito) => {
        setCircuitos([...circuitos, nuevoCircuito]);
    };

    const eliminarCircuito = (id) => {
        setCircuitos(circuitos.filter(circuito => circuito.id !== id));
        fetch(`http://localhost:3000/circuitos/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                console.log('Circuito eliminado con éxito');
            })
            .catch(error => console.error('Error al eliminar el circuito:', error));
    };

    const editarCircuito = (circuitoActualizado) => {
        setCircuitos(circuitos.map(circuito =>
            circuito.id === circuitoActualizado.id ? circuitoActualizado : circuito
        ));
    };

    return (
        <>
            <h1>CRUD CIRCUITOS</h1>
            <div><Link to={"/admin"} className="link link-hover">Volver al Menú Admin</Link></div>
            <FormularioAgregarCircuito onAgregarCircuito={agregarCircuito} />
            <h2>Circuitos obtenidos del servidor</h2>
            <ul>
                {circuitos.map((circuito) => (
                    <li key={circuito.id}>
                        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title font-semibold">{circuito.nombre}</div>
                            <div className="collapse-content text-sm">
                                <p>Ubicación: {circuito.ubicacion}</p>
                                <p>País: {circuito.pais}</p>
                                <p>Vueltas: {circuito.vueltas}</p>
                                <p>Longitud (km): {circuito.longitud_km}</p>
                                <button onClick={() => eliminarCircuito(circuito.id)}>Eliminar</button>
                                <button onClick={() => setCircuitoEditando(circuito.id)}>Editar</button>
                                {circuitoEditando === circuito.id && (
                                    <FormularioEditarCircuito
                                        circuito={circuito}
                                        onEditarCircuito={editarCircuito}
                                        onCancelar={() => setCircuitoEditando(null)}
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

export default Circuitos;
