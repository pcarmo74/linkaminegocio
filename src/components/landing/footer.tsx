import Link from "next/link";
import { SiteStatsDisplay } from "@/components/landing/site-stats-display";

export function Footer() {
  return (
    <footer className="bg-[#1E2330] px-5 pb-4 pt-16 text-white">
      <div className="container mx-auto max-w-5xl">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="font-heading mb-4 text-lg font-bold">LinkFig</h3>
            <p className="text-sm text-white/60">
              The free alternative to Linktree. One link for everything.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white/80">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <a
                  href="#features"
                  className="transition-colors hover:text-white"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="transition-colors hover:text-white"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white/80">Legal</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          <span>&copy; {new Date().getFullYear()} LinkFig. It&apos;s Free.</span>
          <SiteStatsDisplay />
        </div>
      </div>
    </footer>
  );
}
