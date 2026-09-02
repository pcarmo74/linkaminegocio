import { NextResponse } from "next/server";
import { trackView } from "@/lib/firestore/analytics";

export async function POST(request: Request) {
  try {
    const { uid, source, linkOrderShown } = (await request.json()) as {
      uid?: string;
      source?: string;
      linkOrderShown?: string[];
    };
    if (!uid || typeof uid !== "string") {
      return NextResponse.json({ error: "Missing uid" }, { status: 400 });
    }
    await trackView(uid, source ?? null, linkOrderShown ?? null);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to track";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
