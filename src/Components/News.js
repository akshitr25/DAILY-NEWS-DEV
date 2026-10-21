import React, { useCallback, useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const { apiKey, country, pageSize, query, setProgress } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState('');

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const loadNews = useCallback(async (requestedPage, append = false) => {
    const url = new URL('https://gnews.io/api/v4/search');
    url.searchParams.set('page', String(requestedPage));
    url.searchParams.set('apikey', apiKey);
    url.searchParams.set('max', String(pageSize));
    url.searchParams.set('q', query);
    url.searchParams.set('lang', 'en');

    if (query === 'wwe') {
      url.searchParams.set('sortby', 'publishedAt');
    } else {
      url.searchParams.set('country', country);
    }

    setProgress(0);
    setLoading(true);
    setError('');

    try {
      const response = await fetch(url.toString());
      const data = await response.json();

      if (!response.ok || !Array.isArray(data.articles)) {
        const apiError = Array.isArray(data.errors)
          ? data.errors.join(', ')
          : data.errors || data.message;
        throw new Error(apiError || `News request failed (${response.status}).`);
      }

      setProgress(60);
      setArticles((currentArticles) =>
        append ? currentArticles.concat(data.articles) : data.articles
      );
      setTotalResults(Number(data.totalArticles) || 0);
      setPage(requestedPage);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load news.');
    } finally {
      setLoading(false);
      setProgress(100);
    }
  }, [apiKey, country, pageSize, query, setProgress]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setTotalResults(0);
    loadNews(1);
  }, [loadNews]);

  const fetchMoreData = () => {
    if (!loading && !error && articles.length < totalResults) {
      loadNews(page + 1, true);
    }
  };
  const retry = () => loadNews(articles.length > 0 ? page + 1 : 1, articles.length > 0);

  return (
    <main className="news-page">
      <section className="news-intro">
        <p className="section-kicker"><span /> YOUR DAILY BRIEFING</p>
        <h1>{capitalizeFirstLetter(query)}<span>—</span> in focus</h1>
        <p className="news-subtitle">The stories shaping today, selected for you.</p>
        <div className="intro-rule"><span /></div>
      </section>
      {error && (
        <div className="news-error" role="alert">
          <span className="error-symbol" aria-hidden="true">!</span>
          <div>
            <strong>We couldn’t fetch the latest stories.</strong>
            <p>{error}</p>
          </div>
          <button className="retry-button" onClick={retry} type="button">Try again <span aria-hidden="true">↗</span></button>
        </div>
      )}
      {loading && articles.length === 0 && <Spinner />}
      {!loading && !error && articles.length === 0 && (
        <p className="empty-state">No stories found in this section just yet.</p>
      )}
      {articles.length > 0 && (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={!error && articles.length < totalResults}
          loader={loading ? <Spinner /> : null}
          endMessage={
            !error && (
              <p className="end-message">You’re all caught up. Check back soon for more.</p>
            )
          }
        >
          <div className="story-grid">
              {articles.map((element) => (
                <NewsItem
                  key={element.url}
                  title={element.title || ""}
                  desc={element.description || ""}
                  imgUrl={element.image}
                  newsUrl={element.url}
                  date={element.publishedAt}
                  source={element.source?.name || 'Unknown source'}
                />
              ))}
          </div>
        </InfiniteScroll>
      )}
    </main>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 10,
  category: "general",
  query: "",
  apiKey: "1d2a950ce9de79cec9e981baadbb9b69"
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  query: PropTypes.string,
  apiKey: PropTypes.string,
  setProgress: PropTypes.func.isRequired
};

export default News;
