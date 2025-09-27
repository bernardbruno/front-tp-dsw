export interface Escuderia {
  id: number;
  nombre: string;
  pais_base: string;
  jefe_equipo: string;
  motor: string;
  campeonatos_constructores: number;
  debut: string;
  logo?: string;
  auto_img?: string;
}

export type CreateEscuderia = Omit<Escuderia, 'id'>;