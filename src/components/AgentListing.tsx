import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UpdateUser from "./UpdateUser";
import { getChildListLord } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const AgentListing: React.FC = () => {
  const { userid } = useParams<{ userid: string }>();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();

  const fetchAgents = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);
    try {
      const payload = {
        userId: userid || user.userId,
        index: 0,
        noOfRecords: 20,
        username: searchTerm
      };
      const response = await getChildListLord(payload);
      setAgents(response.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch agents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [user, searchTerm, userid]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const openUpdateModal = (agent: any) => {
    setSelectedAgent(agent);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedAgent(null);
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            {loading ? (
              <tr>
                <td colSpan={12} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={12} className="text-center text-danger">
                  {error}
                </td>
              </tr>
            ) : (
              agents.map((agent) => (
                <tr key={agent.userId}>
                  <td className="text-left">
                    <span>
                      <a
                        href="#"
                        title="Create"
                        data-placement="top"
                        onClick={(e) => {
                          e.preventDefault();
                          openUpdateModal(agent);
                        }}
                        style={{
                          pointerEvents: "visible",
                          textDecoration: "none"
                        }}
                      >
                        {agent.userId}
                      </a>
                    </span>
                  </td>
                  <td className="text-left">
                    <span>{agent.accountType}</span>
                  </td>
                  <td className="text-center">
                    <span>
                      {agent.accountType?.toLowerCase() === "user" ? (
                        <span
                          className="text text-info"
                          style={{ opacity: 0.5, cursor: "not-allowed" }}
                        >
                          <i className="fas fa-sitemap"></i>
                        </span>
                      ) : (
                        <Link
                          to={`/agentlisting/${agent.userId}`}
                          className="text text-info"
                          data-placement="top"
                          style={{ pointerEvents: "visible" }}
                        >
                          <i className="fas fa-sitemap"></i>
                        </Link>
                      )}
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
                        <i
                          className={`fas ${
                            agent.bettingStatus ? "fa-unlock" : "fa-lock"
                          } positive unlock-icon`}
                        ></i>
                      </a>
                    </span>
                  </td>
                  <td className="text-center">
                    <span>{agent.userActive ? "ACTIVE" : "INACTIVE"}</span>
                  </td>
                  <td className="text-center">
                    <Link
                      to={`/downlinereports/${agent.userId}/${agent.username}`}
                      className="text text-info"
                      data-placement="top"
                      style={{ pointerEvents: "visible" }}
                    >
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                  <td className="text-right positive negative">
                    <span>{agent.netExposure}</span>
                  </td>
                  <td className="text-right positive">
                    <span className="positive">{agent.gt}</span>
                  </td>
                  <td className="text-right">
                    <span>{agent.creditLimit}</span>
                  </td>
                  <td className="text-right">
                    <span>{agent.availabeCredit}</span>
                  </td>
                  <td
                    className={`text-right ${
                      !isExpanded ? "hidden-field" : "field-show"
                    }`}
                  >
                    {agent.created}
                  </td>
                  <td
                    className={`text-right ${
                      !isExpanded ? "hidden-field" : "field-show"
                    }`}
                  >
                    {agent.lastLogin}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <UpdateUser
        isOpen={showUpdateModal}
        onClose={closeUpdateModal}
        agent={selectedAgent}
      />
    </section>
  );
};

export default AgentListing;
