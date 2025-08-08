import { useState } from 'react'
import './Contador.css'


//Si aplico dos veces el mismo componente, se crean dos contadores independientes
//No comparten el mismo estado
function Contador() {
    const [contador, setContador] = useState(0)

    return (
        <>
      <h1>Componente Contador</h1>
      <div className="card">
        <h4>Cantidad de carreras que va a ganar colapinto: {contador}</h4>
        <button onClick={() => setContador(contador + 1)}>
          Aumentar contador
        </button>
        <button onClick={() => setContador(contador - 1)}>
          Disminuir contador
        </button>
        <button onClick={() => setContador(0)}>
          Reiniciar contador
        </button>
      </div>
      </>
    )
}

export default Contador
