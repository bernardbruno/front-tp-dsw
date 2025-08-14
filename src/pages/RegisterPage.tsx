import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dock from "../components/dock/Dock";

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
            alert("Registro exitoso");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("No se pudo registrar");
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto my-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <label className="label">Nombre de usuario</label>
                                <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="input" placeholder="Nombre de usuario" />
                                
                                <label className="label">Contraseña</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Contraseña" />
                                
                                <label className="label">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Email" />
                                
                                <label className="label">Teléfono</label>
                                <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="input" placeholder="Teléfono" />
                                
                                <div><Link to={"/login"} className="link link-hover">¿Ya tienes cuenta? Inicia sesión</Link></div>
                                <button className="btn btn-neutral mt-4">Registrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Dock />
        </>
    );
};

export default RegisterPage;
