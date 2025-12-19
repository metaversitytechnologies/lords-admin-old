import { useState, useEffect, Fragment } from "react";
import { getBettingPnl } from "../api/auth";
import MarketPnlBreakdown from "./MarketPnlBreakdown";
import ReusableDatePicker from "./DatePicker";
import Pagination from "./Pagination";

const BettingPnl = ({ userId }) => {
  const [data, setData] = useState([]);
  const [pnLData, setPnLData] = useState({});
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
        index: 0
      };
      const response = await getBettingPnl(payload);
      if (response.data) {
        setPnLData(response.data);
        const pnlData = response.data?.dataList.flatMap((group) => {
          if (!group.date) return [];
          const [year, month, day] = group.date.split("-");
          const displayDate = `${day}/${month}/${year}`;
          return group.pnlList.map((pnl) => ({
            ...pnl,
            settledDateTimeForSorting: new Date(
              `${group.date}T${pnl.settledTime}`
            ),
            displaySettledTime: `${displayDate} ${pnl.settledTime}`,
            displayDate: displayDate
          }));
        });
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

  const filteredData = data.filter((item) =>
    item.marketName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort(
    (a, b) =>
      (b.settledDateTimeForSorting?.getTime() || 0) -
      (a.settledDateTimeForSorting?.getTime() || 0)
  );

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            <ReusableDatePicker selected={toDate} onChange={setToDate} />
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
            <div className="col-2 py-2">
              <div>
                Cricket: <span className={
                              pnLData?.cricketPnl >= 0 ? "positive" : "negative"
                            }>{ pnLData?.cricketPnl} </span>
              </div>
            </div>
            <div className="col-2 py-2">
                Total P&L: <span className={
                              pnLData?.totalPnl >= 0 ? "positive" : "negative"
                            }> { pnLData?.totalPnl} </span>
              </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Market</th>
                <th>Start Time</th>
                <th>Settled</th>
                <th className="text-right">Net Win</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                if (paginatedData.length === 0) {
                  return (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No data available
                      </td>
                    </tr>
                  );
                }

                let lastDate = "";
                if (currentPage > 1) {
                  const lastItemOfPreviousPage =
                    sortedData[(currentPage - 1) * itemsPerPage - 1];
                  if (lastItemOfPreviousPage) {
                    lastDate = lastItemOfPreviousPage.displayDate;
                  }
                }

                return paginatedData.map((item) => {
                  const showDateHeader = item.displayDate !== lastDate;
                  lastDate = item.displayDate;

                  return (
                    <Fragment key={item.marketId}>
                      {showDateHeader && (
                        <tr className="group">
                          <td>{item.displayDate}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      )}
                      <tr>
                        <td>
                          <a
                            href="javascript:void(0)"
                            onClick={() => handleMarketClick(item)}
                          >
                            {item.marketName}
                          </a>
                        </td>
                        <td>
                          <span>{item.startTime}</span>
                        </td>
                        <td>
                          <span>{item.displaySettledTime}</span>
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
                    </Fragment>
                  );
                });
              })()}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(sortedData.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default BettingPnl;
