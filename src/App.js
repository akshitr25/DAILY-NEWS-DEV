import React from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import NewsItem from './Components/NewsItem';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
const App=()=>{
  const pageSize=9;
  let [progress,setProgress]=useState(0);
  return(
      <div className='bg-secondary'>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={100}
        height={4}
        onLoaderFinished={() => setProgress(progress)}
        />
          <Routes>
          <Route
              exact
              path="/DAILY-NEWS-DEV/WWE"
              element={<News setProgress={setProgress}
                query="wwe"
                pageSize={10}/>}
            />
            <Route
              exact
              path="/*"
              element={<News setProgress={setProgress}
                key="general"
                country="in" query="general" pageSize={10}/>}
            />
            <Route 
              exact
              path="/DAILY-NEWS-DEV/business/*"
              element={<News setProgress={setProgress}
              key="business"
              country="in" query="business" 
              pageSize={10}/>}
              />
              <Route 
              exact
              path="/DAILY-NEWS-DEV/health/*"
              element={<News setProgress={setProgress}
              key="health"
              country="in" query="health" 
              pageSize={10}/>}
              />
              <Route 
              exact
              path="/DAILY-NEWS-DEV/science/*"
              element={<News setProgress={setProgress} 
              key="science"
              country="in" query="science" 
              pageSize={10}/>}
              />
              <Route 
              exact
              path="/DAILY-NEWS-DEV/sports/*"
              element={<News setProgress={setProgress} 
              key="sports"
              country="in" query="sports" 
              pageSize={10}/>}
              />
              <Route 
              exact
              path="/DAILY-NEWS-DEV/technology/*"
              element={<News setProgress={setProgress}
              key="technology"
              country="in" query="technology" 
              pageSize={10}/>}
              />
            </Routes>
        </BrowserRouter>
      </div>
      );
}
export default App;