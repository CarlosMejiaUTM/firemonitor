// Este es un componente "tonto", solo se encarga de mostrar la UI.
// Recibe todos los datos y funciones como props.
export default function RegisterForm({ formData, handleInputChange, handleSubmit, isLoading, error, successMessage }) {
  return (
    // MEJORA: Se añade 'space-y-6' para un ritmo vertical consistente.
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
    >
      {/* --- Encabezado --- */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-red-500 text-3xl">🔥</span>
          <h1 className="text-3xl font-bold text-gray-800">FireMonitor</h1>
        </div>
        <h2 className="text-xl font-semibold text-gray-600">
          Crear Nueva Cuenta
        </h2>
      </div>

      {/* --- Zona de Notificaciones --- */}
      <div className="min-h-[68px]"> {/* Espacio reservado para evitar saltos de layout */}
        {/* MEJORA: El mensaje de error ahora tiene un estilo de alerta consistente. */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-sm text-red-700 p-3 rounded-md text-center" role="alert">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-sm text-green-700 p-3 rounded-md" role="alert">
            <p className="font-bold text-center">¡Éxito!</p>
            <p className="text-center">{successMessage}</p>
          </div>
        )}
      </div>
      
      {/* --- Contenedor de todos los campos con espaciado interno --- */}
      <div className="space-y-4">
        {/* Campos de Nombre y Apellido en dos columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text" name="nombre" value={formData.nombre} onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              type="text" name="apellido" value={formData.apellido} onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>

        {/* Campo de Correo con icono */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </span>
            <input
              type="email" name="correo" value={formData.correo} onChange={handleInputChange}
              className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>

        {/* Campo de Usuario con icono */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Usuario</label>
           <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
            <input
              type="text" name="usuario" value={formData.usuario} onChange={handleInputChange}
              className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>

        {/* Campo de Contraseña con icono */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </span>
            <input
              type="password" name="contrasena" value={formData.contrasena} onChange={handleInputChange}
              className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>
      </div>
      
      {/* MEJORA: Botón con spinner de carga y mejores estilos de foco. */}
      <button
        type="submit"
        className="w-full flex justify-center bg-red-600 text-white py-2.5 px-4 rounded-md hover:bg-red-700 font-semibold disabled:bg-red-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        disabled={isLoading || !!successMessage} // Desactivar también si el registro fue exitoso
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Registrando...
          </>
        ) : (
          'Crear Cuenta'
        )}
      </button>
    </form>
  );
}