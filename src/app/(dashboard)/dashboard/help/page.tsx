"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { getUserDoc } from "@/lib/firestore/users";
import { cn } from "@/lib/utils";

const PLATFORMS: {
  name: string;
  utm: string;
  autoDetect: "reliable" | "desktop-only" | "no";
  note: string;
}[] = [
  {
    name: "YouTube",
    utm: "youtube",
    autoDetect: "desktop-only",
    note: "Funciona en la versión de escritorio. La app móvil de YouTube abre los enlaces en un navegador interno que no envía la información de origen.",
  },
  {
    name: "X (Twitter)",
    utm: "twitter",
    autoDetect: "desktop-only",
    note: "En escritorio funciona a través de la redirección t.co. La app móvil de X usa un navegador interno.",
  },
  {
    name: "LinkedIn",
    utm: "linkedin",
    autoDetect: "desktop-only",
    note: "En escritorio a veces funciona. lnkd.in y la app móvil generalmente no envían esa información.",
  },
  {
    name: "Instagram",
    utm: "instagram",
    autoDetect: "no",
    note: "Instagram es principalmente móvil y la app siempre abre los enlaces en un navegador interno. Se pierde la información de origen — se requiere UTM.",
  },
  {
    name: "TikTok",
    utm: "tiktok",
    autoDetect: "no",
    note: "TikTok es principalmente móvil y usa un navegador interno. Se requiere UTM.",
  },
  {
    name: "WhatsApp",
    utm: "whatsapp",
    autoDetect: "no",
    note: "WhatsApp es principalmente móvil y abre los enlaces en un navegador interno. Se requiere UTM.",
  },
  {
    name: "Email / Newsletter",
    utm: "email",
    autoDetect: "no",
    note: "Los clientes de correo no envían información de origen. Se requiere UTM.",
  },
];

