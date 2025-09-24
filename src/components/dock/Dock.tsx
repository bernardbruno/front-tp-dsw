import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { to: "/home", icon: "🏠", label: "Home" },
  { to: "/carreras", icon: "🏁", label: "Carreras" },
  { to: "/pilotos", icon: "🏎️", label: "Pilotos" },
  { to: "/ranking", icon: "🥇", label: "Ranking" },
  { to: "/home", icon: "🏆", label: "Torneos" },
  { to: "/home", icon: "💬", label: "Foro" },
];

export default function Dock() {
  const [mostrarMas, setMostrarMas] = useState(false);
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[999] 
      bg-gradient-to-r from-black via-gray-950 to-black 
      border-t-2 border-red-900/50
      shadow-2xl shadow-red-900/10
      flex justify-around items-center
      py-2 px-2
      lg:hidden"
    >
      {items.slice(0, 2).map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex flex-col items-center px-2 py-1 rounded-lg transition-all
            ${
              location.pathname.startsWith(item.to)
                ? "bg-gradient-to-t from-red-600/80 to-red-400/80 text-white shadow-lg shadow-red-500/20"
                : "text-gray-300 hover:text-red-400 hover:bg-gray-900/60"
            }`}
        >
          <span className="text-2xl">{item.icon}</span>
          <span className="text-xs font-semibold">{item.label}</span>
        </Link>
      ))}

      {/* Botón "más" */}
      <div
        onClick={() => setMostrarMas((v) => !v)}
        className="flex flex-col items-center px-2 py-1 rounded-lg text-gray-300 hover:text-red-400 hover:bg-gray-900/60 cursor-pointer transition-all"
      >
        <span className="text-2xl">⋯</span>
        <span className="text-xs font-semibold">Más</span>
      </div>

      {/* Menú desplegable */}
      {mostrarMas && (
        <div className="absolute bottom-14 right-4 bg-gradient-to-br from-black via-gray-900 to-black border-2 border-red-900/60 rounded-xl shadow-xl p-3 flex flex-col space-y-2 z-[1000] min-w-[140px]">
          {items.slice(2).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMostrarMas(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all
                ${
                  location.pathname.startsWith(item.to)
                    ? "bg-gradient-to-t from-red-600/80 to-red-400/80 text-white shadow"
                    : "text-gray-300 hover:text-red-400 hover:bg-gray-900/60"
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

