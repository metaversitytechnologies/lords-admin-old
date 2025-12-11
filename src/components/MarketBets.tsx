import React, { useState, useEffect } from "react";
import { getBetListByMarketId } from "../api/bet";
import Pagination from "./Pagination";

interface Market {
  marketId: string;
  marketName: string;
  pnl: number;
}

interface Bet {
  userId: string;
  placeTime: string;
  selectionName: string;
  isback: boolean;
  currency: string;
  odds: number;
  stake: number;
  winLossStatus: string;
  netpnl: number;
}

interface MarketBetsProps {
  market: Market | null;
  onBack: () => void;
}

const MarketBets: React.FC<MarketBetsProps> = ({ market, onBack }) => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (market) {
      const fetchBets = async () => {
        setLoading(true);
        setError(null);
        try {
          const payload = { marketId: market.marketId };
          const response = await getBetListByMarketId(payload);
          setBets(response.data || []);
        } catch (err) {
          setError("Failed to fetch bets.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchBets();
    }
  }, [market]);

  return (
    <div className="table-responsive pnl-by-market">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#" onClick={onBack}>
              Markets
            </a>
          </li>
          <li aria-current="page" className="breadcrumb-item active">
            {market?.marketName}
          </li>
        </ol>
      </nav>
      <div className="row col-page">
        <div className="col-sm-12 col-md-6 p-l-0 p-r-5">
          <div className="row dataTables_length">
            <div className="p-l-m col">
              <label>
                Show
                <select
                  style={{ width: "60px" }}
                  className="form-control"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                entries
              </label>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="dataTables_filter">
            <div className="row">
              <div className="f-l-m col">
                <label>
                  Search:
                  <input
                    type="text"
                    placeholder="Type to Search"
                    className="form-control form-control-sm"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Member</th>
            <th>Placed</th>
            <th>Selection</th>
            <th>Type</th>
            <th>Currency</th>
            <th>Odds</th>
            <th>Stake</th>
            <th>Status</th>
            <th>Member Win/Loss</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan={9} className="text-center">
                Loading...
              </td>
            </tr>
          </tbody>
        ) : error ? (
          <tbody>
            <tr>
              <td colSpan={9} className="text-center text-danger">
                {error}
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {bets.length > 0 ? (
              bets
                .filter(
                  (bet) =>
                    !searchTerm ||
                    Object.values(bet).some((val) =>
                      String(val)
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                )
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((bet, index) => (
                  <tr key={index}>
                    <td>{bet.userId}</td>
                    <td>{new Date(bet.placeTime).toLocaleString()}</td>
                    <td>{bet.selectionName}</td>
                    <td>{bet.isback ? "BACK" : "LAY"}</td>
                    <td>{bet.currency}</td>
                    <td className="text-right">{(bet.odds || 0).toFixed(2)}</td>
                    <td className="text-right">
                      {(bet.stake || 0).toFixed(2)}
                    </td>
                    <td
                      className={
                        bet.winLossStatus === "WIN" ? "positive" : "negative"
                      }
                    >
                      <span>{bet.winLossStatus}</span>
                    </td>
                    <td
                      className={`text-right ${
                        (bet.netpnl || 0) >= 0 ? "positive" : "negative"
                      }`}
                    >
                      {(bet.netpnl || 0).toFixed(2)}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center">
                  No bets found for this market.
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(
          bets.filter(
            (bet) =>
              !searchTerm ||
              Object.values(bet).some((val) =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
              )
          ).length / itemsPerPage
        )}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MarketBets;
