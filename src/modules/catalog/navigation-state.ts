import { create } from "zustand";

import type { CatalogKind } from "./data";

type CatalogNavigationState = {
  activeCategories: Partial<Record<CatalogKind, string | null>>;
  setActiveCategory: (kind: CatalogKind, category: string | null) => void;
  reset: (kind: CatalogKind) => void;
};

export const useCatalogNavigation = create<CatalogNavigationState>((set) => ({
  activeCategories: {},
  setActiveCategory: (kind, category) =>
    set((state) => ({
      activeCategories: {
        ...state.activeCategories,
        [kind]: category,
      },
    })),
  reset: (kind) =>
    set((state) => ({
      activeCategories: {
        ...state.activeCategories,
        [kind]: null,
      },
    })),
}));
