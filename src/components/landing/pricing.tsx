import { CTALink } from "@/components/landing/cta-link";
import { Check } from "lucide-react";

const FREE_FEATURES = [
  "Enlaces ilimitados",
  "9 temas",
  "8 fuentes",
  "Analítica de clics y visitas",
  "Captura de correos y lista de suscriptores",
  "Generador de códigos QR",
  "Reordena tus enlaces arrastrándolos",
  "Foto de perfil y biografía personalizadas",
  "Página de perfil optimizada para móviles",
  "SEO y vistas previas para redes sociales",
  "Exporta tus suscriptores en CSV",
  "Modo oscuro / claro / automático",
];

const LINKTREE_PAID = [
  { feature: "Quitar la marca de Linktree", price: "$8/mes" },
  { feature: "Captura de correos", price: "$8/mes" },
  { feature: "Temas personalizados", price: "$8/mes" },
  { feature: "Analítica", price: "$15/mes" },
  { feature: "Fuentes personalizadas", price: "$15/mes" },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-white px-5 py-24 dark:bg-[#0a0a0a]">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Gratis.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Todo lo que Linktree cobra, gratis en LinkaMiNegocio. Sin trucos,
            sin tarjeta de crédito, sin límites.
          </p>
        </div>

        <div className="mx-auto mt-16 grid gap-8 md:grid-cols-2">
          {/* LinkFig card */}
          <div className="flex flex-col rounded-3xl border-2 border-[#D2E823] bg-[#D2E823]/5 p-8">
            <div className="mb-6">
              <h3 className="font-heading text-2xl font-bold">LinkaMiNegocio</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Todo lo que necesitas en un solo enlace
              </p>
              <div className="mt-4">
                <span className="font-heading text-5xl font-bold">$0</span>
                <span className="ml-1 text-muted-foreground">/para siempre</span>
              </div>
            </div>
            <ul className="flex-1 space-y-3">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-[#22c55e]" />
                  {feature}
                </li>
              ))}
            </ul>
            <CTALink
              href="/signup"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#1E2330] px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Reclama tu LinkaMiNegocio
            </CTALink>
          </div>

          {/* Linktree comparison card */}
          <div className="flex flex-col rounded-3xl border border-border bg-muted/30 p-8">
            <div className="mb-6">
              <h3 className="font-heading text-2xl font-bold text-muted-foreground">
                Linktree
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Las mismas funciones, pero de pago
              </p>
              <div className="mt-4">
                <span className="font-heading text-5xl font-bold text-muted-foreground">
                  $8–35
                </span>
                <span className="ml-1 text-muted-foreground">/mes</span>
              </div>
            </div>
            <ul className="flex-1 space-y-3">
              {LINKTREE_PAID.map(({ feature, price }) => (
                <li
                  key={feature}
                  className="flex items-center justify-between text-sm text-muted-foreground"
                >
                  <span>{feature}</span>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                    {price}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-border bg-muted/50 px-8 py-3 text-center text-sm font-medium text-muted-foreground">
              ¿Para qué pagar si es gratis?
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
