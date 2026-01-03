import React, {useState} from "react";
import type {BetLockUser} from "./BetLockModal";
import BetLockModal from "./BetLockModal";
import UserBookModal from "./UserBookModal";
import type {Bookmaker} from "./type";
import {getUserBookMarketwise} from "../api/bet";
import {getChildListMarketBetLock, updateChildListMarketBetLock} from "../api/user";

interface BookmakerMarketProps {
    bookmakerData: Bookmaker[] | undefined;
    pnlData: any;
    matchId: string;
    matchSettings?: Record<string, any>;
}

const formatWithK = (value: any) => {
    const num = Number(value);
    if (isNaN(num)) return value ?? "—";
    if (Math.abs(num) >= 1000) {
        const rounded = Math.round((num / 1000) * 10) / 10;
        return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)}k`;
    }
    return num;
};

const BookmakerMarket = ({bookmakerData, pnlData, matchId, matchSettings}: BookmakerMarketProps) => {
    const [isUserBookModalOpen, setIsUserBookModalOpen] = useState(false);
    const [userBookSelectionInfo, setUserBookSelectionInfo] = useState<{id: any; name: string}[]>([]);
    const [userBookRaw, setUserBookRaw] = useState<{
        selectionId1?: any;
        selectionId2?: any;
        selectionId3?: any;
        dataList?: any[];
    } | null>(null);
    const [isBetLockModalOpen, setIsBetLockModalOpen] = useState(false);
    const [betLockUsers, setBetLockUsers] = useState<BetLockUser[]>([]);
    const [currentMarketId, setCurrentMarketId] = useState<string>("");

    const groupByProviderTypeNation = (data: Bookmaker[] | undefined) => {
        if (!Array.isArray(data)) return {};

        return data.reduce((acc, item) => {
            const key = item.na;

            if (!acc[key]) acc[key] = [];

            acc[key].push(item);

            return acc;
        }, {});
    };

    const buildSelectionInfo = (runners: any[]) =>
        (runners || []).map((item, idx) => ({
            id: item?.sid ?? item?.rid ?? item?.selectionId ?? idx,
            name: item?.nation ?? item?.na ?? `Selection ${idx + 1}`
        }));

    const openBetLockModal = async (marketId: string) => {
        if (!marketId) return;
        setCurrentMarketId(marketId);
        try {
            const res = await getChildListMarketBetLock({marketId});
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
                    .map((u) => ({userId: u.name, lock: u.checked}))
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
            const response = await getUserBookMarketwise({marketId});
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

    const groupedData = groupByProviderTypeNation(bookmakerData);
    return (
        <>
            {Object.entries(groupedData).map(
                ([providerType, nations]: [string, any]) => {
                    const selectionInfo = buildSelectionInfo(nations);
                    const marketKey = nations?.[0]?.mid ?? nations?.[0]?.sid ?? "";
                    const marketSetting = marketKey ? matchSettings?.[marketKey] : undefined;
                    const minBet = marketSetting?.minBet ?? nations?.[0]?.minBet;
                    const maxBet = marketSetting?.maxBet ?? nations?.[0]?.maxBet;
                    const displayMessage =
                        typeof marketSetting?.displayMessage === "string"
                            ? marketSetting.displayMessage
                            : undefined;
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
                                            onClick={() =>
                                                openUserBookModal(
                                                    nations?.[0]?.mid || "",
                                                    selectionInfo
                                                )
                                            }
                                        >
                                            Book
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn bet-lock-btn btn-primary m-r-5"
                                            onClick={() => openBetLockModal(nations?.[0]?.mid || "")}
                                        >
                                            Bet Lock
                                        </button>

                                    </div>
                                </div>

                                    <div className="bet-table-body" data-title="SUSPENDED">
                                        <div className="bet-table-row">
                                            <div className="nation-name">
                      <span className="max-bet">
                        Min:<span>{formatWithK(minBet)}</span> Max:
                        <span>{formatWithK(maxBet)}</span>
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
                                        const pnlColor =
                                            pnlValue > 0 ? "green" : pnlValue < 0 ? "red" : undefined;
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
                                                        <p style={pnlColor ? {color: pnlColor} : undefined}>
                                                            {pnlValue}
                                                        </p>
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
                            {displayMessage && (
                                <div className="market-display-message">{displayMessage}</div>
                            )}
                        </div>
                    );
                }
            )}
            <UserBookModal
                show={isUserBookModalOpen}
                onClose={() => setIsUserBookModalOpen(false)}
                selectionInfo={userBookSelectionInfo}
                rawData={userBookRaw || {dataList: []}}
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

export default BookmakerMarket;
