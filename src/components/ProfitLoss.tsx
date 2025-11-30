import { useState } from 'react';

const ProfitLoss: React.FC = () => {
  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const [fromDate, setFromDate] = useState(
    oneWeekAgo.toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(today.toISOString().split("T")[0]);

  return (
    <section className="apl-section">
      <div>
        <div className="header">
          <h1>P&L Report by Market</h1>
        </div>
        <div className="additional-filters m-t-10">
          <form data-vv-scope="myBets" className="m-b-10">
            <div className="dropdown long-width d-inline-block v-t">
              <label className="d-block">Event</label>
              <select className="dropdown-toggle dropdown-button">
                <option value="0">All</option>
                <option value="1">Football</option>
                <option value="2">Tennis</option>
                <option value="4">Cricket</option>
                <option value="6">Boxing</option>
                <option value="8">Motor Sport</option>
                <option value="9">Teen Patti Oneday</option>
                <option value="10">Teen Patti Test</option>
                <option value="11">Teen Patti 20</option>
                <option value="12">Poker 20</option>
                <option value="13">Poker Oneday</option>
                <option value="14">Andar Bahar</option>
                <option value="15">Worli</option>
                <option value="16">3 Card Judgement</option>
                <option value="17">Poker 9</option>
                <option value="18">32 Card A</option>
                <option value="20">Lottery</option>
                <option value="22">Open Teenpatti</option>
                <option value="23">Instant Worli</option>
                <option value="24">Lucky 7</option>
                <option value="25">20-20 Dragon Tiger</option>
                <option value="26">Bollywood Table</option>
                <option value="27">Amar Akbar Anthony</option>
                <option value="28">1Day Dragon Tiger</option>
                <option value="29">32 Card B</option>
                <option value="31">Casino War</option>
                <option value="32">20-20 Dragon Tiger Lion</option>
                <option value="33">Casino Meter</option>
                <option value="35">20-20 Cricket Match</option>
                <option value="36">Lucky 7 - B</option>
                <option value="37">Baccarat</option>
                <option value="38">Andar Bahar 2</option>
                <option value="39">Baccarat2</option>
                <option value="40">20-20 Dragon Tiger 2</option>
                <option value="50">Muflis Teenpatti</option>
                <option value="52">Kabaddi</option>
                <option value="53">Sic Bo</option>
                <option value="54">Teenpatti Joker</option>
                <option value="55">Lucky 15</option>
                <option value="56">Dus ka Dum</option>
                <option value="57">29Card Baccarat</option>
                <option value="58">Race to 17</option>
                <option value="59">20-20 Teenpatti C</option>
                <option value="70">Table Tennis</option>
                <option value="71">Badminton</option>
                <option value="3503">Darts</option>
                <option value="7522">Basketball</option>
                <option value="2378961">Election</option>
                <option value="26420387">Mixed Martial Arts</option>
              </select>
            </div>
            <div className="dropdown long-width m-l-10 d-inline-block v-t">
              <label className="d-block">Market</label>
              <select className="dropdown-toggle dropdown-button title">
                <option value="all" selected>
                  All
                </option>
              </select>
            </div>
            <div
              style={{ width: "240px" }}
              className="form-group v-t m-l-10 d-inline-block"
            >
              <label>From:</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <span className="text-danger error-report m-l-10"></span>
            <div
              style={{ width: "240px" }}
              className="form-group v-t d-inline-block"
            >
              <label className="d-block">To</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <span className="text-danger error-report"></span>
            <div className="m-l-5 m-b-10 d-inline-block v-t">
              <label className="d-block">&nbsp;</label>
              <button className="btn btn-secondary m-l-5">
                <i className="fa fa-search m-r-5"></i>Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="table-responsive pnl-by-market">
        <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th className="text-right b-r-0">P&L</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="date-group b-r-0">
                <span>16/11/2025</span>
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="event-group b-r-0">
                <span>Adelaide Strikers W v Perth Scorchers W</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>6 over runs AS W(AS W vs PS W)adv - Normal |</span>
                <a href="javascript:void(0)">View Bets</a>
              </td>
              <td className="text-right b-r-0 positive">2.50</td>
            </tr>
            <tr>
              <td>
                <span>Match 1st over run(AS W vs PS W)adv - Normal |</span>
                <a href="javascript:void(0)">View Bets</a>
              </td>
              <td className="text-right b-r-0 positive">2.50</td>
            </tr>
            <tr>
              <td>
                <span>
                  Adelaide Strikers W v Perth Scorchers W - Bookmaker |
                </span>
                <a href="javascript:void(0)">View Bets</a>
              </td>
              <td className="text-right b-r-0 negative">-3.73</td>
            </tr>
            <tr>
              <td className="text-right">Total</td>
              <td className="text-right b-r-0 positive">1.27</td>
            </tr>
            <tr>
              <td colSpan={5} className="date-group b-r-0">
                <span>14/11/2025</span>
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="event-group b-r-0">
                <span>India v South Africa</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>India v South Africa - Bookmaker |</span>
                <a href="javascript:void(0)">View Bets</a>
              </td>
              <td className="text-right b-r-0 positive">6.00</td>
            </tr>
            <tr>
              <td className="text-right">Total</td>
              <td className="text-right b-r-0 positive">6.00</td>
            </tr>
            <tr>
              <td colSpan={5} className="date-group b-r-0">
                <span>12/11/2025</span>
              </td>
            </tr>
            <tr>
              <td colSpan={5} className="event-group b-r-0">
                <span>Mpumalanga Rhinos v Limpopo</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Mpumalanga Rhinos v Limpopo - Bookmaker |</span>
                <a href="javascript:void(0)">View Bets</a>
              </td>
              <td className="text-right b-r-0 positive">2.50</td>
            </tr>
            <tr>
              <td className="text-right">Total</td>
              <td className="text-right b-r-0 positive">2.50</td>
            </tr>
            <tr>
              <td colSpan={5} className="event-group b-r-0">
                <span>Garden Route Badgers v Eastern Storm</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Garden Route Badgers v Eastern Storm - Bookmaker |</span>
                <a href="javascript:void(0)">View Bets</a>
              </td>
              <td className="text-right b-r-0 negative">-0.85</td>
            </tr>
            <tr>
              <td className="text-right">Total</td>
              <td className="text-right b-r-0 negative">-0.85</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="text-right b-r-0">Grand Total</td>
              <td className="text-right b-r-0 positive">8.92</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProfitLoss;
