# LinkFig — Free Link-in-Bio Boilerplate

A full-stack, free-alternative-to-Linktree boilerplate. Users sign up, claim a username, build a link-in-bio profile, customize the theme and font, optionally capture email subscribers, and share `yourdomain.com/u/<username>`. Every paid Linktree feature ships free.

Built with Next.js 15, Firebase, Tailwind CSS v4, and shadcn/ui. Stripe is wired up for an optional future Premium one-time unlock but is not required to run the app.

## Features

- **Auth** — email/password signup, login, password reset (no social login dependency)
- **Username claim** — unique, case-insensitive, written in a Firestore transaction
- **Link CRUD + drag-drop reorder** via `@dnd-kit`
- **9 theme presets** (minimal, sunset, neon, mono, pastel, aurora, brutalist, midnight, earth) + button-style picker
- **8 font choices** (geist, inter, playfair, space-grotesk, dm-serif, jetbrains-mono, nunito, raleway)
- **Avatar upload** to Firebase Storage + displayName + bio
- **Featured link** — highlight one link with a glow on the public profile
- **Link icons** auto-detected from URL, or manually overridden per link
- **Public profile** at `/u/<username>` (server-rendered for speed + SEO)
- **QR codes** pointing to the public profile
- **Source-based link routing** — reorder links by traffic source (YouTube, Twitter, LinkedIn, Instagram, TikTok, Skool, email, direct) using UTM params or referrer
- **Per-source analytics** — views and clicks broken down by source, routing-performance view in the dashboard
- **Email capture** — opt-in form on the public profile, subscribers list in the dashboard
- **Site-level stats** — aggregated views across all profiles shown on the landing page
- **Dark / light / system theme** via `next-themes`
- **Stripe** wired for a future one-time Premium unlock (optional in Phase 1)

## Tech Stack

- **Next.js 15** — App Router, Server Actions, TypeScript, Turbopack
- **Firebase** — Authentication (email/password + password reset), Cloud Firestore, Storage (avatar uploads)
- **Tailwind CSS v4** + **shadcn/ui** — Themeable UI with dark/light/system mode via `next-themes`
- **@dnd-kit** — Drag-and-drop link reordering
- **qrcode.react** — QR codes for public profiles
- **Stripe** *(optional)* — Checkout + webhooks, kept for a future Premium unlock
- **Vercel** — One-click deployment

## Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- A Firebase project
- (Optional) A Stripe account — only if you plan to enable Premium
- (Optional) A Vercel account for deployment

## Getting Started

### 1. Use this template

Click the green **"Use this template"** button on GitHub, then clone your new repo:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in the Firebase values in `.env.local`. See the sections below for where to find each one. Stripe values can be left blank — the app runs fine without them.

### 4. Start development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project
2. Enable **Authentication** → Sign-in methods: **Email/Password**
3. Create a **Cloud Firestore** database (start in test mode for development)
4. Enable **Storage** (for avatar uploads)
5. Go to Project Settings → General → Your apps → Add web app
   - Copy the config values to your `NEXT_PUBLIC_FIREBASE_*` env vars
6. Go to Project Settings → Service Accounts → Generate new private key
   - Copy `project_id`, `client_email`, and `private_key` into the `FIREBASE_ADMIN_*` env vars

### Email Setup (Optional)

To enable password-reset and welcome emails:

1. Firebase Console → Extensions → Browse
2. Install **"Trigger Email from Firestore"**
3. Connect a SendGrid account (free tier: 100 emails/day)
4. Set the collection path to `mail`

## Stripe Setup (Optional — for future Premium unlock)

Phase 1 of LinkFig is free, so Stripe is optional. If you want to keep the Premium wiring live:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/) → Developers → API Keys
   - Copy Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Copy Secret key → `STRIPE_SECRET_KEY`
2. Create a one-time Price for Premium
   - Copy the Price ID → `STRIPE_PRO_PRICE_ID`
