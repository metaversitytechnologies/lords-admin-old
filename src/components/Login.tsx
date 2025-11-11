import React, { useState } from "react";
import ConfirmModal from "./ConfirmDialog";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const auth = useAuth();
  const navigate = useNavigate();

  const performLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Login failed");
      }

      const data = await res.json();
      // dummyjson returns a token string in `token`
      if (data?.accessToken) {
        const user = {
          id: data.id,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName
        };
        auth.login(data.accessToken, user);
        setShowModal(false);
        navigate("/dashboardhome");
      } else {
        throw new Error("Invalid response from auth server");
      }
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Handler when Confirm modal is accepted
  const handleConfirm = () => {
    performLogin();
  };

  return (
    <div className="login-form">
      <section>
        <div className="text-center logo">
          <img
            style={{ height: "100px" }}
            src="https://d3kb8xz339pq18.cloudfront.net/v12/static/themes/lordsexch.now/admin/logo.png"
            alt="Logo"
          />
        </div>
        <form data-vv-scope="loginForm">
          <div className="m-b-10">
            <div className="login-flash-message">
              <div className="flash__wrapper"></div>
            </div>
          </div>
          <div className="form-group m-b-20">
            <label className="m-b-0" htmlFor="loginid">
              Enter Username:
            </label>
            <input
              id="loginid"
              type="text"
              name="loginid"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Login Id"
              className="form-control"
              aria-required="true"
              aria-invalid={!!error}
            />
            <span className="text-danger error-login">{error}</span>
          </div>
          <div className="form-group m-b-20">
            <label className="m-b-0" htmlFor="password">
              Enter Password:
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="form-control"
              aria-required="true"
              aria-invalid={!!error}
            />
            <span className="text-danger error-login"></span>
          </div>
          <div className="form-group m-b-25">
            <button
              type="button"
              className="btn btn-primary btn-login btn-block"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="recaptchaTerms m-b-20">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
            <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
            apply.
          </div>
          <div className="form-group text-center">
            <div className="best-viewed-label">Best Viewed In:</div>
            <img
              src="https://d3kb8xz339pq18.cloudfront.net/v12/static/images/chrome.png"
              alt="Chrome"
            />
            <img
              style={{ padding: "0 2.5px 0 2.5px" }}
              src="https://d3kb8xz339pq18.cloudfront.net/v12/static/images/firefox.png"
              alt="Firefox"
            />
            <img
              src="https://d3kb8xz339pq18.cloudfront.net/v12/static/images/ie.png"
              alt="IE"
            />
          </div>
        </form>
      </section>
      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Login;
