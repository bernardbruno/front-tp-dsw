import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Circuito } from "../../../types/circuito.types";
import type { Piloto } from "../../../types/piloto.types";
import { circuitoService } from '../../../services/circuito.service';
import { carreraService } from '../../../services/carrera.service';

export default function FormularioEditarCarrera({
  carrera,
  assignedPilotos,
  onEditarCarrera,
  onCancelar,
}: {
  carrera: any;
  assignedPilotos: Piloto[];
  onEditarCarrera: (c: any) => void;
  onCancelar: () => void;
}) {
  const [circuitos, setCircuitos] = useState<Circuito[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const fetchCircuitos = async () => {
      try {
        const lista = await circuitoService.getAll();
        setCircuitos(lista || []);
      } catch (err) {
        console.error("Error cargando circuitos:", err);
        setCircuitos([]);
      }
    };
    fetchCircuitos();
  }, []);

  useEffect(() => {
    if (carrera) {
      setValue("nombre", carrera.nombre);
      setValue("fecha_carrera", carrera.fecha_carrera.slice(0, 10));
      setValue("hora_carrera", String(carrera.hora_carrera));
      setValue("estado", String(carrera.estado));
      setValue(
        "vuelta_rapida",
        carrera.vuelta_rapida?.id ? String(carrera.vuelta_rapida.id) : ""
      );
      setValue("pole", carrera.pole?.id ? String(carrera.pole.id) : "");
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
        fecha_carrera: data.fecha_carrera,
        hora_carrera: Number(data.hora_carrera),
        estado: String(data.estado),
        vuelta_rapida: data.vuelta_rapida
          ? Number(data.vuelta_rapida)
          : undefined,
        pole: data.pole ? Number(data.pole) : undefined,
        circuito: Number(data.circuito),
      };

      const carreraServer = await carreraService.update(
        carrera.id,
        carreraActualizada
      );
      onEditarCarrera(carreraServer);

      toast.success("¡Carrera actualizada con éxito!", {
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

  const circuitosActual = [
    ...(circuitos.some((c) => c.id === carrera.circuito?.id) ||
    !carrera.circuito
      ? circuitos
      : [
          ...circuitos,
          {
            id: carrera.circuito.id,
            nombre: carrera.circuito.nombre,
            pais: carrera.circuito.pais,
          },
        ]),
  ];

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
        {/* Título con gradiente */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-extrabold bg-gradient-to-r from-red-400 via-white to-red-600 bg-clip-text text-transparent animate-pulse drop-shadow-lg mb-2">
            Editar Carrera
          </h3>
        </div>

        {/* Nombre */}
        <div className="space-y-1">
          <label className="pl-2 block text-gray-400 text-sm font-medium mb-1">
            Nombre
          </label>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fecha de carrera */}
          <div className="space-y-1">
            <label className="pl-2 block text-gray-400 text-sm font-medium mb-1">
              Fecha de la Carrera
            </label>
            <input
              type="date"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
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
            <label className="pl-2 block text-gray-400 text-sm font-medium mb-1">
              Hora de la Carrera
            </label>
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
        </div>

        {/* Estado */}
        <div className="space-y-1">
          <label className="pl-2 block text-gray-400 text-sm font-medium mb-1">
            Estado
          </label>
          <div className="relative">
            <select
              {...register("estado", {
                required: "El estado es obligatorio",
              })}
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 appearance-none"
            >
              <option value="">Selecciona un estado</option>
              <option value="en preparacion">En preparación</option>
              <option value="disponible">Disponible</option>
              <option value="completada">Completada</option>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Selector de Vuelta Rápida */}
          <div className="space-y-1">
            <label className="pl-2 block text-gray-400 text-sm font-medium mb-1">
              Vuelta Rápida
            </label>
            <div className="relative">
              <select
                {...register("vuelta_rapida")}
                className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 appearance-none"
              >
                <option value="">Selecciona la vuelta rapida</option>
                {assignedPilotos.map((p) => (
                  <option key={p.id} value={p.id} className="bg-gray-800">
                    {p.nombre} {p.apellido}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">▼</span>
              </div>
            </div>
          </div>

          {/* Selector de Pole */}
          <div className="space-y-1">
            <label className="pl-2 block text-gray-400 text-sm font-medium mb-1">
              Pole
            </label>
            <div className="relative">
              <select
                {...register("pole")}
                className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 appearance-none"
              >
                <option value="">Selecciona la Pole</option>
                {assignedPilotos.map((p) => (
                  <option key={p.id} value={p.id} className="bg-gray-800">
                    {p.nombre} {p.apellido}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">▼</span>
              </div>
            </div>
          </div>
        </div>

        {/* Circuito */}
        <div className="space-y-1">
          <label className="pl-2 block text-gray-400 text-sm font-medium mb-1">
            Circuito
          </label>
          <div className="relative">
            <select
              {...register("circuito", {
                required: "El circuito es obligatorio",
              })}
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 appearance-none"
            >
              <option value="" className="bg-gray-800">
                Selecciona un circuito
              </option>
              {circuitosActual.map((c) => (
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
        </div>

        {/* Información adicional */}
        <div className="bg-red-950/20 border border-red-800/30 rounded-lg p-4 max-w-sm mx-auto">
          <p className="text-gray-300 text-sm text-center">
            <span className="text-red-400">ℹ️</span> Los pilotos se editan desde
            la gestión de resultados.
          </p>
        </div>

        <div className="flex justify-center gap-3 mt-6 max-w-md mx-auto">
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
