import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function FormularioAgregarPiloto({
  onAgregarPiloto,
  onCancelar,
}: {
  onAgregarPiloto: (p: any) => void;
  onCancelar: () => void;
}) {
  const [escuderias, setEscuderias] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    fetch("http://localhost:3000/api/escuderia/")
      .then((res) => res.json())
      .then((response) => {
        setEscuderias(response.data || []);
      })
      .catch((err) => {
        console.error("Error cargando escuderías:", err);
        setEscuderias([]);
      });
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const nuevoPiloto = {
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
      const response = await fetch("http://localhost:3000/api/piloto/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoPiloto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      onAgregarPiloto(result.data);

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-3 space-y-3 p-6 rounded-xl"
      autoComplete="off"
    >
      <h3 className="text-xl font-semibold text-center mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
        ➕ Agregar Piloto
      </h3>

      {/* Nombre */}
      <div className="space-y-1">
        <input
          placeholder="Nombre"
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

      {/* Apellido */}
      <div className="space-y-1">
        <input
          placeholder="Apellido"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
          {...register("apellido", {
            required: "El apellido es obligatorio",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
            maxLength: { value: 100, message: "Máximo 100 caracteres" },
          })}
        />
        {errors.apellido && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.apellido.message}
          </span>
        )}
      </div>

      {/* Nacionalidad */}
      <div className="space-y-1">
        <input
          placeholder="Nacionalidad"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
          {...register("nacionalidad", {
            required: "La nacionalidad es obligatoria",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          })}
        />
        {errors.nacionalidad && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.nacionalidad.message}
          </span>
        )}
      </div>

      {/* Número */}
      <div className="space-y-1">
        <input
          type="number"
          placeholder="Número"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
          {...register("numero", {
            required: "El número es obligatorio",
            min: { value: 1, message: "Debe ser mayor a 0" },
            max: { value: 99, message: "Máximo 2 dígitos" },
          })}
        />
        {errors.numero && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.numero.message}
          </span>
        )}
      </div>

      {/* Fecha de nacimiento */}
      <div className="space-y-1">
        <input
          type="date"
          placeholder="Fecha de nacimiento"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
          {...register("fecha_nacimiento", {
            required: "La fecha de nacimiento es obligatoria",
          })}
        />
        {errors.fecha_nacimiento && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.fecha_nacimiento.message}
          </span>
        )}
      </div>

      {/* Estado */}
      <div className="space-y-1">
        <input
          placeholder="Estado (Activo/Inactivo/Retirado)"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
          {...register("estado", {
            required: "El estado es obligatorio",
            minLength: { value: 4, message: "Mínimo 4 caracteres" },
          })}
        />
        {errors.estado && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.estado.message}
          </span>
        )}
      </div>

      {/* Debut */}
      <div className="space-y-1">
        <input
          placeholder="Debut"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
          {...register("debut", {
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
        />
        {errors.debut && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.debut.message}
          </span>
        )}
      </div>

      {/* Títulos */}
      <div className="space-y-1">
        <input
          type="number"
          placeholder="Títulos"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
          {...register("titulos", {
            required: "Los títulos son obligatorios",
            min: { value: 0, message: "No puede ser negativo" },
            max: { value: 20, message: "Máximo 20 títulos" },
          })}
        />
        {errors.titulos && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <span>⚠️</span>
            {errors.titulos.message}
          </span>
        )}
      </div>

      {/* Imagen piloto */}
      <div className="space-y-1">
        <input
          placeholder="URL imagen del piloto"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition placeholder-gray-400"
          {...register("piloto_img", {
            pattern: {
              value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
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

      {/* Select de escudería */}
      <div className="space-y-1">
        <select
          {...register("escuderia")}
          className="w-full px-4 py-2 rounded-lg bg-black/80 text-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-500/40 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 backdrop-blur-sm appearance-none"
        >
          <option value="">Sin escudería</option>
          {escuderias.map((e) => (
            <option key={e.id} value={e.id} className="bg-gray-800">
              {e.nombre}
            </option>
          ))}
        </select>
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
