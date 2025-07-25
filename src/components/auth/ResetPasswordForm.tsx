import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for the success state

interface Props {
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean; // MEJORA: Añadido para manejar el estado de carga
  error: string;
  success: string;
}

export default function ResetPasswordForm({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
  isLoading,
  error,
  success,
}: Props) {
  return (
    // MEJORA: Se utiliza 'space-y-6' para un espaciado consistente.
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
    >
      {/* MEJORA: Encabezado consistente con las otras páginas de autenticación. */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-red-500 text-3xl">🔥</span>
          <h1 className="text-3xl font-bold text-gray-800">FireMonitor</h1>
        </div>
        <h2 className="text-xl font-semibold text-gray-600">
          Restablecer Contraseña
        </h2>
      </div>

      {/* MEJORA: El estado de éxito ahora es un bloque visual claro y final. */}
      {success ? (
        <div className="bg-green-50 border border-green-200 text-center p-4 rounded-md" role="alert">
          <svg className="h-12 w-12 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-bold text-green-800">¡Éxito!</h3>
          <p className="text-sm text-green-700 mt-1 mb-4">{success}</p>
          <Link 
            to="/login" 
            className="font-semibold text-red-600 hover:text-red-500 hover:underline"
          >
            Volver a Inicio
          </Link>
        </div>
      ) : (
        <>
          {/* MEJORA: El mensaje de error ahora es una alerta estilizada. */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-sm text-red-700 p-3 rounded-md text-center" role="alert">
              {error}
            </div>
          )}

          {/* MEJORA: Campos de entrada con iconos y espaciado interno. */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </span>
                <input
                  type="password"
                  className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmar nueva contraseña</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </span>
                <input
                  type="password"
                  className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </div>
            </div>
          </div>

          {/* MEJORA: Botón con estado de carga y mejores estilos. */}
          <button
            type="submit"
            className="w-full flex justify-center bg-red-600 text-white py-2.5 px-4 rounded-md hover:bg-red-700 font-semibold disabled:bg-red-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cambiando...
              </>
            ) : (
              'Cambiar contraseña'
            )}
          </button>
        </>
      )}
    </form>
  );
}