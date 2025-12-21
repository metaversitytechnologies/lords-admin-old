import React, { useState, useEffect } from "react";
import { getBetDetailUseridwiseLord } from "../api/auth";
import ReusableDatePicker from "./DatePicker";
import Pagination from "./Pagination";

const getNumericValue = (value: any) => {
  if (value === null || value === undefined) {
    return null;
  }
  const numericValue = Number(value);
  return Number.isNaN(numericValue) ? null : numericValue;
};

const getWinLossDisplay = (value: any) => {
  if (value === null || value === undefined) {
    return { text: "-", className: "" };
  }

  const numericValue = Number(value);
  const isNumber = !Number.isNaN(numericValue);
  const upperVal = typeof value === "string" ? value.toUpperCase() : "";

  const className = isNumber
    ? numericValue > 0
      ? "text-success"
      : numericValue < 0
      ? "text-danger"
      : ""
    : upperVal === "WIN"
    ? "text-success"
    : upperVal === "LOSS"
    ? "text-danger"
    : "";

  const text = isNumber ? numericValue.toFixed(2) : upperVal || "-";

  return { text, className };
};

const DownlineBetList = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("current");
  const [betType, setBetType] = useState("matched");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [betData, setBetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const [fromDate, setFromDate] = useState<Date | null>(oneWeekAgo);
  const [toDate, setToDate] = useState<Date | null>(today);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (pFromDate?: Date | null, pToDate?: Date | null) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        userId: userId,
        matchedDeletedBet: betType.toUpperCase(),
        currentBet: activeTab === "current",
        fromDate: (pFromDate !== undefined ? pFromDate : fromDate)
          ?.toISOString()
          .split("T")[0],
        toDate: (pToDate !== undefined ? pToDate : toDate)
          ?.toISOString()
          .split("T")[0],
        index: 0,
        noOfRecords: 99999
      };
      const response = await getBetDetailUseridwiseLord(payload);
      if (response.status === false) {
        throw new Error(response.message || "Failed to fetch data");
      }
      setBetData(response.data.betList || []);
    } catch (error) {
      setError(error.message);
      setBetData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, betType, userId]);

  const handleApply = () => {
    fetchData();
  };

  const handleCancel = () => {
    setFromDate(oneWeekAgo);
    setToDate(today);
    fetchData(oneWeekAgo, today);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setCurrentPage(newPage);
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
                  <div className="d-flex m-t-10">
                    <div className="d-inline-block p-r-10 form-group v-t p-l-0 ">
                      <ReusableDatePicker
                        selected={fromDate}
                        onChange={setFromDate}
                      />
                    </div>
                    <div className="form-group d-inline-block v-t p-l-0 p-r-10">
                      <ReusableDatePicker
                        selected={toDate}
                        onChange={setToDate}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleApply}
                      >
                        Apply
                      </button>
                      <button
                        type="button"
                        className="btn btn-cancel"
                        style={{ marginLeft: "5px" }}
                        onClick={handleCancel}
                      >
                        Cancel
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
                                    id="entries-select"
                                    className="form-control"
                                    style={{ width: "60px" }}
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                      setItemsPerPage(Number(e.target.value));
                                      setCurrentPage(1);
                                    }}
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
                                    Description
                                  </th>
                                  <th className="position-relative text-left">
                                    User Name
                                  </th>
                                  <th className="position-relative text-left">
                                    Bet Type
                                  </th>
                                  <th className="position-relative text-left">
                                    User Rate
                                  </th>
                                  <th className="position-relative text-left">
                                    Profit
                                  </th>
                                  <th className="position-relative text-right">
                                    Win/Loss
                                  </th>
                                  <th className="text-left">IP</th>
                                  <th className="position-relative text-right">
                                    Browser Details
                                  </th>
                                  <th className="position-relative text-right">
                                    Amount
                                  </th>
                                </tr>
                              </thead>
                              <tbody role="rowgroup">
                                {loading ? (
                                  <tr>
                                    <td colSpan="10" className="text-center">
                                      Loading...
                                    </td>
                                  </tr>
                                ) : error ? (
                                  <tr>
                                    <td
                                      colSpan="10"
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
                                    .slice(
                                      (currentPage - 1) * itemsPerPage,
                                      currentPage * itemsPerPage
                                    )
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
                                          className="text-left"
                                        >
                                          {bet.odds}
                                        </td>
                                        <td
                                          data-label="Profit"
                                          className="text-right"
                                        >
                                          {(() => {
                                            const profitValue = getNumericValue(
                                              bet.profit ??
                                                bet.netpnl ??
                                                bet.pnl ??
                                                bet.memberPnl ??
                                                bet.profitLiability
                                            );
                                            const profitClass =
                                              profitValue !== null
                                                ? profitValue > 0
                                                  ? "text-success"
                                                  : profitValue < 0
                                                  ? "text-danger"
                                                  : ""
                                                : "";

                                            return (
                                              <span className={profitClass}>
                                                {profitValue !== null
                                                  ? profitValue.toFixed(2)
                                                  : "-"}
                                              </span>
                                            );
                                          })()}
                                        </td>
                                        <td
                                          data-label="Win/Loss"
                                          className="text-right"
                                        >
                                          {(() => {
                                            const { text, className } =
                                              getWinLossDisplay(
                                                bet.winLoss ??
                                                  bet.winLossStatus ??
                                                  bet.winLossValue ??
                                                  bet.win_loss ??
                                                  bet.result
                                              );
                                            return (
                                              <span className={className}>
                                                {text}
                                              </span>
                                            );
                                          })()}
                                        </td>
                                        <td
                                          data-label="IP"
                                          className="text-left"
                                        >
                                          {bet.userIp}
                                        </td>
                                        <td
                                          data-label="Stack"
                                          className="text-right"
                                        >
                                          {(() => {
                                            try {
                                              const info =
                                                typeof bet.deviceInfo ===
                                                "string"
                                                  ? JSON.parse(bet.deviceInfo)
                                                  : bet.deviceInfo;
                                              return info?.userAgent || "";
                                            } catch {
                                              return "";
                                            }
                                          })()}
                                        </td>

                                        <td
                                          data-label="Stack"
                                          className="text-right"
                                        >
                                          {bet.stack}
                                        </td>
                                      </tr>
                                    ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Pagination */}
                        <Pagination
                          currentPage={currentPage}
                          totalPages={Math.ceil(
                            betData.filter((bet) => {
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
                            }).length / itemsPerPage
                          )}
                          onPageChange={handlePageChange}
                        />
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
