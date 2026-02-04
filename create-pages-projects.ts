#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env
// SPDX-License-Identifier: PMPL-1.0-or-later
// Create Cloudflare Pages projects via API

const CLOUDFLARE_API_TOKEN = Deno.env.get("CLOUDFLARE_API_TOKEN");
const CLOUDFLARE_ACCOUNT_ID = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");

if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ACCOUNT_ID) {
  console.error("❌ Missing credentials");
  Deno.exit(1);
}

const projects = [
  { name: "affinescript", domain: "affinescript.dev" },
  { name: "anvomidav", domain: "anvomidav.org" },
  { name: "betlang", domain: "betlang.org" },
  { name: "eclexia", domain: "eclexia.org" },
  { name: "ephapax", domain: "ephapax.org" },
  { name: "error-lang", domain: "error-lang.org" },
  { name: "my-lang", domain: "my-lang.net" },
  { name: "oblibeny", domain: "oblibeny.net" },
  { name: "reposystem", domain: "reposystem.dev" },
  { name: "verisimdb", domain: "verisimdb.org" },
];

console.log("🏗️  Creating Cloudflare Pages projects");
console.log("═".repeat(70));

for (const project of projects) {
  console.log(`\n📦 ${project.name}`);

  // Create project
  const createResponse = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: project.name,
        production_branch: "main",
      }),
    }
  );

  const createResult = await createResponse.json();

  if (createResult.success) {
    console.log(`   ✅ Project created`);
    console.log(`   🌐 URL: https://${project.name}.pages.dev`);
  } else if (createResult.errors?.[0]?.code === 8000007) {
    console.log(`   ⚠️  Project already exists`);
  } else {
    console.log(`   ❌ Failed: ${JSON.stringify(createResult.errors)}`);
    continue;
  }

  // Add custom domain
  console.log(`   🔗 Adding domain: ${project.domain}`);

  const domainResponse = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/${project.name}/domains`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: project.domain }),
    }
  );

  const domainResult = await domainResponse.json();

  if (domainResult.success) {
    console.log(`   ✅ Domain added`);
  } else if (domainResult.errors?.[0]?.code === 8000018) {
    console.log(`   ⚠️  Domain already added`);
  } else {
    console.log(`   ⚠️  Domain failed: ${JSON.stringify(domainResult.errors)}`);
  }
}

console.log("\n" + "═".repeat(70));
console.log("✅ Projects created!");
console.log("\n📋 Now run:");
console.log("   ./deploy-repos.sh");
console.log("═".repeat(70));
