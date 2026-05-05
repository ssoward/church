# Gospel Study & Presentations Hub

A static web application serving as a personal hub for gospel study, tech presentations, interactive activities, and conference schedules.

## View Online

**Live site**: https://ssoward.github.io/church/

| Section | URL |
|---------|-----|
| Home | https://ssoward.github.io/church/ |
| Gospel Presentations | https://ssoward.github.io/church/presentations/ |
| Tech & Philosophy | https://ssoward.github.io/church/tech-presentations/ |
| Activities | https://ssoward.github.io/church/activities/ |
| Conferences | https://ssoward.github.io/church/conferences/ |

## Site Sections

### Gospel Presentations
Stake and ward-level teaching resources built with Reveal.js:
- Ward Sunday School Presidents Training
- Ward Conference 2026 (PMG vs. Teaching in the Savior's Way)
- Confidence in the Presence of God (Pres. Nelson)
- AI in the Tech Industry — BYU Idaho students
- Easter Week Art Display (8-day Holy Week series)
- All Who Have Endured Valiantly (Elder Bednar)

### Tech & Philosophy
Interactive presentations on technology and AI:
- The Meaning of Life for AI (15-slide Reveal.js)
- A Day in the Life of AI (canvas animation)
- The Evolution of AI (7-era interactive gallery)

### Activities
Logic puzzles and interactive learning tools:
- The Alien Hat Riddle (step-by-step simulation)

### Scripture
- Alma 31 Study App — full text, analysis, gallery, and study tools

### Conferences
Personalized professional conference schedules:
- Atlassian Team '26 (May 5–7, 2026 · Anaheim) — 3-day agenda with day tabs, priority ratings, conflict warnings, and tips

## Project Structure

```
church/
├── index.html                    # Home hub (card grid with category filter)
├── presentations/
│   ├── index.html                # Gospel presentations hub
│   └── <name>/index.html         # Individual Reveal.js presentations
├── tech-presentations/
│   ├── index.html                # Tech & philosophy hub
│   └── <name>/index.html         # Individual presentations
├── activities/
│   ├── index.html                # Activities hub
│   └── <name>/index.html         # Individual activities
├── conferences/
│   └── index.html                # Conference schedules (day-tab agenda)
├── pages/                        # Alma 31 study sub-pages
├── css/                          # Shared stylesheets
├── js/                           # Shared JavaScript
├── assets/                       # Images and icons
├── alma31.html                   # Alma 31 study app entry point
├── manifest.json                 # PWA manifest
└── sw.js                         # Service worker
```

## Development

```bash
# Start local server
npm start
# Opens at http://localhost:8080
```

The site is pure static HTML/CSS/JS — no build step required. Each page is self-contained with inline styles.

## Deployment

Deployed via GitHub Pages from the `main` branch. Push to `main` triggers auto-deploy.

```bash
git push origin main
```

## Design System

All pages share a consistent design language:
- **Font**: system-ui stack (Apple/Segoe/Roboto)
- **Background**: `#fafaf8` (off-white)
- **Cards**: white, `border-radius: 12px`, soft shadow, 7px color banner
- **Nav**: sticky white pill-link bar
- **Category colors**: Blue (Gospel), Purple (Tech), Teal (Activity), Brown (Scripture), Orange (Conferences)
- **Responsive**: CSS Grid `auto-fill minmax(320px, 1fr)`, mobile-first

---

*Israel Canyon Saratoga Springs Stake · The Church of Jesus Christ of Latter-day Saints*
