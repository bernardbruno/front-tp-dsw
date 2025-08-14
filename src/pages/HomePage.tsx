import Navbar from '../components/navbar/Navbar';
import NavbarExitoso from '../components/navbar/NavbarExitoso';
import Dock from '../components/dock/Dock';


const HomePage = () => {
    const logeado = JSON.parse(localStorage.getItem("usuario") || "null");

    return (
        <>
            {logeado ? <NavbarExitoso /> : <Navbar />}

            <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-racing text-white mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                    Predice a los campeones de Fórmula 1
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Únete a la comunidad más apasionada de Fórmula 1. Haz tus predicciones, compite con amigos y demuestra que conoces el mundo de las carreras.
                    </p>
                </div>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                    Comenzar a Predecir
                    </button>
                </div>
            </div>
            
            <Dock />
        </>
    );
};

export default HomePage;
