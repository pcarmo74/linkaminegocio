/**
 * Brand icon registry for link buttons.
 *
 * - `detectIconFromUrl(url)` looks at the URL hostname and returns a known
 *   icon key, or null if no match.
 * - `<LinkIcon iconKey="youtube" />` renders the right SVG.
 * - `ICON_OPTIONS` is the ordered list shown in the picker UI.
 *
 * All icons are inline SVGs that inherit `currentColor` so they look correct
 * on any button background (light, dark, soft, etc.).
 */

import type { ComponentType, SVGProps } from "react";

export type IconKey =
  | "youtube"
  | "instagram"
  | "tiktok"
  | "twitter"
  | "threads"
  | "facebook"
  | "linkedin"
  | "pinterest"
  | "skool"
  | "discord"
  | "twitch"
  | "github"
  | "calendly"
  | "substack"
  | "medium"
  | "spotify"
  | "apple-music"
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

const Twitter: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
  </svg>
);

const Threads: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.18 21.5h-.04c-3.06-.02-5.42-1.04-7-3.04-1.41-1.78-2.13-4.25-2.16-7.36 0-3.1.74-5.58 2.15-7.36 1.58-2 3.94-3.02 7-3.04h.04c2.34.02 4.3.62 5.82 1.79 1.42 1.1 2.43 2.66 2.97 4.65l-2 .57c-.94-3.4-3.34-5.13-7.13-5.16h-.07c-2.15.04-3.78.7-4.83 1.97-.99 1.18-1.5 2.91-1.51 5.13.01 2.22.52 3.95 1.51 5.13 1.05 1.27 2.68 1.93 4.83 1.97h.07c1.92-.01 3.19-.46 4.25-1.5.65-.65 1-1.42 1.16-2.27-.69-.45-1.62-.69-2.7-.69-1.51 0-2.51.6-2.51 1.6 0 .43.21.79.6 1.05-.46.16-1.02.21-1.59.05-1.46-.4-2.06-1.6-2.06-2.85 0-2.07 1.95-3.4 4.97-3.4 1.5 0 2.85.27 3.95.79.13-.86.13-1.7-.04-2.5l1.97-.43c.27 1.27.27 2.5 0 3.7 1.42.93 2.18 2.36 2.18 4.18 0 3.31-2.69 5.5-7.18 5.5z" />
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

const Pinterest: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 0a12 12 0 0 0-4.4 23.2c-.1-1-.2-2.5 0-3.6.2-.9 1.4-5.9 1.4-5.9s-.4-.7-.4-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.2 1.8 2.2 2.2 0 3.8-2.3 3.8-5.6 0-3-2.1-5-5.1-5-3.5 0-5.5 2.6-5.5 5.3 0 1 .4 2.2.9 2.8.1.1.1.2.1.3l-.3 1.4c-.1.2-.2.3-.4.2-1.5-.7-2.4-2.9-2.4-4.6 0-3.8 2.7-7.2 7.9-7.2 4.1 0 7.3 3 7.3 6.9 0 4.1-2.6 7.5-6.2 7.5-1.2 0-2.4-.6-2.7-1.4l-.7 2.9c-.3 1-1 2.3-1.5 3A12 12 0 1 0 12 0z" />
  </svg>
);

const Skool: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    {/* Stylised "sk" wordmark approximating the Skool logo */}
    <path d="M7.4 5.4c-2.3 0-3.9 1.3-3.9 3.2 0 1.7 1.1 2.5 3.5 3 1.6.4 2 .7 2 1.3 0 .7-.6 1-1.7 1-1.3 0-2.1-.4-2.5-1.4l-2.2.9c.6 1.7 2.3 2.6 4.7 2.6 2.5 0 4.2-1.3 4.2-3.3 0-1.7-1-2.5-3.4-3.1-1.7-.4-2.1-.6-2.1-1.2 0-.6.5-.9 1.4-.9 1 0 1.7.4 2 1.2l2.2-.8c-.6-1.5-2-2.5-4.2-2.5z" />
    <path d="M14.2 4.5h2.4v6.6l3.2-3.4h2.9l-3.7 3.8 3.9 4.9h-2.9l-3.4-4.5v4.5h-2.4V4.5z" />
  </svg>
);

const Discord: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.3 4.4A18.5 18.5 0 0 0 15.7 3l-.2.4a17 17 0 0 1 4.1 1.3 14.3 14.3 0 0 0-9.2-1.7L9.7 3a18.6 18.6 0 0 0-4.6 1.4C2 9 1.3 13.5 1.7 17.9a18.7 18.7 0 0 0 5.7 2.9l1.2-1.6c-.9-.3-1.7-.7-2.5-1.2l.4-.3a13.4 13.4 0 0 0 11 0l.4.3-2.5 1.2 1.2 1.6a18.6 18.6 0 0 0 5.7-2.9c.5-5.1-.7-9.6-2.5-13.5zM8.5 15.4c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3zm6.9 0c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3z" />
  </svg>
);

