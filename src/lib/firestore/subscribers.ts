import "server-only";

import { getAdminDb } from "@/lib/firebase/admin";
import type { SubscriberDoc } from "@/types";

export async function addSubscriber(
  uid: string,
  email: string,
): Promise<void> {
  const db = getAdminDb();
  const ref = db
    .collection("users")
    .doc(uid)
    .collection("subscribers")
    .doc(email);

  const existing = await ref.get();
  if (existing.exists) return;

  await ref.set({ email, subscribedAt: new Date() });
}

export async function getSubscribers(uid: string): Promise<SubscriberDoc[]> {
  const db = getAdminDb();
  const snap = await db
    .collection("users")
    .doc(uid)
    .collection("subscribers")
    .orderBy("subscribedAt", "desc")
    .get();

  return snap.docs.map((d) => {
    const data = d.data();
    return {
      email: data.email as string,
      subscribedAt: data.subscribedAt?.toDate?.() ?? new Date(),
    };
  });
}

export async function getSubscriberCount(uid: string): Promise<number> {
  const db = getAdminDb();
  const snap = await db
    .collection("users")
    .doc(uid)
    .collection("subscribers")
    .count()
    .get();

  return snap.data().count;
}
