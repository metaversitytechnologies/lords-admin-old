import React, { useEffect, useState } from "react";
import IpDetailsModal, { type IpDetails } from "./IpDetailsModal";
import SearchUser from "./SearchUser";
import { getAccountStatement } from "../api/reports";
import { useAuth } from "../context/AuthContext";
import ReusableDatePicker from "./DatePicker";

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

  // UI states
  const [activeTab, setActiveTab] = useState("pnl");
  const [showModal, setShowModal] = useState(false);
  const [ipDetails, setIpDetails] = useState<IpDetails | null>(null);

  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [toDate, setToDate] = useState<Date | null>(new Date());

  const [balanceType, setBalanceType] = useState("ALL");
  const [statementData, setStatementData] = useState<Statement[]>([]);
  const [loading, setLoading] = useState(false);

  const finalUserId =
    searchedUserId.trim() !== "" ? searchedUserId : user?.userId || "";

  const fetchStatement = async () => {
    if (!finalUserId) return;

    setStatementData([]);
    setLoading(true);
    try {
      const payload = {
        pnlStatement: activeTab === "pnl",
        userId: finalUserId, // <-- applied logic
        fromDate: fromDate?.toISOString().split("T")[0],
        toDate: toDate?.toISOString().split("T")[0],
        noOfRecords: 50,
        index: 0,
        balanceType
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
    <section>
      <div className="tabs">
        <div>
          <div className="header">
            <h1>Account Statement</h1>
            <div className="button-options d-inline-block">
              <span className="btn btn-secondary m-l-5">Download CSV</span>
            </div>
          </div>

          {/* Filters */}
          <form className="m-b-10" onSubmit={handleSubmit}>
            {/* Balance Type */}
            <div className="select-report d-inline-block col-md-2 form-group p-l-0 p-r-5">
              <label className="p-l-5">Balance Type</label>
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
            <div className="select-report d-inline-block col-md-2 form-group report-search p-l-0 p-r-5">
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
            <div className="datepicker-wrapper d-inline-block col-md-2 form-group p-l-0 p-r-5">
              <label className="p-l-5">From</label>
              <ReusableDatePicker selected={fromDate} onChange={setFromDate} />
            </div>

            <div className="datepicker-wrapper d-inline-block col-md-2 form-group p-l-0 p-r-5">
              <label className="p-l-5">To</label>
              <ReusableDatePicker selected={toDate} onChange={setToDate} />
            </div>

            <div className="d-inline-block p-l-0 p-r-5">
              <label className="p-l-5">&nbsp;</label>
              <button
                type="submit"
                className="btn btn-secondary m-l-5 btn-load-c"
                disabled={loading}
              >
                {loading ? "Loading..." : "Load"}
              </button>
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
                        statementData.map((row, i) => (
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
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
                        statementData.map((row, i) => (
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
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
    </section>
  );
};

export default AccountStatement;
