interface MatchOddsMarketProps {
  oddsData: Odd[] | undefined;
  pnlData: any;
}

const backClasses: Record<number, string> = {
  2: "bl-box back2 changed",
  1: "bl-box back1 changed",
  0: "bl-box back changed",
};
const layClasses: Record<number, string> = {
  2: "bl-box lay2 changed",
  1: "bl-box lay1 changed",
  0: "bl-box lay changed",
};

const MatchOddsMarket = ({ oddsData, pnlData }: MatchOddsMarketProps) => {
  console.log("Match Odds Market Pnl Data:", oddsData);
  return (
    <div className="market-4 mt-2">
      {oddsData?.map((row, rIdx) => {
        const myPnl = pnlData.find((item) => item?.marketId == row?.mid);
        const plnOddsArray = myPnl
          ? [
              { pnl: myPnl.pnl1, selectionId: myPnl.selection1 },
              { pnl: myPnl.pnl2, selectionId: myPnl.selection2 },
              { pnl: myPnl.pnl3, selectionId: myPnl.selection3 },
            ]
          : [];

        return (
          <div className="bet-table" key={rIdx}>
            <div className="bet-table-header">
              <div className="nation-name">
                <span>{row.Name}</span>
                <button
                  type="button"
                  className="btn btn btn-submit bet-lock-btn btn-secondary">
                  Bet Lock
                </button>
                <button
                  type="button"
                  className="btn btn btn-submit bet-lock-btn m-r-10 btn-secondary">
                  Book
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
                return (
                  <div
                    key={bIdx}
                    className="bet-table-row"
                    data-title={row.sb || "ACTIVE"}>
                    <div className="nation-name">
                      <p>
                        <span>{b?.na}</span>
                      </p>
                      {pnlValue >= 0 ? (
                        <p className="mb-0" style={{ color: "green" }}>
                          {pnlValue}
                        </p>
                      ) : (
                        <p className="mb-0" style={{ color: "red" }}>
                          {pnlValue}
                        </p>
                      )}
                    </div>

                    <div className="bl-box back2 changed">
                      <span className="d-block odds">{b?.b3 ?? "-"}</span>
                      {b?.br3 !== undefined ? (
                        <span className="d-block">{b.br3}</span>
                      ) : (
                        <span className="d-block">-</span>
                      )}
                    </div>
                    <div className="bl-box back1 changed">
                      <span className="d-block odds">{b?.b2 ?? "-"}</span>
                      {b?.br2 !== undefined ? (
                        <span className="d-block">{b.br2}</span>
                      ) : (
                        <span className="d-block">-</span>
                      )}
                    </div>
                    <div className="bl-box back changed">
                      <span className="d-block odds">{b?.b1 ?? "-"}</span>
                      {b?.br1 !== undefined ? (
                        <span className="d-block">{b.br1}</span>
                      ) : (
                        <span className="d-block">-</span>
                      )}
                    </div>
                    <div className="bl-box lay changed">
                      <span className="d-block odds">{b?.l1 ?? "-"}</span>
                      {b?.lr1 !== undefined ? (
                        <span className="d-block">{b.lr1}</span>
                      ) : (
                        <span className="d-block">-</span>
                      )}
                    </div>
                    <div className="bl-box lay1 changed">
                      <span className="d-block odds">{b?.l2 ?? "-"}</span>
                      {b?.lr2 !== undefined ? (
                        <span className="d-block">{b.lr2}</span>
                      ) : (
                        <span className="d-block">-</span>
                      )}
                    </div>
                    <div className="bl-box lay2 changed">
                      <span className="d-block odds">{b?.l3 ?? "-"}</span>
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
  );
};

export default MatchOddsMarket;
