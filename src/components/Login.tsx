import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usuarioService } from "../services/usuario.service";
import type { LoginCredentials } from "../types/usuario.types";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data: any) => {
    try {
      const credentials: LoginCredentials = {
        nombre_usuario: data.username,
        password: data.password,
      };
      const usuario = await usuarioService.login(credentials);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      toast.success(`Bienvenido/a, ${usuario.nombre_usuario}! 🏎️`, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      reset();
      if (usuario.rol === "admin") navigate("/admin");
      else navigate("/");
    } catch (err: any) {
      toast.error("Usuario o contraseña incorrectos", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="space-y-8 w-full max-w-md text-white">
      {/* Título */}
      <div className="text-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-500 via-red-300 to-red-500 bg-clip-text text-transparent drop-shadow-md">
          Bienvenido de vuelta
        </h2>
        <p className="text-gray-400 mt-2">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-md font-medium text-gray-300 pl-2">
            Nombre de usuario
          </label>
          <input
            type="text"
            placeholder="tu_usuario"
            {...register("username", {
              required: "El nombre de usuario es obligatorio",
              minLength: { value: 4, message: "Mínimo 4 caracteres" },
              maxLength: { value: 20, message: "Máximo 20 caracteres" },
            })}
            className="w-full px-5 py-4 rounded-lg bg-black/70 text-white text-lg placeholder-gray-500 border border-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          />
          {errors.username && (
            <p className="text-red-400 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-md font-medium text-gray-300 pl-2">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
              className="w-full px-5 py-4 pr-12 rounded-lg bg-black/70 text-white text-lg placeholder-gray-500 border border-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-white transition cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-md ${
            isSubmitting
              ? "bg-gray-600 cursor-not-allowed opacity-70"
              : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white hover:scale-105 shadow-red-500/30 cursor-pointer"
          }`}
        >
          {isSubmitting ? "Accediendo..." : "Iniciar sesión"}
        </button>

        <div className="relative py-5">
          <div className="relative flex justify-center">
            <div className="w-25 lg:w-35 h-1 bg-gradient-to-r from-red-600 via-white to-red-600 rounded-full mt-2"></div>
            <span className="px-4 bg-black/80 text-gray-400 text-sm">
              O ingresar con
            </span>
            <div className="w-25 lg:w-35 h-1 bg-gradient-to-r from-red-600 via-white to-red-600 rounded-full mt-2"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 bg-black/60 border border-red-900/50 hover:border-red-500 rounded-lg hover:bg-black/80 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
            <span className="text-white font-medium">Google</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 bg-black/60 border border-red-900/50 hover:border-red-500 rounded-lg hover:bg-black/80 transition-all cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-.96 3.64-.82 1.57.06 2.75.63 3.54 1.51-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span className="text-white font-medium">Apple</span>
          </button>
        </div>

        {/* Registro */}
        <div className="text-center text-sm text-gray-400">
          ¿No tenés cuenta?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-red-400 hover:text-red-300 font-semibold cursor-pointer transition-all"
          >
            Registrate acá
          </span>
        </div>
      </form>
    </div>
  );
}
