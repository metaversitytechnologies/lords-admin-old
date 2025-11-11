const BalanceInfo = () => {
  return (
    <>
      <div className="header">
        <h1>Balance Information</h1>
      </div>

      <section>
        <table className="w-auto table table-striped table-balance">
          <tbody>
            <tr>
              <th>Net Exposure</th>
              <td className="text-right positive negative">-125.50</td>
            </tr>

            <tr>
              <th>Balance Down</th>
              <td className="text-right positive negative">-450.00</td>
            </tr>

            <tr>
              <th>Balance Up</th>
              <td className="text-right positive">325.00</td>
            </tr>

            <tr>
              <th>Credit Limit</th>
              <td className="text-right positive">2000.00</td>
            </tr>

            <tr>
              <th>Available Credit</th>
              <td className="text-right positive">1875.00</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default BalanceInfo;
