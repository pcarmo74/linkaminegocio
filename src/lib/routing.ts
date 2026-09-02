import type { LinkDoc } from "@/types/firebase";

const REFERRER_MAP: Record<string, string> = {
  "youtube.com": "youtube",
  "youtu.be": "youtube",
  "m.youtube.com": "youtube",
  "t.co": "twitter",
  "x.com": "twitter",
  "twitter.com": "twitter",
  "linkedin.com": "linkedin",
  "lnkd.in": "linkedin",
  "instagram.com": "instagram",
  "l.instagram.com": "instagram",
  "tiktok.com": "tiktok",
  "vm.tiktok.com": "tiktok",
  "skool.com": "skool",
  "www.skool.com": "skool",
};

export function classifyReferrer(referrer: string): string {
  if (!referrer) return "direct";
  try {
    const hostname = new URL(referrer).hostname.replace(/^www\./, "");
    return REFERRER_MAP[hostname] ?? "other";
  } catch {
    return "other";
  }
}

export function detectSource(): string {
  if (typeof window === "undefined") return "direct";

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  if (utmSource) {
    const normalized = utmSource.toLowerCase().trim();
    const knownSources = [
      "youtube",
      "twitter",
      "linkedin",
      "instagram",
      "tiktok",
      "skool",
      "email",
    ];
    return knownSources.includes(normalized) ? normalized : "other";
  }

  return classifyReferrer(document.referrer);
}

export function applyRoutingRules(links: LinkDoc[], source: string): LinkDoc[] {
  if (source === "direct") return links;

  const hasAnyRules = links.some(
    (link) => link.routing?.rules?.some((r) => r.source === source),
  );
  if (!hasAnyRules) return links;

  return [...links].sort((a, b) => {
    const aRule = a.routing?.rules?.find((r) => r.source === source);
    const bRule = b.routing?.rules?.find((r) => r.source === source);

    const aPriority = aRule?.priority ?? a.routing?.defaultPriority ?? a.order;
    const bPriority = bRule?.priority ?? b.routing?.defaultPriority ?? b.order;

    if (aPriority !== bPriority) return aPriority - bPriority;
    return a.order - b.order;
  });
}
