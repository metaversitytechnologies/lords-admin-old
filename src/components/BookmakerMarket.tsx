import React, { useState } from "react";
import BetLockModal from "./BetLockModal";
import UserBookModal from "./UserBookModal";
import type { BetLockUser } from "./BetLockModal";
import type { UserBookSelection } from "./UserBookModal";

interface BookmakerMarketProps {
  bookmakerData: Bookmaker[] | undefined;
  pnlData: any;
}
const BookmakerMarket = ({ bookmakerData, pnlData }: BookmakerMarketProps) => {
  const [isUserBookModalOpen, setIsUserBookModalOpen] = useState(false);
  const [userBookSelections, setUserBookSelections] = useState<
    UserBookSelection[]
  >([]);
  const [isBetLockModalOpen, setIsBetLockModalOpen] = useState(false);
  const [betLockUsers, setBetLockUsers] = useState<BetLockUser[]>([
    { name: "capetown", checked: true },
    { name: "capetown3", checked: false }
  ]);

  const groupByProviderTypeNation = (data: Bookmaker[] | undefined) => {
    if (!Array.isArray(data)) return {};

    return data.reduce((acc, item) => {
      const key = item.na;

      if (!acc[key]) acc[key] = [];

      acc[key].push(item);

      return acc;
    }, {});
  };

  const groupedData = groupByProviderTypeNation(bookmakerData);
  return (
    <>
      {Object.entries(groupedData).map(
        ([providerType, nations]: [string, any]) => {
          const myPnl = pnlData?.find(
            (ele: any) => ele?.marketId == nations?.[0]?.mid
          );
          const pnlBookMaker = [
            {
              pnl: myPnl?.pnl1,
              selectionId: myPnl?.selection1,
            },
            {
              pnl: myPnl?.pnl2,
              selectionId: myPnl?.selection2,
            },
            {
              pnl: myPnl?.pnl3,
              selectionId: myPnl?.selection3,
            },
          ];

          return (
            <div className="market-4 mt-2">
              <div className="bet-table">
                <div className="bet-table-header">
                  <span>{providerType}</span>
                  <div className="d-flex justify-content-end align-content-center">
                    <button
                        type="button"
                        className="btn btn bet-lock-btn m-r-10 btn-primary"
                        onClick={() => {
                          setUserBookSelections(
                            (nations || []).map((item: any) => ({
                              name: item?.nation,
                          pnl:
                            pnlBookMaker.find(
                              (p) => p.selectionId == item?.sid
                            )?.pnl ?? "-"
                          }))
                        );
                          setIsUserBookModalOpen(true);
                        }}
                    >
                      Book
                    </button>
                    <button
                        type="button"
                        className="btn btn bet-lock-btn btn-primary m-r-5"
                        onClick={() => setIsBetLockModalOpen(true)}
                    >
                      Bet Lock
                    </button>

                  </div>
                </div>

                <div className="bet-table-body" data-title="SUSPENDED">
                  <div className="bet-table-row">
                    <div className="nation-name">
                      <span className="max-bet">
                        Min:<span>{nations?.[0].minBet}</span> Max:
                        <span>{nations?.[0].maxBet}</span>
                      </span>
                    </div>
                    <div className="bl-title"></div>
                    <div className="bl-title"></div>
                    <div className="back bl-title back-title">Back</div>
                    <div className="lay bl-title lay-title">Lay</div>
                    <div className="bl-title"></div>
                    <div className="bl-title"></div>
                  </div>

                  {nations?.map((r: any, idx: number) => {
                    const pnlValue =
                      pnlBookMaker.find((ele) => ele?.selectionId == r?.sid)
                        ?.pnl || 0;
                    return (
                      <div
                        className={`bet-table-row ${
                          r?.sb === "S" ? "suspendedtext" : ""
                        }`}
                        data-title={r?.sb ? "SUSPENDED" : ""}
                        key={idx}
                      >
                        <div className="nation-name">
                          <p>
                            <span>{r.nation}</span>
                          </p>
                          <p className="mb-0">
                            {pnlValue >= 0 ? (
                              <p style={{ color: "green" }}>{pnlValue}</p>
                            ) : (
                              <p style={{ color: "red" }}>{pnlValue}</p>
                            )}
                            {/* {r.positive && (
                              <span className="positive">{r.positive}</span>
                            )} */}
                            <span className="float-right">{r.rightText}</span>
                          </p>
                        </div>

                        <div className="bl-box back2 suspended">
                          <span className="d-block odds">{"—"}</span>
                        </div>
                        <div className="bl-box back1 suspended">
                          <span className="d-block odds">{"—"}</span>
                        </div>
                        <div className="bl-box back  changed">
                          <span className="d-block odds">{r.b || "—"}</span>
                        </div>
                        <div className="bl-box lay  changed">
                          <span className="d-block odds">{r.l || "—"}</span>
                        </div>
                        <div className="bl-box lay1 suspended">
                          <span className="d-block odds">{"—"}</span>
                        </div>
                        <div className="bl-box lay2 suspended">
                          <span className="d-block odds">{"—"}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }
      )}
      <UserBookModal
        show={isUserBookModalOpen}
        onClose={() => setIsUserBookModalOpen(false)}
        selections={userBookSelections}
      />
      <BetLockModal
        show={isBetLockModalOpen}
        onClose={() => setIsBetLockModalOpen(false)}
        users={betLockUsers}
        onChange={setBetLockUsers}
      />
    </>
  );
};

export default BookmakerMarket;
