import type { Carrera, CreateCarrera } from '../types/carrera.types';

const URL = 'http://localhost:3000/api/carrera';

export const carreraService = {
  async getAll(): Promise<Carrera[]> {
    const response = await fetch(`${URL}/`);
    const result = await response.json();
    return result.data;
  },

  async getById(id: number): Promise<Carrera> {
    const response = await fetch(`${URL}/${id}`);
    const result = await response.json();
    return result.data;
  },

  async create(carrera: CreateCarrera): Promise<Carrera> {
    const response = await fetch(`${URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carrera),
    });
    const result = await response.json();
    return result.data;
  },

  async update(id: number, carrera: Partial<CreateCarrera>): Promise<Carrera> {
    const response = await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carrera),
    });
    const result = await response.json();
    return result.data;
  },

  async delete(id: number): Promise<void> {
    await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
  }
};