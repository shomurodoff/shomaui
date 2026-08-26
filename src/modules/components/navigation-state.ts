import { create } from "zustand";

type ComponentNavigationState = {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  reset: () => void;
};

export const useComponentNavigation = create<ComponentNavigationState>(
  (set) => ({
    activeCategory: null,
    setActiveCategory: (activeCategory) => set({ activeCategory }),
    reset: () => set({ activeCategory: null }),
  }),
);
