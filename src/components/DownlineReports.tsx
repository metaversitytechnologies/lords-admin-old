import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BalanceInfo from "./BalanceInfo";
import BetList from "./BestList";
import AccountStatement from "./AccountStatement";
import TransferStatement from "./TransferStatement";
import NetExposure from "./Netexposure";
import ClientAccountStatement from "./ClientAccountStatement";
import BettingPnl from "./BettingPnl";
import { getWinLossActivity } from "../api/auth";
import DownlineBetList from "./DownlineBetList";

const DownlineReports = () => {
  const [activeTab, setActiveTab] = useState("activity");
  const { id } = useParams();
  const isTabView = true;

  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab === "activity") {
      const fetchActivityData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await getWinLossActivity({ userId: id });
          setActivityData(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchActivityData();
    }
  }, [activeTab, id]);

  const tabs = [
    { id: "activity", label: "Activity" },
    {
      id: "balance",
      label: "Balance",
      component: <BalanceInfo isTabView={isTabView} />
    },
    {
      id: "betlist",
      label: "Betlist",
      component: <DownlineBetList userId={id} />
    },
    {
      id: "betting-pl",
      label: "Betting P&L",
      component: <BettingPnl isTabView={isTabView} userId={id} />
    },
    {
      id: "statement",
      label: "Statement",
      component: <AccountStatement isTabView={isTabView} />
    },
    {
      id: "transfer",
      label: "Transfer Statement",
      component: <TransferStatement />
    },
    {
      id: "exposure",
      label: "Net Exposure",
      component: <NetExposure userId={id} isActive={activeTab === 'exposure'} />
    },
    {
      id: "clients",
      label: "Clients Account Statement",
      component: <ClientAccountStatement />
    }
  ];

  const renderActivityTab = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!activityData) return <p>No data available.</p>;

    const winData = activityData[0];
    const pnlData = activityData[1];

    return (
      <div className="activity-report">
        <div className="main-panel">
          <div className="left-panel">
            <table className="table m-t-30">
              <tbody>
                <tr>
                  <td className="text-right">Win</td>
                </tr>
                <tr></tr>
                <tr>
                  <td className="text-right">P&L</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mid-panel">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="text-center">Today</th>
                  <th className="text-center">3 Days</th>
                  <th className="text-center">7 Days</th>
                  <th className="text-center">30 Days</th>
                  <th className="text-center">Lifetime</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">
                    <span
                      className={winData.today >= 0 ? "positive" : "negative"}
                    >
                      {winData.today.toFixed(2)}
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className={
                        winData.threeDay >= 0 ? "positive" : "negative"
                      }
                    >
                      {winData.threeDay.toFixed(2)}
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className={
                        winData.sevenDay >= 0 ? "positive" : "negative"
                      }
                    >
                      {winData.sevenDay.toFixed(2)}
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className={
                        winData.thirtyDay >= 0 ? "positive" : "negative"
                      }
                    >
                      {winData.thirtyDay.toFixed(2)}
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className={
                        winData.lifetime >= 0 ? "positive" : "negative"
                      }
                    >
                      {winData.lifetime.toFixed(2)}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">
                    <span
                      className={pnlData.today >= 0 ? "positive" : "negative"}
                    >
                      {pnlData.today.toFixed(2)}
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className={
                        pnlData.threeDay >= 0 ? "positive" : "negative"
                      }
                    >
                      {pnlData.threeDay.toFixed(2)}
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className={
                        pnlData.sevenDay >= 0 ? "positive" : "negative"
                      }
                    >
                      {pnlData.sevenDay.toFixed(2)}
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className={
                        pnlData.thirtyDay >= 0 ? "positive" : "negative"
                      }
                    >
                      {pnlData.thirtyDay.toFixed(2)}
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className={
                        pnlData.lifetime >= 0 ? "positive" : "negative"
                      }
                    >
                      {pnlData.lifetime.toFixed(2)}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section>
      <div data-v-5197193a="">
        <section className="apl-section">
          <div className="downline-reports">
            <div className="m-b-10 detail-header">
              <ul>
                <li>
                  <span className="text-white">
                    <Link to="/agentlisting" className="">
                      <i className="text-info">Downline Listing </i>
                    </Link>{" "}
                    &gt; {id}
                  </span>
                </li>
              </ul>
            </div>

            <div className="m-t-10 tabs">
              <div className="tabs" id="__BVID__332">
                <div className="">
                  <ul
                    role="tablist"
                    className="nav nav-tabs"
                    id="__BVID__32__BV_tab_controls_"
                  >
                    {tabs.map((tab, index) => (
                      <li key={tab.id} role="presentation" className="nav-item">
                        <a
                          role="tab"
                          aria-selected={activeTab === tab.id}
                          aria-setsize={tabs.length}
                          aria-posinset={index + 1}
                          href="#"
                          target="_self"
                          className={`nav-link ${
                            activeTab === tab.id ? "active" : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab(tab.id);
                          }}
                        >
                          {tab.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="tab-content"
                  id="__BVID__332__BV_tab_container_"
                >
                  {/* Activity Tab */}
                  <div
                    role="tabpanel"
                    aria-hidden={activeTab !== "activity"}
                    className={`tab-pane ${
                      activeTab === "activity" ? "active" : ""
                    }`}
                    style={{
                      display: activeTab === "activity" ? "block" : "none"
                    }}
                  >
                    {renderActivityTab()}
                  </div>

                  {/* Other Tabs */}
                  {tabs.slice(1).map((tab) => (
                    <div
                      key={tab.id}
                      role="tabpanel"
                      aria-hidden={activeTab !== tab.id}
                      className={`tab-pane ${
                        activeTab === tab.id ? "active" : ""
                      }`}
                      style={{
                        display: activeTab === tab.id ? "block" : "none"
                      }}
                    >
                      {tab.component}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default DownlineReports;
