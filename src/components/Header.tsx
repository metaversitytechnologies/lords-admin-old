import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
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
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined);

  // Dropdown states
  const [tzOpen, setTzOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Auto-close dropdowns when clicking outside
  useEffect(() => {
    const closeAll = () => {
      setTzOpen(false);
      setSettingsOpen(false);
    };

    window.addEventListener("click", closeAll);
    return () => window.removeEventListener("click", closeAll);
  }, []);

  // Update clock every second
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

  const getTimezoneOffset = (tz: string | undefined) => {
    if (tz === "UTC") return "+00:00";
    if (tz === "Asia/Kolkata") return "+05:30";

    if (tz === undefined) {
      const offset = -new Date().getTimezoneOffset();
      const hours = Math.floor(offset / 60);
      const minutes = offset % 60;
      return `${offset >= 0 ? "+" : "-"}${String(Math.abs(hours)).padStart(
        2,
        "0"
      )}:${String(Math.abs(minutes)).padStart(2, "0")}`;
    }
    return "";
  };

  const formattedNow = now.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: timeZone
  });

  const formattedTime = now.toLocaleTimeString([], {
    hour12: false,
    timeZone: timeZone
  });

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
          <Link
            to="/dashboardhome"
            aria-current="page"
            className="logo router-link-exact-active router-link-active"
          >
            <img
              src="https://d3kb8xz339pq18.cloudfront.net/v12/static/themes/lordsexch.now/admin/logo.png"
              alt="Logo"
            />
          </Link>
        </div>
      </div>

      {/* Clock + Timezone Dropdown */}
      <div className="clock float-left">
        <span style={{ marginRight: "3px" }}>{formattedNow}</span>
        <span className="time">{formattedTime}</span>

        <div
          className="clock-timezone-settings dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href="#"
            className="dropdown-toggle"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setTzOpen(!tzOpen);
              setSettingsOpen(false);
            }}
          >
            ({getTimezoneOffset(timeZone)}
            <FontAwesomeIcon icon={faAngleDown} className="m-l-5" />)
          </a>

          {tzOpen && (
            <div className="dropdown-menu show">
              <a
                href="#"
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  setTimeZone("UTC");
                  setTzOpen(false);
                }}
              >
                System time - (GMT +00:00)
              </a>

              <a
                href="#"
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  setTimeZone(undefined);
                  setTzOpen(false);
                }}
              >
                Your computer time - ({"GMT " + getTimezoneOffset(undefined)})
              </a>

              <a
                href="#"
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  setTimeZone("Asia/Kolkata");
                  setTzOpen(false);
                }}
              >
                India Standard time - (GMT +05:30)
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Right side info bar */}
      <div className="infobar float-right">
        <ul className="linkbar">
          <li>
            <p>Logged in as {displayName}</p>
            <p className="last-login">
              Last logged in : <span>{formattedLastLogin}</span>
            </p>
          </li>

          {/* ⚙️ Settings Dropdown */}
          <li className="dropdown" onClick={(e) => e.stopPropagation()}>
            <a
              href="#"
              className="dropdown-toggle"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                setSettingsOpen(!settingsOpen);
                setTzOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faCog} className="m-r-5" />{" "}
              <span>Settings</span>
            </a>

            {settingsOpen && (
              <div className="dropdown-menu show">
                <a href="#" className="dropdown-item">
                  Change Password
                </a>
                <a href="/secureauth" className="dropdown-item">
                  Secure Auth
                </a>
              </div>
            )}
          </li>

          {/* Logout */}
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
