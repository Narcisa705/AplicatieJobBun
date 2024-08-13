import React from 'react';
import Navbar from '../components/NavBar';
import AddWorkForm from '../components/AddWork';


function AddWork() {
    return (
      <div>
        <Navbar />
        
        <div className="mt-3">
          <AddWorkForm/>
        </div>
      </div>
    );
  }
  //dfr
  export default AddWork;