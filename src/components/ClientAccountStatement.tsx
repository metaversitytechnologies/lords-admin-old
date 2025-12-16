import React, { useState, useEffect, useCallback } from "react";
import SearchUser from "./SearchUser";
import { getStatementUseridwiseLord } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import ReusableDatePicker from "./DatePicker";
import Pagination from "./Pagination";

const ClientAccountStatement: React.FC = ({ childId }) => {
  const { user } = useAuth();

  const [userId, setUserId] = useState("");
  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const [fromDate, setFromDate] = useState<Date | null>(oneWeekAgo);
  const [toDate, setToDate] = useState<Date | null>(today);

  const [statementData, setStatementData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchData = useCallback(
    async (finalId: string, from: string, to: string) => {
      if (!finalId) return;

      setLoading(true);
      setError(null);

      try {
        const payload = {
          fromDate: from,
          toDate: to,
          noOfRecords: 99999,
          index: 0,
          userId: finalId,
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

  // // Initial load only
  // useEffect(() => {
  //   const initialId = childId || user?.userId;
  //   if (initialId) {
  //     fetchData(initialId, fromDate?.toISOString().split("T")[0], toDate?.toISOString().split("T")[0]);
  //   }
  // }, [childId, user]);

  // Search button click
  const handleSearch = () => {
    const finalId = userId || childId || user?.userId;
    fetchData(
      finalId,
      fromDate?.toISOString().split("T")[0],
      toDate?.toISOString().split("T")[0]
    );
  };

  return (
    <div>
      <div className="column m-r-40">
        <div className="header">
          {!childId && <h1>Clients Account Statement</h1>}
        </div>

        <div>
          <div className="form-group col-md-2 v-t d-inline-block p-r-5">
            <label className="d-block">From:</label>
            <ReusableDatePicker selected={fromDate} onChange={setFromDate} />
          </div>

          <div className="form-group col-md-2 v-t d-inline-block p-l-0 p-r-5">
            <label className="d-block">To:</label>
            <ReusableDatePicker selected={toDate} onChange={setToDate} />
          </div>

          {!childId && (
            <div className="d-inline-block col-md-2 v-t p-l-0 p-r-5">
              <label>Search by user</label>
              <div className="search-box-container">
                <SearchUser
                  value={userId}
                  onChange={setUserId}
                  placeholder="Enter At least 3 characters"
                />
              </div>
            </div>
          )}

          <div className="form-group d-inline-block">
            <label className="d-block">&nbsp;</label>
            <button className="btn btn-secondary" onClick={handleSearch}>
              <i className="fa fa-search m-r-5"></i>Search
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>

      <div className="table-responsive col-sm-12">
        <div className="row col-page">
          <div className="col-sm-12 col-md-6 p-l-0 p-r-5">
            <div className="row dataTables_length">
              {/* <div className="p-l-m col">
                <label>
                  Show
                  <select
                    style={{ width: "60px" }}
                    className="form-control"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  entries
                </label>
              </div> */}
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="dataTables_filter">
              <div className="row">
                <div className="f-l-m col">
                  <label>
                    Search:
                    <input
                      type="text"
                      placeholder="Type to Search"
                      className="form-control form-control-sm"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table">
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
              statementData.dataList
                .filter((daily) =>
                  daily.dataList.some(
                    (entry) =>
                      !searchTerm ||
                      Object.values(entry).some((val) =>
                        String(val)
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                  )
                )
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((daily) => (
                  <React.Fragment key={daily.date}>
                    <tr className="group">
                      <td colSpan={5}>{daily.date}</td>
                    </tr>
                    {daily.dataList
                      .filter(
                        (entry) =>
                          !searchTerm ||
                          Object.values(entry).some((val) =>
                            String(val)
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                      )
                      .map((entry, index) => (
                        <tr key={index}>
                          <td>{entry.date}</td>
                          <td>{entry.description}</td>
                          <td
                            className={` ${
                              entry.pnl >= 0 ? "positive" : "negative"
                            }`}
                          >
                            {entry.pnl.toFixed(2)}
                          </td>
                          <td className="text-right">{entry.creditLimit}</td>
                          <td
                            className={`text-right ${
                              entry.balance >= 0 ? "positive" : "negative"
                            }`}
                          >
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
        {/* <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(
            (
              statementData?.dataList?.flatMap((daily) => daily.dataList) || []
            ).filter(
              (entry) =>
                !searchTerm ||
                Object.values(entry).some((val) =>
                  String(val).toLowerCase().includes(searchTerm.toLowerCase())
                )
            ).length / itemsPerPage
          )}
          onPageChange={setCurrentPage}
        /> */}
      </div>
    </div>
  );
};

export default ClientAccountStatement;
