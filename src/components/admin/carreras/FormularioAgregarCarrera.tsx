import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

export default function FormularioAgregarCarrera({
  onAgregarCarrera,
  onCancelar,
}: {
  onAgregarCarrera: (c: any) => void;
  onCancelar: () => void;
}) {
  const [circuitos, setCircuitos] = useState<any[]>([]);
  const [pilotos, setPilotos] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    fetch("http://localhost:3000/api/circuito/")
      .then((res) => res.json())
      .then((response) => {
        setCircuitos(response.data || []);
      })
      .catch((err) => {
        console.error("Error cargando circuitos:", err);
        setCircuitos([]);
      });

    fetch("http://localhost:3000/api/piloto/")
      .then((res) => res.json())
      .then((response) => {
        setPilotos(response.data || []);
      })
      .catch((err) => {
        console.error("Error cargando pilotos:", err);
        setPilotos([]);
      });
  }, []);

  const pilotoOptions = pilotos.map((p) => ({
    value: p.id,
    label: `${p.nombre} ${p.apellido}`,
  }));

  const onSubmit = async (data: any) => {
    try {
      const nuevaCarrera = {
        nombre: data.nombre,
        numero: Number(data.numero),
        fecha_carrera: data.fecha_carrera,
        hora_carrera: Number(data.hora_carrera),
        circuito: Number(data.circuito),
        pilotos: (data.pilotos || []).map((id: string) => Number(id)),
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
        ➕ Agregar Carrera
      </h3>

      <div className="space-y-1">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
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

      <div className="space-y-1">
        <input
          type="number"
          placeholder="Número"
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("numero", {
            required: "El número es obligatorio",
            min: { value: 1, message: "Debe ser mayor a 0" },
          })}
        />
        {errors.numero && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.numero.message}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <input
          type="date"
          placeholder="Fecha de la carrera"
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
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

      <div className="space-y-1">
        <input
          type="number"
          min="0"
          max="23"
          placeholder="Hora (0-23)"
          className="w-full px-4 py-2 my-2 rounded-lg bg-black/60 text-white placeholder-gray-400 border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
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

      {/* Select de circuito */}
      <div className="space-y-1">
        <select
          {...register("circuito", { required: "El circuito es obligatorio" })}
          className="w-full px-4 py-2 rounded-lg bg-black/80 text-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-500/40 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 backdrop-blur-sm appearance-none"
        >
          <option value="">Selecciona un circuito</option>
          {circuitos.map((c) => (
            <option key={c.id} value={c.id} className="bg-gray-800">
              {c.nombre} ({c.pais})
            </option>
          ))}
        </select>
        {errors.circuito && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.circuito.message}
          </span>
        )}
      </div>

      {/* Select múltiple de pilotos */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium mb-1">
          Pilotos participantes
        </label>
        <Controller
          name="pilotos"
          control={control}
          rules={{
            required: "Selecciona al menos un piloto",
            validate: (value) =>
              value && value.length > 0
                ? true
                : "Selecciona al menos un piloto",
          }}
          render={({ field }) => (
            <Select
              {...field}
              options={pilotoOptions}
              isMulti
              classNamePrefix="react-select"
              placeholder="Selecciona pilotos..."
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#18181b",
                  borderColor: "#ef4444",
                  color: "#fff",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#18181b",
                  color: "#fff",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                    ? "#ef4444"
                    : "#18181b",
                  color: "#fff",
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#ef4444",
                  color: "#fff",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "#fff",
                }),
                input: (base) => ({
                  ...base,
                  color: "#fff",
                }),
              }}
            />
          )}
        />
        {errors.pilotos && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.pilotos.message}
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
