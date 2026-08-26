import { useEffect, type ReactNode } from "react";
import { get } from "lodash";
import {
  customizeDefaults,
  hasCustomizeSearch,
  useCustomizeStore,
  useThemeStore,
  type CustomizeConfig,
  type Theme,
} from "#/store";
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

const presetTones = {
  vega: { light: 250, dark: 250, chroma: 0.17 },
  nova: { light: 215, dark: 215, chroma: 0.15 },
  maia: { light: 155, dark: 155, chroma: 0.14 },
  lyra: { light: 320, dark: 320, chroma: 0.16 },
  mira: { light: 42, dark: 42, chroma: 0.17 },
} as const;

const baseColorTones = {
  neutral: 0,
  gray: 240,
  zinc: 265,
  slate: 250,
  stone: 75,
  blue: 255,
  green: 150,
  rose: 10,
  orange: 48,
  violet: 290,
} as const;

const scaleTokens = {
  neutral: { light: 0.97, dark: 0.21, border: 0.91 },
  soft: { light: 0.985, dark: 0.18, border: 0.94 },
  "high-contrast": { light: 0.94, dark: 0.25, border: 0.86 },
} as const;

const fontStacks = {
  geist: '"Geist Variable", sans-serif',
  inter: "Inter, ui-sans-serif, system-ui, sans-serif",
  "dm-sans": '"DM Sans", ui-sans-serif, system-ui, sans-serif',
  "ibm-plex": '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
  system: "ui-sans-serif, system-ui, sans-serif",
} as const;

function applyCustomize(config: CustomizeConfig, mode: "light" | "dark") {
  const root = document.documentElement;
  const preset = get(
    presetTones,
    config.preset,
    presetTones[customizeDefaults.preset],
  ) as (typeof presetTones)[keyof typeof presetTones];
  const scale = get(
    scaleTokens,
    config.colorScale,
    scaleTokens[customizeDefaults.colorScale],
  ) as (typeof scaleTokens)[keyof typeof scaleTokens];
  const baseHue = get(
    baseColorTones,
    config.baseColor,
    baseColorTones[customizeDefaults.baseColor],
  ) as number;
  const hue = config.baseColor === "neutral" ? preset[mode] : baseHue;
  const primaryLightness = mode === "light" ? 0.34 : 0.72;
  const surface = mode === "light" ? scale.light : scale.dark;
  const primary = `oklch(${primaryLightness} ${preset.chroma} ${hue})`;
  const foreground = mode === "light" ? "oklch(0.145 0 0)" : "oklch(0.985 0 0)";
  const primaryForeground =
    mode === "light" ? "oklch(0.985 0 0)" : "oklch(0.145 0 0)";
  const border = mode === "light" ? scale.border : "0.32";
  const muted =
    mode === "light" ? `oklch(${surface} 0 0)` : `oklch(${surface + 0.04} 0 0)`;

  root.style.setProperty(
    "--background",
    mode === "light" ? "oklch(1 0 0)" : `oklch(${surface - 0.04} 0 0)`,
  );
  root.style.setProperty("--foreground", foreground);
  root.style.setProperty(
    "--card",
    mode === "light" ? "oklch(1 0 0)" : `oklch(${surface + 0.02} 0 0)`,
  );
  root.style.setProperty("--card-foreground", foreground);
  root.style.setProperty(
    "--popover",
    mode === "light" ? "oklch(1 0 0)" : `oklch(${surface + 0.02} 0 0)`,
  );
  root.style.setProperty("--popover-foreground", foreground);
  root.style.setProperty("--primary", primary);
  root.style.setProperty("--primary-foreground", primaryForeground);
  root.style.setProperty("--secondary", muted);
  root.style.setProperty("--secondary-foreground", foreground);
  root.style.setProperty("--muted", muted);
  root.style.setProperty(
    "--muted-foreground",
    mode === "light" ? "oklch(0.48 0 0)" : "oklch(0.74 0 0)",
  );
  root.style.setProperty("--accent", muted);
  root.style.setProperty("--accent-foreground", foreground);
  root.style.setProperty("--border", `oklch(${border} 0 0)`);
  root.style.setProperty("--input", `oklch(${border} 0 0)`);
  root.style.setProperty("--ring", primary);
  root.style.setProperty("--radius", config.radius);
  root.style.setProperty(
    "--font-sans",
    get(
      fontStacks,
      config.fontFamily,
      fontStacks[customizeDefaults.fontFamily],
    ) as string,
  );
}

const Index = ({ children }: { children: ReactNode }) => {
  const theme = useThemeStore((state) => state.theme);
  const customize = useCustomizeStore();
  const hydrateFromSearch = useCustomizeStore(
    (state) => state.hydrateFromSearch,
  );

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

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      hasCustomizeSearch(window.location.search)
    ) {
      hydrateFromSearch(window.location.search);
    }
  }, [hydrateFromSearch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      applyCustomize(customize, resolveTheme(theme));
    }
  }, [customize, theme]);

  return <>{children}</>;
};

export default Index;
