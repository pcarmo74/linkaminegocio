import type { ProfileTheme, ThemePreset } from "@/types/firebase";

export const THEME_PRESETS: Record<ThemePreset, ProfileTheme> = {
  minimal: {
    preset: "minimal",
    backgroundColor: "#ffffff",
    backgroundGradient: null,
    buttonStyle: "outline",
    buttonColor: "#111111",
    buttonTextColor: "#111111",
    textColor: "#111111",
  },
  sunset: {
    preset: "sunset",
    backgroundColor: "#ff7e5f",
    backgroundGradient: "linear-gradient(180deg, #ff7e5f 0%, #feb47b 100%)",
    buttonStyle: "filled",
    buttonColor: "#ffffff",
    buttonTextColor: "#b8360a",
    textColor: "#ffffff",
  },
  neon: {
    preset: "neon",
    backgroundColor: "#0a0a0a",
    backgroundGradient:
      "radial-gradient(ellipse at top, #1a0033 0%, #0a0a0a 70%)",
    buttonStyle: "filled",
    buttonColor: "#39ff14",
    buttonTextColor: "#0a0a0a",
    textColor: "#e0ffe0",
  },
  mono: {
    preset: "mono",
    backgroundColor: "#111111",
    backgroundGradient: null,
    buttonStyle: "outline",
    buttonColor: "#ffffff",
    buttonTextColor: "#ffffff",
    textColor: "#ffffff",
  },
  pastel: {
    preset: "pastel",
    backgroundColor: "#fce7f3",
    backgroundGradient: "linear-gradient(180deg, #fce7f3 0%, #ddd6fe 100%)",
    buttonStyle: "soft",
    buttonColor: "#ffffff",
    buttonTextColor: "#6b21a8",
    textColor: "#6b21a8",
  },
  aurora: {
    preset: "aurora",
    backgroundColor: "#e0c3fc",
    backgroundGradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 50%, #f5e6ff 100%)",
    buttonStyle: "soft",
    buttonColor: "rgba(255,255,255,0.65)",
    buttonTextColor: "#3b1f6e",
    textColor: "#2d3436",
  },
  brutalist: {
    preset: "brutalist",
    backgroundColor: "#ffffff",
    backgroundGradient: null,
    buttonStyle: "filled",
    buttonColor: "#ff6b6b",
    buttonTextColor: "#000000",
    textColor: "#000000",
  },
  midnight: {
    preset: "midnight",
    backgroundColor: "#0f0f1a",
    backgroundGradient: "radial-gradient(ellipse at top, #1a1a2e 0%, #0f0f1a 60%)",
    buttonStyle: "soft",
    buttonColor: "rgba(255,255,255,0.08)",
    buttonTextColor: "#e8e8e8",
    textColor: "#e8e8e8",
  },
  earth: {
    preset: "earth",
    backgroundColor: "#f5f0eb",
    backgroundGradient: null,
    buttonStyle: "outline",
    buttonColor: "#8b7355",
    buttonTextColor: "#3d2b1f",
    textColor: "#2c2c2c",
  },
};

export const DEFAULT_THEME: ProfileTheme = THEME_PRESETS.minimal;

export const THEME_OPTIONS: { id: ThemePreset; label: string }[] = [
  { id: "minimal", label: "Minimalista" },
  { id: "sunset", label: "Atardecer" },
  { id: "neon", label: "Neón" },
  { id: "mono", label: "Mono" },
  { id: "pastel", label: "Pastel" },
  { id: "aurora", label: "Aurora" },
  { id: "brutalist", label: "Brutalista" },
  { id: "midnight", label: "Medianoche" },
  { id: "earth", label: "Tierra" },
];

export interface ProfileCssVars {
  background: string;
  color: string;
  "--btn-bg": string;
  "--btn-fg": string;
  "--btn-border": string;
}

export function themeToCssVars(theme: ProfileTheme): React.CSSProperties {
  return {
    background: theme.backgroundGradient ?? theme.backgroundColor,
    color: theme.textColor,
    ["--btn-bg" as string]: theme.buttonColor,
    ["--btn-fg" as string]: theme.buttonTextColor,
    ["--btn-border" as string]: theme.buttonColor,
  };
}

export function buttonClassForStyle(style: ProfileTheme["buttonStyle"]): string {
  switch (style) {
    case "filled":
      return "bg-[var(--btn-bg)] text-[var(--btn-fg)] border border-transparent";
    case "outline":
      return "bg-transparent text-[var(--btn-fg)] border-2 border-[var(--btn-border)]";
    case "soft":
      return "bg-[var(--btn-bg)] text-[var(--btn-fg)] border border-transparent shadow-lg backdrop-blur-sm";
  }
}
