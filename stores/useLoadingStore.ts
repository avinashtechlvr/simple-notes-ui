import {create} from 'zustand'

interface LoadingState {
  isLoading: boolean;
  toggleLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  toggleLoading: (isLoading) => set({ isLoading}),
}));
