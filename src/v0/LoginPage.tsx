import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [nombre, setNombre] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await fetch(`http://localhost:3000/usuarios?nombre=${nombre}&password=${password}`)
      const data = await res.json()

      if (data.length > 0) {
        const usuario = data[0]
        localStorage.setItem("usuario", JSON.stringify(usuario))

        alert(`Bienvenido, ${usuario.nombre}`)

        if (usuario.rol === "admin") {
          navigate("/admin")
        } else {
          navigate("/")
        }
      } else {
        alert("Usuario o contraseña incorrectos")
      }
    } catch (err) {
      console.error(err)
      alert("Error al iniciar sesión")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-20"></div>

      <div className="relative w-full max-w-md z-10">
        <div className="racing-line mb-8"></div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-red-800/30">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-bold text-2xl">F1</span>
            </div>
            <h1 className="text-3xl font-racing text-white mb-2">Iniciar Sesión</h1>
            <p className="text-gray-400">Accede a tu cuenta de PrediFormula1</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nombre de usuario</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Ingresa tu usuario"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <button
              onClick={handleLogin}
              className="btn-racing w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
            >
              Acceder
            </button>

            <div className="space-y-3 text-center">
              <div>
                <a href="#" className="text-red-400 hover:text-red-300 text-sm transition-colors">
                  ¿Has olvidado tu contraseña?
                </a>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-400 text-sm mb-3">¿No tienes cuenta?</p>
                <Link
                  to="/register"
                  className="inline-block bg-transparent border-2 border-red-600 text-red-400 hover:bg-red-600 hover:text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Crear cuenta
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Volver al inicio */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
