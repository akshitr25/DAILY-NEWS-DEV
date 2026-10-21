# The Daily Dispatch

A React news app published on GitHub Pages. News requests go through a Cloudflare Worker so the GNews API key stays on the server and browser CORS restrictions do not block the site.

## Run locally

1. Install Node.js LTS.
2. In the project root, create `worker/.dev.vars` with your GNews API key:

   ```text
   GNEWS_API_KEY=your_gnews_api_key
   ```

3. Create `.env.development.local` in the project root:

   ```text
   REACT_APP_NEWS_API_URL=http://localhost:8787/api/news
   ```

4. In one terminal, start the Worker:

   ```powershell
   npx wrangler@4 dev --config worker/wrangler.toml --port 8787
   ```

5. In another terminal, start the website:

   ```powershell
   npm start
   ```

Open `http://localhost:3000`.

## Deploy the news API

You need a Cloudflare account and a GNews API key.

1. From the project root, authenticate Wrangler:

   ```powershell
   npx wrangler@4 login
   ```

2. Store the GNews key as a Worker secret (Wrangler prompts for its value):

   ```powershell
   npx wrangler@4 secret put GNEWS_API_KEY --config worker/wrangler.toml
   ```

3. Deploy the Worker:

   ```powershell
   npx wrangler@4 deploy --config worker/wrangler.toml
   ```

   Wrangler prints the Worker URL, similar to `https://daily-news-api.YOUR_SUBDOMAIN.workers.dev`.

4. Create `.env.production.local` in the project root and set the Worker URL:

   ```text
   REACT_APP_NEWS_API_URL=https://daily-news-api.YOUR_SUBDOMAIN.workers.dev/api/news
   ```

5. Publish the website:

   ```powershell
   npm run deploy
   ```

The `.env.*.local` files and `worker/.dev.vars` are ignored by Git. Never put the GNews key in a `REACT_APP_*` variable or commit it to the repository: browser build variables are public.

## Rotate the previously exposed API key

The old GNews key was included in the public website source. Revoke or regenerate it in the GNews dashboard, then use the new key as the Worker secret above.

## Other commands

- `npm test -- --watchAll=false` runs tests.
- `npm run build` creates the production site in `build/`.
