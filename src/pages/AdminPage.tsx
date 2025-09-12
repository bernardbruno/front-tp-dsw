import { Link } from "react-router-dom";

export default function AdminPage() {
  {
    /* No se si hace falta ponerlo en db a esto */
  }
  const secciones = [
    {
      title: "Circuitos",
      description: "Gestiona los circuitos actuales y agrega nuevas pistas.",
      icon: "🗺️",
      link: "/admin/circuitos",
      gradient: "from-red-600 to-red-500",
    },
    {
      title: "Escuderías",
      description: "Administra las escuderías y sus equipos oficiales.",
      icon: "🏎️💨",
      link: "/admin/escuderias",
      gradient: "from-red-500 to-red-400",
    },
    {
      title: "Pilotos",
      description: "Edita información de los pilotos y agrega nuevos.",
      icon: "🍾👨🏽‍🚀",
      link: "/admin/pilotos",
      gradient: "from-red-700 to-red-500",
    },
    {
      title: "Carreras",
      description:
        "Gestiona el calendario, resultados y datos de las carreras.",
      icon: "🏁",
      link: "/admin/carreras",
      gradient: "from-red-400 to-red-600",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden min-h-screen">
      {/* Líneas decorativas */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        <div className="absolute top-2/4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      </div>

      <div className="container relative mx-auto px-6">
        <div className="mb-8">
          <Link
            to="/home"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105"
          >
            🏠︎ Volver al Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-red-600  to-red-500 to-red-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white font-bold text-4xl">⚙️</span>
          </div>
          <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
            Panel de Administración
          </h2>
          <p className="mt-4 text-gray-300 text-lg">
            Controla los datos principales de la aplicación
          </p>
        </div>

        {/* Grid de cards (se puede hacer una por una)*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 m-auto max-w-4xl">
          {secciones.map((sec, index) => (
            <Link
              key={index}
              to={sec.link}
              className="group relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 backdrop-blur-sm p-6 rounded-lg min-h-[220px] flex flex-col"
            >
              <div className="relative z-10 flex flex-col h-full text-center">
                <div className="text-5xl mb-4">{sec.icon}</div>
                <h3 className="text-xl font-bold text-white">{sec.title}</h3>
                <p className="mt-2 text-gray-300 text-sm flex-grow">
                  {sec.description}
                </p>
              </div>

              {/* Franja inferior */}
              <div
                className={`absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r ${sec.gradient}`}
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
