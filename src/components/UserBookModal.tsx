import React, { useEffect, useState } from "react";
import ReusableModal from "./ReusableModal";

export interface UserBookSelection {
  name: string;
  pnl: number | string;
}

interface UserBookModalProps {
  show: boolean;
  onClose: () => void;
  selections: UserBookSelection[];
  title?: string;
  parentLabel?: string;
  childLabel?: string;
}

const UserBookModal: React.FC<UserBookModalProps> = ({
  show,
  onClose,
  selections,
  title = "User Book",
  parentLabel = "capetown",
  childLabel = "capetown2"
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!show) setIsExpanded(false);
  }, [show]);

  const renderPnlCell = (value: number | string, invert?: boolean) => {
    const pnlNumber = Number(value);
    const isNumber = !Number.isNaN(pnlNumber);
    const displayValue = invert && isNumber ? -pnlNumber : value;
    const numericDisplay = Number(displayValue);
    const color =
      isNumber && !Number.isNaN(numericDisplay)
        ? numericDisplay >= 0
          ? "green"
          : "red"
        : "inherit";
    return { displayValue, color };
  };

  return (
    <ReusableModal
      show={show}
      handleClose={onClose}
      title={title}
      fullWidth
    >
      <div className="table-responsive">
        <table className="table table-bordered mb-0">
          <thead>
            <tr>
              <th>User Name</th>
              {selections.map((item, idx) => (
                <th key={idx} className="text-center">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                [{isExpanded ? "-" : "+"}] {parentLabel}
              </td>
              {selections.map((item, idx) => {
                const { displayValue, color } = renderPnlCell(item.pnl);
                return (
                  <td key={idx} className="text-center" style={{ color }}>
                    {displayValue}
                  </td>
                );
              })}
            </tr>
            {isExpanded && (
              <tr>
                <td style={{ paddingLeft: "20px" }}>{childLabel}</td>
                {selections.map((item, idx) => {
                  const { displayValue, color } = renderPnlCell(item.pnl, true);
                  return (
                    <td key={idx} className="text-center" style={{ color }}>
                      {displayValue}
                    </td>
                  );
                })}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ReusableModal>
  );
};

export default UserBookModal;
