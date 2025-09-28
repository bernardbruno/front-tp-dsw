import type { Escuderia, CreateEscuderia } from '../types/escuderia.types';

const URL = 'http://localhost:3000/api/escuderia';

export const escuderiaService = {
  async getAll(): Promise<Escuderia[]> {
    const response = await fetch(`${URL}/`);
    const result = await response.json();
    return result.data;
  },

  async getById(id: number): Promise<Escuderia> {
    const response = await fetch(`${URL}/${id}`);
    const result = await response.json();
    return result.data;
  },

  async create(escuderia: CreateEscuderia): Promise<Escuderia> {
    const response = await fetch(`${URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(escuderia),
    });
    const result = await response.json();
    return result.data;
  },

  async update(id: number, escuderia: Partial<CreateEscuderia>): Promise<void> {
    await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(escuderia),
    });
  },

  async delete(id: number): Promise<void> {
    await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
  }
};