const BADGE_STYLES: Record<string, string> = {
  reliable: "bg-green-500/10 text-green-600 dark:text-green-400",
  "desktop-only": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  no: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const BADGE_LABELS: Record<string, string> = {
  reliable: "Detectado automáticamente",
  "desktop-only": "Solo escritorio",
  no: "UTM requerido",
};

function CollapsibleDetail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-sm font-medium text-primary hover:underline"
      >
        {open ? "▾ Ocultar" : label}
      </button>
      <div
        className={cn(
          "grid transition-all duration-200",
          open ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function HelpPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getUserDoc(user.uid).then((doc) => {
      if (doc?.username) setUsername(doc.username);
    });
  }, [user]);

  const base = `https://www.linkaminegocio.com/u/${username ?? "your-handle"}`;

  const copy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ayuda y Seguimiento de Tráfico</h1>
        <p className="text-muted-foreground">
          Aprende cómo LinkaMiNegocio rastrea de dónde vienen tus visitantes —
          y cuándo necesitas etiquetar tus enlaces.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cómo funcionan las fuentes de tráfico</CardTitle>
          <CardDescription>
            Hay dos formas en que LinkaMiNegocio identifica de dónde viene un clic.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="rounded-md border border-primary/20 bg-primary/5 px-4 py-3">
            <p className="font-semibold">💡 En pocas palabras</p>
            <p className="mt-1 text-muted-foreground">
              Cuando vayas a compartir tu enlace, usa la versión especial de
              la tabla de abajo según dónde lo vayas a compartir (WhatsApp,
              Instagram, etc.), en lugar de tu enlace normal. Así podrás ver
              en tu panel exactamente de dónde te están llegando tus
              visitantes.
            </p>
          </div>

          <CollapsibleDetail label="▸ Ver cómo funciona esto">
            <div>
              <h3 className="font-semibold">1. Detección automática del origen</h3>
              <p className="text-muted-foreground">
                Cuando alguien hace clic en un enlace hacia tu página de
                LinkaMiNegocio, su navegador muchas veces nos dice de qué sitio
                viene. Comparamos eso con plataformas conocidas (YouTube, X,
                LinkedIn, etc.) y etiquetamos la visita.
              </p>
              <p className="mt-2 text-muted-foreground">
                <strong>La trampa:</strong> la mayoría de las apps sociales en
                el celular abren los enlaces en su propio navegador interno,
                que no envía esa información de origen. Esas visitas aparecen
                como <em>Directo</em>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">
                2. Etiquetas UTM (confiable — recomendado)
              </h3>
              <p className="text-muted-foreground">
                Agrega <code className="rounded bg-muted px-1">?utm_source=whatsapp</code>{" "}
                (o youtube, tiktok, etc.) al final de tu URL de LinkaMiNegocio
                antes de compartirla. Esto fuerza el origen, incluso en apps
                móviles y cuando se pierde la información del navegador.
              </p>
            </div>
          </CollapsibleDetail>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>¿Cuándo necesito una etiqueta UTM?</CardTitle>
          <CardDescription>
            Respuesta corta: siempre, si te importa saber con precisión de dónde vienen tus visitantes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!username && (
            <div className="mb-4 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-400">
              Cargando tu nombre de usuario de LinkaMiNegocio… si no se
              completa, reemplaza{" "}
              <code className="rounded bg-background/50 px-1 font-mono">
                your-handle
              </code>{" "}
              abajo con tu nombre de usuario real antes de compartir.
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Plataforma</th>
                  <th className="pb-2 pr-4 font-medium">Detección automática</th>
                  <th className="pb-2 pr-4 font-medium">Tu enlace</th>
                  <th className="pb-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {PLATFORMS.map((p) => {
                  const url = `${base}?utm_source=${p.utm}`;
                  return (
                    <tr key={p.utm} className="border-b last:border-b-0">
                      <td className="py-3 pr-4 align-top">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {p.note}
                        </div>
                      </td>
                      <td className="py-3 pr-4 align-top">
                        <span
                          className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${BADGE_STYLES[p.autoDetect]}`}
                        >
                          {BADGE_LABELS[p.autoDetect]}
                        </span>
                      </td>
                      <td className="py-3 pr-4 align-top">
                        <code className="break-all text-xs text-muted-foreground">
                          {url}
                        </code>
                      </td>
                      <td className="py-3 align-top">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copy(url, p.utm)}
                        >
                          {copied === p.utm ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cómo usar un enlace con etiqueta UTM</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>1.</strong> Copia la URL etiquetada de la tabla de arriba
            para la plataforma en la que vas a publicar.
          </p>
          <p>
            <strong>2.</strong> Pégala donde esa plataforma te permita
            agregar un enlace — tu biografía, el campo &ldquo;sitio
            web&rdquo; de tu perfil, una publicación fijada, la descripción
            de un video, el pie de un correo, etc.
          </p>
          <p>
            <strong>3.</strong> Cuando alguien hace clic, la etiqueta viaja
            junto con el enlace hasta LinkaMiNegocio y la visita aparece en
            tu panel de <strong>Fuentes de Tráfico</strong> bajo la
            plataforma correcta, en lugar de &ldquo;Directo&rdquo; u
            &ldquo;Otro&rdquo;.
          </p>
          <p className="pt-2">
            También puedes usar una etiqueta distinta según dónde compartas
            el enlace — por ejemplo,{" "}
            <code className="rounded bg-muted px-1">?utm_source=email</code>{" "}
            en un boletín frente a{" "}
            <code className="rounded bg-muted px-1">?utm_source=whatsapp</code>{" "}
            en tu estado de WhatsApp Business. Ambas se rastrean por
            separado.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preguntas frecuentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold">
              ¿Por qué tanto de mi tráfico aparece como &ldquo;Directo&rdquo;?
            </h3>
            <p className="text-muted-foreground">
              Probablemente la mayoría son clics desde apps móviles en redes
              sociales. Esas apps no envían la información de origen, así
              que no podemos saber de dónde vino la visita. Usa etiquetas
              UTM para solucionarlo.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              ¿Qué aparece como &ldquo;Otro&rdquo;?
            </h3>
            <p className="text-muted-foreground">
              Un origen que reconocimos como un sitio web real, pero para el
              que no tenemos un ícono específico — por ejemplo, un blog, un
              foro o una plataforma que aún no hemos agregado.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              ¿Se reclasificarán los clics anteriores si empiezo a usar UTMs?
            </h3>
            <p className="text-muted-foreground">
              No — los conteos históricos se mantienen tal como fueron
              registrados. Solo los clics nuevos toman la nueva fuente.
            </p>
          </div>
          <CollapsibleDetail label="▸ Pregunta avanzada">
            <div>
              <h3 className="font-semibold">
                ¿Puedo usar mis propios valores UTM personalizados?
              </h3>
              <p className="text-muted-foreground">
                Las fuentes en la tabla de arriba son las que LinkaMiNegocio
                reconoce por nombre. Los valores desconocidos se agrupan como
                &ldquo;Otro&rdquo; para que no llenen tu panel de etiquetas
                únicas.
              </p>
            </div>
          </CollapsibleDetail>
        </CardContent>
      </Card>
    </div>
  );
}
