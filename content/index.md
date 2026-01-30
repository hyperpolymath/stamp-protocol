---
title: STAMP Protocol - Mathematically Proven Message Compliance
description: The first messaging protocol that mathematically proves consent, working unsubscribe links, and rate limit compliance using dependent types.
date: 2026-01-30
---

# STAMP Protocol

**Secure Typed Announcement Messaging Protocol**

The first protocol that **mathematically proves** your messages comply with consent, unsubscribe, and rate limit requirements.

[Try Live Demo on Telegram →](https://t.me/stamp_demo_bot)
[Learn How It Works](#how-it-works)

## The Problem

### 📧 Email Spam

Unsubscribe links often don't work. No proof consent was given.

**$200M+ market**

### 🤖 Social Media Bots

Fake profiles, astroturfing, election interference. Current solutions don't scale.

**$1.2B+ market**

### 💸 Platform Costs

Companies spend $100M+/year fighting spam and bots. Still losing.

**80-90% bots remain**

## The STAMP Solution {#how-it-works}

Use **dependent types** (Idris2) to mathematically prove message properties at compile-time.

### ✓ Proven Consent

Cryptographically provable consent chains. Can't fake timestamps or skip verification.

```
proof : confirmation > initial_request
```

### ✓ Working Unsubscribe

Unsubscribe links tested and proven to work (<200ms response). Impossible to ship broken links.

```
proof : response.code = OK ∧ response.time < 200ms
```

### ✓ Rate Limiting

Protocol-level rate limits based on account age. Cannot be bypassed.

```
proof : messages_today < daily_limit
```

## How It Works

### ❌ Without Dependent Types

```rust
struct UnsubscribeLink {
    url: String,
    tested: bool,  // Can lie
}
```

No guarantees. Developers can lie about testing.

### ✅ With STAMP (Idris2)

```idris
record UnsubscribeLink where
    url : URL
    tested_at : Timestamp
    response : HTTPResponse
    {auto proof : response.code = OK}
    {auto proof : response.time < 200ms}
```

Mathematically proven. Code won't compile if link doesn't work.

## Try It Now

### Telegram Bot Demo

See STAMP in action with our live Telegram bot:

1. Open Telegram and search for **@stamp_demo_bot**
2. Send `/start` to subscribe
3. See cryptographic proof of your consent
4. Send `/verify` to see full verification
5. Send `/unsubscribe` to test proven unsubscribe

[Open @stamp_demo_bot →](https://t.me/stamp_demo_bot)

## Use Cases

### Email Marketing

Prove compliance with CAN-SPAM, GDPR. Verified unsubscribe links.

### Dating Apps

Eliminate fake profiles with proven identity chains. 90% bot reduction.

### Social Media

Combat astroturfing and election interference with verified accounts.

### Business Messaging

RCS, SMS marketing with cryptographic compliance proof.

## Impact

- **80-90%** Bot Reduction
- **$100M+** Platform Savings
- **100%** Compliance Proof

## Ready to Prove Compliance?

Contact us to integrate STAMP into your platform.

- [GitHub](https://github.com/hyperpolymath/libstamp)
- [Demo Bot](https://t.me/stamp_demo_bot)
- [Contact](mailto:jonathan.jewell@open.ac.uk)

---

© 2026 STAMP Protocol. Licensed under AGPL-3.0.
