import { useState } from "react";
import { Link } from "react-router-dom";

const Dock = () => {
  const [mostrarMas, setMostrarMas] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-red-800 flex justify-around py-2 md:hidden">
      <Link to="/" className="text-gray-300 hover:text-red-400 text-xl">🏠</Link>
      <Link to="/torneos" className="text-gray-300 hover:text-red-400 text-xl">🏆</Link>
      <div
        onClick={() => setMostrarMas(!mostrarMas)}
        className="text-gray-300 hover:text-red-400 text-xl cursor-pointer"
      >
        ⋯
      </div>

      {mostrarMas && (
        <div className="absolute bottom-12 bg-gray-800 border border-red-800 rounded-lg shadow-lg p-2 flex flex-col space-y-2">
          <Link to="/carreras" className="text-gray-300 hover:text-red-400">Carreras</Link>
          <Link to="/pilotos" className="text-gray-300 hover:text-red-400">Pilotos</Link>
          <Link to="/ranking" className="text-gray-300 hover:text-red-400">Ranking</Link>
        </div>
      )}
    </nav>
  );
};

export default Dock;
