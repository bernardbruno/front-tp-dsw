import Navbar from "../components/navbar/Navbar";
import Dock from "../components/dock/Dock";
import { motion } from "framer-motion";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-950 to-black relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Efectos circulares */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute left-1/3 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-600/20 rounded-full blur-2xl"></div>
          <div className="absolute right-1/3 bottom-1/3 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] bg-red-400/15 rounded-full blur-xl"></div>
        </div>

        {/* Caja principal */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 bg-black/70 p-12 sm:p-16 shadow-2xl border border-red-900/80 w-full max-w-lg min-h-[540px] flex flex-col justify-center items-center hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 mx-3"
        >
          {/* Decoraciones en las esquinas */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-red-500/30 to-transparent "></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-red-500/30 to-transparent "></div>

          {/* Título */}
          <h1
            className="text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-red-400 via-white to-red-600 bg-clip-text text-transparent animate-pulse drop-shadow-lg"
          >
            Iniciar Sesión
          </h1>
          

          {/* Formulario */}
          <Login />
        </motion.div>
        
      </section>
      <Dock />
    </>
  );
};

export default LoginPage;
