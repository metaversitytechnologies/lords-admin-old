import React, { useState } from "react";
import ConfirmModal from "./ConfirmDialog";

const Login: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
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
            <label className="m-b-0">Enter Username:</label>
            <input
              type="text"
              name="loginid"
              placeholder="Enter Login Id"
              className="form-control"
              aria-required="true"
              aria-invalid="false"
            />
            <span className="text-danger error-login"></span>
          </div>
          <div className="form-group m-b-20">
            <label className="m-b-0">Enter Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="form-control"
              aria-required="true"
              aria-invalid="false"
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
              Login
            </button>
          </div>
          <div className="recaptchaTerms m-b-20">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
            <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
            apply.
          </div>
          <div className="form-group text-center">
            <label>Best Viewed In:</label>
            <img src="https://d3kb8xz339pq18.cloudfront.net/v12/static/images/chrome.png" />
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
      <ConfirmModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Login;
