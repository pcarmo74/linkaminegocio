"use client";

import { useEffect } from "react";

export function PageViewTracker({ uid }: { uid: string }) {
  useEffect(() => {
    const key = `linkfig:viewed:${uid}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    fetch("/api/track/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid }),
      keepalive: true,
    }).catch(() => {});
  }, [uid]);

  return null;
}
