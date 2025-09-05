import { useState, useEffect } from "react";
import Dock from "../components/dock/Dock";
import Navbar from "../components/navbar/Navbar";

const PerfilPage = () => {
  // Simulación de usuario y predicciones (reemplaza con tu lógica real)
  const [usuario, setUsuario] = useState({
    nombre: "JuanF1",
    email: "juan@f1.com",
    pais: "Argentina",
    telefono: "1122334455",
    piloto_favorito: "Max Verstappen",
    puntos: 120,
    rol: "user",
  });
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState(usuario);

  const [predicciones, setPredicciones] = useState([
    { carrera: "GP de España", puntos: 12, resultado: "correcto" },
    { carrera: "GP de Imola", puntos: 8, resultado: "parcial" },
    { carrera: "GP de Mónaco", puntos: 0, resultado: "incorrecto" },
  ]);

  useEffect(() => {
    setForm(usuario);
  }, [usuario]);

  // Simula guardar cambios
  const handleGuardar = (e) => {
    e.preventDefault();
    setUsuario({ ...usuario, ...form });
    setEditando(false);
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-12 relative overflow-hidden">
        {/* Líneas decorativas */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          <div className="absolute top-2/4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          {/* Estadísticas tipo Cards */}
          <div className="mb-12">
            <h2 className="font-montserrat text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent text-center mb-8">
              Tu Perfil
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="min-h-60 p-7 relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 bg-gradient-to-br from-red-950/20 to-black/40 backdrop-blur-sm rounded-xl">
                <div className="text-3xl mb-2">🥇</div>
                <div className="font-montserrat text-xl font-bold text-white mb-2">Puntos Totales</div>
                <div className="text-yellow-300 text-3xl font-bold">{usuario.puntos}</div>
              </div>
              <div className="min-h-60 p-7 relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 bg-gradient-to-br from-blue-950/20 to-black/40 backdrop-blur-sm rounded-xl">
                <div className="text-3xl mb-2">🏁</div>
                <div className="font-montserrat text-xl font-bold text-white mb-2">Predicciones Realizadas</div>
                <div className="text-blue-300 text-3xl font-bold">{predicciones.length}</div>
              </div>
              <div className="min-h-60 p-7 relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 bg-gradient-to-br from-green-950/20 to-black/40 backdrop-blur-sm rounded-xl">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-montserrat text-xl font-bold text-white mb-2">Mejor Piloto</div>
                <div className="text-green-300 text-xl font-bold">{usuario.piloto_favorito}</div>
              </div>
            </div>
          </div>

          {/* Historial de predicciones */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">📈 Historial de Predicciones</h3>
            <div className="space-y-4 max-w-2xl mx-auto">
              {predicciones.map((p, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between items-center p-4 rounded-lg border-2
                    ${p.resultado === "correcto"
                      ? "border-green-500 bg-gradient-to-r from-green-900/40 to-black/40"
                      : p.resultado === "parcial"
                      ? "border-yellow-500 bg-gradient-to-r from-yellow-900/40 to-black/40"
                      : "border-red-500 bg-gradient-to-r from-red-900/40 to-black/40"
                    }`}
                >
                  <span className="text-gray-300 font-semibold">{p.carrera}</span>
                  <span className={`font-bold ${p.resultado === "correcto"
                    ? "text-green-400"
                    : p.resultado === "parcial"
                    ? "text-yellow-400"
                    : "text-red-400"
                  }`}>
                    {p.puntos} pts
                  </span>
                </div>
              ))}
              {predicciones.length === 0 && (
                <div className="text-center text-gray-400">No hay predicciones aún.</div>
              )}
            </div>
          </div>

          {/* Información personal editable */}
          <div className="max-w-xl mx-auto bg-gradient-to-br from-gray-800/50 to-black/50 p-6 rounded-xl border border-gray-700/50 mb-16">
            <h3 className="text-xl font-bold text-white mb-4 text-center">👤 Información Personal</h3>
            <form onSubmit={handleGuardar} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Nombre de usuario</label>
                <input
                  type="text"
                  value={form.nombre}
                  disabled={!editando}
                  onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-red-800/40"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-600/40 opacity-70"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">País</label>
                <input
                  type="text"
                  value={form.pais}
                  disabled={!editando}
                  onChange={e => setForm(f => ({ ...f, pais: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-red-800/40"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={form.telefono}
                  disabled={!editando}
                  onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-red-800/40"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Piloto favorito</label>
                <input
                  type="text"
                  value={form.piloto_favorito}
                  disabled={!editando}
                  onChange={e => setForm(f => ({ ...f, piloto_favorito: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-red-800/40"
                />
              </div>
              <div className="flex justify-center gap-4 mt-6">
                {!editando ? (
                  <button
                    type="button"
                    onClick={() => setEditando(true)}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-semibold shadow-lg border border-red-400/50 transition-all hover:scale-105 cursor-pointer">
                        Editar
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-semibold shadow-lg border border-green-400/50 transition-all hover:scale-105 cursor-pointer">
                        Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => { setEditando(false); setForm(usuario); }}
                      className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-lg font-semibold shadow-lg border border-gray-400/50 transition-all hover:scale-105 cursor-pointer"
                        >
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
      <Dock />
    </>
  );
};

export default PerfilPage;