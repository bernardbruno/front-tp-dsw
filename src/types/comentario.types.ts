import type { Usuario } from './usuario.types';

export interface Comentario {
  id: number;
  cuerpo: string;
  fecha_hora: string;
  usuario: Usuario;
  likes: number;
  likedByMe?: boolean;
  comentario_padre?: Comentario | null; // null si es comentario directo al post
  respuestas?: Comentario[]; // Respuestas anidadas — recursivo sin límite de profundidad
}

export interface CreateComentario {
  cuerpo: string;
  post_id: number; // ID del post al que pertenece
  comentario_padre_id?: number | null; // ID del comentario padre si es una respuesta (null si es comentario directo al post)
}

export interface UpdateComentario {
  cuerpo: string;
}