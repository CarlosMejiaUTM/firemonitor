import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

export default function Login() {
  const [usuario, setUsuario] = useState("admin");
  const [contrasena, setContrasena] = useState("admin12345");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', {
        usuario,
        contrasena,
      });

      if (response.data.access_token) {
        auth.login(response.data.access_token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error en el login:", err);
      setError("Usuario o contraseña incorrectos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      {/* MEJORA: Se añade 'space-y-6' para un espaciado vertical consistente
        entre todos los elementos del formulario (logo, campos, botón).
      */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
      >
        {/* Encabezado sin cambios, ya estaba bien estructurado */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-red-500 text-3xl">🔥</span>
            <h1 className="text-3xl font-bold text-gray-800">FireMonitor</h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-600">
            Iniciar Sesión
          </h2>
        </div>

        {/* MEJORA: Mensaje de error estilizado como una alerta para mayor visibilidad.
        */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-center text-sm text-red-700 p-3 rounded-md">
            {error}
          </div>
        )}

        {/* Contenedor para los campos de entrada para un espaciado interno */}
        <div className="space-y-4">
          {/* CAMPO DE USUARIO CON ICONO */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              <input
                type="text"
                className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="nombre.usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
          </div>

          {/* CAMPO DE CONTRASEÑA CON ICONO */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </span>
              <input
                type="password"
                className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="••••••••"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* MEJORA: Botón con spinner de carga y transiciones suaves.
        */}
        <button
          type="submit"
          className="w-full flex justify-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 font-semibold disabled:bg-red-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </button>

        <p className="text-center text-sm text-gray-600 pt-2">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="font-medium text-red-600 hover:text-red-500 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}