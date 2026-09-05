"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Copy, QrCode, Eye, MousePointerClick, Link2, Zap } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { getFirebaseDb } from "@/lib/firebase/client";
import { getUserDoc } from "@/lib/firestore/users";
import { listLinks } from "@/lib/firestore/links";
import type { LinkDoc, StatsSummary, UserDoc } from "@/types";

interface RoutingRow {
  source: string;
  views: number;
  clicks: number;
  avgPosition: number;
  ctr: number;
}
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCodeDialog } from "@/components/dashboard/qr-code-dialog";
import { TrafficSources } from "@/components/dashboard/traffic-sources";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserDoc | null>(null);
  const [links, setLinks] = useState<LinkDoc[]>([]);
  const [stats, setStats] = useState<StatsSummary>({ views: 0, clicks: 0, viewsBySource: {} });
  const [routingRows, setRoutingRows] = useState<RoutingRow[]>([]);
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;
    (async () => {
      setLoading(true);
      try {
        const [userDoc, linkList] = await Promise.all([
          getUserDoc(user.uid),
          listLinks(user.uid),
        ]);
        setProfile(userDoc);
        setLinks(linkList);

        const statsSnap = await getDoc(
          doc(getFirebaseDb(), "users", user.uid, "stats", "summary"),
        );
        if (statsSnap.exists()) {
          const data = statsSnap.data();
          setStats({
            views: typeof data.views === "number" ? data.views : 0,
            clicks: typeof data.clicks === "number" ? data.clicks : 0,
            viewsBySource:
              data.viewsBySource && typeof data.viewsBySource === "object"
                ? (data.viewsBySource as Record<string, number>)
                : {},
          });
        }

        fetch("/api/routing-performance")
          .then((res) => (res.ok ? res.json() : { rows: [] }))
          .then((data) => setRoutingRows(data.rows ?? []))
          .catch(() => {});
      } finally {
        setLoading(false);
      }
    })();
  }, [authLoading, user]);

  const publicUrl =
    profile?.username && typeof window !== "undefined"
      ? `${window.location.origin}/u/${profile.username}`
      : "";

  async function handleCopy() {
    if (!publicUrl) return;
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (authLoading || loading) {
    return <p className="text-muted-foreground">Cargando...</p>;
  }

  if (!profile?.username) {
    return (
      <p className="text-muted-foreground">
        A tu cuenta le falta un nombre de usuario. Por favor, contacta a soporte.
      </p>
    );
  }

  const ctr =
    stats.views > 0 ? ((stats.clicks / stats.views) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Bienvenido de nuevo, {profile.displayName || profile.username}
        </h2>
        <p className="text-muted-foreground">
          Así es como está funcionando tu perfil de LinkaMiNegocio.
        </p>
      </div>

      {/* Share card */}
      <Card>
        <CardHeader>
          <CardTitle>Tu URL de LinkaMiNegocio</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <code className="truncate rounded bg-muted px-3 py-2 text-sm">
            {publicUrl}
          </code>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="mr-1 h-4 w-4" />
              {copied ? "¡Copiado!" : "Copiar"}
            </Button>
            <Button variant="outline" onClick={() => setQrOpen(true)}>
              <QrCode className="mr-1 h-4 w-4" />
              Código QR
            </Button>
            <Button render={<a href={`/u/${profile.username}`} target="_blank" rel="noreferrer" />}>
              Ver perfil
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Visitas totales</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.views}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clics totales</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clicks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">CTR</CardTitle>
            <Link2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ctr}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources donut chart */}
      <TrafficSources viewsBySource={stats.viewsBySource} />

      {/* Per-link counts with source breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Clics por enlace</CardTitle>
        </CardHeader>
        <CardContent>
          {links.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aún no hay enlaces. Agrega algunos en la página de Enlaces.
            </p>
          ) : (() => {
            const allSources = Array.from(
              new Set(
                links.flatMap((l) =>
                  Object.keys(l.clicksBySource ?? {}),
                ),
              ),
            ).sort();

            return (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs text-muted-foreground">
                      <th className="pb-2 pr-4 font-medium">Enlace</th>
                      <th className="pb-2 pr-3 text-right font-medium">
                        Total
                      </th>
                      {allSources.map((s) => (
                        <th
                          key={s}
                          className="pb-2 pr-3 text-right font-medium capitalize"
                        >
                          {s}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {links.map((link) => (
                      <tr key={link.id} className="border-b last:border-b-0">
                        <td className="max-w-[200px] truncate py-2 pr-4">
                          {link.title}
                        </td>
                        <td className="py-2 pr-3 text-right font-medium">
                          {link.clicks}
                        </td>
                        {allSources.map((s) => {
                          const count = link.clicksBySource?.[s];
                          return (
                            <td
                              key={s}
                              className="py-2 pr-3 text-right text-muted-foreground"
                            >
                              {count ?? "—"}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })()}
        </CardContent>
      </Card>

      {/* Routing Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Rendimiento del Enrutamiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          {routingRows.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aún no hay datos de enrutamiento. Configura el Enrutamiento
              Inteligente en tus enlaces para ver cómo interactúan tus
              visitantes según su origen.
            </p>
          ) : (
            <div className="space-y-1">
              <div className="grid grid-cols-4 gap-2 border-b pb-2 text-xs font-medium text-muted-foreground">
                <span>Fuente</span>
                <span className="text-right">Visitas</span>
                <span className="text-right">Pos. prom.</span>
                <span className="text-right">CTR</span>
              </div>
              {routingRows.map((row) => (
                <div
                  key={row.source}
                  className="grid grid-cols-4 gap-2 py-2 text-sm"
                >
                  <span className="capitalize">{row.source}</span>
                  <span className="text-right text-muted-foreground">
                    {row.views}
                  </span>
                  <span className="text-right text-muted-foreground">
                    {row.avgPosition > 0 ? row.avgPosition.toFixed(1) : "—"}
                  </span>
                  <span className="text-right font-medium">{row.ctr}%</span>
                </div>
              ))}
              <p className="mt-2 text-xs text-muted-foreground">
                Últimos 30 días
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <QrCodeDialog
        open={qrOpen}
        onOpenChange={setQrOpen}
        url={publicUrl}
        username={profile.username}
      />
    </div>
  );
}
