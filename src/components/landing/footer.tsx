import Link from "next/link";
import { SiteStatsDisplay } from "@/components/landing/site-stats-display";

export function Footer() {
  return (
    <footer className="bg-[#1E2330] px-5 pb-4 pt-16 text-white">
      <div className="container mx-auto max-w-5xl">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="font-heading mb-4 text-lg font-bold">LinkaMiNegocio</h3>
            <p className="text-sm text-white/60">
              La alternativa gratuita a Linktree. Un solo enlace para todo.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white/80">
              Producto
            </h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <a
                  href="#features"
                  className="transition-colors hover:text-white"
                >
                  Funciones
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="transition-colors hover:text-white"
                >
                  Precios
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-white">
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white/80">Legal</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-white"
                >
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-white"
                >
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          <span>&copy; {new Date().getFullYear()} LinkaMiNegocio. Es Gratis.</span>
          <SiteStatsDisplay />
        </div>
      </div>
    </footer>
  );
}
