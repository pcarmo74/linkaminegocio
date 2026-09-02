# LinkFig

## Project Overview
LinkFig is a free alternative to Linktree. Users sign up, claim a username,
build a link-in-bio profile, customize the theme + font, optionally capture
email subscribers, and share `yourdomain.com/u/<username>`. Every paid
Linktree feature is free here.

The app is live in production and has grown past the original MVP: it now
ships source-based link routing, per-source analytics, email capture, a
featured-link highlight, custom font selection, and site-level stats on the
landing page.

## Tech Stack
- **Framework:** Next.js 15 (App Router) with TypeScript, Turbopack
- **Auth:** Firebase Authentication (email/password + password reset)
- **Database:** Cloud Firestore
- **Storage:** Firebase Storage (avatar uploads)
- **Payments:** Stripe Checkout + webhooks (kept for a future Premium one-time unlock — optional in Phase 1)
- **Styling:** Tailwind CSS v4 + shadcn/ui + `tw-animate-css`
- **Drag-and-drop:** @dnd-kit/core + @dnd-kit/sortable
- **QR codes:** qrcode.react
- **Deployment:** Vercel
- **Theme:** Dark/light/system mode via next-themes

## Features (What Actually Ships)

**Core link-in-bio**
- Email/password signup + login + password-reset flow
- Username claim (case-insensitive, stored lowercase, unique via Firestore transaction)
- Link CRUD with drag-and-drop reorder
- Avatar upload (Firebase Storage), displayName, bio
- 9 theme presets (minimal, sunset, neon, mono, pastel, aurora, brutalist, midnight, earth) with backgroundColor/gradient, button style, colors
- 8 font choices (geist, inter, playfair, space-grotesk, dm-serif, jetbrains-mono, nunito, raleway)
- Public profile at `/u/<username>` (server-rendered via Admin SDK)
- QR code generator pointing to the public profile
- Toggles to show/hide email and handle on the public profile

**Featured link**
- One link per user can be marked `featured: true`, rendered with a highlight glow on the public profile

**Link icons**
- Icons auto-detected from URL (YouTube, Twitter, etc.) or manually overridden per link (`iconKey`)

**Source-based routing**
- Incoming visitors classified as `youtube | twitter | linkedin | instagram | tiktok | skool | email | direct | other` via UTM param (`utm_source`) or referrer hostname
- Each link has per-source routing rules (`source` + `priority`) so creators can reorder what shows first depending on which platform sent the visitor
- Routing views and clicks recorded separately for analytics

**Per-source analytics**
- `StatsSummary` tracks `views`, `clicks`, and `viewsBySource`
- Each `LinkDoc` tracks `clicks` and `clicksBySource`
- Dashboard shows a traffic-sources breakdown and a routing-performance view

**Email capture**
- Users can enable a signup form on their public profile (`emailCaptureEnabled`, `emailCaptureMessage`)
- Captured emails stored per-user in a `subscribers` subcollection
- Dashboard has a subscribers page to view/export them

**Site-level stats**
- Aggregated views across all LinkFig profiles are tracked and displayed on the public landing page (social proof)

**Help page**
- `dashboard/help/` — guides on UTM parameters, traffic tracking, and routing usage

**Stripe (wired but optional)**
- `UserDoc` stores `stripeCustomerId`, `subscriptionStatus`, `subscriptionPriceId` for a future Premium one-time unlock
- LinkFig is free in Phase 1; Stripe env vars can be left blank

