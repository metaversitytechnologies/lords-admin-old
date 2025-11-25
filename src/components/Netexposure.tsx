import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getNetExposureDetail } from "../api/auth";

const NetExposure = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getNetExposureDetail();
      if (response.status) {
        setData(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <div id="net-exposure" className="tab-pane net-exposure">
        <div className="header">
          <h1>Net Exposure</h1>
        </div>
        <div className="float-right">
          <span className="counter">{data.length}</span>
          <button className="btn btn-secondary m-l-10" onClick={fetchData}>
            Refresh
          </button>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th
                  style={{ minWidth: "10%", maxWidth: "10%", width: "10%" }}
                ></th>
                <th
                  style={{ minWidth: "8%", maxWidth: "8%", width: "8%" }}
                ></th>
                <th
                  className="text-center"
                  style={{ minWidth: "8%", maxWidth: "8%", width: "8%" }}
                >
                  Stake
                </th>
                <th
                  className="text-center"
                  style={{ minWidth: "8%", maxWidth: "8%", width: "8%" }}
                >
                  1
                </th>
                <th
                  className="text-center"
                  style={{ minWidth: "8%", maxWidth: "8%", width: "8%" }}
                >
                  X
                </th>
                <th
                  className="text-center"
                  style={{ minWidth: "8%", maxWidth: "8%", width: "8%" }}
                >
                  2
                </th>
                <th
                  style={{ minWidth: "18%", maxWidth: "18%", width: "18%" }}
                ></th>
                <th
                  style={{ minWidth: "16%", maxWidth: "16%", width: "16%" }}
                ></th>
                <th
                  className="text-center"
                  style={{ minWidth: "8%", maxWidth: "8%", width: "8%" }}
                >
                  Stake
                </th>
                <th
                  className="text-center"
                  style={{ minWidth: "8%", maxWidth: "8%", width: "8%" }}
                >
                  P/L
                </th>
              </tr>
            </thead>
          </table>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {data.map((item, index) => (
            <div key={index}>
              <table className="table m-b-5">
                <thead>
                  <tr className="title">
                    <td colSpan={11} className="text-white">
                      {item.matchName}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(item.marketDetail).map(
                    (market: any, subIndex) => (
                      <tr key={subIndex}>
                        <td className="cell-market-title">
                          <span>{market.marketName || "Match Odds"}</span>
                        </td>
                        <td className="icon-group-cell">
                          <ul className="icon-group">
                            <li className="cell-market-workstation">
                              <Link
                                to={`/gamedetailnew/${item.matchId}`}
                                className="game-status"
                              >
                                <img
                                  src="https://d3kb8xz339pq18.cloudfront.net/v12/static/backend/images/icons/exposure.png"
                                  className="icon"
                                  alt="exposure icon"
                                />
                              </Link>
                            </li>
                          </ul>
                        </td>
                        <td className="cell-stake">
                          {market.liability?.toFixed(2) || "0.00"}
                        </td>
                        <td className="cell-selection-1">
                          <span
                            className={
                              market.pnl1 >= 0 ? "positive" : "negative"
                            }
                          >
                            {market.pnl1?.toFixed(2) || "0.00"}
                          </span>
                        </td>
                        <td className="cell-selection-2">
                          <span
                            className={
                              market.pnl2 >= 0 ? "positive" : "negative"
                            }
                          >
                            {market.pnl2?.toFixed(2) || "0.00"}
                          </span>
                        </td>
                        <td className="cell-selection-3">
                          <span
                            className={
                              market.pnl3 >= 0 ? "positive" : "negative"
                            }
                          >
                            {market.pnl3?.toFixed(2) || "0.00"}
                          </span>
                        </td>
                        <td colSpan={5} className="right-empty"></td>
                      </tr>
                    )
                  )}
                </tbody>
                {item.fancyDetail &&
                  Object.values(item.fancyDetail).length > 0 && (
                    <tbody>
                      <tr className="fancy-tile">
                        <td colSpan={6} className="left-empty">
                          {item.matchName}
                        </td>
                        <td colSpan={5} className="left-empty text-right">
                          fancy
                        </td>
                      </tr>
                      {Object.values(item.fancyDetail).map(
                        (fancy: any, fancyIndex) => (
                          <tr key={fancyIndex}>
                            <td colSpan={6} className="left-empty"></td>
                            <td className="cell-market-title">
                              <span>{fancy.fancyName || "Fancy Market"}</span>{" "}
                              <span className="p-l-10"></span>
                            </td>
                            <td className="icon-group-cell">
                              <ul className="icon-group">
                                <li className="cell-market-workstation">
                                  <Link
                                    to={`/gamedetailnew/${item.matchId}`}
                                    className="game-status"
                                  >
                                    <img
                                      src="https://d3kb8xz339pq18.cloudfront.net/v12/static/backend/images/icons/exposure.png"
                                      className="icon"
                                      alt="exposure icon"
                                    />
                                  </Link>
                                </li>
                              </ul>
                            </td>
                            <td className="cell-stake positive">
                              {fancy.stake.toFixed(2)}
                            </td>
                            <td className="cell-selection-2">
                              <span className="positive positive">
                                {fancy.pnl.toFixed(2)}
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  )}
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetExposure;
