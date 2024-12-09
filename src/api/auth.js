// src/api/auth.js
import {createSHA256Hash} from "../helpers/createSha256"

export const login = async (login, passwordRaw) => {
    try {
      const password = createSHA256Hash(passwordRaw);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });
  
      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }
  
      const data = await response.json();
      return data; // Contains JWT token and UUID
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  export const register = async (login, passwordRaw, role) => {
    try {
        const password = createSHA256Hash(passwordRaw);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login, password, role }),
        });
    
        if (!response.ok) {
          throw new Error(`Register failed: ${response.status}`);
        }
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
  }

  // Refresh user token
export const refreshToken = async (token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.status}`);
    }

    const data = await response.json();
    return data.token; // New token
  } catch (error) {
    console.error('Refresh Token Error:', error);
    throw error;
  }
};