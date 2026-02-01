# STAMP Protocol

[![Idris Inside](https://img.shields.io/badge/Idris-Inside-5E5086?style=flat&logo=idris&logoColor=white)](https://github.com/hyperpolymath/proven)
![Protocol Draft](https://img.shields.io/badge/Protocol-Draft-blue)

Reference site and interactive demo for STAMP Protocol concepts (Subscriber Tracking with Attribution and Mathematically Proven consent).

## What It Does

- Demonstrates STAMP flows end-to-end.
- Shows how verifiable consent and unsubscribe flows could work (demo-level checks).
- Ships a clean, static front end for easy hosting.

## Where It Is Going

- Expand the demo to cover more protocol paths.
- Add integration examples for production systems.
- Improve visualization and accessibility of consent flows.
- Publish a full protocol spec with test vectors.

## Protocol Draft

See `docs/PROTOCOL.md` for the draft protocol definition and current scope.

## Architecture

- **ReScript** - Type-safe frontend compilation to JavaScript
- **Deno** - Build and task runner
- **proven** - Idris2 formally verified library for URL validation
- **TEA** - The Elm Architecture pattern for state management

### Formally Verified Components

This application uses **proven** for URL validation:

- **ProvenSafeUrl** - URL parsing with mathematical proofs of correctness
- **ProvenResult** - Type-safe error handling
- **Guarantees**:
  - Invalid URLs cannot compile (for code using the proven bindings)
  - No runtime URL parsing errors
  - Proven security properties (no XSS via URLs)

## Development

### Prerequisites

- [Deno](https://deno.com/) v2.0+
- ReScript ^12.1.0 (auto-installed via Deno)

### Build

```bash
# Build ReScript to JavaScript
deno task build

# Watch mode for development
deno task watch

# Clean build artifacts
deno task clean
```

### Local Development

```bash
# Serve with any static server
deno run -A jsr:@std/http/file-server .

# Or use Python
python3 -m http.server 8000

# Or open directly
open index.html
```

## Features

### Current Implementation (2026-01-30)

- **Interactive STAMP Demo** - Step-through demonstration
- **URL Validation** - Demonstrates safe URL checks using build-time proofs
- **Real-time Validation** - Instant feedback on URL correctness
- **TEA Architecture** - Predictable state management

### Security Features

- **HTTPS-only** - Enforced for all unsubscribe URLs
- **Proven Validation** - Mathematical proofs prevent malformed URLs
- **No XSS** - Formally verified URL handling
- **CSP Headers** - Content Security Policy (see .well-known/)

## Project Status

- ✅ ReScript compilation with Deno
- ✅ proven integration for URL validation
- ✅ StampApp.res with formal verification
- ✅ Security hardening (.well-known/, headers, DNS)
- ⏳ Full TEA integration (basic render function)
- ⏳ Interactive UI with DOM mounting
- ⏳ Visual consent flow diagram
- ⏳ API integration examples

## Deploy to Cloudflare Pages

### Web UI Method

1. Go to https://pages.cloudflare.com/
2. Connect `stamp-protocol` repository
3. Build settings:
   - Framework: **None** (pre-built ReScript)
   - Build command: `deno task build`
   - Output directory: `/`
4. Custom domain: `stamp-protocol.org`

### CLI Method

```bash
# Build first
deno task build

# Deploy with Wrangler
wrangler pages deploy . --project-name=stamp-protocol
```

## Domain & DNS Setup

### Cloudflare DNS Records

```
CNAME @ stamp-protocol.pages.dev (Proxied)
CAA   @ 0 issue "letsencrypt.org"
CAA   @ 0 issue "pki.goog"
TXT   @ "v=spf1 -all"
```

### Security Headers (Cloudflare)

See `.well-known/security.txt` for full configuration.

- HSTS max-age=31536000
- CSP: default-src 'self'
- X-Frame-Options: DENY
- COEP, COOP, CORP headers

## File Structure

```
stamp-protocol/
├── src/
│   ├── StampApp.res           # Main TEA application
│   ├── ProvenResult.res       # Result type for error handling
│   ├── ProvenSafeUrl.res      # Proven URL validation
│   └── Tea.res                # Minimal TEA runtime
├── deno.json                  # Deno configuration & tasks
├── rescript.json              # ReScript compiler config
├── index.html                 # HTML entry point
├── style.css                  # Styles
└── .well-known/               # Security & standards
    ├── security.txt
    └── change-password
```

## Performance

- **Target: 100/100 Lighthouse**
- Zero external dependencies (after build)
- Compiled ReScript (no runtime transpilation)
- Vanilla CSS (no framework bloat)
- Mobile-first responsive design

## SEO & Standards

- ✅ Semantic HTML5
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ RFC 9116 security.txt
- ✅ Structured data (Schema.org)

## License

AGPL-3.0-or-later

## Related Projects

- [rescript-tea](https://github.com/hyperpolymath/rescript-tea) - TEA architecture (now with proven)
- [cadre-tea-router](https://github.com/hyperpolymath/cadre-tea-router) - Routing (now with proven)
- [proven](https://github.com/hyperpolymath/proven) - Idris2 formally verified library
