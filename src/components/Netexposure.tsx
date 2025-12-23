import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import {
  getNetExposureDetail,
  getNetExposureDetailByUserId
} from "../api/auth";

const formatDateTime = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const period = hours >= 12 ? "pm" : "am";
  const hour12 = String(hours % 12 || 12).padStart(2, "0");

  return `${month}/${day}/${year} ${hour12}:${minutes}:${seconds} ${period}`;
};

const NetExposure = ({ userId, isActive }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [counter, setCounter] = useState(8);

  const fetchData = useCallback(
    async (showLoading = true) => {
      if (userId && !isActive) return;
      try {
        if (showLoading) {
          setLoading(true);
        }
        setError(null);
        let response;
        if (userId) {
          response = await getNetExposureDetailByUserId({ userId });
        } else {
          response = await getNetExposureDetail();
        }

        if (response.status) {
          setData(response.data);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    [userId, isActive]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!userId) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter === 1) {
            fetchData(false);
            return 8;
          }
          return prevCounter - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [userId, fetchData]);

  return (
    <div>
      <div id="net-exposure" className="tab-pane net-exposure">
        <div className="header">
          <h1>Net Exposure</h1>
        </div>
        <div className="float-right">
          {!userId && <span className="counter">{counter}</span>}
          <button
            className="btn btn-secondary m-l-10 m-b-5"
            onClick={() => {
              fetchData();
              setCounter(8);
            }}
          >
            Refresh
          </button>
        </div>
        <div>
          {!userId && (
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
          )}
          {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
          {error && <p style={{ textAlign: "center" }}>{error}</p>}
          {data &&
            data.map((item, index) => (
              <div key={index}>
                <table className="table m-b-5">
                  <thead>
                    <tr className="title">
                      <td colSpan={11} className="text-white">
                       {item.matchName}   {formatDateTime(item.date)}
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
                                  <i
                                    style={{ fontSize: 15, marginRight: 20 }}
                                    className="fas fa-tachometer-alt "
                                  ></i>
                                </Link>
                              </li>
                            </ul>
                          </td>
                          <td className="cell-stake">
                            {market.liability?.toFixed(2) || "0.00"}
                          </td>
                          {(
                            market.pnl3 == null
                              ? [market.pnl1, market.pnl3, market.pnl2]
                              : [market.pnl1, market.pnl2, market.pnl3]
                          ).map((pnl, idx) => (
                            <td
                              key={`selection-${idx}`}
                              className={`cell-selection-${idx + 1}`}
                            >
                              <span
                                className={
                                  (pnl ?? 0) >= 0 ? "positive" : "negative"
                                }
                              >
                                {pnl?.toFixed(2) || "-"}
                              </span>
                            </td>
                          ))}
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
                                      <i
                                        style={{
                                          fontSize: 15,
                                          marginRight: 20
                                        }}
                                        className="fas fa-tachometer-alt "
                                      ></i>
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
