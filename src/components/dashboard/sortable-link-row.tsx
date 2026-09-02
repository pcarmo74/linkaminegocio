"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Sparkles, Trash2, Zap } from "lucide-react";
import type { LinkDoc } from "@/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { LinkIcon, resolveIconKey, type IconKey } from "@/lib/link-icons";

interface Props {
  link: LinkDoc;
  onToggle: (id: string, active: boolean) => void;
  onEdit: (link: LinkDoc) => void;
  onDelete: (id: string) => void;
  onRouting: (link: LinkDoc) => void;
  onToggleFeatured: (id: string, featured: boolean) => void;
}

export function SortableLinkRow({
  link,
  onToggle,
  onEdit,
  onDelete,
  onRouting,
  onToggleFeatured,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const hasRules = (link.routing?.rules?.length ?? 0) > 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm",
        isDragging && "opacity-50",
      )}
    >
      <button
        type="button"
        className="cursor-grab touch-none text-muted-foreground"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={() => onToggleFeatured(link.id, !link.featured)}
        aria-label={link.featured ? "Unfeature link" : "Feature link"}
        aria-pressed={link.featured === true}
        title={
          link.featured
            ? "Featured — click to remove highlight"
            : "Feature this link (highlights it on your public profile)"
        }
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors",
          link.featured
            ? "bg-primary/15 text-primary ring-2 ring-primary"
            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
        )}
      >
        {link.featured ? (
          <Sparkles className="h-5 w-5" />
        ) : (
          <LinkIcon
            iconKey={resolveIconKey(link.url, link.iconKey as IconKey | null)}
            className="h-5 w-5"
          />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{link.title}</div>
        <div className="truncate text-xs text-muted-foreground">{link.url}</div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span>
            {link.clicks} {link.clicks === 1 ? "click" : "clicks"}
          </span>
          {hasRules && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
              <Zap className="h-2.5 w-2.5" />
              {link.routing.rules.length} rule
              {link.routing.rules.length !== 1 && "s"}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          checked={link.active}
          onCheckedChange={(checked) => onToggle(link.id, checked === true)}
          aria-label="Toggle link visibility"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onRouting(link)}
          aria-label="Smart routing"
          className={hasRules ? "text-primary" : ""}
        >
          <Zap className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onEdit(link)}
          aria-label="Edit link"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onDelete(link.id)}
          aria-label="Delete link"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
