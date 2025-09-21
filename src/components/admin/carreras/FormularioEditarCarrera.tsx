import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Piloto {
  id: number
  nombre: string
  apellido: string
}

export default function FormularioEditarCarrera({
  carrera,
  assignedPilotos,
  onEditarCarrera,
  onCancelar,
}: {
  carrera: any;
  assignedPilotos: Piloto[]
  onEditarCarrera: (c: any) => void;
  onCancelar: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (carrera) {
      setValue("nombre", carrera.nombre);
      setValue("numero", String(carrera.numero));
      setValue("fecha_carrera", carrera.fecha_carrera.slice(0, 10)); // yyyy-mm-dd
      setValue("hora_carrera", String(carrera.hora_carrera));
      setValue("estado", String(carrera.estado));
      setValue(
        "vuelta_rapida",
        carrera.vuelta_rapida?.id ? String(carrera.vuelta_rapida.id) : ""
      );
      setValue(
        "pole",
        carrera.pole?.id ? String(carrera.pole.id) : ""
      );
      setValue(
        "circuito",
        carrera.circuito?.id ? String(carrera.circuito.id) : ""
      );
    }
  }, [carrera, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const carreraActualizada = {
        ...carrera,
        nombre: data.nombre,
        numero: Number(data.numero),
        fecha_carrera: data.fecha_carrera,
        hora_carrera: Number(data.hora_carrera),
        estado: String(data.estado),
        vuelta_rapida: data.vuelta_rapida
          ? Number(data.vuelta_rapida)
          : undefined,
        pole: data.pole ? Number(data.pole) : undefined,
        circuito: Number(data.circuito),
      };

      const response = await fetch(
        `http://localhost:3000/api/carrera/${carrera.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(carreraActualizada),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Error al actualizar carrera");
      }
      
      const {data: carreraServer} = await response.json()
      onEditarCarrera(carreraServer);

      toast.success("¡Carrera actualizada exitosamente!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      onCancelar();
    } catch (error: any) {
      console.error("Error al editar carrera:", error);
      toast.error(`❌ ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-3 space-y-4 p-6 rounded-xl"
      autoComplete="off"
    >
      <h3 className="text-lg font-semibold text-center mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
        ✏️ Editar Carrera
      </h3>

      {/* Nombre */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">Nombre *</label>
        <input
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
        />
        {errors.nombre && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.nombre.message}
          </span>
        )}
      </div>

      {/* Número */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">Número *</label>
        <input
          type="number"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("numero", {
            required: "El número es obligatorio",
            min: { value: 1, message: "Debe ser ≥ 1" },
          })}
        />
        {errors.numero && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.numero.message}
          </span>
        )}
      </div>

      {/* Fecha de carrera */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          Fecha de carrera *
        </label>
        <input
          type="date"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("fecha_carrera", {
            required: "La fecha es obligatoria",
          })}
        />
        {errors.fecha_carrera && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.fecha_carrera.message}
          </span>
        )}
      </div>

      {/* Hora de carrera */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">Hora *</label>
        <input
          type="number"
          min="0"
          max="23"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("hora_carrera", {
            required: "La hora es obligatoria",
            min: { value: 0, message: "Min 0" },
            max: { value: 23, message: "Max 23" },
          })}
        />
        {errors.hora_carrera && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.hora_carrera.message}
          </span>
        )}
      </div>

      {/* Estado */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          Estado *
        </label>
        <select
          {...register("estado", {
            required: "El estado es obligatorio",
          })}
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition">
          <option value="">Selecciona un estado</option>
          <option value="en preparacion">En preparación</option>
          <option value="disponible">Disponible</option>
          <option value="completada">Completada</option>
        </select>
        {errors.estado && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.estado.message}
          </span>
        )}
      </div>


      {/* — Selector de Vuelta Rápida — */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          Vuelta Rápida
        </label>
        <select
          {...register("vuelta_rapida")}
          className="w-full px-4 py-2 rounded-lg bg-black/80 text-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-500/40 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 backdrop-blur-sm appearance-none"
        >
          <option value="">Sin Vuelta</option>
          {assignedPilotos.map((p) => (
            <option key={p.id} value={p.id} className="bg-gray-800">
              {p.nombre} {p.apellido}
            </option>
          ))}
        </select>
      </div>

      {/* — Selector de Pole — */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          Pole
        </label>
        <select
          {...register("pole")}
          className="w-full px-4 py-2 rounded-lg bg-black/80 text-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-500/40 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 backdrop-blur-sm appearance-none"
        >
          <option value="">Sin Pole</option>
          {assignedPilotos.map((p) => (
            <option key={p.id} value={p.id} className="bg-gray-800">
              {p.nombre} {p.apellido}
            </option>
          ))}
        </select>
      </div>

      {/* Circuito */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">ID Circuito *</label>
        <input
          type="number"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("circuito", {
            required: "El circuito es obligatorio",
            min: { value: 1, message: "ID inválido" },
          })}
        />
        {errors.circuito && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.circuito.message}
          </span>
        )}
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-md transition-all cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-lg font-semibold shadow-lg transition-all ${
            isSubmitting
              ? "bg-gray-600 cursor-not-allowed opacity-70"
              : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-red-500/30 border border-red-400/50 hover:scale-105 cursor-pointer"
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              Guardando...
            </div>
          ) : (
            "Guardar"
          )}
        </button>
      </div>
    </form>
  );
}
