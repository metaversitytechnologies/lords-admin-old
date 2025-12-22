import React from "react";
import ReusableModal from "./ReusableModal";

interface UserBookModalProps {
  show: boolean;
  onClose: () => void;
  selectionInfo: { id: any; name: string }[];
  rawData: {
    selectionId1?: any;
    selectionId2?: any;
    selectionId3?: any;
    dataList?: Array<{
      userId?: string;
      userName?: string;
      username?: string;
      name?: string;
      pnl1?: number;
      pnl2?: number;
      pnl3?: number;
    }>;
  };
  title?: string;
}

const UserBookModal: React.FC<UserBookModalProps> = ({
  show,
  onClose,
  selectionInfo,
  rawData,
  title = "User Book"
}) => {
  const headers = selectionInfo.map((s) => s.name);

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

  const buildTableRowsFromRaw = () => {
    if (!rawData || selectionInfo.length === 0) return [];

    const hasSelectionIds = [
      rawData?.selectionId1,
      rawData?.selectionId2,
      rawData?.selectionId3
    ].some((id) => id !== undefined && id !== null);
    if (!hasSelectionIds || !Array.isArray(rawData?.dataList)) return [];

    const idToKey = new Map<any, string>();
    if (rawData?.selectionId1 !== undefined && rawData?.selectionId1 !== null)
      idToKey.set(rawData.selectionId1, "pnl1");
    if (rawData?.selectionId2 !== undefined && rawData?.selectionId2 !== null)
      idToKey.set(rawData.selectionId2, "pnl2");
    if (rawData?.selectionId3 !== undefined && rawData?.selectionId3 !== null)
      idToKey.set(rawData.selectionId3, "pnl3");

    const rows =
      rawData?.dataList
        ?.map((row: any) => {
          const userName =
            row?.userId || row?.userName || row?.username || row?.name;
          if (!userName) return null;
          const values = selectionInfo.map((sel, idx) => {
            const key = idToKey.get(sel.id) || `pnl${idx + 1}`;
            const value = row?.[key];
            const numericValue = Number(value);
            return Number.isNaN(numericValue) ? value ?? "-" : numericValue;
          });
          return { userName, values };
        })
        .filter(Boolean) || [];

    return rows;
  };

  const tableRows = buildTableRowsFromRaw();

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
              {headers.map((item, idx) => (
                <th key={idx} className="text-center">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, idx) => (
              <tr key={`${row.userName}-${idx}`}>
                <td>{row.userName}</td>
                {row.values.map((value, vIdx) => {
                  const { displayValue, color } = renderPnlCell(value);
                  return (
                    <td key={vIdx} className="text-center" style={{ color }}>
                      {displayValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReusableModal>
  );
};

export default UserBookModal;
