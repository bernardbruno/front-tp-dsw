import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { circuitoService } from '../../../services/circuito.service';
import type { CreateCircuito } from "../../../types/circuito.types";

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
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data: any) => {
    try {
      const nuevoCircuito: CreateCircuito = {
        nombre: data.nombre,
        ubicacion: data.ubicacion,
        pais: data.pais,
        vueltas: Number(data.vueltas),
        longitud_km: Number(data.longitud_km),
      };

      const result = await circuitoService.create(nuevoCircuito);
      onAgregarCircuito(result);

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
    <div className="relative overflow-y-auto">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 space-y-6 p-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-extrabold bg-gradient-to-r from-red-400 via-white to-red-600 bg-clip-text text-transparent animate-pulse drop-shadow-lg mb-2">
            Nuevo Circuito
          </h3>
          <p className="text-gray-400 text-sm">
            Completa los datos para agregar un nuevo circuito
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Nombre"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
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

          {/* Ubicación */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Ubicación"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* País */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="País"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
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

          {/* Vueltas */}
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Vueltas"
              min="1"
              max="100"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
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
        </div>

        <div className="space-y-2">
          {/* Longitud */}
          <input
            type="number"
            step="0.001"
            placeholder="Longitud (km)"
            className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
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

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 px-6 py-3 text-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl shadow-lg transition-transform hover:scale-105 border border-gray-600 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className={`flex-2 px-6 py-3 text-lg font-semibold rounded-xl shadow-lg transition-transform ${
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
              "Crear Circuito"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
