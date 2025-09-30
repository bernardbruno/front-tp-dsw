import type { Escuderia } from './escuderia.types';

export interface Piloto {
  id: number;
  nombre: string;
  apellido: string;
  nacionalidad: string;
  numero: number;
  fecha_nacimiento: string;
  estado: string;
  debut?: string;
  titulos: number;
  piloto_img?: string;
  escuderia?: Escuderia;
}

export interface CreatePiloto {
  nombre: string;
  apellido: string;
  nacionalidad: string;
  numero: number;
  fecha_nacimiento: string;
  estado: string;
  debut?: string;
  titulos: number;
  piloto_img?: string;
  escuderia?: number | null;
}