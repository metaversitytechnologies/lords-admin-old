const ProfitLoss = () => {
  return (
    <>
      <div className="header">
        <h1>P&amp;L Report by Market</h1>
      </div>

      <div className="additional-filters mt-3">
        <form className="mb-3 d-flex flex-wrap align-items-end gap-2">
          <div className="form-group">
            <label>Event</label>
            <select className="form-control">
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
              <option value="39">Baccarat 2</option>
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

          <div className="form-group">
            <label>Market</label>
            <select className="form-control">
              <option value="all" selected>
                All
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>From</label>
            <input type="date" className="form-control" />
          </div>

          <div className="form-group">
            <label>To</label>
            <input type="date" className="form-control" />
          </div>

          <div className="form-group">
            <button className="btn btn-secondary">
              <i className="fa fa-search me-2"></i> Search
            </button>
          </div>
        </form>
      </div>

      <div className="table-responsive pnl-by-market mt-4">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Market</th>
              <th className="text-end">P&amp;L</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="fw-bold bg-light">
                02/11/2025
              </td>
            </tr>

            <tr>
              <td colSpan={2} className="fw-semibold text-primary">
                Australia v India
              </td>
            </tr>
            <tr>
              <td>
                Australia v India - Bookmaker | <a href="#">View Bets</a>
              </td>
              <td className="text-end text-danger">-4.65</td>
            </tr>
            <tr>
              <td className="text-end fw-bold">Total</td>
              <td className="text-end text-danger">-4.65</td>
            </tr>

            <tr>
              <td colSpan={2} className="fw-semibold text-primary">
                btable
              </td>
            </tr>
            <tr>
              <td>
                Rno. 120251102122736 - btable | <a href="#">View Bets</a>
              </td>
              <td className="text-end text-danger">-5.00</td>
            </tr>
            <tr>
              <td>
                Rno. 120251102122635 - btable | <a href="#">View Bets</a>
              </td>
              <td className="text-end text-danger">-5.00</td>
            </tr>
            <tr>
              <td>
                Rno. 120251102122533 - btable | <a href="#">View Bets</a>
              </td>
              <td className="text-end text-danger">-5.00</td>
            </tr>
            <tr>
              <td className="text-end fw-bold">Total</td>
              <td className="text-end text-danger">-15.00</td>
            </tr>

            <tr>
              <td colSpan={2} className="fw-semibold text-primary">
                Lucky15
              </td>
            </tr>
            <tr>
              <td>
                Lucky 15161251102122141 - Lucky 15 | <a href="#">View Bets</a>
              </td>
              <td className="text-end text-success">5.00</td>
            </tr>
            <tr>
              <td className="text-end fw-bold">Total</td>
              <td className="text-end text-success">5.00</td>
            </tr>
          </tbody>
          <tfoot className="table-light">
            <tr>
              <td className="text-end fw-bold">Grand Total</td>
              <td className="text-end text-danger">-4.65</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ProfitLoss;
