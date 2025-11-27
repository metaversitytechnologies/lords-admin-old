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
  return (
    <div className="market-4 mt-2">
      {oddsData?.map((row, rIdx) => {
        const myPnl = pnlData.find((item) => item?.marketId == row?.marketId);
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

              {row?.runners?.map((b, bIdx) => {
                const pnlValue =
                  plnOddsArray.find((pnl) => pnl.selectionId == b?.selectionId)
                    ?.pnl || 0;
                return (
                  <div
                    key={bIdx}
                    className="bet-table-row"
                    data-title={row.status || "ACTIVE"}>
                    <div className="nation-name">
                      <p>
                        <span>{b?.name}</span>
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

                    {/* --- ALWAYS SHOW 3 BACK COLUMNS --- */}
                    {[...Array(3)]
                      .map((_, idx) => {
                        const item = b?.ex?.availableToBack?.[idx];
                        return (
                          <div key={idx} className={backClasses[idx]}>
                            <span className="d-block odds">
                              {item?.price ?? "-"}
                            </span>
                            {item?.size !== undefined ? (
                              <span className="d-block">{item.size}</span>
                            ) : (
                              <span className="d-block">-</span>
                            )}
                          </div>
                        );
                      })
                      .reverse()}

                    {/* --- ALWAYS SHOW 3 LAY COLUMNS --- */}
                    {[...Array(3)].map((_, idx) => {
                      const item = b?.ex?.availableToLay?.[idx];
                      return (
                        <div key={idx} className={layClasses[idx]}>
                          <span className="d-block odds">
                            {item?.price ?? "-"}
                          </span>
                          {item?.size !== undefined ? (
                            <span className="d-block">{item.size}</span>
                          ) : (
                            <span className="d-block">-</span>
                          )}
                        </div>
                      );
                    })}
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
