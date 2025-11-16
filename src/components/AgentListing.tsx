import { Link } from "react-router-dom";
const AgentListing = () => {
  return (
    <div className="apl-section">
      <div className="header">
        <h1>Agent Listing</h1>

        {/* Search Section */}
        <div className="d-inline-block m-t-10">
          <label>Search By User Name</label>
          <div className="search-box-container d-inline-block p-l-0">
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
        <div className="button-options">
          <Link to="/createagent" className="btn btn-primary m-l-5">
            New Agent
          </Link>
        </div>

        <div className="button-options">
          <div id="export_csv">
            <span className="btn btn-secondary m-l-5">Download CSV</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-responsive expandable-table">
        <div className="m-b-10">
          <ul>
            <li>
              <span>
                <i>Downline Listing</i>
              </span>
            </li>
          </ul>
        </div>

        <span className="table-control">
          <i className="fas fa-arrow-right"></i>
        </span>

        <table className="table table-striped agent-listing">
          <thead>
            <tr>
              <th className="text-left">Login Name</th>
              <th className="text-left">Account Type</th>
              <th className="text-center">Downline</th>
              <th className="text-center">Betting Status</th>
              <th className="text-center">Status</th>
              <th className="text-center">Details</th>
              <th className="text-right">Net Exposure</th>
              <th className="text-right">G/T</th>
              <th className="text-right">
                Credit Limit
                <br />
                2000.00
              </th>
              <th className="text-right">Available Credit</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="text-left">
                <span>
                  <a
                    href="#"
                    title="create"
                    style={{
                      pointerEvents: "visible",
                      textDecoration: "none"
                    }}
                  >
                    clishak
                  </a>
                </span>
              </td>

              <td className="text-left">
                <span>User</span>
              </td>

              <td className="text-center">
                <span>
                  <a href="#" className="text text-dark username">
                    <i className="fas fa-sitemap"></i>
                  </a>
                </span>
              </td>

              <td className="text-center">
                <span>
                  <a href="#" className="text text-dark username">
                    <i className="fas fa-unlock positive unlock-icon"></i>
                  </a>
                </span>
              </td>

              <td className="text-center">
                <span>ACTIVE</span>
              </td>

              <td className="text-center">
                <a
                  href="/downlineactivity/NmRiZDQ0N2YtNDU1OS00NWIwLTg5YjYtOTg4ZWU4OGVmOTEx/clishak"
                  className="text text-info"
                  style={{ pointerEvents: "visible" }}
                >
                  <i className="fas fa-eye"></i>
                </a>
              </td>

              <td className="text-right positive negative">
                <span>0.00</span>
              </td>

              <td className="text-right positive">
                <span className="negative">193.00</span>
              </td>

              <td className="text-right">
                <span>2000.00</span>
              </td>

              <td className="text-right">
                <span>2193.00</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentListing;
