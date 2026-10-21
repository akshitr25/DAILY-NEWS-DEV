import React from 'react';
import { render, screen } from '@testing-library/react';
import News from './News';

describe('News', () => {
  const setProgress = jest.fn();

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads and renders GNews articles', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        totalArticles: 1,
        articles: [{
          title: 'Breaking news',
          description: 'A news summary',
          image: 'https://example.com/image.jpg',
          url: 'https://example.com/article',
          publishedAt: '2026-10-21T00:00:00Z',
          source: { name: 'Example News' }
        }]
      })
    });

    render(<News query="technology" country="in" pageSize={10} setProgress={setProgress} />);

    expect(await screen.findByText('Breaking news')).toBeInTheDocument();
    const requestUrl = new URL(global.fetch.mock.calls[0][0]);
    expect(requestUrl.searchParams.get('max')).toBe('10');
    expect(requestUrl.searchParams.get('country')).toBe('in');
  });

  it('shows an API error and offers a retry', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({ errors: 'Invalid API key' })
    });

    render(<News query="technology" setProgress={setProgress} />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid API key');
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });
});
