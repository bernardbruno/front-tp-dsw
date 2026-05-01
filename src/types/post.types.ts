import type { Usuario } from './usuario.types';
import type { Comentario } from './comentario.types';

export interface Post {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_hora: string;
  usuario: Usuario;
  likes: number;
  likedByMe?: boolean;
  // Solo comentarios raíz (sin padre); las respuestas vienen anidadas dentro de cada Comentario
  comentarios: Comentario[];
}

export interface CreatePost {
  titulo: string;
  descripcion: string;
}

export interface UpdatePost {
  titulo?: string;
  descripcion?: string;
}