3. For local webhook testing, install the [Stripe CLI](https://stripe.com/docs/stripe-cli):

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret → `STRIPE_WEBHOOK_SECRET`.

## Cookie Secrets

Generate secure cookie secrets for the auth middleware:

```bash
openssl rand -base64 32  # COOKIE_SECRET_CURRENT
openssl rand -base64 32  # COOKIE_SECRET_PREVIOUS
```

On Windows without openssl:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |

## Project Structure

```
src/
├── app/
│   ├── (auth)/                     # login, signup, forgot-password
│   ├── (dashboard)/                # protected dashboard
│   │   ├── dashboard/              # overview (stats + traffic sources)
│   │   ├── dashboard/links/        # link CRUD + drag-drop + per-link routing
│   │   ├── dashboard/appearance/   # theme, font, avatar, displayName, bio
│   │   ├── dashboard/subscribers/  # email-capture subscriber list
│   │   ├── dashboard/help/         # UTM / traffic-tracking guide
│   │   └── dashboard/settings/     # change password, sign out
│   ├── (legal)/                    # terms, privacy
│   ├── u/[username]/               # PUBLIC profile page (server-rendered)
│   └── api/
│       ├── username/check/         # availability check
│       ├── track/view/             # page-view increment (by source)
│       ├── track/click/            # link-click increment (by source)
│       ├── site-stats/             # aggregated site-wide stats
│       ├── routing-performance/    # per-user routing analytics
│       ├── subscribe/              # email-capture form submission
│       ├── subscribers/            # subscriber list CRUD
│       └── webhooks/stripe/        # Stripe webhook handler
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── auth/               # login-form, signup-form, forgot-password-form
│   ├── landing/            # navbar, hero, features, how-it-works, logo-bar,
│   │                       # stats, site-stats-display, site-view-tracker,
│   │                       # pricing, testimonials, faq, cta, footer
│   ├── dashboard/          # sidebar, header, link-editor-dialog,
│   │                       # sortable-link-row, qr-code-dialog,
│   │                       # routing-drawer, traffic-sources
│   └── profile/            # link-button, routed-links, email-capture,
│                           # page-view-tracker
├── lib/
│   ├── firebase/           # client.ts, admin.ts, auth.ts, storage.ts
│   ├── firestore/          # users, links, analytics, admin-queries,
│   │                       # site-stats, subscribers, mail
│   ├── stripe/             # client, server, checkout, webhooks
│   ├── theme.ts            # ProfileTheme + 9 preset themes
│   ├── fonts.ts            # Next/font configs for 8 selectable fonts
│   ├── link-icons.tsx      # Icon auto-detect + manual override map
│   ├── routing.ts          # Source classification + routing rule application
│   ├── username.ts         # Validation + reserved words
│   └── track-cta.ts        # Landing-page CTA tracking helper
├── context/                # auth-context.tsx
├── hooks/                  # use-auth.ts
├── types/                  # firebase.ts (UserDoc, LinkDoc, RoutingRule,
│                           # StatsSummary, SubscriberDoc, etc.)
└── middleware.ts           # next-firebase-auth-edge route protection
```

## Key Architecture

- **Firebase Client SDK** (`lib/firebase/client.ts`) — browser only
- **Firebase Admin SDK** (`lib/firebase/admin.ts`) — server only, guarded by `server-only`
- **Public profile `/u/[username]`** is a server component using the Admin SDK for fast reads
- **Click/view tracking routes** use the Admin SDK with `FieldValue.increment`
- **Middleware** uses `next-firebase-auth-edge` to protect `/dashboard/*`
- **Username claims** run in a Firestore transaction that writes both `usernames/{name}` and `users/{uid}.username` atomically

## Deployment to Vercel

1. Push your repo to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add all environment variables from `.env.local` to the Vercel project settings
4. Deploy

**Note:** For the `FIREBASE_ADMIN_PRIVATE_KEY` env var on Vercel, paste the full key including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` markers. Vercel handles the newlines automatically.

If you're using Stripe, update your webhook endpoint to `https://your-domain.vercel.app/api/webhooks/stripe` after deploying.

## License

MIT
