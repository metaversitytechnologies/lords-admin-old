import type { CSSProperties } from "react";

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background:
    "radial-gradient(circle at 20% 20%, rgba(209, 173, 52, 0.12), transparent 26%), radial-gradient(circle at 78% 24%, rgba(209, 173, 52, 0.1), transparent 26%), linear-gradient(135deg, var(--primary-dark), var(--primary-color))",
  color: "var(--text-light)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "2rem",
  gap: "1rem",
  zIndex: 9999,
  backdropFilter: "blur(6px)",
};

const cardStyle: CSSProperties = {
  background: "rgba(0, 0, 0, 0.35)",
  border: "1px solid rgba(209, 173, 52, 0.35)",
  borderRadius: "16px",
  padding: "2rem 2.5rem",
  maxWidth: "520px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
};

const titleStyle: CSSProperties = {
  fontSize: "1.6rem",
  fontWeight: 700,
  letterSpacing: "0.5px",
};

const textStyle: CSSProperties = {
  fontSize: "1rem",
  lineHeight: 1.6,
  color: "rgba(255, 255, 255, 0.9)",
};

const badgeStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.5rem 0.9rem",
  background: "rgba(209, 173, 52, 0.16)",
  color: "var(--text-light)",
  borderRadius: "999px",
  border: "1px solid rgba(209, 173, 52, 0.5)",
  fontWeight: 800,
  letterSpacing: "0.3px",
};

function DevtoolsLock() {
  return (
    <div style={overlayStyle} role="alert" aria-live="assertive">
      <div style={cardStyle}>
        <div style={badgeStyle}>Security Lock</div>
        <div style={titleStyle}>Developer tools detected</div>
        <p style={textStyle}>
          For security reasons the site is locked while the browser developer
          console is open. Please close any inspection tools to continue.
        </p>
      </div>
    </div>
  );
}

export default DevtoolsLock;
