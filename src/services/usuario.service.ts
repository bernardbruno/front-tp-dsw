import type { Usuario, CreateUsuario, LoginCredentials } from '../types/usuario.types';

const API_BASE_URL = 'http://localhost:3000/api';

class UsuarioService {
  async getAll(): Promise<Usuario[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching usuarios:', error);
      throw new Error('Error al cargar los usuarios');
    }
  }

  async getById(id: number): Promise<Usuario> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/${id}`);
      if (!response.ok) {
        throw new Error('Error cargando usuario');
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching usuario:', error);
      throw new Error('Error al cargar el usuario');
    }
  }

  async create(usuario: CreateUsuario): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error creating usuario:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error al crear el usuario');
    }
  }

  async update(id: number, usuario: Partial<CreateUsuario>): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar usuario');
      }
    } catch (error) {
      console.error('Error updating usuario:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error al actualizar el usuario');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error deleting usuario:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error al eliminar el usuario');
    }
  }

  async login(credentials: LoginCredentials): Promise<Usuario> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciales inválidas');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error login:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error al iniciar sesión');
    }
  }
}

export const usuarioService = new UsuarioService();