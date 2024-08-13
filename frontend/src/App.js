import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyCollection from './pages/MyCollection';
import AddWork from './pages/AddWork';
import WelcomePage from './pages/WelcomePage';
import MyAccount from './pages/MyAccount';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/homepage/mypage" element={<MyCollection />} />
        <Route path="/mypage/mywork" element={<AddWork />} />
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/homepage/myaccount" element={<MyAccount/>}/>
       
      </Routes>
    </Router>
  );
};

export default App;
