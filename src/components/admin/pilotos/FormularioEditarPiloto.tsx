import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function FormularioEditarPiloto({
  piloto,
  onEditarPiloto,
  onCancelar,
}: {
  piloto: any;
  onEditarPiloto: (p: any) => void;
  onCancelar: () => void;
}) {
  const [escuderias, setEscuderias] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
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

  useEffect(() => {
    if (piloto) {
      setValue("nombre", piloto.nombre);
      setValue("apellido", piloto.apellido);
      setValue("nacionalidad", piloto.nacionalidad);
      setValue("numero", String(piloto.numero));
      setValue(
        "fecha_nacimiento",
        piloto.fecha_nacimiento.slice(0, 10) // yyyy-mm-dd
      );
      setValue("estado", piloto.estado);
      setValue("debut", piloto.debut || "");
      setValue("titulos", String(piloto.titulos));
      setValue("piloto_img", piloto.piloto_img || "");
      setValue(
        "escuderia",
        piloto.escuderia?.id ? String(piloto.escuderia.id) : String(piloto.escuderia)
      );
    }
  }, [piloto, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const pilotoActualizado = {
        ...piloto,
        nombre: data.nombre,
        apellido: data.apellido,
        nacionalidad: data.nacionalidad,
        numero: Number(data.numero),
        fecha_nacimiento: data.fecha_nacimiento,
        estado: data.estado,
        debut: data.debut || "",
        titulos: Number(data.titulos),
        piloto_img: data.piloto_img || "",
        escuderia: Number(data.escuderia),
      };

      const response = await fetch(
        `http://localhost:3000/api/piloto/${piloto.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pilotoActualizado),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error al actualizar el piloto"
        );
      }

      onEditarPiloto(pilotoActualizado);

      toast.success("¡Piloto actualizado exitosamente!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });

      onCancelar();
    } catch (error: any) {
      console.error("Error al editar piloto:", error);
      const msg =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "Error desconocido";
      toast.error(`❌ ${msg}`, {
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
        ✏️ Editar Piloto
      </h3>

      {/* Nombre */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">Nombre</label>
        <input
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
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

      {/* Apellido */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">Apellido</label>
        <input
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("apellido", {
            required: "El apellido es obligatorio",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
        />
        {errors.apellido && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.apellido.message}
          </span>
        )}
      </div>

      {/* Nacionalidad */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          Nacionalidad
        </label>
        <input
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("nacionalidad", {
            required: "La nacionalidad es obligatoria",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
        />
        {errors.nacionalidad && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.nacionalidad.message}
          </span>
        )}
      </div>

      {/* Número */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">Número</label>
        <input
          type="number"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("numero", {
            required: "El número es obligatorio",
            min: { value: 1, message: "Debe ser ≥ 1" },
          })}
        />
        {errors.numero && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.numero.message}
          </span>
        )}
      </div>

      {/* Fecha de nacimiento */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          Fecha de nacimiento
        </label>
        <input
          type="date"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("fecha_nacimiento", {
            required: "La fecha es obligatoria",
          })}
        />
        {errors.fecha_nacimiento && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.fecha_nacimiento.message}
          </span>
        )}
      </div>

      {/* Estado */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">Estado</label>
        <input
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("estado", {
            required: "El estado es obligatorio",
          })}
        />
        {errors.estado && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.estado.message}
          </span>
        )}
      </div>

      {/* Debut */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">Debut</label>
        <input
          placeholder="e.g. GP Argentina 1953"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("debut", {
            maxLength: { value: 200, message: "Máximo 200 caracteres" },
          })}
        />
        {errors.debut && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.debut.message}
          </span>
        )}
      </div>

      {/* Títulos */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">Títulos</label>
        <input
          type="number"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
          {...register("titulos", {
            required: "Los títulos son obligatorios",
            min: { value: 0, message: "No puede ser negativo" },
          })}
        />
        {errors.titulos && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            ⚠️ {errors.titulos.message}
          </span>
        )}
      </div>

      {/* URL imagen del piloto */}
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          URL imagen del piloto
        </label>
        <input
          placeholder="https://ejemplo.com/piloto.png"
          className="w-full px-4 py-2 rounded-lg bg-black/60 text-white border border-red-500/40 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
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
        <label className="block text-white text-sm font-medium">
          Escudería
        </label>
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
