"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SOURCE_META: Record<
  string,
  { label: string; domain: string; color: string }
> = {
  youtube: { label: "YouTube", domain: "youtube.com", color: "#FF0000" },
  twitter: { label: "X (Twitter)", domain: "x.com", color: "#1DA1F2" },
  linkedin: { label: "LinkedIn", domain: "linkedin.com", color: "#0A66C2" },
  instagram: { label: "Instagram", domain: "instagram.com", color: "#E4405F" },
  tiktok: { label: "TikTok", domain: "tiktok.com", color: "#010101" },
  skool: { label: "Skool", domain: "skool.com", color: "#F5C518" },
  google: { label: "Google", domain: "google.com", color: "#4285F4" },
  email: { label: "Email", domain: "mail.google.com", color: "#D44638" },
  direct: { label: "Direct", domain: "linkfig.app", color: "#6B7280" },
  other: { label: "Other", domain: "globe.gov", color: "#9CA3AF" },
};

const FALLBACK_COLOR = "#D1D5DB";

function getSourceInfo(source: string) {
  return (
    SOURCE_META[source] ?? {
      label: source.charAt(0).toUpperCase() + source.slice(1),
      domain: source,
      color: FALLBACK_COLOR,
    }
  );
}

interface Props {
  viewsBySource: Record<string, number>;
}

export function TrafficSources({ viewsBySource }: Props) {
  const entries = Object.entries(viewsBySource)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  const total = entries.reduce((sum, [, count]) => sum + count, 0);

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>All-time totals since your profile was created.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No traffic data yet. Share your profile to start seeing where your
            visitors come from.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Build donut chart segments
  const segments: { color: string; startAngle: number; endAngle: number }[] =
    [];
  let currentAngle = -90; // start at top
  for (const [source, count] of entries) {
    const info = getSourceInfo(source);
    const angle = (count / total) * 360;
    segments.push({
      color: info.color,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
    });
    currentAngle += angle;
  }

  function describeArc(
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number,
  ) {
    const rad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(rad(startAngle));
    const y1 = cy + r * Math.sin(rad(startAngle));
    const x2 = cx + r * Math.cos(rad(endAngle));
    const y2 = cy + r * Math.sin(rad(endAngle));
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
        <CardDescription>All-time totals since your profile was created.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {/* Donut chart */}
          <div className="shrink-0">
            <svg width="160" height="160" viewBox="0 0 160 160">
              {entries.length === 1 ? (
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke={getSourceInfo(entries[0][0]).color}
                  strokeWidth="24"
                />
              ) : (
                segments.map((seg, i) => (
                  <path
                    key={i}
                    d={describeArc(80, 80, 60, seg.startAngle, seg.endAngle)}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="24"
                    strokeLinecap="butt"
                  />
                ))
              )}
              <text
                x="80"
                y="76"
                textAnchor="middle"
                className="fill-foreground text-2xl font-bold"
              >
                {total}
              </text>
              <text
                x="80"
                y="94"
                textAnchor="middle"
                className="fill-muted-foreground text-xs"
              >
                views
              </text>
            </svg>
          </div>

          {/* Table */}
          <div className="w-full flex-1">
            <div className="space-y-2">
              {entries.map(([source, count]) => {
                const info = getSourceInfo(source);
                const pct =
                  total > 0 ? ((count / total) * 100).toFixed(1) : "0.0";
                return (
                  <div
                    key={source}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div
                      className="h-3 w-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: info.color }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${info.domain}&sz=16`}
                      alt=""
                      width={16}
                      height={16}
                      className="shrink-0"
                    />
                    <span className="min-w-0 flex-1 truncate">
                      {info.label}
                    </span>
                    <span className="font-medium tabular-nums">{count}</span>
                    <span className="w-14 text-right text-muted-foreground tabular-nums">
                      ({pct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
