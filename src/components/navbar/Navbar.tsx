import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
    <header className="relative">
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-2xl border-b-2 border-red-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-18">
                    {/* Contiene la hamburguesa, el logo y el nombre */}
                    <div className="flex items-center space-x-4">
                        {/* Menú hamburguesa */}
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
                        {/* Logo */}
                        <Link to="/home" className="flex items-center space-x-2 hover:scale-105 transition-transform">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">F1</span>
                            </div>
                            <span className="text-white font-racing text-xl">PrediFormula1</span>
                        </Link>
                    </div>

                    {/* Opciones que se pueden elegir */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link to="/" 
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

                    {/* Para logear */}
                    <div className="flex items-center ">
                        <Link
                        to="/login"
                        className="px-4 py-2 mr-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all text-sm sm:text-base">
                            Iniciar Sesión
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>
    </header>
    )
}

export default Navbar;