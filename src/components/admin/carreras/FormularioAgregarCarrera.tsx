import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function FormularioAgregarCarrera({
  onAgregarCarrera,
  onCancelar,
}: {
  onAgregarCarrera: (c: any) => void;
  onCancelar: () => void;
}) {
  const [circuitos, setCircuitos] = useState<any[]>([]);
  const [loadingCircuitos, setLoadingCircuitos] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const fetchCircuitos = async () => {
      try {
        setLoadingCircuitos(true);
        const res = await fetch("http://localhost:3000/api/circuito/");
        const response = await res.json();
        setCircuitos(response.data || []);
      } catch (err) {
        console.error("Error cargando circuitos:", err);
        setCircuitos([]);
        toast.error("Error al cargar circuitos", {
          position: "top-right",
          theme: "dark",
        });
      } finally {
        setLoadingCircuitos(false);
      }
    };

    fetchCircuitos();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const nuevaCarrera = {
        nombre: data.nombre,
        fecha_carrera: data.fecha_carrera,
        hora_carrera: Number(data.hora_carrera),
        circuito: Number(data.circuito),
        estado: data.estado || "en preparacion",
        vuelta_rapida: null,
        pole: null,
        pilotos: [],
      };

      const response = await fetch("http://localhost:3000/api/carrera/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCarrera),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      onAgregarCarrera(result.data);

      toast.success("¡Carrera agregada exitosamente!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      reset();
      onCancelar();
    } catch (error: any) {
      console.error("Error al agregar la carrera:", error);
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
      {/* Efectos de fondo similares al login */}
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
        {/* Título con gradiente */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-extrabold bg-gradient-to-r from-red-400 via-white to-red-600 bg-clip-text text-transparent animate-pulse drop-shadow-lg mb-2">
            Nueva Carrera
          </h3>
          <p className="text-gray-400 text-sm">
            Completa los datos para crear una nueva carrera
          </p>
        </div>

        {/* Nombre de la carrera */}
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Nombre de la carrera"
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

        {/* Fecha de la carrera */}
        <div className="space-y-2">
          <input
            type="date"
            className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
            {...register("fecha_carrera", {
              required: "La fecha es obligatoria",
              validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return (
                  selectedDate >= today ||
                  "La fecha no puede ser anterior a hoy"
                );
              },
            })}
          />
          {errors.fecha_carrera && (
            <span className="text-red-400 text-sm flex items-center gap-1">
              ⚠️ {errors.fecha_carrera.message}
            </span>
          )}
        </div>

        {/* Hora */}
        <div className="space-y-2">
          <input
            type="number"
            min="0"
            max="23"
            placeholder="Hora (0-23)"
            className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
            {...register("hora_carrera", {
              required: "La hora es obligatoria",
              min: { value: 0, message: "Debe ser entre 0 y 23" },
              max: { value: 23, message: "Debe ser entre 0 y 23" },
            })}
          />
          {errors.hora_carrera && (
            <span className="text-red-400 text-sm flex items-center gap-1">
              ⚠️ {errors.hora_carrera.message}
            </span>
          )}
        </div>

        {/* Selector de circuito */}
        <div className="space-y-2">
          <div className="relative">
            <select
              {...register("circuito", {
                required: "El circuito es obligatorio",
              })}
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 appearance-none"
            >
              <option value="" className="bg-gray-800">
                {loadingCircuitos
                  ? "Cargando circuitos..."
                  : "Selecciona un circuito"}
              </option>
              {circuitos.map((c) => (
                <option key={c.id} value={c.id} className="bg-gray-800">
                  {c.nombre} - {c.pais}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">▼</span>
            </div>
          </div>
          {errors.circuito && (
            <span className="text-red-400 text-sm flex items-center gap-1">
              ⚠️ {errors.circuito.message}
            </span>
          )}
          {loadingCircuitos && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="w-4 h-4 border-2 border-gray-400/20 border-t-gray-400 rounded-full animate-spin"></div>
              Cargando circuitos disponibles...
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="bg-red-950/20 border border-red-800/30 rounded-lg p-4 max-w-sm mx-auto">
          <p className="text-gray-300 text-sm text-center">
            <span className="text-red-400">ℹ️</span> Los pilotos se asignarán después
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 px-6 py-3 text-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl shadow-lg transition-transform hover:scale-105 border border-gray-600 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting || loadingCircuitos}
            className={`flex-1 px-6 py-3 text-lg font-semibold rounded-xl shadow-lg transition-transform ${
              isSubmitting || loadingCircuitos
                ? "bg-gray-600 cursor-not-allowed opacity-70"
                : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-red-500/30 border border-red-400/50 hover:scale-105 cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Creando carrera...
              </div>
            ) : (
              "Crear Carrera"
            )}
          </button>
        </div>

        {/* Decoraciones en las esquinas igual que el login */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-red-500/20 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-red-500/20 to-transparent pointer-events-none"></div>
      </form>
    </div>
  );
}
