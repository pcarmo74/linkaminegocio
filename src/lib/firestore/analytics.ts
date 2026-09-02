import "server-only";

import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import type { StatsSummary } from "@/types";

export interface RoutingPerformanceRow {
  source: string;
  views: number;
  clicks: number;
  avgPosition: number;
  ctr: number;
}

export async function trackView(
  uid: string,
  source?: string | null,
  linkOrderShown?: string[] | null,
): Promise<void> {
  const db = getAdminDb();
  const batch = db.batch();

  const summaryRef = db
    .collection("users")
    .doc(uid)
    .collection("stats")
    .doc("summary");

  const mergeFields = ["views"];
  const summaryData: Record<string, unknown> = {
    views: FieldValue.increment(1),
  };
  if (source) {
    summaryData.viewsBySource = { [source]: FieldValue.increment(1) };
    mergeFields.push(`viewsBySource.${source}`);
  }
  batch.set(summaryRef, summaryData, { mergeFields });

  if (source) {
    const routingRef = db
      .collection("users")
      .doc(uid)
      .collection("routing_views")
      .doc();
    batch.set(routingRef, {
      profileId: uid,
      source,
      linkOrderShown: linkOrderShown ?? [],
      timestamp: FieldValue.serverTimestamp(),
    });
  }

  await batch.commit();
}

export async function trackClick(
  uid: string,
  linkId: string,
  source?: string | null,
  positionShown?: number | null,
): Promise<void> {
  const db = getAdminDb();
  const summaryRef = db
    .collection("users")
    .doc(uid)
    .collection("stats")
    .doc("summary");
  const linkRef = db
    .collection("users")
    .doc(uid)
    .collection("links")
    .doc(linkId);

  const batch = db.batch();
  batch.set(summaryRef, { clicks: FieldValue.increment(1) }, { merge: true });

  const linkUpdate: Record<string, unknown> = {
    clicks: FieldValue.increment(1),
  };
  if (source) {
    linkUpdate[`clicksBySource.${source}`] = FieldValue.increment(1);
  }
  batch.update(linkRef, linkUpdate);

  if (source) {
    const routingRef = db
      .collection("users")
      .doc(uid)
      .collection("routing_clicks")
      .doc();
    batch.set(routingRef, {
      profileId: uid,
      linkId,
      source,
      positionShown: positionShown ?? 0,
      timestamp: FieldValue.serverTimestamp(),
    });
  }

  await batch.commit();
}

export async function getRoutingPerformance(
  uid: string,
): Promise<RoutingPerformanceRow[]> {
  const db = getAdminDb();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [viewsSnap, clicksSnap] = await Promise.all([
    db
      .collection("users")
      .doc(uid)
      .collection("routing_views")
      .where("timestamp", ">=", thirtyDaysAgo)
      .get(),
    db
      .collection("users")
      .doc(uid)
      .collection("routing_clicks")
      .where("timestamp", ">=", thirtyDaysAgo)
      .get(),
  ]);

  const viewsBySource: Record<string, number> = {};
  for (const doc of viewsSnap.docs) {
    const source = doc.data().source as string;
    viewsBySource[source] = (viewsBySource[source] ?? 0) + 1;
  }

  const clicksBySource: Record<string, { count: number; totalPosition: number }> = {};
  for (const doc of clicksSnap.docs) {
    const data = doc.data();
    const source = data.source as string;
    if (!clicksBySource[source]) {
      clicksBySource[source] = { count: 0, totalPosition: 0 };
    }
    clicksBySource[source].count++;
    clicksBySource[source].totalPosition += (data.positionShown as number) ?? 0;
  }

  const allSources = new Set([
    ...Object.keys(viewsBySource),
    ...Object.keys(clicksBySource),
  ]);

  const rows: RoutingPerformanceRow[] = [];
  for (const source of allSources) {
    const views = viewsBySource[source] ?? 0;
    const clickData = clicksBySource[source] ?? { count: 0, totalPosition: 0 };
    rows.push({
      source,
      views,
      clicks: clickData.count,
      avgPosition:
        clickData.count > 0
          ? Math.round((clickData.totalPosition / clickData.count) * 10) / 10
          : 0,
      ctr: views > 0 ? Math.round((clickData.count / views) * 1000) / 10 : 0,
    });
  }

  return rows.sort((a, b) => b.views - a.views);
}

export async function getStatsSummary(uid: string): Promise<StatsSummary> {
  const db = getAdminDb();
  const snap = await db
    .collection("users")
    .doc(uid)
    .collection("stats")
    .doc("summary")
    .get();
  const data = snap.data() ?? {};
  return {
    views: typeof data.views === "number" ? data.views : 0,
    clicks: typeof data.clicks === "number" ? data.clicks : 0,
    viewsBySource:
      data.viewsBySource && typeof data.viewsBySource === "object"
        ? (data.viewsBySource as Record<string, number>)
        : {},
  };
}
