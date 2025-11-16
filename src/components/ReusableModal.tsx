import React, { useEffect, useState } from "react";

interface ReusableModalProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "lg" | "xl";
  position?: "center" | "top";
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  show,
  handleClose,
  title,
  children,
  footer,
  size,
  position = "center"
}) => {
  const [animate, setAnimate] = useState(false);

  // Trigger animation AFTER mount
  useEffect(() => {
    if (show) {
      // allow browser paint first
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
    }
  }, [show]);

  const modalSizeClass = size ? `modal-${size}` : "";
  const modalPositionClass =
    position === "center" ? "modal-dialog-centered" : "";

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
