const testimonials = [
  {
    initials: "JM",
    quote:
      "I switched from Linktree to LinkFig and couldn't believe all the premium features are actually free. Custom themes, analytics, email capture — I was paying $15/mo for this before.",
    name: "Jessica M.",
    role: "Content Creator",
  },
  {
    initials: "DC",
    quote:
      "With LinkFig, I can see the monetization of my following becoming a full-time thing. The email capture alone has helped me build a real subscriber list.",
    name: "David C.",
    role: "Founder, Mechanically Inclined",
  },
  {
    initials: "RL",
    quote:
      "LinkFig simplifies the process for creators to share multiple parts of themselves in one inclusive link. The QR code feature is a game changer for my merch.",
    name: "Riley L.",
    role: "YouTuber & Content Creator",
  },
  {
    initials: "PC",
    quote:
      "LinkFig helps my customers get where they need to go. It's fast, easy, and the custom fonts let me match my brand perfectly.",
    name: "Patti C.",
    role: "Founder & Pastry Chef",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[#E9C0E9] px-5 py-24 dark:bg-[#2a1a2e]">
      <div className="container mx-auto max-w-5xl">
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map(({ initials, quote, name, role }) => (
            <div
              key={name}
              className="flex flex-col rounded-3xl bg-white p-8 dark:bg-[#1E2330]"
            >
              <blockquote className="flex-1 text-base leading-relaxed text-[#1E2330]/80 dark:text-white/80">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D2E823] text-sm font-bold text-[#1E2330]">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E2330] dark:text-white">
                    {name}
                  </p>
                  <p className="text-xs text-[#1E2330]/60 dark:text-white/60">
                    {role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
