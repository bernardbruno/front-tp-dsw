import Navbar from "../components/navbar/Navbar";
import Dock from "../components/dock/Dock";
import { Cards } from "../components/home/Cards";
import { NextCarrera } from "../components/home/NextCarrera";
import Footer from "../components/home/Footer";
import videoFondo from "../assets/f1.mp4";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 relative overflow-hidden bg-black">
        <section className="relative overflow-hidden w-full h-screen flex items-center justify-center">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoFondo} type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-black/50 to-black"></div>

          <div className="relative z-10 text-center max-w-3xl px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="font-montserrat text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl animate-fade-in">
                <span className="text-white">Predice a los</span>
                <br />
                <span className="bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
                  Campeones
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto animate-fade-in-delay">
                Únete a la comunidad más apasionada de Fórmula 1. Haz tus
                predicciones, compite con amigos y demuestra que conoces el mundo de
                las carreras.
              </p>

              {/* Indicador de scroll */}
              <div className="mt-20 md:mt-40 flex flex-col items-center animate-bounce">
                <p className="text-gray-400 text-sm mb-2">Desliza para continuar</p>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-red-500"
                >
                  <path d="M12 5v14"/>
                  <path d="m19 12-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido principal con fondo negro sólido */}
        <div className="relative bg-black">
          {/* Gradiente sutil en la parte superior para suavizar la transición */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
          
          <div className="mx-3">
            <div className="relative z-10">
              <NextCarrera />
            </div>

            {/* Cards */}
            <Cards />
          </div>
        </div>
      </main>

      <Footer />
      <Dock />
    </div>
  );
};

export default HomePage;