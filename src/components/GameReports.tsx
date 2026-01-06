import { useState, useEffect } from "react";
import ReusableModal from "./ReusableModal";
import ViewMoreBetsModal from "./ViewMoreBetsModal";
import SearchUser from "./SearchUser";
import { getGameReportLord, getSportListLord } from "../api/reports";
import ReusableDatePicker from "./DatePicker";
import { CSVLink } from "react-csv";
import Pagination from "./Pagination";

interface Report {
  date: string;
  description: string;
  credit: number;
  debit: number;
  closing: number;
  matchId?: string;
  matchid?: string;
  marketId?: string;
}

const GameReports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [selectedMarketId, setSelectedMarketId] = useState<string | null>(null);
  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const [fromDate, setFromDate] = useState<Date | null>(oneWeekAgo);
  const [toDate, setToDate] = useState<Date | null>(today);
  const [eventType, setEventType] = useState("9999.9999");
  const [reportData, setReportData] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sports, setSports] = useState<any[]>([]);

  const [validationError, setValidationError] = useState<string | null>(null);

  // Pagination & Search States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = (row: Report) => {
    const matchId = row.matchId || row.matchid || null;
    const marketId = row.marketId || null;
    setSelectedMatchId(matchId || marketId);
    setSelectedMarketId(marketId || matchId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMatchId(null);
  };



  const loadReport = async () => {
    if (eventType === "9999.9999") {
      setValidationError("Please Select a Event");
      setReportData([]);
      return;
    }
    setValidationError(null);
    setLoading(true);
    setError(null);
    try {
      const response = await getGameReportLord(fromDate?.toISOString().split("T")[0], toDate?.toISOString().split("T")[0], eventType);
      setReportData(response.data || []);
    } catch (err) {
      setError("Failed to load report. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
      // Reset to page 1 when new data is loaded
      setCurrentPage(1); 
    }
  };

  useEffect(() => {
    // loadReport(); // Removed initial load
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const response = await getSportListLord();
      if (response.status) {
        setSports(response.data);
      }
    } catch (error) {
      console.error("Error fetching sports:", error);
    }
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadReport();
  };

  return (
    <div>
      <div className="w-100 float-left m-t-0">
        <form className="m-b-10" onSubmit={handleFormSubmit}>
          <div className="header">
            <h1>Game Report</h1>
          </div>
          <div className="select-report d-inline-block form-group v-t p-l-0 p-r-5">
            <label className="p-l-5">Event Name</label>
            <select
              className="form-control"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="9999.9999">Select Event Name</option>
              {sports.map((sport: any, index: number) => (
                <option key={index} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-inline-block form-group v-t p-l-0 p-r-5 m-b-15">
            <label className="p-l-5 d-block">From</label>
            <ReusableDatePicker selected={fromDate} onChange={setFromDate} />
          </div>
          <div className="form-group d-inline-block v-t p-l-0 p-r-5">
            <label className="p-l-5 d-block">To</label>
            <ReusableDatePicker selected={toDate} onChange={setToDate} />
          </div>
          <div className="select-report d-inline-block form-group v-t report-search p-l-0 p-r-5">
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
            <button
              type="submit"
              className="btn btn-primary btn-load-c v-t"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load"}
            </button>
            <div className="d-inline-block m-l-5">
              <CSVLink
                data={reportData}
                filename="game-report.csv"
                className="btn btn-secondary m-l-5"
              >
                Download CSV
              </CSVLink>
            </div>
          </div>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-responsive col-sm-12">
          <div className="row col-page">
            <div className="col-sm-12 col-md-6 p-l-0 p-r-5">
              <div className="row dataTables_length">
                <div className="p-l-m col">
                  <label htmlFor="input-small">
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
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
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

                  {(() => {
                    if (validationError) {
                      return (
                        <tr>
                          <td colSpan={5} className="text-center text-danger">
                            {validationError}
                          </td>
                        </tr>
                      );
                    }

                    if (loading) {
                      return (
                        <tr>
                          <td colSpan={5} className="text-center">
                            Loading...
                          </td>
                        </tr>
                      );
                    }

                    const filteredData = reportData.filter((item) =>
                       searchTerm === "" ||
                       item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.date.includes(searchTerm)
                    );

                    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
                    const indexOfLastItem = currentPage * itemsPerPage;
                    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);


                    if (reportData.length === 0 || currentItems.length === 0) {
                      return (
                        <tr>
                          <td colSpan={5} className="text-center">
                            There are no records to show
                          </td>
                        </tr>
                      );
                    }

                    return currentItems.map((row, index) => (
                      <tr role="row" key={index}>
                        <td
                          aria-colindex={1}
                          data-label="Date"
                          role="cell"
                          className="text-center"
                        >
                          <div>{row.date}</div>
                        </td>
                        <td
                          aria-colindex={2}
                          data-label="Description"
                          role="cell"
                        >
                          <div>
                            <a
                              href="#"
                              className="underline"
                              onClick={(e) => {
                                e.preventDefault();
                                handleOpenModal(row);
                              }}
                            >
                              {row.description}
                            </a>
                          </div>
                        </td>
                        <td
                          aria-colindex={3}
                          data-label="Credit"
                          role="cell"
                          className="text-right"
                        >
                          <div>{row.credit}</div>
                        </td>
                        <td
                          aria-colindex={4}
                          data-label="Debit"
                          role="cell"
                          className="text-right"
                        >
                          <div>{row.debit}</div>
                        </td>
                        <td
                          aria-colindex={5}
                          data-label="Closing"
                          role="cell"
                          className="text-right"
                        >
                          <div>{row.closing}</div>
                        </td>
                      </tr>
                    ))
;
                  })()}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="my-1 p-m-l col">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  reportData.filter((item) =>
                    searchTerm === "" ||
                    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.date.includes(searchTerm)
                  ).length / itemsPerPage
                )}
                onPageChange={setCurrentPage}
              />
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
        <ViewMoreBetsModal
          matchId={selectedMatchId ?? undefined}
          marketId={selectedMarketId ?? undefined}
        />
      </ReusableModal>
    </div>
  );
};

export default GameReports;
