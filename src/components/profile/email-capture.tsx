"use client";

import { useState, useCallback } from "react";

interface Props {
  uid: string;
  message: string;
  buttonStyle: string;
}

export function EmailCapture({ uid, message, buttonStyle }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;

      setStatus("loading");
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid, email: email.trim() }),
        });
        if (!res.ok) throw new Error();
        setStatus("success");
        setEmail("");
      } catch {
        setStatus("error");
      }
    },
    [uid, email],
  );

  if (status === "success") {
    return (
      <div className="w-full rounded-xl border border-current/10 px-6 py-4 text-center text-sm opacity-90">
        Thanks for subscribing!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      {message && (
        <p className="text-center text-sm opacity-90">{message}</p>
      )}
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="min-w-0 flex-1 rounded-xl border border-current/20 bg-white/10 px-4 py-3 text-sm text-current placeholder:opacity-50 outline-none backdrop-blur-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`shrink-0 rounded-xl px-5 py-3 text-sm font-semibold transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 ${buttonStyle}`}
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-center text-xs opacity-70">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
