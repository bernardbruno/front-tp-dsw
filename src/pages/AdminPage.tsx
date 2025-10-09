import { Link } from "react-router-dom";
import circuitosImg from "../assets/admin/circuitosImg.webp";
import escuderiasImg from "../assets/admin/escuderiasImg.webp";
import pilotosImg from "../assets/admin/pilotosImg.webp";
import carrerasImg from "../assets/admin/carrerasImg.webp";

export default function AdminPage() {
  const secciones = [
    {
      title: "Circuitos",
      description: "Gestiona los circuitos actuales y agrega nuevas pistas.",
      link: "/admin/circuitos",
      image: circuitosImg,
    },
    {
      title: "Escuderías",
      description: "Administra las escuderías y sus equipos oficiales.",
      link: "/admin/escuderias",
      image: escuderiasImg,
    },
    {
      title: "Pilotos",
      description: "Edita información de los pilotos y agrega nuevos.",
      link: "/admin/pilotos",
      image: pilotosImg,
    },
    {
      title: "Carreras",
      description:
        "Gestiona el calendario, resultados y datos de las carreras.",
      link: "/admin/carreras",
      image: carrerasImg,
    },
  ];

  return (
    <section className="py-16 bg-black relative overflow-hidden min-h-screen">
      <div className="container relative mx-auto px-6">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105"
          >
            🏠︎ Volver al Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
            Panel de Administración
          </h2>
          <p className="mt-4 text-gray-300 text-lg">
            Controla los datos principales de la aplicación
          </p>
        </div>

        {/* Grid de cards (se puede hacer una por una)*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 m-auto max-w-6xl">
          {secciones.map((sec, index) => (
            <Link
              key={index}
              to={sec.link}
              className="group relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 backdrop-blur-sm rounded-lg min-h-[280px] flex flex-col"
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={sec.image}
                  alt={sec.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/78 via-black/88 to-black/78"></div>
              </div>

              {/* Contenido */}
              <div className="relative z-10 flex h-full p-6 text-center items-center justify-center">
                <div>
                  <h3 className="text-4xl font-bold text-white">{sec.title}</h3>
                  <p className="mt-4 text-gray-200 text-lg text-balance">
                    {sec.description}
                  </p>
                </div>
              </div>

              {/* Franja inferior */}
              <div
                className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-red-700 to-red-500 z-20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
