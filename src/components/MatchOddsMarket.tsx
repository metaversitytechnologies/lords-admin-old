import React, { useState } from "react";
import BetLockModal from "./BetLockModal";
import UserBookModal from "./UserBookModal";
import type { BetLockUser } from "./BetLockModal";
import { getUserBookMarketwise } from "../api/bet";
import type {Odd} from "./type";
import {
  getChildListMarketBetLock,
  updateChildListMarketBetLock
} from "../api/user";

interface MatchOddsMarketProps {
  oddsData: Odd[] | undefined;
  pnlData: any;
  filterName: string;
  showOnly: boolean;
  matchId: string;
  matchSettings?: Record<string, any>;
}

// const backClasses: Record<number, string> = {
//   2: "bl-box back2 changed",
//   1: "bl-box back1 changed",
//   0: "bl-box back changed",
// };
// const layClasses: Record<number, string> = {
//   2: "bl-box lay2 changed",
//   1: "bl-box lay1 changed",
//   0: "bl-box lay changed",
// };

const formatOdds = (value: any) => {
  if (value === undefined || value === null || value === "-") return "-";
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return Number.isInteger(num) ? num.toString() : value;
};

const MatchOddsMarket = ({
  oddsData,
  pnlData,
  filterName,
  showOnly,
  matchId,
  matchSettings
}: MatchOddsMarketProps) => {
  const [isUserBookModalOpen, setIsUserBookModalOpen] = useState(false);
  const [isBetLockModalOpen, setIsBetLockModalOpen] = useState(false);
  const [betLockUsers, setBetLockUsers] = useState<BetLockUser[]>([]);
  const [currentMarketId, setCurrentMarketId] = useState<string>("");
  const [userBookSelectionInfo, setUserBookSelectionInfo] = useState<
    { id: any; name: string }[]
  >([]);
  const [userBookRaw, setUserBookRaw] = useState<{
    selectionId1?: any;
    selectionId2?: any;
    selectionId3?: any;
    dataList?: any[];
  } | null>(null);
  const sortedMarkets = [...(oddsData || [])].sort((a, b) => {
    if (a.ty === "Match Odds") return -1;
    if (b.ty === "Match Odds") return 1;
    return 0;
  });

  const buildSelectionInfo = (runners: any[]) =>
    (runners || []).map((item, idx) => ({
      id: item?.rid ?? item?.selectionId ?? item?.sid ?? idx,
      name: item?.na ?? `Selection ${idx + 1}`
    }));

  const openBetLockModal = async (marketId: string) => {
    if (!marketId) return;
    setCurrentMarketId(marketId);
    try {
      const res = await getChildListMarketBetLock({ marketId });
      const users =
        res?.data?.userList ||
        res?.userList ||
        res?.data ||
        [];
      setBetLockUsers(
        (Array.isArray(users) ? users : []).map((u: any) => ({
          name: u?.userId || u?.username || u?.name || "",
          checked: Boolean(u?.lock)
        }))
      );
    } catch (err) {
      console.error("Failed to fetch bet lock users", err);
      setBetLockUsers([]);
    } finally {
      setIsBetLockModalOpen(true);
    }
  };

  const submitBetLock = async (
    marketId: string,
    matchId: string,
    users: BetLockUser[],
    close: (value: boolean) => void
  ) => {
    if (!marketId) return;
    try {
      await updateChildListMarketBetLock({
        marketId,
        matchId,
        userList: users
          .filter((u) => u.name)
          .map((u) => ({ userId: u.name, lock: u.checked }))
      });
      close(false);
    } catch (err) {
      console.error("Failed to update bet lock users", err);
    }
  };

  const openUserBookModal = async (
    marketId: string,
    selectionInfo: { id: any; name: string }[]
  ) => {
    try {
      const response = await getUserBookMarketwise({ marketId });
      setUserBookSelectionInfo(selectionInfo);
      setUserBookRaw(response?.data);
    } catch (error) {
      console.error("Error fetching user book data:", error);
      setUserBookSelectionInfo(selectionInfo);
      setUserBookRaw(null);
    } finally {
      setIsUserBookModalOpen(true);
    }
  };
  return (
    <>
      <div className="market-4 mt-2">
        {sortedMarkets?.map((row, rIdx) => {
          const selectionInfo = buildSelectionInfo(row?.r || []);
          const myPnl = pnlData?.find((item) => item?.marketId == row?.mid);
          const plnOddsArray = myPnl
            ? [
                { pnl: myPnl.pnl1, selectionId: myPnl.selection1 },
                { pnl: myPnl.pnl2, selectionId: myPnl.selection2 },
                { pnl: myPnl.pnl3, selectionId: myPnl.selection3 }
              ]
            : [];

          if (filterName) {
            if (showOnly) {
              if (row?.ty !== filterName) return null;
            } else {
              if (row?.ty === filterName) return null;
            }
          }

          return (
            <div className="bet-table" key={rIdx}>
              <div className="bet-table-header">
                <span>{row.ty}</span>
                <div className="d-flex justify-content-end align-content-center">
                  <button
                    type="button"
                    className="btn btn bet-lock-btn m-r-10 btn-primary"
                    onClick={() =>
                      openUserBookModal(
                        row?.mid || row?.marketId || "",
                        selectionInfo
                      )
                    }
                  >
                    Book
                  </button>
                  <button
                    type="button"
                    className="btn btn bet-lock-btn btn-primary m-r-5"
                    onClick={() => openBetLockModal(row?.mid || row?.marketId || "")}
                  >
                    Bet Lock
                  </button>
                </div>
              </div>

              <div className="bet-table-body" data-title="OPEN">
                <div className="bet-table-row">
                  <div className="nation-name"></div>
                  <div className="bl-title"></div>
                  <div className="bl-title"></div>
                  <div className="back bl-title back-title">Back</div>
                  <div className="lay bl-title lay-title">Lay</div>
                  <div className="bl-title"></div>
                  <div className="bl-title"></div>
                </div>

                {row?.r?.map((b, bIdx) => {
                  const pnlValue =
                    plnOddsArray.find((pnl) => pnl.selectionId == b?.rid)?.pnl ||
                    0;
                  const pnlColor =
                    pnlValue > 0 ? "green" : pnlValue < 0 ? "red" : undefined;
                  return (
                    <div
                      key={bIdx}
                      className="bet-table-row"
                      data-title={row.sb || "ACTIVE"}
                    >
                      <div className="nation-name">
                        <p>
                          <span>{b?.na}</span>
                        </p>
                        <p
                          className="mb-0"
                          style={pnlColor ? { color: pnlColor } : undefined}
                        >
                          {pnlValue}
                        </p>
                      </div>

                      <div className="bl-box back2 changed">
                        <span className="d-block odds">{formatOdds(b?.b3)}</span>
                        {b?.br3 !== undefined ? (
                          <span className="d-block">{b.br3}</span>
                        ) : (
                          <span className="d-block">-</span>
                        )}
                      </div>
                      <div className="bl-box back1 changed">
                        <span className="d-block odds">{formatOdds(b?.b2)}</span>
                        {b?.br2 !== undefined ? (
                          <span className="d-block">{b.br2}</span>
                        ) : (
                          <span className="d-block">-</span>
                        )}
                      </div>
                      <div className="bl-box back changed">
                        <span className="d-block odds">{formatOdds(b?.b1)}</span>
                        {b?.br1 !== undefined ? (
                          <span className="d-block">{b.br1}</span>
                        ) : (
                          <span className="d-block">-</span>
                        )}
                      </div>
                      <div className="bl-box lay changed">
                        <span className="d-block odds">{formatOdds(b?.l1)}</span>
                        {b?.lr1 !== undefined ? (
                          <span className="d-block">{b.lr1}</span>
                        ) : (
                          <span className="d-block">-</span>
                        )}
                      </div>
                      <div className="bl-box lay1 changed">
                        <span className="d-block odds">{formatOdds(b?.l2)}</span>
                        {b?.lr2 !== undefined ? (
                          <span className="d-block">{b.lr2}</span>
                        ) : (
                          <span className="d-block">-</span>
                        )}
                      </div>
                      <div className="bl-box lay2 changed">
                        <span className="d-block odds">{formatOdds(b?.l3)}</span>
                        {b?.lr3 !== undefined ? (
                          <span className="d-block">{b.lr3}</span>
                        ) : (
                          <span className="d-block">-</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <UserBookModal
        show={isUserBookModalOpen}
        onClose={() => setIsUserBookModalOpen(false)}
        selectionInfo={userBookSelectionInfo}
        rawData={userBookRaw || { dataList: [] }}
      />
      <BetLockModal
        show={isBetLockModalOpen}
        onClose={() => setIsBetLockModalOpen(false)}
        users={betLockUsers}
        onChange={setBetLockUsers}
        onSubmit={() =>
          submitBetLock(currentMarketId, matchId, betLockUsers, setIsBetLockModalOpen)
        }
      />
    </>
  );
};

export default MatchOddsMarket;
