const useCases = [
  {
    emoji: "🍽️",
    category: "Restaurante",
    subtitle: "Ejemplo de uso",
    description:
      "Comparte tu menú, tus reservas por WhatsApp y tu ubicación — todo en un solo enlace, listo para tu bio de Instagram.",
  },
  {
    emoji: "💇",
    category: "Peluquería",
    subtitle: "Ejemplo de uso",
    description:
      "Muestra tu galería de antes y después, enlaza tu sistema de citas y comparte tus horarios, todo desde un solo enlace.",
  },
  {
    emoji: "🏋️",
    category: "Entrenador personal",
    subtitle: "Ejemplo de uso",
    description:
      "Conecta tus rutinas, tu WhatsApp de reservas y tus redes sociales en un solo lugar, fácil de compartir con cada cliente nuevo.",
  },
  {
    emoji: "🛍️",
    category: "Tienda / Boutique",
    subtitle: "Ejemplo de uso",
    description:
      "Enlaza tu catálogo, tu tienda en línea y tus formas de pago — todo en un enlace que cabe perfecto en tu bio.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[#E9C0E9] px-5 py-24 dark:bg-[#2a1a2e]">
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-heading mb-12 text-center text-3xl font-bold tracking-tight text-[#1E2330] sm:text-4xl md:text-5xl dark:text-white">
          Así es como diferentes negocios usan LinkaMiNegocio
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {useCases.map(({ emoji, category, subtitle, description }) => (
            <div
              key={category}
              className="flex flex-col rounded-3xl bg-white p-8 dark:bg-[#1E2330]"
            >
              <blockquote className="flex-1 text-base leading-relaxed text-[#1E2330]/80 dark:text-white/80">
                &ldquo;{description}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D2E823] text-sm font-bold text-[#1E2330]">
                  {emoji}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E2330] dark:text-white">
                    {category}
                  </p>
                  <p className="text-xs text-[#1E2330]/60 dark:text-white/60">
                    {subtitle}
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
