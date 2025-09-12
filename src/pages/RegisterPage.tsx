import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dock from "../components/dock/Dock";
import Navbar from "../components/navbar/Navbar";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pais, setPais] = useState("");
  const [pilotoFavorito, setPilotoFavorito] = useState("");
  const [pilotos, setPilotos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/pilotos")
      .then((res) => res.json())
      .then(setPilotos)
      .catch(() => setPilotos([]));
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !password || !email || !telefono || !pais) {
      setError("Todos los campos son obligatorios excepto piloto favorito");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          password,
          email,
          telefono,
          pais,
          piloto_favorito: pilotoFavorito,
          puntos: 0,
          rol: "user",
        }),
      });

      if (!res.ok) throw new Error("Error al registrar usuario");
      navigate("/login");
    } catch (err) {
      setError("No se pudo registrar el usuario");
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 bg-gradient-to-br from-gray-800/90 to-black/90 p-8 rounded-2xl shadow-lg border-2 border-red-900/50 w-full max-w-md hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 mx-3"
        >
          <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent text-center pb-3">
            Regístrate ya!
          </h2>

          {error && (
            <div className="mb-4 text-center text-red-400 font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <label className="block text-gray-300 mb-1">
              Nombre de usuario
            </label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-800/40"
              placeholder="Nombre de usuario"
            />
            <label className="block text-gray-300 mb-1">Contraseña</label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-800/40"
              placeholder="Contraseña"
            />
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-800/40"
              placeholder="Email"
            />
            <label className="block text-gray-300 mb-1">Teléfono</label>
            <input
              value={telefono}
              type="tel"
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-800/40"
              placeholder="Teléfono"
            />
            <label className="block text-gray-300 mb-1">País</label>
            <input
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-800/40"
              placeholder="País"
            />
            <label className="block text-gray-300 mb-1">
              Piloto favorito (opcional)
            </label>
            <select
              value={pilotoFavorito}
              onChange={(e) => setPilotoFavorito(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-800/40"
            >
              <option value="">Ninguno</option>
              {pilotos.map((p) => (
                <option
                  key={p.id}
                  value={`${p.nombre} ${p.apellido ? p.apellido : ""}`.trim()}
                >
                  {p.nombre} {p.apellido}
                </option>
              ))}
            </select>
            <div className="text-sm mb-4">
              <Link to={"/login"} className="text-red-400 hover:underline">
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </div>
            <button
              type="submit"
              className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-transform hover:scale-105 cursor-pointer text-center"
            >
              Registrar
            </button>
          </form>
        </motion.div>
      </section>
      <Dock />
    </>
  );
};

export default RegisterPage;
