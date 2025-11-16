const MatchOddsMarket = ({ market }) => {
  return (
    <div className="market-4 mt-2">
      <div className="bet-table">
        <div className="bet-table-header">
          <div className="nation-name">
            <span>{market.title}</span>
            <button
              type="button"
              className="btn btn btn-submit bet-lock-btn btn-secondary"
            >
              Bet Lock
            </button>
            <button
              type="button"
              className="btn btn btn-submit bet-lock-btn m-r-10 btn-secondary"
            >
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

          {market.rows.map((row, rIdx) => (
            <div
              key={rIdx}
              className="bet-table-row"
              data-title={row.state || "ACTIVE"}
            >
              <div className="nation-name">
                <p>
                  <span>{row.teamName}</span>
                </p>
                <p className="mb-0"></p>
              </div>

              {row.boxes.map((b, bIdx) => (
                <div key={bIdx} className={b.className}>
                  <span className="d-block odds">{b.odds}</span>
                  {b.size !== undefined ? (
                    <span className="d-block">{b.size}</span>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchOddsMarket;
