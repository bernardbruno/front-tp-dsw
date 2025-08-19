import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';

const NavbarExitoso = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement | null>(null)
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        navigate("/");
        window.location.reload();
    };

    // cerrar menú con click afuera
    useEffect(() => {
        const onDown = (e: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(e.target as Node) &&
            btnRef.current &&
            !btnRef.current.contains(e.target as Node)
        ) {
            setOpen(false);
        }
        };
        document.addEventListener("mousedown", onDown);
        return () => {
        document.removeEventListener("mousedown", onDown);
        };
    }, []);

    return (
    <header className="sticky top-0 z-[999] w-full border-b-2 border-red-900/50 bg-gradient-to-r from-black via-gray-950 to-black backdrop-blur-md relative overflow-visible">

            <div className="container mx-auto px-4 flex items-center justify-between h-16 relative">
                    {/* Contiene la hamburguesa, el logo y el nombre */}
                    <div className="flex items-center space-x-4">
                        {/* Menú hamburguesa
                        <div className="dropdown lg:hidden">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white hover:bg-red-800/20">
                                ☰
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-gray-900 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-red-500"
                            >
                                <li>
                                    <Link to="/carreras" className="hover:text-red-400">Carreras</Link>
                                </li>
                                <li>
                                    <Link to="/torneos" className="hover:text-red-400">Torneos</Link>
                                </li>
                                <li>
                                    <Link to="/pilotos" className="hover:text-red-400">Pilotos</Link>
                                </li>
                                <li>
                                    <Link to="/ranking" className="hover:text-red-400">Ranking</Link>
                                </li>
                            </ul>
                        </div>
                        */}
                        {/* Logo */}
                        <Link to="/home" className="flex items-center space-x-2 hover:scale-105 transition-transform">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30">
                                <span className="text-white font-bold text-xl">F1</span>
                            </div>
                            <span className="font-montserrat text-xl font-bold bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">PrediFormula1</span>
                        </Link>
                    </div>

                    {/* Opciones que se pueden elegir */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link to="/carreras" 
                        className="text-gray-300 hover:text-red-400 font-medium transition-colors relative group">
                            Carreras
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/" 
                        className="text-gray-300 hover:text-red-400 font-medium transition-colors relative group">
                            Torneos
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/" 
                        className="text-gray-300 hover:text-red-400 font-medium transition-colors relative group">
                            Pilotos
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/" 
                        className="text-gray-300 hover:text-red-400 font-medium transition-colors relative group">
                            Ranking
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
                        </Link>
                        <span className="text-gray-400 font-medium cursor-not-allowed">
                            Foro
                            <span className="ml-2 text-xs bg-red-800 text-red-200 px-2 py-1 rounded-full">Próximamente</span>
                        </span>
                    </div>

                    {/* Si esta logeado -> Menú avatar 
                        Si no esta logeado -> Iniciar Sesion */}
                    {!usuario ? 
                        (
                            <div className="flex items-center ">
                                <Link
                                to="/login"
                                className="px-4 py-2 mr-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all text-sm shadow-lg shadow-red-500/30 border border-red-400/50 sm:text-base">
                                    Iniciar Sesión
                                </Link>
                            </div> 
                        ) : 
                        (
                            <div className="relative z-[1100]">
                                <button onClick={() => setOpen((v) => !v)}
                                    className="flex items-center justify-center w-11 h-11 rounded-full ring-2 ring-red-500 hover:scale-105 transition cursor-pointer"
                                    ref= {btnRef}>
                                        <img src="https://i.pravatar.cc/100" alt="Avatar" className="rounded-full"/>
                                </button>
                                {open && (
                                    <div className="absolute right-0 mt-3 w-52 bg-gray-900 border border-red-800 rounded-lg shadow-xl z-[1200]"
                                    ref={menuRef}>
                                        <ul className="flex flex-col p-2 text-gray-300" >
                                            <li>
                                                <Link to="/perfil" className="block text-gray-300 hover:text-red-400 px-4 py-2">
                                                    👤 Perfil
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/configuracion" className="block text-gray-300 hover:text-red-400 px-4 py-2">
                                                    ⚙️ Configuración
                                                </Link>
                                            </li>
                                            <li>
                                                <button onClick={handleLogout} 
                                                    className="block text-gray-300 hover:text-red-400 w-full text-left px-4 py-2 cursor-pointer">
                                                    🚪 Cerrar sesión
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
    </header>
    )
};

export default NavbarExitoso;
