import React from "react";
import ReactDOM from "react-dom";

interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  onClose,
  onConfirm
}) => {
  if (!show) return null;

  // The actual modal content
  const modalContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999
      }}
    >
      {/* Backdrop */}
      <div
        className="modal-backdrop"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.87)",
          zIndex: 9998
        }}
        onClick={onClose}
      ></div>

      {/* Modal dialog */}
      <div
        role="dialog"
        className="modal fade show"
        aria-modal="true"
        style={{
          display: "block",
          zIndex: 10000
        }}
      >
        <div className="modal-dialog modal-sm">
          <div tabIndex={-1} className="modal-content">
            <header className="modal-header">
              <h5 className="modal-title">Confirm</h5>
            </header>

            <div id="__BVID__19___BV_modal_body_" className="modal-body">
              <p>
                Underage gambling is prohibited. Please confirm if you are 18
                years old and above as of today.
              </p>

              <div className="row form-group m-b-5 m-b-0">
                <div className="col-md-12 text-right">
                  <button className="btn btn-danger btn-bs" onClick={onClose}>
                    Exit
                  </button>{" "}
                  <button
                    className="btn btn-success lgn-alrt btn-bs"
                    onClick={() => {
                      if (onConfirm) onConfirm();
                      onClose();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ✅ Render modal outside the main app hierarchy
  return ReactDOM.createPortal(modalContent, document.body);
};

export default ConfirmModal;
