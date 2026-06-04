import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API = process.env.REACT_APP_API_URL; // http://localhost:5000/api

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isLogin) {
        // CONNEXION
        const res = await axios.post(`${API}/auth/login`, {
          email: form.email,
          password: form.password,
        });
        login(res.data.user, res.data.token);
        navigate(res.data.user.role === "admin" ? "/admin" : "/espace-client");
      } else {
        // INSCRIPTION
        await axios.post(`${API}/auth/register`, {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        setError("");
        alert("Compte créé ! Vous pouvez vous connecter.");
        setIsLogin(true);
        setForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Erreur serveur. Vérifie que le backend tourne.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (mode) => {
    setIsLogin(mode);
    setError("");
    setForm({ name: "", email: "", password: "" });
  };

  return (
  <div className="login-page">
    <div className="login-card">

      {/* TITLE */}
      <div className="login-logo">
        <h1>Coffee Arts Paris</h1>
      </div>

      {/* TABS */}
      <div className="auth-tabs">
        <button
          className={isLogin ? "active" : ""}
          onClick={() => switchMode(true)}
          type="button"
        >
          Connexion
        </button>

        <button
          className={!isLogin ? "active" : ""}
          onClick={() => switchMode(false)}
          type="button"
        >
          Inscription
        </button>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="auth-form">

        {!isLogin && (
          <input
            type="text"
            placeholder="Votre nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        )}

        <input
          type="email"
          placeholder="votre@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button className="primary-btn" disabled={loading}>
          {loading ? "Chargement..." : isLogin ? "Se connecter" : "S'inscrire"}
        </button>

      </form>

      {/* DIVIDER */}
      <div className="divider">
        <span>OU</span>
      </div>

      {/* GOOGLE */}
      <button className="google-btn">
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="google"
        />
        Continuer avec Google
      </button>

      {/* FOOTER */}
      <p className="switch-text">
        {isLogin ? (
          <>
            Pas encore de compte ?{" "}
            <span onClick={() => switchMode(false)}>S'inscrire</span>
          </>
        ) : (
          <>
            Déjà un compte ?{" "}
            <span onClick={() => switchMode(true)}>Se connecter</span>
          </>
        )}
      </p>

    </div>
  </div>
);
}