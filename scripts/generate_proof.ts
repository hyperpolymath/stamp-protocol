import { SafeUrl } from "../../proven/bindings/javascript/src/safe_url.js";

type UrlProof = {
  input: string;
  parse_ok: boolean;
  https: boolean;
  error?: string;
};

type ConsentProof = {
  id: string;
  initial_request: string;
  confirmation: string;
  token: string;
  valid: boolean;
  reason: string;
};

type ProofData = {
  generated_at: string;
  urls: UrlProof[];
  consent: ConsentProof[];
};

const urls = [
  "https://example.com/unsubscribe?token=abc123",
  "http://example.com/unsubscribe?token=abc123",
  "not-a-url",
];

const urlProofs: UrlProof[] = urls.map((input) => {
  const parsed = SafeUrl.parse(input);
  if (!parsed.ok) {
    return { input, parse_ok: false, https: false, error: parsed.error };
  }
  return { input, parse_ok: true, https: SafeUrl.isHttps(input) };
});

const consentProofs: ConsentProof[] = [
  {
    id: "consent-ok",
    initial_request: "2026-02-01T12:00:00Z",
    confirmation: "2026-02-01T12:00:30Z",
    token: "user_123_consent_token_abc",
    valid: true,
    reason: "confirmation after request, token length >= 10",
  },
  {
    id: "consent-invalid",
    initial_request: "2026-02-01T12:00:30Z",
    confirmation: "2026-02-01T12:00:10Z",
    token: "short",
    valid: false,
    reason: "confirmation before request or token too short",
  },
];

const data: ProofData = {
  generated_at: new Date().toISOString(),
  urls: urlProofs,
  consent: consentProofs,
};

await Deno.writeTextFile(
  new URL("../public/proof-data.json", import.meta.url),
  JSON.stringify(data, null, 2) + "\n",
);

console.log("Wrote public/proof-data.json");
