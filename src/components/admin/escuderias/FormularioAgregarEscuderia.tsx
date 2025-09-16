import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function FormularioAgregarEscuderia({
  onAgregarEscuderia,
  onCancelar,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const nuevaEscuderia = {
        nombre: data.nombre,
        pais_base: data.pais_base,
        jefe_equipo: data.jefe_equipo,
        motor: data.motor,
        campeonatos_constructores: parseInt(data.campeonatos_constructores) || 0,
        debut: data.debut,
        logo: data.logo || "", // Por ahora string, después será imagen
        auto_img: data.auto_img || "", // Por ahora string, después será imagen
      };

      const response = await fetch("http://localhost:3000/api/escuderia/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaEscuderia),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear escudería");
      }

      const data_response = await response.json();
      onAgregarEscuderia(data_response.data);
      
      toast.success("¡Escudería creada exitosamente!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });

      reset();
    } catch (error) {
      console.error("Error al agregar escudería:", error);
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
      className="mt-3 space-y-4 p-6 rounded-xl mx-auto"
      autoComplete="off"
    >
      <h3 className="text-xl font-semibold text-center mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
        ➕ Agregar Escudería
      </h3>

      {/* Nombre */}
      <div className="space-y-1">
        <input
          placeholder="Nombre de la escudería *"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
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
        <input
          placeholder="País base *"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
          {...register("pais_base", {
            required: "El país base es obligatorio",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
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
        <input
          placeholder="Jefe de equipo"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
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
        <input
          placeholder="Motor *"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
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
        <input
          type="number"
          min="0"
          max="50"
          placeholder="Campeonatos de constructores (número) "
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
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
        <input
          placeholder="Debut (ej: Carrera de Argentina de 1953)"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
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
        <input
          placeholder="URL del logo (temporal)"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
          {...register("logo", {
            pattern: {
              value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
              message: "Debe ser una URL válida",
            },
          })}
        />
        {errors.logo && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.logo.message}
          </span>
        )}
      </div>

      {/* Auto imagen URL */}
      <div className="space-y-1">
        <input
          placeholder="URL imagen del auto (temporal)"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
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

      <p className="text-gray-400 text-xs text-center">
        Los campos marcados con * son obligatorios
      </p>

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
              Creando...
            </div>
          ) : (
            "Agregar"
          )}
        </button>
      </div>
    </form>
  );
}