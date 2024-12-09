import {jwtDecode} from 'jwt-decode';
import { useEffect, useRef } from 'react';
import { refreshToken } from '../api/auth';

export const getTokenExpiry = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000; // Convert seconds to milliseconds
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export const useTokenRefresh = (token, setToken) => {
  const refreshTimeout = useRef(null);

  useEffect(() => {
    if (!token) return;

    const scheduleRefresh = () => {
      const expiryTime = getTokenExpiry(token);
      if (!expiryTime) return;

      const refreshTime = expiryTime - Date.now() - 10000; // 10 seconds before expiry
      if (refreshTime > 0) {
        refreshTimeout.current = setTimeout(async () => {
          try {
            const newToken = await refreshToken(token);
            setToken(newToken);
            localStorage.setItem('token', newToken); // Update local storage
            scheduleRefresh(); // Schedule the next refresh
          } catch (error) {
            console.error('Failed to refresh token:', error);
          }
        }, refreshTime);
      }
    };

    scheduleRefresh();

    return () => clearTimeout(refreshTimeout.current); // Cleanup on unmount or token change
  }, [token, setToken]);
};