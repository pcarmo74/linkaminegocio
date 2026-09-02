import { NextResponse } from "next/server";
import { trackClick } from "@/lib/firestore/analytics";

export async function POST(request: Request) {
  try {
    const { uid, linkId, source, positionShown } = (await request.json()) as {
      uid?: string;
      linkId?: string;
      source?: string;
      positionShown?: number;
    };
    if (!uid || !linkId) {
      return NextResponse.json(
        { error: "Missing uid or linkId" },
        { status: 400 },
      );
    }
    await trackClick(uid, linkId, source ?? null, positionShown ?? null);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to track";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
