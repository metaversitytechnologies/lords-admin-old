import { useState, useEffect } from "react";
import { getBettingPnlDetail } from "../api/auth";
import { CSVLink } from "react-csv";

const MarketPnlBreakdown = ({ market, onBack, userId, fromDate, toDate }) => {
  const [bets, setBets] = useState<any[]>([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBettingPnlDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        userId,
        fromDate,
        toDate,
        marketId: market.marketId
      };
      const response = await getBettingPnlDetail(payload);
      if (response.data) {
        setBets(response.data.betList || []);
        setSummary(response.data);
      } else {
        setBets([]);
        setSummary(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (market.marketId) {
      fetchBettingPnlDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [market.marketId]);

  return (
    <div>
      <div className="m-t-10 breakdown-breadcrumb">
        <ul>
          <li className="d-inline-block">
            <a href="javascript:void(0)" onClick={onBack}>
              Betting P&L
            </a>{" "}
            &gt;
          </li>
          <li className="d-inline-block">
            <span>{market.marketName}</span>
          </li>
          <li className="d-inline-block float-right">
            <div id="export_1764091084670" className="">
              <CSVLink
                data={bets}
                filename={`market-pnl-${market.marketName}.csv`}
                className="btn btn-secondary m-l-5"
              >
                Download CSV
              </CSVLink>
            </div>
          </li>
        </ul>
      </div>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <>
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Placed</th>
                  <th>User Name</th>
                  <th>Selection</th>
                  <th>Type</th>
                  <th className="text-right">Odds</th>
                  <th className="text-right">Stake</th>
                  <th className="text-right">Profit/Loss</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(bets) && bets.length > 0 ? (
                  bets.map((bet, index) => (
                    <tr key={index}>
                      <td>
                        <span>
                          {bet.placedTime
                            ? new Date(bet.placedTime).toLocaleString()
                            : "-"}
                        </span>
                      </td>
                      <td>{bet.userId}</td>
                      <td>{bet.selectionName}</td>
                      <td>{bet.backLay}</td>
                      <td className="text-right">{bet.odds.toFixed(2)}</td>
                      <td className="text-right">{bet.stake.toFixed(2)}</td>
                      <td className="text-right">
                        <span
                          className={bet.netPnl >= 0 ? "positive" : "negative"}
                        >
                          {bet.netPnl.toFixed(2)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={
                            bet.winLossStatus === "WIN"
                              ? "positive"
                              : "negative"
                          }
                        >
                          <span>{bet.winLossStatus}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {summary && (
            <div className="market-summary float-right">
              <table className="table">
                <tbody>
                  <tr>
                    <td className="text-right">Back subtotal:</td>
                    <td className="text-right">
                      {summary.backTotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Lay subtotal:</td>
                    <td className="text-right">
                      {summary.layTotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Market subtotal:</td>
                    <td className="text-right">
                      {summary.marketTotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Commission:</td>
                    <td className="text-right underline">
                      {summary.commision.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Net Market Total:</td>
                    <td className="text-right underline">
                      {summary.netMarketTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MarketPnlBreakdown;
