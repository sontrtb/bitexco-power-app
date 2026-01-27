import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from './storage';

export type Lang = 'vn' | 'en' | 'lo';

export interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLang = create<LangState>()(
  persist(
    (set) => ({
      lang: 'vn',
      setLang: (lang) => set({ lang }),
    }),
    {
      name: 'lang-store',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
