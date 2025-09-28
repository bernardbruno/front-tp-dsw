import type { Piloto, CreatePiloto } from '../types/piloto.types';

const URL = 'http://localhost:3000/api/piloto';

export const pilotoService = {
  async getAll(): Promise<Piloto[]> {
    const response = await fetch(`${URL}/`);
    const result = await response.json();
    return result.data;
  },

  async getAllActivos(): Promise<Piloto[]> {
    const response = await fetch(`${URL}/activo`);
    const result = await response.json();
    return result.data;
  },

  async getById(id: number): Promise<Piloto> {
    const response = await fetch(`${URL}/${id}`);
    const result = await response.json();
    return result.data;
  },

  async create(piloto: CreatePiloto): Promise<Piloto> {
    const response = await fetch(`${URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(piloto),
    });
    const result = await response.json();
    return result.data;
  },

  async update(id: number, piloto: Partial<CreatePiloto>): Promise<void> {
    await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(piloto),
    });
  },

  async delete(id: number): Promise<void> {
    await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
  }
};