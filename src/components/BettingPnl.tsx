import { useState, useEffect } from "react";
import { getBettingPnl } from "../api/auth";
import MarketPnlBreakdown from "./MarketPnlBreakdown";
import ReusableDatePicker from "./DatePicker";
import Pagination from "./Pagination";

const BettingPnl = ({ userId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const [fromDate, setFromDate] = useState<Date | null>(oneWeekAgo);
  const [toDate, setToDate] = useState<Date | null>(today);

  const fetchBettingPnl = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        userId,
        fromDate: fromDate?.toISOString().split("T")[0],
        toDate: toDate?.toISOString().split("T")[0],
        noOfRecords: 99999,
        index: 0,
      };
      const response = await getBettingPnl(payload);
      if (response.data) {
        const pnlData = response.data.flatMap((item) => item.pnlList);
        setData(pnlData);
      } else {
        setData([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBettingPnl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleMarketClick = (market) => {
    setSelectedMarket(market);
  };

  const handleBackClick = () => {
    setSelectedMarket(null);
  };

  return (
    <div id="betting-pnl" className="tab-pane fade active show">
      <div>
        <div className="header">
          <div className="datepicker-wrapper d-inline-block col-md-2 form-group v-t p-l-0 p-r-5">
            <label className="p-l-5">From</label>
            <ReusableDatePicker selected={fromDate} onChange={setFromDate} />
          </div>
          <div className="datepicker-wrapper form-group d-inline-block col-md-2 v-t p-l-0 p-r-5">
            <label className="p-l-5 d-block">To</label>
            <ReusableDatePicker selectesd={toDate} onChange={setToDate} />
          </div>
          <div className="d-inline-block v-t p-l-0">
            <label className="p-l-5 d-block">&nbsp;</label>
            <button
              className="btn btn-secondary"
              onClick={fetchBettingPnl}
              disabled={loading}
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <i className="fa fa-search m-r-5"></i>Search
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <ul className="text-left">
          {/* Summary can be calculated and displayed here if needed */}
        </ul>
      </div>
      {selectedMarket ? (
        <MarketPnlBreakdown
          market={selectedMarket}
          onBack={handleBackClick}
          userId={userId}
          fromDate={fromDate}
          toDate={toDate}
        />
      ) : (
        <div>
          <div className="row col-page">
            <div className="col-sm-12 col-md-6 p-l-0 p-r-5">
              <div className="row dataTables_length">
                <div className="p-l-m col">
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
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Market</th>
                <th>Start Time</th>
                <th>Settled</th>
                <th className="text-right">Net Win</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data
                  .filter((item) =>
                    item.marketName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>
                        <a
                          href="javascript:void(0)"
                          onClick={() => handleMarketClick(item)}
                        >
                          {item.marketName}
                        </a>
                      </td>
                      <td>
                        <span>
                          {item.startTime
                            ? new Date(item.startTime).toLocaleString()
                            : "-"}
                        </span>
                      </td>
                      <td>
                        <span>
                          {item.settledTime
                            ? new Date(item.settledTime).toLocaleString()
                            : "-"}
                        </span>
                      </td>
                      <td className="text-right">
                        <span
                          className={
                            item.netWin >= 0 ? "positive" : "negative"
                          }
                        >
                          {typeof item.netWin === "number"
                            ? item.netWin.toFixed(2)
                            : "0.00"}
                        </span>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(
              data.filter((item) =>
                item.marketName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ).length / itemsPerPage
            )}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default BettingPnl;
