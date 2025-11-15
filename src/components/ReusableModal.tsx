import React from "react";
import { Modal } from "react-bootstrap";

interface ReusableModalProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  show,
  handleClose,
  title,
  children,
  footer,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
  );
};

export default ReusableModal;
