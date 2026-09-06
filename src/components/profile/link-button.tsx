"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { buttonClassForStyle } from "@/lib/theme";
import type { ButtonStyle } from "@/types/firebase";
import {
  LinkIcon,
  resolveIconKey,
  isPhoneBasedIcon,
  type IconKey,
} from "@/lib/link-icons";

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
  const [copied, setCopied] = useState(false);

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
  const buttonClasses = cn(
    "relative flex w-full items-center rounded-xl px-6 py-4 text-base font-semibold transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]",
    buttonClassForStyle(buttonStyle),
    featured && "featured-link-glow",
  );

  // Nequi/Bancolombia/DaviPlata personal accounts store a plain phone
  // number here, not a URL — copy it instead of navigating. Business
  // accounts with a real https:// payment link render as a normal link.
  const isPhoneNumber =
    isPhoneBasedIcon(resolvedKey) && !/^https?:\/\//i.test(url);

  if (isPhoneNumber) {
    async function handleCopy() {
      handleClick();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }

    return (
      <button type="button" onClick={handleCopy} className={buttonClasses}>
        <LinkIcon
          iconKey={resolvedKey}
          className="h-5 w-5 shrink-0 opacity-90"
        />
        <span className="flex-1 truncate text-center">
          {copied ? "¡Copiado!" : title}
        </span>
        <span className="h-5 w-5 shrink-0" aria-hidden="true" />
      </button>
    );
  }

  // Email/phone icons store a plain address/number, not a scheme-prefixed
  // URI — construct the mailto:/tel: link here so the device's mail/phone
  // app opens correctly, without requiring the user to type the prefix.
  let href = url;
  if (resolvedKey === "email" && !/^mailto:/i.test(url)) {
    href = `mailto:${url}`;
  } else if (resolvedKey === "phone" && !/^tel:/i.test(url)) {
    href = `tel:${url}`;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={buttonClasses}
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
