import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState(''); // ✅ New state for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const endpoint = isSignUp
        ? 'http://localhost:5000/api/auth/register'
        : 'http://localhost:5000/api/auth/login';
      
      const requestData = isSignUp
        ? { name, email, password, role } // ✅ Include `name` only for sign-up
        : { email, password, role };

      const { data } = await axios.post(endpoint, requestData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });

      alert(data.message);
      navigate('/home');
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleToggle = (signUp) => {
    setIsSignUp(signUp);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <div className="logo-placeholder"></div>
        <span className="company-name">Company Name</span>
      </div>
      <div className="login-box">
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Full Name:</label> {/* ✅ New input field */}
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="administrator">Administrator</option>
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
