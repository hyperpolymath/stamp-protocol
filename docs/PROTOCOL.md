# STAMP Protocol (Draft)

STAMP (Subscriber Tracking with Attribution and Mathematically Proven consent) is a protocol design for verifiable consent and compliant messaging.

This repository is the **demo site** and reference implementation for key concepts. The protocol definition is a living draft and is intentionally short until the core invariants are finalized.

## Goals

- Make consent state **verifiable**, not just asserted.
- Ensure unsubscribe links are **valid and testable** before send.
- Enforce rate limits at the protocol boundary.
- Provide auditability without exposing private subscriber data.

## Core Concepts

- **Consent Chain**: A time-ordered sequence of consent events (request → confirmation → revoke).
- **Verified Links**: Unsubscribe URLs that pass validation before being issued.
- **Rate Limits**: Message caps tied to account trust and consent freshness.
- **Proof Artifacts**: Evidence that a policy was enforced (format TBD).

## What Is Verifiable Today

- URL validation is backed by the `proven` library and can be enforced at compile time.
- The demo site simulates consent proofs and rate limits for presentation only.

## What Is Still In Draft

- Cryptographic proof format and signature flow.
- Canonical consent event schema.
- Protocol interoperability requirements.
- Threat model and formal verification plan for non-URL components.

## Roadmap

- Define consent event schema and proof envelope.
- Add deterministic verification logic to the demo.
- Publish a full protocol spec with test vectors.
