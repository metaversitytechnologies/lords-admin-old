import React, { useEffect, useState } from "react";
import ReusableModal from "./ReusableModal";
import { getAdminMessage, setAdminMessage } from "../api/message";

type AdminMessageModalProps = {
  show: boolean;
  onClose: () => void;
};

const AdminMessageModal: React.FC<AdminMessageModalProps> = ({
  show,
  onClose
}) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!show) return;
    const fetchMessage = async () => {
      setLoading(true);
      try {
        const res = await getAdminMessage();
        setMessage(res?.message ?? res?.data?.message ?? "");
      } catch (err) {
        console.error("Failed to fetch admin message", err);
        setMessage("");
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      await setAdminMessage({ message });
      onClose();
    } catch (err) {
      console.error("Failed to save admin message", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ReusableModal
      show={show}
      handleClose={onClose}
      title="Set Message"
      maxWidth="640px"
      position="top"
      topOffset="20px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="adminMessage">Message</label>
          <textarea
            id="adminMessage"
            className="form-control"
            rows={10}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading || saving}
            style={{ minHeight: "220px" }}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary m-r-10"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || saving}
          >
            {saving ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </ReusableModal>
  );
};

export default AdminMessageModal;
