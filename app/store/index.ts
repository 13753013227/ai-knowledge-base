import { create } from 'zustand';

interface MenuItem {
  icon: React.ReactNode;
  title: string;
  active: boolean;
  id: string;
}

interface AppState {
  currentMenuItem: MenuItem | null;
  setCurrentMenuItem: (item: MenuItem) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentMenuItem: null,
  setCurrentMenuItem: (item) => set({ currentMenuItem: item }),
}));
