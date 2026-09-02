import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getSubscribers } from "@/lib/firestore/subscribers";

export async function GET() {
  const headersList = await headers();
  const uid = headersList.get("x-user-uid");

  if (!uid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscribers = await getSubscribers(uid);
  return NextResponse.json({ subscribers });
}
