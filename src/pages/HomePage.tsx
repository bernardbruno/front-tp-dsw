import Navbar from '../components/navbar/Navbar';
import Dock from '../components/dock/Dock';
import { Cards } from '../components/home/Cards';
import { NextCarrera } from '../components/home/NextCarrera';


const HomePage = () => {

    return (
        <>
            <Navbar />
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black to-black">
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

