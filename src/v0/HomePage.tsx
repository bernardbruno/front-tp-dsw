import NavbarExitoso from "./components/NavbarExitoso"
import Navbar from "./components/Navbar"

const HomePage = () => {
  const getUsuario = () => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("usuario") || "null")
    }
    return null
  }

  const usuario = getUsuario()

  return (
    <>
      {usuario ? <NavbarExitoso /> : <Navbar />}

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Contenido principal */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-racing text-white mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Bienvenido a PrediFormula1
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              La plataforma definitiva para predicciones de Fórmula 1. Compite, predice y gana.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-red-800/30 overflow-hidden hover:scale-105 transition-transform duration-300 w-full max-w-md">
              <figure className="relative">
                <img
                  src="https://a.espncdn.com/i/venues/f1/day/404.svg"
                  alt="GP"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </figure>
              <div className="p-6">
                <h2 className="text-2xl font-racing text-white mb-3">Heineken Dutch GP</h2>
                <p className="text-gray-300 mb-4">
                  En Circuit Park Zandvoort; Zandvoort, Holanda. va a ganar Norris o Piastri
                </p>
                <button className="btn-racing w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-semibold transition-all duration-300">
                  Conocer más
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-red-800/30 overflow-hidden hover:scale-105 transition-transform duration-300 w-full max-w-md">
              <figure className="relative">
                <img
                  src="https://c.files.bbci.co.uk/BDEB/production/_103191684_dddffb6b-e8f1-4180-a987-1161a11f5bfb.jpg"
                  alt="Noticias"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </figure>
              <div className="p-6">
                <h2 className="text-2xl font-racing text-white mb-3">Mira ya las últimas noticias</h2>
                <p className="text-gray-300 mb-4">Increíble choque entre 2 pilotos...</p>
                <button className="btn-racing w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-semibold transition-all duration-300">
                  Conocer más
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
