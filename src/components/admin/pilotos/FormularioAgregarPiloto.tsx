import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { pilotoService } from '../../../services/piloto.service';
import { escuderiaService } from '../../../services/escuderia.service';
import type { CreatePiloto } from "../../../types/piloto.types";

export default function FormularioAgregarPiloto({
  onAgregarPiloto,
  onCancelar,
}: {
  onAgregarPiloto: (p: any) => void;
  onCancelar: () => void;
}) {
  const [escuderias, setEscuderias] = useState<any[]>([]);
  const [loadingEscuderias, setLoadingEscuderias] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const fetchEscuderias = async () => {
      try {
        setLoadingEscuderias(true);
        const data = await escuderiaService.getAll();
        setEscuderias(data);
      } catch (err) {
        console.error("Error cargando escuderías:", err);
        setEscuderias([]);
        toast.error("Error al cargar escuderías", {
          position: "top-right",
          theme: "dark",
        });
      } finally {
        setLoadingEscuderias(false);
      }
    };

    fetchEscuderias();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const nuevoPiloto: CreatePiloto = {
        nombre: data.nombre,
        apellido: data.apellido,
        nacionalidad: data.nacionalidad,
        numero: Number(data.numero),
        fecha_nacimiento: data.fecha_nacimiento,
        estado: data.estado,
        debut: data.debut,
        titulos: Number(data.titulos),
        piloto_img: data.piloto_img || "",
        escuderia: data.escuderia ? Number(data.escuderia) : null,
      };

      const result = await pilotoService.create(nuevoPiloto);
      onAgregarPiloto(result);

      toast.success("¡Piloto agregado exitosamente!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      reset();
      onCancelar();
    } catch (error: any) {
      console.error("Error al agregar piloto:", error);
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
        {/* Título con gradiente */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-extrabold bg-gradient-to-r from-red-400 via-white to-red-600 bg-clip-text text-transparent animate-pulse drop-shadow-lg mb-2">
            Nuevo Piloto
          </h3>
          <p className="text-gray-400 text-sm">
            Completa los datos para agregar un nuevo piloto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Nombre del piloto"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
              })}
            />
            {errors.nombre && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.nombre.message}
              </span>
            )}
          </div>

          {/* Apellido */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Apellido del piloto"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("apellido", {
                required: "El apellido es obligatorio",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
              })}
            />
            {errors.apellido && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.apellido.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nacionalidad */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Nacionalidad"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("nacionalidad", {
                required: "La nacionalidad es obligatoria",
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
              })}
            />
            {errors.nacionalidad && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.nacionalidad.message}
              </span>
            )}
          </div>

          {/* Número */}
          <div className="space-y-2">
            <input
              type="number"
              min="1"
              max="99"
              placeholder="Número (1-99)"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("numero", {
                required: "El número es obligatorio",
                min: { value: 1, message: "Debe ser mayor a 0" },
                max: { value: 99, message: "Máximo 99" },
              })}
            />
            {errors.numero && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.numero.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fecha de nacimiento */}
          <div className="space-y-2">
            <input
              type="date"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("fecha_nacimiento", {
                required: "La fecha de nacimiento es obligatoria",
                validate: (value) => {
                  const birthDate = new Date(value);
                  const today = new Date();
                  const age = today.getFullYear() - birthDate.getFullYear();
                  return age >= 16 || "Edad debe ser mayor a 16 años";
                },
              })}
            />
            {errors.fecha_nacimiento && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.fecha_nacimiento.message}
              </span>
            )}
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <div className="relative">
              <select
                {...register("estado", {
                  required: "El estado es obligatorio",
                })}
                className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 appearance-none"
              >
                <option value="" className="bg-gray-800">
                  Selecciona un estado
                </option>
                <option value="Activo" className="bg-gray-800">
                  🟢 Activo
                </option>
                <option value="Inactivo" className="bg-gray-800">
                  🟡 Inactivo
                </option>
                <option value="Retirado" className="bg-gray-800">
                  🔴 Retirado
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">▼</span>
              </div>
            </div>
            {errors.estado && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.estado.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Debut */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Debut (ej: GP Brasil 2020)"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("debut", {
                maxLength: { value: 100, message: "Máximo 100 caracteres" },
              })}
            />
            {errors.debut && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.debut.message}
              </span>
            )}
          </div>

          {/* Títulos */}
          <div className="space-y-2">
            <input
              type="number"
              min="0"
              max="20"
              placeholder="Títulos (0-20)"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("titulos", {
                required: "Los títulos son obligatorios",
                min: { value: 0, message: "No puede ser negativo" },
                max: { value: 20, message: "Máximo 20 títulos" },
              })}
            />
            {errors.titulos && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.titulos.message}
              </span>
            )}
          </div>
        </div>

        {/* URL imagen del piloto */}
        <div className="space-y-2">
          <input
            type="url"
            placeholder="URL imagen del piloto"
            className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
            {...register("piloto_img", {
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                message: "Debe ser una URL válida",
              },
            })}
          />
          {errors.piloto_img && (
            <span className="text-red-400 text-sm flex items-center gap-1">
              ⚠️ {errors.piloto_img.message}
            </span>
          )}
        </div>

        {/* Selector de escudería */}
        <div className="space-y-2">
          <div className="relative">
            <select
              {...register("escuderia")}
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 appearance-none"
            >
              <option value="" className="bg-gray-800">
                {loadingEscuderias
                  ? "Cargando escuderías..."
                  : "Selecciona una escudería (opcional)"}
              </option>
              {escuderias.map((e) => (
                <option key={e.id} value={e.id} className="bg-gray-800">
                  {e.nombre}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">▼</span>
            </div>
          </div>
          {loadingEscuderias && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="w-4 h-4 border-2 border-gray-400/20 border-t-gray-400 rounded-full animate-spin"></div>
              Cargando escuderías disponibles...
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 px-6 py-3 text-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl shadow-lg transition-transform hover:scale-105 border border-gray-600 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || loadingEscuderias}
            className={`flex-2 px-6 py-3 text-lg font-semibold rounded-xl shadow-lg transition-transform ${
              isSubmitting || loadingEscuderias
                ? "bg-gray-600 cursor-not-allowed opacity-70"
                : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-red-500/30 border border-red-400/50 hover:scale-105 cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Creando piloto...
              </div>
            ) : (
              "Crear Piloto"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
