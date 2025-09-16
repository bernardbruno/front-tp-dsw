import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function FormularioEditarEscuderia({
  escuderia,
  onEditarEscuderia,
  onCancelar,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (escuderia) {
      setValue("nombre", escuderia.nombre);
      setValue("pais_base", escuderia.pais_base);
      setValue("jefe_equipo", escuderia.jefe_equipo);
      setValue("motor", escuderia.motor);
      setValue("campeonatos_constructores", escuderia.campeonatos_constructores);
      setValue("debut", escuderia.debut);
      setValue("logo", escuderia.logo);
      setValue("auto_img", escuderia.auto_img);
    }
  }, [escuderia, setValue]);

  const onSubmit = async (data) => {
    try {
      const escuderiaActualizada = {
        ...escuderia,
        nombre: data.nombre,
        pais_base: data.pais_base,
        jefe_equipo: data.jefe_equipo,
        motor: data.motor,
        campeonatos_constructores: parseInt(data.campeonatos_constructores),
        debut: data.debut,
        logo: data.logo || "",
        auto_img: data.auto_img || "",
      };

      const response = await fetch(
        `http://localhost:3000/api/escuderia/${escuderia.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(escuderiaActualizada),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar escudería");
      }

      onEditarEscuderia(escuderiaActualizada);
      
      toast.success("¡Escudería actualizada exitosamente!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });

      onCancelar();
    } catch (error) {
      console.error("Error al editar escudería:", error);
      
      let errorMessage = 'Error desconocido';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      toast.error(`❌ ${errorMessage}`, {
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
        ✏️ Editar Escudería
      </h3>

      {/* Nombre */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          Nombre *
        </label>
        <input
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
            maxLength: { value: 100, message: "Máximo 100 caracteres" },
          })}
        />
        {errors.nombre && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.nombre.message}
          </span>
        )}
      </div>

      {/* País base */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          País base *
        </label>
        <input
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("pais_base", {
            required: "El país base es obligatorio",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
        />
        {errors.pais_base && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.pais_base.message}
          </span>
        )}
      </div>

      {/* Jefe de equipo */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          Jefe de equipo
        </label>
        <input
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("jefe_equipo", {
            maxLength: { value: 100, message: "Máximo 100 caracteres" },
          })}
        />
        {errors.jefe_equipo && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.jefe_equipo.message}
          </span>
        )}
      </div>

      {/* Motor */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          Motor *
        </label>
        <input
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("motor", {
            required: "El motor es obligatorio",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
        />
        {errors.motor && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.motor.message}
          </span>
        )}
      </div>

      {/* Campeonatos constructores */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          Campeonatos de constructores
        </label>
        <input
          type="number"
          min="0"
          max="50"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("campeonatos_constructores", {
            min: { value: 0, message: "No puede ser negativo" },
            max: { value: 50, message: "Máximo 50 campeonatos" },
          })}
        />
        {errors.campeonatos_constructores && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.campeonatos_constructores.message}
          </span>
        )}
      </div>

      {/* Debut */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          Debut
        </label>
        <input
          placeholder="ej: Carrera de Argentina de 1953"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("debut", {
            maxLength: { value: 200, message: "Máximo 200 caracteres" },
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          })}
        />
        {errors.debut && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.debut.message}
          </span>
        )}
      </div>

      {/* Logo URL */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          URL del logo
        </label>
        <input
          placeholder="https://ejemplo.com/logo.png"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("logo", {
            pattern: {
              value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
              message: "Debe ser una URL válida",
            },
          })}
        />
        {errors.logo && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.logo.message}
          </span>
        )}
      </div>

      {/* Auto imagen URL */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          URL imagen del auto
        </label>
        <input
          placeholder="https://ejemplo.com/auto.png"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("auto_img", {
            pattern: {
              value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
              message: "Debe ser una URL válida",
            },
          })}
        />
        {errors.auto_img && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.auto_img.message}
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