"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { getUserDoc, updateUserDoc } from "@/lib/firestore/users";
import { uploadAvatar } from "@/lib/firebase/storage";
import { THEME_OPTIONS, THEME_PRESETS, DEFAULT_THEME } from "@/lib/theme";
import { FONT_OPTIONS, DEFAULT_FONT } from "@/lib/fonts";
import type { ProfileTheme, ThemePreset, FontFamily, UserDoc } from "@/types";
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
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");

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
      setStatus("Avatar updated.");
    } catch (err) {
      setStatus(
        err instanceof Error ? err.message : "Avatar upload failed.",
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
      });
      setStatus("Saved.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  if (authLoading || !doc) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Appearance</h2>
        <p className="text-muted-foreground">
          Customize your public profile.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-full border bg-muted">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Avatar"
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
                Profile picture
              </Label>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={uploading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="display-name">Display name</Label>
            <Input
              id="display-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={60}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
              placeholder="Tell visitors about yourself"
            />
            <p className="text-xs text-muted-foreground">
              {bio.length}/{BIO_MAX}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
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
          <CardTitle>Font</CardTitle>
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
                    The quick brown fox
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Capture</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Show an email signup form on your public profile to collect
            subscriber emails.
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
              Enable email capture on my profile
            </Label>
          </div>
          {emailCaptureEnabled && (
            <div className="space-y-2">
              <Label htmlFor="email-capture-message">
                Message (optional)
              </Label>
              <Input
                id="email-capture-message"
                value={emailCaptureMessage}
                onChange={(e) => setEmailCaptureMessage(e.target.value)}
                placeholder="Subscribe to get updates from me!"
                maxLength={120}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </Button>
        {status && (
          <span className="text-sm text-muted-foreground">{status}</span>
        )}
      </div>
    </div>
  );
}
