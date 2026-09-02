"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneMockup } from "@/components/landing/illustrations";
import { trackCTA } from "@/lib/track-cta";

export function Hero() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackCTA();
    if (username.trim()) {
      router.push(`/signup?username=${encodeURIComponent(username.trim())}`);
    } else {
      router.push("/signup");
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#D2E823] px-5 pb-20 pt-36 md:pb-28 md:pt-44 lg:pb-36 lg:pt-52">
      <div className="container mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Left column — text + form */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-[#1E2330] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            A link in bio{" "}
            <br className="hidden sm:block" />
            built for you.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#1E2330]/80 md:text-xl lg:mx-0">
            Join creators, influencers and small businesses using LinkFig for
            their link in bio. One link to help you share everything you create,
            curate and sell online — completely free.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row lg:mx-0"
          >
            <div className="flex flex-1 items-center rounded-xl bg-white px-4 py-3 shadow-sm">
              <span className="mr-1 text-sm font-medium text-[#1E2330]/50">
                linkfig.app/
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="yourname"
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#1E2330] outline-none placeholder:text-[#1E2330]/30"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-[#1E2330] px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Claim your LinkFig
            </button>
          </form>

          <p className="mt-4 text-sm text-[#1E2330]/60">
            Free &middot; No credit card required
          </p>
        </div>

        {/* Right column — phone mockup */}
        <div className="relative flex flex-shrink-0 items-center justify-center">
          {/* Glow behind phone */}
          <div className="absolute h-72 w-72 rounded-full bg-white/40 blur-3xl" />
          <PhoneMockup className="relative z-10 w-56 drop-shadow-2xl sm:w-64 lg:w-72" />
        </div>
      </div>
    </section>
  );
}
