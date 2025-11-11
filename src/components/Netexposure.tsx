const NetExposure = () => {
  return (
    <div id="net-exposure" className="tab-pane net-exposure">
      <div className="header">
        <h1>Net Exposure</h1>
      </div>

      <div className="float-right">
        <span className="counter">3</span>
        <button className="btn btn-secondary m-l-10">Refresh</button>
      </div>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th
                style={{ minWidth: "10%", maxWidth: "10%", width: "10%" }}
              ></th>
              <th style={{ minWidth: "8%", maxWidth: "8%", width: "8%" }}></th>

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
      </div>
    </div>
  );
};

export default NetExposure;
