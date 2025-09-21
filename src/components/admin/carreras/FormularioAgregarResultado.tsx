// src/components/admin/carreras/FormularioAgregarResultado.tsx
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

interface Piloto {
  id: number
  nombre: string
  apellido: string
}

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

  //Request
  useEffect(() => {
    fetch("http://localhost:3000/api/piloto/")      //se puede usar piloto/activo
      .then(res => res.json())
      .then(({ data }) => {
        const lista: Piloto[] = data || []
        setPilotos(lista.filter(p => !assignedIds.includes(p.id)))
      })
      .catch(err => {
        console.error("Error cargando pilotos:", err)
        toast.error("❌ No se pudieron cargar pilotos")
      })
  }, [assignedIds])

  //checkbox
  const toggleSelect = (id: number) => {
    setSelected(sel =>
      sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]
    )
  }

  const handleSubmit = async () => {
    if (selected.length === 0) {
      return toast.warn("Selecciona al menos un piloto")
    }
    setSubmitting(true)
    try {
      const res = await fetch(
        `http://localhost:3000/api/resultado/${carreraId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pilotos: selected.map(id => ({ id })) }),
        }
      )
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Error al agregar resultados")
      }
      onAgregar()
    } catch (err: any) {
      console.error(err)
      toast.error(`❌ ${err.message}`, { position: "top-right" })
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl text-white font-bold mb-4">
        Agregar Resultados
      </h2>

      {/* Lista de pilotos con checkbox */}
      <div className="max-h-64 overflow-y-auto bg-gray-800 p-4 rounded">
        {pilotos.map(p => (
          <label
            key={p.id}
            className="flex items-center gap-2 text-gray-200 hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.includes(p.id)}
              onChange={() => toggleSelect(p.id)}
              className="w-4 h-4"
            />
            {p.nombre} {p.apellido}
          </label>
        ))}
      </div>

      {/* Botones Cancelar / Agregar */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onCancelar}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition"
          disabled={submitting}
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "Guardando…" : "Agregar"}
        </button>
      </div>
    </div>
  )
}
