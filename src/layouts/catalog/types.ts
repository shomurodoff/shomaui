import type { ReactNode } from "react";

import type { CatalogKind } from "#/modules/catalog/data";

export type CatalogSearchState = {
  value: string;
  onChange: (value: string) => void;
};

export type CatalogViewMode = "grid" | "list";

export type CatalogViewState = {
  value: CatalogViewMode;
  onChange: (value: CatalogViewMode) => void;
};

export type CatalogLayoutProps = {
  kind: CatalogKind;
  children: ReactNode;
  search?: CatalogSearchState;
  view?: CatalogViewState;
};
