export interface Circuito {
  id: number;
  nombre: string;
  ubicacion: string;
  pais: string;
  vueltas: number;
  longitud_km: number;
}

export type CreateCircuito = Omit<Circuito, 'id'>;