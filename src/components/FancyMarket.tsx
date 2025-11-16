const FancyMarket = ({
  market = {
    title: "Normal",
    rows: [
      {
        label: "15 over runs LIM",
        value: "0.00",
        icon: "https://d3kb8xz339pq18.cloudfront.net/v12/static/images/icons/ladder.png",
        min: 100,
        max: "100K"
      },
      {
        label: "15 over run bhav LIM",
        value: "0.00",
        icon: "https://d3kb8xz339pq18.cloudfront.net/v12/static/images/icons/ladder.png",
        min: 100,
        max: "50K"
      }
    ]
  }
}) => (
  <div className="market-6 mt-2">
    <div className="bet-table">
      <div className="bet-table-header">
        <div className="nation-name">
          <span>{market.title}</span>
          <button
            type="button"
            className="btn btn btn-submit bet-lock-btn btn-secondary"
          >
            Fancy Lock
          </button>
        </div>
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

        {market.rows.map((r, i) => (
          <div className="fancy-tripple" key={i}>
            <div
              className={`bet-table-row suspendedtext`}
              data-title="SUSPENDED"
            >
              <div className="nation-name">
                <p>
                  <span>{r.label}</span>
                </p>
                <p className="mb-0">
                  <span style={{ color: "white" }}>{r.value}</span>
                  <span className="float-right">
                    <img
                      src={r.icon}
                      className="float-right ladder-icon mt-1"
                      alt="ladder"
                    />
                  </span>
                </p>
              </div>
              <div className="bl-box lay suspended">
                <span className="d-block odds">{r.lay || "—"}</span>
              </div>
              <div className="bl-box back suspended">
                <span className="d-block odds">{r.back || "—"}</span>
              </div>
              <div className="fancy-min-max">
                Min:<span>{r.min}</span> Max:<span>{r.max}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FancyMarket;
