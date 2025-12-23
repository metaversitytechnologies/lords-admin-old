import { useEffect, useState } from "react";
import { getTransferStatementLord } from "../api/user";
import { CSVLink } from "react-csv";

interface IStatementRecord {
  time: string;
  payerPayee: string;
  amount: number;
}

interface IApiStatementEntry {
  date: string;
  dataList: IStatementRecord[];
}

const TransferStatement = ({ childId }) => {
  const [statementData, setStatementData] = useState<IApiStatementEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userData = localStorage.getItem("user");
  const userId = userData ? JSON.parse(userData).userId : null;

  useEffect(() => {
    const fetchStatementData = async () => {
      try {
        setLoading(true);
        const response = await getTransferStatementLord({
          userId: childId || userId
        });
        if (response.data) {
          setStatementData(response.data);
        }
        setError(null);
      } catch (err) {
        setError("Failed to fetch transfer statement.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatementData();
  }, []);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeString: string) => {
    const [hourStr, minuteStr = "00", secondStr] = timeString.split(":");
    const hour = Number(hourStr);
    if (Number.isNaN(hour)) return timeString;

    const hours12 = ((hour + 11) % 12) + 1;
    const suffix = hour >= 12 ? "PM" : "AM";
    const seconds = secondStr ? `:${secondStr}` : "";
    return `${hours12}:${minuteStr}${seconds} ${suffix}`;
  };

  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <h1>Transfer Statement</h1>
        <div className="button-options">
          <div id="export_1762852017985">
            <CSVLink
              data={statementData}
              filename="transfer-statement.csv"
              className="btn btn-secondary m-l-5"
            >
              Download CSV
            </CSVLink>
          </div>
        </div>
      </div>

      <div className="table-responsive transfer-statement">
        <table className="table">
          <thead>
            <tr>
              <th className="text-left">Date</th>
              <th className="text-left">Payer/Payee</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={3} className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          ) : error ? (
            <tbody>
              <tr>
                <td colSpan={3} className="text-center text-danger">
                  {error}
                </td>
              </tr>
            </tbody>
          ) : statementData.length > 0 ? (
            statementData.map((entry, index) => (
              <tbody key={index}>
                {/* Date Row */}
                <tr className="group">
                  <td colSpan={3} className="transferDate">
                    <span>{formatDate(entry.date)}</span>
                  </td>
                </tr>

                {/* Records for that date */}
                {entry.dataList.map((record, i) => (
                  <tr key={i}>
                    <td className="transferTime">
                      <span>{formatTime(record.time)}</span>
                    </td>
                    <td>
                      <span>{record.payerPayee}</span>
                    </td>
                    <td className="text-right">
                      <span
                        className={`positive ${
                          record.amount < 0 ? "negative" : "positive"
                        }`}
                      >
                        {record.amount < 0
                          ? record.amount.toFixed(2)
                          : record.amount.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td colSpan={3} className="text-center">
                  No records found.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default TransferStatement;
