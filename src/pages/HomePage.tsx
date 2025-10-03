import Navbar from "../components/navbar/Navbar";
import Dock from "../components/dock/Dock";
import { Cards } from "../components/home/Cards";
import { NextCarrera } from "../components/home/NextCarrera";
import Footer from "../components/home/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 relative overflow-hidden bg-black">
        <div className="mx-3">
          {/* Próxima carrera */}
          <NextCarrera />

          {/* Cards */}
          <Cards />
        </div>
      </main>

      <Footer />
      <Dock />
    </div>
  );
};

export default HomePage;
