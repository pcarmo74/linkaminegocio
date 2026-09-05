import { CTALink } from "@/components/landing/cta-link";
import {
  CustomizeIllustration,
  ShareIllustration,
  AnalyticsIllustration,
} from "@/components/landing/illustrations";
import type { ComponentType } from "react";

interface Feature {
  Illustration: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bg: string;
  textColor: string;
  /** If true, illustration appears on the left on desktop */
  illustrationFirst: boolean;
}

const features: Feature[] = [
  {
    Illustration: CustomizeIllustration,
    title: "Crea y personaliza tu LinkaMiNegocio en minutos",
    description:
      "Conecta todo tu contenido — redes sociales, sitios web, tiendas y más — en un solo enlace. Elige entre 9 temas y 8 fuentes prediseñadas para darle a tu página un estilo propio y generar más clics.",
    bg: "bg-[#E9C0E9]",
    textColor: "text-[#1E2330]",
    illustrationFirst: false,
  },
  {
    Illustration: ShareIllustration,
    title: "¡Comparte tu LinkaMiNegocio donde quieras!",
    description:
      "Agrega tu URL única de LinkaMiNegocio en todas las plataformas donde está tu audiencia. Luego usa tu código QR para llevar también el tráfico fuera de línea a tu enlace.",
    bg: "bg-[#FFD966]",
    textColor: "text-[#1E2330]",
    illustrationFirst: true,
  },
  {
    Illustration: AnalyticsIllustration,
    title: "Analiza a tu audiencia y mantenla interesada",
    description:
      "Haz seguimiento a tu interacción con el tiempo, monitorea tus fuentes de tráfico y descubre qué está convirtiendo a tu audiencia. Actualiza tu perfil con información real para que sigan volviendo.",
    bg: "bg-[#1E2330]",
    textColor: "text-white",
    illustrationFirst: false,
  },
];

export function Features() {
  return (
    <section id="features">
      {features.map(
        ({
          Illustration,
          title,
          description,
          bg,
          textColor,
          illustrationFirst,
        }) => (
          <div key={title} className={`${bg} px-5 py-20 md:py-28`}>
            <div
              className={`container mx-auto flex max-w-5xl flex-col items-center gap-10 md:gap-16 ${
                illustrationFirst ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Text side */}
              <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
                <h2
                  className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl ${textColor}`}
                >
                  {title}
                </h2>
                <p
                  className={`mt-4 max-w-xl text-lg ${textColor} ${textColor === "text-white" ? "opacity-80" : "opacity-70"}`}
                >
                  {description}
                </p>
                <CTALink
                  href="/signup"
                  className={`mt-6 inline-flex rounded-xl px-8 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                    textColor === "text-white"
                      ? "bg-white text-[#1E2330]"
                      : "bg-[#1E2330] text-white"
                  }`}
                >
                  Crea tu LinkaMiNegocio
                </CTALink>
              </div>

              {/* Illustration side */}
              <div className="flex flex-1 items-center justify-center">
                <Illustration className="w-full max-w-sm drop-shadow-lg" />
              </div>
            </div>
          </div>
        ),
      )}
    </section>
  );
}
