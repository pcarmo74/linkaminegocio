import { NextResponse } from "next/server";
import {
  getSiteStats,
  incrementSiteView,
  incrementCtaClick,
} from "@/lib/firestore/site-stats";

export async function GET() {
  try {
    const stats = await getSiteStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ views: 0, ctaClicks: 0 }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { type?: string };
    if (body.type === "view") {
      await incrementSiteView();
    } else if (body.type === "cta") {
      await incrementCtaClick();
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
