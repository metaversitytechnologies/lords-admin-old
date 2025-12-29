import { useState, useEffect, useCallback, useRef } from "react";
import { getBetTicker } from "../api/auth";
import { getSportListLord, getMarketListSportWiseLord } from "../api/reports";
import SearchUser from "./SearchUser";
import Pagination from "./Pagination";
import { formatDateTime } from "../utils/formatDateTime";

const BetTicker = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sports, setSports] = useState<any[]>([]);
  const [markets, setMarkets] = useState<any[]>([]);
  const [marketName, setMarketName] = useState("all");
  const [oddsDropdownOpen, setOddsDropdownOpen] = useState(false);
  const [stakeDropdownOpen, setStakeDropdownOpen] = useState(false);
  const [counter, setCounter] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pollingEnabled, setPollingEnabled] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const oddsDropdownRef = useRef(null);
  const stakeDropdownRef = useRef(null);

  // Filter States
  const [filters, setFilters] = useState({
    sportName: "",
    marketName: "all",
    minStake: "",
    maxStake: "",
    minOdds: "",
    maxOdds: "",
    userId: ""
  });
  const [validationError, setValidationError] = useState("Please Select Event");

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const fetchData = useCallback(
    async (showLoading = true, filterSource = appliedFilters) => {
      const activeFilters = filterSource || appliedFilters;

      if (!activeFilters.sportName) {
        if (showLoading) setLoading(false);
        return;
      }

      if (showLoading) {
        setLoading(true);
      }
      setError(null);
      try {
        const payload = {
          sportName: activeFilters.sportName,
          marketName: activeFilters.marketName || "all",
          minStake: activeFilters.minStake || null,
          maxStake: activeFilters.maxStake || null,
          minOdds: activeFilters.minOdds || null,
          maxOdds: activeFilters.maxOdds || null,
          userId: activeFilters.userId || null
        };
        const response = await getBetTicker(payload);
        const noPermission =
          response?.message?.toLowerCase() ===
          "you do not have permission".toLowerCase();

        if (noPermission) {
          setPollingEnabled(false);
          throw new Error(response.message || "Failed to fetch data");
        }

        setBets(response.data);
        setPollingEnabled(true);
      } catch (err) {
        setError(err.message);
        if (showLoading) {
          setBets([]);
        }
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    [appliedFilters]
  );

  useEffect(() => {
    fetchSports();
  }, []);

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
    if (!sportId) {
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

  useEffect(() => {
    if (currentPage === 1 && searchTerm === "" && pollingEnabled) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter === 1) {
            fetchData(false);
            return 3;
          }
          return prevCounter - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [fetchData, currentPage, searchTerm, pollingEnabled]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        oddsDropdownRef.current &&
        !oddsDropdownRef.current.contains(event.target)
      ) {
        setOddsDropdownOpen(false);
      }
      if (
        stakeDropdownRef.current &&
        !stakeDropdownRef.current.contains(event.target)
      ) {
        setStakeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    if (field === "sportName" && value) {
      setValidationError("");
    }
  };

  const handleApply = (e) => {
    e.preventDefault();
    if (!filters.sportName) {
      setValidationError("Please Select Event");
      return;
    }
    setAppliedFilters(filters);
    fetchData(true, filters);
  };

  const handleCancel = () => {
    const defaultFilters = {
      sportName: "",
      marketName: "all",
      minStake: "",
      maxStake: "",
      minOdds: "",
      maxOdds: "",
      userId: ""
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setMarketName("all");
    setValidationError("Please Select Event");
    setBets([]); // Clear data on cancel to match "initially data should not show" state if desired, or stay same.
    // Given "initially data should not show", reverting to empty state implies clearing data.
  };

  const getPnlStyle = (pnl) => {
    if (pnl >= 0) {
      return { color: "rgb(60, 210, 71)" };
    }
    return { color: "red" };
  };

  return (
    <section>
      <div>
        <div>
          <div className="header">
            <form
              data-vv-scope="myBets"
              className="m-b-10"
              onSubmit={handleApply}
            >
              <div className="header">
                <h1>Bet Ticker</h1>
              </div>
              <div className="additional-filters m-t-10">
                <div className="dropdown long-width d-inline-block v-t">
                  <select
                    name="event"
                    className="dropdown-toggle dropdown-button"
                    style={{ border: validationError ? "1px solid red" : "" }}
                    value={filters.sportName}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleFilterChange("sportName", val);
                      handleFilterChange("marketName", "all");
                      fetchMarkets(val);
                      setMarketName("all");
                    }}
                  >
                    {/* <option value="" disabled>
                      Select Event
                    </option> */}
                    <option value="">Select Event</option>
                    {sports.map((sport: any, index: number) => (
                      <option key={index} value={sport.id ?? sport.name}>
                        {sport.name}
                      </option>
                    ))}
                  </select>
                  {validationError && (
                    <span
                      className="text-danger"
                      style={{
                        display: "block",
                        fontSize: "12px",
                        marginTop: "5px"
                      }}
                    >
                      {validationError}
                    </span>
                  )}
                </div>
                <div className="dropdown long-width m-l-10 d-inline-block v-t">
                  <select
                    className="dropdown-toggle dropdown-button title"
                    value={marketName}
                    onChange={(e) => {
                      setMarketName(e.target.value);
                      handleFilterChange("marketName", e.target.value);
                    }}
                  >
                    <option value="all">All</option>
                    {markets
                      .filter(
                        (market: any) =>
                          market?.name?.toLowerCase() !== "all" && market?.name
                      )
                      .map((market: any, index: number) => (
                        <option key={index} value={market.id ?? market.name}>
                          {market.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div
                  className="dropdown m-l-10 d-inline-block v-t"
                  ref={oddsDropdownRef}
                >
                  <button
                    type="button"
                    data-toggle="dropdown"
                    className="dropdown-toggle dropdown-button"
                    aria-expanded={oddsDropdownOpen}
                    onClick={() => setOddsDropdownOpen(!oddsDropdownOpen)}
                  >
                    <span className="title">Odds: All</span>
                    <i className="fas fa-caret-down"></i>
                  </button>
                  <div
                    className={`dropdown-menu dropdown-date ${
                      oddsDropdownOpen ? "show" : ""
                    }`}
                  >
                    <span className="p-t-10 p-l-10 p-r-10 p-b-10">From</span>
                    <input
                      type="text"
                      name=""
                      className="p-t-10 p-l-10 p-r-10 p-b-10"
                      value={filters.minOdds}
                      onChange={(e) =>
                        handleFilterChange("minOdds", e.target.value)
                      }
                    />
                    <span className="p-t-10 p-l-10 p-r-10 p-b-10">To</span>
                    <input
                      type="text"
                      name="turate"
                      className="p-t-10 p-l-10 p-r-10 p-b-10"
                      value={filters.maxOdds}
                      onChange={(e) =>
                        handleFilterChange("maxOdds", e.target.value)
                      }
                    />
                    <span className="text-danger error-account"></span>
                  </div>
                </div>
                <div
                  className="dropdown m-l-10 d-inline-block v-t"
                  ref={stakeDropdownRef}
                >
                  <button
                    type="button"
                    data-toggle="dropdown"
                    className="dropdown-toggle dropdown-button"
                    aria-expanded={stakeDropdownOpen}
                    onClick={() => setStakeDropdownOpen(!stakeDropdownOpen)}
                  >
                    <span className="title">Stake: All</span>
                    <i className="fas fa-caret-down"></i>
                  </button>
                  <div
                    className={`dropdown-menu dropdown-date ${
                      stakeDropdownOpen ? "show" : ""
                    }`}
                  >
                    <span className="p-t-10 p-l-10 p-r-10 p-b-10">From</span>
                    <input
                      type="text"
                      name=""
                      className="p-t-10 p-l-10 p-r-10 p-b-10"
                      value={filters.minStake}
                      onChange={(e) =>
                        handleFilterChange("minStake", e.target.value)
                      }
                    />
                    <span className="p-t-10 p-l-10 p-r-10 p-b-10">To</span>
                    <input
                      type="text"
                      name="tamt"
                      className="p-t-10 p-l-10 p-r-10 p-b-10"
                      value={filters.maxStake}
                      onChange={(e) =>
                        handleFilterChange("maxStake", e.target.value)
                      }
                    />
                    <span className="text-danger error-account"></span>
                  </div>
                </div>
                <div className="d-inline-block v-t m-l-10">
                  <div className="search-box-container d-inline-block p-l-0 p-r-5">
                    <SearchUser
                      value={filters.userId}
                      onChange={(value) => handleFilterChange("userId", value)}
                      placeholder="Enter Atleast 3 character"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary m-l-5">
                  Apply
                </button>
                <button
                  type="button"
                  className="btn btn-cancel m-l-5"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <div className="float-right">
                  <span className="counter">{counter}</span>
                  <button
                    type="button"
                    className="btn btn-secondary m-l-10"
                    onClick={() => {
                      fetchData();
                      setCounter(3);
                    }}
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </form>
            <div className="table-responsive expandable-table">
              {bets?.length > 0 && (
                <span className="table-control" onClick={toggleExpand}>
                  <i
                    className={`fas ${
                      isExpanded ? "fa-arrow-left" : "fa-arrow-right"
                    }`}
                  ></i>
                </span>
              )}
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
                    {/* <div className="row">
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
                    </div> */}
                  </div>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Event Name</th>
                    <th>Market</th>
                    <th>Selection</th>
                    <th>Odds req</th>
                    <th
                      className={`${
                        !isExpanded ? "hidden-field" : "field-show"
                      }`}
                    >
                      Ave. Matched
                    </th>
                    <th>Matched</th>
                    <th>Currency</th>
                    <th>Profit/liability</th>
                    <th
                      className={`${
                        !isExpanded ? "hidden-field" : "field-show"
                      }`}
                    >
                      Last Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={10} className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={10} className="text-center">
                        {error}
                      </td>
                    </tr>
                  ) : bets?.length > 0 ? (
                    bets
                      .filter(
                        (bet) =>
                          !searchTerm ||
                          Object.values(bet).some((val) =>
                            String(val)
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                      )
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((bet, index) => (
                        <tr key={index}>
                          <td className="text-left">{bet.userId}</td>
                          <td className="text-left">
                            {bet.matchName || "N/A"}
                          </td>
                          <td className="text-left">{bet.marketName}</td>
                          <td
                            className={`text-left text-dark ${
                              bet.back ? "back" : "lay"
                            }`}
                          >
                            {bet.selectionName}
                          </td>
                          <td className="text-left">{bet.odds.toFixed(2)}</td>
                          <td
                            className={`text-left ${
                              !isExpanded ? "hidden-field" : "field-show"
                            }`}
                          >
                            {bet.avgMatched.toFixed(2)}
                          </td>
                          <td className="text-left">
                            {bet.matched.toFixed(2)}
                          </td>
                          <td className="text-left">{bet.currency}</td>
                          <td className="text-left">
                            <b>
                              <span style={getPnlStyle(bet.profitLiability)}>
                                {bet.profitLiability.toFixed(2)}
                              </span>
                            </b>
                          </td>
                          <td
                            className={`text-left ${
                              !isExpanded ? "hidden-field" : "field-show"
                            }`}
                          >
                            {formatDateTime(bet.lastUpdated, {
                              order: "mdy"
                            })}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="text-center">
                        no records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  bets.filter(
                    (bet) =>
                      !searchTerm ||
                      Object.values(bet).some((val) =>
                        String(val)
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                  ).length / itemsPerPage
                )}
                onPageChange={setCurrentPage}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetTicker;
