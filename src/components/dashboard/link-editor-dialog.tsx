"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ICON_OPTIONS,
  LinkIcon,
  detectIconFromUrl,
  isPhoneBasedIcon,
  type IconKey,
} from "@/lib/link-icons";
import type { LinkDoc } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: Pick<LinkDoc, "id" | "title" | "url" | "iconKey"> | null;
  onSubmit: (values: {
    title: string;
    url: string;
    iconKey: string | null;
  }) => Promise<void>;
}

export function LinkEditorDialog({
  open,
  onOpenChange,
  initial,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [iconKey, setIconKey] = useState<IconKey | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle(initial?.title ?? "");
      setUrl(initial?.url ?? "");
      setIconKey((initial?.iconKey as IconKey | null) ?? null);
      setError("");
      setSaving(false);
    }
  }, [open, initial]);

  const detected = detectIconFromUrl(url);
  const isPhoneOnly = isPhoneBasedIcon(iconKey);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("El título es obligatorio.");
      return;
    }

    let finalUrl: string;

    if (isPhoneOnly) {
      // Registered business accounts get a real https:// payment link;
      // everyone else enters a plain Colombian mobile number.
      const trimmed = url.trim();
      if (/^https?:\/\//i.test(trimmed)) {
        try {
          finalUrl = new URL(trimmed).toString();
        } catch {
          setError("Ingresa un número de celular válido.");
          return;
        }
      } else {
        const digitsOnly = trimmed.replace(/[\s-]/g, "");
        if (!/^\d{10}$/.test(digitsOnly)) {
          setError("Ingresa un número de celular válido.");
          return;
        }
        finalUrl = trimmed;
      }
    } else {
      let parsed: URL;
      try {
        parsed = new URL(url);
      } catch {
        setError("Ingresa una URL válida (incluye https://).");
        return;
      }
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        setError("Solo se permiten URLs http y https.");
        return;
      }
      finalUrl = parsed.toString();
    }

    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        url: finalUrl,
        iconKey,
      });
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar.");
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle>{initial ? "Editar enlace" : "Agregar enlace"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="link-title">Título</Label>
              <Input
                id="link-title"
                placeholder="Mi portafolio"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link-url">
                {isPhoneOnly ? "Número de celular" : "URL"}
              </Label>
              <Input
                id="link-url"
                type={isPhoneOnly ? "tel" : "url"}
                placeholder={isPhoneOnly ? "300 123 4567" : "https://ejemplo.com"}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            {/* Icon picker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Ícono</Label>
                {detected && !iconKey && (
                  <span className="text-xs text-muted-foreground">
                    Detectado automáticamente:{" "}
                    <span className="font-medium text-foreground">
                      {ICON_OPTIONS.find((o) => o.key === detected)?.label}
                    </span>
                  </span>
                )}
              </div>
              <div className="grid grid-cols-6 gap-2 rounded-md border p-3 sm:grid-cols-8">
                {/* "Auto" option */}
                <button
                  type="button"
                  onClick={() => setIconKey(null)}
                  title="Detectar automáticamente desde la URL"
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-md border text-[10px] font-medium transition-colors",
                    iconKey === null
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background hover:bg-muted",
                  )}
                >
                  Auto
                </button>
                {ICON_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setIconKey(opt.key)}
                    title={opt.label}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-md border transition-colors",
                      iconKey === opt.key
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:bg-muted",
                    )}
                  >
                    <LinkIcon iconKey={opt.key} className="h-5 w-5" />
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Elige &ldquo;Auto&rdquo; para detectar el ícono desde la URL, o
                selecciona uno para sustituirlo.
              </p>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
