// src/components/CarreraDetalle.tsx
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { toast } from "react-toastify"
import FormularioEditarCarrera from "./FormularioEditarCarrera"

interface Piloto {
  id: number
  nombre: string
  apellido: string
}

interface Resultado {
  piloto: Piloto
  posicion: number | null
  estado: string | null
}

interface Carrera {
  id: number
  nombre: string
  numero: number
  fecha_carrera: string
  hora_carrera: number
  circuito: { id: number; nombre: string } | null
  pole: Piloto | null
  vuelta_rapida: Piloto | null
}

export default function CarreraDetalle() {
  const { id } = useParams<{ id: string }>()
  const carreraId = Number(id)
  const [carrera, setCarrera] = useState<Carrera | null>(null)
  const [resultados, setResultados] = useState<Resultado[]>([])
  const [modalEditar, setModalEditar] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // 1) Traer datos de la carrera
        // const resCarrera = await fetch(
        //   `http://localhost:3000/api/carrera/${carreraId}`
        // )
        // if (!resCarrera.ok) throw new Error("Error cargando la carrera")
        // const { data: carreraServer } = await resCarrera.json()
        // setCarrera(carreraServer)

        // 2) Traer resultados de esa carrera
        const response = await fetch(
          `http://localhost:3000/api/resultado/${carreraId}`
        )
        if (!response.ok) throw new Error("Error cargando resultados")
        const { data: data } = await response.json()
        setCarrera(data.carrera)
        setResultados(data.resultados)
      } catch (err: any) {
        console.error(err)
        toast.error(`❌ ${err.message}`, { position: "top-right" })
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [carreraId])

  const handleEditCarrera = (c: Carrera) => {
    setCarrera(c)
    setModalEditar(false)
    
  }

  if (loading || !carrera) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="animate-spin w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full"></div>
      </section>
    )
  }

  return (
    <section className="py-10 bg-gradient-to-b from-black via-gray-950 to-black min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-6">
          <Link
            to="/admin/carreras"
            className="inline-block px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg shadow-lg hover:scale-105 transition"
          >
            ← Volver a Carreras
          </Link>
        </div>

        {/* Header de la Carrera */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl text-white font-bold">
            Carrera #{carrera.numero}: {carrera.nombre}
          </h1>
          <button
            onClick={() => setModalEditar(true)}
            className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-300 text-white rounded-lg shadow hover:scale-105 transition"
          >
            ✏️ Editar Carrera
          </button>
        </div>

        {/* Info de la Carrera */}
        <div className="bg-gray-900 p-6 rounded-lg mb-10 border border-red-700/40">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
            <p>Fecha: {new Date(carrera.fecha_carrera).toLocaleDateString()}</p>
            <p>Hora: {carrera.hora_carrera}:00</p>
            <p>Circuito: {carrera.circuito?.nombre || "—"}</p>
            <p>Pole: {carrera.pole ? `${carrera.pole.nombre} ${carrera.pole.apellido}` : "—"}</p>
            <p>Vuelta rápida: {carrera.vuelta_rapida ? `${carrera.vuelta_rapida.nombre} ${carrera.vuelta_rapida.apellido}` : "—"}</p>
          </div>
        </div>

        {/* Tabla de Resultados */}
        <div className="overflow-x-auto bg-gray-900 rounded-lg border border-red-700/40">
          <table className="min-w-full text-left text-gray-200">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2">Piloto</th>
                <th className="px-4 py-2">Posición</th>
                <th className="px-4 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="px-4 py-3">{r.piloto.nombre} {r.piloto.apellido}</td>
                  <td className="px-4 py-3">{r.posicion ?? "—"}</td>
                  <td className="px-4 py-3">{r.estado ?? "—"}</td>
                </tr>
              ))}
              {resultados.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-3 text-center text-gray-500">
                    No hay resultados cargados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Botón para abrir modal agregar */}
        <div className="flex justify-center mt-10">
            <div
                onClick={() => setModalAgregarResultado(true)}
                className="w-20 h-20 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-full shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
            >
                ➕
            </div>
        </div>
      </div>

      {/* Modal Editar Carrera */}
      {modalEditar && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-xl shadow-lg border border-red-600/40 max-w-lg w-full overflow-y-auto relative">
            <button
              onClick={() => setModalEditar(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>
            <FormularioEditarCarrera
              carrera={carrera}
              onEditarCarrera={handleEditCarrera}
              onCancelar={() => setModalEditar(false)}
            />
          </div>
        </div>
      )}
    </section>
  )
}