## Project Structure
```
src/
  app/
    (auth)/                    login, signup, forgot-password
    (dashboard)/               protected dashboard pages
      dashboard/               overview (stats + traffic sources)
      dashboard/links/         link CRUD + drag-drop reorder + per-link routing
      dashboard/appearance/    theme, font, avatar, displayName, bio
      dashboard/subscribers/   email-capture subscriber list
      dashboard/help/          UTM / traffic-tracking guide
      dashboard/settings/      change password, sign out
    (legal)/                   terms, privacy
    u/[username]/              PUBLIC profile page (server-rendered) + not-found
    api/
      username/check/          GET availability check
      track/view/              POST page-view increment (by source)
      track/click/             POST link-click increment (by source)
      site-stats/              GET aggregated site-wide stats
      routing-performance/     GET per-user routing analytics
      subscribe/               POST email-capture form submission
      subscribers/             GET/DELETE a user's subscriber list
      webhooks/stripe/         Stripe webhook handler
  components/
    ui/                        shadcn/ui components
    auth/                      login-form, signup-form, forgot-password-form
    landing/                   navbar, hero, features, how-it-works, logo-bar,
                               stats, site-stats-display, site-view-tracker,
                               pricing, testimonials, faq, cta, cta-link,
                               footer, illustrations
    dashboard/                 sidebar, header, link-editor-dialog,
                               sortable-link-row, qr-code-dialog,
                               routing-drawer, traffic-sources
    profile/                   link-button, routed-links, email-capture,
                               page-view-tracker
    providers.tsx
    theme-toggle.tsx
  lib/
    firebase/                  client.ts, admin.ts, auth.ts, storage.ts
    firestore/                 users.ts, links.ts, analytics.ts (admin),
                               admin-queries.ts (admin), site-stats.ts,
                               subscribers.ts, mail.ts
    stripe/                    client.ts, server.ts, checkout.ts, webhooks.ts
    theme.ts                   ProfileTheme + 9 preset themes
    fonts.ts                   Next/font configs for the 8 selectable fonts
    link-icons.tsx             Icon auto-detect + manual override map
    routing.ts                 Source classification + routing rule application
    username.ts                validation + reserved words
    track-cta.ts               Landing-page CTA tracking helper
    utils.ts                   cn()
  context/                     auth-context.tsx (syncs ID token to /api/login)
  hooks/                       use-auth.ts
  types/                       firebase.ts (UserDoc, LinkDoc, ProfileTheme,
                               RoutingRule, RoutingViewDoc, RoutingClickDoc,
                               StatsSummary, SubscriberDoc)
                               index.ts
  middleware.ts                next-firebase-auth-edge — protects /dashboard/*
```

## Key data model
- `users/{uid}` → `UserDoc` — `username`, `displayName`, `bio`, `avatarUrl`, `theme`, `fontFamily`, `emailCaptureEnabled`, `emailCaptureMessage`, `showEmail`, `showHandle`, Stripe fields
- `usernames/{username}` → `{ uid }` — unique claim index, written transactionally, keys stored lowercase
- `users/{uid}/links/{linkId}` → `LinkDoc` — `title`, `url`, `order`, `active`, `clicks`, `clicksBySource`, `featured`, `iconKey`, `routing.rules[]`, `routing.defaultPriority`
- `users/{uid}/stats/summary` → `StatsSummary` — `views`, `clicks`, `viewsBySource` (Admin SDK + `FieldValue.increment`)
- `users/{uid}/subscribers/{email}` → `SubscriberDoc` — `email`, `subscribedAt`
- `users/{uid}/routing-views/*` and `/routing-clicks/*` → per-source analytics rows (`RoutingViewDoc`, `RoutingClickDoc`)
- `site-stats/summary` → aggregated views across all profiles

## Key architecture
- Firebase Client SDK (`lib/firebase/client.ts`) — browser only
- Firebase Admin SDK (`lib/firebase/admin.ts`) — server only, `server-only` guard
- Public profile `/u/[username]` is a server component using the Admin SDK for fast reads; re-orders links via `lib/routing.ts` based on the visitor's source
- Source classification happens client-side via `detectSource()` (UTM param first, referrer second) and is passed to the tracking APIs
- Click/view tracking routes use the Admin SDK with `FieldValue.increment` on both user-level and per-source counters
- Middleware uses `next-firebase-auth-edge` to protect `/dashboard/*`; it reads the `__session` cookie that `AuthProvider` maintains by POSTing the ID token to `/api/login` whenever auth state changes
- Username claims run in a Firestore transaction that writes both `usernames/{name}` and `users/{uid}.username` atomically

## Commands
- `pnpm dev` — Start dev server (Turbopack)
- `pnpm build` — Production build
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint
- `pnpm format` — Run Prettier

## Environment Variables
All secrets live in `.env.local` (gitignored). `.env.example` is committed as
a reference. Firebase client + admin SDK credentials are required. Stripe
vars are optional in Phase 1 — LinkFig is free.

