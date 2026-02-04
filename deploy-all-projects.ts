#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env --allow-run
// SPDX-License-Identifier: PMPL-1.0-or-later
// Deploy all hyperpolymath projects to Cloudflare Pages

const CLOUDFLARE_API_TOKEN = Deno.env.get("CLOUDFLARE_API_TOKEN");
const CLOUDFLARE_ACCOUNT_ID = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");

if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ACCOUNT_ID) {
  console.error("❌ Missing credentials");
  Deno.exit(1);
}

const projects = [
  { name: "affinescript", domain: "affinescript.dev", path: "affinescript" },
  { name: "anvomidav", domain: "anvomidav.org", path: "anvomidav" },
  { name: "betlang", domain: "betlang.org", path: "betlang" },
  { name: "eclexia", domain: "eclexia.org", path: "eclexia" },
  { name: "ephapax", domain: "ephapax.org", path: "ephapax" },
  { name: "error-lang", domain: "error-lang.org", path: "error-lang" },
  { name: "my-lang", domain: "my-lang.net", path: "my-lang" },
  { name: "oblibeny", domain: "oblibeny.net", path: "oblibeny" },
  { name: "reposystem", domain: "reposystem.dev", path: "reposystem" },
  { name: "verisimdb", domain: "verisimdb.org", path: "verisimdb" },
];

console.log("🚀 Deploying all projects to Cloudflare Pages");
console.log("═".repeat(70));

const results = [];

for (const project of projects) {
  console.log(`\n📦 Project: ${project.name}`);
  console.log(`   Domain: ${project.domain}`);

  const repoPath = `${Deno.env.get("HOME")}/Documents/hyperpolymath-repos/${project.path}`;

  // Check if repo exists
  try {
    await Deno.stat(repoPath);
  } catch {
    console.log(`   ❌ Repo not found at ${repoPath}`);
    results.push({ ...project, status: "repo_not_found" });
    continue;
  }

  // Deploy using wrangler from within the repo directory
  console.log(`   📤 Deploying...`);

  const deployCmd = new Deno.Command("deno", {
    args: [
      "run",
      "-A",
      "npm:wrangler",
      "pages",
      "deploy",
      ".",
      "--project-name=" + project.name,
      "--branch=main",
    ],
    cwd: repoPath,
    stdout: "piped",
    stderr: "piped",
  });

  try {
    const deployOutput = await deployCmd.output();
    const deployText = new TextDecoder().decode(deployOutput.stdout);

    if (deployOutput.code === 0) {
      // Extract URL from output
      const urlMatch = deployText.match(/https:\/\/[a-f0-9]+\.[a-z0-9-]+\.pages\.dev/);
      const deployUrl = urlMatch ? urlMatch[0] : `https://${project.name}.pages.dev`;

      console.log(`   ✅ Deployed: ${deployUrl}`);

      // Add custom domain
      console.log(`   🌐 Adding custom domain: ${project.domain}`);

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
        console.log(`   ✅ Custom domain added`);
        results.push({ ...project, status: "success", url: deployUrl });
      } else if (domainResult.errors?.[0]?.code === 8000018) {
        console.log(`   ⚠️  Custom domain already exists`);
        results.push({ ...project, status: "success", url: deployUrl });
      } else {
        console.log(`   ⚠️  Domain add failed: ${JSON.stringify(domainResult.errors)}`);
        results.push({ ...project, status: "deployed_no_domain", url: deployUrl });
      }
    } else {
      const errorText = new TextDecoder().decode(deployOutput.stderr);
      console.log(`   ❌ Deployment failed`);
      console.log(`   Error: ${errorText.slice(0, 200)}`);
      results.push({ ...project, status: "deploy_failed" });
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    results.push({ ...project, status: "error", error: error.message });
  }
}

// Summary
console.log("\n" + "═".repeat(70));
console.log("📊 Deployment Summary\n");

const successful = results.filter(r => r.status === "success");
const failed = results.filter(r => r.status !== "success");

console.log(`✅ Successfully deployed: ${successful.length}`);
for (const r of successful) {
  console.log(`   - ${r.name}: ${r.url}`);
  console.log(`     Custom domain: https://${r.domain}`);
}

if (failed.length > 0) {
  console.log(`\n❌ Failed/Issues: ${failed.length}`);
  for (const r of failed) {
    console.log(`   - ${r.name}: ${r.status}`);
  }
}

console.log("\n📋 Next Steps:");
console.log("1. Set up DNS zones for domains not in Cloudflare");
console.log("2. Add CNAME records pointing to <project>.pages.dev");
console.log("3. Wait 1-5 minutes for DNS propagation");
console.log("4. Verify domains are accessible");

console.log("═".repeat(70));
