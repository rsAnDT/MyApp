import { create } from 'zustand';

type LoadingState = {
  isVisible: boolean;
  message?: string;
  show: (message?: string) => void;
  hide: () => void;
};

export const useLoading = create<LoadingState>((set) => ({
  isVisible: false,
  message: undefined,
  show: (message) => set({ isVisible: true, message }),
  hide: () => set({ isVisible: false, message: undefined }),
}));
