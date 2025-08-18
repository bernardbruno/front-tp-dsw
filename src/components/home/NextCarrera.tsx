import { Link } from "react-router-dom";

export function NextCarrera() {
  // De momento hardcodeado, más adelante se trae de la DB
  const proximaCarrera = { 
    nombre: "Gran Premio de Monza",
    ubicacion: "Monza, Italia",
    fecha: "8 de Septiembre de 2025",
    hora: "15:00",
    vueltas: 53,
    longitud: "5.793 km"
  };

return (
  <section className="pt-14 pb-10 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
    {/* Líneas rojas decorativas */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
    </div>
    <div className="container relative mx-auto max-w-6xl px-4">
      <div className='p-5 px-15 m-1 md:flex overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2'>
        <div className="flex-1 text-left pb-3">
          <h2 className="font-montserrat text-3xl font-bold text-red-500 mb-2 bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
            Próxima Carrera
          </h2>
          <h3 className="text-xl font-semibold text-white">{proximaCarrera.nombre}</h3>
          <p className="text-gray-300">{proximaCarrera.ubicacion}</p>
          <p className="mt-2 text-gray-400">
            {proximaCarrera.fecha} - {proximaCarrera.hora}
          </p>
        </div>
        
        {/* Botón */}
        <div className="flex items-center justify-center md:justify-end">
          <Link
            to="/prediccion"
            className="text-lg md:text-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-8 py-3 rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-transform hover:scale-105"
          >
            Haz tu predicción
          </Link>
        </div>
      </div>
    </div>
  </section>
);
}
