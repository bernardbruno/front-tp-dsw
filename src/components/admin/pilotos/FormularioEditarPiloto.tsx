import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { pilotoService } from "../../../services/piloto.service";
import { escuderiaService } from "../../../services/escuderia.service";

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
    escuderiaService
      .getAll()
      .then((data) => setEscuderias(data))
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
        piloto.escuderia?.id
          ? String(piloto.escuderia.id)
          : String(piloto.escuderia)
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

      await pilotoService.update(piloto.id, pilotoActualizado);

      const pilotoCompleto = await pilotoService.getById(piloto.id);
      onEditarPiloto(pilotoCompleto);

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
            Editar Piloto
          </h3>
          <p className="text-gray-400 text-sm">
            Modifica los datos del piloto seleccionado
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

          {/* Apellido */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Apellido"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("apellido", {
                required: "El apellido es obligatorio",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                maxLength: { value: 100, message: "Máximo 100 caracteres" },
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
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Número"
              min="1"
              max="99"
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
              placeholder="Fecha de nacimiento"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("fecha_nacimiento", {
                required: "La fecha de nacimiento es obligatoria",
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
                className="w-full px-5 py-3 rounded-lg bg-black/80 text-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 appearance-none"
              >
                <option value="" className="bg-gray-800">Selecciona un estado</option>
                <option value="activo" className="bg-gray-800">Activo</option>
                <option value="inactivo" className="bg-gray-800">Inactivo</option>
                <option value="retirado" className="bg-gray-800">Retirado</option>
              </select>
              {errors.estado && (
                <span className="text-red-400 text-sm flex items-center gap-1">
                  ⚠️ {errors.estado.message}
                </span>
              )}
              <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">▼</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Debut */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Debut (ej: GP Australia 2015)"
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

          {/* Títulos */}
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Títulos"
              min="0"
              max="10"
              className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
              {...register("titulos", {
                min: { value: 0, message: "No puede ser negativo" },
                max: { value: 10, message: "Máximo 10 títulos" },
              })}
            />
            {errors.titulos && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                ⚠️ {errors.titulos.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Imagen piloto */}
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

          {/* Escudería */}
          <div className="space-y-2">
            <div className="relative">
              <select
                {...register("escuderia")}
                className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 appearance-none"
              >
                <option value="">Sin escudería</option>
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
