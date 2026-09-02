"use client";

import { useEffect, useState } from "react";

interface SiteStats {
  views: number;
  ctaClicks: number;
}

/** Fetches live site stats on mount and renders the V-/C- counter. */
export function SiteStatsDisplay() {
  const [stats, setStats] = useState<SiteStats | null>(null);

  useEffect(() => {
    // Small delay so we don't race our own incrementSiteView() POST.
    const timer = setTimeout(() => {
      fetch("/api/site-stats", { cache: "no-store" })
        .then((r) => r.json())
        .then((data: SiteStats) => setStats(data))
        .catch(() => {});
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const fmt = (n: number) => n.toLocaleString();
  const views = stats?.views ?? 0;
  const clicks = stats?.ctaClicks ?? 0;

  return (
    <span className="font-mono text-xs text-white/25">
      V-{fmt(views)} &middot; C-{fmt(clicks)}
    </span>
  );
}
