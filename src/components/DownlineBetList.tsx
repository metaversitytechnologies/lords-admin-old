import React, { useState, useEffect } from "react";
import { getBetDetailUseridwiseLord } from "../api/auth";

const DownlineBetList = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("current");
  const [betType, setBetType] = useState("matched");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [betData, setBetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1
  });

  const fetchData = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        userId: userId,
        matchedDeletedBet: betType.toUpperCase(),
        currentBet: activeTab === "current",
        fromDate: fromDate,
        toDate: toDate,
        index: page - 1,
        noOfRecords: parseInt(entriesPerPage)
      };
      const response = await getBetDetailUseridwiseLord(payload);
      if (response.status === false) {
        throw new Error(response.message || "Failed to fetch data");
      }
      setBetData(response.data.betList || []);
      setPagination({
        totalPages: response.data.totalPages || 1,
        currentPage: response.data.currentPage || 1
      });
    } catch (error) {
      setError(error.message);
      setBetData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [activeTab, betType, entriesPerPage, userId]);

  const handleApply = () => {
    fetchData(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchData(newPage);
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-pane active">
        <div>
          <div className="">
            <section>
              <div>
                <div className="bet-list">
                  <div className="additional-filters d-flex m-t-10">
                    <div className="d-inline-block p-r-10 form-group v-t p-l-0 ">
                      <input
                        type="date"
                        className="form-control"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                    </div>
                    <div className="form-group d-inline-block v-t p-l-0 p-r-10">
                      <input
                        type="date"
                        className="form-control"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-secondary m-l-5"
                        onClick={handleApply}
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="tabs">
                    <div className="">
                      <ul role="tablist" className="nav nav-tabs">
                        <li role="presentation" className="nav-item">
                          <a
                            role="tab"
                            href="#"
                            className={`nav-link ${
                              activeTab === "current" ? "active" : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveTab("current");
                            }}
                          >
                            Current
                          </a>
                        </li>
                        <li role="presentation" className="nav-item">
                          <a
                            role="tab"
                            href="#"
                            className={`nav-link ${
                              activeTab === "past" ? "active" : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveTab("past");
                            }}
                          >
                            Past
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="tab-content">
                      {/* Radio Buttons */}
                      <div className="col-sm-12 p-l-0 p-r-0">
                        <div>
                          <div className="form-group d-inline-block v-t p-l-0 p-r-0 bet-options">
                            <fieldset className="form-group">
                              <div>
                                <div
                                  role="radiogroup"
                                  className="bv-no-focus-ring"
                                >
                                  <div className="custom-control custom-control-inline custom-radio">
                                    <input
                                      type="radio"
                                      name="radio-inline"
                                      className="custom-control-input"
                                      value="matched"
                                      id="radio-matched"
                                      checked={betType === "matched"}
                                      onChange={(e) =>
                                        setBetType(e.target.value)
                                      }
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="radio-matched"
                                    >
                                      <span>Matched</span>
                                    </label>
                                  </div>
                                  <div className="custom-control custom-control-inline custom-radio">
                                    <input
                                      type="radio"
                                      name="radio-inline"
                                      className="custom-control-input"
                                      value="deleted"
                                      id="radio-deleted"
                                      checked={betType === "deleted"}
                                      onChange={(e) =>
                                        setBetType(e.target.value)
                                      }
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="radio-deleted"
                                    >
                                      <span>Deleted</span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </div>

                      {/* Table Controls */}
                      <div className="table-responsive col-sm-12">
                        <div className="row col-page">
                          <div className="col-sm-12 col-md-6 p-l-0 p-r-5">
                            <div className="row dataTables_length">
                              <div className="col">
                                <label htmlFor="entries-select">
                                  Show{" "}
                                  <select
                                    className="form-control custom-select custom-select-sm"
                                    id="entries-select"
                                    value={entriesPerPage}
                                    onChange={(e) =>
                                      setEntriesPerPage(e.target.value)
                                    }
                                  >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                  </select>{" "}
                                  entries
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-6">
                            <div className="dataTables_filter">
                              <div className="row">
                                <div className="f-l-m col">
                                  <label>
                                    Search:{" "}
                                    <input
                                      type="text"
                                      placeholder="Type to Search"
                                      className="form-control form-control-sm"
                                      value={searchTerm}
                                      onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                      }
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Table */}
                        <div className="row">
                          <div className="col-sm-12 p-l-0 p-r-5">
                            <table
                              role="table"
                              className="table b-table table table-striped b-table-stacked-md"
                            >
                              <thead role="rowgroup">
                                <tr role="row">
                                  <th className="position-relative text-center">
                                    Place Date
                                  </th>
                                  <th className="position-relative text-left">
                                    Match Name
                                  </th>
                                  <th className="position-relative text-left">
                                    Market Name
                                  </th>
                                  <th className="position-relative text-left">
                                    Selection Name
                                  </th>
                                  <th className="position-relative text-left">
                                    User name
                                  </th>
                                  <th className="position-relative text-left">
                                    Bet Type
                                  </th>
                                  <th className="position-relative text-right">
                                    Odds
                                  </th>
                                  <th className="position-relative text-right">
                                    Stack
                                  </th>
                                  <th className="text-left">IP</th>
                                </tr>
                              </thead>
                              <tbody role="rowgroup">
                                {loading ? (
                                  <tr>
                                    <td colSpan="9" className="text-center">
                                      Loading...
                                    </td>
                                  </tr>
                                ) : error ? (
                                  <tr>
                                    <td
                                      colSpan="9"
                                      className="text-center text-danger"
                                    >
                                      {error}
                                    </td>
                                  </tr>
                                ) : (
                                  betData
                                    .filter((bet) => {
                                      if (searchTerm === "") {
                                        return bet;
                                      } else if (
                                        bet.matchName
                                          .toLowerCase()
                                          .includes(searchTerm.toLowerCase()) ||
                                        bet.marketname
                                          .toLowerCase()
                                          .includes(searchTerm.toLowerCase()) ||
                                        bet.selectionname
                                          .toLowerCase()
                                          .includes(searchTerm.toLowerCase()) ||
                                        bet.userid
                                          .toLowerCase()
                                          .includes(searchTerm.toLowerCase())
                                      ) {
                                        return bet;
                                      }
                                    })
                                    .map((bet, index) => (
                                      <tr role="row" key={index}>
                                        <td
                                          data-label="Place Date"
                                          className="text-center"
                                        >
                                          {bet.matchedtime}
                                        </td>
                                        <td
                                          data-label="Match Name"
                                          className="text-left"
                                        >
                                          {bet.matchName}
                                        </td>
                                        <td
                                          data-label="Market Name"
                                          className="text-left"
                                        >
                                          {bet.marketname}
                                        </td>
                                        <td
                                          data-label="Selection Name"
                                          className="text-left"
                                        >
                                          {bet.selectionname}
                                        </td>
                                        <td
                                          data-label="User name"
                                          className="text-left"
                                        >
                                          {bet.userid}
                                        </td>
                                        <td
                                          data-label="Bet Type"
                                          className={`text-left ${
                                            bet.isback ? "back-bet" : "lay-bet"
                                          }`}
                                        >
                                          {bet.isback ? "BACK" : "LAY"}
                                        </td>
                                        <td
                                          data-label="Odds"
                                          className="text-right"
                                        >
                                          {bet.odds}
                                        </td>
                                        <td
                                          data-label="Stack"
                                          className="text-right"
                                        >
                                          {bet.stack}
                                        </td>
                                        <td
                                          data-label="IP"
                                          className="text-left"
                                        >
                                          {bet.userIp}
                                        </td>
                                      </tr>
                                    ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Pagination */}
                        <div className="row">
                          <div className="my-1 p-m-l col">
                            <ul
                              role="menubar"
                              className="pagination my-0 b-pagination justify-content-end"
                            >
                              <li
                                role="presentation"
                                className={`page-item ${
                                  pagination.currentPage === 1 ? "disabled" : ""
                                }`}
                              >
                                <button
                                  onClick={() =>
                                    handlePageChange(pagination.currentPage - 1)
                                  }
                                  className="page-link"
                                >
                                  «
                                </button>
                              </li>
                              {[...Array(pagination.totalPages).keys()].map(
                                (num) => (
                                  <li
                                    key={num + 1}
                                    role="presentation"
                                    className={`page-item ${
                                      pagination.currentPage === num + 1
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    <button
                                      onClick={() => handlePageChange(num + 1)}
                                      role="menuitemradio"
                                      type="button"
                                      className="page-link"
                                    >
                                      {num + 1}
                                    </button>
                                  </li>
                                )
                              )}
                              <li
                                role="presentation"
                                className={`page-item ${
                                  pagination.currentPage ===
                                  pagination.totalPages
                                    ? "disabled"
                                    : ""
                                }`}
                              >
                                <button
                                  onClick={() =>
                                    handlePageChange(pagination.currentPage + 1)
                                  }
                                  className="page-link"
                                >
                                  »
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownlineBetList;
