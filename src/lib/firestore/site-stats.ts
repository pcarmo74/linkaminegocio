import "server-only";

import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";

export interface SiteStats {
  views: number;
  ctaClicks: number;
}

const SITE_STATS_DOC = ["siteStats", "global"] as const;

function siteStatsRef() {
  return getAdminDb()
    .collection(SITE_STATS_DOC[0])
    .doc(SITE_STATS_DOC[1]);
}

export async function getSiteStats(): Promise<SiteStats> {
  const snap = await siteStatsRef().get();
  const data = snap.data() ?? {};
  return {
    views: typeof data.views === "number" ? data.views : 0,
    ctaClicks: typeof data.ctaClicks === "number" ? data.ctaClicks : 0,
  };
}

export async function incrementSiteView(): Promise<void> {
  await siteStatsRef().set(
    { views: FieldValue.increment(1) },
    { merge: true },
  );
}

export async function incrementCtaClick(): Promise<void> {
  await siteStatsRef().set(
    { ctaClicks: FieldValue.increment(1) },
    { merge: true },
  );
}
