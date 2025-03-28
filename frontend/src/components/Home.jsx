import React from 'react';
import { FaEnvelope, FaBell, FaUser } from 'react-icons/fa'; // Import icons
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo-placeholder"></div>
          <span className="company-name">Company Name</span>
        </div>
        <div className="navbar-center">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
        <div className="navbar-right">
          <span className="nav-option">Dashboard</span>
          <span className="nav-option">
            <FaEnvelope className="nav-icon" /> Messages
          </span>
          <span className="nav-option">Events</span>
          <span className="nav-option">
            <FaUser className="nav-icon" /> Profile
          </span>
          <span className="notification-btn">
            <FaBell className="nav-icon" />
          </span>
        </div>
      </nav>
      <div className="home-content">
        <h1>Welcome to the Homepage!</h1>
        <p>This is your dashboard after logging in.</p>
      </div>
    </div>
  );
}

export default Home;