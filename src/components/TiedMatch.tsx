import React from "react";

type Box = {
  className: string;
  odds: string;
  size: string;
};

type Row = {
  name: string;
  boxes: Box[];
};

type Market = {
  title: string;
  rows: Row[];
};

type TiedMatchProps = {
  market?: Market;
};

const TiedMatch: React.FC<TiedMatchProps> = ({ market }) => {
  const data: Market = market ?? {
    title: "TIED_MATCH",
    rows: [
      {
        name: "Yes",
        boxes: [
          { className: "bl-box back2", odds: "6.2", size: "1" },
          { className: "bl-box back1", odds: "15", size: "22.32" },
          { className: "bl-box back", odds: "21", size: "74.68" },
          { className: "bl-box lay", odds: "55", size: "1.31" },
          { className: "bl-box lay1", odds: "60", size: "1" },
          { className: "bl-box lay2", odds: "110", size: "2.55" }
        ]
      },
      {
        name: "No",
        boxes: [
          { className: "bl-box back2", odds: "1.01", size: "337.49" },
          { className: "bl-box back1", odds: "1.02", size: "52.42" },
          { className: "bl-box back", odds: "1.03", size: "11.87" },
          { className: "bl-box lay", odds: "1.05", size: "1.49K" },
          { className: "bl-box lay1", odds: "1.06", size: "2" },
          { className: "bl-box lay2", odds: "1.07", size: "311.15" }
        ]
      }
    ]
  };

  return (
    <div className="market-4 mt-2">
      <div className="bet-table">
        {/* Header */}
        <div className="bet-table-header">
          <div className="nation-name d-flex align-items-center justify-content-between">
            <span>{data.title}</span>

            <div>
              <button
                type="button"
                className="btn btn-secondary btn-sm bet-lock-btn me-2"
              >
                Bet Lock
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-sm bet-lock-btn"
              >
                Book
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bet-table-body" data-title="OPEN">
          {/* Table Header Row */}
          <div className="bet-table-row fw-bold text-center">
            <div className="nation-name"></div>
            <div className="bl-title"></div>
            <div className="bl-title"></div>
            <div className="back bl-title back-title">Back</div>
            <div className="lay bl-title lay-title">Lay</div>
            <div className="bl-title"></div>
            <div className="bl-title"></div>
          </div>

          {/* Data Rows */}
          {data.rows.map((row, i) => (
            <div className="bet-table-row" data-title="ACTIVE" key={i}>
              <div className="nation-name">
                <p>
                  <span>{row.name}</span>
                </p>
              </div>

              {row.boxes.map((box, j) => (
                <div className={box.className} key={j}>
                  <span className="d-block odds">{box.odds}</span>
                  <span className="d-block">{box.size}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TiedMatch;
