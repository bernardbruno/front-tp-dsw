import { useState, useEffect } from 'react';
import FormularioAgregarPiloto from './FormularioAgregarPiloto';
import FormularioEditarPiloto from './FormularioEditarPiloto';
import '../escuderias/escuderias.css';
import { Link } from 'react-router-dom';

function Pilotos() {
    const [pilotos, setPilotos] = useState([]);
    const [pilotoEditando, setPilotoEditando] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/pilotos');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPilotos(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const agregarPiloto = (nuevoPiloto) => {
        setPilotos([...pilotos, nuevoPiloto]);
    };

    const eliminarPiloto = (id) => {
        setPilotos(pilotos.filter(piloto => piloto.id !== id));
        fetch(`http://localhost:3000/pilotos/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                console.log('Piloto eliminado con éxito');
            })
            .catch(error => console.error('Error al eliminar el piloto:', error));
    };

    const editarPiloto = (pilotoActualizado) => {
        setPilotos(pilotos.map(piloto =>
            piloto.id === pilotoActualizado.id ? pilotoActualizado : piloto
        ));
    };

    return (
        <>
            <h1>CRUD PILOTOS</h1>
            <div><Link to={"/admin"} className="link link-hover">Volver al Menú Admin</Link></div>
            <FormularioAgregarPiloto onAgregarPiloto={agregarPiloto} />
            <h2>Pilotos obtenidos del servidor</h2>
            <ul>
                {pilotos.map((piloto) => (
                    <li key={piloto.id}>
                        <h2>{piloto.nombre} {piloto.apellido}</h2>
                        <p>Edad: {piloto.edad}</p>
                        <p>Nacionalidad: {piloto.nacionalidad}</p>
                        <p>Equipo: {piloto.equipo}</p>
                        <p>Debut: {piloto.debut}</p>
                        <p>Titulos: {piloto.titulos}</p>
                        <button onClick={() => eliminarPiloto(piloto.id)}>Eliminar</button>
                        <button onClick={() => setPilotoEditando(piloto.id)}>Editar</button>
                        {pilotoEditando === piloto.id && (
                            <FormularioEditarPiloto
                                piloto={piloto}
                                onEditarPiloto={editarPiloto}
                                onCancelar={() => setPilotoEditando(null)}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Pilotos;
