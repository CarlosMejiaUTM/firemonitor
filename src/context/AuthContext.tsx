import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// --- Definición de Tipos ---
interface AuthContextType {
  isAuthenticated: boolean;
  user: any; // Puedes definir un tipo más específico para tu usuario
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// --- Creación del Contexto ---
const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

// --- Creación del Proveedor ---
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Revisa si hay un token al cargar la app
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        // Decodifica el token para obtener los datos del usuario
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token inválido, removiendo...");
        localStorage.removeItem('access_token');
      }
    }
    // Ha terminado de verificar, ya no está cargando
    setIsLoading(false);
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

  const value = { isAuthenticated, user, isLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}