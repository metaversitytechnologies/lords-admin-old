import React, { useState } from "react";
import SearchUser from "./SearchUser";

const ClientAccountStatement: React.FC = () => {
  const [userId, setUserId] = useState("");
  return (
    <div>
      <div className="column m-r-40">
        <div className="header">
          <h1>Clients Account Statement</h1>
        </div>
        <div>
          <div
            style={{ width: "270px" }}
            className="form-group v-t m-r-20 d-inline-block"
          >
            <label>From:</label>
            <input type="date" className="form-control" />
          </div>
          <div
            style={{ width: "270px" }}
            className="form-group v-t m-r-20 d-inline-block"
          >
            <label>To:</label>
            <input type="date" className="form-control" />
          </div>
          <div className="select-report d-inline-block col-md-2 form-group v-t report-search p-l-0 p-r-5">
            <label className="p-l-5">Search by user</label>
            <div className="search-box-container">
              <SearchUser
                value={userId}
                onChange={setUserId}
                placeholder="Enter Atleast 3 character"
              />
            </div>
          </div>
          <div className="form-group m-r-20 d-inline-block">
            <label className="d-block">&nbsp;</label>
            <button className="btn btn-primary" style={{ height: "35px" }}>
              <i className="fa fa-search m-r-5"></i>Search
            </button>
          </div>
        </div>
      </div>
      <div className="table-responsive col-sm-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th></th>
              <th className="text-right">P&amp;L</th>
              <th className="text-right">Credit Limit</th>
              <th className="text-right">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr className="group">
              <td>
                <b>16/11/2025</b>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>14:18:16</td>
              <td>Betting P&amp;L</td>
              <td style={{ cursor: "pointer" }}>
                Cricket - India v South Africa - Bookmaker
              </td>
              <td className="text-right negative">-120.00</td>
              <td className="text-right">-</td>
              <td className="text-right positive">1997.50</td>
            </tr>
            <tr>
              <td>07:51:01</td>
              <td>Betting P&amp;L</td>
              <td style={{ cursor: "pointer" }}>
                Cricket - Adelaide Strikers W v Perth Scorchers W - Bookmaker
              </td>
              <td className="text-right positive">74.50</td>
              <td className="text-right">-</td>
              <td className="text-right positive">2117.50</td>
            </tr>
            <tr>
              <td>05:13:47</td>
              <td>Betting P&amp;L</td>
              <td style={{ cursor: "pointer" }}>
                Cricket - 6 over runs AS W(AS W vs PS W)adv - Normal
              </td>
              <td className="text-right negative">-50.00</td>
              <td className="text-right">-</td>
              <td className="text-right positive">2043.00</td>
            </tr>
            <tr>
              <td>04:45:50</td>
              <td>Betting P&amp;L</td>
              <td style={{ cursor: "pointer" }}>
                Cricket - Match 1st over run(AS W vs PS W)adv - Normal
              </td>
              <td className="text-right negative">-50.00</td>
              <td className="text-right">-</td>
              <td className="text-right positive">2093.00</td>
            </tr>
            <tr className="group">
              <td>
                <b>12/11/2025</b>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>20:31:22</td>
              <td>Betting P&amp;L</td>
              <td style={{ cursor: "pointer" }}>
                Cricket - Mpumalanga Rhinos v Limpopo - Bookmaker
              </td>
              <td className="text-right negative">-50.00</td>
              <td className="text-right">-</td>
              <td className="text-right positive">2143.00</td>
            </tr>
            <tr className="group">
              <td>
                <b>09/11/2025</b>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>00:00:00</td>
              <td>Transfer</td>
              <td style={{ cursor: "pointer" }}>Opening Balance</td>
              <td className="text-right positive">2193.00</td>
              <td className="text-right">-</td>
              <td className="text-right positive">2193.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientAccountStatement;
