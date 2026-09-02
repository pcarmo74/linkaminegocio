import { CTALink } from "@/components/landing/cta-link";

export function CTA() {
  return (
    <section className="bg-[#D2E823] px-5 py-24 text-center md:py-32">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1E2330] sm:text-4xl md:text-5xl">
          Join creators using the free internet today!
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[#1E2330]/70">
          Claim your username in 30 seconds. No credit card, no paywalls, no
          limits — just your content, your audience, your way.
        </p>
        <CTALink
          href="/signup"
          className="mt-8 inline-flex rounded-xl bg-[#1E2330] px-10 py-4 text-base font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Claim your LinkFig
        </CTALink>
      </div>
    </section>
  );
}
