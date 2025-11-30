import React, { useState, useEffect, useCallback } from "react";
import SearchUser from "./SearchUser";
import { getStatementUseridwiseLord } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const ClientAccountStatement: React.FC = ({ childId }) => {
  const { user } = useAuth();

  const [userId, setUserId] = useState("");
  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const [fromDate, setFromDate] = useState(
    oneWeekAgo.toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(today.toISOString().split("T")[0]);

  const [statementData, setStatementData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (finalId: string, from: string, to: string) => {
      if (!finalId) return;

      setLoading(true);
      setError(null);

      try {
        const payload = {
          fromDate: from,
          toDate: to,
          noOfRecords: 10,
          index: 0,
          userId: finalId
        };

        const response = await getStatementUseridwiseLord(payload);

        if (response.status) {
          setStatementData(response.data);
        } else {
          setError(response.message || "Failed to fetch statement.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching the statement.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Initial load only
  useEffect(() => {
    const initialId = childId || user?.userId;
    if (initialId) {
      fetchData(initialId, fromDate, toDate);
    }
  }, [childId, user]);

  // Search button click
  const handleSearch = () => {
    const finalId = userId || childId || user?.userId;
    fetchData(finalId, fromDate, toDate);
  };

  return (
    <div>
      <div className="column m-r-40">
        <div className="header">
          {!childId && <h1>Clients Account Statement</h1>}
        </div>

        <div>
          <div
            style={{ width: "270px" }}
            className="form-group v-t m-r-20 d-inline-block"
          >
            <label>From:</label>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div
            style={{ width: "270px" }}
            className="form-group v-t m-r-20 d-inline-block"
          >
            <label>To:</label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          {!childId && (
            <div className="select-report d-inline-block col-md-2 form-group v-t report-search p-l-0 p-r-5">
              <label className="p-l-5">Search by user</label>
              <div className="search-box-container">
                <SearchUser
                  value={userId}
                  onChange={setUserId}
                  placeholder="Enter At least 3 characters"
                />
              </div>
            </div>
          )}

          <div className="form-group m-r-20 d-inline-block">
            <label className="d-block">&nbsp;</label>
            <button
              className="btn btn-primary"
              style={{ height: "35px" }}
              onClick={handleSearch}
            >
              <i className="fa fa-search m-r-5"></i>Search
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>

      <div className="table-responsive col-sm-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>P&L</th>
              <th className="text-right">Credit Limit</th>
              <th className="text-right">Balance</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : statementData?.dataList?.length ? (
              statementData.dataList.map((daily) => (
                <React.Fragment key={daily.date}>
                  <tr className="group">
                    <td colSpan={5}>
                      <b>{new Date(daily.date).toLocaleDateString()}</b>
                    </td>
                  </tr>

                  {daily.dataList.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.date}</td>
                      <td>{entry.description}</td>
                      <td
                        className={`text-right ${
                          entry.pnl >= 0 ? "positive" : "negative"
                        }`}
                      >
                        {entry.pnl.toFixed(2)}
                      </td>
                      <td className="text-right">{entry.creditLimit}</td>
                      <td className="text-right positive">
                        {entry.balance.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientAccountStatement;
