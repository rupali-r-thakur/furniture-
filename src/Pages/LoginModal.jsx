import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/authService";
import "./login.css";

function LoginModal({ closeModal, openSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Field wise errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let isValid = true;

    // EMAIL VALIDATION
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Enter a valid email");
      isValid = false;
    }

    // PASSWORD VALIDATION
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!isValid || loading) return;

    setLoading(true);

    try {
      const data = await loginUser(email, password);

      onLoginSuccess(data);
      closeModal();

      if (data?.role === "admin") {
        navigate("/admin");
      }
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-credential"
      ) {
        setEmailError("Account not found");
      } else if (error.code === "auth/wrong-password") {
        setPasswordError("Incorrect password");
      } else {
        setEmailError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal_overlay">
      <div className="modal_box">
        <span className="close_btn" onClick={closeModal}>×</span>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error_text">{emailError}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error_text">{passwordError}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="switch_text">
          Don't have an account?
          <span onClick={openSignup}> Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
