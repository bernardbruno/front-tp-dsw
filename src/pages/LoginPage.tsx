import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Dock from "../components/dock/Dock";
import { motion } from "framer-motion";

const LoginPage = () => {
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        if (!nombre.trim() || !password.trim()) {
        setError("Por favor, completa ambos campos.");
        return;
        }
        try {
            const res = await fetch(`http://localhost:3000/usuarios?nombre=${nombre}&password=${password}`);
            const data = await res.json();

            if (data.length > 0) {
                const usuario = data[0];
                localStorage.setItem("usuario", JSON.stringify(usuario));

                console.log(`Bienvenido, ${usuario.nombre}`); // Hay que mostrarlo en pantalla

                if (usuario.rol === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/home");
                }
            } else {
                setError("Usuario o contraseña incorrectos");
                setNombre("");
                setPassword("");
            }
        } catch (err) {
            console.error(err);
            setError("Error al iniciar sesión");
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
                    className="relative z-10 bg-gradient-to-br from-gray-800/90 to-black/90 p-8 rounded-2xl shadow-lg border-2 border-red-900/50 w-full max-w-md hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 mx-3">
                
                    <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent text-center lg:text-left pb-1">
                        Acceder
                    </h2>

                    {error && (
                        <div className="mb-4 text-center text-white-400 font-semibold text-lg">
                            {error}
                        </div>
                    )}
                
                    <form className="space-y-4" 
                        onSubmit={(e) => {e.preventDefault();handleLogin();}}>
                        <label className="block text-gray-300 mb-1">Nombre de usuario</label>
                            <input 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-800/40" 
                                placeholder="Nombre de usuario" 
                            />
                            <label className="block text-gray-300 mb-1">Contraseña</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-800/40" 
                                placeholder="Contraseña" 
                            />
                                
                            <div className="flex flex-col sm:flex-row justify-between text-sm mt-2s">
                                <Link to="/recuperar" 
                                    className="text-red-400 hover:underline m-2">
                                        ¿Has olvidado tu contraseña?
                                </Link>
                                <Link to={"/register"} 
                                    className="text-red-400 hover:underline m-2">
                                        ¿Eres nuevo? Unete
                                </Link>
                            </div>
                                
                            <button type="submit" 
                                className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-transform hover:scale-105 cursor-pointer text-center">
                                Acceder
                            </button>
                    </form>
                </motion.div>
            </section>
            <Dock />
        </>
    );
};

export default LoginPage;
