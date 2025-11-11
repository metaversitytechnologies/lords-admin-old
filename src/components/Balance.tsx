const Balance = () => {
  return (
    <div className="balance">
      <div className="status">
        <dt className="status-list">
          <dt>Balance Down:</dt> <dd className="positive negative"> -193.00</dd>
          <dt>Balance Up:</dt> <dd className="positive positive">185.00</dd>
          <dt>Net Exposure:</dt> <dd className="positive negative">0.00</dd>{" "}
          <dt>Available Credit:</dt> <dd>42.00</dd>
        </dt>

        <div
          className="d-inline-block float-right"
          style={{ marginTop: "-5px" }}
        >
          <button className="btn btn-secondary d-inline-block">Refresh</button>
        </div>
      </div>
    </div>
  );
};

export default Balance;
