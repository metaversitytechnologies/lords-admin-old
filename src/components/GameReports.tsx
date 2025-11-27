import { useState } from "react";
import ReusableModal from "./ReusableModal";
import ViewMoreBetsModal from "./ViewMoreBetsModal";
import SearchUser from "./SearchUser";

const GameReports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const eventNames = [
    { value: "0", label: "All" },
    { value: "1", label: "Football" },
    { value: "2", label: "Tennis" },
    { value: "4", label: "Cricket" },
    { value: "6", label: "Boxing" },
    { value: "8", label: "Motor Sport" },
    { value: "9", label: "Teen Patti Oneday" },
    { value: "10", label: "Teen Patti Test" },
    { value: "11", label: "Teen Patti 20" },
    { value: "12", label: "Poker 20" },
    { value: "13", label: "Poker Oneday" },
    { value: "14", label: "Andar Bahar" },
    { value: "15", label: "Worli" },
    { value: "16", label: "3 Card Judgement" },
    { value: "17", label: "Poker 9" },
    { value: "18", label: "32 Card A" },
    { value: "20", label: "Lottery" },
    { value: "22", label: "Open Teenpatti" },
    { value: "23", label: "Instant Worli" },
    { value: "24", label: "Lucky 7" },
    { value: "25", label: "20-20 Dragon Tiger" },
    { value: "26", label: "Bollywood Table" },
    { value: "27", label: "Amar Akbar Anthony" },
    { value: "28", label: "1Day Dragon Tiger" },
    { value: "29", label: "32 Card B" },
    { value: "31", label: "Casino War" },
    { value: "32", label: "20-20 Dragon Tiger Lion" },
    { value: "33", label: "Casino Meter" },
    { value: "35", label: "20-20 Cricket Match" },
    { value: "36", label: "Lucky 7 - B" },
    { value: "37", label: "Baccarat" },
    { value: "38", label: "Andar Bahar 2" },
    { value: "39", label: "Baccarat2" },
    { value: "40", label: "20-20 Dragon Tiger 2" },
    { value: "50", label: "Muflis Teenpatti" },
    { value: "52", label: "Kabaddi" },
    { value: "53", label: "Sic Bo" },
    { value: "54", label: "Teenpatti Joker" },
    { value: "55", label: "Lucky 15" },
    { value: "56", label: "Dus ka Dum" },
    { value: "57", label: "29Card Baccarat" },
    { value: "58", label: "Race to 17" },
    { value: "59", label: "20-20 Teenpatti C" },
    { value: "70", label: "Table Tennis" },
    { value: "71", label: "Badminton" },
    { value: "3503", label: "Darts" },
    { value: "7522", label: "Basketball" },
    { value: "2378961", label: "Election" },
    { value: "26420387", label: "Mixed Martial Arts" }
  ];

  const reportData = [
    {
      date: "2025-11-02",
      description: "lucky15 / Lucky 15161251102122141 / Lucky 15 / Wicket",
      credit: "-",
      debit: "-100.00",
      closing: "-100.00"
    },
    {
      date: "2025-11-02",
      description: "btable / Rno. 120251102122533 / btable / Ghulam",
      credit: "100.00",
      debit: "-",
      closing: "0.00"
    },
    {
      date: "2025-11-02",
      description:
        "btable / Rno. 120251102122635 / btable / Sahib Bibi Aur Ghulam",
      credit: "100.00",
      debit: "-",
      closing: "100.00"
    },
    {
      date: "2025-11-02",
      description:
        "btable / Rno. 120251102122736 / btable / Kis Kis Ko Pyaar Karoon",
      credit: "100.00",
      debit: "-",
      closing: "200.00"
    },
    {
      date: "2025-11-02",
      description: "Cricket / Australia v India / Bookmaker / India",
      credit: "93.00",
      debit: "-",
      closing: "293.00"
    },
    {
      date: "2025-11-12",
      description:
        "Cricket / Mpumalanga Rhinos v Limpopo / Bookmaker / Mpumalanga Rhinos",
      credit: "-",
      debit: "-50.00",
      closing: "243.00"
    }
  ];

  return (
    <div>
      <div className="listing-grid w-100 float-left m-t-0">
        <form className="m-b-10">
          <div className="header">
            <h1>Game Report</h1>
          </div>
          <div className="select-report d-inline-block col-md-2 form-group v-t p-l-0 p-r-5">
            <label className="p-l-5">Event Name</label>
            <select className="form-control">
              <option value="9999.9999">Select Event Name</option>
              {eventNames.map((event) => (
                <option key={event.value} value={event.value}>
                  {event.label}
                </option>
              ))}
            </select>
          </div>
          <div className="datepicker-wrapper d-inline-block col-md-2 form-group v-t p-l-0 p-r-5 m-b-15">
            <label className="p-l-5 d-block">From</label>
            <input type="date" className="form-control" />
          </div>
          <div className="datepicker-wrapper form-group d-inline-block col-md-2 v-t p-l-0 p-r-5">
            <label className="p-l-5 d-block">To</label>
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
          <div className="d-inline-block v-t m-l-0">
            <label className="d-block">&nbsp;</label>
            <button type="submit" className="btn btn-primary btn-load-c v-t">
              Load
            </button>
            <div className="d-inline-block m-l-5">
              <span className="btn btn-secondary m-l-5">Download CSV</span>
            </div>
          </div>
        </form>
        <div className="table-responsive col-sm-12">
          <div className="row col-page">
            <div className="col-sm-12 col-md-6 p-l-0 p-r-5">
              <div className="row dataTables_length">
                <div className="p-l-m col">
                  <label htmlFor="input-small">
                    Show
                    <select className="form-control custom-select custom-select-sm">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    entries
                  </label>
                </div>
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
                className="table b-table table-striped b-table-stacked-md"
              >
                <thead role="rowgroup">
                  <tr role="row">
                    <th role="columnheader" scope="col" className="text-center">
                      Date
                    </th>
                    <th role="columnheader" scope="col">
                      Description
                    </th>
                    <th role="columnheader" scope="col" className="text-right">
                      Credit
                    </th>
                    <th role="columnheader" scope="col" className="text-right">
                      Debit
                    </th>
                    <th role="columnheader" scope="col" className="text-right">
                      Closing
                    </th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  {reportData.map((row, index) => (
                    <tr role="row" key={index}>
                      <td
                        aria-colindex="1"
                        data-label="Date"
                        role="cell"
                        className="text-center"
                      >
                        <div>{row.date}</div>
                      </td>
                      <td
                        aria-colindex="2"
                        data-label="Description"
                        role="cell"
                      >
                        <div>
                          <a
                            href="#"
                            className="underline text-info"
                            onClick={(e) => {
                              e.preventDefault();
                              handleOpenModal();
                            }}
                          >
                            {row.description}
                          </a>
                        </div>
                      </td>
                      <td
                        aria-colindex="3"
                        data-label="Credit"
                        role="cell"
                        className="text-right"
                      >
                        <div>{row.credit}</div>
                      </td>
                      <td
                        aria-colindex="4"
                        data-label="Debit"
                        role="cell"
                        className="text-right"
                      >
                        <div>{row.debit}</div>
                      </td>
                      <td
                        aria-colindex="5"
                        data-label="Closing"
                        role="cell"
                        className="text-right"
                      >
                        <div>{row.closing}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="my-1 p-m-l col">
              <ul className="pagination my-0 b-pagination justify-content-end">
                <li className="page-item disabled">
                  <span className="page-link">«</span>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">‹</span>
                </li>
                <li className="page-item active">
                  <button type="button" className="page-link">
                    1
                  </button>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">›</span>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">»</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ReusableModal
        show={isModalOpen}
        handleClose={handleCloseModal}
        title="View More Bets"
        size="xl"
        position="top"
      >
        <ViewMoreBetsModal />
      </ReusableModal>
    </div>
  );
};

export default GameReports;
