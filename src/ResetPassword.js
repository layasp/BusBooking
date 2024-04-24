import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './LoginForm.css';

const ResetPassword = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement password update logic (e.g., API call to backend)
    console.log('Password updated with:', { email, newPassword });
    navigate('/');

    // Reset form fields and display password updated alert
    setEmail('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordUpdated(true);
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Update Password</button>
      </form>
      {passwordUpdated && <p>Password has been updated.</p>}
    </div>
  );
};

export default ResetPassword;
