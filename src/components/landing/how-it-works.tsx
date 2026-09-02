import { CTALink } from "@/components/landing/cta-link";

export function HowItWorks() {
  return (
    <section className="bg-[#1E2330] px-5 py-24 text-center md:py-32">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          The fast, friendly and free link in bio tool.
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTALink
            href="/signup"
            className="inline-flex rounded-xl bg-[#D2E823] px-8 py-3 text-sm font-semibold text-[#1E2330] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create your LinkFig
          </CTALink>
          <a
            href="#pricing"
            className="inline-flex rounded-xl border border-white/20 px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore all features
          </a>
        </div>
      </div>
    </section>
  );
}
