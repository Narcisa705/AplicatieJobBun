
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const WelcomePage = () => {
  const [greeting, setGreeting] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
   
    const now = new Date();
    const hours = now.getHours();

    
    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    
    setTimeOfDay(`It is currently ${hours % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${hours < 12 ? 'AM' : 'PM'}.`);
  }, []);

  const handleGoHome = () => {
    navigate('/'); 
  };

  return (
    <div className="welcome-container">
      <h1 className='h11'>{greeting}, User!</h1>
      <p className='p11'>{timeOfDay}</p>
      <Link to="/homepage" className="home-button" onClick={handleGoHome}>Go to Home</Link>
    </div>
  );
};

export default WelcomePage;
