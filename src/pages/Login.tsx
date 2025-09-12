import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setError("");
    try {
      const res = await fetch(
        `http://localhost:3000/usuarios?nombre=${data.username}&password=${data.password}`
      );
      const usuarios = await res.json();

      if (usuarios.length > 0) {
        const usuario = usuarios[0];
        localStorage.setItem("usuario", JSON.stringify(usuario));
        reset();
        if (usuario.rol === "admin") navigate("/admin");
        else navigate("/home");
      } else {
        setError("Usuario o contraseña incorrectos");
        reset();
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <form
      className="space-y-6 w-full"
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
          <span className="text-red-400 text-sm">{errors.username.message}</span>
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
          <span className="text-red-400 text-sm">{errors.password.message}</span>
        )}
      </div>

      {/* Link de registro */}
      <div className="flex justify-center mt-4">
        <Link
          to={"/register"}
          className="text-lg text-red-400 hover:text-red-300 hover:underline transition-all font-semibold"
        >
          ¿Eres nuevo? Únete aquí
        </Link>
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

    </form>
  );
}
