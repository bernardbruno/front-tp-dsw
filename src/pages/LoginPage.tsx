import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Dock from "../components/dock/Dock";
import { motion } from "framer-motion";

const LoginPage = () => {
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
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
                    navigate("/");
                }
            } else {
                console.log("Usuario o contraseña incorrectos"); // Hay que mostrarlo en pantalla
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            console.log("Error al iniciar sesión");
        }
    };

    return (
        <>
            <Navbar />
            <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg border border-red-800/30 w-full max-w-md">

                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                            Acceder</h1>
                    </div>
                
                    <form className="">
                        <label className="block text-gray-300 mb-1">Nombre de usuario</label>
                            <input 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                                placeholder="Nombre de usuario" 
                            />
                            <label className="block text-gray-300 mb-1">Contraseña</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                                placeholder="Contraseña" 
                            />
                                
                            <div className="flex justify-items">
                                <Link to="/recover" 
                                    className="text-red-400 hover:underline m-2">
                                    ¿Has olvidado tu contraseña?</Link>
                                <Link to={"/register"} 
                                    className="text-red-400 hover:underline m-2">
                                    ¿Eres nuevo? Unete</Link>
                            </div>
                                
                            <div onClick={handleLogin} 
                                className="btn w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all">
                                Acceder</div>
                    </form>
                </motion.div>
            </div>
            <Dock />
        </>
    );
};

export default LoginPage;
