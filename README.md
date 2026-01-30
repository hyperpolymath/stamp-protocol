# STAMP Protocol Website

Landing page for stamp-protocol.org

## Features

- **Hero section** with clear value proposition
- **Problem/Solution** framework for investors
- **Technical comparison** showing dependent types advantage
- **Live demo** link to Telegram bot
- **Use cases** for different markets
- **Impact stats** for pitch meetings

## Local Development

```bash
# Open in browser
open index.html

# Or use a local server
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Deploy to Cloudflare Pages

### Method 1: Web UI (Easiest)

1. Go to https://pages.cloudflare.com/
2. Click "Create a project"
3. Connect your GitHub account
4. Select `stamp-website` repository
5. Build settings:
   - Framework preset: **None**
   - Build command: (leave empty)
   - Build output directory: `/`
6. Click "Save and Deploy"
7. Configure custom domain: `stamp-protocol.org`

### Method 2: CLI (Faster for updates)

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy . --project-name=stamp-protocol

# Configure domain
# Go to Pages > stamp-protocol > Custom domains
# Add: stamp-protocol.org
```

## Domain Setup (Cloudflare)

1. In Cloudflare Dashboard, go to **DNS**
2. Add CNAME record:
   - Name: `@` (or `www`)
   - Target: `stamp-protocol.pages.dev`
   - Proxied: ON
3. Pages will automatically issue SSL certificate

## Content Updates

Edit these files:
- `index.html` - Main content
- `style.css` - Styling
- `script.js` - Interactivity

Push to GitHub and Cloudflare Pages auto-deploys.

## Performance

- **100/100 Lighthouse score** target
- No external dependencies
- Vanilla HTML/CSS/JS for speed
- Optimized for mobile

## SEO

Includes:
- Semantic HTML
- Meta descriptions
- Open Graph tags (TODO)
- Structured data (TODO)

## Analytics (Optional)

Add Cloudflare Web Analytics:
```html
<!-- Add before </body> -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

## License

AGPL-3.0-or-later
