"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { buttonClassForStyle } from "@/lib/theme";
import type { ButtonStyle } from "@/types/firebase";
import { LinkIcon, resolveIconKey, type IconKey } from "@/lib/link-icons";

interface Props {
  uid: string;
  linkId: string;
  title: string;
  url: string;
  buttonStyle: ButtonStyle;
  iconKey?: string | null;
  source?: string;
  positionShown?: number;
  featured?: boolean;
}

export function LinkButton({
  uid,
  linkId,
  title,
  url,
  buttonStyle,
  iconKey,
  source,
  positionShown,
  featured,
}: Props) {
  const handleClick = useCallback(() => {
    fetch("/api/track/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid,
        linkId,
        source: source ?? undefined,
        positionShown: positionShown ?? undefined,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [uid, linkId, source, positionShown]);

  const resolvedKey = resolveIconKey(url, iconKey as IconKey | null | undefined);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        "relative flex w-full items-center rounded-xl px-6 py-4 text-base font-semibold transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]",
        buttonClassForStyle(buttonStyle),
        featured && "featured-link-glow",
      )}
    >
      <LinkIcon
        iconKey={resolvedKey}
        className="h-5 w-5 shrink-0 opacity-90"
      />
      <span className="flex-1 truncate text-center">{title}</span>
      {/* Spacer so title stays visually centered. */}
      <span className="h-5 w-5 shrink-0" aria-hidden="true" />
    </a>
  );
}
