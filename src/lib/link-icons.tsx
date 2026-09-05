/**
 * Brand icon registry for link buttons.
 *
 * - `detectIconFromUrl(url)` looks at the URL hostname and returns a known
 *   icon key, or null if no match.
 * - `<LinkIcon iconKey="youtube" />` renders the right SVG.
 * - `ICON_OPTIONS` is the ordered list shown in the picker UI.
 *
 * Most icons are inline SVGs that inherit `currentColor` so they look correct
 * on any button background (light, dark, soft, etc.). The three payment-app
 * badges (Nequi, Bancolombia, Daviplata) are the exception — they render as
 * fixed-color brand badges instead, since a colored badge is how those apps
 * are recognized, not a currentColor-tinted mark.
 */

import type { ComponentType, SVGProps } from "react";

export type IconKey =
  | "youtube"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "linkedin"
  | "whatsapp"
  | "location"
  | "menu"
  | "bookings"
  | "catalog"
  | "service-request"
  | "portfolio"
  | "nequi"
  | "bancolombia"
  | "daviplata"
  | "email"
  | "phone"
  | "website";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface IconDefinition {
  key: IconKey;
  label: string;
  /** Hostname patterns that should auto-detect to this icon. */
  hostPatterns: string[];
  Component: IconComponent;
}

/* ---------- SVG components ---------- */

const Youtube: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2C0 8 0 12 0 12s0 4 .5 5.8a3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 16 24 12 24 12s0-4-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
  </svg>
);

const Instagram: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.7s0 3.5-.1 4.7c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.4-2.2-.1-1.2-.1-1.6-.1-4.7s0-3.5.1-4.7c.1-1.2.2-1.8.4-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1zm0 2.2c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.3-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.3.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.3.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.3-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.7a3.9 3.9 0 1 1 0 7.8 3.9 3.9 0 0 1 0-7.8zm0 6.4a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm5-6.5a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0z" />
  </svg>
);

const Tiktok: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M19.6 6.7a5.5 5.5 0 0 1-3.4-1.2 5.4 5.4 0 0 1-2.1-3.7h-3.5v13.6a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.2a6.2 6.2 0 0 0-.8 0 6.2 6.2 0 1 0 6.2 6.2V9a8.8 8.8 0 0 0 5.5 1.9V7.4a5.5 5.5 0 0 1 0-.7z" />
  </svg>
);

const Facebook: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v6.9C18.3 21.1 22 17 22 12z" />
  </svg>
);

const Linkedin: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5V9h3v10zM6.5 7.7a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4zM19 19h-3v-5c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6V19h-3V9h2.9v1.4h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.6 2 3.6 4.7V19z" />
  </svg>
);

const Whatsapp: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.32 4.94L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.11c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.74-2.09 1-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.61-.07.16-.19.68-.79.86-1.06.19-.28.37-.23.61-.14.24.09 1.55.73 1.82.86.27.14.45.2.51.31.07.11.07.63-.17 1.31z" />
  </svg>
);

const Location: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 10c0 6.5-9 12-9 12s-9-5.5-9-12a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Menu: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 2v7c0 1.1.9 2 2 2s2-.9 2-2V2" />
    <path d="M5 11v11" />
    <path d="M19 2c-2 3-3 5-3 8a3 3 0 0 0 3 3v9" />
  </svg>
);

const Bookings: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
  </svg>
);

const Catalog: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const ServiceRequest: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
  </svg>
);

const Portfolio: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="3" width="14" height="14" rx="2" />
    <rect x="7" y="7" width="14" height="14" rx="2" />
  </svg>
);

const Nequi: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect x="1" y="1" width="22" height="22" rx="6" fill="#FF0075" />
    <text
      x="12"
      y="16.5"
      textAnchor="middle"
      fontSize="13"
      fontWeight="700"
      fontFamily="system-ui, sans-serif"
      fill="#ffffff"
    >
      N
    </text>
  </svg>
);

const Bancolombia: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect x="1" y="1" width="22" height="22" rx="6" fill="#FFDD00" />
    <text
      x="12"
      y="16.5"
      textAnchor="middle"
      fontSize="13"
      fontWeight="700"
      fontFamily="system-ui, sans-serif"
      fill="#1a1a1a"
    >
      B
    </text>
  </svg>
);

const Daviplata: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect x="1" y="1" width="22" height="22" rx="6" fill="#EE1C25" />
    <text
      x="12"
      y="16.5"
      textAnchor="middle"
      fontSize="13"
      fontWeight="700"
      fontFamily="system-ui, sans-serif"
      fill="#ffffff"
    >
      D
    </text>
  </svg>
);

const Email: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const Phone: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Website: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/* ---------- Registry ---------- */

