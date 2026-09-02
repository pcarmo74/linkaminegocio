# LinkFig Setup Guide

LinkFig is a free link-in-bio app (a free alternative to Linktree). This guide maps to **Modules 1–5** of the course. By the end of Module 5, your app will be fully running locally and deployed live. Module 6 is where you build your own custom app from scratch.

**Claude Code handles most of the setup for you.** Once you have VS Code, the Claude Code extension, and the repo cloned (Module 1), just open the Claude Code chat panel and type `help me set up this project`. It will guide you through the rest.

The sections below explain what happens at each module, in case you want to understand the details or troubleshoot.

---

## Table of Contents

- [Module 1: Getting Started](#module-1-getting-started)
- [Module 2: Preparing the Environment](#module-2-preparing-the-environment)
- [Module 3: The Backend](#module-3-the-backend)
- [Module 4: Storage and Payments (Optional)](#module-4-storage-and-payments-optional)
- [Module 5: Run Locally + Push to Live](#module-5-run-locally--push-to-live)
- [Troubleshooting](#troubleshooting)

---

## Module 1: Getting Started

*Install Tools, Clone, Claude Code*

### Step 1 — Get your boilerplate copy

Before writing a single line of code, you need your own copy of the SaaS boilerplate.

**1. Create a free GitHub account**

GitHub is where your code lives. You need a free account to receive and store your copy of the boilerplate.

Sign up at [github.com](https://github.com)

1. Enter your email address and choose a password
2. Pick a username — this will be public, keep it professional
3. Verify your email when prompted
4. You can skip all the optional setup steps

**2. Send your GitHub username to Ben**

Once you have your account, DM your GitHub username to Ben so you can be granted access to the private repo.

### Step 2 — Install your tools

You need two things: VS Code (your code editor) and Claude Code (your AI coding assistant). Once these are installed, Claude Code will handle everything else.

**1. Install VS Code**

Download it at [code.visualstudio.com](https://code.visualstudio.com)

1. Click **Download for Windows** (or Mac)
2. Run the installer — accept all defaults
3. Open VS Code when it's done

**2. Install the Claude Code extension**

1. In VS Code, click the Extensions icon in the left sidebar (or press `Ctrl+Shift+X`)
2. Search for **Claude Code**
3. Click **Install** on the one by Anthropic
4. You'll need an Anthropic account — create one at [console.anthropic.com](https://console.anthropic.com) if you don't have one
5. Follow the prompts to sign in

**3. Open the project**

1. In VS Code, press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type **"Clone Git Repository"** and select it
3. Paste your repo URL — this is the URL of your own copy from Step 1, found on your GitHub profile
4. Pick a folder (e.g., Documents) and click **Select as Repository Destination**
5. When prompted, click **Open** to open the project

> **If the clone fails**, make sure you've completed Step 1 and accepted the GitHub invitation from Ben — then try again.

**4. Let Claude Code set everything up**

1. Open the Claude Code chat panel in VS Code
2. Type:

```
help me set up this project
```

3. Claude Code reads the project's `CLAUDE.md` file and will:
   - Check if Git, Node.js, and pnpm are installed (and install what's missing)
   - Install the project dependencies
   - Create your environment config file
   - Walk you through setting up Firebase (and optionally Stripe) — one at a time
   - Start the app when everything's ready

Just follow along — Claude Code will tell you exactly what to do at each step and where to go in your browser. When it asks you to paste something, paste it right into the chat.

---

## Module 2: Preparing the Environment

*Dependencies, Environment Config, Secrets*

**What Claude Code does automatically (no input needed):**

- Checks if Git, Node.js, and pnpm are installed — installs what's missing
- Runs `pnpm install` to install project dependencies
- Creates `.env.local` from `.env.example` if it doesn't exist
- Generates two cookie secrets and writes them to `.env.local`
- Sets `NEXT_PUBLIC_APP_URL=http://localhost:3000`

### All config ends up in `.env.local`

Every value is written into a single file: **`.env.local`**. Nothing is hidden in other config files. If you ever need to check or change a value, that's the only place to look.

**This file is safe and private.** The `.gitignore` ignores all `.env*` files except `.env.example` (which only has empty placeholders). Your keys and secrets will never be committed to GitHub.

### Cookie Secrets

Claude Code generates these automatically. If you ever need to regenerate manually:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Run it twice — one for `COOKIE_SECRET_CURRENT`, one for `COOKIE_SECRET_PREVIOUS`.

---

## Module 3: The Backend

*Firebase — Auth + Database*

Claude Code will prompt you for values from Firebase. Here's what you'll do in your browser:

### Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Sign in with a Google account
3. Click **"Create a project"** — name it whatever you like (e.g., `linkfig-app`)
4. You can disable Google Analytics (not needed)
5. Click **"Create project"** and wait for it to finish

### Firebase Client Config

Where to find it: Firebase Console > Project Settings (gear icon) > Your apps > Web app

If you haven't registered a web app yet:
1. Click the web icon (`</>`)
2. Enter a nickname (e.g., `linkfig-web`)
3. Skip Firebase Hosting setup
4. Click **Register app**

You'll see a `firebaseConfig` object like this:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

Paste the whole thing to Claude Code. It maps to these `.env.local` values:

| Config key | Env variable |
|-----------|-------------|
| `apiKey` | `NEXT_PUBLIC_FIREBASE_API_KEY` |
| `authDomain` | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` |
| `projectId` | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` |
| `storageBucket` | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` |
| `messagingSenderId` | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` |
| `appId` | `NEXT_PUBLIC_FIREBASE_APP_ID` |

### Firebase Admin (Service Account)

Where to find it: Firebase Console > Project Settings > Service accounts > Generate new private key

This downloads a JSON file. Open it and paste the contents to Claude Code. It extracts:

| JSON key | Env variable |
|---------|-------------|
| `project_id` | `FIREBASE_ADMIN_PROJECT_ID` |
| `client_email` | `FIREBASE_ADMIN_CLIENT_EMAIL` |
| `private_key` | `FIREBASE_ADMIN_PRIVATE_KEY` |

**Important:** The private key in `.env.local` must be wrapped in double quotes with `\n` for newlines.

### Enable Auth & Create Firestore

These are quick toggles in the Firebase Console:

**Authentication:**
1. Click **Authentication** in the sidebar > **Get started**
2. Enable **Email/Password** (toggle on, save)

**Firestore:**
1. Click **Firestore Database** in the sidebar > **Create database**
2. Select **Start in test mode**
3. Pick the closest server location > **Enable**

---

## Module 4: Storage and Payments (Optional)

*Firebase Storage (avatars) + Stripe (future Premium unlock)*

### Firebase Storage (Avatar Uploads)

LinkFig users can upload a profile avatar. This is stored in Firebase Storage — enable it before going live or the avatar upload will fail.

1. In the Firebase Console, click **Storage** in the sidebar → **Get started**
2. Accept the default security rules (test mode for development — tighten before production)
3. Pick the closest location → **Done**

No additional env vars are needed — `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` (already set in Module 3) is what the client uses.

### Stripe (Optional — for a future Premium one-time unlock)

**LinkFig is free in Phase 1.** Every paid Linktree feature ships free, so Stripe is **not required** to run the app. The Stripe wiring is kept in the codebase for a future Premium unlock — if you don't plan to charge for anything yet, skip this section and leave the Stripe env vars blank.

If you do want the Stripe flow live:

**Stripe API Keys** — Dashboard → Developers → API keys (Test mode ON):

1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com) and create an account if you haven't
2. Toggle **Test mode** ON (top-right)
3. Developers → API keys

| Key | Env variable |
|-----|-------------|
| Publishable key (`pk_test_...`) | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` |
| Secret key (`sk_test_...`) | `STRIPE_SECRET_KEY` |

**Stripe Product & Price** (one-time, not recurring — LinkFig Premium is a one-time unlock):

1. Stripe Dashboard → Product catalog → **+ Add product**
2. Name: `LinkFig Premium` (or whatever you like)
3. Pricing: **One-off** at your chosen price
4. Save, then copy the **Price ID** (`price_...`)

| Value | Env variable |
|-------|-------------|
| Price ID | `STRIPE_PRO_PRICE_ID` |

**Stripe Webhook Secret** (for local testing):

1. Open a **separate terminal**
2. Run `stripe login` → click **Allow access** in the browser
3. Run `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Copy the webhook signing secret (`whsec_...`)

| Value | Env variable |
|-------|-------------|
| Signing secret | `STRIPE_WEBHOOK_SECRET` |

**Keep that terminal running** while testing payments locally.

> **Don't have Stripe CLI?** Claude Code can install it for you, or run `winget install Stripe.StripeCLI` (Windows) and restart your terminal.

---

## Module 5: Run Locally + Push to Live

*Launch Locally, Verify Everything, Deploy to Vercel*

### Launch Locally

Claude Code will start the dev server for you by running `pnpm dev`. Open [http://localhost:3000](http://localhost:3000) in your browser and verify each feature:

### Verification Checklist

1. **Landing page** — LinkFig landing page loads with hero, features, how-it-works, testimonials, pricing, FAQ, CTA, footer, plus live site-level stats
2. **Theme toggle** — sun/moon icon in the navbar switches light/dark mode
3. **Legal pages** — "Terms of Service" and "Privacy Policy" links in the footer work
4. **Sign up** — go to `/signup` and create an account (email + password); you should land on the dashboard
5. **Claim a username** — pick a username in the dashboard; the availability check shows "available" before submit
6. **Forgot password** — log out, go to `/login`, click "Forgot password?", verify the email flow (requires the Firestore "Trigger Email" extension if you set it up)
7. **Add a link** — in **Dashboard → Links**, add a title + URL, save. It should appear in the list with an auto-detected icon.
8. **Reorder links** — drag a link up or down. Order persists after refresh.
9. **Featured link** — mark a link as featured. Only one can be featured at a time; the public profile renders it with a highlight glow.
10. **Per-link routing rules** — open a link's editor, add a routing rule (e.g., prioritize this link when traffic comes from `youtube`). Save.
11. **Appearance** — upload an avatar, edit display name + bio, pick a theme preset, pick a font. Save.
12. **Public profile** — open `http://localhost:3000/u/<your-username>` in an incognito window. Avatar, theme, font, bio, and links should render.
13. **Source-based routing** — visit `http://localhost:3000/u/<your-username>?utm_source=youtube`. Links should reorder according to any YouTube routing rules you set in step 10.
14. **View/click tracking (by source)** — click a link from the public profile. The dashboard overview should show an incremented click count, and the **Traffic Sources** card should attribute it to the right source.
15. **Email capture** — in Appearance (or Links, wherever the toggle lives), enable the email capture form. Reload the public profile — the form should appear. Submit an email, then check **Dashboard → Subscribers** to see it.
16. **QR code** — open the QR code dialog; it should render a QR pointing to your public profile.
17. **Help page** — open **Dashboard → Help**; UTM/routing guide loads.
18. **(Optional) Stripe checkout** — only if you configured Stripe in Module 4. Test card: `4242 4242 4242 4242` (any future date, any CVC).

### Tighten Security Rules (REQUIRED before going live)

You set Firestore up in **test mode** in Module 3, which lets anyone read or write any document. That's fine for local development, but you **must** replace the rules before deploying — otherwise your entire database is publicly writable.

Do the same for Storage, which defaults to a similar permissive rule.

**Firestore rules** — Firebase Console → **Firestore Database** → **Rules** tab → paste the block below → **Publish**.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Public profiles — anyone can read; only the owner writes.
    match /users/{uid} {
      allow read: if true;
      allow create: if request.auth != null && request.auth.uid == uid;
      allow update: if request.auth != null && request.auth.uid == uid;
      allow delete: if false;

      // Links — public read; owner-only writes.
      match /links/{linkId} {
        allow read: if true;
        allow write: if request.auth != null && request.auth.uid == uid;
      }

      // Stats — owner read; Admin-SDK writes only.
      match /stats/{doc} {
        allow read: if request.auth != null && request.auth.uid == uid;
        allow write: if false;
      }

      // Subscribers — owner read only; submissions via /api/subscribe.
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

    // Username claim index — public read, create-once with your own uid.
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

**Storage rules** — Firebase Console → **Storage** → **Rules** tab → paste → **Publish**.

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Avatars — public read; owner-only write, max 5 MB, images only.
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

After publishing both sets of rules, re-run your verification checklist — everything should still work exactly the same, because the rules match LinkFig's real access patterns. If something breaks, tell Claude Code `I just published the security rules and now X is broken` and paste the error.

### Deploy to Vercel

When you're ready to go live:

1. Create an account at [https://vercel.com](https://vercel.com) (sign up with GitHub)
2. Click **Add New... > Project** and import your repository
3. Add all your `.env.local` variables to the Vercel Environment Variables section
4. Change `NEXT_PUBLIC_APP_URL` to your Vercel domain (e.g., `https://my-app.vercel.app`)
5. Click **Deploy**

For production Stripe webhooks:
1. Stripe Dashboard > Developers > Webhooks > **Add endpoint**
2. URL: `https://your-app.vercel.app/api/webhooks/stripe`
3. Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy the new signing secret and update `STRIPE_WEBHOOK_SECRET` in Vercel

If everything works locally and on Vercel, you're done! LinkFig is fully set up. You're ready for Module 6 — building your own custom app on top of this foundation.

---

## Troubleshooting

### Prerequisites

| Problem | Solution |
|---------|----------|
| `pnpm: command not found` | Run `npm install -g pnpm`, then restart your terminal |
| `git: command not found` | Install Git from https://git-scm.com/download/win, restart VS Code |
| `node: command not found` | Install Node.js LTS from https://nodejs.org, restart VS Code |
| `stripe: command not found` | Run `winget install Stripe.StripeCLI`, restart terminal |

### Running the App

| Problem | Solution |
|---------|----------|
| `ERR_PNPM_NO_IMPORTER_MANIFEST_FOUND` | You're in the wrong folder. `cd` to the folder with `package.json` |
| `Module not found: Can't resolve ...` | Run `pnpm install` again |
| Blank page or console errors | Check `.env.local` — make sure every value is filled in |
| Port 3000 already in use | Run `pnpm dev -- -p 3001` |

### Firebase

| Problem | Solution |
|---------|----------|
| Auth not working | Check that Email/Password and Google are enabled in Firebase Console |
| `FIREBASE_ADMIN_PRIVATE_KEY` errors | Make sure the value is wrapped in double quotes in `.env.local` |
| Firestore permission denied | Make sure you created the database in "test mode" |

### Public Profile / Link Page

| Problem | Solution |
|---------|----------|
| `/u/<username>` shows "not found" | Check the username was claimed — it must exist in the `usernames/{name}` Firestore doc. Usernames are case-insensitive and stored lowercase. |
| Avatar doesn't upload | Make sure Firebase **Storage** is enabled (Module 4). Check the browser console for CORS errors. |
| Click/view counts don't increment | These use the Admin SDK — confirm `FIREBASE_ADMIN_*` env vars are set and the private key is wrapped in double quotes. |
| Drag-and-drop reorder doesn't persist | Check the browser console — likely a Firestore rules issue if you've tightened them past test mode. |
| Source routing doesn't reorder links | Make sure you've added at least one routing rule to a link. Visit with `?utm_source=youtube` (or another known source). Known sources: `youtube`, `twitter`, `linkedin`, `instagram`, `tiktok`, `skool`, `email`, `direct`, `other`. |
| Traffic Sources card is empty | Clicks/views are only attributed once `track/view` and `track/click` routes succeed — check the browser Network tab for 200 responses. |
| Email capture form doesn't appear on the public profile | Make sure `emailCaptureEnabled` is toggled on in Appearance. Subscribers land in `users/{uid}/subscribers/`. |

### Stripe

| Problem | Solution |
|---------|----------|
| Checkout not redirecting | Verify all 4 Stripe env vars are filled in and correct |
| Webhooks not received locally | Make sure `stripe listen` is running in a separate terminal |
| `openssl` not recognized | Use `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` instead |
