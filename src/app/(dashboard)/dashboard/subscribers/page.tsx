"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Mail } from "lucide-react";

interface Subscriber {
  email: string;
  subscribedAt: string;
}

export default function SubscribersPage() {
  const { user, loading: authLoading } = useAuth();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;
    (async () => {
      try {
        const res = await fetch("/api/subscribers");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setSubscribers(data.subscribers ?? []);
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    })();
  }, [authLoading, user]);

  const exportCsv = useCallback(() => {
    const header = "Correo,Fecha de suscripción\n";
    const rows = subscribers
      .map(
        (s) =>
          `${s.email},${new Date(s.subscribedAt).toLocaleDateString()}`,
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "suscriptores.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [subscribers]);

  if (authLoading || loading) {
    return <p className="text-muted-foreground">Cargando...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Suscriptores</h2>
          <p className="text-muted-foreground">
            {subscribers.length} {subscribers.length === 1 ? "suscriptor" : "suscriptores"} recopilados a través de tu perfil.
          </p>
        </div>
        {subscribers.length > 0 && (
          <Button variant="outline" onClick={exportCsv}>
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Lista de Correos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {subscribers.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Aún no hay suscriptores. Activa la captura de correos en{" "}
              <a
                href="/dashboard/appearance"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Apariencia
              </a>{" "}
              para empezar a recopilarlos.
            </p>
          ) : (
            <div className="divide-y">
              {subscribers.map((sub) => (
                <div
                  key={sub.email}
                  className="flex items-center justify-between py-3"
                >
                  <span className="text-sm font-medium">{sub.email}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(sub.subscribedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
