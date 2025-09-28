import type { Resultado } from "../types/carrera.types";

const URL = "http://localhost:3000/api/resultado";

export const resultadoService = {
  async getByCarreraId(carreraId: number): Promise<{ carrera: any; resultados: Resultado[] }> {
    const response = await fetch(`${URL}/${carreraId}`);
    if (!response.ok) throw new Error("Error cargando resultados");
    const result = await response.json();
    return result.data;
  },

  async addPilotos(carreraId: number, pilotos: number[]): Promise<void> {
    const response = await fetch(`${URL}/${carreraId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pilotos: pilotos.map(id => ({ id })) }),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Error al agregar resultados");
    }
  },

  async updateResultado(carreraId: number, pilotoId: number, payload: Partial<Resultado>): Promise<void> {
    const response = await fetch(`${URL}/${carreraId}/${pilotoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Error al actualizar resultado");
    }
  },

  async deleteResultado(carreraId: number, pilotoId: number): Promise<void> {
    const response = await fetch(`${URL}/${carreraId}/${pilotoId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Error al eliminar resultado");
    }
  },
};