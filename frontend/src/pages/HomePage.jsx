import React from 'react';
import Navbar from '../components/NavBar';
import WorkGrid from '../components/WorkGrid';
function HomePage(){
    return (
        <div>
        <Navbar/>
        <div className="app-container">
        
          <div className="work-grid-container">
            <WorkGrid />
          </div>
        </div>
        </div>
      );
}
export default  HomePage;