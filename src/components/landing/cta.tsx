import { CTALink } from "@/components/landing/cta-link";

export function CTA() {
  return (
    <section className="bg-[#D2E823] px-5 py-24 text-center md:py-32">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1E2330] sm:text-4xl md:text-5xl">
          ¡Únete a los negocios que ya usan el internet gratis hoy!
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[#1E2330]/70">
          Reclama tu nombre de usuario en 30 segundos. Sin tarjeta de crédito,
          sin muros de pago, sin límites — solo tu negocio, tus clientes, a tu
          manera.
        </p>
        <CTALink
          href="/signup"
          className="mt-8 inline-flex rounded-xl bg-[#1E2330] px-10 py-4 text-base font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Reclama tu LinkaMiNegocio
        </CTALink>
      </div>
    </section>
  );
}
