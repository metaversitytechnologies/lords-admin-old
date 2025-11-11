import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faSignOutAlt,
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  const { isAuthenticated, user, lastLogin, logout } = useAuth();
  const navigate = useNavigate();

  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const displayName =
    user?.username ||
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    "User";
  const formattedNow = now.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
  const formattedTime = now.toLocaleTimeString([], { hour12: false });
  const formattedLastLogin = lastLogin
    ? (() => {
        const date = new Date(
          Math.round(new Date(lastLogin).getTime() / 60000) * 60000
        );

        let formatted = date
          .toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          })
          .replace(",", "");

        formatted = formatted.replace(/\s?[APMapm]{2}$/, "").trim();

        return formatted;
      })()
    : "-";

  return (
    <header className="header">
      <div className="logo-area float-left">
        <div className="logo">
          <a
            href="/dashboardhome"
            aria-current="page"
            className="logo router-link-exact-active router-link-active"
          >
            <img
              src="https://d3kb8xz339pq18.cloudfront.net/v12/static/themes/lordsexch.now/admin/logo.png"
              alt="Logo"
            />
          </a>
        </div>
      </div>

      <div className="clock float-left">
        <span>{formattedNow}</span>
        <span className="time">{formattedTime}</span>
        <span className="clock-timezone-settings dropdown">
          <a
            href="#"
            data-toggle="dropdown"
            className="dropdown-toggle"
            role="button"
          >
            (+05:30
            <FontAwesomeIcon icon={faAngleDown} className="m-l-5" />)
          </a>

          <div className="dropdown-menu">
            <a href="javascript:void(0)" className="dropdown-item">
              System time - (GMT +00:00)
            </a>
            <a href="javascript:void(0)" className="dropdown-item">
              Your computer time - (GMT +05:30)
            </a>
            <a href="javascript:void(0)" className="dropdown-item">
              India Standard time - (GMT +05:30)
            </a>
          </div>
        </span>
      </div>

      <div className="infobar float-right">
        <ul className="linkbar">
          <li>
            <p>Logged in as {displayName}</p>
            <p className="last-login">
              Last logged in : <span>{formattedLastLogin}</span>
            </p>
          </li>

          <li className="dropdown">
            <a
              href="#"
              data-toggle="dropdown"
              className="dropdown-toggle"
              role="button"
            >
              <FontAwesomeIcon icon={faCog} className="m-r-5" />{" "}
              <span>Settings</span>
            </a>
            <div className="dropdown-menu">
              <a href="javascript:void(0)" className="dropdown-item">
                Change Password
              </a>
              <a href="/secureauth" className="dropdown-item">
                Secure Auth
              </a>
            </div>
          </li>

          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="btn text-white p-0"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="m-r-5" />{" "}
              <span>LogOut</span>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
