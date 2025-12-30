# Deployment Guide - Alma 31 Study Web Application

This guide provides step-by-step instructions for deploying the Alma 31 Study web application to various hosting platforms.

## Project Overview

The Alma 31 Study app is a static web application built with:
- **HTML5** - Semantic markup and accessibility
- **CSS3** - Responsive design with CSS custom properties
- **JavaScript (ES6+)** - Interactive features and PWA functionality
- **Progressive Web App** - Offline capabilities and installable

## Pre-Deployment Checklist

### ✅ Required Files
- [x] `index.html` - Main home page
- [x] `manifest.json` - PWA manifest
- [x] `sw.js` - Service worker for offline functionality
- [x] `css/main.css` - Main stylesheet
- [x] `css/responsive.css` - Responsive design styles
- [x] `js/main.js` - Core JavaScript functionality
- [x] `js/search.js` - Enhanced search functionality
- [x] `pages/*.html` - All content pages
- [x] `README.md` - Project documentation
- [x] `package.json` - Project metadata

### ✅ Content Verification
- [x] All navigation links work correctly
- [x] Cross-references between pages are accurate
- [x] Search functionality is operational
- [x] Responsive design works on mobile, tablet, and desktop
- [x] PWA manifest is properly configured
- [x] Service worker caches appropriate assets

### ✅ Performance Optimization
- [x] CSS is minified and optimized
- [x] Images are properly sized (placeholders ready for real images)
- [x] JavaScript is optimized
- [x] Service worker provides offline functionality

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel offers excellent performance and easy deployment for static sites.

#### Steps:
1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy from this directory**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Set up and deploy: **Yes**
   - Which scope: Choose your account
   - Link to existing project: **No**
   - Project name: `alma31-study` (or preferred name)
   - Directory: `./` (current directory)

4. **Configure custom domain** (optional):
   - Go to Vercel dashboard
   - Add custom domain like `alma31study.org`

#### Vercel Configuration
Create `vercel.json` for advanced configuration:
```json
{
  "name": "alma31-study",
  "version": 2,
  "public": true,
  "github": {
    "autoAlias": false
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        },
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        }
      ]
    }
  ]
}
```

### Option 2: Netlify

Netlify provides excellent static site hosting with built-in CI/CD.

#### Steps:
1. **Drag and Drop Method**:
   - Visit [netlify.com](https://netlify.com)
   - Drag the entire project folder to the deploy area
   - Site will be live immediately with a random subdomain

2. **Git Integration Method**:
   - Push code to GitHub repository
   - Connect repository to Netlify
   - Configure build settings:
     - Build command: (leave empty for static site)
     - Publish directory: `/` (root)
     - Environment variables: (none needed)

3. **Custom Domain**:
   - Go to Site Settings > Domain Management
   - Add custom domain

#### Netlify Configuration
Create `netlify.toml` for advanced configuration:
```toml
[build]
  publish = "."
  command = "echo 'Static site - no build needed'"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
    Service-Worker-Allowed = "/"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

#### Steps:
1. **Create GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Alma 31 Study App"
   git branch -M main
   git remote add origin https://github.com/username/alma31-study.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to Pages section
   - Source: Deploy from a branch
   - Branch: `main` / `/ (root)`
   - Save

3. **Access your site**:
   - Available at `https://username.github.io/alma31-study/`

### Option 4: AWS S3 + CloudFront

For production scalability and advanced features.

#### Steps:
1. **Create S3 Bucket**:
   ```bash
   aws s3 mb s3://alma31study-app
   ```

2. **Upload Files**:
   ```bash
   aws s3 sync . s3://alma31study-app --delete
   ```

3. **Configure Static Website Hosting**:
   ```bash
   aws s3 website s3://alma31study-app --index-document index.html --error-document index.html
   ```

4. **Set Up CloudFront Distribution**:
   - Create distribution pointing to S3 bucket
   - Configure custom domain and SSL certificate

### Option 5: Firebase Hosting

Google's fast and secure hosting platform.

#### Steps:
1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**:
   ```bash
   firebase init hosting
   ```

3. **Configure `firebase.json`**:
   ```json
   {
     "hosting": {
       "public": ".",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ],
       "headers": [
         {
           "source": "/sw.js",
           "headers": [
             {
               "key": "Cache-Control",
               "value": "no-cache"
             }
           ]
         }
       ]
     }
   }
   ```

4. **Deploy**:
   ```bash
   firebase deploy
   ```

## Post-Deployment Tasks

### 1. Test Core Functionality
- [ ] Navigate through all pages
- [ ] Test search functionality
- [ ] Verify responsive design on different devices
- [ ] Test PWA installation
- [ ] Verify offline functionality

### 2. Performance Optimization
- [ ] Run Lighthouse audit
- [ ] Check loading speeds
- [ ] Verify PWA score
- [ ] Test on slow network connections

### 3. SEO and Analytics
- [ ] Submit sitemap to search engines
- [ ] Set up Google Analytics (if desired)
- [ ] Verify meta tags and Open Graph data
- [ ] Test social media sharing

### 4. Domain and SSL
- [ ] Configure custom domain
- [ ] Ensure HTTPS is enabled
- [ ] Test domain redirects

## Environment-Specific Configuration

### Development
```bash
# Start local server
python3 -m http.server 8080
# OR
npm start
```

### Production
- Ensure all paths are relative
- Verify service worker caches correctly
- Test offline functionality
- Monitor for 404 errors

## Performance Benchmarks

Target metrics for successful deployment:

- **Lighthouse Performance**: 90+
- **Lighthouse Accessibility**: 95+
- **Lighthouse Best Practices**: 95+
- **Lighthouse SEO**: 90+
- **Lighthouse PWA**: 100
- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 3s
- **Cumulative Layout Shift**: < 0.1

## Troubleshooting

### Common Issues

1. **Service Worker Not Registering**:
   - Ensure HTTPS is enabled
   - Check browser console for errors
   - Verify service worker file path

2. **PWA Not Installing**:
   - Check manifest.json syntax
   - Ensure all required icons are present
   - Verify HTTPS connection

3. **Search Not Working**:
   - Check JavaScript console for errors
   - Verify search.js is loaded correctly
   - Ensure content index is building

4. **Mobile Layout Issues**:
   - Test on various device sizes
   - Check CSS media queries
   - Verify viewport meta tag

### Getting Help

For deployment issues:
- Check platform-specific documentation
- Review browser console errors
- Test in incognito/private mode
- Verify all file paths and dependencies

## Backup and Version Control

### Recommended Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-content

# Make changes and commit
git add .
git commit -m "Add new study content"

# Deploy to staging (if using branch deployments)
git push origin feature/new-content

# Merge to main for production
git checkout main
git merge feature/new-content
git push origin main
```

### Backup Strategy
- Regular Git commits and pushes
- Export content periodically
- Keep local copies of any custom images/assets
- Document any custom configurations

## Monitoring and Maintenance

### Regular Tasks
- [ ] Monitor site performance monthly
- [ ] Update content as needed
- [ ] Review and update external links
- [ ] Check for broken images or assets
- [ ] Update PWA cache versions when content changes

### Analytics (Optional)
Consider adding:
- Google Analytics for usage tracking
- Search Console for SEO monitoring
- Performance monitoring tools
- User feedback mechanisms

---

## Quick Deployment Commands

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod --dir .
```

### Firebase
```bash
firebase deploy --only hosting
```

### GitHub Pages
```bash
git add . && git commit -m "Update content" && git push
```

This deployment guide ensures your Alma 31 Study application is properly deployed and accessible to users worldwide. Choose the platform that best fits your needs and technical requirements.