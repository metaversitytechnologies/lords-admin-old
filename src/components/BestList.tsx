const BetList = () => {
  const entriesOptions = [10, 20, 50, 100];
  const tabs = ["Current", "Past"];
  const radioOptions = ["Matched", "Unmatched", "Deleted"];

  return (
    <div className="tabs">
      <div className="bet-list">
        {/* Header */}
        <div className="header">
          <h1>Bet List</h1>
          <span className="button-options d-inline-block">
            <div className="disabled">
              <span className="btn btn-secondary m-l-5">Download CSV</span>
            </div>
          </span>
        </div>

        {/* Filter Form */}
        <form className="m-b-10">
          <div className="additional-filters m-t-10">
            <div className="row">
              <div className="col-sm-12">
                <div className="dropdown long-width d-inline-block v-t">
                  <label className="p-l-5 d-block">Event</label>
                  <select className="dropdown-toggle dropdown-button"></select>
                </div>

                <div className="dropdown long-width m-l-10 d-inline-block v-t">
                  <label className="p-l-5 d-block">Market</label>
                  <select
                    className="dropdown-toggle dropdown-button title"
                    defaultValue="all"
                  >
                    <option value="all">All</option>
                  </select>
                </div>

                <div className="dropdown m-l-10 d-inline-block v-t">
                  <label className="p-l-5 d-block">Rate</label>
                  <button
                    type="button"
                    className="dropdown-toggle dropdown-button"
                  >
                    <span className="title">Odds: All</span>
                    <i className="fas fa-caret-down"></i>
                  </button>
                  <div className="dropdown-menu dropdown-date">
                    <span className="p-2">From</span>
                    <input type="text" className="p-2" />
                    <span className="p-2">To</span>
                    <input type="text" className="p-2" />
                  </div>
                </div>

                <div className="dropdown m-l-10 d-inline-block v-t">
                  <label className="p-l-5 d-block">Amount</label>
                  <button
                    type="button"
                    className="dropdown-toggle dropdown-button"
                  >
                    <span className="title">Stake: All</span>
                    <i className="fas fa-caret-down"></i>
                  </button>
                  <div className="dropdown-menu dropdown-date">
                    <span className="p-2">From</span>
                    <input type="text" className="p-2" />
                    <span className="p-2">To</span>
                    <input type="text" className="p-2" />
                  </div>
                </div>

                <div className="d-inline-block v-t m-l-10">
                  <div className="search-box-container d-inline-block p-l-0 p-r-5">
                    <label className="p-l-5 d-block">Search by user</label>
                    <input
                      type="text"
                      name="uname"
                      placeholder="Enter Atleast 3 character"
                      autoComplete="off"
                      className="event-search"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row m-t-10">
              <div className="col-sm-12 text-right">
                <div className="form-group d-inline-block m-b-0">
                  <button type="submit" className="btn btn-secondary m-l-5">
                    Apply
                  </button>
                  <button type="button" className="btn btn-cancel m-l-5">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Tabs Section */}
        <div className="tabs">
          <ul className="nav nav-tabs">
            {tabs.map((tab, index) => (
              <li key={index} className="nav-item">
                <a
                  href="#"
                  className={`nav-link ${index === 0 ? "active" : ""}`}
                >
                  {tab}
                </a>
              </li>
            ))}
          </ul>

          <div className="tab-content">
            {/* Radio Filter */}
            <div className="col-sm-12 m-b-10 p-l-0 p-r-0">
              <form className="m-b-10">
                <div className="form-group d-inline-block v-t m-b-0 bet-options">
                  {radioOptions.map((option, index) => (
                    <div
                      key={index}
                      className="custom-control custom-control-inline custom-radio"
                    >
                      <input
                        type="radio"
                        name="bet-status"
                        id={`radio-${index}`}
                        className="custom-control-input"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`radio-${index}`}
                      >
                        <span>{option}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </form>
            </div>

            {/* Table Controls */}
            <div className="table-responsive col-sm-12">
              <div className="row col-page">
                <div className="col-sm-12 col-md-6 p-l-0 p-r-5">
                  <label className="form-label">
                    Show{" "}
                    <select className="form-control custom-select custom-select-sm">
                      {entriesOptions.map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>{" "}
                    entries
                  </label>
                </div>

                <div className="col-sm-12 col-md-6 text-right">
                  <label>
                    Search:{" "}
                    <input
                      type="text"
                      placeholder="Type to Search"
                      className="form-control form-control-sm"
                    />
                  </label>
                </div>
              </div>

              {/* Bet Table */}
              <table className="table table-striped b-table table-stacked-md">
                <thead>
                  <tr>
                    <th className="text-center">Place Date</th>
                    <th className="text-left">Description</th>
                    <th className="text-left">User Name</th>
                    <th className="text-left">Bet Type</th>
                    <th className="text-right">User Rate</th>
                    <th className="text-center">Win/Loss</th>
                    <th className="text-left">IP</th>
                    <th className="text-right">Browser Details</th>
                    <th className="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={9}>
                      <p className="text-center m-0">
                        There are no records to show
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Pagination */}
              <ul className="pagination justify-content-end my-0">
                <li className="page-item disabled">
                  <span className="page-link">«</span>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">‹</span>
                </li>
                <li className="page-item active">
                  <button className="page-link">1</button>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">›</span>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">»</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetList;
