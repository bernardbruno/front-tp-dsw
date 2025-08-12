import { Link } from "react-router-dom";

const RegisterPage = () => {
    return (
        <>
            <div className="max-w-md mx-auto my-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form>
                            <label className="label">Nombre de usuario</label>
                            <input type="username" className="input" placeholder="Nombre de usuario" />
                            <label className="label">Contraseña</label>
                            <input type="password" className="input" placeholder="Contraseña" />
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" />
                            <label className="label">Teléfono</label>
                            <input type="tel" className="input" placeholder="Teléfono" />
                            <div><Link to={"/login"} className="link link-hover">¿Ya tienes cuenta? Inicia sesión</Link></div>
                            <button className="btn btn-neutral mt-4">Registrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;