## Security Rules (REQUIRED before going to production)

The Firebase Console defaults to **test mode** during setup, which allows
anyone to read and write any document. This is fine for local development
but **must be tightened before deploying**. Users cloning this boilerplate
are expected to paste the rules below into their Firebase Console:

- Firestore: Firebase Console → **Firestore Database** → **Rules** tab → paste → Publish
- Storage: Firebase Console → **Storage** → **Rules** tab → paste → Publish

When a user asks Claude Code something like *"am I ready to deploy?"* or
*"help me go to production"*, Claude Code should confirm these rules are
published before approving the deploy.

### Firestore rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Public profiles — anyone can read; only the owner writes.
    match /users/{uid} {
      allow read: if true;
      allow create: if request.auth != null && request.auth.uid == uid;
      allow update: if request.auth != null && request.auth.uid == uid;
      allow delete: if false; // Account deletion is a deferred feature

      // Links — public read (needed for /u/<username>); owner-only writes.
      match /links/{linkId} {
        allow read: if true;
        allow write: if request.auth != null && request.auth.uid == uid;
      }

      // Stats — owner read; writes go through the Admin SDK (bypasses rules).
      match /stats/{doc} {
        allow read: if request.auth != null && request.auth.uid == uid;
        allow write: if false;
      }

      // Subscribers — owner read only; submissions go through /api/subscribe
      // (server route, Admin SDK). No client-side writes.
      match /subscribers/{email} {
        allow read: if request.auth != null && request.auth.uid == uid;
        allow write: if false;
      }

      // Routing analytics — owner read; Admin-SDK writes only.
      match /routing-views/{id} {
        allow read: if request.auth != null && request.auth.uid == uid;
        allow write: if false;
      }
      match /routing-clicks/{id} {
        allow read: if request.auth != null && request.auth.uid == uid;
        allow write: if false;
      }
    }

    // Username claim index — public read (availability checks).
    // Write-once: create only with your own uid; never update or delete.
    match /usernames/{name} {
      allow read: if true;
      allow create: if request.auth != null
                    && request.resource.data.uid == request.auth.uid;
      allow update, delete: if false;
    }

    // Site-wide aggregated stats — public read; Admin-SDK writes only.
    match /site-stats/{doc} {
      allow read: if true;
      allow write: if false;
    }

    // Trigger Email extension queue — server-only.
    match /mail/{id} {
      allow read, write: if false;
    }
  }
}
```

### Storage rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Avatars — public read (shown on public profiles).
    // Owner-only write, max 5 MB, images only.
    match /avatars/{uid}/{file} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.auth.uid == uid
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

### Pre-production checklist
Before the first production deploy, Claude Code should verify with the user:

1. Firestore rules have been published (not still in test mode)
2. Storage rules have been published (not still in test mode)
3. The Firebase authorized-domains list includes the Vercel URL (and custom domain if applicable)
4. `NEXT_PUBLIC_APP_URL` in Vercel matches the actual deploy URL
5. (If Stripe is enabled) the production webhook endpoint is configured with the live `STRIPE_WEBHOOK_SECRET`

## Conventions
- Client components use `"use client"` directive
- Server-only modules use `import "server-only"` guard
- shadcn/ui components live in `src/components/ui/`
- Feature components grouped by domain (`auth/`, `landing/`, `dashboard/`, `profile/`)
- All imports use `@/` path alias
- Use `cn()` from `lib/utils` for conditional class merging
- Add new shadcn components: `pnpm dlx shadcn@latest add [name]`

## Deferred for later phases
- Link scheduling (`startDate` / `endDate`)
- Link types beyond plain URL (header, embed, tip jar, product)
- Full theme customizer with live preview (presets + font picker ship in Phase 1; no custom color picker UI yet)
- Referrer/country breakdown in analytics (source breakdown ships)
- CSV export for email-capture subscribers (list view ships)
- Stripe Connect / tip jar / product sales
- LinkFig Premium one-time unlock (Stripe wiring ships, but no paid features gated yet)
- Custom domains via Vercel Domains API
- Sitemap, delete-account, change-email, change-username flows
