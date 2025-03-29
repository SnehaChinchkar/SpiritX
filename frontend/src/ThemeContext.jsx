// src/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Load theme from localStorage, default to 'light' if not set
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Save to localStorage
      return newTheme;
    });
  };

  // Optional: Sync theme with localStorage on initial load (not strictly necessary here due to useState initializer)
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && storedTheme !== theme) {
      setTheme(storedTheme);
    }
  }, []); // Runs only once on mount

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);