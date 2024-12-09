// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import { login, register } from './api/auth'; // Import login API helper
import { useTokenRefresh } from './helpers/tokenUtils';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [uuid, setUuid] = useState(localStorage.getItem('uuid'));

  useTokenRefresh(token, setToken);

  const handleSubmit = async (formData, isRegister) => {
    if (isRegister) {
      try {
        console.log('Register:', formData);
        await register(formData.login, formData.password, formData.role);
        console.log('Register successful')
      } catch (error) {
        alert('Register failed: ' + error.message);
      }
    } else {
      try {
        const result = await login(formData.login, formData.password);
        console.log('Login successful:', result);
        // Save JWT token and UUID to localStorage or state
        localStorage.setItem('token', result.token);
        localStorage.setItem('uuid', result.user_id);
        setToken(result.token);
        setUuid(result.user_id);
        // Redirect to dashboard or load user data
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUuid(null);
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('uuid');
  };

  return (
    <div className="app">
      <Header />
      <main>
        {token ? 
        <Dashboard token={token} uuid={uuid} onLogout={handleLogout} /> : 
        <Form onSubmit={handleSubmit} />}

      </main>
      <Footer />
    </div>
  );
};

export default App;