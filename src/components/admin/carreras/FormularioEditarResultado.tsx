// src/components/admin/carreras/FormularioEditarResultado.tsx
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

  const handleSubmit = async () => {
    // Validación mínima
    if (posicion && (!/^\d+$/.test(posicion) || Number(posicion) < 0)) {
      return toast.error("La posición debe ser un número entero ≥ 0")
    }

    setSubmitting(true)
    try {
      // armar payload sólo con campos modificados
      const payload: Record<string, any> = {}
      if (posicion !== "") payload.posicion = Number(posicion)
      if (estado !== "") payload.estado = estado

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
      toast.error(`❌ ${err.message}`, { position: "top-right" })
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 text-gray-200">
      <h2 className="text-2xl font-bold">Editar Resultado</h2>

      <p className="text-gray-400">
        Piloto: {resultado.piloto.nombre} {resultado.piloto.apellido}
      </p>

      <div className="flex flex-col gap-1">
        <label className="text-sm">Posición</label>
        <input
          type="number"
          min={0}
          value={posicion}
          onChange={(e) => setPosicion(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200"
          placeholder="Dejar en blanco para no cambiar"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm">Estado</label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200"
        >
          <option value="">— Sin modificar —</option>
          <option value="DNF">DNF</option>
          <option value="DNS">DNS</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onCancel}
          disabled={submitting}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition disabled:opacity-50"
        >
          {submitting ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </div>
  )
}
