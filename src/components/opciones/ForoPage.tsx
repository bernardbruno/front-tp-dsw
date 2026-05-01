import { useEffect, useState } from "react";
import Dock from "../Dock";
import Navbar from "../Navbar";
import PostCard from "./PostCard";
import { useUserStore } from "../../store/userStore";
// import { postService } from "../../services/post.service";
import type { Usuario } from "../../types/usuario.types";
import type { Comentario } from "../../types/comentario.types";
import type { Post } from "../../types/post.types";

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    titulo: "¿Verstappen puede llegar al récord de Schumacher?",
    descripcion:
      "Con cuatro títulos consecutivos ya en su haber, Max Verstappen se perfila como uno de los grandes de la historia. A sus 26 años, el tiempo está de su lado y Red Bull sigue siendo competitivo. ¿Puede superar los 7 títulos de Schumacher?",
    fecha_hora: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    usuario: { id: 2, nombre: "Lucas", apellido: "Ferreyra" },
    likes: 34,
    likedByMe: false,
    comentarios: [
      {
        id: 1,
        cuerpo: "Depende mucho de lo que haga McLaren esta temporada, están muy fuertes.",
        fecha_hora: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        usuario: { id: 3, nombre: "Sofía", apellido: "Rodríguez" },
        likes: 8,
        likedByMe: false,
      },
      {
        id: 2,
        cuerpo: "Si Hamilton se va a Ferrari y le va bien, la comparación va a ser inevitable.",
        fecha_hora: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        usuario: { id: 4, nombre: "Matías", apellido: "Gómez" },
        likes: 5,
        likedByMe: false,
      },
    ],
  },
  {
    id: 2,
    titulo: "Predicción: GP de Mónaco 2025",
    descripcion:
      "Monaco es el circuito donde la clasificación lo decide todo. Veo a Leclerc saliendo desde la pole y manteniendo la posición. Ferrari ha mejorado mucho en sector 2 y el monegasco en casa no falla. Mi apuesta: 1° Leclerc, 2° Norris, 3° Verstappen.",
    fecha_hora: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    usuario: { id: 3, nombre: "Sofía", apellido: "Rodríguez" },
    likes: 21,
    likedByMe: true,
    comentarios: [],
  },
  {
    id: 3,
    titulo: "El efecto suelo va a cambiar todo en 2026",
    descripcion:
      "Con el nuevo reglamento de 2026, los autos van a ser más livianos y con efecto suelo reducido. Esto va a nivelar un poco más el campo. Creo que vamos a ver a equipos medianos ganando carreras nuevamente, como pasaba en la era Bridgestone.",
    fecha_hora: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    usuario: { id: 5, nombre: "Joaquín", apellido: "Navarro" },
    likes: 57,
    likedByMe: false,
    comentarios: [
      {
        id: 3,
        cuerpo: "Totalmente de acuerdo, Mercedes ya dijo que el cambio les favorece.",
        fecha_hora: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
        usuario: { id: 2, nombre: "Lucas", apellido: "Ferreyra" },
        likes: 12,
        likedByMe: false,
      },
    ],
  },
];

const POSTS_POR_PAGINA = 5;
const ORDEN_OPCIONES = [
  { value: "reciente", label: "Más recientes" },
  { value: "likes", label: "Más populares" },
  { value: "comentarios", label: "Más comentados" },
];

