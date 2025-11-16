/**
 * Tied Match market with suspended/active rows.
 * props.market = { title, min, max, rows: [{ label, state, back, lay }] }
 */
const TiedMatchMarket = ({
  market = {
    title: "Tied Match",
    min: 100,
    max: "50K",
    rows: [
      {
        label: "YES",
        state: "SUSPENDED",
        back: null,
        lay: null,
        backSuspended: true,
        laySuspended: true
      },
      {
        label: "NO",
        state: "ACTIVE",
        back: "2",
        lay: "4",
        backSuspended: false,
        laySuspended: false
      }
    ],
    message:
      "Womens Big Bash Cup Winner And Special Event Bets Started In Our Exchange"
  }
}) => (
  <div className="market-2 mt-2">
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
          <div className="back bl-title back-title">Back</div>
          <div className="lay bl-title lay-title">Lay</div>
        </div>

        {market.rows.map((r, idx) => (
          <div
            key={idx}
            className={`bet-table-row ${
              r.state === "SUSPENDED" ? "suspendedtext" : ""
            }`}
            data-title={r.state}
          >
            <div className="nation-name">
              <p>
                <span>{r.label}</span>
              </p>
              <p className="mb-0"></p>
            </div>

            <div
              className={`bl-box back ${r.backSuspended ? "suspended" : ""}`}
            >
              <span className="d-block odds">
                {r.back === null ? "—" : r.back}
              </span>
            </div>

            <div className={`bl-box lay ${r.laySuspended ? "suspended" : ""}`}>
              <span className="d-block odds">
                {r.lay === null ? "—" : r.lay}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="market-message">{market.message}</div>
  </div>
);

// TiedMatchMarket.propTypes = {
//   market: PropTypes.object
// };

TiedMatchMarket.defaultProps = {
  market: {
    title: "Tied Match",
    min: 100,
    max: "50K",
    rows: [
      {
        label: "YES",
        state: "SUSPENDED",
        back: null,
        lay: null,
        backSuspended: true,
        laySuspended: true
      },
      {
        label: "NO",
        state: "ACTIVE",
        back: "2",
        lay: "4",
        backSuspended: false,
        laySuspended: false
      }
    ],
    message:
      "Womens Big Bash Cup Winner And Special Event Bets Started In Our Exchange"
  }
};

export default TiedMatchMarket;
