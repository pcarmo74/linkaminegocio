import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/firestore/subscribers";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { uid, email } = (await request.json()) as {
      uid?: string;
      email?: string;
    };

    if (!uid || typeof uid !== "string") {
      return NextResponse.json({ error: "Missing uid" }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    await addSubscriber(uid, email.toLowerCase().trim());
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Subscribe failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
