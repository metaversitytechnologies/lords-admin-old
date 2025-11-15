import React from "react";
import ReusableModal from "./ReusableModal";

interface ConfirmDialogProps {
  show: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  show,
  onClose,
  onConfirm,
}) => {
  const footer = (
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
  );

  return (
    <ReusableModal show={show} handleClose={onClose} title="Confirm" footer={footer}>
      <p>
        Underage gambling is prohibited. Please confirm if you are 18 years old
        and above as of today.
      </p>
    </ReusableModal>
  );
};

export default ConfirmDialog;
