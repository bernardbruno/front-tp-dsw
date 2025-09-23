import { useState } from "react"
import { toast } from "react-toastify"

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

interface Props {
  carreraId: number
  resultado: Resultado
  onSave: () => void
  onCancel: () => void
}

export default function FormularioEditarResultado({
  carreraId,
  resultado,
  onSave,
  onCancel,
}: Props) {
  const [posicion, setPosicion] = useState<string>(
    resultado.posicion != null ? String(resultado.posicion) : ""
  )
  const [estado, setEstado] = useState<string>(resultado.estado || "")
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [errors, setErrors] = useState<{posicion?: string}>({})

  const validateForm = () => {
    const newErrors: {posicion?: string} = {}
    
    if (posicion && (!/^\d+$/.test(posicion) || Number(posicion) < 1 || Number(posicion) > 30)) {
      newErrors.posicion = "La posición debe ser un número entre 1 y 30"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setSubmitting(true)
    try {
      // Armar payload solo con campos modificados
      const payload: Record<string, any> = {}
      
      if (posicion !== "") {
        payload.posicion = Number(posicion)
      } else {
        payload.posicion = null
      }
      
      if (estado !== "") {
        payload.estado = estado
      }

      const res = await fetch(
        `http://localhost:3000/api/resultado/${carreraId}/${resultado.piloto.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
      
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Error al actualizar resultado")
      }

      onSave()
    } catch (err: any) {
      console.error("Error al editar resultado:", err)
      toast.error(`❌ ${err.message}`, { 
        position: "top-right",
        theme: "dark" 
      })
      setSubmitting(false)
    }
  }

  const clearPosition = () => {
    setPosicion("")
    setErrors(prev => ({...prev, posicion: undefined}))
  }

  const clearEstado = () => {
    setEstado("")
  }

  const hasChanges = posicion !== (resultado.posicion?.toString() || "") || estado !== (resultado.estado || "")

  return (
    <div className="relative">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-8 space-y-6">
        {/* Título */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-red-400 via-white to-red-600 bg-clip-text text-transparent animate-pulse drop-shadow-lg mb-2">
            Editar Resultado
          </h2>
          <p className="text-gray-400 text-sm">
            Modifica la posición y estado del piloto en la carrera
          </p>
        </div>

        {/* Info del piloto */}
        <div className="bg-gradient-to-r from-red-950/30 to-red-900/20 border border-red-800/40 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              {resultado.piloto.nombre.charAt(0)}{resultado.piloto.apellido.charAt(0)}
            </div>
            <h3 className="text-xl font-bold text-white">
              {resultado.piloto.nombre} {resultado.piloto.apellido}
            </h3>
          </div>
        </div>

        {/* Posición */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            🏁 Posición Final
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="20"
              value={posicion}
              onChange={(e) => {
                setPosicion(e.target.value)
                if (errors.posicion) {
                  setErrors(prev => ({...prev, posicion: undefined}))
                }
              }}
              placeholder="Ejemplo: 1, 2, 3..."
              className="w-full px-5 py-3 pr-12 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
            />
          </div>
          {errors.posicion && (
            <span className="text-red-400 text-sm flex items-center gap-1">
              ⚠️ {errors.posicion}
            </span>
          )}
        </div>

        {/* Estado */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            📊 Estado del Piloto
          </label>
          <div className="relative">
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full px-5 py-3 pr-12 rounded-lg bg-black/80 text-white text-lg focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 appearance-none"
            >
              <option value="" className="bg-gray-800">
                — Seleccionar estado —
              </option>
              <option value="Finalizado" className="bg-gray-800">
                ✅ Finalizado
              </option>
              <option value="DNF" className="bg-gray-800">
                ❌ DNF (No Finalizó)
              </option>
              <option value="DNS" className="bg-gray-800">
                ⚠️ DNS (No Largó)
              </option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">▼</span>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="px-6 py-3 text-md bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl shadow-lg transition-transform hover:scale-105 border border-gray-600 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || !hasChanges}
            className={` px-6 py-3 text-md font-semibold rounded-xl shadow-lg transition-transform ${
              submitting || !hasChanges
                ? "bg-gray-600 cursor-not-allowed opacity-70"
                : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-black shadow-green-500/30 border border-green-400/50 hover:scale-105 cursor-pointer"
            }`}
          >
            {submitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                Guardando cambios...
              </div>
            ) : !hasChanges ? (
              "Sin cambios"
            ) : (
              "💾 Guardar cambios"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}