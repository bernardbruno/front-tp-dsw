import { Link } from "react-router-dom";
import landingFoto from "../assets/landing.png";

const LandingPage = () => {
    return (
        <div className="relative h-screen w-screen">
            <img
                src= {landingFoto}
                alt="F1 Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/80"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                    Predice a los campeones
                </h1>
                <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mb-8">
                    Únete a la comunidad más apasionada de Fórmula 1. Haz tus predicciones,
                    compite con amigos y demuestra que conoces el mundo de las carreras.
                </p>
                <Link
                    to="/home"
                    className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-lg transition-all"
                >
                    Comenzar a predecir
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
