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
    <div className="container my-4 bg-secondary">
      <h1 className="text-center text-white" style={{ margin: "25px 0px", marginTop: "55px" }}>
        Daily News - Top {capitalizeFirstLetter(props.query)} Headlines
      </h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          Unable to load news: {error}{' '}
          <button className="btn btn-outline-danger btn-sm" onClick={retry} type="button">
            Retry
          </button>
        </div>
      )}
      {loading && articles.length === 0 && <Spinner />}
      {!loading && !error && articles.length === 0 && (
        <p className="text-center text-white">No news articles were found.</p>
      )}
      {articles.length > 0 && (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={!error && articles.length < totalResults}
          loader={loading ? <Spinner /> : null}
          endMessage={
            !error && (
              <p style={{ textAlign: 'center' }}>
                <b>You have seen all the articles. Stay tuned to Daily News for the latest updates.</b>
              </p>
            )
          }
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => (
                <div className="col-md-3 mx-4 my-4" key={element.url}>
                  <NewsItem
                    title={element.title || ""}
                    desc={element.description || ""}
                    imgUrl={element.image}
                    newsUrl={element.url}
                    date={element.publishedAt}
                    source={element.source?.name || 'Unknown source'}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </div>
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
