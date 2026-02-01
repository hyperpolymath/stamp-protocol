import { SafeUrl } from "../../proven/bindings/javascript/src/safe_url.js";

type UrlProof = {
  input: string;
  parse_ok: boolean;
  https: boolean;
  error?: string;
};

type ProofData = {
  generated_at: string;
  urls: UrlProof[];
};

const urls = [
  "https://example.com/unsubscribe?token=abc123",
  "http://example.com/unsubscribe?token=abc123",
  "not-a-url",
];

const proofs: UrlProof[] = urls.map((input) => {
  const parsed = SafeUrl.parse(input);
  if (!parsed.ok) {
    return { input, parse_ok: false, https: false, error: parsed.error };
  }
  return { input, parse_ok: true, https: SafeUrl.isHttps(input) };
});

const data: ProofData = {
  generated_at: new Date().toISOString(),
  urls: proofs,
};

await Deno.writeTextFile(
  new URL("../public/proof-data.json", import.meta.url),
  JSON.stringify(data, null, 2) + "\n",
);

console.log("Wrote public/proof-data.json");
