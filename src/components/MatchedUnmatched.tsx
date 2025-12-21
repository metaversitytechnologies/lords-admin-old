import React, { useState, useEffect } from "react";
import { getUnsettledByMatchId } from "../api/auth";
import ReusableModal from "./ReusableModal";
import ViewMoreBetsModal from "./ViewMoreBetsModal";

interface MatchedBet {
  username: string;
  mname: string;
  nation: string;
  type: string;
  userrate: number | string;
  amount: number | string;
}

interface UnmatchedBet extends MatchedBet {
  currency: string;
  placeDate: string;
}

interface MatchedUnmatchedProps {
  matchId: string;
}

const MatchedUnmatched: React.FC<MatchedUnmatchedProps> = ({ matchId }) => {
  const [activeTab, setActiveTab] = useState("MATCHED");
  const [matched, setMatched] = useState<MatchedBet[]>([]);
  const [unmatched, setUnmatched] = useState<UnmatchedBet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [isUnmatchedTableExpanded, setIsUnmatchedTableExpanded] =
    useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const response = await getUnsettledByMatchId({
          matchId: matchId,
          matchedDeletedBet: activeTab
        });
        if (activeTab === "MATCHED") {
          setMatched(response.data);
        } else {
          setUnmatched(response.data);
        }
      } catch (error) {
        console.error("Error fetching bets:", error);
      }
    };

    if (matchId) {
      fetchBets();
      const interval = setInterval(fetchBets, 1000);
      return () => clearInterval(interval);
    }
  }, [matchId, activeTab]);

  return (
    <>
      <div className="matched-data mt-2 p-l-5 m-b-10">
        {/* ----- Tabs ----- */}
        <div className="nav-title p-0">
          <ul role="tablist" className="nav nav-tabs">
            <li className="nav-item d-inline-block">
              <a
                data-toggle="tab"
                href="#matched-bet"
                className={`nav-link ${
                  activeTab === "MATCHED" ? "active" : ""
                }`}
                onClick={() => setActiveTab("MATCHED")}
              >
                Matched
              </a>
            </li>
            <li className="nav-item d-inline-block">
              <a
                data-toggle="tab"
                href="#unmatched-bet"
                className={`nav-link ${
                  activeTab === "UNMATCHED" ? "active" : ""
                }`}
                onClick={() => setActiveTab("UNMATCHED")}
              >
                Unmatched
              </a>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <ul className="d-inline-block float-right">
          <li className="d-inline-block v-t">
            <div className="form-group d-inline-block m-l-20 m-r-30">
              <button
                onClick={openModal}
                className="btn btn-primary max-bet-button"
              >
                View More
              </button>
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

        {/* ----- Tab Content ----- */}
        <div className="tab-content account-modal">
          {/* ---- Matched Table ---- */}
          <div
            id="matched-bet"
            className={`tab-pane ${activeTab === "MATCHED" ? "active" : ""}`}
          >
            <div className="select-sauda">
              <div
                id="dropdown-left"
                className="dropdown b-dropdown m-t-15 m-b-10 btn-group"
              >
                <button
                  type="button"
                  className="btn dropdown-toggle btn-primary"
                >
                  All
                </button>
                <ul className="dropdown-menu"></ul>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div
                className={`table-responsive ${
                  isTableExpanded ? "expanded" : ""
                }`}
              >
                <table className="table coupon-table m-b-0">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "100px" }}>UserName</th>
                      <th style={{ minWidth: "80px" }}>Mname</th>
                      <th style={{ minWidth: "180px" }}>Nation</th>
                      <th style={{ minWidth: "60px" }}>Type</th>
                      <th style={{ minWidth: "60px" }}>Userrate</th>
                      <th style={{ minWidth: "80px" }}>Amount</th>
                      <th
                        style={{ minWidth: "150px" }}
                        className={
                          !isTableExpanded ? "hidden-field" : "field-show"
                        }
                      >
                        Placed At
                      </th>
                      <th
                        style={{ minWidth: "150px" }}
                        className={
                          !isTableExpanded ? "hidden-field" : "field-show"
                        }
                      >
                        Matched At
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {matched && matched.length === 0 ? (
                      <tr className="back">
                        <td
                          colSpan={isTableExpanded ? 8 : 6}
                          className="text-center"
                        >
                          no records found
                        </td>
                      </tr>
                    ) : (
                      matched &&
                      matched.map((m: any, i) => (
                        <tr className={m.back ? "back" : "lay"} key={i}>
                          <td>
                            {m.userId}
                            <a
                              title="User Detail"
                              href="#"
                              className="m-l-5 curser-point d-inline-flex align-items-center justify-content-center"
                              style={{ width: "24px", height: "24px" }}
                            >
                              <i className="fa fa-eye"></i>
                            </a>
                          </td>
                          <td>{m.marketName}</td>
                          <td>{m.selectionName}</td>
                          <td>{m.back ? "BACK" : "LAY"}</td>
                          <td>{m.odds}</td>
                          <td>{m.amount}</td>
                          <td
                            className={
                              !isTableExpanded ? "hidden-field" : "field-show"
                            }
                          >
                            {m.placeTime}
                          </td>
                          <td
                            className={
                              !isTableExpanded ? "hidden-field" : "field-show"
                            }
                          >
                            {m.matchedTime}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <span
                className="table-control"
                onClick={() => setIsTableExpanded(!isTableExpanded)}
              >
                <i
                  className={`fas ${
                    isTableExpanded ? "fa-arrow-left" : "fa-arrow-right"
                  }`}
                ></i>
              </span>
            </div>
          </div>

          {/* ---- Unmatched Table ---- */}
          <div
            id="unmatched-bet"
            className={`tab-pane ${activeTab === "UNMATCHED" ? "active" : ""}`}
          >
            <div style={{ position: "relative" }}>
              <div
                className={`table-responsive ${
                  isUnmatchedTableExpanded ? "expanded" : ""
                }`}
              >
                <table className="table coupon-table m-b-0">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "100px" }}>UserName</th>
                      <th style={{ minWidth: "80px" }}>Mname</th>
                      <th style={{ minWidth: "150px" }}>Nation</th>
                      <th style={{ minWidth: "60px" }}>Type</th>
                      <th style={{ minWidth: "60px" }}>Userrate</th>
                      <th style={{ minWidth: "80px" }}>Amount</th>
                      <th
                        style={{ minWidth: "50px" }}
                        className={
                          !isUnmatchedTableExpanded
                            ? "hidden-field"
                            : "field-show"
                        }
                      >
                        Currency
                      </th>
                      <th
                        style={{ minWidth: "150px" }}
                        className={
                          !isUnmatchedTableExpanded
                            ? "hidden-field"
                            : "field-show"
                        }
                      >
                        PlaceDate
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {unmatched && unmatched.length === 0 ? (
                      <tr className="back">
                        <td
                          colSpan={isUnmatchedTableExpanded ? 8 : 6}
                          className="text-center"
                        >
                          There are no records to show
                        </td>
                      </tr>
                    ) : (
                      unmatched &&
                      unmatched.map((u: any, i) => (
                        <tr key={i} className={u.back ? "back" : "lay"}>
                          <td>{u.userId}</td>
                          <td>{u.marketName}</td>
                          <td>{u.selectionName}</td>
                          <td>{u.back ? "BACK" : "LAY"}</td>
                          <td>{u.odds}</td>
                          <td>{u.amount}</td>
                          <td
                            className={
                              !isUnmatchedTableExpanded
                                ? "hidden-field"
                                : "field-show"
                            }
                          >
                            {u.currency}
                          </td>
                          <td
                            className={
                              !isUnmatchedTableExpanded
                                ? "hidden-field"
                                : "field-show"
                            }
                          >
                            {u.placeDate}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <span
                className="table-control"
                onClick={() =>
                  setIsUnmatchedTableExpanded(!isUnmatchedTableExpanded)
                }
              >
                <i
                  className={`fas ${
                    isUnmatchedTableExpanded
                      ? "fa-arrow-left"
                      : "fa-arrow-right"
                  }`}
                ></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ReusableModal
        show={isModalOpen}
        handleClose={closeModal}
        title="View More Bets"
        size="xl"
        position="top"
      >
        <ViewMoreBetsModal matchId={matchId} />
      </ReusableModal>
    </>
  );
};

export default MatchedUnmatched;
