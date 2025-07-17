import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 1. Importamos el hook de autenticación
import api from "../api/api"; // 2. Importamos nuestra instancia de Axios

export default function Login() {
  const [usuario, setUsuario] = useState("admin"); // Cambiamos email por usuario
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
      // 3. Hacemos la llamada real a la API
      const response = await api.post('/auth/login', {
        usuario,
        contrasena,
      });

      // 4. Si el login es exitoso, usamos la función del AuthContext
      if (response.data.access_token) {
        auth.login(response.data.access_token);
        navigate("/dashboard"); // Redirigimos al dashboard
      }
    } catch (err) {
      console.error("Error en el login:", err);
      setError("Usuario o contraseña incorrectos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-red-500 text-2xl">🔥</span>
          <h1 className="text-2xl font-bold text-gray-800">FireMonitor</h1>
        </div>
        <h2 className="text-center text-xl font-semibold mb-6 text-gray-700">
          Iniciar Sesión
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Usuario
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="admin"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          className="w-full border border-gray-300 px-4 py-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="••••••••"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        
        {/* ... (el resto del formulario no necesita cambios) ... */}

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 font-semibold disabled:bg-red-400"
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="text-center text-sm mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-red-500 hover:underline">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}