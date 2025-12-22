import React, { useEffect, useState } from "react";

interface ReusableModalProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "lg" | "xl";
  position?: "center" | "top";
  fullWidth?: boolean;
  maxWidth?: string | number;
  topOffset?: string | number;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  show,
  handleClose,
  title,
  children,
  footer,
  size,
  position = "center",
  fullWidth = false,
  maxWidth,
  topOffset
}) => {
  const [animate, setAnimate] = useState(false);

  // Trigger animation AFTER mount
  useEffect(() => {
    if (show) {
      // allow browser paint first
      setTimeout(() => setAnimate(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setAnimate(false);
      document.body.style.overflow = "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [show]);



  const modalSizeClass = size ? `modal-${size}` : "";
  const modalPositionClass =
    position === "center" ? "modal-dialog-centered" : "";
  const dialogStyle: React.CSSProperties = {};
  if (fullWidth) {
    dialogStyle.maxWidth = "80%";
    dialogStyle.margin = "0 auto";
  } else if (maxWidth) {
    dialogStyle.maxWidth = maxWidth;
    dialogStyle.margin = "0 auto";
  }
  if (position === "top") {
    dialogStyle.marginTop = topOffset ?? "24px";
  }

  if (!show) return null; // only render when needed

  return (
    <>
      {/* Backdrop */}
      <div className={`modal-backdrop fade ${animate ? "show" : ""}`}></div>

      {/* Modal */}
      <div
        className={`modal fade ${animate ? "show" : ""}`}
        style={{ display: "block" }}
        tabIndex={-1}
        onClick={handleClose}
      >
        <div
          className={`modal-dialog ${modalSizeClass} ${modalPositionClass}`}
          style={dialogStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button className="close" onClick={handleClose}>
                <span>&times;</span>
              </button>
            </div>

            <div className="modal-body">{children}</div>

            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReusableModal;
