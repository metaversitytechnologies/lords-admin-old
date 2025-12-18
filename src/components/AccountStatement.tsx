import React, { useEffect, useState } from "react";
import IpDetailsModal, { type IpDetails } from "./IpDetailsModal";
import SearchUser from "./SearchUser";
import { getAccountStatement } from "../api/reports";
import { useAuth } from "../context/AuthContext";
import { getIpAddressDetailLord } from "../api/user";
import ReusableDatePicker from "./DatePicker";
import { CSVLink } from "react-csv";
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


const AccountStatement: React.FC = () => {
  const { user } = useAuth();

  // User searched from SearchUser
  const [searchedUserId, setSearchedUserId] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // UI states
  const [activeTab, setActiveTab] = useState("pnl");
  const [showModal, setShowModal] = useState(false);
  const [ipDetails, setIpDetails] = useState<IpDetails | null>(null);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const [fromDate, setFromDate] = useState<Date | null>(oneWeekAgo);
  const [toDate, setToDate] = useState<Date | null>(new Date());

  const [balanceType, setBalanceType] = useState("ALL");
  const [statementData, setStatementData] = useState<Statement[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const finalUserId =
    searchedUserId.trim() !== "" ? searchedUserId : user?.userId || "";

  const fetchStatement = async () => {
    if (!finalUserId) return;

    setHasSearched(true);
    setStatementData([]);
    setLoading(true);
    try {
      const payload = {
        pnlStatement: activeTab === "pnl",
        userId: finalUserId, // <-- applied logic
        fromDate: fromDate?.toISOString().split("T")[0],
        toDate: toDate?.toISOString().split("T")[0],
        noOfRecords: 99999,
        index: 0,
        balanceType,
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
    if (hasSearched) {
      fetchStatement();
    }
  }, [activeTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStatement();
  };

  const handleIpDetails = async (ip: string) => {
    setIpDetails(null);
    setShowModal(true);

    try {
      const res = await getIpAddressDetailLord({ ipAddress: ip });
      setIpDetails(res.data);
    } catch (error) {
      setIpDetails({
        status: "fail",
        message: "reserved range",
        query: ip,
      });
    }
  };

  return (
    <section>
      <div className="tabs">
        <div>
          <div className="header">
            <h1>Account Statement</h1>
            <div className="button-options d-inline-block">
              <CSVLink
                data={statementData}
                filename="account-statement.csv"
                className="btn btn-secondary m-l-5"
              >
                Download CSV
              </CSVLink>
            </div>
          </div>

          {/* Filters */}
          <form className="m-b-10" onSubmit={handleSubmit}>
            {/* Balance Type */}
            <div className="row">
              {/* Balance Type */}
              <div className="col-3 col-lg-2 mb-2 form-group">
                <label className="d-block mb-1">Balance Type</label>
                <select
                  className="form-control"
                  value={balanceType}
                  onChange={(e) => setBalanceType(e.target.value)}
                >
                  <option value="ALL">All</option>
                  <option value="Upper">Upper</option>
                  <option value="Lower">Lower</option>
                  <option value="Only C/W">Only C/W</option>
                  <option value="Only D/W">Only D/W</option>
                  <option value="Withdraw">Withdraw</option>
                  <option value="Deposit">Deposit</option>
                </select>
              </div>

              {/* Search User */}
              <div className="col-3 col-lg-2 mb-2 form-group">
                <label className="d-block mb-1">Search by user</label>
                <SearchUser
                  value={searchedUserId}
                  onChange={setSearchedUserId}
                  placeholder="Enter at least 3 characters"
                />
              </div>

              {/* From Date */}
              <div className="col-3 col-lg-2 mb-2 form-group">
                <label className="d-block mb-1">From</label>
                <ReusableDatePicker
                  selected={fromDate}
                  onChange={setFromDate}
                />
              </div>

              {/* To Date */}
              <div className="col-3 col-lg-2 mb-2 form-group">
                <label className="d-block mb-1">To</label>
                <ReusableDatePicker selected={toDate} onChange={setToDate} />
              </div>

              {/* Button */}
              <div className="col-2 col-lg-2 mb-2 form-group d-flex align-items-end">
                <button
                  type="submit"
                  className="btn btn-secondary "
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load"}
                </button>
              </div>
            </div>
          </form>

          {/* TABLES */}
          <div className="table-responsive col-sm-12">
            <div className="tabs">
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
                    P&L Statement
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
                    Credit History
                  </a>
                </li>
              </ul>

              <div className="tab-content">
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
                {/* P&L TAB */}
                <div
                  className={`tab-pane ${activeTab === "pnl" ? "active" : ""}`}
                >
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="text-center">Date</th>
                        <th>Description</th>
                        <th className="text-left">IP</th>
                        <th>From To</th>
                        <th className="text-right">Amount</th>
                        <th className="text-right">Closing</th>
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
                              <td>{row.description}</td>
                              <td className="text-left">
                                {row.ip}
                                <a
                                  href="#"
                                  onClick={() => handleIpDetails(row.ip)}
                                >
                                  <i className="fa fa-eye m-l-5 float-right"></i>
                                </a>
                              </td>
                              <td>{row.fromTo}</td>
                              <td className="text-right">{row.amount}</td>
                              <td className="text-right">{row.closing}</td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center">
                            There are no records to show
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {/* <Pagination
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
                  /> */}
                </div>

                {/* CREDIT TAB */}
                <div
                  className={`tab-pane ${
                    activeTab === "credit" ? "active" : ""
                  }`}
                >
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Master</th>
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
                              <td>{row.date}</td>
                              <td>{row.userName}</td>
                              <td>{row.masterName}</td>
                              <td>{row.remark}</td>
                              <td className="text-right">{row.stake}</td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center">
                            There are no records to show
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
        loading={false}
      />
    </section>
  );
};

export default AccountStatement;
