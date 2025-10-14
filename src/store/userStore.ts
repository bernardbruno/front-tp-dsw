import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Usuario } from '../types/usuario.types';

interface UserState {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario) => void;
  clearUsuario: () => void;
}

export const useUserStore = create<UserState>(
  persist(
    (set) => ({
      usuario: null,
      
      setUsuario: (usuario) => set({ usuario }),
      
      clearUsuario: () => set({ usuario: null }),
    }),
    {
      name: 'user-store',
      storage: localStorage,
    }
  )
);