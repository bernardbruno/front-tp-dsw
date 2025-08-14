"use client"

import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
      <header className="relative">
        <div className="racing-line"></div>

        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-2xl border-b-2 border-red-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle text-white hover:bg-red-800/20 transition-colors"
                  >
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
                      <a className="text-gray-300 hover:text-red-400 hover:bg-red-800/10">Carreras</a>
                    </li>
                    <li>
                      <a className="text-gray-300 hover:text-red-400 hover:bg-red-800/10">Pilotos</a>
                    </li>
                    <li>
                      <a className="text-gray-300 hover:text-red-400 hover:bg-red-800/10">Ranking</a>
                    </li>
                  </ul>
                </div>

                <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">F1</span>
                  </div>
                  <span className="text-white font-racing text-xl">PrediFormula1</span>
                </Link>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-300 hover:text-red-400 font-medium transition-colors relative group">
                  Inicio
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
                </Link>
                <div className="relative group">
                  <span className="text-gray-400 font-medium cursor-not-allowed">
                    Torneos
                    <span className="ml-2 text-xs bg-red-800 text-red-200 px-2 py-1 rounded-full">Próximamente</span>
                  </span>
                </div>
                <div className="relative group">
                  <span className="text-gray-400 font-medium cursor-not-allowed">
                    Foro
                    <span className="ml-2 text-xs bg-red-800 text-red-200 px-2 py-1 rounded-full">Próximamente</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <Link
                  to="/login"
                  className="btn-racing bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
