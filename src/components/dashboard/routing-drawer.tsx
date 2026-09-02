"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { LinkDoc, RoutingRule, RoutingSource } from "@/types/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";

const SOURCE_OPTIONS: { value: RoutingSource; label: string }[] = [
  { value: "youtube", label: "YouTube" },
  { value: "twitter", label: "X (Twitter)" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "skool", label: "Skool" },
  { value: "email", label: "Email" },
  { value: "direct", label: "Direct" },
  { value: "other", label: "Other" },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: LinkDoc | null;
  onSave: (linkId: string, routing: LinkDoc["routing"]) => Promise<void>;
}

export function RoutingDrawer({ open, onOpenChange, link, onSave }: Props) {
  const [rules, setRules] = useState<RoutingRule[]>([]);
  const [defaultPriority, setDefaultPriority] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (link) {
      setRules(link.routing?.rules ?? []);
      setDefaultPriority(link.routing?.defaultPriority ?? link.order);
    }
  }, [link]);

  const addRule = useCallback(() => {
    const usedSources = new Set(rules.map((r) => r.source));
    const nextSource =
      SOURCE_OPTIONS.find((o) => !usedSources.has(o.value))?.value ?? "other";
    setRules((prev) => [
      ...prev,
      { source: nextSource, priority: 1, label: "" },
    ]);
  }, [rules]);

  const removeRule = useCallback((index: number) => {
    setRules((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateRule = useCallback(
    (index: number, field: keyof RoutingRule, value: string | number) => {
      setRules((prev) =>
        prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)),
      );
    },
    [],
  );

  async function handleSave() {
    if (!link) return;
    setSaving(true);
    try {
      await onSave(link.id, { rules, defaultPriority });
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  }

  if (!link) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Smart Routing</SheetTitle>
          <SheetDescription>
            Configure how &ldquo;{link.title}&rdquo; is positioned based on
            where visitors come from.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-6 overflow-y-auto px-1 py-6">
          <div className="space-y-2">
            <Label>Default position (when no rule matches)</Label>
            <Input
              type="number"
              min={1}
              value={defaultPriority + 1}
              onChange={(e) =>
                setDefaultPriority(
                  Math.max(0, parseInt(e.target.value || "1", 10) - 1),
                )
              }
            />
            <p className="text-xs text-muted-foreground">
              Position in the link list when no routing rule applies.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Routing rules</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addRule}
              >
                <Plus className="mr-1 h-3 w-3" />
                Add rule
              </Button>
            </div>

            {rules.length === 0 ? (
              <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                No rules yet. Add a rule to prioritize this link for visitors
                from specific sources.
              </p>
            ) : (
              <div className="space-y-3">
                {rules.map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-lg border bg-card p-3"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <select
                          value={rule.source}
                          onChange={(e) =>
                            updateRule(
                              index,
                              "source",
                              e.target.value as RoutingSource,
                            )
                          }
                          className="h-8 flex-1 rounded-md border bg-background px-2 text-sm"
                        >
                          {SOURCE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">
                            Pos:
                          </span>
                          <Input
                            type="number"
                            min={1}
                            value={rule.priority}
                            onChange={(e) =>
                              updateRule(
                                index,
                                "priority",
                                Math.max(
                                  1,
                                  parseInt(e.target.value || "1", 10),
                                ),
                              )
                            }
                            className="h-8 w-16"
                          />
                        </div>
                      </div>
                      <Input
                        placeholder="Label (e.g. YouTube fans)"
                        value={rule.label}
                        onChange={(e) =>
                          updateRule(index, "label", e.target.value)
                        }
                        className="h-8 text-xs"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRule(index)}
                      aria-label="Remove rule"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <SheetFooter>
          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? "Saving..." : "Save routing"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
