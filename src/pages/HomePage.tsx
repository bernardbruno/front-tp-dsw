import Navbar from '../components/navbar/Navbar';
import NavbarExitoso from '../components/navbar/NavbarExitoso';
import Dock from '../components/dock/Dock';
import { Link } from "react-router-dom";
import { Features } from '../components/Cards';

const HomePage = () => {
    const logeado = JSON.parse(localStorage.getItem("usuario") || "null");

    // de momento para prueba
    const proximaCarrera = { 
        nombre: "Gran Premio de Monza",
        ubicacion: "Monza, Italia",
        fecha: "8 de Septiembre de 2025",
        hora: "15:00",
        vueltas: 53,
        longitud: "5.793 km"
    }

    return (
        <>
            {logeado ? <NavbarExitoso /> : <Navbar />}
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">

            {/* Próxima carrera */}
            <div className="w-full px-4 py-8">
                <div className="w-full bg-gradient-to-br from-gray-800 to-gray-900 border border-red-800 rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between transition-transform hover:scale-[1.01]">
                    <div>
                        <h2 className="text-3xl font-bold text-red-500 mb-2">
                            Próxima Carrera
                        </h2>
                        <h3 className="text-xl font-semibold">{proximaCarrera.nombre}</h3>
                        <p className="text-gray-300">{proximaCarrera.ubicacion}</p>
                        <p className="mt-2 text-gray-400">
                            {proximaCarrera.fecha} - {proximaCarrera.hora}
                        </p>
                        <p className="text-gray-400">
                            Vueltas: {proximaCarrera.vueltas} • Longitud: {proximaCarrera.longitud}
                        </p>
                    </div>
                    <Link
                        to="/prediccion"
                        className="mt-6 md:mt-0 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold shadow-lg transition-all"
                    >
                        Haz tu predicción
                    </Link>
                </div>
            </div>

            {/* Cards */}
            <div className="container mx-auto px-4 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1 */}
                <div className="rounded-xl border border-red-800/30 p-6 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:border-red-500/80 hover:scale-105 transition-transform">
                    <div className="flex justify-between items-center">
                        <span className="text-3xl">🏁</span>
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">Disponible</span>
                    </div>
                    <h3 className="text-xl font-bold mt-4">Predicciones en Tiempo Real</h3>
                    <p className="text-gray-400 mt-2">
                        Haz tus predicciones antes de cada carrera y ve los resultados en vivo.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="rounded-xl border border-red-800/30 p-6 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:border-red-500/80 hover:scale-105 transition-transform">
                    <div className="flex justify-between items-center">
                        <span className="text-3xl">🏆</span>
                        <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm font-semibold">Próximamente</span>
                    </div>
                    <h3 className="text-xl font-bold mt-4">Torneos Competitivos</h3>
                    <p className="text-gray-400 mt-2">
                        Participa en torneos semanales y mensuales con otros fanáticos.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="rounded-xl border border-red-800/30 p-6 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:border-red-500/80 hover:scale-105 transition-transform">
                    <div className="flex justify-between items-center">
                        <span className="text-3xl">💬</span>
                        <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm font-semibold">Próximamente</span>
                    </div>
                    <h3 className="text-xl font-bold mt-4">Foro de Discusión</h3>
                    <p className="text-gray-400 mt-2">
                        Debate estrategias y análisis con la comunidad de F1.
                    </p>
                </div>

                {/* Card 4 */}
                <div className="rounded-xl border border-red-800/30 p-6 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:border-red-500/80 hover:scale-105 transition-transform">
                    <div className="flex justify-between items-center">
                        <span className="text-3xl">📊</span>
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">Disponible</span>
                    </div>
                    <h3 className="text-xl font-bold mt-4">Estadísticas Detalladas</h3>
                    <p className="text-gray-400 mt-2">
                        Analiza tu rendimiento y mejora tus predicciones.
                    </p>
                </div>
            </div>
        </div>
            
            <Dock />
        </>
    );
};

export default HomePage;
