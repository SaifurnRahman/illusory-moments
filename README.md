# ILLUSORY MOMENTS — React website

Vite + React 18 + Tailwind CSS 3 + React Router 6 + React Icons + Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in /dist
```

## Edit content (no code needed) — `src/data/`
| File | Controls |
|---|---|
| `site.json` | Phone, WhatsApp number (country code, no +), social links, navbar, hero text/image, stats, event types, closing banner |
| `gallery.json` | Gallery page + "সাম্প্রতিক কাজ" on Home. `"featured": true` shows on Home (first 6). `"type": "video"` + `"videoUrl"` (YouTube/Vimeo/.mp4) |
| `packages.json` | Packages (also fills the booking form dropdown) |
| `photographer.json` | ফটোগ্রাফার পরিচয় section |
| `team.json` | আমাদের টিম page |
| `testimonials.json` | Client feedback slider |

Add or delete an object in the list and the site updates. Replace image URLs with your own files in `public/` (e.g. `"/photos/wedding-01.jpg"`).

**All names, numbers, reviews and photos are samples.** Replace them, and the placeholder video link in `gallery.json`.

Deploy: Netlify uses `public/_redirects`; on Vercel add a rewrite of all paths to `/index.html`.
