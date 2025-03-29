import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';
import './Login.css';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Student');
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      alert('Account created! Logging you in...');
      navigate('/home');
    } else {
      navigate('/home');
    }
  };

  const handleToggle = (signUp) => {
    setIsSignUp(signUp);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={`login-container ${theme}`}>
      <div className="logo-container">
        <div className="logo-placeholder"></div>
        <span className="company-name">Company Name</span>
      </div>
      <div className="login-box">
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="Administrator">Administrator</option>
              <option value="Student">Student</option>
              <option value="Alumni">Alumni</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
        </form>
        <div className="toggle-auth">
          {isSignUp ? (
            <p>
              Already have an account? <span onClick={() => handleToggle(false)}>Login</span>
            </p>
          ) : (
            <p>
              New user? <span onClick={() => handleToggle(true)}>Sign Up</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;