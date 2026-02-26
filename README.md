# Alma 31 Study Web Application

A responsive web application for deep, interactive study of Alma 31 from the Book of Mormon. Inspired by the clean, reverent design of churchofjesuschrist.org.

## View Online

**Gospel Presentations**: https://ssoward.github.io/church/presentations/

## Features

- **Scripture Text**: Full Alma 31 with verse-by-verse display
- **Analysis**: Thematic breakdowns and spiritual insights
- **Visual Gallery**: Illustrations including Rameumptom artwork
- **Study Applications**: Personal, family, and teaching prompts
- **Interactive Tools**: Search, bookmarks, reflection journal
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **PWA Support**: Installable app with offline capabilities

## Project Structure

```
alma31-study/
├── index.html              # Home page
├── pages/                  # Additional HTML pages
│   ├── scripture.html      # Full scripture text
│   ├── analysis.html       # Thematic analysis
│   ├── gallery.html        # Visual gallery
│   ├── applications.html   # Study applications
│   └── about.html          # About page
├── css/                    # Stylesheets
│   ├── main.css           # Main styles (church-inspired)
│   └── responsive.css     # Mobile/responsive styles
├── js/                     # JavaScript files
│   ├── main.js            # Core functionality
│   ├── search.js          # Search functionality
│   └── pwa.js             # PWA service worker
├── assets/                 # Static assets
│   ├── images/            # Illustrations and photos
│   ├── icons/             # PWA icons
│   └── audio/             # Scripture audio files
├── manifest.json          # PWA manifest
└── sw.js                  # Service worker
```

## Development

### Local Development
```bash
# Start local server
npm start
# Opens at http://localhost:8080
```

### Deployment

This is a static site that can be deployed to:
- **Vercel**: Connect GitHub repo for auto-deployment
- **Netlify**: Drag & drop build folder or Git integration
- **GitHub Pages**: Enable in repository settings
- **AWS S3 + CloudFront**: For production scalability

## Design Guidelines

- **Colors**: White background (#FFFFFF), Church blue (#002E5D), Black text (#000000)
- **Typography**: Serif fonts (Georgia) for body text, Sans-serif for headers
- **Layout**: Two-column desktop, single-column mobile
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation and alt text

## Content Sources

All scripture text and analysis derived from official Church resources and public domain materials, following the reverent style of churchofjesuschrist.org.

## License

MIT License - See LICENSE file for details

---

*"And behold, as they were crossing the river Sidon, the Lamanites and the Amalekites, being as numerous almost, as it were, as the sands of the sea, came upon them to destroy them."* - Alma 31:3