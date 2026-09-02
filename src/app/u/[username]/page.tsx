import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProfileByUsername } from "@/lib/firestore/admin-queries";
import { themeToCssVars, buttonClassForStyle } from "@/lib/theme";
import { getFontOption } from "@/lib/fonts";
import { RoutedLinks } from "@/components/profile/routed-links";
import { EmailCapture } from "@/components/profile/email-capture";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfileByUsername(username);
  if (!profile) {
    return { title: "Profile not found" };
  }

  const title = `${profile.user.displayName || profile.user.username} (@${profile.user.username}) · LinkFig`;
  const description = profile.user.bio || `Find ${profile.user.username} on LinkFig`;
  const ogImage = profile.user.avatarUrl ?? undefined;

  return {
    title,
    description,
    alternates: { canonical: `/u/${profile.user.username}` },
    openGraph: {
      title,
      description,
      url: `/u/${profile.user.username}`,
      type: "profile",
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;
  const profile = await getProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const { user, links } = profile;
  const styleVars = themeToCssVars(user.theme);
  const font = getFontOption(user.fontFamily ?? "geist");

  return (
    <>
      {font.googleUrl && (
        // eslint-disable-next-line @next/next/no-page-custom-font
        <link rel="stylesheet" href={font.googleUrl} />
      )}
      <main
        className="min-h-screen px-5 py-12"
        style={{ ...styleVars, fontFamily: font.cssFamily }}
      >
      <div className="mx-auto flex max-w-md flex-col items-center gap-6">
        <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white/20 bg-white/10">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.displayName || user.username}
              width={96}
              height={96}
              className="h-full w-full object-cover"
              unoptimized
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl font-bold">
              {(user.displayName || user.username)
                .charAt(0)
                .toUpperCase()}
            </div>
          )}
        </div>

        <div className="text-center">
          <h1 className="text-xl font-bold">
            {user.displayName || user.username}
          </h1>
          {user.showHandle && (
            <p className="text-sm opacity-80">@{user.username}</p>
          )}
          {user.showEmail && user.email && (
            <p className="mt-1 text-sm opacity-70">{user.email}</p>
          )}
        </div>

        {user.bio && (
          <p className="text-center text-sm opacity-90">{user.bio}</p>
        )}

        <RoutedLinks
          uid={user.uid}
          links={links}
          buttonStyle={user.theme.buttonStyle}
        />

        {user.emailCaptureEnabled && (
          <EmailCapture
            uid={user.uid}
            message={user.emailCaptureMessage}
            buttonStyle={buttonClassForStyle(user.theme.buttonStyle)}
          />
        )}

        <Link
          href="/"
          className="mt-8 text-xs opacity-60 hover:opacity-100"
        >
          Built with LinkFig
        </Link>
      </div>
    </main>
    </>
  );
}
