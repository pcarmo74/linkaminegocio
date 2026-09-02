const userTypes = [
  "creators",
  "influencers",
  "small businesses",
  "athletes",
  "musicians",
  "podcasters",
  "fashion designers",
  "fitness coaches",
  "streamers",
  "vloggers",
  "ecommerce sellers",
  "writers",
  "DJs",
  "wellness leaders",
  "photographers",
];

export function LogoBar() {
  return (
    <section className="overflow-hidden bg-white py-16 dark:bg-[#1E2330]">
      <div className="container mx-auto px-5 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1E2330] sm:text-4xl md:text-5xl dark:text-white">
          The only <span className="italic">free</span> link in bio for
        </h2>
      </div>

      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent dark:from-[#1E2330]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent dark:from-[#1E2330]" />

        <div className="flex animate-marquee items-center gap-4">
          {[...userTypes, ...userTypes].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 rounded-full border border-[#1E2330]/10 px-5 py-2 text-sm font-medium text-[#1E2330]/70 dark:border-white/10 dark:text-white/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
