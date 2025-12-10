import React, { useState, useEffect } from "react";
import { getPnlReportByMarketId } from "../api/bet";
import MarketBets from "./MarketBets"; // Import MarketBets
import ReusableDatePicker from "./DatePicker";

interface Market {
  marketId: string;
  marketName: string;
  pnl: number;
}

interface Match {
  matchName: string;
  marketList: Market[];
  total: number;
}

interface DateReport {
  date: string;
  matchList: Match[];
  total: number;
}

const ProfitLoss: React.FC = () => {
  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const [fromDate, setFromDate] = useState<Date | null>(oneWeekAgo);
  const [toDate, setToDate] = useState<Date | null>(today);
  const [eventName, setEventName] = useState("0");
  const [marketName, setMarketName] = useState("all");
  const [reportData, setReportData] = useState<DateReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null); // State for selected market

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        eventName: eventName === "All" ? "" : eventName,
        marketName: marketName === "all" ? "" : marketName,
        fromDate: fromDate?.toISOString().split("T")[0],
        toDate: toDate?.toISOString().split("T")[0]
      };
      const response = await getPnlReportByMarketId(payload);
      const data: DateReport[] = response.data;

      setReportData(data || []);

      let grandTotal = 0;
      if (data && data.length > 0) {
        grandTotal = data.reduce((total, dateReport) => {
          return (
            total +
            dateReport.matchList.reduce(
              (matchTotal, match) => matchTotal + match.total,
              0
            )
          );
        }, 0);
      }
      setGrandTotal(grandTotal);
    } catch (error) {
      console.error("Error fetching P&L report:", error);
      setReportData([]); // Clear data on error
      setGrandTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data only when not viewing bets
    if (!selectedMarket) {
      handleSearch();
    }
  }, [selectedMarket]);

  const handleViewBets = (market: Market) => {
    setSelectedMarket(market);
  };

  const handleBack = () => {
    setSelectedMarket(null);
  };

  return (
    <section className="apl-section">
      <div>
        <div className="header">
          <h1>P&L Report by Market</h1>
        </div>
        <div className="additional-filters m-t-10">
          <form
            onSubmit={handleSearch}
            data-vv-scope="myBets"
            className="m-b-10"
          >
            <div className="dropdown long-width d-inline-block v-t">
              <label className="d-block">Event</label>
              <select
                className="dropdown-toggle dropdown-button"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              >
                <option value="0">All</option>
                <option value="1">Football</option>
                <option value="2">Tennis</option>
                <option value="4">Cricket</option>
              </select>
            </div>
            <div className="dropdown long-width m-l-10 d-inline-block v-t">
              <label className="d-block">Market</label>
              <select
                className="dropdown-toggle dropdown-button title"
                value={marketName}
                onChange={(e) => setMarketName(e.target.value)}
              >
                <option value="all">All</option>
              </select>
            </div>
            <div className="form-group v-t m-l-10 d-inline-block">
              <label className="d-block">From:</label>
              <ReusableDatePicker selected={fromDate} onChange={setFromDate} />
            </div>
            <div className="form-group v-t m-l-10 d-inline-block">
              <label className="d-block">To</label>
              <ReusableDatePicker selected={toDate} onChange={setToDate} />
            </div>
            <div className="m-l-5 m-b-10 d-inline-block v-t">
              <label className="d-block">&nbsp;</label>
              <button
                type="submit"
                className="btn btn-secondary m-l-5"
                disabled={loading}
              >
                {loading ? (
                  "Searching..."
                ) : (
                  <>
                    <i className="fa fa-search m-r-5"></i>Search
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="table-responsive pnl-by-market">
        {selectedMarket ? (
          <MarketBets market={selectedMarket} onBack={handleBack} />
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th></th>
                <th className="text-right b-r-0">P&L</th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={2} className="text-center">
                    Loading...
                  </td>
                </tr>
              </tbody>
            ) : reportData.length > 0 ? (
              <>
                <tbody>
                  {reportData.map((dateReport) => (
                    <React.Fragment key={dateReport.date}>
                      <tr>
                        <td colSpan={2} className="date-group b-r-0">
                          <span>
                            {new Date(dateReport.date).toLocaleDateString(
                              "en-GB"
                            )}
                          </span>
                        </td>
                      </tr>
                      {dateReport.matchList.map((match) => (
                        <React.Fragment key={match.matchName}>
                          <tr>
                            <td colSpan={2} className="event-group b-r-0">
                              <span>{match.matchName}</span>
                            </td>
                          </tr>
                          {match.marketList.map((market) => (
                            <tr key={market.marketId}>
                              <td>
                                <span>{market.marketName} |</span>
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleViewBets(market);
                                  }}
                                >
                                  View Bets
                                </a>
                              </td>
                              <td
                                className={`text-right b-r-0 ${
                                  market.pnl >= 0 ? "positive" : "negative"
                                }`}
                              >
                                {market.pnl.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td className="text-right">Total</td>
                            <td
                              className={`text-right b-r-0 ${
                                match.total >= 0 ? "positive" : "negative"
                              }`}
                            >
                              {match.total.toFixed(2)}
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
                <tbody>
                  <tr>
                    <td className="text-right b-r-0">Grand Total</td>
                    <td
                      className={`text-right b-r-0 ${
                        grandTotal >= 0 ? "positive" : "negative"
                      }`}
                    >
                      {grandTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={2} className="text-center">
                    No data found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        )}
      </div>
    </section>
  );
};

export default ProfitLoss;
