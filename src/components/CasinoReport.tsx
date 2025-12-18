import { useState } from "react";
import CasinoResultModal from "./CasinoResultModal";
import ReusableDatePicker from "./DatePicker";
import Pagination from "./Pagination";

export default function CasinoReport() {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleClose = () => {
    setShow(false);
    setSelectedItem(null);
  };
  const handleShow = (item: any) => {
    setSelectedItem(item);
    setShow(true);
  };

  const data = [
    {
      roundId: "101251115185930",
      winner: "Player A",
      playerA: {
        cards: ["QDD", "9CC", "4HH"]
      },
      playerB: {
        cards: ["4DD", "5HH", "4SS"]
      }
    },
    {
      roundId: "101251115185449",
      winner: "Player B",
      playerA: {
        cards: ["KDD", "8CC", "3HH"]
      },
      playerB: {
        cards: ["ADD", "JHH", "QSS"]
      }
    }
  ];

  return (
    <div>
      <div className="header">
        <h1>Casino Result Report</h1>
      </div>

      <div className=" w-100 float-left m-t-0">
        <div className="row m-b-10">
          <div className="col-12 col-md-auto form-group">
            <label className="d-block">From</label>
            <ReusableDatePicker selected={fromDate} onChange={setFromDate} />
          </div>
          <div className="col-12 col-md-auto form-group">
            <label className="d-block">Account Type</label>
            <select className="form-control">
              <option value="teen">One Day Teenpatti</option>
              <option value="teen9">Test Teenpatti</option>
              <option value="teen20">20-20 Teenpatti</option>
              <option value="poker">Live Poker One Day</option>
              <option value="poker20">Live Poker 20-20</option>
              <option value="poker6">6 Player Poker</option>
              <option value="ab20">Andar Bahar Casino</option>
              <option value="abj">Andar Bahar 2 Casino</option>
              <option value="worli">Worli Matka</option>
              <option value="3cardj">3 Cards Judgement</option>
              <option value="card32">32 Cards - A</option>
              <option value="teen8">Open TeenPatti</option>
              <option value="worli2">Instant Worli</option>
              <option value="lucky7">Lucky 7 - A</option>
              <option value="lucky7eu">Lucky 7 - B</option>
              <option value="dt20">20-20 Dragon Tiger</option>
              <option value="dt202">20-20 Dragon Tiger 2</option>
              <option value="aaa">Amar Akbar Anthony</option>
              <option value="btable">Bollywood Casino</option>
              <option value="dt6">1 Day Dragon Tiger</option>
              <option value="card32eu">32 Cards - B</option>
              <option value="war">Casino War</option>
              <option value="dtl20">20-20 Dragon Tiger Lion</option>
              <option value="cmeter">Casino Meter</option>
              <option value="baccarat">Baccarat</option>
              <option value="baccarat2">Baccarat2</option>
              <option value="cmatch20">20-20 Cricket Match</option>
              <option value="race20">Race 20-20</option>
              <option value="queen">Queen</option>
              <option value="teenmuf">Muflis Teenpatti</option>
              <option value="lucky15">Lucky 15</option>
              <option value="sicbo">Sic Bo</option>
              <option value="teenjoker">Teenpatti Joker</option>
              <option value="race17">Race To 17</option>
              <option value="dum10">Dus Ka Dum</option>
              <option value="teensin">29Card Baccarat</option>
              <option value="teen20c">20-20C Teenpatti</option>
              <option value="joker20">Teenpatti Joker 20-20</option>
            </select>

          </div>

          <div className="col-12 col-md-auto form-group d-flex align-items-end">
            <button type="submit" className="btn btn-primary btn-load-c">
              Load
            </button>
          </div>
        </div>

        <div className="table-responsive col-sm-12">
          <div className="row col-page">
            <div className="col-sm-12 col-md-6 p-l-0 p-r-5">
              <div className="row dataTables_length">
                {/* <div className="p-l-m col">
                  <label>
                    Show
                    <select
                      style={{ width: "60px" }}
                      className="form-control"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    entries
                  </label>
                </div> */}
              </div>
            </div>

            <div className="col-sm-12 col-md-6">
              <div className="dataTables_filter">
                <div className="row">
                  <div className="f-l-m col">
                    <label>
                      Search:
                      <input
                        type="text"
                        placeholder="Type to Search"
                        className="form-control form-control-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 p-l-0 p-r-5">
              <table
                role="table"
                className="table b-table table table-striped b-table-stacked-md"
              >
                <thead>
                  <tr>
                    <th className="text-left">Round Id</th>
                    <th className="text-left">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter(
                      (item) =>
                        item.roundId
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        item.winner
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((item) => (
                      <tr key={item.roundId}>
                        <td className="text-left">
                          <a
                            href="#"
                            onClick={() => handleShow(item)}
                            className="underline theme2font"
                          >
                            {item.roundId}
                          </a>
                        </td>
                        <td className="text-left">{item.winner}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="my-1 p-m-l col">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  data.filter(
                    (item) =>
                      item.roundId
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.winner
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  ).length / itemsPerPage
                )}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedItem && (
        <CasinoResultModal
          show={show}
          handleClose={handleClose}
          roundId={selectedItem.roundId}
          winner={selectedItem.winner}
          playerA={selectedItem.playerA}
          playerB={selectedItem.playerB}
        />
      )}
    </div>
  );
}
