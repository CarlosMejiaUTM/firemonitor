import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Definimos la forma del contexto
interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Al cargar la app, revisa si hay un token en el almacenamiento local
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Aquí decodificamos el token para obtener los datos del usuario
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('access_token', token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser(payload);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = { isAuthenticated, user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}