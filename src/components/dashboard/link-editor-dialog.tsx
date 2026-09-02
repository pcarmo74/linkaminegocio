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

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      setError("Enter a valid URL (include https://).");
      return;
    }
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      setError("Only http and https URLs are allowed.");
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        url: parsed.toString(),
        iconKey,
      });
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle>{initial ? "Edit link" : "Add link"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="link-title">Title</Label>
              <Input
                id="link-title"
                placeholder="My portfolio"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            {/* Icon picker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Icon</Label>
                {detected && !iconKey && (
                  <span className="text-xs text-muted-foreground">
                    Auto-detected:{" "}
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
                  title="Auto-detect from URL"
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
                Pick &ldquo;Auto&rdquo; to detect the icon from the URL, or
                choose one to override.
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
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
