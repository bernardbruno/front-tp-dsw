"use client"

import { Link, useNavigate } from "react-router-dom"

const NavbarExitoso = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("usuario")
    navigate("/login")
  }

  return (
    <header className="relative">
      {/* Línea de carrera animada */}
      <div className="racing-line relative"></div>

      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-2xl border-b-2 border-red-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Menú hamburguesa y Logo */}
            <div className="flex items-center space-x-4">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white hover:bg-red-800/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-gray-900 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-red-800"
                >
                  <li>
                    <a className="text-gray-300 hover:text-red-400">Carreras</a>
                  </li>
                  <li>
                    <a className="text-gray-300 hover:text-red-400">Pilotos</a>
                  </li>
                  <li>
                    <a className="text-gray-300 hover:text-red-400">Ranking</a>
                  </li>
                </ul>
              </div>

              <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">F1</span>
                </div>
                <span className="text-white font-racing text-xl">PrediFormula1</span>
              </Link>
            </div>

            {/* Menú usuario */}
            <div className="flex items-center space-x-4">
              {usuario && (
                <>
                  <span className="text-gray-300 hidden sm:block">
                    Bienvenido, <span className="text-red-400 font-semibold">{usuario.nombre}</span>
                  </span>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:bg-red-800/20">
                      <div className="w-10 rounded-full ring-2 ring-red-500">
                        <img src="https://i.pravatar.cc/100" alt="Avatar" />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-gray-900 rounded-box w-52 border border-red-800"
                    >
                      <li>
                        <Link to="/perfil" className="text-gray-300 hover:text-red-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          Perfil
                        </Link>
                      </li>
                      <li>
                        <Link to="/configuracion" className="text-gray-300 hover:text-red-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Configuración
                        </Link>
                      </li>
                      <li>
                        <button onClick={handleLogout} className="text-gray-300 hover:text-red-400 w-full text-left">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavbarExitoso
