import React, { useState, useEffect } from "react";
import { getBalance } from "../api/auth";
import { useAuth } from "../context/AuthContext";

interface BalanceData {
  netExposure: number;
  balanceDown: number;
  balanceUp: number;
  creditLimit: number;
  availableCredit: number;
}

const Balance: React.FC = () => {
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchBalance = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBalance();
      if (response.status && response.data) {
        setBalance(response.data);
      } else {
        setError(response.message || "Failed to fetch balance");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.passwordtype !== "old") {
      fetchBalance();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleRefresh = () => {
    if (user?.passwordtype !== "old") {
      fetchBalance();
    }
  };

  if (user?.passwordtype === "old") {
    return null; // Or some placeholder
  }

  return (
    <div className="balance-bar">
      <div className="balance-scroll-container">
        {/* Balance Down */}
        <div className="balance-pill">
          <span className="label">
            <span className="long-text">Balance Down:</span>
            <span className="short-text">Down:</span>
          </span>
          <span
            className={`value ${
              balance && balance.balanceDown <= 0 ? "negative" : "positive"
            }`}
          >
            {balance ? balance.balanceDown.toFixed(2) : "..."}
          </span>
        </div>

        {/* Balance Up */}
        <div className="balance-pill">
          <span className="label">
            <span className="long-text">Balance Up:</span>
            <span className="short-text">Up:</span>
          </span>
          <span
            className={`value ${
              balance && balance.balanceUp <= 0 ? "negative" : "positive"
            }`}
          >
            {balance ? balance.balanceUp.toFixed(2) : "..."}
          </span>
        </div>

        {/* Net Exposure */}
        <div className="balance-pill">
          <span className="label">
            <span className="long-text">Net Exposure:</span>
            <span className="short-text">Exp:</span>
          </span>
          <span
            className={`value ${
              balance && balance.netExposure <= 0 ? "negative" : "positive"
            }`}
          >
            {balance ? balance.netExposure.toFixed(2) : "..."}
          </span>
        </div>

        {/* Available Credit */}
        <div className="balance-pill">
          <span className="label">
            <span className="long-text">Available Credit:</span>
            <span className="short-text">Credit:</span>
          </span>
          <span className="value">
            {balance ? balance.availableCredit.toFixed(2) : "..."}
          </span>
        </div>
      </div>

      <div className="refresh-container">
        <button
          className="btn btn-secondary btn-sm"
          onClick={handleRefresh}
          disabled={loading}
          style={{ borderRadius: "5px" }}
        >
          {loading ? "..." : <i className="fas fa-sync-alt"></i>}
        </button>
      </div>
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
};

export default Balance;
