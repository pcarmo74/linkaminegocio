import type { BusinessStatus, BusinessStatusType } from "@/types/firebase";

export const BUSINESS_STATUS_OPTIONS: {
  id: BusinessStatusType;
  emoji: string;
  label: string;
}[] = [
  { id: "reconstruccion", emoji: "🏗️", label: "En reconstrucción" },
  { id: "demolicion", emoji: "🚧", label: "Edificio en demolición" },
  { id: "temporal", emoji: "📍", label: "Ubicación temporal" },
  { id: "buscando", emoji: "🔍", label: "Buscando ubicación permanente" },
  { id: "cerrado", emoji: "⏸️", label: "Cerrado temporalmente" },
  { id: "reabierto", emoji: "✅", label: "Reabrimos en nueva ubicación" },
];

export function getBusinessStatusOption(type: BusinessStatusType) {
  return (
    BUSINESS_STATUS_OPTIONS.find((opt) => opt.id === type) ??
    BUSINESS_STATUS_OPTIONS[0]
  );
}

export const DEFAULT_BUSINESS_STATUS: BusinessStatus = {
  enabled: false,
  type: "temporal",
  message: "",
  link: "",
  updatedAt: new Date(),
};
