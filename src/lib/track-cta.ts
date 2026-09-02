/** Fire-and-forget POST to bump the global CTA click counter. */
export function trackCTA(): void {
  if (typeof window === "undefined") return;
  fetch("/api/site-stats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "cta" }),
    keepalive: true,
  }).catch(() => {});
}
