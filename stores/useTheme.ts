import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from './storage';

export type ThemeMode = 'light' | 'dart'; // (dart = dark?)

export interface ColorState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  changeTheme: () => void;
}

export const useTheme = create<ColorState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      changeTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dart' : 'light',
        })),
    }),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
