import { IBioRegister } from '@/api/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from './storage';
export interface IBiometric {
  enabel: boolean;
  data: IBioRegister;
}

export interface BiometricState {
  enabelBiometric: IBiometric | undefined;
  setEnabelBiometric: (enabel: IBiometric | undefined) => void;
}

export const useBiometric = create<BiometricState>()(
  persist(
    (set) => ({
      enabelBiometric: undefined,
      setEnabelBiometric: (enabelBiometric) =>
        set({ enabelBiometric }),
    }),
    {
      name: 'biometric-store',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
