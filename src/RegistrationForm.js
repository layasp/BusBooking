// RegistrationForm.js
import React, { useState } from 'react';
import './Form.css'; // Import CSS file for styling

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpClicked, setIsSignUpClicked] = useState(false); // State to track whether Sign Up is clicked

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement registration logic (e.g., API call to backend)
    console.log({ email, username, password });
  };

  const handleSignUpClick = () => {
    setIsSignUpClicked(true);
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Render email field only if Sign Up is clicked */}
        {isSignUpClicked && (
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        )}
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn-primary">Sign Up</button>
      </form>
      {/* Render "Sign Up" link only if Sign Up is not clicked */}
      {!isSignUpClicked && (
        <div className="options">
          <span onClick={handleSignUpClick} style={{ cursor: 'pointer' }}>Sign Up</span>
        </div>
      )}
      {/* Render "Sign In" link */}
      <div className="options">
        <a href="/login">Sign In</a>
      </div>
    </div>
  );
};

export default RegistrationForm;