export default function PostsPage() {
  const usuario = useUserStore((state) => state.usuario);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [buscador, setBuscador] = useState("");
  const [orden, setOrden] = useState("reciente");

  // Formulario nuevo post
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [publicando, setPublicando] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // const data = await postService.getAll();
        await new Promise((r) => setTimeout(r, 400)); // esto hay que volarlo despues
        setPosts(MOCK_POSTS);
      } catch (err) {
        console.error("Error cargando posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Reset página con cambios de filtro
  useEffect(() => {
    setPagina(1);
  }, [buscador, orden]);

  // ── Filtrado y ordenado ──

  const postsFiltrados = posts
    .filter((p) => {
      const q = buscador.toLowerCase();
      return (
        p.titulo.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        `${p.usuario.nombre} ${p.usuario.apellido}`.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (orden === "likes") return b.likes - a.likes;
      if (orden === "comentarios") return b.comentarios.length - a.comentarios.length;
      return new Date(b.fecha_hora).getTime() - new Date(a.fecha_hora).getTime();
    });

  const totalPaginas = Math.ceil(postsFiltrados.length / POSTS_POR_PAGINA);
  const postsPagina = postsFiltrados.slice(
    (pagina - 1) * POSTS_POR_PAGINA,
    pagina * POSTS_POR_PAGINA
  );

  const handleLikePost = async (postId: number) => {
    // await postService.toggleLike(postId);
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, likes: p.likedByMe ? p.likes - 1 : p.likes + 1, likedByMe: !p.likedByMe }
          : p
      )
    );
  };

  const handleLikeComentario = async (postId: number, comentarioId: number) => {
    // await comentarioService.toggleLike(comentarioId);
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comentarios: p.comentarios.map((c) =>
                c.id === comentarioId
                  ? { ...c, likes: c.likedByMe ? c.likes - 1 : c.likes + 1, likedByMe: !c.likedByMe }
                  : c
              ),
            }
          : p
      )
    );
  };

  const handleAgregarComentario = async (postId: number, cuerpo: string) => {
    if (!usuario) return;
    // const nuevo = await comentarioService.crear({ postId, cuerpo });
    const nuevo: Comentario = {
      id: Date.now(),
      cuerpo,
      fecha_hora: new Date().toISOString(),
      usuario: { id: usuario.id, nombre: usuario.nombre, apellido: usuario.apellido },
      likes: 0,
      likedByMe: false,
    };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comentarios: [...p.comentarios, nuevo] } : p
      )
    );
  };

  const handlePublicarPost = async () => {
    if (!nuevoTitulo.trim() || !nuevaDescripcion.trim() || !usuario) return;
    setPublicando(true);
    // const nuevo = await postService.crear({ titulo: nuevoTitulo, descripcion: nuevaDescripcion });
    await new Promise((r) => setTimeout(r, 400)); // esto hay que volarlo despues
    const nuevo: Post = {
      id: Date.now(),
      titulo: nuevoTitulo.trim(),
      descripcion: nuevaDescripcion.trim(),
      fecha_hora: new Date().toISOString(),
      usuario: { id: usuario.id, nombre: usuario.nombre, apellido: usuario.apellido },
      likes: 0,
      likedByMe: false,
      comentarios: [],
    };
    setPosts((prev) => [nuevo, ...prev]);
    setNuevoTitulo("");
    setNuevaDescripcion("");
    setPublicando(false);
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Cargando Posts</h2>
          <p className="text-gray-400">Trayendo las últimas publicaciones...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-b from-[#1e0000] via-black via-60% to-[#1e0000] py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 relative max-w-3xl">

          {/* Título */}
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent mb-4">
              Comunidad F1
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Predicciones, análisis y debates de la máxima categoría
            </p>
            <div className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-red-600 via-white to-red-600 rounded-full" />
          </div>

          {/* nuevo post */}
          {usuario && (
            <div className="mb-8 p-6 border-2 border-red-900/60 shadow-2xl shadow-red-500/10 relative">
              <h2 className="font-montserrat text-xl font-bold text-white mb-3">Nuevo Post</h2>
              <div className="space-y-1">
                <div>
                  <input
                    type="text"
                    placeholder="¿Sobre qué querés hablar?"
                    value={nuevoTitulo}
                    onChange={(e) => setNuevoTitulo(e.target.value)}
                    maxLength={100}
                    className="w-full px-4 py-3 bg-black/80 text-white placeholder-gray-600 border-2 border-red-900/40 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20 transition-all duration-200"
                  />
                  <span className="text-gray-700 text-xs mt-1 block text-right">{nuevoTitulo.length}/100</span>
                </div>
                <div>
                  <textarea
                    placeholder="Compartí tu análisis, predicción u opinión..."
                    value={nuevaDescripcion}
                    onChange={(e) => setNuevaDescripcion(e.target.value)}
                    maxLength={400}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-black/80 text-white placeholder-gray-600 border-2 border-red-900/40 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20 transition-all duration-200 resize-none"
                  />
                  <span className="text-gray-700 text-xs mt-1 block text-right">{nuevaDescripcion.length}/400</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handlePublicarPost}
                  disabled={!nuevoTitulo.trim() || !nuevaDescripcion.trim() || publicando}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
                >
                  {publicando ? "Publicando..." : "Publicar"}
                </button>
              </div>
            </div>
          )}

          {/* Filtro de orden */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-gray-500 text-sm font-semibold">Ordenar:</span>
            <div className="flex gap-2">
              {ORDEN_OPCIONES.map((op) => (
                <button
                  key={op.value}
                  onClick={() => setOrden(op.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                    orden === op.value
                      ? "bg-red-600/30 border-red-500/60 text-red-300"
                      : "border-red-900/30 text-gray-500 hover:text-gray-300 hover:border-red-800/50"
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de posts */}
          <div className="space-y-1">
            {postsPagina.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Sin resultados</h3>
                <p className="text-gray-400">No se encontraron posts con esos filtros.</p>
              </div>
            ) : (
              postsPagina.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  usuarioActual={usuario ?? null}
                  onLikePost={handleLikePost}
                  onLikeComentario={handleLikeComentario}
                  onAgregarComentario={handleAgregarComentario}
                />
              ))
            )}
          </div>

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
                disabled={pagina === 1}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg border border-red-400/50 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
              >
                ← Anterior
              </button>
              <span className="text-white font-bold text-lg bg-black border border-red-700/40 rounded-lg px-4 py-2">
                Página {pagina} de {totalPaginas}
              </span>
              <button
                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                disabled={pagina === totalPaginas}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-lg font-semibold shadow-lg border border-red-400/50 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>
      </section>

      <Dock />
    </>
  );
}