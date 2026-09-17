"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { getUserDoc, updateUserDoc } from "@/lib/firestore/users";
import { uploadAvatar } from "@/lib/firebase/storage";
import { THEME_OPTIONS, THEME_PRESETS, DEFAULT_THEME } from "@/lib/theme";
import { FONT_OPTIONS, DEFAULT_FONT } from "@/lib/fonts";
import {
  BUSINESS_STATUS_OPTIONS,
  DEFAULT_BUSINESS_STATUS,
} from "@/lib/business-status";
import type {
  BusinessStatus,
  BusinessStatusType,
  ProfileTheme,
  ThemePreset,
  FontFamily,
  UserDoc,
} from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const BIO_MAX = 160;

export default function AppearancePage() {
  const { user, loading: authLoading } = useAuth();
  const [doc, setDoc] = useState<UserDoc | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [theme, setTheme] = useState<ProfileTheme>(DEFAULT_THEME);
  const [fontFamily, setFontFamily] = useState<FontFamily>(DEFAULT_FONT);
  const [emailCaptureEnabled, setEmailCaptureEnabled] = useState(false);
  const [emailCaptureMessage, setEmailCaptureMessage] = useState("");
  const [businessStatus, setBusinessStatus] = useState<BusinessStatus>(
    DEFAULT_BUSINESS_STATUS,
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (authLoading || !user) return;
    (async () => {
      const d = await getUserDoc(user.uid);
      if (!d) return;
      setDoc(d);
      setDisplayName(d.displayName ?? "");
      setBio(d.bio ?? "");
      setAvatarUrl(d.avatarUrl ?? null);
      setTheme(d.theme ?? DEFAULT_THEME);
      setFontFamily(d.fontFamily ?? DEFAULT_FONT);
      setEmailCaptureEnabled(d.emailCaptureEnabled ?? false);
      setEmailCaptureMessage(d.emailCaptureMessage ?? "");
      setBusinessStatus(d.businessStatus ?? DEFAULT_BUSINESS_STATUS);
    })();
  }, [authLoading, user]);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    setStatus("");
    try {
      const url = await uploadAvatar(user.uid, file);
      setAvatarUrl(url);
      await updateUserDoc(user.uid, { avatarUrl: url });
      setStatus("Foto de perfil actualizada.");
    } catch (err) {
      setStatus(
        err instanceof Error ? err.message : "No se pudo subir la foto de perfil.",
      );
    } finally {
      setUploading(false);
    }
  }

  function selectPreset(presetId: ThemePreset) {
    setTheme(THEME_PRESETS[presetId]);
  }

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    setStatus("");
    try {
      await updateUserDoc(user.uid, {
        displayName: displayName.trim(),
        bio: bio.trim(),
        theme,
        fontFamily,
        emailCaptureEnabled,
        emailCaptureMessage: emailCaptureMessage.trim(),
        businessStatus: {
          ...businessStatus,
          message: businessStatus.message.trim(),
          link: businessStatus.link.trim(),
          updatedAt: new Date(),
        },
      });
      setStatus("Guardado.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  }

  if (authLoading || !doc) {
    return <p className="text-muted-foreground">Cargando...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Apariencia</h2>
        <p className="text-muted-foreground">
          Personaliza tu perfil público.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-full border bg-muted">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Foto de perfil"
                  width={80}
                  height={80}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl text-muted-foreground">
                  {displayName.charAt(0).toUpperCase() || "?"}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="avatar-upload" className="mb-1 block">
                Foto de perfil
              </Label>
              <input
                ref={fileInputRef}
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={uploading}
                className="sr-only"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading
                  ? "Subiendo..."
                  : avatarUrl
                    ? "Cambiar foto"
                    : "Subir foto"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="display-name">Nombre para mostrar</Label>
            <Input
              id="display-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={60}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografía</Label>
            <Textarea
              id="bio"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
              placeholder="Cuéntales a tus visitantes sobre ti"
            />
            <p className="text-xs text-muted-foreground">
              {bio.length}/{BIO_MAX}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Aviso de estado del negocio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Muestra un aviso destacado en tu perfil público para informar
            cambios importantes: reubicación, reconstrucción, cierre
            temporal, etc.
          </p>
          <div className="flex items-center gap-3">
            <Checkbox
              id="business-status-enabled"
              checked={businessStatus.enabled}
              onCheckedChange={(checked) =>
                setBusinessStatus((prev) => ({
                  ...prev,
                  enabled: checked === true,
                }))
              }
            />
            <Label htmlFor="business-status-enabled">
              Activar aviso de estado del negocio
            </Label>
          </div>
          {businessStatus.enabled && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business-status-type">Tipo de aviso</Label>
                <select
                  id="business-status-type"
                  value={businessStatus.type}
                  onChange={(e) =>
                    setBusinessStatus((prev) => ({
                      ...prev,
                      type: e.target.value as BusinessStatusType,
                    }))
                  }
                  className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                >
                  {BUSINESS_STATUS_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.emoji} {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-status-message">
                  Mensaje adicional (opcional)
                </Label>
                <Input
                  id="business-status-message"
                  value={businessStatus.message}
                  onChange={(e) =>
                    setBusinessStatus((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  placeholder="Ej: Escríbenos por WhatsApp para la dirección temporal"
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-status-link">Enlace (opcional)</Label>
                <Input
                  id="business-status-link"
                  value={businessStatus.link}
                  onChange={(e) =>
                    setBusinessStatus((prev) => ({
                      ...prev,
                      link: e.target.value,
                    }))
                  }
                  placeholder="https://maps.app.goo.gl/..."
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {THEME_OPTIONS.map((option) => {
              const preset = THEME_PRESETS[option.id];
              const isActive = theme.preset === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => selectPreset(option.id)}
                  className={cn(
                    "rounded-lg border-2 p-3 text-left transition-all",
                    isActive
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  <div
                    className="mb-2 h-16 w-full rounded"
                    style={{
                      background:
                        preset.backgroundGradient ?? preset.backgroundColor,
                    }}
                  />
                  <div className="text-sm font-medium">{option.label}</div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fuente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {FONT_OPTIONS.map((font) => {
              const isActive = fontFamily === font.id;
              return (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => setFontFamily(font.id)}
                  className={cn(
                    "rounded-lg border-2 p-3 text-left transition-all",
                    isActive
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  <div className="text-sm font-medium">{font.label}</div>
                  <div
                    className="mt-1 text-xs text-muted-foreground"
                    style={{ fontFamily: font.cssFamily }}
                  >
                    El veloz murciélago hindú
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Captura de Correos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Muestra un formulario de suscripción en tu perfil público para
            recopilar correos de tus suscriptores.
          </p>
          <div className="flex items-center gap-3">
            <Checkbox
              id="email-capture"
              checked={emailCaptureEnabled}
              onCheckedChange={(checked) =>
                setEmailCaptureEnabled(checked === true)
              }
            />
            <Label htmlFor="email-capture">
              Activar captura de correos en mi perfil
            </Label>
          </div>
          {emailCaptureEnabled && (
            <div className="space-y-2">
              <Label htmlFor="email-capture-message">
                Mensaje (opcional)
              </Label>
              <Input
                id="email-capture-message"
                value={emailCaptureMessage}
                onChange={(e) => setEmailCaptureMessage(e.target.value)}
                placeholder="¡Suscríbete para recibir mis novedades!"
                maxLength={120}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </Button>
        {status && (
          <span className="text-sm text-muted-foreground">{status}</span>
        )}
      </div>
    </div>
  );
}
