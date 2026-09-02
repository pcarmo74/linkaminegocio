import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase/client";
import type { LinkDoc } from "@/types";

function linksCol(uid: string) {
  return collection(getFirebaseDb(), "users", uid, "links");
}

export async function listLinks(uid: string): Promise<LinkDoc[]> {
  const q = query(linksCol(uid), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as Omit<LinkDoc, "id">;
    return {
      id: d.id,
      ...data,
      clicksBySource: data.clicksBySource ?? {},
      iconKey: data.iconKey ?? null,
      routing: data.routing ?? { rules: [], defaultPriority: data.order ?? 0 },
    };
  });
}

export interface CreateLinkInput {
  title: string;
  url: string;
  order: number;
}

export async function createLink(
  uid: string,
  input: CreateLinkInput,
): Promise<string> {
  const ref = await addDoc(linksCol(uid), {
    title: input.title,
    url: input.url,
    order: input.order,
    active: true,
    clicks: 0,
    iconKey: null,
    routing: { rules: [], defaultPriority: input.order },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateLink(
  uid: string,
  linkId: string,
  data: Partial<Omit<LinkDoc, "id" | "createdAt" | "clicks">>,
): Promise<void> {
  const ref = doc(getFirebaseDb(), "users", uid, "links", linkId);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteLink(uid: string, linkId: string): Promise<void> {
  const ref = doc(getFirebaseDb(), "users", uid, "links", linkId);
  await deleteDoc(ref);
}

/**
 * Marks exactly one link as featured (unsets any previously featured link), or
 * clears all featured flags when linkId is null. Runs in a batch so the
 * "only one featured" invariant is preserved even under concurrent edits.
 */
export async function setFeaturedLink(
  uid: string,
  linkId: string | null,
): Promise<void> {
  const db = getFirebaseDb();
  const snap = await getDocs(linksCol(uid));
  const batch = writeBatch(db);
  snap.docs.forEach((d) => {
    const shouldBeFeatured = d.id === linkId;
    const currentlyFeatured = d.data().featured === true;
    if (shouldBeFeatured !== currentlyFeatured) {
      batch.update(d.ref, {
        featured: shouldBeFeatured,
        updatedAt: serverTimestamp(),
      });
    }
  });
  await batch.commit();
}

export async function reorderLinks(
  uid: string,
  orderedIds: string[],
): Promise<void> {
  const db = getFirebaseDb();
  const batch = writeBatch(db);
  orderedIds.forEach((linkId, index) => {
    const ref = doc(db, "users", uid, "links", linkId);
    batch.update(ref, { order: index, updatedAt: serverTimestamp() });
  });
  await batch.commit();
}
