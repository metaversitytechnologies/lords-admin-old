import React from "react";

interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, onClose }) => {
  if (!show) return null; // hide modal if not active

  return (
    <div
      id="__BVID__19___BV_modal_outer_"
      style={{ position: "absolute", zIndex: 1040 }}
    >
      <div
        id="__BVID__19"
        role="dialog"
        aria-labelledby="__BVID__19___BV_modal_title_"
        aria-describedby="__BVID__19___BV_modal_body_"
        className="modal fade show"
        aria-modal="true"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-sm">
          <span tabIndex={0}></span>
          <div
            id="__BVID__19___BV_modal_content_"
            tabIndex={-1}
            className="modal-content"
          >
            <header id="__BVID__19___BV_modal_header_" className="modal-header">
              <h5 id="__BVID__19___BV_modal_title_" className="modal-title">
                Confirm
              </h5>
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
                    onClick={onClose}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <span tabIndex={0}></span>
        </div>
      </div>

      <div
        id="__BVID__19___BV_modal_backdrop_"
        className="modal-backdrop"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default ConfirmModal;
