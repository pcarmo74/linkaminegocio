"use client";

import Link from "next/link";
import { trackCTA } from "@/lib/track-cta";
import type { ComponentProps } from "react";

/**
 * Drop-in replacement for next/link that pings the global CTA counter
 * on click. Use for any landing-page CTA that drives users to /signup
 * (or similar conversion endpoints).
 */
export function CTALink(props: ComponentProps<typeof Link>) {
  const { onClick, ...rest } = props;
  return (
    <Link
      {...rest}
      onClick={(e) => {
        trackCTA();
        onClick?.(e);
      }}
    />
  );
}
