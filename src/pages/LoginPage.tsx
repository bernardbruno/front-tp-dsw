import Dock from "../components/Dock";
import Navbar from "../components/Navbar";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex font-sans">
        {/* Sección izquierda */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-black via-gray-950 to-red-950">
          {/* Efectos de fondo */}
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute left-1/4 top-1/4 w-[300px] h-[300px] bg-red-500/10 rounded-full blur-2xl"></div>
          </div>
          {/* Contenido */}
          <div className="flex mx-auto xl:pl-30 lg:pl-22">
            <div className="relative z-10 flex flex-col justify-between w-full px-12 py-12">
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-5xl font-black text-white mb-6 leading-tight text-balance">
                  Predice el futuro de la Fórmula 1 
                </h2>
                <p className="text-white/80 text-xl leading-relaxed max-w-md text-balance">
                  Accede a tu cuenta y compite con los mejores predictores del mundo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección derecha */}
        <div className="py-0 px-6 w-full lg:w-1/2 flex lg:items-center justify-center lg:p-8 bg-black overflow-y-auto">
          <div className="flex mx-auto xl:pr-30 lg:pr-22">
            <div className="w-full max-w-md py-8">
              {/* Título */}
              <div className="mb-8 text-center">
                <h2 className="text-4xl font-black text-white mb-2">
                  
                </h2>
                <p className="text-gray-400">
                  
                </p>
              </div>
              {/* Formulario */}
              <Login />
            </div>
          </div>
        </div>
      </div>
      <Dock />
    </>
  );
};

export default LoginPage;