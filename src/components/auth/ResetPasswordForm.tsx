interface Props {
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string;
  success: string;
}

export default function ResetPasswordForm({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
  error,
  success,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-8 rounded shadow-md w-full max-w-md"
    >
      <h1 className="text-2xl font-bold mb-4">Restablecer Contraseña</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success ? (
        <div className="text-green-600">{success}</div>
      ) : (
        <>
          <label className="block mb-2">Nueva contraseña</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded mb-4"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />
          <label className="block mb-2">Confirmar nueva contraseña</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded mb-4"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Cambiar contraseña
          </button>
        </>
      )}
    </form>
  );
}