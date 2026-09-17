import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase/client";
import type { UserDoc } from "@/types";
import { DEFAULT_THEME } from "@/lib/theme";
import { DEFAULT_BUSINESS_STATUS } from "@/lib/business-status";
import { normalizeUsername } from "@/lib/username";

export async function createUserDoc(
  uid: string,
  data: Partial<UserDoc>,
): Promise<void> {
  const ref = doc(getFirebaseDb(), "users", uid);
  const base: Partial<UserDoc> = {
    uid,
    bio: "",
    avatarUrl: null,
    showEmail: false,
    showHandle: true,
    theme: DEFAULT_THEME,
    fontFamily: "geist",
    emailCaptureEnabled: false,
    emailCaptureMessage: "",
    businessStatus: DEFAULT_BUSINESS_STATUS,
    stripeCustomerId: null,
    subscriptionStatus: "inactive",
    subscriptionPriceId: null,
    photoURL: null,
    ...data,
  };
  await setDoc(ref, {
    ...base,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function getUserDoc(uid: string): Promise<UserDoc | null> {
  const ref = doc(getFirebaseDb(), "users", uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserDoc;
}

export async function updateUserDoc(
  uid: string,
  data: Partial<UserDoc>,
): Promise<void> {
  const ref = doc(getFirebaseDb(), "users", uid);
  await updateDoc(ref, {
    ...data,
    updatedAt: new Date(),
  });
}

/**
 * Atomically claim a username. Writes usernames/{username} → {uid}
 * and sets users/{uid}.username in a single transaction.
 * Throws if the username is already taken.
 */
export async function claimUsername(
  uid: string,
  rawUsername: string,
): Promise<void> {
  const username = normalizeUsername(rawUsername);
  const db = getFirebaseDb();
  const usernameRef = doc(db, "usernames", username);
  const userRef = doc(db, "users", uid);

  await runTransaction(db, async (tx) => {
    const existing = await tx.get(usernameRef);
    if (existing.exists()) {
      throw new Error("Ese nombre de usuario ya fue tomado.");
    }
    tx.set(usernameRef, { uid, createdAt: new Date() });
    tx.update(userRef, { username, updatedAt: new Date() });
  });
}

export async function isUsernameAvailable(
  rawUsername: string,
): Promise<boolean> {
  const username = normalizeUsername(rawUsername);
  const ref = doc(getFirebaseDb(), "usernames", username);
  const snap = await getDoc(ref);
  return !snap.exists();
}

export async function getUserByUsername(
  rawUsername: string,
): Promise<UserDoc | null> {
  const username = normalizeUsername(rawUsername);
  const db = getFirebaseDb();
  const q = query(
    collection(db, "users"),
    where("username", "==", username),
    limit(1),
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as UserDoc;
}
