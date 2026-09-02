"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { getUserDoc } from "@/lib/firestore/users";

const PLATFORMS: {
  name: string;
  utm: string;
  autoDetect: "reliable" | "desktop-only" | "no";
  note: string;
}[] = [
  {
    name: "YouTube",
    utm: "youtube",
    autoDetect: "desktop-only",
    note: "Works on desktop web. Mobile YouTube app opens links in an in-app browser that strips the referrer.",
  },
  {
    name: "X (Twitter)",
    utm: "twitter",
    autoDetect: "desktop-only",
    note: "Desktop web works via t.co redirect. Mobile X app uses an in-app browser.",
  },
  {
    name: "LinkedIn",
    utm: "linkedin",
    autoDetect: "desktop-only",
    note: "Desktop sometimes works. lnkd.in and the mobile app usually strip the referrer.",
  },
  {
    name: "Instagram",
    utm: "instagram",
    autoDetect: "no",
    note: "Instagram is mobile-first and the app always opens links in an in-app browser. Referrer is lost — UTM required.",
  },
  {
    name: "TikTok",
    utm: "tiktok",
    autoDetect: "no",
    note: "TikTok is mobile-first and uses an in-app browser. UTM required.",
  },
  {
    name: "Skool",
    utm: "skool",
    autoDetect: "no",
    note: "Skool strips the referrer from outbound bio links. UTM required.",
  },
  {
    name: "Email / Newsletter",
    utm: "email",
    autoDetect: "no",
    note: "Email clients don't send a web referrer. UTM required.",
  },
];

const BADGE_STYLES: Record<string, string> = {
  reliable: "bg-green-500/10 text-green-600 dark:text-green-400",
  "desktop-only": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  no: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const BADGE_LABELS: Record<string, string> = {
  reliable: "Auto-detected",
  "desktop-only": "Desktop only",
  no: "UTM required",
};

export default function HelpPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getUserDoc(user.uid).then((doc) => {
      if (doc?.username) setUsername(doc.username);
    });
  }, [user]);

  const base = `https://www.linkfig.app/u/${username ?? "your-handle"}`;

  const copy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Help & Traffic Tracking</h1>
        <p className="text-muted-foreground">
          Learn how LinkFig tracks where your visitors come from — and when you
          need to tag your links.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How traffic sources work</CardTitle>
          <CardDescription>
            There are two ways LinkFig figures out where a click came from.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold">1. Referrer detection (automatic)</h3>
            <p className="text-muted-foreground">
              When someone clicks a link to your LinkFig page, their browser
              often tells us which site they came from. We match that against
              known platforms (YouTube, X, LinkedIn, etc.) and tag the visit.
            </p>
            <p className="mt-2 text-muted-foreground">
              <strong>The catch:</strong> most social apps on mobile open links
              in their own in-app browser, which doesn&apos;t forward the
              referrer. Those visits show as <em>Direct</em>.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              2. UTM tags (reliable — recommended)
            </h3>
            <p className="text-muted-foreground">
              Add <code className="rounded bg-muted px-1">?utm_source=skool</code>{" "}
              (or youtube, tiktok, etc.) to the end of your LinkFig URL before
              you paste it somewhere. This forces the source, even on mobile
              apps and even when the referrer is stripped.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>When do I need a UTM tag?</CardTitle>
          <CardDescription>
            Short answer: always, if you care about accurate attribution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!username && (
            <div className="mb-4 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-400">
              Loading your LinkFig username… if this doesn&apos;t fill in,
              replace{" "}
              <code className="rounded bg-background/50 px-1 font-mono">
                your-handle
              </code>{" "}
              below with your actual handle before sharing.
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Platform</th>
                  <th className="pb-2 pr-4 font-medium">Auto-detect</th>
                  <th className="pb-2 pr-4 font-medium">Your link</th>
                  <th className="pb-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {PLATFORMS.map((p) => {
                  const url = `${base}?utm_source=${p.utm}`;
                  return (
                    <tr key={p.utm} className="border-b last:border-b-0">
                      <td className="py-3 pr-4 align-top">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {p.note}
                        </div>
                      </td>
                      <td className="py-3 pr-4 align-top">
                        <span
                          className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${BADGE_STYLES[p.autoDetect]}`}
                        >
                          {BADGE_LABELS[p.autoDetect]}
                        </span>
                      </td>
                      <td className="py-3 pr-4 align-top">
                        <code className="break-all text-xs text-muted-foreground">
                          {url}
                        </code>
                      </td>
                      <td className="py-3 align-top">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copy(url, p.utm)}
                        >
                          {copied === p.utm ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to use a UTM-tagged link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>1.</strong> Copy the tagged URL from the table above for the
            platform you&apos;re posting to.
          </p>
          <p>
            <strong>2.</strong> Paste it wherever that platform lets you add a
            link — your bio, profile &ldquo;website&rdquo; field, pinned post,
            video description, email footer, etc.
          </p>
          <p>
            <strong>3.</strong> When someone clicks, the tag rides along to
            LinkFig and the visit shows up in your{" "}
            <strong>Traffic Sources</strong> panel under the correct platform
            instead of &ldquo;Direct&rdquo; or &ldquo;Other&rdquo;.
          </p>
          <p className="pt-2">
            You can use a different tag per placement too — e.g.{" "}
            <code className="rounded bg-muted px-1">?utm_source=email</code> in
            a newsletter vs.{" "}
            <code className="rounded bg-muted px-1">?utm_source=skool</code> in
            your Skool bio. Both will be tracked separately.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold">
              Why is so much of my traffic showing as &ldquo;Direct&rdquo;?
            </h3>
            <p className="text-muted-foreground">
              Most of it is probably mobile clicks from social apps. The apps
              strip the referrer, so we can&apos;t tell where the visit came
              from. Use UTM tags to fix this.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              What shows up as &ldquo;Other&rdquo;?
            </h3>
            <p className="text-muted-foreground">
              A referrer we recognized as a real website, but one we don&apos;t
              have a specific icon for — e.g. a blog, a forum, or a platform we
              haven&apos;t added yet.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              Will old clicks get reclassified if I start using UTMs?
            </h3>
            <p className="text-muted-foreground">
              No — historical counts stay as they were recorded. Only new clicks
              pick up the new source.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              Can I use my own custom UTM values?
            </h3>
            <p className="text-muted-foreground">
              The sources in the table above are the ones LinkFig recognizes by
              name. Unknown values roll up as &ldquo;Other&rdquo; so they
              don&apos;t clutter your dashboard with one-off tags.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
