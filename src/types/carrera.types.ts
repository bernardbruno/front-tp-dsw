import type { Piloto } from './piloto.types';
import type { Circuito } from './circuito.types';

export interface Carrera {
  id: number;
  nombre: string;
  fecha_carrera: string;
  hora_carrera: number;
  estado: string;
  vuelta_rapida?: Piloto | null;
  pole?: Piloto | null;
  circuito: Circuito;
}

export type CreateCarrera = Omit<Carrera, 'id'>;

export interface Resultado {
  piloto: Piloto;
  posicion: number | null;
  estado: string | null;
}