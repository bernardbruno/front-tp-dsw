import { useEffect, useState } from "react";
import Dock from "../dock/Dock";
import Navbar from "../navbar/Navbar";

const RankingPage = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/usuarios")
      .then((res) => res.json())
      .then((data) => {
        // Filtra solo usuarios normales y con puntos definidos
        const top = data
          .filter((u) => u.rol === "user" && typeof u.puntos === "number")
          .sort((a, b) => b.puntos - a.puntos)
          .slice(0, 10);
        setUsuarios(top);
      });
  }, []);

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-16 relative overflow-hidden">
        {/* Líneas decorativas */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          <div className="absolute top-2/4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <h2 className="text-center font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent mb-10 pb-4">
            Ranking de Usuarios
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl shadow-red-500/20 border-separate border-spacing-0">
              <thead>
                <tr className="bg-gradient-to-r from-red-600 to-red-500 text-white">
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Usuario</th>
                  <th className="py-3 px-4 text-left">Puntos</th>
                  <th className="py-3 px-4 text-left">País</th>
                  <th className="py-3 px-4 text-left">Piloto Favorito</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">
                      No hay usuarios para mostrar.
                    </td>
                  </tr>
                )}
                {usuarios.map((u, idx) => (
                  <tr
                    key={u.id}
                    className={`transition-all duration-300 ${
                      idx % 2 === 0 ? "bg-black/70" : "bg-gray-900/60"
                    } hover:bg-red-900/30`}
                  >
                    <td className="py-3 px-4 font-bold text-lg text-red-400">
                      {idx === 0
                        ? "🥇"
                        : idx === 1
                        ? "🥈"
                        : idx === 2
                        ? "🥉"
                        : idx + 1}
                    </td>
                    <td className="py-3 px-4 text-white">{u.nombre}</td>
                    <td className="py-3 px-4 text-yellow-300 font-bold">
                      {u.puntos}
                    </td>
                    <td className="py-3 px-4 text-gray-200">{u.pais || "-"}</td>
                    <td className="py-3 px-4 text-gray-300">
                      {u.piloto_favorito || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Dock />
    </>
  );
};

export default RankingPage;
