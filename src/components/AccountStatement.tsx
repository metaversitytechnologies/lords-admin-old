import React, { useState } from "react";
import IpDetailsModal, { type IpDetails } from "./IpDetailsModal";
import SearchUser from "./SearchUser";

const AccountStatement: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [activeTab, setActiveTab] = useState("pnl");
  const [showModal, setShowModal] = useState(false);
  const [ipDetails, setIpDetails] = useState<IpDetails | null>(null);

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
    <section className="apl-section">
      <div className=" tabs">
        <div>
          <div className="header">
            <h1>Account Statement</h1>
            <div className="button-options d-inline-block">
              <div id="export_1763294765910" className="">
                <span className="btn btn-secondary m-l-5">Download CSV</span>
              </div>
            </div>
          </div>
          <form className="m-b-10">
            <div className="select-report d-inline-block col-md-2 form-group v-t p-l-0 p-r-5">
              <label className="p-l-5">Balance Type</label>
              <select className="form-control">
                <option value="all">All</option>
                <option value="Upper">Upper</option>
                <option value="Down">Lower</option>
                <option value="CW">Only C/W</option>
                <option value="DW">Only D/W</option>
                <option value="W">Withdraw</option>
                <option value="D">Deposit</option>
              </select>
            </div>
            <div className="select-report d-inline-block col-md-2 form-group v-t report-search p-l-0 p-r-5">
              <label className="p-l-5">Search by user</label>
              <div className="search-box-container">
                <SearchUser
                  value={userId}
                  onChange={setUserId}
                  placeholder="Enter Atleast 3 character"
                />
              </div>
            </div>
            <div className="datepicker-wrapper d-inline-block col-md-2 form-group v-t p-l-0 p-r-5">
              <label className="p-l-5">From</label>
              <input type="date" className="form-control" />
            </div>
            <div className="datepicker-wrapper form-group d-inline-block col-md-2 v-t p-l-0 p-r-5">
              <label className="p-l-5 d-block">To</label>
              <input type="date" className="form-control" />
            </div>
            <div className="d-inline-block v-t p-l-0 p-r-5">
              <label className="p-l-5 d-block">&nbsp;</label>
              <button
                type="submit"
                className="btn btn-secondary m-l-5 btn-load-c v-t"
              >
                Load
              </button>
            </div>
          </form>
          <div className="table-responsive col-sm-12">
            <div className="tabs">
              <ul role="tablist" className="nav nav-tabs">
                <li role="presentation" className="nav-item">
                  <a
                    role="tab"
                    href="#"
                    target="_self"
                    className={`nav-link ${
                      activeTab === "pnl" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("pnl")}
                  >
                    P&L Statement
                  </a>
                </li>
                <li role="presentation" className="nav-item">
                  <a
                    role="tab"
                    href="#"
                    target="_self"
                    className={`nav-link ${
                      activeTab === "credit" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("credit")}
                  >
                    Credit History
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  role="tabpanel"
                  className={`tab-pane ${activeTab === "pnl" ? "active" : ""}`}
                  style={{ display: activeTab === "pnl" ? "block" : "none" }}
                >
                  <div className="row">
                    <div className="col-sm-12 p-l-0 p-r-5">
                      <table
                        id="accounstatement"
                        role="table"
                        className="table b-table table table-striped b-table-stacked-md"
                      >
                        <thead role="rowgroup">
                          <tr role="row">
                            <th className="position-relative text-center">
                              Date
                            </th>
                            <th className="position-relative">Description</th>
                            <th className="position-relative text-left">Ip</th>
                            <th className="position-relative">From To</th>
                            <th className="position-relative text-right">
                              Amount
                            </th>
                            <th className="position-relative text-right">
                              Closing
                            </th>
                          </tr>
                        </thead>
                        <tbody role="rowgroup">
                          <tr role="row">
                            <td className="text-center">2025-11-02</td>
                            <td>Opening</td>
                            <td className="text-left">
                              <a
                                title="IP Details"
                                href="#"
                                onClick={() => handleIpDetails("127.0.0.1")}
                                target="_self"
                              >
                                <i className="fa fa-eye m-l-5 curser-point float-right"></i>
                              </a>
                            </td>
                            <td></td>
                            <td className="text-right">0</td>
                            <td className="text-right">0.00</td>
                          </tr>
                          <tr role="row">
                            <td className="text-center">2025-11-02</td>
                            <td>By Credit</td>
                            <td className="text-left">
                              127.0.0.1
                              <a
                                title="IP Details"
                                href="#"
                                onClick={() => handleIpDetails("127.0.0.1")}
                                target="_self"
                              >
                                <i className="fa fa-eye m-l-5 curser-point float-right"></i>
                              </a>
                            </td>
                            <td>agtshak/omsai3333</td>
                            <td className="text-right">101.00</td>
                            <td className="text-right">101.00</td>
                          </tr>
                          <tr role="row">
                            <td className="text-center">2025-11-02</td>
                            <td>By withdraw</td>
                            <td className="text-left">
                              127.0.0.1
                              <a
                                title="IP Details"
                                href="#"
                                onClick={() => handleIpDetails("127.0.0.1")}
                                target="_self"
                              >
                                <i className="fa fa-eye m-l-5 curser-point float-right"></i>
                              </a>
                            </td>
                            <td>agtshak/omsai3333</td>
                            <td className="text-right">-8.00</td>
                            <td className="text-right">93.00</td>
                          </tr>
                          <tr role="row">
                            <td className="text-center">2025-11-05</td>
                            <td>By Credit</td>
                            <td className="text-left">
                              127.0.0.1
                              <a
                                title="IP Details"
                                href="#"
                                onClick={() => handleIpDetails("127.0.0.1")}
                                target="_self"
                              >
                                <i className="fa fa-eye m-l-5 curser-point float-right"></i>
                              </a>
                            </td>
                            <td>agtshak/omsai3333</td>
                            <td className="text-right">-51.00</td>
                            <td className="text-right">42.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  role="tabpanel"
                  className={`tab-pane ${
                    activeTab === "credit" ? "active" : ""
                  }`}
                  style={{
                    display: activeTab === "credit" ? "block" : "none"
                  }}
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
                      <tr>
                        <td className="text-left">11/5/2025 4:32:05 PM</td>
                        <td className="text-left">agtshak</td>
                        <td className="text-left">omsai3333</td>
                        <td className="text-left">By Credit</td>
                        <td className="text-right">-51.00</td>
                      </tr>
                      <tr>
                        <td className="text-left">11/2/2025 12:36:09 PM</td>
                        <td className="text-left">agtshak</td>
                        <td className="text-left">omsai3333</td>
                        <td className="text-left">By Credit</td>
                        <td className="text-right">101.00</td>
                      </tr>
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
