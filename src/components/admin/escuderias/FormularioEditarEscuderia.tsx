import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { escuderiaService } from '../../../services/escuderia.service';

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
      setValue(
        "campeonatos_constructores",
        escuderia.campeonatos_constructores
      );
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

      await escuderiaService.update(escuderia.id, escuderiaActualizada);
      const escuderiaCompleta = {
        ...escuderia,
        ...escuderiaActualizada,
      };
    
      onEditarEscuderia(escuderiaCompleta);

      toast.success("¡Escudería actualizada exitosamente!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });

      onCancelar();
    } catch (error: any) {
      console.error("Error al editar escudería:", error);

      let errorMessage = "Error desconocido";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
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
    <div className="relative">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-3xl"></div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 space-y-6 p-8"
        autoComplete="off"
      >
        <div className="text-center mb-8">
          <h3 className="text-3xl font-extrabold bg-gradient-to-r from-red-400 via-white to-red-600 bg-clip-text text-transparent animate-pulse drop-shadow-lg mb-2">
            Editar Escudería
          </h3>
          <p className="text-gray-400 text-sm">
            Modifica los datos de la escudería seleccionada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Nombre de la escudería"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                maxLength: { value: 100, message: "Máximo 100 caracteres" },
              })}
            />
            {errors.nombre && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.nombre.message}
              </span>
            )}
          </div>

          {/* País base */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="País base"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("pais_base", {
                required: "El país base es obligatorio",
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
              })}
            />
            {errors.pais_base && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.pais_base.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Jefe de equipo */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Jefe de equipo"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("jefe_equipo", {
                maxLength: { value: 100, message: "Máximo 100 caracteres" },
              })}
            />
            {errors.jefe_equipo && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.jefe_equipo.message}
              </span>
            )}
          </div>

          {/* Motor */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Motor"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("motor", {
                required: "El motor es obligatorio",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
            />
            {errors.motor && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.motor.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campeonatos constructores */}
          <div className="space-y-2">
            <input
              type="number"
              min="0"
              max="50"
              placeholder="Campeonatos de constructores"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("campeonatos_constructores", {
                min: { value: 0, message: "No puede ser negativo" },
                max: { value: 50, message: "Máximo 50 campeonatos" },
              })}
            />
            {errors.campeonatos_constructores && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.campeonatos_constructores.message}
              </span>
            )}
          </div>

          {/* Debut */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Debut (ej: Carrera de Argentina de 1953)"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("debut", {
                maxLength: { value: 200, message: "Máximo 200 caracteres" },
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
              })}
            />
            {errors.debut && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.debut.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo URL */}
          <div className="space-y-2">
            <input
              type="url"
              placeholder="URL del logo"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("logo", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
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
          <div className="space-y-2">
            <input
              type="url"
              placeholder="URL imagen del auto"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("auto_img", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                  message: "Debe ser una URL válida",
                },
              })}
            />
            {errors.auto_img && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.auto_img.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-6 mx-auto max-w-md">
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-md transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-2 px-4 py-2 rounded-lg font-semibold shadow-lg transition-all ${
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
              "Guardar cambios"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
