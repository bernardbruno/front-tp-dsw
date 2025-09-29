import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { pilotoService } from "../services/piloto.service";
import { usuarioService } from "../services/usuario.service";
import type { CreateUsuario } from "../types/usuario.types";

export default function Register() {
  const [pilotos, setPilotos] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pilotoService.getAll();
        setPilotos(data);
      } catch (error) {
        console.error("Error cargando pilotos:", error);
        toast.error("❌ Error al cargar los pilotos", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const pilotoSeleccionado = pilotos.find(
        (p) => `${p.nombre} ${p.apellido || ""}`.trim() === data.favoritePilot
      );

      const nuevoUsuario: CreateUsuario = {
        nombre_usuario: data.username,
        nombre: data.nombre || "Nombre",
        apellido: data.apellido || "Apellido",
        password: data.password,
        email: data.email,
        pais: data.pais || "No especficado",
        puntos: 0,
        user_img: null,
        rol: "user",
        piloto_fav: pilotoSeleccionado ? pilotoSeleccionado.id : null,
      };
      await usuarioService.create(nuevoUsuario);

      toast.success(
        "🎉 ¡Cuenta creada exitosamente! Ahora puedes iniciar sesión",
        {
          position: "top-center",
          autoClose: 4000,
          theme: "dark",
        }
      );
      reset();
      navigate("/login");
    } catch (err) {
      toast.error("❌ No se pudo registrar el usuario. Intenta nuevamente", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  return (
    <form
      className="w-full space-y-5"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      {/* Nombre de usuario */}
      <div className="space-y-2">
        <input
          className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
          placeholder="Nombre de usuario"
          type="text"
          {...register("username", {
            required: "Este campo es obligatorio",
            maxLength: { value: 20, message: "Máximo 20 caracteres" },
            minLength: { value: 4, message: "Mínimo 4 caracteres" },
          })}
        />
        {errors.username && (
          <div className="flex items-center space-x-1 text-red-400 text-sm ml-1">
            <span>⚠️</span>
            <span>{errors.username.message}</span>
          </div>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <input
          className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
          placeholder="Correo electrónico"
          type="email"
          {...register("email", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email inválido",
            },
          })}
        />
        {errors.email && (
          <div className="flex items-center space-x-1 text-red-400 text-sm ml-1">
            <span>⚠️</span>
            <span>{errors.email.message}</span>
          </div>
        )}
      </div>

      {/* Contraseña */}
      <div className="space-y-2">
        <input
          {...register("password", {
            required: "Este campo es obligatorio",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
          type="password"
          className="w-full px-5 py-3 rounded-lg bg-black/80 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
          placeholder="Contraseña"
        />
        {errors.password && (
          <div className="flex items-center space-x-1 text-red-400 text-sm ml-1">
            <span>⚠️</span>
            <span>{errors.password.message}</span>
          </div>
        )}
      </div>

      {/* Piloto favorito */}
      <div className="space-y-2">
        <div className="relative">
          <select
            className="w-full px-5 py-3 rounded-lg bg-black/80 text-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-800/70 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 backdrop-blur-sm appearance-none option-white"
            {...register("favoritePilot")}
            defaultValue=""
          >
            <option value="">Selecciona a tu piloto favorito</option>
            {pilotos.map((p) => (
              <option
                key={p.id}
                value={`${p.nombre} ${p.apellido || ""}`.trim()}
                className="bg-gray-800"
              >
                {p.nombre} {p.apellido}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-gray-500">▼</span>
          </div>
        </div>
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 px-6 text-lg font-semibold rounded-xl transition-all duration-300 transform ${
          isSubmitting
            ? "bg-gray-600 cursor-not-allowed opacity-70"
            : "bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:via-red-400 hover:to-red-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-500/25"
        } text-white border border-red-400/50`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            <span>Creando cuenta...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2 cursor-pointer">
            <span>Crear cuenta</span>
          </div>
        )}
      </button>

      {/* Link de login */}
      <div className="text-center pt-4">
        <p className="text-gray-400 mb-3">¿Ya tienes cuenta?</p>
        <Link
          to="/login"
          className="inline-flex items-center space-x-2 text-red-400 hover:text-red-300 font-semibold transition-all duration-300 hover:underline text-lg"
        >
          <span>Iniciar sesión</span>
        </Link>
      </div>
    </form>
  );
}
