import { Ladder } from "react-bootstrap-icons";

interface FancyMarketProps {
  fancyData: Fancy2[] | undefined;
  fancyPnldata: any;
  fancyMarket: string;
}

const FancyMarket = ({
  fancyData,
  fancyPnldata,
  fancyMarket,
}: FancyMarketProps) => {
  const filteredFancy = fancyData?.filter(
    (row: any) => row.s === true && row.go === false
  );
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
                if (fancyPnldata) {
                  if (Object?.keys(fancyPnldata)?.includes(r?.sid)) {
                    bet = fancyPnldata[r?.sid];
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
                          <span className="float-right">
                            <Ladder
                              className="float-right mt-1"
                              size={20}
                              style={{ color: "var(--primary-accent)" }}
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
    </>
  );
};

export default FancyMarket;
