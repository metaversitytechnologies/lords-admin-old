import { useState, useEffect } from "react";
import { getBalanceByUserId } from "../api/auth";

const BalanceInfo = ({ isTabView = false }) => {
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userData = localStorage.getItem("user");
  const userId = userData ? JSON.parse(userData).userId : null;

  useEffect(() => {
    if (userId) {
      const fetchBalance = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await getBalanceByUserId({ userId });
          setBalanceData(response.data);
          console.log(balanceData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchBalance();
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className={`${isTabView ? "" : "balance"}`}>
      {!isTabView && (
        <div className="header">
          <h1>Balance Information</h1>
        </div>
      )}

      <section>
        {balanceData ? (
          <table className="w-auto table table-striped table-balance">
            <tbody>
              <tr>
                <th>Net Exposure</th>
                <td
                  className={`text-right ${
                    balanceData.netExposure >= 0 ? "positive" : "negative"
                  }`}
                >
                  {balanceData.netExposure.toFixed(2)}
                </td>
              </tr>

              <tr>
                <th>Balance Down</th>
                <td
                  className={`text-right ${
                    balanceData.balanceDown >= 0 ? "positive" : "negative"
                  }`}
                >
                  {balanceData.balanceDown.toFixed(2)}
                </td>
              </tr>

              <tr>
                <th>Balance Up</th>
                <td
                  className={`text-right ${
                    balanceData.balanceUp >= 0 ? "positive" : "negative"
                  }`}
                >
                  {balanceData.balanceUp.toFixed(2)}
                </td>
              </tr>

              <tr>
                <th>Credit Limit</th>
                <td
                  className={`text-right ${
                    balanceData.creditLimit >= 0 ? "positive" : "negative"
                  }`}
                >
                  {balanceData.creditLimit.toFixed(2)}
                </td>
              </tr>

              <tr>
                <th>Available Credit</th>
                <td
                  className={`text-right ${
                    balanceData.availableCredit >= 0 ? "positive" : "negative"
                  }`}
                >
                  {balanceData.availableCredit.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>No balance information available.</p>
        )}
      </section>
    </div>
  );
};

export default BalanceInfo;
