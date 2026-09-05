import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email, displayName } = (await request.json()) as {
      email?: string;
      displayName?: string;
    };

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    if (!displayName || typeof displayName !== "string") {
      return NextResponse.json(
        { error: "Missing displayName" },
        { status: 400 },
      );
    }

    await sendWelcomeEmail(email, displayName);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send welcome email";
    console.error("send-welcome-email failed:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
