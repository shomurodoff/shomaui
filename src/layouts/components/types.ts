import type { ReactNode } from "react";

export type ComponentSearchState = {
  value: string;
  onChange: (value: string) => void;
};

export type ComponentViewMode = "grid" | "list";

export type ComponentViewState = {
  value: ComponentViewMode;
  onChange: (value: ComponentViewMode) => void;
};

export type ComponentsLayoutProps = {
  children: ReactNode;
  componentSearch?: ComponentSearchState;
  componentView?: ComponentViewState;
};
