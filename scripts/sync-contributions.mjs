// Brings each open source contribution in src/data/resume.tsx in line with GitHub:
// merged, open or draft, and drops the ones closed without merging.
// Run by .github/workflows/sync-contributions.yml; locally: GITHUB_TOKEN=$(gh auth token) node scripts/sync-contributions.mjs
import { readFileSync, writeFileSync } from "node:fs";

const FILE = new URL("../src/data/resume.tsx", import.meta.url);
const source = readFileSync(FILE, "utf8");
const eol = source.includes("\r\n") ? "\r\n" : "\n";
const lines = source.split(/\r?\n/);

const headers = {
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
};

async function stateOf(repo, number) {
  const res = await fetch(`https://api.github.com/repos/${repo}/pulls/${number}`, { headers });
  if (!res.ok) throw new Error(`${repo}#${number}: GitHub answered ${res.status}`);
  const pr = await res.json();
  if (pr.merged_at) return "merged";
  if (pr.state === "closed") return "closed";
  return pr.draft ? "draft" : "open";
}

const start = lines.findIndex((l) => l.trim() === "openSourceContributions: [");
const end = lines.findIndex((l, i) => i > start && l.trim() === "],");
const changes = [];

// Walk the list bottom-up so removing an entry doesn't shift the ones still to visit.
for (let i = end - 1; i > start; i--) {
  const href = lines[i].match(/href: "https:\/\/github\.com\/([^/]+\/[^/]+)\/pull\/(\d+)"/);
  if (!href) continue;
  const [, repo, number] = href;
  let statusAt = i;
  while (!/status: "/.test(lines[statusAt])) statusAt--;
  const current = lines[statusAt].match(/status: "(\w+)"/)[1];
  const next = await stateOf(repo, number);
  if (next === current) continue;

  if (next === "closed") {
    // The entry is the `{ ... },` block around the href, opened and closed at the list's indent.
    const indent = lines[start + 1].match(/^\s*/)[0];
    const open = lines.slice(0, i).findLastIndex((l) => l === `${indent}{`);
    const close = lines.findIndex((l, j) => j > i && l === `${indent}},`);
    lines.splice(open, close - open + 1);
  } else {
    lines[statusAt] = lines[statusAt].replace(`"${current}"`, `"${next}"`);
  }
  changes.push(`${repo}#${number}: ${current} -> ${next}`);
}

if (changes.length) writeFileSync(FILE, lines.join(eol));
console.log(changes.length ? changes.join("\n") : "Contributions already match GitHub.");