const Twitch: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M2.149 0L.508 4.105V20.36h5.61V24h3.276l3.282-3.64h4.464l6.143-6.144V0H2.149zm2.187 2.187h17.476v10.943l-3.282 3.282h-5.464l-3.282 3.282v-3.282H4.336V2.187zm6.554 10.943h2.187V6.553h-2.187v6.577zm5.464 0h2.187V6.553h-2.187v6.577z" />
  </svg>
);

const Github: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6V21c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2C5.6 7 5.2 5.8 5.7 4.2c0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.5 1.6.1 2.8 0 3.1.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
  </svg>
);

const Calendly: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM7 12h5v5H7v-5z" />
  </svg>
);

const Substack: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
  </svg>
);

const Medium: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M13.54 12c0 3.04-2.42 5.5-5.4 5.5S2.7 15.04 2.7 12s2.42-5.5 5.4-5.5 5.4 2.46 5.4 5.5zm5.93 0c0 2.86-1.21 5.18-2.7 5.18-1.5 0-2.7-2.32-2.7-5.18s1.21-5.18 2.7-5.18 2.7 2.32 2.7 5.18zM22 12c0 2.56-.42 4.64-.95 4.64s-.95-2.08-.95-4.64.42-4.64.95-4.64.95 2.08.95 4.64z" />
  </svg>
);

const Spotify: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.5 17.3a.8.8 0 0 1-1 .3c-2.8-1.7-6.4-2.1-10.6-1.1a.8.8 0 1 1-.4-1.4c4.6-1.1 8.5-.6 11.7 1.3.3.2.4.6.3.9zm1.5-3.3a.9.9 0 0 1-1.3.3c-3.3-2-8.2-2.6-12.1-1.5a.9.9 0 1 1-.5-1.7c4.4-1.3 9.9-.6 13.6 1.7.5.2.6.7.3 1.2zm.1-3.4c-3.9-2.3-10.4-2.5-14.1-1.4a1.1 1.1 0 1 1-.6-2c4.3-1.3 11.5-1.1 16 1.5.5.3.7 1 .4 1.5-.3.5-1 .7-1.7.4z" />
  </svg>
);

const AppleMusic: IconComponent = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M19.5 2A2.5 2.5 0 0 1 22 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 19.5v-15A2.5 2.5 0 0 1 4.5 2h15zm-9 4.5v8.6a2.5 2.5 0 1 0 1.5 2.3V9.7l5.5-1.5v5.4a2.5 2.5 0 1 0 1.5 2.3V5L10.5 6.5z" />
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
  twitter: {
    key: "twitter",
    label: "X / Twitter",
    hostPatterns: ["twitter.com", "x.com"],
    Component: Twitter,
  },
  threads: {
    key: "threads",
    label: "Threads",
    hostPatterns: ["threads.net"],
    Component: Threads,
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
  pinterest: {
    key: "pinterest",
    label: "Pinterest",
    hostPatterns: ["pinterest.com"],
    Component: Pinterest,
  },
  skool: {
    key: "skool",
    label: "Skool",
    hostPatterns: ["skool.com"],
    Component: Skool,
  },
  discord: {
    key: "discord",
    label: "Discord",
    hostPatterns: ["discord.com", "discord.gg"],
    Component: Discord,
  },
  twitch: {
    key: "twitch",
    label: "Twitch",
    hostPatterns: ["twitch.tv"],
    Component: Twitch,
  },
  github: {
    key: "github",
    label: "GitHub",
    hostPatterns: ["github.com"],
    Component: Github,
  },
  calendly: {
    key: "calendly",
    label: "Calendly",
    hostPatterns: ["calendly.com", "cal.com"],
    Component: Calendly,
  },
  substack: {
    key: "substack",
    label: "Substack",
    hostPatterns: ["substack.com"],
    Component: Substack,
  },
  medium: {
    key: "medium",
    label: "Medium",
    hostPatterns: ["medium.com"],
    Component: Medium,
  },
  spotify: {
    key: "spotify",
    label: "Spotify",
    hostPatterns: ["spotify.com", "open.spotify.com"],
    Component: Spotify,
  },
  "apple-music": {
    key: "apple-music",
    label: "Apple Music",
    hostPatterns: ["music.apple.com"],
    Component: AppleMusic,
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

interface LinkIconProps extends SVGProps<SVGSVGElement> {
  iconKey: IconKey;
}

export function LinkIcon({ iconKey, ...rest }: LinkIconProps) {
  const def = ICON_REGISTRY[iconKey];
  const Component = def?.Component ?? Website;
  return <Component aria-hidden="true" {...rest} />;
}
