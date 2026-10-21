const allowedOrigins = new Set([
  'https://akshitr25.github.io',
  'http://localhost:3000'
]);

function jsonResponse(body, status, origin) {
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });

  if (allowedOrigins.has(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }

  return new Response(JSON.stringify(body), { status, headers });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      if (!allowedOrigins.has(origin)) {
        return new Response(null, { status: 403 });
      }

      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
          'Vary': 'Origin'
        }
      });
    }

    if (request.method !== 'GET') {
      return jsonResponse({ errors: 'Method not allowed.' }, 405, origin);
    }

    if (!allowedOrigins.has(origin)) {
      return jsonResponse({ errors: 'Origin not allowed.' }, 403, origin);
    }

    if (!env.GNEWS_API_KEY) {
      return jsonResponse({ errors: 'The news API key is not configured on the server.' }, 500, origin);
    }

    const requestUrl = new URL(request.url);
    const query = (requestUrl.searchParams.get('q') || '').trim();
    if (!query || query.length > 200) {
      return jsonResponse({ errors: 'A search query between 1 and 200 characters is required.' }, 400, origin);
    }

    const page = Number.parseInt(requestUrl.searchParams.get('page') || '1', 10);
    const max = Number.parseInt(requestUrl.searchParams.get('max') || '10', 10);
    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(max) || max < 1 || max > 10) {
      return jsonResponse({ errors: 'Invalid pagination parameters.' }, 400, origin);
    }

    const upstreamUrl = new URL('https://gnews.io/api/v4/search');
    upstreamUrl.searchParams.set('q', query);
    upstreamUrl.searchParams.set('page', String(page));
    upstreamUrl.searchParams.set('max', String(max));
    upstreamUrl.searchParams.set('lang', 'en');
    upstreamUrl.searchParams.set('apikey', env.GNEWS_API_KEY);

    const country = requestUrl.searchParams.get('country');
    if (country && /^[a-z]{2}$/i.test(country)) {
      upstreamUrl.searchParams.set('country', country);
    }

    if (requestUrl.searchParams.get('sortby') === 'publishedAt') {
      upstreamUrl.searchParams.set('sortby', 'publishedAt');
    }

    try {
      const upstreamResponse = await fetch(upstreamUrl);
      const body = await upstreamResponse.text();
      const headers = new Headers({
        'Content-Type': upstreamResponse.headers.get('Content-Type') || 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': origin,
        'Vary': 'Origin'
      });

      return new Response(body, { status: upstreamResponse.status, headers });
    } catch {
      return jsonResponse({ errors: 'The upstream news service could not be reached.' }, 502, origin);
    }
  }
};
