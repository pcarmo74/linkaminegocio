"use client";

import { useEffect, useMemo, useState } from "react";
import type { LinkDoc, ButtonStyle } from "@/types/firebase";
import { detectSource, applyRoutingRules } from "@/lib/routing";
import { LinkButton } from "@/components/profile/link-button";

interface Props {
  uid: string;
  links: LinkDoc[];
  buttonStyle: ButtonStyle;
}

export function RoutedLinks({ uid, links, buttonStyle }: Props) {
  const [source, setSource] = useState("direct");

  // Single effect: detect source + track view, runs once on mount
  useEffect(() => {
    const detected = detectSource();
    setSource(detected);

    const key = `linkfig:viewed:${uid}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    const sorted = applyRoutingRules(links, detected);

    fetch("/api/track/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid,
        source: detected,
        linkOrderShown: sorted.map((l) => l.id),
      }),
      keepalive: true,
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const sortedLinks = useMemo(
    () => applyRoutingRules(links, source),
    [links, source],
  );

  return (
    <div className="flex w-full flex-col gap-3">
      {sortedLinks.length === 0 ? (
        <p className="text-center text-sm opacity-70">Aún no hay enlaces.</p>
      ) : (
        sortedLinks.map((link, index) => (
          <LinkButton
            key={link.id}
            uid={uid}
            linkId={link.id}
            title={link.title}
            url={link.url}
            buttonStyle={buttonStyle}
            iconKey={link.iconKey}
            source={source}
            positionShown={index}
            featured={link.featured}
          />
        ))
      )}
    </div>
  );
}
