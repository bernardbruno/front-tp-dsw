import Dock from "../components/dock/Dock";
import Navbar from "../components/navbar/Navbar";
import { useState } from 'react';

export default function PrediccionPage() {
  const [predicciones, setPredicciones] = useState({
    podio: ['', '', ''],
    vueltaRapida: '',
    pole: '',
    retiro: ''
  });

  // Datos mock (vendrian de una API)
  const pilotos = [
    'Max Verstappen', 'Lewis Hamilton', 'Charles Leclerc', 
    'Lando Norris', 'Carlos Sainz', 'George Russell'
  ];

  // Vendria de una API
  const proximaCarrera = {
    nombre: "Gran Premio de Mónaco",
    fecha: "2025-05-25",
    hora: "15:00"
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-montserrat text-4xl font-bold bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent mb-4">
            Haz tu Predicción
          </h1>
          <div className="bg-gradient-to-r from-red-900/30 to-black/60 p-4 rounded-lg border border-red-500/30">
            <h2 className="text-xl text-white mb-2">{proximaCarrera.nombre}</h2>
            <p className="text-gray-300">{proximaCarrera.fecha} - {proximaCarrera.hora}</p>
            <div className="mt-3 text-sm text-red-400">
              ⏰ Predicciones abiertas hasta 1 hora antes de la carrera
            </div>
          </div>
        </div>

        {/* Formulario de Predicciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Podio */}
          <div className="bg-gradient-to-br from-gray-900/90 to-black/90 p-6 rounded-xl border border-red-900/50">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              🏆 Podio Completo
              <span className="ml-2 text-sm text-yellow-400">(15 pts máx)</span>
            </h3>
            {[0, 1, 2].map((pos) => (
              <div key={pos} className="mb-3">
                <label className="block text-gray-300 mb-1">
                  {pos === 0 && '🥇'} {pos === 1 && '🥈'} {pos === 2 && '🥉'} Posición {pos + 1}
                </label>
                <select 
                  className="w-full px-4 py-2 rounded-lg bg-black text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition font-semibold"
                  value={predicciones.podio[pos]}
                  onChange={(e) => {
                    const newPodio = [...predicciones.podio];
                    newPodio[pos] = e.target.value;
                    setPredicciones({...predicciones, podio: newPodio});
                  }}
                >
                  <option value="">Selecciona un piloto</option>
                  {pilotos.map(piloto => (
                    <option key={piloto} value={piloto}>{piloto}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            
            {/* Pole Position */}
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 p-6 rounded-xl border border-red-900/50">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                ⚡ Pole Position
                <span className="ml-2 text-sm text-yellow-400">(3 pts)</span>
              </h3>
              <select 
                className="w-full px-4 py-2 rounded-lg bg-black text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition font-semibold"
                value={predicciones.pole}
                onChange={(e) => setPredicciones({...predicciones, pole: e.target.value})}>
                <option value="">Selecciona un piloto</option>
                {pilotos.map(piloto => (
                  <option key={piloto} value={piloto}>{piloto}</option>
                ))}
              </select>
            </div>

            {/* Vuelta Rápida */}
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 p-6 rounded-xl border border-red-900/50">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                🏃‍♂️ Vuelta Rápida
                <span className="ml-2 text-sm text-yellow-400">(2 pts)</span>
              </h3>
              <select 
                className="w-full px-4 py-2 rounded-lg bg-black text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition font-semibold"
                value={predicciones.vueltaRapida}
                onChange={(e) => setPredicciones({...predicciones, vueltaRapida: e.target.value})}>
                <option value="">Selecciona un piloto</option>
                {pilotos.map(piloto => (
                  <option key={piloto} value={piloto}>{piloto}</option>
                ))}
              </select>
            </div>

            {/* Primer Retiro */}
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 p-6 rounded-xl border border-red-900/50">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                💥 Retiro
                <span className="ml-2 text-sm text-yellow-400">(1 pt)</span>
              </h3>
              <select 
                className="w-full px-4 py-2 rounded-lg bg-black text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition font-semibold"
                value={predicciones.retiro}
                onChange={(e) => setPredicciones({...predicciones, retiro: e.target.value})}
              >
                <option value="">Selecciona un piloto</option>
                {pilotos.map(piloto => (
                  <option key={piloto} value={piloto}>{piloto}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Puntuación */}
        <div className="mt-8 bg-gradient-to-r from-red-900/30 to-orange-900/30 p-6 rounded-xl border border-red-500/50">
          <h3 className="text-lg font-bold text-white mb-3">📊 Sistema de Puntuación</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-yellow-400 font-bold">15 pts</div>
              <div className="text-gray-300">Podio exacto</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold">8 pts</div>
              <div className="text-gray-300">2 aciertos podio</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold">3 pts</div>
              <div className="text-gray-300">Pole correcta</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold">2 pts</div>
              <div className="text-gray-300">Vuelta rápida</div>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all cursor-pointer">
            Guardar Borrador
          </button>
          <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer">
            🏁 Confirmar Predicción
          </button>
        </div>

      </div>
    </div>
    <Dock />
    </>
  );
}
