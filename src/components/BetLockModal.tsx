import React from "react";
import ReusableModal from "./ReusableModal";

export interface BetLockUser {
  name: string;
  checked: boolean;
}

interface BetLockModalProps {
  show: boolean;
  onClose: () => void;
  users: BetLockUser[];
  onChange: (nextUsers: BetLockUser[]) => void;
  onSubmit?: () => void;
  title?: string;
}

const BetLockModal: React.FC<BetLockModalProps> = ({
  show,
  onClose,
  users,
  onChange,
  onSubmit,
  title = "Bet Lock"
}) => {
  const areAllChecked = users.every((u) => u.checked);

  const toggleAll = (checked: boolean) => {
    onChange(users.map((u) => ({ ...u, checked })));
  };

  const toggleUser = (index: number, checked: boolean) => {
    onChange(
      users.map((u, idx) => (idx === index ? { ...u, checked } : u))
    );
  };

  return (
    <ReusableModal show={show} handleClose={onClose} title={title} size="lg">
      <div className="d-flex justify-content-end align-items-center mb-2">
        <label
          className="mb-0 mr-2 d-flex align-items-center"
          style={{ gap: "6px" }}
        >
          <input
            type="checkbox"
            checked={areAllChecked}
            onChange={(e) => toggleAll(e.target.checked)}
          />
          All Users
        </label>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered mb-0">
          <thead>
            <tr>
              <th style={{ width: "70px" }}>Sr No.</th>
              <th>User Name</th>
              <th style={{ width: "100px" }} className="text-center">
                Checked
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.name}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={user.checked}
                    onChange={(e) => toggleUser(idx, e.target.checked)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReusableModal>
  );
};

export default BetLockModal;
