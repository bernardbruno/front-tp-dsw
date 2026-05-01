import { useState } from "react";
import type { Post } from "../../types/post.types";

interface PostCardProps {
  post: Post;
  usuarioActual?: { id: number; nombre: string; apellido: string } | null;
  onLikePost: (postId: number) => void;
  onLikeComentario: (postId: number, comentarioId: number) => void;
  onAgregarComentario: (postId: number, cuerpo: string) => void;
}

function formatFecha(fechaStr: string) {
  const fecha = new Date(fechaStr);
  const ahora = new Date();
  const diffMs = ahora.getTime() - fecha.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDias = Math.floor(diffHrs / 24);

  if (diffMin < 1) return "Justo ahora";
  if (diffMin < 60) return `hace ${diffMin}m`;
  if (diffHrs < 24) return `hace ${diffHrs}h`;
  if (diffDias < 7) return `hace ${diffDias}d`;
  return fecha.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
}

function Avatar({ usuario, size = "sm" }: { usuario: { nombre: string; apellido: string; avatar?: string }; size?: "sm" | "md" }) {
  const initials = `${usuario.nombre[0]}${usuario.apellido[0]}`.toUpperCase();
  const sizeClass = size === "md" ? "w-10 h-10 text-base" : "w-8 h-8 text-sm";

  if (usuario.avatar) {
    return (
      <img
        src={usuario.avatar}
        alt={`${usuario.nombre} ${usuario.apellido}`}
        className={`${sizeClass} rounded-full object-cover border-2 border-red-700/50`}
      />
    );
  }

  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center border-2 border-red-600/40 font-bold text-white flex-shrink-0`}>
      {initials}
    </div>
  );
}

export default function PostCard({ post, usuarioActual, onLikePost, onLikeComentario, onAgregarComentario }: PostCardProps) {
  const [expandido, setExpandido] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleEnviarComentario = async () => {
    if (!nuevoComentario.trim() || !usuarioActual) return;
    setEnviando(true);
    await onAgregarComentario(post.id, nuevoComentario.trim());
    setNuevoComentario("");
    setEnviando(false);
  };

  return (
    <article className="relative overflow-hidden border-2 border-red-900/50 hover:border-red-500/70 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10 bg-black/60 backdrop-blur-sm group">


      <div className="p-6">
        {/* Header del post */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar usuario={post.usuario} size="md" />
          <div className="flex-1 min-w-0">
            <span className="font-bold text-white text-sm">
              {post.usuario.nombre} {post.usuario.apellido}
            </span>
            <p className="text-gray-500 text-xs mt-0.5">{formatFecha(post.fecha_hora)}</p>
          </div>
        </div>

        <h3 className="font-montserrat text-lg font-bold text-white mb-2 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {post.titulo}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-2">
          {post.descripcion}
        </p>

        <div className="flex items-center gap-4">
          {/* Like post */}
          <button
            onClick={() => onLikePost(post.id)}
            disabled={!usuarioActual}
            className={`flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed ${
              post.likedByMe ? "text-red-400" : "text-gray-500 hover:text-red-400"
            }`}
          >
            <span className={`cursor-pointer text-lg transition-transform duration-200 ${post.likedByMe ? "scale-110" : ""}`}>
              {post.likedByMe ? "❤️" : "🤍"}
            </span>
            <span>{post.likes}</span>
          </button>

          {/* Comentarios */}
          <button
            onClick={() => setExpandido(!expandido)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-white transition-all duration-200 hover:scale-105"
          >
            <span className="text-lg cursor-pointer">💬</span>
            <span>{post.comentarios.length}</span>
          </button>
        </div>
      </div>

      {/* Sección de comentarios */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          expandido ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
          {/* Lista de comentarios */}
          <div className="px-6 space-y-4 max-h-72 overflow-y-auto custom-scrollbar">
            {post.comentarios.length === 0 ? (
              <div className="text-center py-6">
                <span className="text-3xl">💬</span>
                <p className="text-gray-600 text-sm mt-2">Sin comentarios aún. ¡Sé el primero!</p>
              </div>
            ) : (
              post.comentarios.map((comentario) => (
                <div key={comentario.id} className="flex gap-3 group/comment">
                  <div className="flex-1 min-w-0">
                    <div className="bg-white/3 px-3 py-2 border-l-2 border-red-700/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar usuario={comentario.usuario} size="sm" />
                        <span className="text-xs font-bold text-white">
                          {comentario.usuario.nombre} {comentario.usuario.apellido}
                        </span>
                        <span className="text-gray-600 text-xs">{formatFecha(comentario.fecha_hora)}</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{comentario.cuerpo}</p>
                    </div>
                    {/* Like comentario */}
                    <button
                      onClick={() => onLikeComentario(post.id, comentario.id)}
                      disabled={!usuarioActual}
                      className={`mt-1 ml-2 flex items-center gap-1 text-xs transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
                        comentario.likedByMe ? "text-red-400" : "text-gray-600 hover:text-red-400"
                      }`}
                    >
                      <span>{comentario.likedByMe ? "❤️" : "🤍"}</span>
                      <span>{comentario.likes}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input nuevo comentario */}
          <div className="px-6 py-4">
            {usuarioActual ? (
              <div className="flex gap-3 items-start">
                <Avatar usuario={usuarioActual} size="sm" />
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Escribí un comentario..."
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEnviarComentario()}
                    maxLength={500}
                    className="flex-1 px-3 py-2 text-sm rounded-lg bg-white/5 text-white placeholder-gray-600 border border-red-900/30 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20 transition-all duration-200"
                  />
                  <button
                    onClick={handleEnviarComentario}
                    disabled={!nuevoComentario.trim() || enviando}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 flex-shrink-0"
                  >
                    {enviando ? "..." : "↑"}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-600 text-xs py-2">
                Iniciá sesión para comentar
              </p>
            )}
          </div>
      </div>

      {/* Franja inferior */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-red-600 via-red-500 to-red-400">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
      </div>
    </article>
  );
}