import { useMemo, useState } from "react";

type Mode = "register" | "login";

function App() {
  const [mode, setMode] = useState<Mode>("register");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalMessage, setGeneralMessage] = useState("");

  const colors = {
    bg: "#0b0f0c",
    bgSoft: "#111713",
    card: "#151d18",
    cardBorder: "#263128",
    text: "#f4fff1",
    muted: "#9fb09f",
    primary: "#b7ff31",
    primaryDark: "#8fd11f",
    secondary: "#22c55e",
    secondaryDark: "#16a34a",
    accent: "#3b82f6",
    accentDark: "#2563eb",
    danger: "#ef4444",
    inputBg: "#0f1511",
    inputBorder: "#334136",
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return "El correo es obligatorio.";
    if (!emailRegex.test(value)) return "Ingresa un correo válido.";
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value.trim()) return "La contraseña es obligatoria.";
    if (value.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return "";
  };

  const validateConfirmPassword = (pass: string, confirm: string) => {
    if (mode !== "register") return "";
    if (!confirm.trim()) return "Confirma tu contraseña.";
    if (pass !== confirm) return "Las contraseñas no coinciden.";
    return "";
  };

  const isRegisterFormValid = useMemo(() => {
    return (
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      validateEmail(email) === "" &&
      validatePassword(password) === "" &&
      validateConfirmPassword(password, confirmPassword) === ""
    );
  }, [email, password, confirmPassword]);

  const resetMessages = () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setGeneralMessage("");
  };

  const switchToRegister = () => {
    setMode("register");
    resetMessages();
  };

  const switchToLogin = () => {
    setMode("login");
    resetMessages();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEmailError = validateEmail(email);
    const newPasswordError = validatePassword(password);
    const newConfirmPasswordError = validateConfirmPassword(password, confirmPassword);

    setEmailError(newEmailError);
    setPasswordError(newPasswordError);
    setConfirmPasswordError(newConfirmPasswordError);
    setGeneralMessage("");

    if (newEmailError || newPasswordError || newConfirmPasswordError) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setGeneralMessage("✅ Cuenta creada correctamente (modo prueba)");
    }, 900);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEmailError = validateEmail(email);
    const newPasswordError = validatePassword(password);

    setEmailError(newEmailError);
    setPasswordError(newPasswordError);
    setConfirmPasswordError("");
    setGeneralMessage("");

    if (newEmailError || newPasswordError) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setGeneralMessage("✅ Acceso correcto (modo prueba)");
    }, 900);
  };

  const handleResetPassword = () => {
    if (!email.trim()) {
      setGeneralMessage("❌ Ingresa tu correo para recuperar tu contraseña");
      return;
    }

    setGeneralMessage("✅ Enlace enviado (modo prueba)");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        background: "linear-gradient(135deg, #090d0a 0%, #111713 45%, #0b0f0c 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "linear-gradient(180deg, #151d18 0%, #111713 100%)",
          borderRadius: "24px",
          padding: "34px 28px",
          boxShadow: "0 20px 55px rgba(0,0,0,0.45)",
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "26px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: "999px",
              background: "rgba(183,255,49,0.12)",
              border: "1px solid rgba(183,255,49,0.22)",
              color: colors.primary,
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "1px",
              marginBottom: "14px",
            }}
          >
            ACCESO FITNESS
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              color: colors.primary,
              fontWeight: 800,
              letterSpacing: "0.3px",
            }}
          >
            APP GYM
          </h1>

          <p
            style={{
              marginTop: "10px",
              marginBottom: 0,
              color: colors.muted,
              fontSize: "15px",
              lineHeight: 1.5,
            }}
          >
            {mode === "register"
              ? "Crea tu cuenta para acceder a tus rutinas y entrenamientos."
              : "Inicia sesión para entrar a tu panel de entrenamiento."}
          </p>
        </div>

        <form onSubmit={mode === "register" ? handleRegister : handleLogin} noValidate>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: colors.text,
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              Correo electrónico
            </label>

            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                setEmailError(validateEmail(value));
                setGeneralMessage("");
              }}
              style={{
                width: "100%",
                padding: "14px 14px",
                borderRadius: "14px",
                border: emailError
                  ? `1px solid ${colors.danger}`
                  : `1px solid ${colors.inputBorder}`,
                outline: "none",
                fontSize: "15px",
                boxSizing: "border-box",
                background: colors.inputBg,
                color: colors.text,
              }}
            />

            {emailError && (
              <p
                style={{
                  color: colors.danger,
                  fontSize: "13px",
                  marginTop: "7px",
                  marginBottom: 0,
                }}
              >
                {emailError}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: colors.text,
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              {mode === "register" ? "Crear contraseña" : "Contraseña"}
            </label>

            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder={
                  mode === "register" ? "Crea tu contraseña" : "Ingresa tu contraseña"
                }
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  setPasswordError(validatePassword(value));

                  if (mode === "register") {
                    setConfirmPasswordError(
                      validateConfirmPassword(value, confirmPassword)
                    );
                  }

                  setGeneralMessage("");
                }}
                style={{
                  width: "100%",
                  padding: "14px 78px 14px 14px",
                  borderRadius: "14px",
                  border: passwordError
                    ? `1px solid ${colors.danger}`
                    : `1px solid ${colors.inputBorder}`,
                  outline: "none",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  background: colors.inputBg,
                  color: colors.text,
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: colors.primary,
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>

            {passwordError && (
              <p
                style={{
                  color: colors.danger,
                  fontSize: "13px",
                  marginTop: "7px",
                  marginBottom: 0,
                }}
              >
                {passwordError}
              </p>
            )}
          </div>

          {mode === "register" && (
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: colors.text,
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                Confirmar contraseña
              </label>

              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirma tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    setConfirmPassword(value);
                    setConfirmPasswordError(validateConfirmPassword(password, value));
                    setGeneralMessage("");
                  }}
                  style={{
                    width: "100%",
                    padding: "14px 78px 14px 14px",
                    borderRadius: "14px",
                    border: confirmPasswordError
                      ? `1px solid ${colors.danger}`
                      : `1px solid ${colors.inputBorder}`,
                    outline: "none",
                    fontSize: "15px",
                    boxSizing: "border-box",
                    background: colors.inputBg,
                    color: colors.text,
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: colors.primary,
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                >
                  {showConfirmPassword ? "Ocultar" : "Ver"}
                </button>
              </div>

              {confirmPasswordError && (
                <p
                  style={{
                    color: colors.danger,
                    fontSize: "13px",
                    marginTop: "7px",
                    marginBottom: 0,
                  }}
                >
                  {confirmPasswordError}
                </p>
              )}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {mode === "register" ? (
              <>
                <button
                  type="submit"
                  disabled={loading || !isRegisterFormValid}
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "15px",
                    border: "none",
                    background:
                      loading || !isRegisterFormValid
                        ? "#5b654f"
                        : `linear-gradient(180deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`,
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: 800,
                    cursor: loading || !isRegisterFormValid ? "not-allowed" : "pointer",
                    boxShadow:
                      loading || !isRegisterFormValid
                        ? "none"
                        : "0 10px 24px rgba(34,197,94,0.28)",
                  }}
                >
                  {loading ? "Procesando..." : "CREAR CUENTA"}
                </button>

                <button
                  type="button"
                  onClick={switchToLogin}
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "15px",
                    border: "none",
                    background: `linear-gradient(180deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 10px 24px rgba(59,130,246,0.28)",
                  }}
                >
                  YA TENGO UNA CUENTA
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "15px",
                    border: "none",
                    background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                    color: "#111111",
                    fontSize: "16px",
                    fontWeight: 900,
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: "0 10px 24px rgba(183,255,49,0.22)",
                  }}
                >
                  {loading ? "Procesando..." : "ACCEDER"}
                </button>

                <button
                  type="button"
                  onClick={switchToRegister}
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "15px",
                    border: "none",
                    background: `linear-gradient(180deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`,
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 10px 24px rgba(34,197,94,0.28)",
                  }}
                >
                  REGISTRARME
                </button>

                <p
                  onClick={handleResetPassword}
                  style={{
                    marginTop: "2px",
                    color: colors.primary,
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: 700,
                    textAlign: "center",
                    textDecoration: "underline",
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </p>
              </>
            )}
          </div>

          {generalMessage && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                borderRadius: "12px",
                background: generalMessage.includes("❌")
                  ? "rgba(239,68,68,0.12)"
                  : "rgba(59,130,246,0.12)",
                color: generalMessage.includes("❌") ? "#f87171" : "#93c5fd",
                fontSize: "14px",
                textAlign: "center",
                border: generalMessage.includes("❌")
                  ? "1px solid rgba(239,68,68,0.24)"
                  : "1px solid rgba(59,130,246,0.24)",
              }}
            >
              {generalMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;