const ICON_REGISTRY: Record<IconKey, IconDefinition> = {
  youtube: {
    key: "youtube",
    label: "YouTube",
    hostPatterns: ["youtube.com", "youtu.be"],
    Component: Youtube,
  },
  instagram: {
    key: "instagram",
    label: "Instagram",
    hostPatterns: ["instagram.com"],
    Component: Instagram,
  },
  tiktok: {
    key: "tiktok",
    label: "TikTok",
    hostPatterns: ["tiktok.com"],
    Component: Tiktok,
  },
  facebook: {
    key: "facebook",
    label: "Facebook",
    hostPatterns: ["facebook.com", "fb.com"],
    Component: Facebook,
  },
  linkedin: {
    key: "linkedin",
    label: "LinkedIn",
    hostPatterns: ["linkedin.com"],
    Component: Linkedin,
  },
  whatsapp: {
    key: "whatsapp",
    label: "WhatsApp",
    hostPatterns: ["wa.me", "whatsapp.com"],
    Component: Whatsapp,
  },
  location: {
    key: "location",
    label: "Ubicación",
    hostPatterns: ["maps.google.com", "goo.gl", "maps.app.goo.gl"],
    Component: Location,
  },
  menu: {
    key: "menu",
    label: "Menú",
    hostPatterns: [],
    Component: Menu,
  },
  bookings: {
    key: "bookings",
    label: "Reservas",
    hostPatterns: ["calendly.com", "cal.com"],
    Component: Bookings,
  },
  catalog: {
    key: "catalog",
    label: "Catálogo",
    hostPatterns: [],
    Component: Catalog,
  },
  "service-request": {
    key: "service-request",
    label: "Solicitar servicio",
    hostPatterns: [],
    Component: ServiceRequest,
  },
  portfolio: {
    key: "portfolio",
    label: "Portafolio",
    hostPatterns: [],
    Component: Portfolio,
  },
  nequi: {
    key: "nequi",
    label: "Nequi",
    hostPatterns: [],
    Component: Nequi,
  },
  bancolombia: {
    key: "bancolombia",
    label: "Bancolombia",
    hostPatterns: [],
    Component: Bancolombia,
  },
  daviplata: {
    key: "daviplata",
    label: "Daviplata",
    hostPatterns: [],
    Component: Daviplata,
  },
  email: {
    key: "email",
    label: "Email",
    hostPatterns: [],
    Component: Email,
  },
  phone: {
    key: "phone",
    label: "Phone",
    hostPatterns: [],
    Component: Phone,
  },
  website: {
    key: "website",
    label: "Website",
    hostPatterns: [],
    Component: Website,
  },
};

/** Ordered list for the picker UI. */
export const ICON_OPTIONS: IconDefinition[] = Object.values(ICON_REGISTRY);

/**
 * Try to detect a brand icon from the URL. Returns the icon key, or null when
 * no known platform matches. Also handles `mailto:` and `tel:` links.
 */
export function detectIconFromUrl(rawUrl: string): IconKey | null {
  if (!rawUrl) return null;
  const url = rawUrl.trim().toLowerCase();
  if (url.startsWith("mailto:")) return "email";
  if (url.startsWith("tel:")) return "phone";

  let host: string;
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }

  for (const def of Object.values(ICON_REGISTRY)) {
    if (def.hostPatterns.some((p) => host === p || host.endsWith(`.${p}`))) {
      return def.key;
    }
  }
  return null;
}

/**
 * Resolve which icon to render for a link.
 * Manual override beats auto-detect; falls back to "website" globe.
 */
export function resolveIconKey(
  url: string,
  manualIconKey?: IconKey | null,
): IconKey {
  if (manualIconKey) return manualIconKey;
  return detectIconFromUrl(url) ?? "website";
}

/**
 * Colombian payment apps that primarily identify personal accounts by phone
 * number rather than a URL — Nequi, Bancolombia and DaviPlata all work via
 * phone number or in-app QR for regular users; only registered business
 * accounts get a real https:// payment-link URL. Editors and renderers use
 * this to branch between phone-number and URL handling for these icons.
 */
export const PHONE_BASED_ICON_KEYS: readonly IconKey[] = [
  "nequi",
  "bancolombia",
  "daviplata",
];

export function isPhoneBasedIcon(
  iconKey: IconKey | null | undefined,
): boolean {
  return !!iconKey && PHONE_BASED_ICON_KEYS.includes(iconKey);
}

interface LinkIconProps extends SVGProps<SVGSVGElement> {
  iconKey: IconKey;
}

export function LinkIcon({ iconKey, ...rest }: LinkIconProps) {
  const def = ICON_REGISTRY[iconKey];
  const Component = def?.Component ?? Website;
  return <Component aria-hidden="true" {...rest} />;
}
