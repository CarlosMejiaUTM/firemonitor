import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    try {
      await api.post("/auth/reset-password", { token, nuevaContrasena: password });
      setSuccess("¡Contraseña restablecida correctamente!");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        "No se pudo restablecer la contraseña. Intenta de nuevo."
      );
    }
  };

  if (!token)
    return (
      <div className="p-8 text-center text-red-600">
        Token inválido o faltante.
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ResetPasswordForm
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onSubmit={handleSubmit}
        error={error}
        success={success}
      />
    </div>
  );
}