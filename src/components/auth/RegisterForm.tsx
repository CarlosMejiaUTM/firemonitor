// Este es un componente "tonto", solo se encarga de mostrar la UI.
// Recibe todos los datos y funciones como props.
export default function RegisterForm({ formData, handleInputChange, handleSubmit, isLoading, error, successMessage }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-red-500 text-2xl">🔥</span>
        <h1 className="text-2xl font-bold text-gray-800">FireMonitor</h1>
      </div>
      <h2 className="text-center text-xl font-semibold mb-6 text-gray-700">
        Crear Nueva Cuenta
      </h2>

      {/* Zona de Notificaciones */}
      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
      {successMessage && (
        <div 
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-md" 
          role="alert"
        >
          <p className="font-bold">¡Éxito!</p>
          <p>{successMessage}</p>
        </div>
      )}

      {/* --- CAMPOS RESTAURADOS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text" name="nombre" value={formData.nombre} onChange={handleInputChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Apellido</label>
          <input
            type="text" name="apellido" value={formData.apellido} onChange={handleInputChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Correo electrónico</label>
        <input
          type="email" name="correo" value={formData.correo} onChange={handleInputChange}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Usuario</label>
        <input
          type="text" name="usuario" value={formData.usuario} onChange={handleInputChange}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password" name="contrasena" value={formData.contrasena} onChange={handleInputChange}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>
      {/* --------------------------- */}

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 font-semibold disabled:bg-red-400 transition-colors"
        disabled={isLoading}
      >
        {isLoading ? 'Registrando...' : 'Crear Cuenta'}
      </button>
    </form>
  );
}