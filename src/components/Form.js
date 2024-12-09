// src/components/Form.js
import React, { useState } from 'react';
import './Form.css';

const Form = ({ onSubmit }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    role: 'admin',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => setIsRegister(!isRegister);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, isRegister);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <input
          type="text"
          name="login"
          placeholder="Login"
          value={formData.login}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {isRegister && (
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        )}
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        <p>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span className="toggle" onClick={toggleMode}>
            {isRegister ? 'Login' : 'Register'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Form;