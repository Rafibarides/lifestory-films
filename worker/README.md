# LifeStory Admin Worker

Tiny Cloudflare Worker that backs the `/admin` page on `yourlifedocumentary.com`.
It accepts a new `siteContent.json` from a logged-in admin and commits it to
this repo's `main` branch via the GitHub Contents API. The push triggers
`.github/workflows/deploy.yml`, which rebuilds the site and pushes `dist/`
to `gh-pages`. Total turnaround: about 60 seconds.

```
[ /admin form ] -> [ this Worker ] -> [ GitHub commit on main ]
                                            |
                                            v
                              [ deploy.yml builds + pushes dist ]
                                            |
                                            v
                                    [ live site updated ]
```

## One-time setup

Do this once. Takes ~5 minutes.

### 1. Create a GitHub fine-grained Personal Access Token

1. Go to <https://github.com/settings/personal-access-tokens/new>.
2. **Resource owner**: your account (Rafibarides).
3. **Repository access**: "Only select repositories" -> pick
   `Rafibarides/lifestory-films`.
4. **Permissions** -> Repository permissions -> set **Contents** to
   "Read and write". Leave everything else as "No access".
5. **Expiration**: 1 year is fine. Set a calendar reminder to rotate.
6. Click **Generate token** and copy the value (starts with `github_pat_`).
   You won't see it again.

### 2. Install Wrangler and log in to Cloudflare

```bash
cd worker
npm install
npx wrangler login   # opens browser, authenticates against your CF account
```

### 3. Set the two Worker secrets

```bash
npx wrangler secret put GITHUB_TOKEN
# paste the github_pat_... value when prompted

npx wrangler secret put ADMIN_PASSWORD
# pick a long random password. This is what you'll type into /admin.
```

### 4. Deploy the Worker

```bash
npx wrangler deploy
```

Wrangler will print the deployed URL, e.g.
`https://lifestory-admin.<your-cf-subdomain>.workers.dev`. Copy it.

### 5. Wire up the admin page

Edit `public/admin/index.html`. Find the line:

```js
const WORKER_URL = "https://lifestory-admin.YOUR-CF-SUBDOMAIN.workers.dev/update-content";
```

Replace `YOUR-CF-SUBDOMAIN` with the subdomain Cloudflare gave you in step 4.

Commit and push:

```bash
git add public/admin/index.html worker/ .github/workflows/deploy.yml
git commit -m "feat: /admin page + cloudflare worker + auto-deploy action"
git push
```

The first push to `main` will fire the new `deploy.yml` action and start
serving the admin page at <https://yourlifedocumentary.com/admin/>.

## Using it

1. Visit <https://yourlifedocumentary.com/admin/>.
2. Type the `ADMIN_PASSWORD`.
3. Drag any `.json` file (any filename) onto the drop zone.
4. The page validates that it parses and that its top-level keys match the
   live `siteContent.json`. If anything is off, it refuses.
5. Click **Publish to live site**.
6. The Worker commits to `main`, the action runs, the site is live in ~60s.
   The success message links to the commit on GitHub.

## Operational notes

- **Every change is an audit log entry**. Each publish is a real git commit
  on `main`. To roll back: `git revert <sha> && git push`. The action will
  redeploy the previous version.
- **Filename rename**: regardless of what file the admin drops, the Worker
  always writes to the path defined by `GITHUB_PATH` in `wrangler.toml`
  (default: `siteContent.json`). The "rename" is implicit in that path.
- **Concurrency**: `deploy.yml` uses a concurrency group so two rapid
  publishes don't race on the `gh-pages` branch.
- **Health check**: `GET /health` on the worker returns `{ ok: true }`.

## Local development

```bash
cd worker
npx wrangler dev
# worker is now at http://localhost:8787
```

For local testing, put secrets in a `.dev.vars` file (gitignored):

```
GITHUB_TOKEN=github_pat_xxx
ADMIN_PASSWORD=hunter2
```

You can point a local copy of `public/admin/index.html` at
`http://localhost:8787/update-content` to do an end-to-end dry run. The
Worker will commit to your real GitHub repo, so use a throwaway branch
(`GITHUB_BRANCH = "admin-test"`) in `wrangler.toml` while testing.

## Rotating the GitHub PAT

PATs expire. To rotate:

```bash
npx wrangler secret put GITHUB_TOKEN
# paste the new token
```

No redeploy needed — Worker secrets update live.
