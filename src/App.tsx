import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "./App.css";
import "./styles/styles.css";
import "./styles/theme.css";
import "./styles/custom.css";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { useAuth } from "./context/AuthContext";
import { useEffect, useMemo, useState } from "react";
import FlashMessage from "./components/FlashMessage";
import DevtoolsLock from "./components/DevtoolsLock";

function App() {
  const { logout, flash, setFlash, isAuthenticated } = useAuth();
  const location = useLocation();
  const devtoolsLockEnabled = useMemo(
    () => import.meta.env.VITE_ENABLE_DEVTOOLS_LOCK !== "false",
    []
  );
  const [isDevtoolsOpen, setIsDevtoolsOpen] = useState(false);
  const hideChrome =
    location.pathname === "/login" ||
    location.pathname.startsWith("/change-password-success");
  const showFooter = !hideChrome;

  useEffect(() => {
    const isCpSuccess = location.pathname.startsWith(
      "/change-password-success"
    );
    document.body.classList.toggle("cp-success-page", isCpSuccess);
    return () => {
      document.body.classList.remove("cp-success-page");
    };
  }, [location.pathname]);
  useEffect(() => {
    const handleLogout = (event: Event) => {
      const customEvent = event as CustomEvent;
      logout(customEvent.detail.message);
    };

    window.addEventListener("logout", handleLogout);

    return () => {
      window.removeEventListener("logout", handleLogout);
    };
  }, [logout]);
  useEffect(() => {
    if (!devtoolsLockEnabled) return;

    const threshold = 160;
    const detectDevtools = () => {
      const widthGap = Math.abs(window.outerWidth - window.innerWidth);
      const heightGap = Math.abs(window.outerHeight - window.innerHeight);
      const open = widthGap > threshold || heightGap > threshold;
      setIsDevtoolsOpen(open);
      document.body.style.overflow = open ? "hidden" : "";
    };

    detectDevtools();
    const interval = window.setInterval(detectDevtools, 1000);
    window.addEventListener("resize", detectDevtools);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize", detectDevtools);
      document.body.style.overflow = "";
    };
  }, [devtoolsLockEnabled]);
  return (
    <div className="app-container">
      {devtoolsLockEnabled && isDevtoolsOpen && <DevtoolsLock />}
      {flash && (
        <FlashMessage
          message={flash.message}
          type={flash.type}
          onClose={() => setFlash(null)}
        />
      )}
      { <Header />}
      <main className="main-content">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
