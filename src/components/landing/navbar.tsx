"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Hide once the user is approaching the end of the hero section
      // (roughly ~80% of the viewport height scrolled).
      const threshold = window.innerHeight * 0.8;
      setHidden(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-6 z-50 px-4 transition-all duration-500 ease-out md:top-8 ${
        hidden
          ? "-translate-y-[150%] opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="container mx-auto max-w-6xl rounded-full bg-white shadow-lg ring-1 ring-black/5">
        <div className="flex h-20 items-center justify-between px-10">
          <Link
            href="/"
            className="font-heading text-3xl font-bold text-[#1E2330]"
          >
            LinkFig
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-xl font-medium text-[#1E2330] transition-opacity hover:opacity-60"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-xl font-medium text-[#1E2330] transition-opacity hover:opacity-60"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-xl font-medium text-[#1E2330] transition-opacity hover:opacity-60"
            >
              FAQ
            </a>
          </nav>

          {/* Desktop right side — auth buttons */}
          <div className="hidden items-center gap-2 md:flex">
            {!loading && (
              <>
                {user ? (
                  <Link
                    href="/dashboard"
                    className="rounded-full bg-[#1E2330] px-7 py-3 text-xl font-semibold text-white transition-transform hover:scale-[1.02]"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="rounded-full bg-[#F4F4F5] px-7 py-3 text-xl font-semibold text-[#1E2330] transition-colors hover:bg-[#E9E9EB]"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="rounded-full bg-[#1E2330] px-7 py-3 text-xl font-semibold text-white transition-transform hover:scale-[1.02]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="flex items-center justify-center text-[#1E2330] md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="border-t border-black/5 px-8 pb-6 pt-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setOpen(false)}
                className="text-xl font-medium text-[#1E2330] transition-opacity hover:opacity-60"
              >
                Features
              </a>
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="text-xl font-medium text-[#1E2330] transition-opacity hover:opacity-60"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={() => setOpen(false)}
                className="text-xl font-medium text-[#1E2330] transition-opacity hover:opacity-60"
              >
                FAQ
              </a>
              {!loading && (
                <>
                  {user ? (
                    <Link
                      href="/dashboard"
                      className="w-full rounded-full bg-[#1E2330] px-7 py-3 text-center text-xl font-semibold text-white"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/login"
                        className="w-full rounded-full bg-[#F4F4F5] px-7 py-3 text-center text-xl font-semibold text-[#1E2330]"
                      >
                        Log in
                      </Link>
                      <Link
                        href="/signup"
                        className="w-full rounded-full bg-[#1E2330] px-7 py-3 text-center text-xl font-semibold text-white"
                      >
                        Sign up
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
