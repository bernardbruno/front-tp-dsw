import type { Piloto } from './piloto.types';

export interface Usuario {
  id: number;
  nombre_usuario: string;
  nombre: string;
  apellido: string;
  email: string;
  pais: string;
  user_img?: string;
  rol: string;
  puntos: number;
  piloto_fav?: Piloto;
}

export interface CreateUsuario {
  nombre_usuario: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  pais: string;
  user_img?: string;
  rol: string;
  puntos: number;
  piloto_fav?: number | null;
}

export interface LoginCredentials {
  nombre_usuario: string;
  password: string;
}
