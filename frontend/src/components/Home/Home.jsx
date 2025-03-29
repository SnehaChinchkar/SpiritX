import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useTheme } from '../../ThemeContext';
import './Home.css';

function Home() {
  const { theme } = useTheme();
  return (
    <div className={`home-container ${theme}`}>
      <Navbar />
      <div className="home-content">
        <h1>Welcome to the Homepage!</h1>
        <p>This is your dashboard after logging in.</p>
      </div>
    </div>
  );
}

export default Home;