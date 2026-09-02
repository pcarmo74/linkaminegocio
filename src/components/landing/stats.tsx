import { CTALink } from "@/components/landing/cta-link";
import {
  ShareCardIllustration,
  MonetizeCardIllustration,
  GrowCardIllustration,
} from "@/components/landing/illustrations";
import type { ComponentType } from "react";

interface Card {
  Illustration: ComponentType<{ className?: string }>;
  title: string;
  bg: string;
}

const cards: Card[] = [
  {
    Illustration: ShareCardIllustration,
    title: "Share every type of content in limitless ways",
    bg: "bg-[#E9C0E9]",
  },
  {
    Illustration: MonetizeCardIllustration,
    title: "Collect emails, tips and make monetization simple",
    bg: "bg-[#D2E823]",
  },
  {
    Illustration: GrowCardIllustration,
    title: "Grow, own and engage your audience across all channels",
    bg: "bg-[#FFD966]",
  },
];

export function Stats() {
  return (
    <section className="bg-white px-5 py-24 dark:bg-[#0a0a0a]">
      <div className="container mx-auto max-w-5xl">
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map(({ Illustration, title, bg }) => (
            <CTALink
              key={title}
              href="/signup"
              className={`group flex flex-col items-center gap-4 rounded-3xl ${bg} p-8 transition-transform hover:scale-[1.02]`}
            >
              <Illustration className="h-28 w-auto" />
              <h3 className="font-heading text-center text-xl font-bold text-[#1E2330]">
                {title}
              </h3>
            </CTALink>
          ))}
        </div>
      </div>
    </section>
  );
}
