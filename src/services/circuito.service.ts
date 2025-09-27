//import { Circuito, CreateCircuito } from '../types/circuito.types';

interface Circuito {
  id: number;
  nombre: string;
  ubicacion: string;
  pais: string;
  vueltas: number;
  longitud_km: number;
}

type CreateCircuito = Omit<Circuito, 'id'>;

const URL = 'http://localhost:3000/api/circuito';

export const circuitoService = {
  async getAll(): Promise<Circuito[]> {
    const response = await fetch(`${URL}/`);
    const result = await response.json();
    return result.data;
  },

  async getById(id: number): Promise<Circuito> {
    const response = await fetch(`${URL}/${id}`);
    const result = await response.json();
    return result.data;
  },

  async create(circuito: CreateCircuito): Promise<Circuito> {
    const response = await fetch(`${URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(circuito),
    });
    const result = await response.json();
    return result.data;
  },

  async update(id: number, circuito: Partial<CreateCircuito>): Promise<void> {
    await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(circuito),
    });
  },

  async delete(id: number): Promise<void> {
    await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
  }
};