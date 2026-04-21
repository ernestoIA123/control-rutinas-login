import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes("access_token")) {
      setMessage("❌ Enlace inválido o expirado.");
    }
  }, []);

  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      setMessage("❌ Completa todos los campos");
      return;
    }

    if (password.length < 6) {
      setMessage("❌ La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setMessage(`❌ ${error.message}`);
        return;
      }

      setMessage("✅ Contraseña actualizada correctamente");

      setTimeout(() => {
      window.location.href = "https://login.controlderutinas.online/";
      }, 2000);

    } catch (err) {
      setMessage("❌ Error actualizando la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0b0f0c",
      fontFamily: "Arial",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        background: "#151d18",
        padding: "30px",
        borderRadius: "20px",
        color: "#fff",
      }}>
        <h2 style={{ marginBottom: 20 }}>Restablecer contraseña</h2>

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "10px" }}
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "10px" }}
        />

        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "#b7ff31",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Actualizando..." : "Actualizar contraseña"}
        </button>

        {message && (
          <p style={{ marginTop: 15, textAlign: "center" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;