import { useState } from "react";
import BalanceInfo from "./BalanceInfo";
import BetList from "./BestList";
import ProfitLoss from "./ProfitLoss";
import AccountStatement from "./AccountStatement";
import TransferStatement from "./TransferStatement";
import NetExposure from "./Netexposure";
import ClientAccountStatement from "./ClientAccountStatement";

const DownlineReports = () => {
  const [activeTab, setActiveTab] = useState("activity");
  const isTabView = true;

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
      component: <BetList isTabView={isTabView} />
    },
    {
      id: "betting-pl",
      label: "Betting P&L",
      component: <ProfitLoss isTabView={isTabView} />
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
    { id: "exposure", label: "Net Exposure", component: <NetExposure /> },
    {
      id: "clients",
      label: "Clients Account Statement",
      component: <ClientAccountStatement />
    }
  ];

  return (
    <section>
      <div data-v-5197193a="">
        <section className="apl-section">
          <div className="downline-reports">
            <div className="m-b-10 detail-header">
              <ul>
                <li>
                  <span className="text-white">
                    <a href="/agentlisting/all/1763384734452" className="">
                      <i className="text-info">Downline Listing </i>
                    </a>{" "}
                    &gt; agtshak
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
                                  <span className="positive">0.00</span>
                                </td>
                                <td className="text-center">
                                  <span className="positive negative">
                                    -145.50
                                  </span>
                                </td>
                                <td className="text-center">
                                  <span className="positive negative">
                                    -195.50
                                  </span>
                                </td>
                                <td className="text-center">
                                  <span className="positive negative">
                                    -102.50
                                  </span>
                                </td>
                                <td className="text-center">
                                  <span className="positive negative">
                                    -102.50
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <span className="positive">0.00</span>
                                </td>
                                <td className="text-center">
                                  <span className="positive negative">
                                    -145.50
                                  </span>
                                </td>
                                <td className="text-center">
                                  <span className="positive negative">
                                    -195.50
                                  </span>
                                </td>
                                <td className="text-center">
                                  <span className="positive negative">
                                    -102.50
                                  </span>
                                </td>
                                <td className="text-center">
                                  <span className="positive negative">
                                    -102.50
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
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
