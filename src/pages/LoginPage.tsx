import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dock from "../components/dock/Dock";

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

                alert(`Bienvenido, ${usuario.nombre}`);

                if (usuario.rol === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        } catch (err) {
            console.error(err);
            alert("Error al iniciar sesión");
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto my-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <label className="label">Nombre de usuario</label>
                                <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="input" placeholder="Nombre de usuario" />
                                
                                <label className="label">Contraseña</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Contraseña" />
                                
                                <div><a className="link link-hover">¿Has olvidado tu contraseña?</a></div>
                                <div><Link to={"/register"} className="link link-hover">Crear cuenta</Link></div>
                                
                                <button onClick={handleLogin} className="btn btn-neutral mt-4">Acceder</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
            <Dock />
        </>
    );
};

export default LoginPage;
