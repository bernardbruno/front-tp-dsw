import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { to: "/", icon: "🏠", label: "Home" },
  { to: "/carreras", icon: "🏁", label: "Carreras" },
  { to: "/pilotos", icon: "🏎️", label: "Pilotos" },
  { to: "/ranking", icon: "🥇", label: "Ranking" },
  { to: "/torneos", icon: "🏆", label: "Torneos" },
  { to: "/foro", icon: "💬", label: "Foro" },
];

export default function Dock() {
  const [mostrarMas, setMostrarMas] = useState(false);
  const location = useLocation();
  const dockMenuRef = useRef<HTMLDivElement | null>(null);

  // Cerrar menú Dock con click afuera
  useEffect(() => {
    if (!mostrarMas) return;
    const onDown = (e: MouseEvent) => {
      if (
        dockMenuRef.current &&
        !dockMenuRef.current.contains(e.target as Node)
      ) {
        setMostrarMas(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
    };
  }, [mostrarMas]);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[999] bg-black border-t-2 border-red-900/50 shadow-2xl shadow-red-900/10 flex justify-around items-center
      py-2 px-2 lg:hidden"
    >
      {items.slice(0, 2).map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex flex-col items-center py-1 rounded-lg transition-all flex-1
            ${
              item.to === "/"
                ? location.pathname === "/"
                  ? "bg-gradient-to-t from-red-600/80 to-red-400/80 text-white shadow-lg shadow-red-500/20"
                  : "text-gray-300 hover:text-red-400 hover:bg-gray-900/60"
                : location.pathname.startsWith(item.to)
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
        className="flex flex-col items-center flex-1 py-1 rounded-lg text-gray-300 hover:text-red-400 hover:bg-gray-900/60 cursor-pointer transition-all"
      >
        <span className="text-2xl">⋯</span>
        <span className="text-xs font-semibold">Más</span>
      </div>

      {/* Menú desplegable */}
      {mostrarMas && (
        
        <div className="absolute bottom-14 right-4 bg-black border-2 border-red-900/60 rounded-xl shadow-xl p-1 flex flex-col flex-1 space-y-2 z-[1000] min-w-[140px]"
        ref={dockMenuRef}>
          {items.slice(2).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMostrarMas(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${
                  item.to === "/"
                    ? location.pathname === "/"
                      ? "bg-gradient-to-t from-red-600/80 to-red-400/80 text-white shadow-lg shadow-red-500/20"
                      : "text-gray-300 hover:text-red-400 hover:bg-gray-900/60"
                    : location.pathname.startsWith(item.to)
                    ? "bg-gradient-to-t from-red-600/80 to-red-400/80 text-white shadow-lg shadow-red-500/20"
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
}
