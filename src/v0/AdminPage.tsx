import { Link } from "react-router-dom"
import Navbar from "./components/Navbar"
import NavbarExitoso from "./components/NavbarExitoso"

const AdminPage = () => {
  return (
    <>
    <Navbar />
    <NavbarExitoso />
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-20"></div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white font-bold text-3xl">⚙️</span>
          </div>
          <h1 className="text-5xl font-racing text-white mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Panel Administrativo
          </h1>
          <p className="text-xl text-gray-300">Gestiona pilotos, escuderías y circuitos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Link to="/AdminDashboardV0" className="group">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-red-800/30 hover:scale-105 transition-all duration-300 hover:shadow-red-500/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">🏁</span>
                </div>
                <h3 className="text-2xl font-racing text-white mb-2">Circuitos</h3>
                <p className="text-gray-400 mb-4">Gestionar pistas y ubicaciones</p>
                <div className="btn-racing bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-block">
                  Administrar
                </div>
              </div>
            </div>
          </Link>

          <Link to="/pilotos" className="group">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-red-800/30 hover:scale-105 transition-all duration-300 hover:shadow-red-500/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">🏎️</span>
                </div>
                <h3 className="text-2xl font-racing text-white mb-2">Pilotos</h3>
                <p className="text-gray-400 mb-4">Gestionar corredores</p>
                <div className="btn-racing bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-block">
                  Administrar
                </div>
              </div>
            </div>
          </Link>

          <Link to="/escuderias" className="group">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-red-800/30 hover:scale-105 transition-all duration-300 hover:shadow-red-500/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">🏆</span>
                </div>
                <h3 className="text-2xl font-racing text-white mb-2">Escuderías</h3>
                <p className="text-gray-400 mb-4">Gestionar equipos</p>
                <div className="btn-racing bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-block">
                  Administrar
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminPage
