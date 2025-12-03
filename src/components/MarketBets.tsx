import React, { useState, useEffect } from "react";
import { getBetListByMarketId } from "../api/bet";

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
              bets.map((bet, index) => (
                <tr key={index}>
                  <td>{bet.userId}</td>
                  <td>{new Date(bet.placeTime).toLocaleString()}</td>
                  <td>{bet.selectionName}</td>
                  <td>{bet.isback ? "BACK" : "LAY"}</td>
                  <td>{bet.currency}</td>
                  <td className="text-right">{(bet.odds || 0).toFixed(2)}</td>
                  <td className="text-right">{(bet.stake || 0).toFixed(2)}</td>
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
    </div>
  );
};

export default MarketBets;
