import React, { useState } from "react";
import ConfirmModal from "./ConfirmDialog";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginApi } from "../api/auth";

type LoginFormInputs = {
  loginid: string;
  password: string;
};

const Login: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const auth = useAuth();
  const navigate = useNavigate();

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<LoginFormInputs>();

  const performLogin = async () => {
    const { loginid, password } = getValues();
    setLoading(true);

    try {
      const data = await loginApi(loginid, password);

      if (data?.token) {
        let user;
        if (data.passwordtype === 'old') {
          user = {
            // From API response body
            userId: data.userId,
            username: data.username,
            userType: data.userType,
            passwordtype: data.passwordtype,
            partnership: data.partnership,
            userTypeInfo: data.userTypeInfo,
            exp: 0
          };
        } else {
          const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
          user = {
            // From JWT Token
            exp: tokenPayload.exp,
            // From API response body
            userId: data.userId,
            username: data.username,
            userType: data.userType,
            passwordtype: data.passwordtype,
            partnership: data.partnership,
            userTypeInfo: data.userTypeInfo
          };
        }
        auth.login(data.token, user);
        setShowModal(false);
        navigate('/dashboardhome');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error: any) {
      // setErrorMessage(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Show confirmation modal only if form is valid
  const openConfirmModal = () => {
    setErrorMessage(null);
    const { loginid, password } = getValues();
    if (!loginid || !password) return; // HOOK-FORM already shows messages
    setShowModal(true);
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

        {/* IMPORTANT: handleSubmit REQUIRED for RHF */}
        <form
          onSubmit={handleSubmit(openConfirmModal)}
          data-vv-scope="loginForm"
        >
          <div className="m-b-10">
            <div className="login-flash-message">
              <div className="flash__wrapper">
                {errorMessage && (
                  <div
                    role="alert"
                    aria-live="polite"
                    aria-atomic="true"
                    className="error flash__message"
                  >
                    <div className="flash__message-content">{errorMessage}</div>
                    <button
                      type="button"
                      className="flash__close-button"
                      onClick={() => setErrorMessage(null)}
                    >
                      x
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="form-group m-b-20">
            <label className="m-b-0" htmlFor="loginid">
              Enter Username:
            </label>
            <input
              id="loginid"
              type="text"
              {...register("loginid", {
                required: "The loginid field is required"
              })}
              placeholder="Enter Login Id"
              className="form-control"
            />
            <span className="text-danger error-login">
              {errors.loginid?.message}
            </span>
          </div>

          {/* Password */}
          <div className="form-group m-b-20">
            <label className="m-b-0" htmlFor="password">
              Enter Password:
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password field is required."
              })}
              placeholder="Enter password"
              className="form-control"
            />
            <span className="text-danger error-login">
              {errors.password?.message}
            </span>
          </div>

          {/* Login button */}
          <div className="form-group m-b-25">
            <button
              type="submit"
              className="btn btn-primary btn-login btn-block"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Footer Text */}
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
        onConfirm={performLogin}
      />
    </div>
  );
};

export default Login;
