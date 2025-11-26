interface BookmakerMarketProps {
  bookmakerData: Bookmaker[] | undefined;
}
const BookmakerMarket = ({ bookmakerData }: BookmakerMarketProps) => {
  const groupByProviderTypeNation = (data: Bookmaker[] | undefined) => {
    if (!Array.isArray(data)) return {};

    return data.reduce((acc, item) => {
      const key = item.t;

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
          return (
            <div className="market-4 mt-2">
              <div className="bet-table">
                <div className="bet-table-header">
                  <div className="nation-name">
                    <span>{providerType}</span>
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

                  {nations?.map((r: any, idx: number) => (
                    <div
                      className={`bet-table-row ${
                        r?.gstatus ? "suspendedtext" : ""
                      }`}
                      data-title={r?.gstatus}
                      key={idx}>
                      <div className="nation-name">
                        <p>
                          <span>{r.nation}</span>
                        </p>
                        <p className="mb-0">
                          {r.positive && (
                            <span className="positive">{r.positive}</span>
                          )}
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
                        <span className="d-block odds">{r.b1 || "—"}</span>
                      </div>
                      <div className="bl-box lay  changed">
                        <span className="d-block odds">{r.l1 || "—"}</span>
                      </div>
                      <div className="bl-box lay1 suspended">
                        <span className="d-block odds">{"—"}</span>
                      </div>
                      <div className="bl-box lay2 suspended">
                        <span className="d-block odds">{"—"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }
      )}
    </>
  );
};

export default BookmakerMarket;
