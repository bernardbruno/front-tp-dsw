import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:3000/api/usuario/');
      const response = await res.json();
      if (!res.ok) throw new Error('Error en la solicitud');
      const usuario = response.data.find(
        user => user.nombre_usuario === data.username && user.password === data.password
      );

      if (usuario) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
        toast.success(`¡Bienvenido/a, ${usuario.nombre_usuario}! 🏎️`, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        reset();
        if (usuario.rol === "admin") navigate("/admin");
        else navigate("/home");
      } else {
        toast.error("❌ Usuario o contraseña incorrectos", {
          position: "top-right",
          autoClose: 4000,
          theme: "dark",
        });
        reset();
      }
    } catch (err) {
      console.error("Error de login:", err);
      toast.error("🔧 Error al conectar con el servidor", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  return (
    <form
      className="space-y-8 w-full"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      {/* Usuario */}
      <div>
        
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
          <span className="text-red-400 text-sm">
            ⚠️ {errors.username.message}
          </span>
        )}
      </div>

      {/* Contraseña */}
      <div>
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
          <span className="text-red-400 text-sm">
            ⚠️ {errors.password.message}
          </span>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full mt-6 px-6 py-3 text-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 border border-red-400/50 transition-transform hover:scale-105 cursor-pointer ${
          isSubmitting ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Accediendo..." : "Acceder"}
      </button>

            {/* Link de registro */}
      <div className="text-center pt-4">
          <p className="text-gray-400 mb-1">¿Eres nuevo?</p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 text-red-400 hover:text-red-300 font-semibold transition-all duration-300 hover:underline text-lg"
          >
            <span>Únete aquí</span>
          </Link>
        </div>
    </form>
  );
}
