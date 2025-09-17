import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function FormularioAgregarCircuito({
  onAgregarCircuito,
  onCancelar,
}: {
  onAgregarCircuito: (c: any) => void;
  onCancelar: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data: any) => {
    try {
      const nuevoCircuito = {
        nombre: data.nombre,
        ubicacion: data.ubicacion,
        pais: data.pais,
        vueltas: Number(data.vueltas),
        longitud_km: Number(data.longitud_km),
      };

      const response = await fetch("http://localhost:3000/api/circuito/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoCircuito),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      onAgregarCircuito(result.data);

      toast.success("¡Circuito agregado exitosamente!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      reset();
      onCancelar();
    } catch (error: any) {
      console.error("Error al agregar el circuito:", error);
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
      className="mt-3 space-y-3 p-6 rounded-xl"
      autoComplete="off"
    >
      <h3 className="text-xl font-semibold text-center mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
        ➕ Agregar Circuito
      </h3>

      <div className="space-y-1">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
            maxLength: { value: 100, message: "Máximo 100 caracteres" },
          })}
        />
        {errors.nombre && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.nombre.message}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <input
          type="text"
          placeholder="Ubicación"
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("ubicacion", {
            required: "La ubicación es obligatoria",
            minLength: { value: 4, message: "Mínimo 4 caracteres" },
          })}
        />
        {errors.ubicacion && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.ubicacion.message}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <input
          type="text"
          placeholder="País"
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("pais", {
            required: "El país es obligatorio",
            minLength: { value: 4, message: "Mínimo 4 caracteres" },
          })}
        />
        {errors.pais && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.pais.message}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <input
          type="number"
          placeholder="Vueltas"
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("vueltas", {
            required: "Las vueltas son obligatorias",
            min: { value: 1, message: "Debe ser mayor a 0" },
            max: { value: 100, message: "Máximo 100 vueltas" },
          })}
        />
        {errors.vueltas && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.vueltas.message}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <input
          type="number"
          step="0.001"
          placeholder="Longitud (km)"
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("longitud_km", {
            required: "La longitud es obligatoria",
            min: { value: 0.1, message: "Debe ser mayor a 0" },
            max: { value: 20, message: "Máximo 20 km" },
          })}
        />
        {errors.longitud_km && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.longitud_km.message}
          </span>
        )}
      </div>

      <div className="flex mt-4 justify-center gap-4">
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-md transition-all cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 border border-red-400/50 transition-all hover:scale-105 cursor-pointer"
        >
          Agregar
        </button>
      </div>
    </form>
  );
}
