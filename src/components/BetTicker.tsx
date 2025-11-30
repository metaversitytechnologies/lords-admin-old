import { useState, useEffect, useCallback } from "react";
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

  // Filter States
  const [sportName, setSportName] = useState("All");
  const [minStake, setMinStake] = useState("");
  const [maxStake, setMaxStake] = useState("");
  const [minOdds, setMinOdds] = useState("");
  const [maxOdds, setMaxOdds] = useState("");
  const [userId, setUserId] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        sportName: sportName.toLowerCase(),
        minStake: minStake || null,
        maxStake: maxStake || null,
        minOdds: minOdds || null,
        maxOdds: maxOdds || null,
        userId: userId || null
      };
      const response = await getBetTicker(payload);
      if (response.status) {
        setBets(response.data);
      } else {
        throw new Error(response.message || "Failed to fetch data");
      }
    } catch (err) {
      setError(err.message);
      setBets([]);
    } finally {
      setLoading(false);
    }
  }, [sportName, minStake, maxStake, minOdds, maxOdds, userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter === 1) {
          fetchData();
          return 3;
        }
        return prevCounter - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [fetchData]);

  const handleApply = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleCancel = () => {
    setSportName("All");
    setMinStake("");
    setMaxStake("");
    setMinOdds("");
    setMaxOdds("");
    setUserId("");
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
                    value={sportName}
                    onChange={(e) => setSportName(e.target.value)}
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
                <div className="dropdown m-l-10 d-inline-block v-t">
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
                      value={minOdds}
                      onChange={(e) => setMinOdds(e.target.value)}
                    />
                    <span className="p-t-10 p-l-10 p-r-10 p-b-10">To</span>
                    <input
                      type="text"
                      name="turate"
                      className="p-t-10 p-l-10 p-r-10 p-b-10"
                      value={maxOdds}
                      onChange={(e) => setMaxOdds(e.target.value)}
                    />
                    <span className="text-danger error-account"></span>
                  </div>
                </div>
                <div className="dropdown m-l-10 d-inline-block v-t">
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
                      value={minStake}
                      onChange={(e) => setMinStake(e.target.value)}
                    />
                    <span className="p-t-10 p-l-10 p-r-10 p-b-10">To</span>
                    <input
                      type="text"
                      name="tamt"
                      className="p-t-10 p-l-10 p-r-10 p-b-10"
                      value={maxStake}
                      onChange={(e) => setMaxStake(e.target.value)}
                    />
                    <span className="text-danger error-account"></span>
                  </div>
                </div>
                <div className="d-inline-block v-t m-l-10">
                  <div className="search-box-container d-inline-block p-l-0 p-r-5">
                    <SearchUser
                      value={userId}
                      onChange={setUserId}
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
