import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getRoutingPerformance } from "@/lib/firestore/analytics";

export async function GET() {
  const headersList = await headers();
  const uid = headersList.get("x-user-uid");

  if (!uid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await getRoutingPerformance(uid);
  return NextResponse.json({ rows });
}
