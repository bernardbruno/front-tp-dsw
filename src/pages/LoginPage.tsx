import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <>
        <div className="max-w-md mx-auto my-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset">
                            <label className="label">Nombre de usuario</label>
                            <input type="username" className="input" placeholder="Nombre de usuario" />
                            <label className="label">Contraseña</label>
                            <input type="password" className="input" placeholder="Contraseña" />
                            <div><a className="link link-hover">¿Has olvidado tu contraseña?</a></div>
                            <div><Link to={"/register"} className="link link-hover">Crear cuenta</Link></div>
                            <button className="btn btn-neutral mt-4">Acceder</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;