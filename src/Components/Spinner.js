import React from 'react'
const Spinner = () => (
  <div className="news-loader" role="status" aria-label="Loading news">
    <span className="loader-ring" />
    <span>Gathering the latest stories</span>
  </div>
);
export default Spinner;