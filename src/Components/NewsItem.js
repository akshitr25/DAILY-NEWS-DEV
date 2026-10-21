import React from 'react'

const NewsItem = ({ title, desc, imgUrl, newsUrl, date, source }) => (
  <article className="story-card">
    <a
      className="story-image-link"
      href={newsUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`Read ${title}`}
    >
      {imgUrl ? (
        <img className="story-image" src={imgUrl} alt="" loading="lazy" />
      ) : (
        <div className="story-image-placeholder" aria-hidden="true">
          <span>THE DAILY DISPATCH</span>
        </div>
      )}
      <span className="story-category">{source}</span>
    </a>
    <div className="story-content">
      <h2 className="story-title">
        <a href={newsUrl} target="_blank" rel="noreferrer">{title}</a>
      </h2>
      {desc && <p className="story-description">{desc}</p>}
      <div className="story-footer">
        <time dateTime={date}>{date ? new Date(date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }) : 'Latest'}</time>
        <a className="story-read-more" href={newsUrl} target="_blank" rel="noreferrer">
          Read story <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </article>
);

export default NewsItem;
