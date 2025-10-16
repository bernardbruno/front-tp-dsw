export function Cards() {
  const features = [
    {
      title: "Predicciones en Tiempo Real",
      description:
        "Haz tus predicciones antes de cada carrera y ve los resultados en vivo con datos actualizados al instante.",
      status: "Disponible",
      icon: "🏁",
    },
    {
      title: "Torneos Competitivos",
      description:
        "Participa en torneos semanales y mensuales. Compite contra los mejores predictores del mundo.",
      status: "Disponible",
      icon: "🏆",
    },
    {
      title: "Foro de Discusión",
      description:
        "Debate estrategias, análisis técnicos y las últimas noticias con la comunidad más apasionada de F1.",
      status: "Próximamente",
      icon: "💬",
    },
  ];

  return (
    <section className="pt-6 py-20 md:py-16 relative overflow-hidden">
      <div className="container relative mx-auto">
        <div className="mx-auto text-center mb-16">
          <h2 className="font-montserrat text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-red-700 via-white to-red-700 bg-clip-text text-transparent">
            Mantente Adelante del Pelotón
          </h2>
          <p className="mt-6 text-lg text-gray-100 leading-relaxed">
            Herramientas y características diseñadas para los verdaderos
            fanáticos de la Fórmula 1
          </p>
          <div className="mt-8 mx-auto w-24 h-1 bg-gradient-to-r from-red-600 via-white to-red-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3 max-w-2xl sm:max-w-full mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`min-h-60 p-7 m-1 relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 bg-gradient-to-b from-black via-[#100000] via-60% to-black backdrop-blur-sm`}
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/10 via-transparent to-black/20"></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-500 via-transparent to-red-500 animate-pulse"></div>
              </div>

              <div className="pb-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="text-3xl filter drop-shadow-lg hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div
                    variant={
                      feature.status === "Disponible" ? "default" : "secondary"
                    }
                    className={`${
                      feature.status === "Disponible"
                        ? "bg-gradient-to-r from-red-600 to-red-500 text-white border-red-400 shadow-lg shadow-red-500/30"
                        : "bg-gray-800 text-gray-300 border-gray-600"
                    } font-semibold px-3 py-1`}
                  >
                    {feature.status}
                  </div>
                </div>
                <div className="font-montserrat text-xl font-bold text-white mt-4 leading-tight">
                  {feature.title}
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-gray-100 leading-relaxed text-sm">
                  {feature.description}
                </div>
              </div>

              <div
                className={`absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-red-500 via-red-400 to-red-500 shadow-lg`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>

              <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-red-500/30 to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-red-500/30 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
