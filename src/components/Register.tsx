import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { pilotoService } from "../services/piloto.service";
import { usuarioService } from "../services/usuario.service";
import type { CreateUsuario } from "../types/usuario.types";

export default function Register() {
  const [step, setStep] = useState(1);
  const [pilotos, setPilotos] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    favoritePilot: "",
    acceptTerms: false,
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
    setError,
  } = useForm({ mode: "onChange" });

  const password = watch("password");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pilotoService.getAll();
        setPilotos(data);
      } catch (error) {
        console.error("Error cargando pilotos:", error);
      }
    };
    fetchData();
  }, []);

  const nextStep = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await trigger("email");
      if (isValid) {
        setFormData({ ...formData, email: watch("email") });
        setStep(2);
      }
    } else if (step === 2) {
      isValid =
        (await trigger("username")) &&
        (await trigger("password")) &&
        (await trigger("confirmPassword"));
      if (isValid) {
        setFormData({
          ...formData,
          username: watch("username"),
          password: watch("password"),
          confirmPassword: watch("confirmPassword"),
        });
        setStep(3);
      }
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: any) => {
    try {
      const pilotoSeleccionado = pilotos.find(
        (p) => `${p.nombre} ${p.apellido || ""}`.trim() === data.favoritePilot
      );

      const nuevoUsuario: CreateUsuario = {
        nombre_usuario: formData.username,
        nombre: "Nombre",
        apellido: "Apellido",
        password: formData.password,
        email: formData.email,
        pais: "No especificado",
        puntos: 0,
        user_img: null,
        rol: "user",
        piloto_fav: pilotoSeleccionado ? pilotoSeleccionado.id : null,
      };

      await usuarioService.create(nuevoUsuario);

      toast.success("¡Cuenta creada con éxito! Ahora puedes iniciar sesión", {
        position: "top-center",
        autoClose: 4000,
        theme: "dark",
      });
      navigate("/login");
    } catch (err: any) {
      const errorMessage = err?.message || "";
      if (errorMessage.includes("ya existe")) {
        if (errorMessage.includes("email")) {
          setStep(1);
          setError("email", {
            type: "manual",
            message: "Este email ya está registrado",
          });
        } else if (errorMessage.includes("usuario")) {
          setStep(2);
          setError("username", {
            type: "manual",
            message: "Este nombre de usuario ya está ocupado",
          });
        }
        toast.error(`❌ ${errorMessage}`, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      } else {
        toast.error("❌ No se pudo registrar el usuario. Intenta nuevamente", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div className="w-full">
      {/* Indicador de progreso */}
      <div className="mb-8 flex justify-center">
        <div className="flex items-center justify-center mb-2 w-full max-w-md">
          {[1, 2, 3].map((s, index) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  step >= s
                    ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/50"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {s}
              </div>

              {/* Línea de conexión solo si no es el último círculo */}
              {index < 2 && (
                <div
                  className={`w-12 h-1 mx-2 rounded-full transition-all duration-300 ${
                    step > s ? "bg-red-500" : "bg-gray-700"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* PASO 1: Email */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-white font-semibold text-md pl-2">
                Correo electrónico
              </label>
              <input
                className="w-full px-5 py-4 rounded-xl bg-black/60 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-900/50 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
                placeholder="tu@email.com"
                type="email"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email inválido",
                  },
                })}
              />
              {errors.email && (
                <div className="flex items-center space-x-2 text-red-400 text-sm mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                  </svg>
                  <span>{errors.email.message}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/30 cursor-pointer"
            >
              Continuar
            </button>
          </div>
        )}

        {/* PASO 2: Username y Password */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-white font-semibold text-md pl-2">
                Nombre de usuario
              </label>
              <input
                className="w-full px-5 py-4 rounded-xl bg-black/60 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-900/50 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
                placeholder="tu_usuario"
                type="text"
                {...register("username", {
                  required: "El nombre de usuario es obligatorio",
                  minLength: { value: 4, message: "Mínimo 4 caracteres" },
                  maxLength: { value: 20, message: "Máximo 20 caracteres" },
                })}
              />
              {errors.username && (
                <div className="flex items-center space-x-2 text-red-400 text-sm mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                  </svg>
                  <span>{errors.username.message}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-white font-semibold text-md pl-2">
                Contraseña
              </label>
              <input
                className="w-full px-5 py-4 rounded-xl bg-black/60 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-900/50 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
                placeholder="••••••••"
                type="password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
              />
              {errors.password && (
                <div className="flex items-center space-x-2 text-red-400 text-sm mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                  </svg>
                  <span>{errors.password.message}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-white font-semibold text-md pl-2">
                Confirmar contraseña
              </label>
              <input
                className="w-full px-5 py-4 rounded-xl bg-black/60 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-900/50 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20"
                placeholder="••••••••"
                type="password"
                {...register("confirmPassword", {
                  required: "Confirma tu contraseña",
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                })}
              />
              {errors.confirmPassword && (
                <div className="flex items-center space-x-2 text-red-400 text-sm mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                  </svg>
                  <span>{errors.confirmPassword.message}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-all duration-300 cursor-pointer"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-2 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/30 cursor-pointer"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* PASO 3: Piloto y Terminos */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-white font-semibold text-sm pl-2">
                Piloto favorito
              </label>
              <div className="relative">
                <select
                  className="w-full px-5 py-4 rounded-xl bg-black/60 text-white text-lg focus:outline-none focus:ring-2 focus:ring-red-500 border-2 border-red-900/50 transition-all duration-300 focus:shadow-lg focus:shadow-red-500/20 appearance-none cursor-pointer"
                  {...register("favoritePilot")}
                  defaultValue=""
                >
                  <option value="" className="bg-black">
                    Selecciona tu piloto favorito
                  </option>
                  {pilotos.map((p) => (
                    <option
                      key={p.id}
                      value={`${p.nombre} ${p.apellido || ""}`.trim()}
                      className="bg-black"
                    >
                      {p.nombre} {p.apellido}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-4">
              <label className="flex items-start space-x-3 group">
                <input
                  type="checkbox"
                  {...register("acceptTerms", {
                    required: "Debes aceptar los términos y condiciones",
                  })}
                  className="mt-1 w-5 h-5 rounded border-2 border-red-900/50 bg-black/60 text-red-600 focus:ring-2 focus:ring-red-500 cursor-pointer"
                />
                <span className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                  Acepto los{" "}
                  <span className="text-red-400 underline">
                    términos y condiciones
                  </span>{" "}
                  y la{" "}
                  <span className="text-red-400 underline">
                    política de privacidad
                  </span>
                </span>
              </label>
              {errors.acceptTerms && (
                <div className="flex items-center space-x-2 text-red-400 text-sm mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                  </svg>
                  <span>{errors.acceptTerms.message}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-all duration-300 cursor-pointer"
              >
                Atrás
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-2 py-4 font-bold rounded-xl transition-all duration-300 shadow-lg ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed opacity-70"
                    : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 hover:scale-105 shadow-red-500/30 cursor-pointer"
                } text-white`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Creando cuenta...</span>
                  </div>
                ) : (
                  "Crear cuenta"
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Link de login */}
      <div className="mt-16 mx-auto w-48 h-1 bg-gradient-to-r from-red-600 via-white to-red-600 rounded-full mb-6"></div>
      <div className="text-center pt-6">
        <p className="text-gray-400 mb-2">¿Ya tienes cuenta?</p>
        <Link
          to="/login"
          className="text-red-400 hover:text-red-300 font-semibold transition-all duration-300 hover:underline"
        >
          Iniciar sesión →
        </Link>
      </div>
    </div>
  );
}
