import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase/admin";
import { normalizeUsername, validateUsername } from "@/lib/username";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const raw = url.searchParams.get("name") ?? "";
  const error = validateUsername(raw);
  if (error) {
    return NextResponse.json({ available: false, error }, { status: 200 });
  }

  const username = normalizeUsername(raw);
  const snap = await getAdminDb().collection("usernames").doc(username).get();

  return NextResponse.json({ available: !snap.exists });
}
