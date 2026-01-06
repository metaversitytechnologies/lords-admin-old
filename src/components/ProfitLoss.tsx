import React, { useState, useEffect } from "react";
import { getPnlReportByMarketId } from "../api/bet";
import { getSportListLord, getMarketListSportWiseLord } from "../api/reports";
import MarketBets from "./MarketBets"; // Import MarketBets
import ReusableDatePicker from "./DatePicker";

interface Market {
  marketId: string;
  marketName: string;
  matchName?: string;
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
  const [eventName, setEventName] = useState("All");
  const [marketName, setMarketName] = useState("All");
  const [reportData, setReportData] = useState<DateReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null); // State for selected market
  const [sports, setSports] = useState<any[]>([]);
  const [markets, setMarkets] = useState<any[]>([]);

  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const response = await getSportListLord();
      if (response.status) {
        setSports(response.data);
      }
    } catch (error) {
      console.error("Error fetching sports:", error);
    }
  };

  const fetchMarkets = async (sportId: string) => {
    if (!sportId || sportId === "0") {
      setMarkets([]);
      return;
    }
    try {
      const payload = { sportId: sportId === "All" ? "All" : sportId };
      const response = await getMarketListSportWiseLord(payload);
      if (response.status) {
        setMarkets(response.data);
      }
    } catch (error) {
      console.error("Error fetching markets:", error);
    }
  };

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sportName = e.target.value;
    setEventName(sportName);
    setMarketName("all"); // Reset market selection
    fetchMarkets(sportName);
  };

  const buildPayload = () => ({
    eventName: eventName || "All",
    marketName: marketName || "all",
    fromDate: fromDate?.toISOString().split("T")[0],
    toDate: toDate?.toISOString().split("T")[0],
  });

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setHasSearched(true);
    try {
      const payload = buildPayload();
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
    // Fetch data only when not viewing bets and if a search has been performed
    if (!selectedMarket && hasSearched) {
      handleSearch();
    }
  }, [selectedMarket]);

  const handleViewBets = (market: Market, matchName?: string) => {
    setSelectedMarket({ ...market, matchName });
  };

  const handleBack = () => {
    setSelectedMarket(null);
  };

  useEffect(() => {
    if (!hasSearched && sports.length) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sports]);

  return (
    <section>
      <div>
        <div className="header">
          <h1>P&L Report by Market</h1>
        </div>
        <div className="additional-filters m-t-10">
          <form
            onSubmit={handleSearch}
            data-vv-scope="myBets"
            className="m-b-10">
            <div className="pnl dropdown long-width d-inline-block v-t">
              <label className="d-block">Event</label>
              <select
                className="dropdown-toggle dropdown-button"
                value={eventName}
                onChange={handleSportChange}>
                {sports.map((sport: any, index: number) => (
                  <option key={index} value={sport.id}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown long-width m-l-10 d-inline-block v-t">
              <label className="d-block">Market</label>
              <select
                className="dropdown-toggle dropdown-button title"
                value={marketName}
                onChange={(e) => setMarketName(e.target.value)}>
                {markets.length > 0 ? (
                  markets.map((market: any, index: number) => (
                    <option key={index} value={market.name}>
                      {market.name}
                    </option>
                  ))
                ) : (
                  <option value="all">All</option>
                )}
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
                disabled={loading}>
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
        ) : hasSearched ? (
          <table className="table">
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
                      <tr className="groupdate">
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
                                  className="m-l-5"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleViewBets(market, match.matchName);
                                  }}>
                                  View Bets
                                </a>
                              </td>
                              <td
                                className={`text-right b-r-0 ${
                                  market.pnl >= 0 ? "positive" : "negative"
                                }`}>
                                {market.pnl.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                          <tr className="totalrow">
                            <td className="text-right">Total</td>
                            <td
                              className={`text-right b-r-0 ${
                                match.total >= 0 ? "positive" : "negative"
                              }`}>
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
                      }`}>
                      {grandTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={2} className="text-center">
                    {hasSearched ? "No data found" : ""}
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        ) : null}
      </div>
    </section>
  );
};

export default ProfitLoss;
