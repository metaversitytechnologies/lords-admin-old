import { useState, useEffect, useRef } from "react";
import { getMyBetReport } from "../api/bet";
import { useAuth } from "../context/AuthContext";
import IpDetailsModal, { type IpDetails } from "./IpDetailsModal";
import { getIpAddressDetailLord } from "../api/user";
import { CSVLink } from "react-csv";
import Pagination from "./Pagination";
import { getSportListLord, getMarketListSportWiseLord } from "../api/reports";
import BetListFilters from "./BetListFilters";

const BestList = () => {
  const { user } = useAuth();
  const userId = user?.userId;
  const [betList, setBetList] = useState([]);
  const [sports, setSports] = useState<any[]>([]);
  const [markets, setMarkets] = useState<any[]>([]);
  const [marketName, setMarketName] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sportId, setSportId] = useState("0");
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [index, setIndex] = useState(0);
  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const [fromDate, setFromDate] = useState<Date | null>(oneWeekAgo);
  const [toDate, setToDate] = useState<Date | null>(today);
  const [activeTab, setActiveTab] = useState("Current");
  const [activeRadio, setActiveRadio] = useState("Matched");
  const [userSearch, setUserSearch] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [oddsFrom, setOddsFrom] = useState("");
  const [oddsTo, setOddsTo] = useState("");
  const [stakeFrom, setStakeFrom] = useState("");
  const [stakeTo, setStakeTo] = useState("");

  const [showIpModal, setShowIpModal] = useState(false);
  const [ipDetails, setIpDetails] = useState<IpDetails | null>(null);
  const [loadingIpDetails, setLoadingIpDetails] = useState(false);

  useEffect(() => {
    fetchSports();
  }, []);

  const getSportNameById = (id: string) =>
    sports.find((sport: any) => String(sport?.id) === String(id))?.name;

  const fetchSports = async () => {
    try {
      const response = await getSportListLord();
      if (response.status) {
        setSports(response.data);
      }
    } catch (error) {
      console.error("Error fetching sports:", error);
    }
  };

  const fetchMarkets = async (sportId: string) => {
    if (!sportId || sportId === "0") {
      setMarkets([]);
      return;
    }
    try {
      const response = await getMarketListSportWiseLord({ sportId });
      if (response.status) {
        setMarkets(response.data);
      }
    } catch (error) {
      console.error("Error fetching markets:", error);
    }
  };

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVal = e.target.value;
    setSportId(newVal);
    fetchMarkets(newVal === "0" ? "" : newVal);
    setMarketName("all");
  };

  const requestCounter = useRef(0);
  const fetchMyBetReport = async (customState: any = {}) => {
    const currentRequest = ++requestCounter.current;
    try {
      setLoading(true);

      const state = {
        sportId,
        userSearch,
        activeTab,
        activeRadio,
        itemsPerPage,
        index,
        fromDate,
        toDate,
        oddsFrom,
        oddsTo,
        stakeFrom,
        stakeTo,
        marketName,
        ...customState
      };

      const currentBet = state.activeTab === "Current";
      const matchedDeletedBet = state.activeRadio.toUpperCase();
      const sportLabel =
        !state.sportId || state.sportId === "0"
          ? "All"
          : getSportNameById(state.sportId) || state.sportId;

      const payload = {
        sportName: sportLabel,
        userId: state.userSearch,
        currentBet: currentBet,
        matchedDeletedBet: matchedDeletedBet,
        noOfRecords: 99999,
        index: 0,
        fromDate: !currentBet
          ? state.fromDate?.toISOString().split("T")[0]
          : "",
        toDate: !currentBet ? state.toDate?.toISOString().split("T")[0] : "",
        oddsFrom: state.oddsFrom,
        oddsTo: state.oddsTo,
        stakeFrom: state.stakeFrom,
        stakeTo: state.stakeTo,
        marketName: state.marketName
      };
      const response = await getMyBetReport(payload);
      if (currentRequest === requestCounter.current) {
        if (response.status) {
          const betData = response.data?.betList || response.data;
          setBetList(Array.isArray(betData) ? betData : []);
          setError(null);
        } else {
          setError(response.message);
          setBetList([]);
        }
      }
    } catch (err) {
      if (currentRequest === requestCounter.current) {
        setError(err.message);
        setBetList([]);
      }
    } finally {
      if (currentRequest === requestCounter.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchMyBetReport();
  }, [activeTab, activeRadio]);

  const handleApply = () => {
    fetchMyBetReport();
  };

  const handleCancel = () => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    setSportId("0");
    setMarketName("all");
    setMarkets([]);
    setUserSearch("");
    setTableSearch("");
    setFromDate(oneWeekAgo);
    setToDate(today);
    setIndex(0);
    setOddsFrom("");
    setOddsTo("");
    setStakeFrom("");
    setStakeTo("");

    fetchMyBetReport({
      sportId: "0",
      userSearch: "",
      fromDate: oneWeekAgo,
      toDate: today,
      index: 0,
      oddsFrom: "",
      oddsTo: "",
      stakeFrom: "",
      stakeTo: "",
      marketName: "all"
    });
  };

  const handleIpDetails = async (ip: string) => {
    setIpDetails(null);
    setShowIpModal(true);
    setLoadingIpDetails(true);

    try {
      const response = await getIpAddressDetailLord({ ipAddress: ip });
      if (response?.data) {
        setIpDetails(response.data);
      } else {
        // Handle cases where data might be missing or in a different format if needed,
        // effectively falling back to a "not found" state or displaying what's available.
        setIpDetails({
          status: "fail",
          message: "No details found",
          query: ip
        });
      }
    } catch (error) {
      setIpDetails({
        status: "fail",
        message: "Failed to fetch details",
        query: ip
      });
    } finally {
      setLoadingIpDetails(false);
    }
  };

  const entriesOptions = [10, 20, 50, 100];
  const tabs = ["Current", "Past"];
  const radioOptions =
    activeTab === "Past"
      ? ["Matched", "Deleted"]
      : ["Matched", "Unmatched", "Deleted"];

  return (
    <>
      <div>
        <div className="bet-list">
          <div className="header">
            <h1>Bet List</h1>{" "}
            <span className="button-options d-inline-block">
              <div id="export_1764346502742" className="">
                <CSVLink
                  data={betList}
                  filename={`bet-list-${
                    new Date().toISOString().split("T")[0]
                  }.csv`}
                  className="btn btn-secondary m-l-5"
                >
                  Download CSV
                </CSVLink>
              </div>
            </span>
          </div>{" "}
          <BetListFilters
            sports={sports}
            markets={markets}
            sportId={sportId}
            marketName={marketName}
            oddsFrom={oddsFrom}
            oddsTo={oddsTo}
            stakeFrom={stakeFrom}
            stakeTo={stakeTo}
            userSearch={userSearch}
            fromDate={fromDate}
            toDate={toDate}
            activeTab={activeTab}
            activeRadio={activeRadio}
            radioOptions={radioOptions}
            onSportChange={handleSportChange}
            onMarketChange={setMarketName}
            onOddsFromChange={setOddsFrom}
            onOddsToChange={setOddsTo}
            onStakeFromChange={setStakeFrom}
            onStakeToChange={setStakeTo}
            onUserSearchChange={setUserSearch}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
            onApply={handleApply}
            onCancel={handleCancel}
            onRadioChange={setActiveRadio}
          />{" "}
          <div className="tabs">
            <div className="">
              <ul role="tablist" className="nav nav-tabs">
                {tabs.map((tab, index) => (
                  <li
                    key={index}
                    role="presentation"
                    className={`nav-item ${activeTab === tab ? "active" : ""}`}
                    onClick={() => {
                      setActiveTab(tab);
                      setActiveRadio("Matched");
                    }}
                  >
                    <a
                      role="tab"
                      aria-selected={activeTab === tab}
                      aria-setsize="2"
                      aria-posinset={index + 1}
                      href="#"
                      target="_self"
                      className={`nav-link ${
                        activeTab === tab ? "active" : ""
                      }`}
                      id={`__BVID__${52 + index * 2}___BV_tab_button__`}
                      aria-controls={`__BVID__${52 + index * 2}`}
                    >
                      {tab}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tab-content" id="__BVID__51__BV_tab_container_">
              <div
                role="tabpanel"
                aria-hidden="false"
                className="tab-pane active"
                id="__BVID__52"
                aria-labelledby="__BVID__52___BV_tab_button__"
              ></div>{" "}
              <div
                role="tabpanel"
                aria-hidden="true"
                className="tab-pane"
                id="__BVID__54"
                aria-labelledby="__BVID__54___BV_tab_button__"
                style={{ display: "none" }}
              ></div>{" "}
              <div className="table-responsive col-sm-12">
                <div className="row col-page">
                  <div className="col-sm-12 col-md-6 p-l-0 p-r-5">
                    <div className="row dataTables_length">
                      <div className="p-l-m col">
                        <label htmlFor="input-small">
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
                            {entriesOptions.map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                          entries
                        </label>
                      </div>
                    </div>
                  </div>{" "}
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
                              value={tableSearch}
                              onChange={(e) => {
                                setTableSearch(e.target.value);
                                setCurrentPage(1);
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="row">
                  <div className="col-sm-12 p-l-0 p-r-5">
                    <table
                      id="mybettadmin"
                      role="table"
                      aria-busy="false"
                      aria-colcount="9"
                      className="table b-table table table-striped b-table-stacked-md"
                    >
                      <thead role="rowgroup" className="">
                        <tr role="row" className="">
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="1"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Place Date</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="2"
                            aria-sort="none"
                            className="position-relative text-left"
                          >
                            <div>Description</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="3"
                            aria-sort="none"
                            className="position-relative text-left"
                          >
                            <div>User name</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="4"
                            aria-sort="none"
                            className="position-relative text-left"
                          >
                            <div>Bet Type</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="5"
                            aria-sort="none"
                            className="position-relative text-right"
                          >
                            <div>User Rate</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="6"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Win/Loss</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="7"
                            className="text-left"
                          >
                            <div>IP</div>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="8"
                            className="text-right"
                          >
                            <div>Browser Details</div>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="9"
                            aria-sort="none"
                            className="position-relative text-right"
                          >
                            <div>Amount</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody role="rowgroup">
                        {(() => {
                          const searchTerm = tableSearch.trim().toLowerCase();
                          const filteredBets =
                            (betList || []).filter((bet) => {
                              if (!searchTerm) return true;
                              const betType =
                                bet?.back === true ||
                                (typeof bet?.back === "string" &&
                                  bet.back.toLowerCase() === "back")
                                  ? "back"
                                  : bet?.back === false ||
                                    (typeof bet?.back === "string" &&
                                      bet.back.toLowerCase() === "lay")
                                  ? "lay"
                                  : "";
                              const haystack = `${JSON.stringify(
                                bet
                              ).toLowerCase()} ${betType}`;
                              return haystack.includes(searchTerm);
                            }) || [];

                          const totalPages = Math.ceil(
                            filteredBets.length / itemsPerPage
                          );
                          const indexOfLastItem = currentPage * itemsPerPage;
                          const indexOfFirstItem =
                            indexOfLastItem - itemsPerPage;
                          const currentBets = filteredBets.slice(
                            indexOfFirstItem,
                            indexOfLastItem
                          );

                          if (loading) {
                            return (
                              <tr>
                                <td colSpan={9} className="text-center">
                                  Loading...
                                </td>
                              </tr>
                            );
                          }

                          if (error) {
                            return (
                              <tr>
                                <td colSpan={9} className="text-center">
                                  {error}
                                </td>
                              </tr>
                            );
                          }

                          if (currentBets.length > 0) {
                            return currentBets.map((bet, index) => (
                              <tr key={index} role="row">
                                <td
                                  aria-colindex="1"
                                  data-label="Place Date"
                                  role="cell"
                                  className="text-center"
                                >
                                  <div>{bet.lastUpdated}</div>
                                </td>
                                <td
                                  aria-colindex="2"
                                  data-label="Description"
                                  role="cell"
                                  className="text-left"
                                >
                                  <div>{bet.selectionName}</div>
                                </td>
                                <td
                                  aria-colindex="3"
                                  data-label="User name"
                                  role="cell"
                                  className="text-left"
                                >
                                  <div>{bet.userId}</div>
                                </td>
                                <td
                                  aria-colindex="4"
                                  data-label="Bet Type"
                                  role="cell"
                                  className="text-left"
                                >
                                  <div>{bet.back ? "BACK" : "LAY"}</div>
                                </td>
                                <td
                                  aria-colindex="5"
                                  data-label="User Rate"
                                  role="cell"
                                  className="text-right"
                                >
                                  <div>{bet.odds.toFixed(2)}</div>
                                </td>
                                <td
                                  aria-colindex="6"
                                  data-label="Win/Loss"
                                  role="cell"
                                  className="text-center"
                                >
                              <div>
                                    {(() => {
                                      const winLossValue = bet.winLoss;
                                      const upperVal =
                                        typeof winLossValue === "string"
                                          ? winLossValue.toUpperCase()
                                          : "";
                                      const className =
                                        upperVal === "WIN"
                                          ? "text-success"
                                          : upperVal === "LOSS"
                                          ? "text-danger"
                                          : "";
                                      const displayText = upperVal || "-";

                                      return (
                                        <span className={className}>
                                          {displayText}
                                        </span>
                                      );
                                    })()}
                                  </div>
                                </td>
                                <td
                                  aria-colindex="7"
                                  data-label="IP"
                                  role="cell"
                                  className="text-left"
                                >
                                  <div className="d-flex align-items-center">
                                    {bet.userIp}
                                    <a
                                      title="IP Details"
                                      href="#"
                                      target="_self"
                                      className=""
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleIpDetails(bet.userIp);
                                      }}
                                    >
                                      <i className="fa fa-eye m-l-5 curser-point float-right"></i>
                                    </a>
                                  </div>
                                </td>
                                <td
                                  aria-colindex="8"
                                  data-label="Browser Details"
                                  role="cell"
                                  className="text-right"
                                >
                                  <div>
                                    <a
                                      href="#"
                                      onClick={(e) => e.preventDefault()}
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="N/A"
                                      className="text-success"
                                    >
                                      Detail
                                    </a>
                                  </div>
                                </td>
                                <td
                                  aria-colindex="9"
                                  data-label="Amount"
                                  role="cell"
                                  className="text-right"
                                >
                                  <div>{bet.matched.toFixed(2)}</div>
                                </td>
                              </tr>
                            ));
                          } else {
                            return (
                              <tr>
                                <td colSpan={9} className="text-center">
                                  No records found
                                </td>
                              </tr>
                            );
                          }
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>{" "}
              </div>
            </div>
            <div className="row">
              <div className="my-1 p-m-l col">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    (
                      betList?.filter(
                        (bet) =>
                          !tableSearch ||
                          JSON.stringify(bet)
                            .toLowerCase()
                            .includes(tableSearch.toLowerCase())
                      ) || []
                    ).length / itemsPerPage
                  )}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <IpDetailsModal
        show={showIpModal}
        handleClose={() => setShowIpModal(false)}
        ipDetails={ipDetails}
        loading={loadingIpDetails}
      />
    </>
  );
};
export default BestList;
