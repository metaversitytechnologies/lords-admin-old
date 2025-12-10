import React, { useState, useEffect } from "react";
import { getUnsettledByMatchId } from "../api/auth";
import { getBetListByMarketId } from "../api/bet";
import SearchUser from "./SearchUser";
import IpDetailsModal, { type IpDetails } from "./IpDetailsModal";

interface ViewMoreBetsModalProps {
  matchId?: string;
  marketId?: string;
}

const ViewMoreBetsModal: React.FC<ViewMoreBetsModalProps> = ({
  matchId,
  marketId
}) => {
  const [activeTab, setActiveTab] = useState("matched");
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showIpModal, setShowIpModal] = useState(false);
  const [selectedIp, setSelectedIp] = useState<string | null>(null);
  const [ipDetails, setIpDetails] = useState<IpDetails | null>(null);
  const [ipLoading, setIpLoading] = useState(false);

  // states for filters
  const [filterUname, setFilterUname] = useState("");
  const [filterIp, setFilterIp] = useState("");
  const [filterFromAmt, setFilterFromAmt] = useState("");
  const [filterToAmt, setFilterToAmt] = useState("");
  const [filterBetType, setFilterBetType] = useState("");

  const fetchBets = async (filters?: any) => {
    if (!matchId && !marketId) return;

    setLoading(true);

    const payload: any = {
      betType: filters?.betType || "ALL",
      minAmount: filters?.minAmount || null,
      maxAmount: filters?.maxAmount || null,
      ipAddress: filters?.ipAddress || null,
      userId: filters?.userId || null
    };

    if (marketId) {
      payload.marketId = marketId;
    } else if (matchId) {
      payload.matchId = matchId;
      payload.matchedDeletedBet = activeTab.toUpperCase();
    }

    // As per request, send null for non-selected filters.
    // An empty string for a filter is considered "not selected".
    if (!payload.betType) payload.betType = "ALL";
    if (!payload.minAmount) delete payload.minAmount;
    if (!payload.maxAmount) delete payload.maxAmount;
    if (!payload.ipAddress) delete payload.ipAddress;
    if (!payload.userId) delete payload.userId;

    try {
      let response;
      if (marketId) {
        response = await getBetListByMarketId(payload);
        const transformedData = response.data.map((bet: any) => ({
          ...bet,
          back: bet.isback,
          amount: bet.stake
        }));
        setBets(transformedData || []);
      } else {
        response = await getUnsettledByMatchId(payload);
        setBets(response.data || []);
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab} bets:`, error);
      setBets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBets();
  }, [activeTab, matchId, marketId]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters = {
      betType: filterBetType,
      minAmount: filterFromAmt,
      maxAmount: filterToAmt,
      ipAddress: filterIp,
      userId: filterUname
    };
    fetchBets(filters);
  };

  const handleReset = () => {
    setFilterUname("");
    setFilterIp("");
    setFilterFromAmt("");
    setFilterToAmt("");
    setFilterBetType("");
    fetchBets(); // Refetch with no filters
  };

  const handleShowIpModal = async (ip: string) => {
    if (!ip) return;
    setSelectedIp(ip);
    setShowIpModal(true);
    setIpLoading(true);
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data: IpDetails = await response.json();
      setIpDetails(data);
    } catch (error) {
      console.error("Error fetching IP details:", error);
      setIpDetails({
        status: "fail",
        query: ip,
        message: "Failed to fetch details"
      });
    } finally {
      setIpLoading(false);
    }
  };

  const handleCloseIpModal = () => {
    setShowIpModal(false);
    setSelectedIp(null);
    setIpDetails(null);
  };

  const renderTableContent = (colSpan: number, content: React.ReactNode) => {
    if (loading) {
      return (
        <tr>
          <td colSpan={colSpan} className="text-center">
            Loading...
          </td>
        </tr>
      );
    }
    if (bets.length === 0) {
      return (
        <tr>
          <td colSpan={colSpan} className="text-center">
            There are no records to show
          </td>
        </tr>
      );
    }
    return <>{content}</>;
  };

  return (
    <div className="modal-content account-modal">
      <div className="col-md-12 m-t-5 text-right p-l-0 p-r-15">
        <div className="d-inline-block m-l-5">
          <span className="btn btn-secondary m-l-5">Download CSV</span>
        </div>
      </div>
      <div className="tabs">
        <div className="">
          <ul role="tablist" className="nav nav-tabs">
            <li role="presentation" className="nav-item">
              <a
                role="tab"
                aria-selected={activeTab === "matched"}
                href="#"
                target="_self"
                className={`nav-link ${
                  activeTab === "matched" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("matched");
                }}
              >
                Matched Bets
              </a>
            </li>
            <li role="presentation" className="nav-item">
              <a
                role="tab"
                tabIndex={-1}
                aria-selected={activeTab === "unmatched"}
                href="#"
                target="_self"
                className={`nav-link ${
                  activeTab === "unmatched" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("unmatched");
                }}
              >
                Unmatched Bets
              </a>
            </li>
            <li role="presentation" className="nav-item">
              <a
                role="tab"
                tabIndex={-1}
                aria-selected={activeTab === "deleted"}
                href="#"
                target="_self"
                className={`nav-link ${
                  activeTab === "deleted" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("deleted");
                }}
              >
                Deleted Bets
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <div
            role="tabpanel"
            aria-hidden={activeTab !== "matched"}
            className={`tab-pane ${activeTab === "matched" ? "active" : ""}`}
          >
            <form onSubmit={handleFilterSubmit}>
              <div className="row">
                <div className="form-group m-t-5 m-b-5 col-md-2 p-r-5">
                  <label className="p-l-5">Search by user</label>
                  <div className="search-box-container">
                    <SearchUser
                      value={filterUname}
                      onChange={setFilterUname}
                      placeholder="Enter Atleast 3 character"
                    />
                  </div>
                </div>
                <div className="form-group m-t-5 m-b-5 col-md-2 p-l-0 p-r-5">
                  <label className="p-l-5">IP Address</label>
                  <input
                    type="text"
                    name="ip"
                    placeholder="IP Address"
                    className="form-control d-inline-block"
                    value={filterIp}
                    onChange={(e) => setFilterIp(e.target.value)}
                  />
                </div>
                <div className="form-group m-t-5 m-b-5 col-md-4 ip-address p-l-0 p-r-5">
                  <label className="p-l-5 d-block">Amount</label>
                  <input
                    type="text"
                    name="fromamt"
                    placeholder="From Amount"
                    className="form-control d-inline-block"
                    value={filterFromAmt}
                    onChange={(e) => setFilterFromAmt(e.target.value)}
                  />
                  <span>-</span>
                  <input
                    type="text"
                    name="toamt"
                    placeholder="To Amount"
                    className="form-control d-inline-block"
                    value={filterToAmt}
                    onChange={(e) => setFilterToAmt(e.target.value)}
                  />
                </div>
                <div className="form-group m-t-5 m-b-5 col-md-2 type p-l-0 p-r-5">
                  <label className="p-l-5">Type</label>
                  <select
                    name="bettype"
                    className="form-control d-inline-block"
                    value={filterBetType}
                    onChange={(e) => setFilterBetType(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="BACK">Back</option>
                    <option value="LAY">Lay</option>
                  </select>
                </div>
                <div className="col-md-2 m-t-5 text-right p-l-0 p-r-15">
                  <label className="p-l-5 d-block">&nbsp;</label>
                  <button type="submit" className="btn btn-primary m-r-10">
                    Search
                  </button>
                  <button
                    type="button"
                    className="btn btn-cancel"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
            <div style={{ maxHeight: "58vh", overflowY: "scroll" }}>
              <div className="table-responsive matched-data">
                <table className="table coupon-table m-b-0">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Username</th>
                      <th>Market Name</th>
                      <th>Nation</th>
                      <th>Type</th>
                      <th>User Rate</th>
                      <th>Amount</th>
                      <th>Currency</th>
                      <th>Place Date</th>
                      <th>Match Date</th>
                      <th>IP</th>
                      <th>Browser Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderTableContent(
                      12,
                      bets.map((bet, index) => (
                        <tr key={index} className={bet.back ? "back" : "lay"}>
                          <td>{index + 1}</td>
                          <td>
                            {bet.userId}
                            <a
                              title="User Detail"
                              href="#"
                              target="_self"
                              className=""
                            >
                              <i className="fa fa-eye m-l-5 curser-point float-right"></i>
                            </a>
                          </td>
                          <td>{bet.marketName}</td>
                          <td>{bet.selectionName}</td>
                          <td>{bet.back ? "BACK" : "LAY"}</td>
                          <td>{bet.odds}</td>
                          <td>{bet.amount}</td>
                          <td>{bet.currency}</td>
                          <td>{bet.placeTime}</td>
                          <td>{bet.matchedTime}</td>
                          <td>
                            {bet.userIp}
                            <a
                              title="IP Details"
                              href="#"
                              target="_self"
                              className=""
                              onClick={(e) => {
                                e.preventDefault();
                                handleShowIpModal(bet.userIp);
                              }}
                            >
                              <i className="fa fa-eye m-l-5 curser-point float-right"></i>
                            </a>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0)"
                              data-toggle="tooltip"
                              data-placement="top"
                              title={bet.browserDetails}
                              className="text-success"
                            >
                              Detail
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div
            role="tabpanel"
            aria-hidden={activeTab !== "unmatched"}
            className={`tab-pane ${activeTab === "unmatched" ? "active" : ""}`}
          >
            <div className="table-responsive matched-data">
              <table className="table coupon-table m-b-0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Username</th>
                    <th>Mname</th>
                    <th>Nation</th>
                    <th>Type</th>
                    <th>User Rate</th>
                    <th>Amount</th>
                    <th>Currency</th>
                    <th>Place Date</th>
                    <th>IP</th>
                    <th>Browser Details</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTableContent(
                    11,
                    bets.map((bet, index) => (
                      <tr key={index} className={bet.back ? "back" : "lay"}>
                        <td>{index + 1}</td>
                        <td>{bet.userId}</td>
                        <td>{bet.marketName}</td>
                        <td>{bet.selectionName}</td>
                        <td>{bet.back ? "BACK" : "LAY"}</td>
                        <td>{bet.odds}</td>
                        <td>{bet.amount}</td>
                        <td>{bet.currency}</td>
                        <td>{bet.placeTime}</td>
                        <td>
                          {bet.userIp}
                          <a
                            title="IP Details"
                            href="#"
                            target="_self"
                            className=""
                            onClick={(e) => {
                              e.preventDefault();
                              handleShowIpModal(bet.userIp);
                            }}
                          >
                            <i className="fa fa-eye m-l-5 curser-point float-right"></i>
                          </a>
                        </td>
                        <td>
                          <a
                            href="javascript:void(0)"
                            data-toggle="tooltip"
                            data-placement="top"
                            title={bet.browserDetails}
                            className="text-success"
                          >
                            Detail
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            role="tabpanel"
            aria-hidden={activeTab !== "deleted"}
            className={`tab-pane ${activeTab === "deleted" ? "active" : ""}`}
          >
            <div className="table-responsive matched-data">
              <table className="table coupon-table m-b-0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Username</th>
                    <th>Mname</th>
                    <th>Nation</th>
                    <th>Type</th>
                    <th>User Rate</th>
                    <th>Amount</th>
                    <th>Currency</th>
                    <th>Place Date</th>
                    <th>Match Date</th>
                    <th>IP</th>
                    <th>Browser Details</th>
                    <th>Deleted Type</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTableContent(
                    13,
                    bets.map((bet, index) => (
                      <tr key={index} className={bet.back ? "back" : "lay"}>
                        <td>{index + 1}</td>
                        <td>{bet.userId}</td>
                        <td>{bet.marketName}</td>
                        <td>{bet.selectionName}</td>
                        <td>{bet.back ? "BACK" : "LAY"}</td>
                        <td>{bet.odds}</td>
                        <td>{bet.amount}</td>
                        <td>{bet.currency}</td>
                        <td>{bet.placeTime}</td>
                        <td>{bet.matchedTime}</td>
                        <td>
                          {bet.userIp}
                          <a
                            title="IP Details"
                            href="#"
                            target="_self"
                            className=""
                            onClick={(e) => {
                              e.preventDefault();
                              handleShowIpModal(bet.userIp);
                            }}
                          >
                            <i className="fa fa-eye m-l-5 curser-point float-right"></i>
                          </a>
                        </td>
                        <td>
                          <a
                            href="javascript:void(0)"
                            data-toggle="tooltip"
                            data-placement="top"
                            title={bet.browserDetails}
                            className="text-success"
                          >
                            Detail
                          </a>
                        </td>
                        <td>{bet.deletedType}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <IpDetailsModal
        show={showIpModal}
        handleClose={handleCloseIpModal}
        ipDetails={ipDetails}
        loading={ipLoading}
      />
    </div>
  );
};

export default ViewMoreBetsModal;
