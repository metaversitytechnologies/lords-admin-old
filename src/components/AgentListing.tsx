import React, { useState } from "react";
import { Link } from "react-router-dom";
import UpdateUser from "./UpdateUser";

const AgentListing: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const openUpdateModal = (username: string) => {
    setSelectedUser(username);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedUser("");
  };

  return (
    <section className="apl-section">
      <div className="header">
        <h1>Agent Listing</h1>
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
        <div className="button-options">
          <Link to="/createagent" className="btn btn-primary m-l-5">
            New Agent
          </Link>
        </div>
        <div className="button-options">
          <div id="export_1763382226360" className="">
            <span className="btn btn-secondary m-l-5">Download CSV</span>
          </div>
        </div>
      </div>
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
        <span className="table-control" onClick={toggleExpand}>
          <i
            className={`fas ${isExpanded ? "fa-arrow-left" : "fa-arrow-right"}`}
          ></i>
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
                3950.00
              </th>
              <th className="text-right">Available Credit</th>
              <th
                className={`text-right ${
                  !isExpanded ? "hidden-field" : "field-show"
                }`}
              >
                Created
              </th>
              <th
                className={`text-right ${
                  !isExpanded ? "hidden-field" : "field-show"
                }`}
              >
                Last Login
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left">
                <span>
                  <a
                    href="#"
                    title="Create"
                    data-placement="top"
                    onClick={(e) => {
                      e.preventDefault();
                      openUpdateModal("agtshak");
                    }}
                    style={{ pointerEvents: "visible", textDecoration: "none" }}
                  >
                    agtshak
                  </a>
                </span>
              </td>
              <td className="text-left">
                <span>Agent</span>
              </td>
              <td className="text-center">
                <span>
                  <Link
                    to="/agentlisting/MzM2OTE2MWEtNWI0OS00MTdiLWE5YWUtZTIyMDhhMzYzZjky/1763382225538"
                    className="text text-info"
                    data-placement="top"
                    style={{ pointerEvents: "visible" }}
                  >
                    <i className="fas fa-sitemap"></i>
                  </Link>
                </span>
              </td>
              <td className="text-center">
                <span>
                  <a
                    href="javascript:void(0)"
                    data-placement="top"
                    onClick={() => false}
                    data-original-title="Betting Unlocked"
                    className="text text-dark username"
                  >
                    <i className="fas fa-unlock positive unlock-icon"></i>
                  </a>
                </span>
              </td>
              <td className="text-center">
                <span>ACTIVE</span>
              </td>
              <td className="text-center">
                <Link
                  to="/downlinereports/MzM2OTE2MWEtNWI0OS00MTdiLWE5YWUtZTIyMDhhMzYzZjky/agtshak"
                  className="text text-info"
                  data-placement="top"
                  style={{ pointerEvents: "visible" }}
                >
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
              <td className="text-right positive negative">
                <span>0.00</span>
              </td>
              <td className="text-right positive">
                <span className="positive">-10.50</span>
              </td>
              <td className="text-right">
                <span>2050.00 </span>
              </td>
              <td className="text-right">
                <span>42.00</span>
              </td>
              <td
                className={`text-right ${
                  !isExpanded ? "hidden-field" : "field-show"
                }`}
              >
                29/10/2025 07:19:54 PM
              </td>
              <td
                className={`text-right ${
                  !isExpanded ? "hidden-field" : "field-show"
                }`}
              >
                17/11/2025 12:40:41 AM
              </td>
            </tr>
            <tr>
              <td className="text-left">
                <span>
                  <a
                    href="#"
                    title="f"
                    data-placement="top"
                    onClick={(e) => {
                      e.preventDefault();
                      openUpdateModal("ggg121");
                    }}
                    style={{ pointerEvents: "visible", textDecoration: "none" }}
                  >
                    ggg121
                  </a>
                </span>
              </td>
              <td className="text-left">
                <span>User</span>
              </td>
              <td className="text-center">
                <span>
                  <a
                    href="javascript:void(0)"
                    data-placement="top"
                    onClick={() => false}
                    className="text text-dark username"
                  >
                    <i className="fas fa-sitemap"></i>
                  </a>
                </span>
              </td>
              <td className="text-center">
                <span>
                  <a
                    href="javascript:void(0)"
                    data-placement="top"
                    onClick={() => false}
                    data-original-title="Betting Unlocked"
                    className="text text-dark username"
                  >
                    <i className="fas fa-unlock positive unlock-icon"></i>
                  </a>
                </span>
              </td>
              <td className="text-center">
                <span>ACTIVE</span>
              </td>
              <td className="text-center">
                <Link
                  to="/downlinereports/YzRiMDE5YjEtOWMzMC00OThhLWI2YmQtMDUwNGU5NTc1MDEw/ggg121"
                  className="text text-info"
                  data-placement="top"
                  style={{ pointerEvents: "visible" }}
                >
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
              <td className="text-right positive negative">
                <span>0.00</span>
              </td>
              <td className="text-right positive">
                <span className="negative">132.00</span>
              </td>
              <td className="text-right">
                <span>800.00 </span>
              </td>
              <td className="text-right">
                <span> 932.00</span>
              </td>
              <td
                className={`text-right ${
                  !isExpanded ? "hidden-field" : "field-show"
                }`}
              >
                02/11/2025 03:34:48 PM
              </td>
              <td
                className={`text-right ${
                  !isExpanded ? "hidden-field" : "field-show"
                }`}
              >
                12/11/2025 07:42:55 PM
              </td>
            </tr>
            <tr>
              <td className="text-left">
                <span>
                  <a
                    href="#"
                    title="this is for me"
                    data-placement="top"
                    onClick={(e) => {
                      e.preventDefault();
                      openUpdateModal("NewAgentXYZ");
                    }}
                    style={{ pointerEvents: "visible", textDecoration: "none" }}
                  >
                    NewAgentXYZ
                  </a>
                </span>
              </td>
              <td className="text-left">
                <span>Agent</span>
              </td>
              <td className="text-center">
                <span>
                  <Link
                    to="/agentlisting/MmIxZDgyZmEtYTIyNS00ZWUxLWJhMzgtYzkxMDgxM2I0MTEz/1763382225538"
                    className="text text-info"
                    data-placement="top"
                    style={{ pointerEvents: "visible" }}
                  >
                    <i className="fas fa-sitemap"></i>
                  </Link>
                </span>
              </td>
              <td className="text-center">
                <span>
                  <a
                    href="javascript:void(0)"
                    data-placement="top"
                    onClick={() => false}
                    data-original-title="Betting Unlocked"
                    className="text text-dark username"
                  >
                    <i className="fas fa-unlock positive unlock-icon"></i>
                  </a>
                </span>
              </td>
              <td className="text-center">
                <span>ACTIVE</span>
              </td>
              <td className="text-center">
                <Link
                  to="/downlinereports/MmIxZDgyZmEtYTIyNS00ZWUxLWJhMzgtYzkxMDgxM2I0MTEz/NewAgentXYZ"
                  className="text text-info"
                  data-placement="top"
                  style={{ pointerEvents: "visible" }}
                >
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
              <td className="text-right positive negative">
                <span>0.00</span>
              </td>
              <td className="text-right positive">
                <span className="positive">0.00</span>
              </td>
              <td className="text-right">
                <span>300.00 </span>
              </td>
              <td className="text-right">
                <span>300.00</span>
              </td>
              <td
                className={`text-right ${
                  !isExpanded ? "hidden-field" : "field-show"
                }`}
              >
                08/11/2025 11:49:26 AM
              </td>
              <td
                className={`text-right ${
                  !isExpanded ? "hidden-field" : "field-show"
                }`}
              >
                08/11/2025 11:49:26 AM
              </td>
            </tr>
            <tr>
              <td className="text-left">
                <span>
                  <a
                    href="#"
                    title="this is for me"
                    data-placement="top"
                    onClick={(e) => {
                      e.preventDefault();
                      openUpdateModal("NewAgentXYZYX");
                    }}
                    style={{ pointerEvents: "visible", textDecoration: "none" }}
                  >
                    NewAgentXYZYX
                  </a>
                </span>
              </td>
              <td className="text-left">
                <span>Agent</span>
              </td>
              <td className="text-center">
                <span>
                  <Link
                    to="/agentlisting/OGVhNDIyMzgtMWZhZi00NzVkLWIwNTktNDhiZjQyOGU5MGI4/1763382225538"
                    className="text text-info"
                    data-placement="top"
                    style={{ pointerEvents: "visible" }}
                  >
                    <i className="fas fa-sitemap"></i>
                  </Link>
                </span>
              </td>
              <td className="text-center">
                <span>
                  <a
                    href="javascript:void(0)"
                    data-placement="top"
                    onClick={() => false}
                    data-original-title="Betting Unlocked"
                    className="text text-dark username"
                  >
                    <i className="fas fa-unlock positive unlock-icon"></i>
                  </a>
                </span>
              </td>
              <td className="text-center">
                <span>ACTIVE</span>
              </td>
              <td className="text-center">
                <Link
                  to="/downlinereports/OGVhNDIyMzgtMWZhZi00NzVkLWIwNTktNDhiZjQyOGU5MGI4/NewAgentXYZYX"
                  className="text text-info"
                  data-placement="top"
                  style={{ pointerEvents: "visible" }}
                >
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
              <td className="text-right positive negative">
                <span>0.00</span>
              </td>
              <td className="text-right positive">
                <span className="positive">-169.00</span>
              </td>
              <td className="text-right">
                <span>300.00 </span>
              </td>
              <td className="text-right">
                <span>30.00</span>
              </td>
              <td
                className={`text-right ${
                  !isExpanded ? "hidden-field" : "field-show"
                }`}
              >
                08/11/2025 11:50:20 AM
              </td>
              <td
                className={`text-right ${
                  !isExpanded ? "hidden-field" : "field-show"
                }`}
              >
                08/11/2025 11:55:03 AM
              </td>
            </tr>
            <tr>
              <td className="text-left">
                <span>
                  <a
                    href="#"
                    title="User CReated"
                    data-placement="top"
                    onClick={(e) => {
                      e.preventDefault();
                      openUpdateModal("testAnkit");
                    }}
                    style={{ pointerEvents: "visible", textDecoration: "none" }}
                  >
                    testAnkit
                  </a>
                </span>
              </td>
              <td className="text-left">
                <span>User</span>
              </td>
              <td className="text-center">
                <span>
                  <a
                    href="javascript:void(0)"
                    data-placement="top"
                    onClick={() => false}
                    className="text text-dark username"
                  >
                    <i className="fas fa-sitemap"></i>
                  </a>
                </span>
              </td>
              <td className="text-center">
                <span>
                  <a
                    href="javascript:void(0)"
                    data-placement="top"
                    onClick={() => false}
                    data-original-title="Betting Unlocked"
                    className="text text-dark username"
                  >
                    <i className="fas fa-unlock positive unlock-icon"></i>
                  </a>
                </span>
              </td>
              <td className="text-center">
                <span>ACTIVE</span>
              </td>
              <td className="text-center">
                <Link
                  to="/downlinereports/ODJkMmVjZTQtMzliYy00Yzg4LTk0Y2ItMGRkYzQ3MzZiOTVk/testAnkit"
                  className="text text-info"
                  data-placement="top"
                  style={{ pointerEvents: "visible" }}
                >
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
              <td className="text-right positive negative">
                <span>0.00</span>
              </td>
              <td className="text-right positive">
                <span className="positive">-102.00</span>
              </td>
              <td className="text-right">
                <span>500.00 </span>
              </td>
              <td className="text-right">
                <span> 398.00</span>
              </td>
              <td
                className={`text-right ${
                  !isExpanded ? "hidden-field" : "field-show"
                }`}
              >
                06/11/2025 01:56:27 PM
              </td>
              <td
                className={`text-right ${
                  !isExpanded ? "hidden-field" : "field-show"
                }`}
              >
                06/11/2025 01:57:11 PM
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <UpdateUser
        isOpen={showUpdateModal}
        onClose={closeUpdateModal}
        username={selectedUser}
      />
    </section>
  );
};

export default AgentListing;