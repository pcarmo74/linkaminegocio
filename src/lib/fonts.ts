import type { FontFamily } from "@/types/firebase";

export interface FontOption {
  id: FontFamily;
  label: string;
  cssFamily: string;
  googleUrl: string | null; // null = system/bundled font
  sampleClass: string;
}

export const FONT_OPTIONS: FontOption[] = [
  {
    id: "geist",
    label: "Geist Sans",
    cssFamily: "var(--font-geist-sans), sans-serif",
    googleUrl: null,
    sampleClass: "font-sans",
  },
  {
    id: "inter",
    label: "Inter",
    cssFamily: "'Inter', sans-serif",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    sampleClass: "",
  },
  {
    id: "playfair",
    label: "Playfair Display",
    cssFamily: "'Playfair Display', serif",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
    sampleClass: "",
  },
  {
    id: "space-grotesk",
    label: "Space Grotesk",
    cssFamily: "'Space Grotesk', sans-serif",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
    sampleClass: "",
  },
  {
    id: "dm-serif",
    label: "DM Serif Display",
    cssFamily: "'DM Serif Display', serif",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
    sampleClass: "",
  },
  {
    id: "jetbrains-mono",
    label: "JetBrains Mono",
    cssFamily: "'JetBrains Mono', monospace",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap",
    sampleClass: "",
  },
  {
    id: "nunito",
    label: "Nunito",
    cssFamily: "'Nunito', sans-serif",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap",
    sampleClass: "",
  },
  {
    id: "raleway",
    label: "Raleway",
    cssFamily: "'Raleway', sans-serif",
    googleUrl:
      "https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap",
    sampleClass: "",
  },
];

export const DEFAULT_FONT: FontFamily = "geist";

export function getFontOption(id: FontFamily): FontOption {
  return FONT_OPTIONS.find((f) => f.id === id) ?? FONT_OPTIONS[0];
}
