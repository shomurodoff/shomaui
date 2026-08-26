import { useEffect, type ReactNode } from "react";
import { useThemeStore, type Theme } from "#/store";
import "./styles.css";

const colorSchemeQuery = "(prefers-color-scheme: dark)";

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme !== "system") {
    return theme;
  }

  return window.matchMedia(colorSchemeQuery).matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const resolvedTheme = resolveTheme(theme);
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
  root.style.colorScheme = resolvedTheme;
}

const Index = ({ children }: { children: ReactNode }) => {
  const {theme} = useThemeStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia(colorSchemeQuery);
    const updateTheme = () => applyTheme(theme);

    updateTheme();

    if (theme !== "system") {
      return;
    }

    mediaQuery.addEventListener("change", updateTheme);

    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, [theme]);

  return <>{children}</>;
};

export default Index;
