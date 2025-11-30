import React, { useState } from "react";

const SecureAuth: React.FC = () => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <section className="apl-section">
      <div className="security-auth">
        <div className="header">
          <h1>Secure Auth Varification</h1>
        </div>
        <div className="text-center">
          <b>Secure Auth Verification Status:</b>
          <span className="badge badge-danger">Disabled</span>
        </div>
        <div className="mt-2 text-center">
          Please select below option to enable secure auth verification
        </div>
        <div className="casino-report-tabs mt-3">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "mobile" ? "active" : ""}`}
                onClick={() => setActiveTab("mobile")}
              >
                Eanable Using Mobile App
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "telegram" ? "active" : ""
                }`}
                onClick={() => setActiveTab("telegram")}
              >
                Enable Using Telegram
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          {activeTab === "mobile" && (
            <div id="mobile-app" className="tab-pane mobile-app active">
              <div className="text-center">
                <div className="mt-3">
                  Please enter below auth code in your 'Secure Auth Verification
                  App'.
                </div>
                <div className="mt-3">
                  <div className="verify-code">799939</div>
                </div>
                <div className="mt-3">
                  <b>
                    If you haven't downloaded,
                    <br />
                    please download 'Secure Auth Verification App' from below
                    link.
                  </b>
                </div>
                <div className="mt-3">
                  Using this app you will receive auth code during login
                  authentication
                </div>
                <div className="mt-3">
                  <a href="https://d3kb8xz339pq18.cloudfront.net/v1/static/authapp/SecureAuthApp-1.7.apk">
                    <button className="btn btn-primary">
                      <i className="fab fa-android"></i>
                      <span>Download on the Android</span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          )}
          {activeTab === "telegram" && (
            <div id="telegram" className="tab-pane telegram active">
              <div className="text-center">
                <b>Please enter your login password to continue</b>
                <div className="form-group mt-3 secure-password">
                  <input type="password" className="form-control" />
                  <button className="btn btn-primary ml-2 vt">
                    Get Connection ID
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SecureAuth;
