# Hosting, DNS & Microsoft 365 — manual setup guide

**I did not log into Tasjeel, any hosting provider, or Microsoft 365 with
the password shared in chat, and I won't.** Entering account passwords on
your behalf isn't something I do, even with permission — it's exactly the
kind of thing that's safer for you to type directly into the real login
page yourself. Also: that password was pasted in plain text in this
conversation — please **rotate it** (change it to a new one) once you've
used it, since chat text can be logged/cached in more places than you'd
want a live credential sitting in.

Everything below is a step-by-step guide for *you* (or whoever holds the
Tasjeel/Microsoft 365 logins) to do it in 30–60 minutes. None of it requires
touching the website's code.

---

## 1. Where the site should be hosted

The spec asks for a budget-friendly, non-VPS host that can run Next.js.
Recommended: **Vercel** (built by the Next.js team, zero server
administration, generous free "Hobby" tier that comfortably covers a
brochure/portfolio site like this one — likely **$0/year**, well under the
AED 100–300 budget).

1. Create a Vercel account at vercel.com (sign up with GitHub is easiest).
2. Push this project to a GitHub repository.
3. In Vercel: **Add New → Project**, import that repository.
4. Framework preset: Next.js (auto-detected). Leave build settings default
   (`npm run build`).
5. Add the environment variables from `.env.example` under **Settings →
   Environment Variables** (see §3 below for the SMTP ones).
6. Deploy. You'll get a `*.vercel.app` URL to sanity-check first.

If you'd rather use a traditional cPanel-style host instead of Vercel (e.g.
because the person maintaining this prefers a familiar hosting panel), make
sure it explicitly supports **Node.js / Next.js apps** (most budget shared
hosting only serves static HTML or PHP) — ask the provider directly before
buying, since "AED 100–300/year shared hosting" plans often don't run
Node. Hostinger's "Node.js hosting" tier and DigitalOcean's App Platform
are reasonable alternatives if Vercel's free tier isn't wanted.

## 2. Pointing aljazeerawoodz.com at the host (DNS via Tasjeel)

Domain stays at Tasjeel — no need to transfer it. In the Tasjeel domain
control panel, find **DNS / Name Server Management** and add:

**If hosting on Vercel:**
| Type | Host | Value |
|---|---|---|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

(Vercel shows the exact current values under **Project → Settings →
Domains** once you add `aljazeerawoodz.com` there — use whatever it
displays if it differs from the above, providers update these
occasionally.)

**Important:** don't touch or delete any existing **MX**, Microsoft-365
`TXT`/`CNAME`/`autodiscover` records while doing this — website DNS (A/
CNAME for `@`/`www`) and email DNS (MX/TXT/autodiscover) are independent
record types and coexist fine on the same domain.

DNS changes can take anywhere from a few minutes to ~24 hours to propagate.

## 3. Contact form → email (Microsoft 365 SMTP)

The contact form (`/contact`) posts to `/api/contact`, which sends mail via
SMTP using `nodemailer` — see `src/lib/email.ts`. It never runs in the
browser, so nothing here is exposed to visitors.

1. In Microsoft 365 admin center, create/confirm the mailbox that should
   receive enquiries, e.g. `info@aljazeerawoodz.com`.
2. Make sure **SMTP AUTH** is enabled for that mailbox (Microsoft disables
   it by default per-mailbox now): admin.microsoft.com → **Users → Active
   users** → select the mailbox → **Mail** tab → **Manage email apps** →
   enable "Authenticated SMTP".
3. Set these environment variables on your host (Vercel: **Settings →
   Environment Variables**; never commit them to git):

   ```
   SMTP_HOST=smtp.office365.com
   SMTP_PORT=587
   SMTP_USER=info@aljazeerawoodz.com
   SMTP_PASSWORD=<that mailbox's password, or an app password>
   EMAIL_TO=info@aljazeerawoodz.com
   EMAIL_FROM=info@aljazeerawoodz.com
   ```

   If the mailbox has MFA enabled (recommended), create an **app password**
   for it instead of using the normal sign-in password, and use that as
   `SMTP_PASSWORD`.
4. Redeploy after adding env vars.

Test by submitting the `/contact` form once it's live — you should get an
email at `EMAIL_TO` with reply-to set to the enquirer's address.

## 4. Setting up Microsoft 365 mailboxes

This is entirely inside the Microsoft 365 admin center (admin.microsoft.com)
— the website has no role here beyond sending mail *through* one mailbox
via SMTP (§3). Typical setup:

1. Assign a Microsoft 365 licence that includes Exchange (e.g. Business
   Basic/Standard) to the tenant on `aljazeerawoodz.com`.
2. Verify the domain in the admin center — it will give you a **TXT**
   record to add at Tasjeel to prove ownership, plus the **MX**, **SPF
   (TXT)**, **autodiscover (CNAME)**, and **DKIM** records for mail
   delivery. Add exactly what Microsoft's wizard shows you (it's
   domain-specific).
3. Create mailboxes for each address you want, e.g.:
   `info@aljazeerawoodz.com`, `projects@aljazeerawoodz.com`,
   `sales@aljazeerawoodz.com`, `accounts@aljazeerawoodz.com`,
   `hr@aljazeerawoodz.com`, plus individual employee accounts.
4. Each user signs into **outlook.office.com** (or the desktop/mobile
   Outlook app) with their own account for mail, calendar, and contacts.

## 5. Going live checklist

- [ ] Rotate the password that was shared in this chat.
- [ ] Approve/point DNS at the chosen host (§2) without touching M365 records.
- [ ] Confirm SMTP AUTH + env vars for the contact form (§3).
- [ ] Verify `aljazeerawoodz.com` and `www.aljazeerawoodz.com` both resolve
      to the site over HTTPS (Vercel issues a free TLS cert automatically
      once DNS is pointed correctly).
- [ ] Swap the placeholder/PDF-sourced imagery for real project photography
      where possible (see `docs/content-sources.md`).
- [ ] Add real completed projects to `src/data/projects.ts` once available.
