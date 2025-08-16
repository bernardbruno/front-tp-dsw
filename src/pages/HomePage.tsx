import Navbar from '../components/navbar/Navbar';
import NavbarExitoso from '../components/navbar/NavbarExitoso';
import Dock from '../components/dock/Dock';
import { Cards } from '../components/home/Cards';
import { NextCarrera } from '../components/home/NextCarrera';

const HomePage = () => {
    const logeado = JSON.parse(localStorage.getItem("usuario") || "null");

    return (
        <>
            {logeado ? <NavbarExitoso /> : <Navbar />}
            <Navbar />
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-950 to-black">
                <div className="mx-3">

                    {/* Próxima carrera */}
                    <NextCarrera />

                    {/* Cards */}
                    <Cards />
                    
                </div>
            </div>
            
            <Dock />
        </>
    );
};

export default HomePage;
