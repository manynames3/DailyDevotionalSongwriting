# ✦ Songs from the Secret Place

A daily devotional songwriting website — one song, one scripture, every day.

Built as a single HTML file. No frameworks, no build tools. Deploy anywhere in seconds.

---

## Features

- **Vinyl turntable player** with spinning disc, tonearm animation, and real-time circular frequency visualizer
- **Dynamic background color** that shifts based on each song's album artwork
- **Time-of-day theming** — the room lighting changes at dawn, day, dusk, and night
- **Waveform scrubber** — click anywhere on the waveform to seek
- **Auto-advance** — plays the next song automatically when one ends
- **Speed control** — 0.75×, 1×, 1.25×, 1.5×
- **Loop button** — repeat a single track
- **Lyrics modal** — click the album art to expand full lyrics
- **Candle flame** — animated ambient detail
- **Compact list archive** — all recordings sorted newest first, visible on one page
- **Password-protected upload** — only you can add new songs
- **Double-confirmation delete** — two-step confirmation before any entry is removed
- **Admin mode** — delete buttons only appear after logging in

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | Vanilla HTML/CSS/JS (single file) |
| Database | Supabase (PostgreSQL) |
| File Storage | Supabase Storage |
| Hosting | Netlify (free) |

---

## Setup

### 1. Supabase

1. Go to [supabase.com](https://supabase.com) and create a free project
2. In the **SQL Editor**, run the following:

```sql
create table devotionals (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  scripture   text,
  entry_date  date not null,
  lyrics      text,
  audio_url   text,
  art_url     text,
  created_at  timestamptz default now()
);

alter table devotionals enable row level security;

create policy "Public read"  on devotionals for select using (true);
create policy "Anon insert"  on devotionals for insert with check (true);
create policy "Anon delete"  on devotionals for delete using (true);
```

3. Go to **Storage** and create two public buckets:
   - `devotional-audio`
   - `devotional-art`

4. Go to **Settings → API** and copy your:
   - Project URL
   - Anon/public key

### 2. Configure the site

Open `index.html` and find the configuration block near the bottom:

```js
const SUPABASE_URL   = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON  = 'YOUR_SUPABASE_ANON_KEY';
const ADMIN_PASSWORD = 'grace2024';
```

Replace the URL and key with your own. Change the admin password to something personal.

### 3. Deploy to Netlify

**Option A — Manual (30 seconds):**
1. Go to [netlify.com](https://netlify.com)
2. Add new site → Deploy manually
3. Drag and drop `index.html`
4. Done — your site is live

**Option B — Auto-deploy from GitHub:**
1. Push this repo to GitHub
2. Netlify → Add new site → Import from Git → select your repo
3. Every future push auto-deploys

---

## Usage

### Uploading a song
1. Go to your live site
2. Click **Upload** in the nav
3. Enter your admin password
4. Fill in title, date, scripture, MP3 file, artwork, and lyrics
5. Click **Publish Song** — it goes live instantly

### Deleting a song
1. Log in via the Upload nav button
2. Hover over any entry in the archive — a ✕ button appears
3. Confirm twice to permanently delete

---

## File Structure

```
secret-place/
├── index.html    ← entire site (HTML + CSS + JS)
└── README.md
```

---

## Storage Limits (Free Tier)

| Resource | Supabase Free Limit |
|---|---|
| Database | 500 MB |
| File storage | 1 GB |
| Bandwidth | 5 GB/month |

At ~3–5MB per MP3, 1GB of storage supports roughly **200–300 songs** before you'd need to upgrade or use external audio hosting (YouTube, SoundCloud embeds).

---

## Customization

| What | Where in `index.html` |
|---|---|
| Site title | `<title>` tag + `.logo-name` text |
| Admin password | `ADMIN_PASSWORD` in script |
| Color scheme | CSS variables in `:root` |
| Fonts | Google Fonts `<link>` at top |
| Playback speed options | `.speed-group` buttons in HTML |

---

## License

Personal use. Built with love for the secret place.
