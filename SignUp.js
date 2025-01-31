import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Make sure you have corresponding styles for this component

function SignUp({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // For simplicity, simulate account creation here
    if (username && password) {
      onSignUp(); // Call parent function to set the authentication state
      navigate('/planner'); // Redirect to the planner page
    } else {
      alert('Please fill in all fields'); // Show alert if credentials are missing
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create Account</h2>
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

          <button type="submit">Sign Up</button>
        </form>

        <div className="already-have-account">
          <p>Already have an account?</p>
          <button onClick={() => navigate('/signin')}>Sign In</button> {/* Link to sign in page */}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
