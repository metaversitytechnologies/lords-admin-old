import { useState, useEffect, useCallback, useRef } from "react";
import { getBetTicker } from "../api/auth";
import SearchUser from "./SearchUser";

const events = [
  "All",
  "Football",
  "Tennis",
  "Cricket",
  "Boxing",
  "Motor Sport",
  "Teen Patti Oneday",
  "Teen Patti Test",
  "Teen Patti 20",
  "Poker 20",
  "Poker Oneday",
  "Andar Bahar",
  "Worli",
  "3 Card Judgement",
  "Poker 9",
  "32 Card A",
  "Lottery",
  "Open Teenpatti",
  "Instant Worli",
  "Lucky 7",
  "20-20 Dragon Tiger",
  "Bollywood Table",
  "Amar Akbar Anthony",
  "1Day Dragon Tiger",
  "32 Card B",
  "Casino War",
  "20-20 Dragon Tiger Lion",
  "Casino Meter",
  "20-20 Cricket Match",
  "Lucky 7 - B",
  "Baccarat",
  "Andar Bahar 2",
  "Baccarat2",
  "20-20 Dragon Tiger 2",
  "Muflis Teenpatti",
  "Kabaddi",
  "Sic Bo",
  "Teenpatti Joker",
  "Lucky 15",
  "Dus ka Dum",
  "29Card Baccarat",
  "Race to 17",
  "20-20 Teenpatti C",
  "Table Tennis",
  "Badminton",
  "Darts",
  "Basketball",
  "Election",
  "Mixed Martial Arts"
];

const BetTicker = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [oddsDropdownOpen, setOddsDropdownOpen] = useState(false);
  const [stakeDropdownOpen, setStakeDropdownOpen] = useState(false);
  const [counter, setCounter] = useState(3);

  const oddsDropdownRef = useRef(null);
  const stakeDropdownRef = useRef(null);

  // Filter States
  const [filters, setFilters] = useState({
    sportName: "All",
    minStake: "",
    maxStake: "",
    minOdds: "",
    maxOdds: "",
    userId: ""
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const fetchData = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    setError(null);
    try {
      const payload = {
        sportName: appliedFilters.sportName.toLowerCase(),
        minStake: appliedFilters.minStake || null,
        maxStake: appliedFilters.maxStake || null,
        minOdds: appliedFilters.minOdds || null,
        maxOdds: appliedFilters.maxOdds || null,
        userId: appliedFilters.userId || null
      };
      const response = await getBetTicker(payload);
      if (response.status) {
        setBets(response.data);
      } else {
        throw new Error(response.message || "Failed to fetch data");
      }
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
  }, [appliedFilters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
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
  }, [fetchData]);

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
  };

  const handleApply = (e) => {
    e.preventDefault();
    setAppliedFilters(filters);
  };

  const handleCancel = () => {
    const defaultFilters = {
      sportName: "All",
      minStake: "",
      maxStake: "",
      minOdds: "",
      maxOdds: "",
      userId: ""
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  const getPnlStyle = (pnl) => {
    if (pnl >= 0) {
      return { color: "rgb(60, 210, 71)" };
    }
    return { color: "red" };
  };

  return (
    <section className="apl-section">
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
                    value={filters.sportName}
                    onChange={(e) =>
                      handleFilterChange("sportName", e.target.value)
                    }
                  >
                    {events.map((event) => (
                      <option key={event} value={event}>
                        {event}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="dropdown long-width m-l-10 d-inline-block v-t">
                  <select className="dropdown-toggle dropdown-button title">
                    <option value="all">All</option>
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
                <button type="submit" className="btn btn-secondary m-l-5">
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
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Event Name</th>
                    <th>Market</th>
                    <th>Selection</th>
                    <th>Odds req</th>
                    <th>Ave. Matched</th>
                    <th>Matched</th>
                    <th>Currency</th>
                    <th>Profit/liability</th>
                    <th>Last Update</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="10" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="10" className="text-center">
                        {error}
                      </td>
                    </tr>
                  ) : bets.length > 0 ? (
                    bets.map((bet, index) => (
                      <tr key={index}>
                        <td className="text-left">{bet.userId}</td>
                        <td className="text-left">{bet.matchName || "N/A"}</td>
                        <td className="text-left">{bet.marketName}</td>
                        <td
                          className={`text-left text-dark ${
                            bet.back ? "back" : "lay"
                          }`}
                        >
                          {bet.selectionName}
                        </td>
                        <td className="text-left">{bet.odds.toFixed(2)}</td>
                        <td className="text-left">
                          {bet.avgMatched.toFixed(2)}
                        </td>
                        <td className="text-left">{bet.matched.toFixed(2)}</td>
                        <td className="text-left">{bet.currency}</td>
                        <td className="text-left">
                          <b>
                            <span style={getPnlStyle(bet.profitLiability)}>
                              {bet.profitLiability.toFixed(2)}
                            </span>
                          </b>
                        </td>
                        <td className="text-left">{bet.lastUpdated}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
                        no records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetTicker;
