import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { pilotoService } from '../../../services/piloto.service';
import { resultadoService } from '../../../services/resultado.service';
import type { Piloto } from "../../../types/piloto.types"

interface Props {
  carreraId: number
  assignedIds: number[]
  onAgregar: () => void
  onCancelar: () => void
}

export default function FormularioAgregarResultado({
  carreraId,
  assignedIds = [],
  onAgregar,
  onCancelar,
}: Props) {
  const [pilotos, setPilotos] = useState<Piloto[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [buscador, setBuscador] = useState("")

  useEffect(() => {
    const fetchPilotos = async () => {
      try {
        setLoading(true)
        const lista = await pilotoService.getAll()
        setPilotos(lista.filter(p => !assignedIds.includes(p.id)))
      } catch (err) {
        console.error("Error cargando pilotos:", err)
        setPilotos([])
        toast.error("❌ Error al cargar pilotos", {
          position: "top-right",
          theme: "dark",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPilotos()
  }, [assignedIds])

  const filteredPilotos = pilotos.filter(p => 
    `${p.nombre} ${p.apellido}`.toLowerCase().includes(buscador.toLowerCase()) ||
    p.escuderia?.nombre?.toLowerCase().includes(buscador.toLowerCase())
  )

  const toggleSelect = (id: number) => {
    setSelected(sel =>
      sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]
    )
  }

  const handleSubmit = async () => {
    if (selected.length === 0) {
      return toast.warn("⚠️ Selecciona al menos un piloto", {
        position: "top-center",
        theme: "dark"
      })
    }
    
    setSubmitting(true)
    try {
      await resultadoService.addPilotos(carreraId, selected);
      onAgregar()
    } catch (err: any) {
      console.error(err)
      toast.error(`❌ ${err.message}`, { 
        position: "top-right",
        theme: "dark" 
      })
      setSubmitting(false)
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-8 space-y-6">
        {/* Título con gradiente */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-red-400 via-white to-red-600 bg-clip-text text-transparent animate-pulse drop-shadow-lg mb-2">
            Agregar Pilotos
          </h2>
          <p className="text-gray-400 text-sm">
            Selecciona los pilotos para agregar a esta carrera
          </p>
        </div>

        {/* Buscador */}
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar piloto o escudería..."
              value={buscador}
              onChange={(e) => setBuscador(e.target.value)}
              className="w-full px-5 py-3 pl-12 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              🔍
            </div>
          </div>
        </div> 

        {/* Lista de pilotos */}
        <div className="bg-gradient-to-br from-gray-900/50 to-black/30 rounded-xl border-2 border-red-800/30 max-h-80 overflow-y-auto shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
                <p className="text-gray-400">Cargando pilotos disponibles...</p>
              </div>
            </div>
          ) : filteredPilotos.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏎️</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {buscador ? "No se encontraron pilotos" : "No hay pilotos disponibles"}
                </h4>
                <p className="text-gray-400 text-sm">
                  {buscador ? "Intenta con otro término de búsqueda" 
                    : "Todos los pilotos ya están asignados a esta carrera"
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="p-2">
              {filteredPilotos.map((p, index) => (
                <label
                  key={p.id}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 cursor-pointer group hover:bg-gradient-to-r hover:from-red-900/20 hover:to-transparent ${
                    selected.includes(p.id) ? 'bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-600/30' : 'hover:bg-gray-800/30'
                  } ${index !== filteredPilotos.length - 1 ? 'border-b border-gray-700/30' : ''}`}
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selected.includes(p.id)}
                      onChange={() => toggleSelect(p.id)}
                      className="w-5 h-5 text-red-500 bg-gray-800 border-2 border-gray-600 rounded focus:ring-red-500 focus:ring-2 transition-all"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-red-500/30 transition-all">
                      {p.nombre.charAt(0)}{p.apellido.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium text-lg group-hover:text-red-300 transition-colors">
                        {p.nombre} {p.apellido}
                      </div>
                      {p.escuderia && (
                        <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                          {p.escuderia.nombre}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {selected.includes(p.id) && (
                    <div className="text-red-400 font-bold">
                      ✓
                    </div>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="bg-red-950/20 border border-red-800/30 rounded-lg p-4">
          <p className="text-gray-300 text-sm text-center">
            <span className="text-red-400">ℹ️</span> Los pilotos agregados aparecerán en la tabla de resultados donde podrás asignar posiciones y estados.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 pt-0 sm:pt-6">
          <button
            onClick={onCancelar}
            disabled={submitting}
            className="flex-1 px-6 py-3 text-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl shadow-lg transition-transform hover:scale-105 border border-gray-600 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || selected.length === 0}
            className={`flex-1 px-6 py-3 text-lg font-semibold rounded-xl shadow-lg transition-transform ${
              submitting || selected.length === 0
                ? "bg-gray-600 cursor-not-allowed opacity-70"
                : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-red-500/30 border border-red-400/50 hover:scale-105 cursor-pointer"
            }`}
          >
            {submitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Agregando pilotos...
              </div>
            ) : (
              "Agregar pilotos"
            )}
          </button>
        </div>

      </div>
    </div>
  )
}