// Cloudflare Worker: receives a new siteContent.json from /admin and commits
// it to the GitHub repo. The push to `main` triggers the Pages build action
// (.github/workflows/deploy.yml), which redeploys the static site to GitHub
// Pages within ~60 seconds.
//
// Endpoints:
//   POST /update-content    -> auth + commit a new siteContent.json
//   GET  /health            -> { ok: true } (sanity check)
//   OPTIONS *               -> CORS preflight
//
// Required secrets (set via `wrangler secret put ...`):
//   GITHUB_TOKEN     fine-grained PAT with Contents: read+write on this repo
//   ADMIN_PASSWORD   the password the admin form will send as Bearer auth
//
// Required vars (in wrangler.toml):
//   GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH, GITHUB_PATH, ALLOWED_ORIGIN

const REQUIRED_SECRETS = ["GITHUB_TOKEN", "ADMIN_PASSWORD"];
const REQUIRED_VARS = [
  "GITHUB_OWNER",
  "GITHUB_REPO",
  "GITHUB_BRANCH",
  "GITHUB_PATH",
  "ALLOWED_ORIGIN",
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return preflight(request, env);
    }

    if (request.method === "GET" && url.pathname === "/health") {
      return json({ ok: true }, 200, env);
    }

    if (request.method === "POST" && url.pathname === "/update-content") {
      try {
        return await handleUpdate(request, env);
      } catch (err) {
        return json(
          { error: "Worker exception: " + (err && err.message) || String(err) },
          500,
          env,
        );
      }
    }

    return json({ error: "Not found" }, 404, env);
  },
};

async function handleUpdate(request, env) {
  const missing = [...REQUIRED_SECRETS, ...REQUIRED_VARS].filter(
    (k) => !env[k],
  );
  if (missing.length) {
    return json(
      { error: "Worker misconfigured. Missing: " + missing.join(", ") },
      500,
      env,
    );
  }

  const auth = request.headers.get("Authorization") || "";
  const supplied = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!supplied || !timingSafeEqual(supplied, env.ADMIN_PASSWORD)) {
    return json({ error: "Invalid password" }, 401, env);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Body is not valid JSON" }, 400, env);
  }
  if (!body || typeof body !== "object" || !("content" in body)) {
    return json(
      { error: 'Body must be { "content": <object> }' },
      400,
      env,
    );
  }
  const newContent = body.content;
  if (!newContent || typeof newContent !== "object" || Array.isArray(newContent)) {
    return json(
      { error: "content must be a JSON object (the new siteContent.json)" },
      400,
      env,
    );
  }

  const note =
    typeof body.note === "string" && body.note.length < 200
      ? body.note.trim()
      : "";

  // ── Step 1: get the current file's sha (required by GitHub PUT API) ────
  const getUrl =
    `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}` +
    `/contents/${encodeURIComponent(env.GITHUB_PATH)}` +
    `?ref=${encodeURIComponent(env.GITHUB_BRANCH)}`;

  const getRes = await fetch(getUrl, {
    headers: githubHeaders(env),
    cf: { cacheTtl: 0 },
  });

  let sha = null;
  if (getRes.ok) {
    const meta = await getRes.json();
    sha = meta.sha;
  } else if (getRes.status !== 404) {
    const text = await getRes.text();
    return json(
      { error: `GitHub GET failed (${getRes.status}): ${text.slice(0, 300)}` },
      502,
      env,
    );
  }

  // ── Step 2: PUT the new content. The path is hard-coded by env.GITHUB_PATH,
  //          so whatever filename the admin dropped is implicitly renamed.───
  const prettyJson = JSON.stringify(newContent, null, 2) + "\n";
  const base64 = bytesToBase64(new TextEncoder().encode(prettyJson));

  const ts = new Date().toISOString().replace("T", " ").slice(0, 16) + "Z";
  const message =
    `admin: update ${env.GITHUB_PATH} (${ts})` + (note ? ` — ${note}` : "");

  const putUrl =
    `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}` +
    `/contents/${encodeURIComponent(env.GITHUB_PATH)}`;

  const putBody = {
    message,
    content: base64,
    branch: env.GITHUB_BRANCH,
  };
  if (sha) putBody.sha = sha;

  const putRes = await fetch(putUrl, {
    method: "PUT",
    headers: { ...githubHeaders(env), "Content-Type": "application/json" },
    body: JSON.stringify(putBody),
  });

  if (!putRes.ok) {
    const text = await putRes.text();
    return json(
      { error: `GitHub PUT failed (${putRes.status}): ${text.slice(0, 400)}` },
      502,
      env,
    );
  }

  const putJson = await putRes.json();
  return json(
    {
      ok: true,
      commitSha: putJson?.commit?.sha,
      commitUrl: putJson?.commit?.html_url,
      path: env.GITHUB_PATH,
      branch: env.GITHUB_BRANCH,
    },
    200,
    env,
  );
}

function githubHeaders(env) {
  return {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    "User-Agent": "lifestory-admin-worker",
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

// Constant-time compare so a wrong password can't be guessed via timing.
function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

function bytesToBase64(bytes) {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

// ── CORS helpers ─────────────────────────────────────────────────────────
function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "600",
    Vary: "Origin",
  };
}

function preflight(request, env) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(env),
  });
}

function json(payload, status, env) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(env || {}),
    },
  });
}
