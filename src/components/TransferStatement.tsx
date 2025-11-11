const TransferStatement = () => {
  const statementData = [
    {
      date: "02/11/2025",
      records: [{ time: "12:38:56 PM", payee: "Upline", amount: -8.0 }]
    },
    {
      date: "29/10/2025",
      records: [
        { time: "07:59:03 PM", payee: "clishak", amount: 100.0 },
        { time: "07:43:51 PM", payee: "Upline", amount: 100.0 }
      ]
    }
  ];

  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <h1>Transfer Statement</h1>
        <div className="button-options">
          <div id="export_1762852017985">
            <span className="btn btn-secondary m-l-5">Download CSV</span>
          </div>
        </div>
      </div>

      <div className="table-responsive transfer-statement">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-left">Date</th>
              <th className="text-left">Payer/Payee</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>

          {statementData.map((entry, index) => (
            <tbody key={index}>
              {/* Date Row */}
              <tr>
                <td colSpan="3" className="transferDate">
                  <span>{entry.date}</span>
                </td>
              </tr>

              {/* Records for that date */}
              {entry.records.map((record, i) => (
                <tr key={i}>
                  <td className="transferTime">
                    <span>{record.time}</span>
                  </td>
                  <td>
                    <span>{record.payee}</span>
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
          ))}
        </table>
      </div>
    </div>
  );
};

export default TransferStatement;
