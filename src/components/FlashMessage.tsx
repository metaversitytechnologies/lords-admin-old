import React, { useEffect } from "react";

interface FlashMessageProps {
  message: string | null;
  type: "error" | "success";
  onClose: () => void;
}

const FlashMessage: React.FC<FlashMessageProps> = ({
  message,
  type,
  onClose
}) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className="master-flash-message">
      <div className="flash__wrapper">
        <div
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          className={`${type} flash__message`}
        >
          <div className="flash__message-content">{message}</div>
          <button
            type="button"
            className="flash__close-button"
            onClick={onClose}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashMessage;
