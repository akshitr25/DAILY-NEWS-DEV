import React from 'react'

const NewsItem=(props)=>{
    let {title, desc, imgUrl, newsUrl, date, source}=props;
    return (
      <div>
        <div className="card text-white bg-dark mb-3" style={{width: "18rem"}}>
        <a href={newsUrl?newsUrl:"https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg"} target="_blank" rel="noreferrer">
          <img src={imgUrl?imgUrl:"https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg"} className="card-img-top" alt={title}/>
          </a>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-warning text-dark" style={{right: '0%', zIndex: "1"}}> 
    {source}
  </span>
  <div className="card-body">
  <h5 className="card-title flex">
    <a href={newsUrl?newsUrl:"https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg"} target="_blank" rel="noreferrer">{title}</a>
  </h5>
    <p className="card-text">{desc}</p>
    <a href={newsUrl?newsUrl:"https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg"} target="_blank" className="btn btn-primary" rel="noreferrer">Read More...</a>
    <p className="card-text"><small className="">{new Date(date).toGMTString()}</small></p>
    {/* By {author!=null?author:"Unknown"} on  */}
  </div>
</div>
      </div>
    )
}
export default NewsItem;
