import React from 'react'
import { Link } from 'react-router-dom'

const Navbar=()=>{ //function based component
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-info">
  <Link className="navbar-brand text-warning fw-bold" to="/DAILY-NEWS-DEV/WWE">WWE</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link text-white" to="/DAILY-NEWS-DEV/">Home<span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/DAILY-NEWS-DEV/business">Business</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/DAILY-NEWS-DEV/health">Health</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/DAILY-NEWS-DEV/science">Science</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/DAILY-NEWS-DEV/sports">Sports</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/DAILY-NEWS-DEV/technology">Technology</Link>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-success my-2 my-sm-0" type="submit">Go</button>
    </form>
  </div>
</nav>
      </div>
    )
}
export default Navbar;
