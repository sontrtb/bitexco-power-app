import { create } from 'zustand';

export interface CountNotiState {
  count: number;
  increaseCount: () => void;
  reduceCount: () => void;
  setCount: (count: number) => void;
}

export const useCountNoti = create<CountNotiState>((set) => ({
  count: 0,
  setCount: (count) => set({ count }),
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  reduceCount: () => set((state) => ({ count: state.count - 1 })),
}));
