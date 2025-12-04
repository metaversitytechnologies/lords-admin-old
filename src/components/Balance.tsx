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
    <div className="balance">
      <div className="status">
        <dt className="status-list">
          <dt>Balance Down:</dt>{" "}
          <dd
            className={`positive ${
              balance && balance.balanceDown <= 0 ? "negative" : "positive"
            }`}
          >
            {" "}
            {balance ? balance.balanceDown.toFixed(2) : "..."}
          </dd>
          <dt>Balance Up:</dt>{" "}
          <dd
            className={`positive ${
              balance && balance.balanceUp <= 0 ? "negative" : "positive"
            }`}
          >
            {balance ? balance.balanceUp.toFixed(2) : "..."}
          </dd>
          <dt>Net Exposure:</dt>{" "}
          <dd
            className={`positive ${
              balance && balance.netExposure <= 0 ? "negative" : "positive"
            }`}
          >
            {balance ? balance.netExposure.toFixed(2) : "..."}
          </dd>{" "}
          <dt>Available Credit:</dt>{" "}
          <dd>{balance ? balance.availableCredit.toFixed(2) : "..."}</dd>
        </dt>

        <div
          className="d-inline-block float-right"
          style={{ marginTop: "-5px" }}
        >
          <button
            className="btn btn-secondary d-inline-block"
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
};

export default Balance;
