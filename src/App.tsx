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
import { useEffect } from "react";
import FlashMessage from "./components/FlashMessage";

function App() {
  const { logout, flash, setFlash } = useAuth();
  const location = useLocation();
  const showFooter =
    !location.pathname.startsWith("/change-password-success") &&
    location.pathname !== "/login";
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
  return (
    <div className="app-container">
      {flash && (
        <FlashMessage
          message={flash.message}
          type={flash.type}
          onClose={() => setFlash(null)}
        />
      )}
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
