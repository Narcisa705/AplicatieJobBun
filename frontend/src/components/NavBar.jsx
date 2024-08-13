
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const handleLogout = () => {
    console.log('Logging out...');
   
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/homepage">Artist's Vision</Link>
      </div>
      <div className="navbar-links">
        <Link to="/homepage/mypage" className="navbar-link">My Works</Link>
        <div className="navbar-account-menu">
          <button className="account-menu-button" onClick={toggleAccountMenu}>
            My Account
          </button>
          {isAccountMenuOpen && (
            <div className="account-menu-dropdown">
              <Link to="/homepage/myaccount" className="dropdown-link">
                <i className="fas fa-user"></i> Account
              </Link>
              <Link to="/" onClick={handleLogout} className="dropdown-link">
                <i className="fas fa-sign-out-alt"></i>Exit
              </Link>
            </div>
          )}
        </div>
        <div className="navbar-user-menu">
          <button className="user-menu-button" onClick={toggleMenu}>
            
          </button>
          {isMenuOpen && (
            <div className="user-menu-dropdown">
              <Link to="/welcome" onClick={handleLogout} className="logout-button">
                <i className="fas fa-sign-out-alt"></i>Exit
              </Link>
              <button className="account-button">
                <i className="fas fa-user"></i> Account
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
