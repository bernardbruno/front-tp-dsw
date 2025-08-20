import Dock from "../dock/Dock";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";


const PILOTOS_POR_PAGINA = 6;

export default function PilotosPage() {
  const [pilotos, setPilotos] = useState([]);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    fetch("http://localhost:3000/pilotos")
      .then(res => res.json())
      .then(setPilotos);
  }, []);

  const totalPaginas = Math.ceil(pilotos.length / PILOTOS_POR_PAGINA);
  const pilotosPagina = pilotos.slice(
    (pagina - 1) * PILOTOS_POR_PAGINA,
    pagina * PILOTOS_POR_PAGINA
  );

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-12 relative overflow-hidden">
        {/* Líneas decorativas */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          <div className="absolute top-2/4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <h2 className="text-center font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent mb-10">
            Conoce a los pilotos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {pilotosPagina.length === 0 && (
              <div className="col-span-full text-center text-gray-400 text-xl">
                No hay pilotos para mostrar.
              </div>
            )}
            {pilotosPagina.map((p) => (
              <div
                key={p.id}
                className="relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/80 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2 backdrop-blur-sm rounded-lg flex bg-gradient-to-b from-black via-gray-950 to-black">
                {/* Imagen piloto */}
                <div className="flex-shrink-0 w-48 h-48 h-full overflow-hidden bg-gray-800 mr-6 flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black ml-8">
                  <img
                    src={"/assets/pilotoSinFondo.png"}
                    alt={`${p.nombre} ${p.apellido}`}
                    className="object-cover w-full h-full"
                    onError={e => {
                      e.currentTarget.src = "/assets/piloto.png";
                    }}
                  />
                </div>
                {/* Datos piloto */}
                <div className="flex flex-col justify-center flex-1 p-3 ml-10">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-bold text-white">{p.nombre} {p.apellido}</h3>
                  </div>
                  <p className="text-gray-300">{p.nacionalidad}</p>
                  <p className="text-gray-300">
                    Estado: <span className={p.estado === "activo" ? "text-green-400" : "text-yellow-400"}>{p.estado}</span>
                  </p>
                  <p className="text-gray-300">
                    Equipo: {p.equipo ? p.equipo : <span className="text-red-400">Sin equipo</span>}
                  </p>
                  <p className="text-gray-300">Edad: {p.edad}</p>
                  <p className="text-gray-300">Debut: {p.debut}</p>
                  <p className="text-gray-300">Títulos: {p.titulos}</p>
                </div>
                {/* Franja inferior decorativa */}
                <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-red-600 to-red-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="flex justify-center mt-10 gap-4">
              <button
                onClick={() => setPagina(p => Math.max(1, p - 1))}
                disabled={pagina === 1}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-semibold shadow-lg border border-red-400/50 transition-all hover:scale-105 disabled:opacity-40 cursor-pointer">
                  Anterior
              </button>
              <span className="text-white font-bold text-lg flex items-center">
                Página {pagina} de {totalPaginas}
              </span>
              <button
                onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                disabled={pagina === totalPaginas}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-semibold shadow-lg border border-red-400/50 transition-all hover:scale-105 disabled:opacity-40 cursor-pointer">
                  Siguiente
              </button>
            </div>
          )}
        </div>
      </section>
      <Dock />
    </>
  );
}