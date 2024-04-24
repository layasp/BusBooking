import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import useNavigate hook
import './LoginForm.css';


const SignupForm = ({ onSave }) => {

  const [user_email, setEmail] = useState('');
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /*const handleSubmit = (e) => {
    e.preventDefault();
    // Implement signup logic (e.g., API call to backend)
    console.log('Signing up with:', { email, username, password });
    // Redirect to login page after signup
    navigate('/');
  };*/

  const handleSubmit = async (req, res) => {
       try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_email, user_name, password }),
      });

      const savedUser = await response.json();


      onSave(savedUser);


      setEmail('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error saving User:', error);
    }
  };


  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={user_email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" value={user_name} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign Up</button>
        <p><Link to="/">Back to Login</Link></p>
      </form>
    </div>
  );
};
export default SignupForm;
