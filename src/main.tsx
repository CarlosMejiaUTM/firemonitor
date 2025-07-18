import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // <-- IMPORTA EL PROVIDER
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider> {/* <-- AGREGA ESTA LÍNEA */}
      <BrowserRouter basename="/firemonitor/">
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);