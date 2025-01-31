import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sign.css'; // Make sure you have corresponding styles for this component

function SignIn({ onSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // For simplicity, simulate authentication here
    if (username === 'user' && password === 'password') {
      onSignIn(); // Call parent function to set the authentication state
      navigate('/planner'); // Redirect to the planner page
    } else {
      alert('Invalid credentials'); // Show alert if credentials are incorrect
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit">Sign In</button>
        </form>

        <div className="create-account">
          <p>Don't have an account?</p>
          <button onClick={() => navigate('/signup')}>Create Account</button> {/* Link to sign-up page */}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
