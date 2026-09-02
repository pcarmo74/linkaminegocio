"use client";

import { useEffect } from "react";

/**
 * Fires a single page view to /api/site-stats per browser session.
 * Uses sessionStorage to avoid double-counting refreshes.
 */
export function SiteViewTracker() {
  useEffect(() => {
    const KEY = "linkfig:site-viewed";
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, "1");
    fetch("/api/site-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "view" }),
      keepalive: true,
    }).catch(() => {});
  }, []);
  return null;
}
