import { Link, useNavigate } from "react-router-dom";

const NavbarExitoso = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        navigate("/login");
    };

    return (
        <header>
            <div className="navbar bg-base-100 shadow-sm">
                {/* Menú hamburguesa */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Carreras</a></li>
                            <li><a>Pilotos</a></li>
                            <li><a>Ranking</a></li>
                        </ul>
                    </div>
                </div>

                {/* Logo */}
                <div className="navbar-center">
                    <Link to={"/"} className="btn btn-ghost text-xl">PrediFormula1</Link>
                </div>

                {/* Menú usuario */}
                <div className="navbar-end">
                    {usuario && (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://i.pravatar.cc/100" alt="Avatar" />
                                </div>
                            </label>
                            <ul tabIndex={0}
                                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <Link to="/perfil">Perfil</Link>
                                </li>
                                <li>
                                    <Link to="/configuracion">Configuración</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Cerrar sesión</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default NavbarExitoso;
