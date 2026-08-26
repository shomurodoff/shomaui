import { create } from "zustand";
import { persist } from "zustand/middleware";
import { get, includes, keys, map, some } from "lodash";

export const customizePresets = [
  "vega",
  "nova",
  "maia",
  "lyra",
  "mira",
] as const;
export const customizeBaseColors = [
  "neutral",
  "gray",
  "zinc",
  "slate",
  "stone",
  "blue",
  "green",
  "rose",
  "orange",
  "violet",
] as const;
export const customizeColorScales = [
  "neutral",
  "soft",
  "high-contrast",
] as const;
export const customizeRadii = [
  "0",
  "0.375rem",
  "0.625rem",
  "0.875rem",
  "1rem",
] as const;
export const customizeFonts = [
  "geist",
  "inter",
  "dm-sans",
  "ibm-plex",
  "system",
] as const;

export type CustomizeConfig = {
  preset: (typeof customizePresets)[number];
  baseColor: (typeof customizeBaseColors)[number];
  colorScale: (typeof customizeColorScales)[number];
  radius: (typeof customizeRadii)[number];
  fontFamily: (typeof customizeFonts)[number];
};

export const customizeDefaults: CustomizeConfig = {
  preset: "vega",
  baseColor: "neutral",
  colorScale: "neutral",
  radius: "0.625rem",
  fontFamily: "geist",
};

const configKeys = ["preset", "base", "scale", "radius", "font"] as const;

const isAllowed = <T extends readonly string[]>(value: string, values: T) =>
  includes(values, value);

export function parseCustomizeSearch(search: string): Partial<CustomizeConfig> {
  const params = new URLSearchParams(search);
  const parsed: Partial<CustomizeConfig> = {};

  const values = map(configKeys, (key) => ({ key, value: params.get(key) }));
  const preset = get(values, "0.value");
  const baseColor = get(values, "1.value");
  const colorScale = get(values, "2.value");
  const radius = get(values, "3.value");
  const fontFamily = get(values, "4.value");

  if (preset && isAllowed(preset, customizePresets))
    parsed.preset = preset as CustomizeConfig["preset"];
  if (baseColor && isAllowed(baseColor, customizeBaseColors)) {
    parsed.baseColor = baseColor as CustomizeConfig["baseColor"];
  }
  if (colorScale && isAllowed(colorScale, customizeColorScales)) {
    parsed.colorScale = colorScale as CustomizeConfig["colorScale"];
  }
  if (radius && isAllowed(radius, customizeRadii))
    parsed.radius = radius as CustomizeConfig["radius"];
  if (fontFamily && isAllowed(fontFamily, customizeFonts)) {
    parsed.fontFamily = fontFamily as CustomizeConfig["fontFamily"];
  }

  return parsed;
}

export function getCustomizeShareUrl(config: CustomizeConfig) {
  if (typeof window === "undefined") return "";

  const url = new URL(window.location.href);
  const values = {
    preset: config.preset,
    base: config.baseColor,
    scale: config.colorScale,
    radius: config.radius,
    font: config.fontFamily,
  };

  map(values, (value, key) => url.searchParams.set(key, value));
  return url.toString();
}

type CustomizeStore = CustomizeConfig & {
  setConfig: (config: Partial<CustomizeConfig>) => void;
  hydrateFromSearch: (search: string) => void;
  reset: () => void;
};

export const useCustomizeStore = create<CustomizeStore>()(
  persist(
    (set) => ({
      ...customizeDefaults,
      setConfig: (config) => set(config),
      hydrateFromSearch: (search) => {
        const parsed = parseCustomizeSearch(search);
        if (keys(parsed).length) set(parsed);
      },
      reset: () => set(customizeDefaults),
    }),
    {
      name: "shomaui-customize",
      partialize: (state) => ({
        preset: state.preset,
        baseColor: state.baseColor,
        colorScale: state.colorScale,
        radius: state.radius,
        fontFamily: state.fontFamily,
      }),
    },
  ),
);

export const hasCustomizeSearch = (search: string) =>
  some(configKeys, (key) => new URLSearchParams(search).has(key));
