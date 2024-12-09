import React, { useState } from 'react';
import './ChangePasswordForm.css';

const ChangePasswordForm = ({ onClose, onSubmit }) => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword) {
      setError('New password can not be empty!');
      return;
    }
    onSubmit(newPassword);
  };

  return (
    <div className="change-password-form">
      <form onSubmit={handleSubmit}>
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;