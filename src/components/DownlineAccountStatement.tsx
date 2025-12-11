import React, { useEffect, useState } from "react";
import IpDetailsModal, { type IpDetails } from "./IpDetailsModal";
import SearchUser from "./SearchUser";
import { getAccountStatement } from "../api/reports";
import { useAuth } from "../context/AuthContext";
import ReusableDatePicker from "./DatePicker";
import Pagination from "./Pagination";

interface Statement {
  date: string;
  userName: string | null;
  masterName: string | null;
  remark: string | null;
  stake: number | null;
  description: string;
  ip: string;
  fromTo: string;
  amount: number;
  closing: number;
}

interface Props {
  childId?: string | null;
}

const DownlineAccountStatement: React.FC<Props> = ({ childId }) => {
  // User searched from SearchUser
  const [searchedUserId, setSearchedUserId] = useState("");

  // UI states
  const [activeTab, setActiveTab] = useState("pnl");
  const [showModal, setShowModal] = useState(false);
  const [ipDetails, setIpDetails] = useState<IpDetails | null>(null);

  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [toDate, setToDate] = useState<Date | null>(new Date());

  const [balanceType, setBalanceType] = useState("all");
  const [statementData, setStatementData] = useState<Statement[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 🔥 FINAL USER-ID PRIORITY LOGIC
  const finalUserId = searchedUserId.trim() !== "" ? searchedUserId : childId;

  const fetchStatement = async () => {
    if (!finalUserId) return;

    setStatementData([]);
    setLoading(true);
    try {
      const payload = {
        pnlStatement: activeTab === "pnl",
        userId: finalUserId,
        fromDate: fromDate?.toISOString().split("T")[0],
        toDate: toDate?.toISOString().split("T")[0],
        noOfRecords: 99999,
        index: 0,
        balanceType: balanceType === "all" ? "ALL" : balanceType.toUpperCase(),
      };

      const res = await getAccountStatement(payload);
      if (res.data) {
        setStatementData(res.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStatement();
  }, [activeTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStatement();
  };

  const handleIpDetails = async (ip: string) => {
    setIpDetails(null);
    setShowModal(true);

    try {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();
      setIpDetails(data);
    } catch (error) {
      setIpDetails({
        status: "fail",
        message: "reserved range",
        query: ip
      });
    }
  };

  return (
    <div>
      <div className="tabs">
        <div id="betting-pnl" className="tab-pane fade active show">
          <div>
            <div className="header">
              <form onSubmit={handleSubmit}>
                {/* Balance Type */}
                <div className="d-inline-block form-group v-t p-l-0 p-r-5">
                  <label className="p-l-5">Balance Type</label>
                  <select
                    className="form-control"
                    value={balanceType}
                    onChange={(e) => setBalanceType(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="Upper">Upper</option>
                    <option value="Down">Lower</option>
                    <option value="CW">Only C/W</option>
                    <option value="DW">Only D/W</option>
                    <option value="W">Withdraw</option>
                    <option value="D">Deposit</option>
                  </select>
                </div>

                {/* Search User */}
                <div className="d-inline-block v-t report-search p-l-0 p-r-5">
                  <label className="p-l-5">Search by user</label>
                  <div className="search-box-container">
                    <SearchUser
                      value={searchedUserId}
                      onChange={setSearchedUserId}
                      placeholder="Enter Atleast 3 character"
                    />
                  </div>
                </div>

                {/* Date Inputs */}
                <div className="d-inline-block col-md-2 form-group p-l-0 p-r-5">
                  <label className="p-l-5">From</label>
                  <ReusableDatePicker
                    selected={fromDate}
                    onChange={setFromDate}
                  />
                </div>

                <div className="d-inline-block col-md-2 form-group p-l-0 p-r-5">
                  <label>To</label>
                  <ReusableDatePicker selected={toDate} onChange={setToDate} />
                </div>

                <div className="m-b-10 d-inline-block v-t">
                  <label className="d-block">&nbsp;</label>
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    disabled={loading}
                  >
                    <i className="fa fa-search m-r-5"></i>
                    {loading ? "Loading..." : "Search"}
                  </button>
                </div>
              </form>
            </div>

            {/* Tabs Section */}
            <div className="tabs">
              <div>
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeTab === "pnl" ? "active" : ""
                      }`}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("pnl");
                      }}
                    >
                      P&amp;L Statement
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeTab === "credit" ? "active" : ""
                      }`}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("credit");
                      }}
                    >
                      Credit Statement
                    </a>
                  </li>
                </ul>
              </div>

              <div className="tab-content">
                <div className="row col-page">
                  <div className="col-sm-12 col-md-6 p-l-0 p-r-5">
                    <div className="row dataTables_length">
                      <div className="p-l-m col">
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
                      </div>
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
                {/* P&L Tab */}
                <div
                  className={`tab-pane ${activeTab === "pnl" ? "active" : ""}`}
                >
                  <div>
                    <table className="table b-table table table-striped b-table-stacked-md">
                      <thead className="">
                        <tr className="">
                          <th className="position-relative text-center">
                            <div>Date</div>
                            <span className="sr-only">
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th className="">
                            <div>Description</div>
                          </th>
                          <th className="text-left">
                            <div>Ip</div>
                          </th>
                          <th className="">
                            <div>From To</div>
                          </th>
                          <th className="position-relative text-right">
                            <div>Amount</div>
                            <span className="sr-only">
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th className="position-relative text-right">
                            <div>Closing</div>
                            <span className="sr-only">
                              (Click to sort ascending)
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {statementData.length > 0 ? (
                          statementData
                            .filter(
                              (row) =>
                                !searchTerm ||
                                Object.values(row).some((val) =>
                                  String(val)
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                                )
                            )
                            .slice(
                              (currentPage - 1) * itemsPerPage,
                              currentPage * itemsPerPage
                            )
                            .map((row, i) => (
                              <tr key={i}>
                                <td className="text-center">{row.date}</td>
                                <td className="">{row.description}</td>
                                <td className="text-left">
                                  {row.ip}
                                  {row.ip && (
                                    <a
                                      href="#"
                                      onClick={() => handleIpDetails(row.ip)}
                                    >
                                      <i className="fa fa-eye m-l-5 float-right"></i>
                                    </a>
                                  )}
                                </td>
                                <td className="">{row.fromTo}</td>
                                <td className="text-right">{row.amount}</td>
                                <td className="text-right">{row.closing}</td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="text-center">
                              No data found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(
                        statementData.filter(
                          (row) =>
                            !searchTerm ||
                            Object.values(row).some((val) =>
                              String(val)
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            )
                        ).length / itemsPerPage
                      )}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </div>

                {/* Credit Tab */}
                <div
                  className={`tab-pane ${
                    activeTab === "credit" ? "active" : ""
                  }`}
                >
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>User Name</th>
                        <th>Master Name</th>
                        <th>Remark</th>
                        <th className="text-right">Stake</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statementData.length > 0 ? (
                        statementData
                          .filter(
                            (row) =>
                              !searchTerm ||
                              Object.values(row).some((val) =>
                                String(val)
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              )
                          )
                          .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                          )
                          .map((row, i) => (
                            <tr key={i}>
                              <td className="text-left">{row.date}</td>
                              <td className="text-left">{row.userName}</td>
                              <td className="text-left">{row.masterName}</td>
                              <td className="text-left">{row.remark}</td>
                              <td className="text-right">{row.stake}</td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center">
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(
                      statementData.filter(
                        (row) =>
                          !searchTerm ||
                          Object.values(row).some((val) =>
                            String(val)
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                      ).length / itemsPerPage
                    )}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <IpDetailsModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        ipDetails={ipDetails}
      />
    </div>
  );
};

export default DownlineAccountStatement;
