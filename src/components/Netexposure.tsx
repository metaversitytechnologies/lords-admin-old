import { Link } from "react-router-dom";

const NetExposure = () => {
  const data = [
    {
      title: "India v South Africa",
      date: "11/14/2025 9:30:00 AM",
      markets: [
        {
          market: "Bookmaker",
          stake: -8.4,
          selection1: -8.4,
          selection2: 120.0,
          selection3: 120.0
        }
      ]
    },
    {
      title: "Adelaide Strikers W v Perth Scorchers W",
      date: "11/16/2025 4:40:00 AM",
      markets: [
        {
          market: "Bookmaker",
          stake: 50.0,
          selection1: 50.0,
          selection2: 0.0,
          selection3: -74.5
        }
      ],
      fancyMarkets: [
        {
          market: "6 over runs AS W(AS W vs PS W)adv",
          stake: 50.0,
          pl: 50.0
        },
        {
          market: "Match 1st over run(AS W vs PS W)adv",
          stake: 50.0,
          pl: 50.0
        }
      ]
    }
  ];

  return (
    <div>
      <div id="net-exposure" className="tab-pane net-exposure">
        <div className="header">
          <h1>Net Exposure</h1>
        </div>
        <div className="float-right">
          <span className="counter">{data.length}</span>
          <button className="btn btn-secondary m-l-10">Refresh</button>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th
                  style={{ minWidth: "10%", maxWidth: "10%", width: "10%" }}
                ></th>
                <th
                  style={{ minWidth: "8%", maxWidth: "8%", width: "8%" }}
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
          {data.map((item, index) => (
            <div key={index}>
              <table className="table m-b-5">
                <thead>
                  <tr className="title">
                    <td colSpan={11} className="text-white">
                      {item.title}
                      <span className="m-l-10"> ({item.date}) </span>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {item.markets.map((market, subIndex) => (
                    <tr key={subIndex}>
                      <td className="cell-market-title">
                        <span>{market.market}</span>
                      </td>
                      <td className="icon-group-cell">
                        <ul className="icon-group">
                          <li className="cell-market-workstation">
                            <Link
                              to="/gamedetailnew/4/466820683"
                              className="game-status"
                            >
                              <img
                                src="https://d3kb8xz339pq18.cloudfront.net/v12/static/backend/images/icons/exposure.png"
                                className="icon"
                                alt="exposure icon"
                              />
                            </Link>
                          </li>
                        </ul>
                      </td>
                      <td className="cell-stake">{market.stake.toFixed(2)}</td>
                      <td className="cell-selection-1">
                        <span
                          className={
                            market.selection1 >= 0 ? "positive" : "negative"
                          }
                        >
                          {market.selection1.toFixed(2)}
                        </span>
                      </td>
                      <td className="cell-selection-2">
                        <span
                          className={
                            market.selection2 >= 0 ? "positive" : "positive"
                          }
                        >
                          {market.selection2.toFixed(2)}
                        </span>
                      </td>
                      <td className="cell-selection-3">
                        <span
                          className={
                            market.selection3 >= 0 ? "positive" : "negative"
                          }
                        >
                          {market.selection3.toFixed(2)}
                        </span>
                      </td>
                      <td colSpan={5} className="right-empty"></td>
                    </tr>
                  ))}
                </tbody>
                {item.fancyMarkets && (
                  <tbody>
                    <tr className="fancy-tile">
                      <td colSpan={6} className="left-empty">
                        {item.title}
                      </td>
                      <td colSpan={5} className="left-empty text-right">
                        fancy
                      </td>
                    </tr>
                    {item.fancyMarkets.map((fancy, fancyIndex) => (
                      <tr key={fancyIndex}>
                        <td colSpan={6} className="left-empty"></td>
                        <td className="cell-market-title">
                          <span>{fancy.market}</span>{" "}
                          <span className="p-l-10"></span>
                        </td>
                        <td className="icon-group-cell">
                          <ul className="icon-group">
                            <li className="cell-market-workstation">
                              <Link
                                to="/gamedetailnew/4/466820683"
                                className="game-status"
                              >
                                <img
                                  src="https://d3kb8xz339pq18.cloudfront.net/v12/static/backend/images/icons/exposure.png"
                                  className="icon"
                                  alt="exposure icon"
                                />
                              </Link>
                            </li>
                          </ul>
                        </td>
                        <td className="cell-stake positive">
                          {fancy.stake.toFixed(2)}
                        </td>
                        <td className="cell-selection-2">
                          <span className="positive positive">
                            {fancy.pl.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetExposure;
