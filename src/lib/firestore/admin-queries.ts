import "server-only";

import { getAdminDb } from "@/lib/firebase/admin";
import type { BusinessStatus, LinkDoc, UserDoc } from "@/types";
import { DEFAULT_THEME } from "@/lib/theme";
import { DEFAULT_BUSINESS_STATUS } from "@/lib/business-status";
import { normalizeUsername } from "@/lib/username";

interface ProfileData {
  user: UserDoc;
  links: LinkDoc[];
}

function serializeBusinessStatus(raw: unknown): BusinessStatus {
  const data = (raw as Record<string, unknown>) ?? {};
  return {
    enabled: data.enabled === true,
    type: (data.type as BusinessStatus["type"]) ?? DEFAULT_BUSINESS_STATUS.type,
    message: typeof data.message === "string" ? data.message : "",
    link: typeof data.link === "string" ? data.link : "",
    updatedAt:
      (data.updatedAt as { toDate?: () => Date } | undefined)?.toDate?.() ??
      new Date(),
  };
}

function serializeUser(uid: string, data: Record<string, unknown>): UserDoc {
  return {
    uid,
    email: typeof data.email === "string" ? data.email : "",
    username: typeof data.username === "string" ? data.username : "",
    displayName:
      typeof data.displayName === "string" ? data.displayName : "",
    bio: typeof data.bio === "string" ? data.bio : "",
    avatarUrl: (data.avatarUrl as string | null) ?? null,
    showEmail: data.showEmail === true,
    showHandle: data.showHandle !== false,
    theme: (data.theme as UserDoc["theme"]) ?? DEFAULT_THEME,
    fontFamily: (data.fontFamily as UserDoc["fontFamily"]) ?? "geist",
    emailCaptureEnabled: data.emailCaptureEnabled === true,
    emailCaptureMessage:
      typeof data.emailCaptureMessage === "string"
        ? data.emailCaptureMessage
        : "",
    businessStatus: serializeBusinessStatus(data.businessStatus),
    photoURL: (data.photoURL as string | null) ?? null,
    stripeCustomerId: (data.stripeCustomerId as string | null) ?? null,
    subscriptionStatus:
      (data.subscriptionStatus as UserDoc["subscriptionStatus"]) ?? "inactive",
    subscriptionPriceId: (data.subscriptionPriceId as string | null) ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function serializeLink(id: string, data: Record<string, unknown>): LinkDoc {
  const rawRouting = data.routing as
    | { rules?: unknown[]; defaultPriority?: number }
    | undefined;
  return {
    id,
    title: typeof data.title === "string" ? data.title : "",
    url: typeof data.url === "string" ? data.url : "",
    order: typeof data.order === "number" ? data.order : 0,
    active: data.active !== false,
    clicks: typeof data.clicks === "number" ? data.clicks : 0,
    clicksBySource:
      data.clicksBySource && typeof data.clicksBySource === "object"
        ? (data.clicksBySource as Record<string, number>)
        : {},
    iconKey: typeof data.iconKey === "string" ? data.iconKey : null,
    featured: data.featured === true,
    routing: {
      rules: Array.isArray(rawRouting?.rules)
        ? (rawRouting.rules as LinkDoc["routing"]["rules"])
        : [],
      defaultPriority:
        typeof rawRouting?.defaultPriority === "number"
          ? rawRouting.defaultPriority
          : typeof data.order === "number"
            ? data.order
            : 0,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getProfileByUsername(
  rawUsername: string,
): Promise<ProfileData | null> {
  const username = normalizeUsername(rawUsername);
  const db = getAdminDb();

  const usernameDoc = await db.collection("usernames").doc(username).get();
  if (!usernameDoc.exists) return null;
  const uid = usernameDoc.data()?.uid as string | undefined;
  if (!uid) return null;

  const [userSnap, linksSnap] = await Promise.all([
    db.collection("users").doc(uid).get(),
    db
      .collection("users")
      .doc(uid)
      .collection("links")
      .orderBy("order", "asc")
      .get(),
  ]);

  if (!userSnap.exists) return null;

  const user = serializeUser(uid, userSnap.data() ?? {});
  const links = linksSnap.docs
    .map((d) => serializeLink(d.id, d.data()))
    .filter((l) => l.active);

  return { user, links };
}
