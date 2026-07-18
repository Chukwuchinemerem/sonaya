# Sonaya Beauty Studio — Website

A premium, multi-page website for Sonaya Beauty Studio (lash extensions & brow artistry,
Enugu-based with home-service travel to Abuja, Delta, Lagos & Anambra). Built with plain
HTML5, Tailwind CSS (via CDN), and vanilla JavaScript — no build step, no framework to
install. That makes it a pure **static site**, exactly what Render's "Static Site" hosting wants.

## What's inside

```
sonaya-beauty/
├── index.html         ← homepage
├── book.html           ← booking page (policy + multi-step appointment form)
├── thank-you.html      ← shown after a successful booking submission
├── css/styles.css      ← design tokens, fonts, animations, form styling
├── js/script.js        ← homepage: nav, WhatsApp links, carousel, stats, live ticker
├── js/book.js          ← booking page: service catalogue, wizard steps, uploads, draft save
└── README.md           ← this file
```

## ⚠️ Must-do before you launch

### 1. Activate the booking form (FormSubmit)
The booking form on `book.html` emails every submission straight to
**ozoemenammeso3@gmail.com** using a free service called FormSubmit (formsubmit.co) —
no backend or server needed. **The first time someone submits the form, FormSubmit sends an
activation email to that inbox.** Someone must click "Activate Form" in that email, or
future bookings won't arrive. Do a test submission yourself right after deploying to trigger
and confirm this.

Because form data (including any uploaded photos) passes through FormSubmit's servers on its
way to the inbox, it's worth knowing a third party is involved in delivery — standard for
backend-free static sites, but flagging it for transparency.

- File uploads are capped at **10MB total** per submission (selfie + reference image combined).
- After deploying, open `book.html`, find the hidden field `<input type="hidden" name="_next" value="thank-you.html">`,
  and update its value to the **full URL** of your live thank-you page
  (e.g. `https://sonayabeauty.onrender.com/thank-you.html`) so the redirect works correctly after launch.

### 2. Review and set real prices
Every price on the booking page is a **placeholder** I estimated from general Nigerian
lash/brow market rates — I don't know Sonaya's actual pricing. Open `js/book.js` and edit the
`price` value for each service in the `SERVICES` object near the top of the file, e.g.:

```js
classic: {
  ...
  price: 15000,   // ← change this
  ...
},
```

### 3. Review the booking policy text
The "Payment & Booking Policy" block on `book.html` (arrival time, reschedule window, no-refund
statement, etc.) is professionally-worded starter copy, not legal advice. Please read it and
adjust the specifics to match how Sonaya actually wants to run bookings before publishing.

### 4. Replace the founder's portrait
The "Meet The Founder" section on the homepage (`#ceo`) currently shows a placeholder
monogram card ("OM") instead of a real photo — I intentionally didn't put a stock photo there,
since it would be a real person's photo mislabeled as her likeness. In `index.html`, search
for the comment `REPLACE-PHOTO-HERE` and swap that placeholder `<div>` for an `<img>` tag
pointing to Maryann's real headshot.

### 5. Social links & bank details
- Footer social icons still use placeholder handles (`instagram.com/sonayabeautystudio`, etc.) — update to the real profile URLs.
- Payment details are already wired in: **PalmPay · 8135547873 · Ozoemena Maryann Mmesoma.** Double check these are correct before launch.

## Hosting on Render (Static Site)

1. Push this folder to a GitHub (or GitLab) repository.
2. In the Render dashboard: **New → Static Site** → connect the repo.
3. **Build Command:** leave blank · **Publish Directory:** `.`
4. Deploy. Render gives you a live `.onrender.com` URL and redeploys on every push.
5. Right after it's live, do a full test booking yourself (see step 1 above) to confirm the
   email actually arrives.

## How the booking flow works

- **Homepage → Book Appointment** buttons all link to `book.html`.
- `book.html` shows the payment/no-refund policy, then a 3-step form:
  1. Name, phone, email, service (price shown live), full service preview with photo
  2. Selfie upload, date, time, optional reference image, special requests
  3. Booking summary recap, policy agreement checkbox, "Pay in Full" bank details, Save Draft / Submit
- **Save as Draft** stores progress in the visitor's own browser (`localStorage`) so they can
  come back later on the same device — it isn't sent anywhere until they hit Submit.
- **Submit** does a real form POST (with any uploaded files) to FormSubmit, which emails
  everything to Sonaya, then redirects to `thank-you.html`.
- The "Studio Pulse" live-notification popup and stat counters (110+ reviews, 150+ clients,
  100% satisfaction) are on the homepage only; their sample numbers/feed can be edited in
  `js/script.js` and `index.html` respectively.

## Notes on the build

- **Navbar** is `position: fixed` with a blur backdrop on every page.
- **8-image carousel** on the homepage auto-glides continuously and pauses on hover/focus.
- Background is now a **soft blush peach** (`#F5DBD1`) rather than the earlier warm peach.
- Respects `prefers-reduced-motion` for anyone with that OS setting enabled.
