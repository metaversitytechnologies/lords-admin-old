/**
 * Matched / Unmatched tab area with coupon table.
 * Keeps the original tab markup and two tables.
 */
const MatchedUnmatched = ({ matched = [], unmatched = [] }) => (
  <div className="matched-data mt-2 p-l-5 m-b-10">
    <div className="nav-title p-0">
      <ul role="tablist" className="nav nav-tabs">
        <li className="nav-item d-inline-block">
          <a data-toggle="tab" href="#matched-bet" className="nav-link active">
            Matched
          </a>
        </li>
        <li className="nav-item d-inline-block">
          <a data-toggle="tab" href="#unmatched-bet" className="nav-link">
            Unmatched
          </a>
        </li>
      </ul>
    </div>

    <ul className="d-inline-block float-right">
      <li className="d-inline-block v-t">
        <div className="form-group d-inline-block m-l-20 m-r-30">
          <a href="#" className="btn btn-primary max-bet-button">
            View More
          </a>
        </div>
      </li>
      <li className="d-inline-block v-t">
        <div className="live-tv-icon">
          <span className="m-b-0">
            <i className="fas fa-tv m-r-5"></i>Live TV
          </span>
        </div>
      </li>
    </ul>

    <div className="tab-content account-modal">
      <div id="matched-bet" className="tab-pane active">
        <div className="select-sauda">
          <div
            id="dropdown-left"
            className="dropdown b-dropdown m-t-15 m-b-10 btn-group"
          >
            <button
              id="dropdown-left__BV_toggle_"
              aria-haspopup="menu"
              aria-expanded="false"
              type="button"
              className="btn dropdown-toggle btn-primary"
            >
              All
            </button>
            <ul
              role="menu"
              tabIndex="-1"
              aria-labelledby="dropdown-left__BV_toggle_"
              className="dropdown-menu"
            ></ul>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div className="table-responsive">
            <table className="table coupon-table m-b-0">
              <thead>
                <tr>
                  <th style={{ minWidth: "100px" }}>UserName</th>
                  <th style={{ minWidth: "80px" }}>Mname</th>
                  <th style={{ minWidth: "180px" }}>Nation</th>
                  <th style={{ minWidth: "60px" }}>Type</th>
                  <th style={{ minWidth: "60px" }}>Userrate</th>
                  <th style={{ minWidth: "80px" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {matched.length === 0 ? (
                  <tr className="back">
                    <td colSpan="6" className="text-center">
                      no records found
                    </td>
                  </tr>
                ) : (
                  matched.map((m, i) => (
                    <tr className="back" key={i}>
                      <td>
                        {m.username}
                        <a
                          title="User Detail"
                          href="#"
                          target="_self"
                          className=""
                        >
                          <i className="fa fa-eye m-l-5 curser-point float-right"></i>
                        </a>
                      </td>
                      <td>{m.mname}</td>
                      <td>{m.nation}</td>
                      <td>{m.type}</td>
                      <td>{m.userrate}</td>
                      <td>{m.amount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <span className="table-control">
            <i className="fas fa-arrow-right"></i>
          </span>
        </div>
      </div>

      <div id="unmatched-bet" className="tab-pane">
        <div className="table-responsive">
          <table className="table coupon-table m-b-0">
            <thead>
              <tr>
                <th style={{ minWidth: "100px" }}>UserName</th>
                <th style={{ minWidth: "80px" }}>Mname</th>
                <th style={{ minWidth: "150px" }}>Nation</th>
                <th style={{ minWidth: "60px" }}>Type</th>
                <th style={{ minWidth: "60px" }}>Userrate</th>
                <th style={{ minWidth: "80px" }}>Amount</th>
                <th style={{ minWidth: "50px" }}>Currency</th>
                <th style={{ minWidth: "150px" }}>PlaceDate</th>
              </tr>
            </thead>
            <tbody>
              {unmatched.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    There are no records to show
                  </td>
                </tr>
              ) : (
                unmatched.map((u, i) => (
                  <tr key={i}>
                    <td>{u.username}</td>
                    <td>{u.mname}</td>
                    <td>{u.nation}</td>
                    <td>{u.type}</td>
                    <td>{u.userrate}</td>
                    <td>{u.amount}</td>
                    <td>{u.currency}</td>
                    <td>{u.placeDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default MatchedUnmatched;
