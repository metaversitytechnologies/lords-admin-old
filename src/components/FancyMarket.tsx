import { useState } from "react";
import { Ladder } from "react-bootstrap-icons";
import ReusableModal from "./ReusableModal";
import { getUserFancyBook } from "../api/bet";

interface FancyMarketProps {
  fancyData: Fancy2[] | undefined;
  fancyPnldata: any;
  fancyMarket: string;
  matchId: string;
}

const FancyMarket = ({
  fancyData,
  fancyPnldata,
  fancyMarket,
  matchId
}: FancyMarketProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ladderData, setLadderData] = useState<any[]>([]);
  const [loadingLadder, setLoadingLadder] = useState(false);

  const filteredFancy = fancyData?.filter(
    (row: any) => row.s === true && row.go === false
  );

  const handleLadderClick = async (fancyId: string) => {
    setIsModalOpen(true);
    setLoadingLadder(true);
    setLadderData([]);
    try {
      const payload = {
        fancyId: fancyId,
        matchId: matchId
      };
      const response = await getUserFancyBook(payload);
      if (response.status) {
        setLadderData(response.data);
      }
    } catch (error) {
      console.error("Error fetching ladder data:", error);
    } finally {
      setLoadingLadder(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLadderData([]);
  };

  return (
    <>
      {filteredFancy && filteredFancy?.length > 0 && (
        <div className="market-6 mt-2">
          <div className="bet-table">
            <div className="bet-table-header">
              <span>{fancyMarket}</span>
              <button
                type="button"
                className="btn btn bet-lock-btn btn-primary"
              >
                Fancy Lock
              </button>
            </div>

            <div className="bet-table-body" data-title="OPEN">
              <div className="fancy-tripple">
                <div className="bet-table-row">
                  <div className="nation-name">&nbsp;</div>
                  <div className="lay bl-title lay-title">No</div>
                  <div className="back bl-title back-title">Yes</div>
                  <div className="fancy-min-max"></div>
                </div>
              </div>

              {filteredFancy?.map((r, i) => {
                let bet = 0;
                // Use mid (which includes -F2) or fallback to sid
                const currentId = r?.mid
                  ? String(r.mid).trim()
                  : r?.sid
                  ? String(r.sid).trim()
                  : "";

                if (fancyPnldata && currentId) {
                  if (fancyPnldata[currentId] !== undefined) {
                    bet = fancyPnldata[currentId];
                  }
                }
                return (
                  <div className="fancy-tripple" key={i}>
                    <div
                      className={`bet-table-row ${
                        r?.sb === "S" || r?.sb === "B" ? "suspendedtext" : ""
                      }`}
                      data-title={r?.sb === "S" ? "SUSPENDED" : "BALL RUNNING"}
                    >
                      <div className="nation-name">
                        <p>
                          <span>{r.na}</span>
                        </p>
                        <p className="mb-0">
                          <span style={{ color: bet >= 0 ? "green" : "red" }}>
                            {" "}
                            {bet}
                          </span>
                          {bet !== 0 && (
                            <span className="float-right">
                              <Ladder
                                className="float-right mt-1 cursor-pointer"
                                size={20}
                                style={{
                                  color: "var(--accent-color)",
                                  cursor: "pointer"
                                }}
                                onClick={() => handleLadderClick(currentId)}
                              />
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="bl-box lay ">
                        <span className="d-block odds">{r.l || "—"}</span>
                      </div>
                      <div className="bl-box back ">
                        <span className="d-block odds">{r.b || "—"}</span>
                      </div>
                      <div className="fancy-min-max">
                        Min:<span>{r.minBet ?? 100}</span> Max:
                        <span>{r.maxBet ?? 1000}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <ReusableModal
        show={isModalOpen}
        handleClose={closeModal}
        title="Fancy Book"
        size="lg"
      >
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th className="text-center">Run</th>
                <th className="text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              {loadingLadder ? (
                <tr>
                  <td colSpan={2} className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : ladderData.length > 0 ? (
                ladderData.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.odds}</td>
                    <td
                      className={`text-center ${
                        item.pnl >= 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      {item.pnl}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ReusableModal>
    </>
  );
};

export default FancyMarket;
