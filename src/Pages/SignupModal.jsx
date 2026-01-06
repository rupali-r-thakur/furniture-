import { useState } from "react";
import { signupUser } from "../Services/authService";
import "./login.css"; 

function SignupModal({ closeModal, openLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async (e) => {
    e.preventDefault();

    // reset errors
    setNameError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    // NAME
    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else if (name.length < 3) {
      setNameError("Name must be at least 3 characters");
      isValid = false;
    }

    // EMAIL
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Enter a valid email");
      isValid = false;
    }

    // ✅ PASSWORD
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!isValid) return;

    try {
      await signupUser(name, email, password);

      alert("Signup successful! Please login.");

      closeModal();
      openLogin();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setEmailError("Email already registered");
      } else {
        setEmailError(error.message);
      }
    }
  };

  return (
    <div className="modal_overlay">
      <div className="modal_box">
        <span className="close_btn" onClick={closeModal}>×</span>

        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="error_text">{nameError}</p>}
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
          {passwordError && (
            <p className="error_text">{passwordError}</p>
          )}

          <button type="submit">Sign Up</button>
        </form>

        <p className="switch_text">
          Already have an account?
          <span onClick={openLogin}> Login</span>
        </p>
      </div>
    </div>
  );
}

export default SignupModal;
