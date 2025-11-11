import React from "react";

const BetTicker = () => {
  // Event options
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

  return (
    <div className="tabs">
      <div className="header">
        <form className="m-b-10">
          <div className="header">
            <h1>Bet Ticker</h1>
          </div>

          <div className="additional-filters m-t-10">
            {/* Event Dropdown */}
            <div className="dropdown long-width d-inline-block v-t">
              <select name="event" className="dropdown-toggle dropdown-button">
                {events.map((event, index) => (
                  <option key={index} value={event.toLowerCase()}>
                    {event}
                  </option>
                ))}
              </select>
              <span className="text-danger error-report">
                Please Select Event
              </span>
            </div>

            {/* Title Dropdown */}
            <div className="dropdown long-width m-l-10 d-inline-block v-t">
              <select
                className="dropdown-toggle dropdown-button title"
                defaultValue="all"
              >
                <option value="all">All</option>
              </select>
            </div>

            {/* Odds Filter */}
            <div className="dropdown m-l-10 d-inline-block v-t">
              <button type="button" className="dropdown-toggle dropdown-button">
                <span className="title">Odds: All</span>{" "}
                <i className="fas fa-caret-down"></i>
              </button>
              <div className="dropdown-menu dropdown-date">
                <span className="p-2">From</span>
                <input type="text" className="p-2" />
                <span className="p-2">To</span>
                <input type="text" name="turate" className="p-2" />
              </div>
            </div>

            {/* Stake Filter */}
            <div className="dropdown m-l-10 d-inline-block v-t">
              <button type="button" className="dropdown-toggle dropdown-button">
                <span className="title">Stake: All</span>{" "}
                <i className="fas fa-caret-down"></i>
              </button>
              <div className="dropdown-menu dropdown-date">
                <span className="p-2">From</span>
                <input type="text" className="p-2" />
                <span className="p-2">To</span>
                <input type="text" name="tamt" className="p-2" />
              </div>
            </div>

            {/* Search Box */}
            <div className="d-inline-block v-t m-l-10">
              <div className="search-box-container d-inline-block p-l-0 p-r-5">
                <input
                  type="text"
                  name="uname"
                  placeholder="Enter Atleast 3 character"
                  autoComplete="off"
                  className="event-search"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <button type="submit" className="btn btn-secondary m-l-5">
              Apply
            </button>
            <button type="button" className="btn btn-cancel m-l-5">
              Cancel
            </button>

            <div className="float-right">
              <span className="counter">1</span>
              <button type="button" className="btn btn-secondary m-l-10">
                Refresh
              </button>
            </div>
          </div>
        </form>

        {/* Bet Table */}
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
              <tr>
                <td colSpan="11" className="text-center">
                  no records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BetTicker;
