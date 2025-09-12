import { create } from 'zustand';

type NetworkErrorState = {
  isVisible: boolean;
  message?: string;
  show: (message?: string) => void;
  hide: () => void;
};

export const useNetworkError = create<NetworkErrorState>((set) => ({
  isVisible: false,
  message: undefined,
  show: (message) => set({ isVisible: true, message }),
  hide: () => set({ isVisible: false, message: undefined }),
}));
