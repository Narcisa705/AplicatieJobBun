import React from 'react';
import Navbar from '../components/NavBar';
import GalleryGrid from '../components/WorkGridMy';



function MyCollection() {
  return (
    <div>
      <Navbar />
      
      <div className="mt-3">
      
        <GalleryGrid/>
      </div>
    </div>
  );
}

export default MyCollection;
