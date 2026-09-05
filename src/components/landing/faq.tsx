"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "¿LinkaMiNegocio es realmente gratis?",
    answer:
      "Sí, completamente. LinkaMiNegocio es gratis — enlaces ilimitados, temas personalizados, analítica, captura de correos, códigos QR y más. Sin tarjeta de crédito, sin cargos ocultos, sin muros de pago.",
  },
  {
    question: "¿Qué hace mejor a LinkaMiNegocio que Linktree?",
    answer:
      "La mayor diferencia es el precio: LinkaMiNegocio te da todas las funciones premium gratis. Temas, fuentes, captura de correos, analítica, códigos QR — todo incluido. Sin planes por niveles, sin funciones bloqueadas, sin cobros mensuales.",
  },
  {
    question: "¿Puedo recopilar correos de quienes visitan mi perfil?",
    answer:
      "¡Claro que sí! Activa la captura de correos desde tu configuración de Apariencia y agrega un mensaje personalizado. Tus visitantes pueden suscribirse directamente desde tu página de perfil. Puedes ver todos tus suscriptores en tu panel y exportarlos como CSV cuando quieras.",
  },
  {
    question: "¿Cuántos enlaces puedo agregar?",
    answer:
      "Ilimitados. No hay límite en la cantidad de enlaces que puedes agregar a tu perfil de LinkaMiNegocio. Puedes reordenarlos arrastrándolos y activar o desactivar cada uno.",
  },
  {
    question: "¿Puedo personalizar cómo se ve mi perfil?",
    answer:
      "¡Sí! Elige entre 9 temas y 8 fuentes prediseñadas, sube una foto de perfil y escribe tu propia biografía. Encuentra la combinación que mejor represente a tu negocio.",
  },
  {
    question: "¿Necesito un sitio web para usar LinkaMiNegocio?",
    answer:
      "Para nada. LinkaMiNegocio funciona como tu mini sitio web — una página de perfil bonita y pensada para móviles donde compartes todo lo que haces. Si ya tienes un sitio web, solo agrégalo como uno de tus enlaces.",
  },
  {
    question: "¿Es seguro usar LinkaMiNegocio en mis redes sociales?",
    answer:
      "Sí. LinkaMiNegocio genera páginas de perfil limpias y de carga rápida, con las etiquetas SEO correctas y vistas previas para compartir en redes. Tu URL de LinkaMiNegocio funciona perfectamente en Instagram, TikTok, Twitter, YouTube y cualquier otra plataforma.",
  },
  {
    question: "¿Cómo comparto mi LinkaMiNegocio?",
    answer:
      "Agrega tu URL única de LinkaMiNegocio (linkaminegocio.com/u/tunombre) a todas tus biografías de redes sociales. También puedes generar un código QR desde tu panel para atraer tráfico fuera de línea a tu perfil.",
  },
  {
    question: "¿Por qué crearon LinkaMiNegocio?",
    answer:
      "LinkaMiNegocio nació como parte de un esfuerzo más grande para ayudar a reactivar la economía colombiana después del terremoto de agosto de 2026. Por eso es y será gratis para todos los negocios en Colombia, estén o no en una zona directamente afectada — sabemos que las consecuencias se sintieron mucho más allá de las zonas de mayor devastación.",
  },
  {
    question: "¿Cómo puedo apoyar a los negocios colombianos si no estoy en Colombia?",
    answer:
      "LinkaMiNegocio es gratis para todos, en cualquier país. Si tu negocio está fuera de Colombia y quieres apoyar directamente a los negocios que se están recuperando del terremoto, puedes patrocinar a un negocio real a través de Reopen Colombia — cada aporte llega directamente al dueño del negocio. www.reopencolombia.com",
  },
];

const URL_PATTERN = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

function renderAnswer(text: string) {
  return text.split(URL_PATTERN).map((part, i) =>
    /^(https?:\/\/|www\.)/.test(part) ? (
      <a
        key={i}
        href={part.startsWith("http") ? part : `https://${part}`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 hover:text-foreground"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-5 py-24">
      <div className="container mx-auto max-w-2xl">
        <h2 className="font-heading text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          ¿Preguntas? Aquí las respuestas.
        </h2>

        <div className="mt-12 divide-y">
          {faqs.map(({ question, answer }, index) => (
            <div key={question}>
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between py-5 text-left font-medium transition-colors hover:text-primary"
              >
                {question}
                <ChevronDown
                  className={cn(
                    "ml-4 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === index && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-200",
                  openIndex === index
                    ? "grid-rows-[1fr] pb-5"
                    : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {renderAnswer(answer)}
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
