import { Link } from "react-router-dom";
import videoFondo from "../assets/f1.mp4";

const LandingPage = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-950 to-black w-full h-screen flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoFondo} type="video/mp4" />
        {/* <img src={fondoImg} alt="F1 background" className="w-full h-full object-cover" /> */}
      </video>
      <div className="absolute inset-0 bg-black/92"></div>

      <div className="relative z-10 text-center max-w-3xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-montserrat text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-white">Predice a los</span>
            <br />
            <span className="bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
              Campeones
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Únete a la comunidad más apasionada de Fórmula 1. Haz tus
            predicciones, compite con amigos y demuestra que conoces el mundo de
            las carreras.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/home"
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-8 shadow-lg shadow-red-500/30 border border-red-400/50 text-lg cursor-pointer p-3"
            >
              Comenzar a Predecir
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
