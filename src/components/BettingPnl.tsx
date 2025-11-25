import { useState, useEffect } from "react";
import { getBettingPnl } from "../api/auth";
import MarketPnlBreakdown from "./MarketPnlBreakdown";

const BettingPnl = ({ userId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState(null);

  // Function to get the start of the day
  const getStartOfDay = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now.toISOString().slice(0, 10);
  };

  // Function to get the end of the day
  const getEndOfDay = () => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    return now.toISOString().slice(0, 10);
  };

  const [fromDate, setFromDate] = useState(getStartOfDay());
  const [toDate, setToDate] = useState(getEndOfDay());

  const fetchBettingPnl = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        userId,
        fromDate,
        toDate
      };
      const response = await getBettingPnl(payload);
      if (response.data) {
        const pnlData = response.data.flatMap((item) => item.pnlList);
        setData(pnlData);
      } else {
        setData([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBettingPnl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleMarketClick = (market) => {
    setSelectedMarket(market);
  };

  const handleBackClick = () => {
    setSelectedMarket(null);
  };

  return (
    <div id="betting-pnl" className="tab-pane fade active show">
      <div>
        <div className="header">
          <div className="datepicker-wrapper d-inline-block col-md-2 form-group v-t p-l-0 p-r-5">
            <label className="p-l-5">From</label>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="datepicker-wrapper form-group d-inline-block col-md-2 v-t p-l-0 p-r-5">
            <label className="p-l-5 d-block">To</label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="d-inline-block v-t p-l-0 p-r-5">
            <label className="p-l-5 d-block">&nbsp;</label>
            <button
              className="btn btn-secondary m-l-10"
              onClick={fetchBettingPnl}
              disabled={loading}
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <i className="fa fa-search m-r-5"></i>Search
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <ul className="text-left">
          {/* Summary can be calculated and displayed here if needed */}
        </ul>
      </div>
      {selectedMarket ? (
        <MarketPnlBreakdown
          market={selectedMarket}
          onBack={handleBackClick}
          userId={userId}
          fromDate={fromDate}
          toDate={toDate}
        />
      ) : (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Market</th>
                <th>Start Time</th>
                <th>Settled</th>
                <th className="text-right">Net Win</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        href="javascript:void(0)"
                        onClick={() => handleMarketClick(item)}
                      >
                        {item.marketName}
                      </a>
                    </td>
                    <td>
                      <span>
                        {item.startTime
                          ? new Date(item.startTime).toLocaleString()
                          : "-"}
                      </span>
                    </td>
                    <td>
                      <span>
                        {item.settledTime
                          ? new Date(item.settledTime).toLocaleString()
                          : "-"}
                      </span>
                    </td>
                    <td className="text-right">
                      <span
                        className={item.netWin >= 0 ? "positive" : "negative"}
                      >
                        {typeof item.netWin === "number"
                          ? item.netWin.toFixed(2)
                          : "0.00"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BettingPnl;
