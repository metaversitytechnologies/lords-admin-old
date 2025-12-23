import React, { useState, useEffect } from "react";
import { getUnsettledByMatchId } from "../api/auth";
import { getIpAddressDetailLord } from "../api/user";
import { getBetListByMarketId } from "../api/bet";
import SearchUser from "./SearchUser";
import IpDetailsModal, { type IpDetails } from "./IpDetailsModal";
import ReusableModal from "./ReusableModal";
import { CSVLink } from "react-csv";

interface ViewMoreBetsModalProps {
  matchId?: string;
  marketId?: string;
}

const ViewMoreBetsModal: React.FC<ViewMoreBetsModalProps> = ({
  matchId,
  marketId
}) => {
  const activeTab = "matched";
  const [allBets, setAllBets] = useState<any[]>([]);
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showIpModal, setShowIpModal] = useState(false);
  const [selectedIp, setSelectedIp] = useState<string | null>(null);
  const [ipDetails, setIpDetails] = useState<IpDetails | null>(null);
  const [ipLoading, setIpLoading] = useState(false);
  const [showBrowserModal, setShowBrowserModal] = useState(false);
  const [browserDetails, setBrowserDetails] = useState<string>("");

  // states for filters
  const [filterUname, setFilterUname] = useState("");
  const [filterIp, setFilterIp] = useState("");
  const [filterFromAmt, setFilterFromAmt] = useState("");
  const [filterToAmt, setFilterToAmt] = useState("");
  const [filterBetType, setFilterBetType] = useState("");

  type FilterState = {
    betType?: string;
    minAmount?: string;
    maxAmount?: string;
    ipAddress?: string;
    userId?: string;
  };

  const applyFilters = (data: any[], filters?: FilterState) => {
    const {
      betType = "",
      minAmount = "",
      maxAmount = "",
      ipAddress = "",
      userId = ""
    } = filters || {};

    const min = parseFloat(minAmount);
    const max = parseFloat(maxAmount);
    const hasMin = !Number.isNaN(min);
    const hasMax = !Number.isNaN(max);

    return data.filter((bet) => {
      const userMatch = userId
        ? String(bet.userId || "")
            .toLowerCase()
            .includes(userId.toLowerCase())
        : true;
      if (!userMatch) return false;

      const ipMatch = ipAddress
        ? String(bet.userIp || "")
            .toLowerCase()
            .includes(ipAddress.toLowerCase())
        : true;
      if (!ipMatch) return false;

      const amountValue = Number(bet.amount ?? bet.stake ?? 0);
      if (hasMin && amountValue < min) return false;
      if (hasMax && amountValue > max) return false;

      if (betType) {
        const type = bet.back ? "BACK" : "LAY";
        if (type !== betType) return false;
      }

      return true;
    });
  };

  const getCurrentFilters = (): FilterState => ({
    betType: filterBetType,
    minAmount: filterFromAmt,
    maxAmount: filterToAmt,
    ipAddress: filterIp,
    userId: filterUname
  });

  const fetchBets = async () => {
    if (!matchId && !marketId) return;

    setLoading(true);

    const payload: any = {
      betType: "ALL"
    };

    if (marketId) {
      payload.marketId = marketId;
    } else if (matchId) {
      payload.matchId = matchId;
      payload.matchedDeletedBet = "MATCHED";
    }

    try {
      let response;
      if (marketId) {
        response = await getBetListByMarketId(payload);
        const transformedData = response.data.map((bet: any) => ({
          ...bet,
          back: bet.isback,
          amount: bet.stake
        }));
        setAllBets(transformedData || []);
        setBets(applyFilters(transformedData || [], getCurrentFilters()));
      } else {
        response = await getUnsettledByMatchId(payload);
        setAllBets(response.data || []);
        setBets(applyFilters(response.data || [], getCurrentFilters()));
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab} bets:`, error);
      setAllBets([]);
      setBets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBets();
  }, [matchId, marketId]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBets(applyFilters(allBets, getCurrentFilters()));
  };

  const handleReset = () => {
    setFilterUname("");
    setFilterIp("");
    setFilterFromAmt("");
    setFilterToAmt("");
    setFilterBetType("");
    setBets(allBets);
  };

  const handleShowIpModal = async (ip: string) => {
    if (!ip) return;
    setSelectedIp(ip);
    setShowIpModal(true);
    setIpLoading(true);
    try {
      const response = await getIpAddressDetailLord({ ipAddress: ip });
      if (response?.data) {
        setIpDetails(response.data);
      } else {
        setIpDetails({
          status: "fail",
          query: ip,
          message: "No details found"
        });
      }
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

  const handleShowBrowserModal = (details?: string) => {
    setBrowserDetails(details || "No details available");
    setShowBrowserModal(true);
  };

  const handleCloseBrowserModal = () => {
    setShowBrowserModal(false);
    setBrowserDetails("");
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
          <CSVLink
            data={bets}
            filename={`bets-${activeTab}-${
              new Date().toISOString().split("T")[0]
            }.csv`}
            className="btn btn-secondary m-l-5"
          >
            Download CSV
          </CSVLink>
        </div>
      </div>
      <div className="tabs">
        <form onSubmit={handleFilterSubmit}>
          <div className="row">
            <div className="form-group m-t-5 m-b-5 col-lg-2 col-md-6 col-sm-12 p-r-5">
              <label className="p-l-5">Search by user</label>
              <SearchUser
                value={filterUname}
                onChange={setFilterUname}
                placeholder="Enter Atleast 3 character"
              />
            </div>
            <div className="form-group m-t-5 m-b-5 col-lg-2 col-md-6 col-sm-12 p-l-0 p-r-5">
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
            <div className="form-group m-t-5 m-b-5 col-lg-4 col-md-6 col-sm-12 ip-address p-l-0 p-r-5">
              <label className="p-l-5 d-block">Amount</label>
              <div className=" d-flex ">
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
            </div>
            <div className="form-group m-t-5 m-b-5 col-lg-2 col-md-6 col-sm-12 type p-l-0 p-r-5">
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
            <div className="col-lg-2 col-md-12 col-sm-12 m-t-5 text-right p-l-0 p-r-15 m-b-5">
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
                      <td className="d-flex align-items-center">
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
                      <td className="d-flex align-items-center">
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
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            const detailVal =
                              bet?.browserDetails ??
                              bet?.browser_details ??
                              bet?.browser_detail ??
                              bet?.browserdetail ??
                              bet?.browser;
                            handleShowBrowserModal(detailVal);
                          }}
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
      <IpDetailsModal
        show={showIpModal}
        handleClose={handleCloseIpModal}
        ipDetails={ipDetails}
        loading={ipLoading}
      />
      <ReusableModal
        show={showBrowserModal}
        handleClose={handleCloseBrowserModal}
        title="Browser Details"
        size="lg"
        position="top"
        topOffset="32px"
      >
        {(() => {
          if (!browserDetails) {
            return <div>No details available</div>;
          }
          try {
            const parsed = typeof browserDetails === "string"
              ? JSON.parse(browserDetails)
              : browserDetails;
            if (parsed && typeof parsed === "object") {
              const entries = Object.entries(parsed);
              if (entries.length === 0) {
                return <div>No details available</div>;
              }
              return (
                <div className="table-responsive">
                  <table className="table table-striped m-b-0">
                    <thead>
                      <tr>
                        <th>Field</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map(([key, value]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>
                            {typeof value === "object"
                              ? JSON.stringify(value, null, 2)
                              : String(value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
          } catch {
            // fallback below
          }
          return (
            <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {browserDetails}
            </div>
          );
        })()}
      </ReusableModal>
    </div>
  );
};

export default ViewMoreBetsModal;
