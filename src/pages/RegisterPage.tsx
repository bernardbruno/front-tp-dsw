import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dock from "../components/dock/Dock";
import Navbar from "../components/navbar/Navbar";
import { motion } from "framer-motion";

const RegisterPage = () => {
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre || !password || !email || !telefono) {
            alert("Todos los campos son obligatorios");
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
                    rol: "user"
                })
            });

            if (!res.ok) throw new Error("Error al registrar usuario");
            console.log("Registro exitoso");
            navigate("/login");
        } catch (err) {
            console.error(err);
            console.log("No se pudo registrar");
        }
    };

    return (
        <>
            <Navbar />
            <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg border border-red-800/30 w-full max-w-md"
                > {/* Una animacion cualquier cosa hago un div comun con la className que esta en este div */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Regístrate ya!</h1>
                    </div>

                    <div className="">
                        <form onSubmit={handleRegister}>
                            <label className="block text-gray-300 mb-1">
                                Nombre de usuario</label>
                            <input value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                                placeholder="Nombre de usuario" />  
                            <label className="block text-gray-300 mb-1">Contraseña</label>
                            <input value={password} 
                                type="password" onChange={(e) => 
                                setPassword(e.target.value)} 
                                className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                                placeholder="Contraseña" />
                            <label className="block text-gray-300 mb-1">
                                Email</label>
                            <input value={email} 
                                type="email" 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                                placeholder="Email" />
                            <label className="block text-gray-300 mb-1">Teléfono</label>
                            <input value={telefono} 
                                type="tel"
                                onChange={(e) => setTelefono(e.target.value)} 
                                className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                                placeholder="Teléfono" />

                            <div className="text-sm mb-4">
                                <Link to={"/login"} className="text-red-400 hover:underline">
                                    ¿Ya tienes cuenta? Inicia sesión</Link>
                            </div>
                            <div className="btn w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all">
                                Registrar
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
            <Dock />
        </>
    );
};

export default RegisterPage;
