// src/components/Navbar.jsx
import React, { useState } from 'react';
import { FaEnvelope, FaBell, FaUser, FaSearch, FaSun, FaMoon } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';
import './Navbar.css';

function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-left">
        <div className="logo-placeholder"></div>
        <span className="company-name">Company Name</span>
      </div>
      <div className="navbar-center">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
      </div>
      <div className="navbar-right">
        <Link to="/home" className="nav-option">Home</Link>
        <Link to="/events" className="nav-option">Events</Link>
        <span className="nav-option">
          <FaEnvelope className="nav-icon" />
        </span>
        <span className="nav-option">
          <FaBell className="nav-icon" />
        </span>
        <span className="nav-option theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </span>
        <div
          className="nav-option profile-container"
          onMouseEnter={() => setIsProfileOpen(true)}
          onMouseLeave={() => setIsProfileOpen(false)}
        >
          <FaUser className="nav-icon" />
          {isProfileOpen && (
            <div className="profile-dropdown">
              <Link to="/profile" className="dropdown-item">My Profile</Link>
              <span className="dropdown-item" onClick={handleLogout}>Logout</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;