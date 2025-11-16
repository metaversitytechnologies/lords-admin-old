const BookmakerMarket = ({
  market = {
    title: "Bookmaker",
    min: 100,
    max: "500K",
    rows: [
      { label: "Mpumalanga Rhinos", positive: "50.00", rightText: "50.00" },
      { label: "Limpopo", positive: null, rightText: "-15.00" }
    ],
    message:
      '"Be Shelton v F Auger-Aliassime" FINALS - TURIN Is Live — Bet Now On Our Exchange!'
  }
}) => (
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

      <div className="bet-table-body" data-title="SUSPENDED">
        <div className="bet-table-row">
          <div className="nation-name">
            <span className="max-bet">
              Min:<span>{market.min}</span> Max:<span>{market.max}</span>
            </span>
          </div>
          <div className="bl-title"></div>
          <div className="bl-title"></div>
          <div className="back bl-title back-title">Back</div>
          <div className="lay bl-title lay-title">Lay</div>
          <div className="bl-title"></div>
          <div className="bl-title"></div>
        </div>

        {market.rows.map((r, idx) => (
          <div
            className="bet-table-row suspendedtext"
            data-title="SUSPENDED"
            key={idx}
          >
            <div className="nation-name">
              <p>
                <span>{r.label}</span>
              </p>
              <p className="mb-0">
                {r.positive && <span className="positive">{r.positive}</span>}
                <span className="float-right">{r.rightText}</span>
              </p>
            </div>

            <div className="bl-box back2 suspended">
              <span className="d-block odds">{r.back2 || "—"}</span>
            </div>
            <div className="bl-box back1 suspended">
              <span className="d-block odds">{r.back1 || "—"}</span>
            </div>
            <div className="bl-box back suspended changed">
              <span className="d-block odds">{r.back || "—"}</span>
            </div>
            <div className="bl-box lay suspended changed">
              <span className="d-block odds">{r.lay || "—"}</span>
            </div>
            <div className="bl-box lay1 suspended">
              <span className="d-block odds">{r.lay1 || "—"}</span>
            </div>
            <div className="bl-box lay2 suspended">
              <span className="d-block odds">{r.lay2 || "—"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="market-message">{market.message}</div>
  </div>
);

export default BookmakerMarket;
