import { useState } from "react";
import { Ladder } from "react-bootstrap-icons";
import BetLockModal from "./BetLockModal";
import type { BetLockUser } from "./BetLockModal";
import { getUserFancyBook } from "../api/bet";
import {
  getChildListMarketBetLock,
  updateChildListMarketBetLock
} from "../api/user";
import type {Fancy2} from "./type";

const formatWithK = (value: any) => {
  const num = Number(value);
  if (Number.isNaN(num)) return value ?? "—";
  if (Math.abs(num) >= 1000) {
    const rounded = Math.round((num / 1000) * 10) / 10;
    return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)}k`;
  }
  return num;
};

interface FancyMarketProps {
  fancyData: Fancy2[] | undefined;
  fancyPnldata: any;
  fancyMarket: string;
  matchId: string;
  matchSettings?: Record<string, any>;
}

const groupLadderRows = (rows: any[]) => {
  if (!Array.isArray(rows)) return [];
  const sortedRows = [...rows].sort((a, b) => {
    const aNum = Number(a?.odds);
    const bNum = Number(b?.odds);
    const aIsNum = !Number.isNaN(aNum);
    const bIsNum = !Number.isNaN(bNum);
    if (aIsNum && bIsNum) return aNum - bNum;
    return String(a?.odds ?? "").localeCompare(String(b?.odds ?? ""));
  });

  const grouped: { start: any; end: any; pnl: any }[] = [];
  sortedRows.forEach((item) => {
    const oddsNum = Number(item?.odds);
    const isNum = !Number.isNaN(oddsNum);
    const last = grouped[grouped.length - 1];
    if (
      last &&
      last.pnl === item?.pnl &&
      isNum &&
      typeof last.end === "number" &&
      oddsNum === last.end + 1
    ) {
      last.end = oddsNum;
    } else {
      grouped.push({
        start: isNum ? oddsNum : item?.odds,
        end: isNum ? oddsNum : item?.odds,
        pnl: item?.pnl
      });
    }
  });
  return grouped;
};

const FancyMarket = ({
  fancyData,
  fancyPnldata,
  fancyMarket,
  matchId,
  matchSettings
}: FancyMarketProps) => {
  const [isBetLockModalOpen, setIsBetLockModalOpen] = useState(false);
  const [betLockUsers, setBetLockUsers] = useState<BetLockUser[]>([
    { name: "capetown", checked: true },
    { name: "capetown3", checked: false }
  ]);
  const [currentMarketId, setCurrentMarketId] = useState<string>("");
  const [ladderData, setLadderData] = useState<any[]>([]);
  const [loadingLadder, setLoadingLadder] = useState(false);
  const [activeLadderId, setActiveLadderId] = useState<string | null>(null);

  const filteredFancy = fancyData?.filter(
    (row: any) => row.s === true && row.go === false
  );

  const handleLadderClick = async (fancyId: string, canOpen: boolean) => {
    if (!canOpen || !fancyId) return;
    // toggle off if the same row is clicked again
    if (activeLadderId === fancyId) {
      setActiveLadderId(null);
      setLadderData([]);
      return;
    }
    setActiveLadderId(fancyId);
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

  const groupedLadderRows = groupLadderRows(ladderData);

  const openFancyLockModal = async () => {
    const marketId =
      filteredFancy?.[0]?.mid ||
      filteredFancy?.[0]?.sid ||
      "";
    if (!marketId) return;
    setCurrentMarketId(String(marketId));
    try {
      const res = await getChildListMarketBetLock({ marketId: String(marketId) });
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
      console.error("Failed to fetch fancy bet lock users", err);
      setBetLockUsers([]);
    } finally {
      setIsBetLockModalOpen(true);
    }
  };

  const submitFancyLock = async () => {
    if (!currentMarketId) return;
    try {
      await updateChildListMarketBetLock({
        marketId: currentMarketId,
        matchId,
        userList: betLockUsers
          .filter((u) => u.name)
          .map((u) => ({ userId: u.name, lock: u.checked }))
      });
      setIsBetLockModalOpen(false);
    } catch (err) {
      console.error("Failed to update fancy bet lock users", err);
    }
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
                onClick={openFancyLockModal}
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
                // Use mid (which includes -F2) or fallback to sid
                const currentId = r?.mid
                  ? String(r.mid).trim()
                  : r?.sid
                  ? String(r.sid).trim()
                  : "";

                let bet = 0;
                if (fancyPnldata && currentId) {
                  if (fancyPnldata[currentId] !== undefined) {
                    bet = fancyPnldata[currentId];
                  }
                }
                const canOpenLadder = bet !== 0 && Boolean(currentId);
                const betColor = bet > 0 ? "green" : bet < 0 ? "red" : undefined;
                const marketSetting = currentId ? matchSettings?.[currentId] : undefined;
                const minBet = marketSetting?.minBet ?? r?.minBet ?? 100;
                const maxBet = marketSetting?.maxBet ?? r?.maxBet ?? 1000;
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
                          <span style={betColor ? { color: betColor } : undefined}>
                            {" "}
                            {bet}
                          </span>
                          <span className="float-right">
                            <Ladder
                              className="float-right mt-1 cursor-pointer"
                              size={20}
                              style={{
                                color: "var(--accent-color)",
                                cursor: canOpenLadder ? "pointer" : "not-allowed",
                                opacity: canOpenLadder ? 1 : 0.5
                              }}
                              onClick={() => handleLadderClick(currentId, canOpenLadder)}
                            />
                          </span>
                        </p>
                      </div>
                      <div className="bl-box lay ">
                        <span className="d-block odds">{r.l || "—"}</span>
                      </div>
                      <div className="bl-box back ">
                        <span className="d-block odds">{r.b || "—"}</span>
                      </div>
                      <div className="fancy-min-max">
                        Min:<span>{formatWithK(minBet)}</span> Max:
                        <span>{formatWithK(maxBet)}</span>
                      </div>
                    </div>
                    {activeLadderId === currentId && (
                      <div
                        className="table-responsive mt-1"
                        style={{ border: "1px solid #dee2e6", borderRadius: "4px" }}
                      >
                        <table className="table table-bordered table-striped mb-0">
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
                            ) : groupedLadderRows.length > 0 ? (
                              groupedLadderRows.map((item, index) => {
                                const oddsLabel =
                                  item.start === item.end
                                    ? item.start
                                    : `${item.start} - ${item.end}`;
                                return (
                                  <tr key={index}>
                                    <td className="text-center">{oddsLabel}</td>
                                    <td
                                      className={`text-center ${
                                        item.pnl > 0
                                      ? "text-success"
                                      : item.pnl < 0
                                      ? "text-danger"
                                      : ""
                                  }`}
                                >
                                      {item.pnl}
                                    </td>
                                  </tr>
                                );
                              })
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
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <BetLockModal
        show={isBetLockModalOpen}
        onClose={() => setIsBetLockModalOpen(false)}
        users={betLockUsers}
        onChange={setBetLockUsers}
        onSubmit={submitFancyLock}
        title="Fancy Lock"
      />
    </>
  );
};

export default FancyMarket;
