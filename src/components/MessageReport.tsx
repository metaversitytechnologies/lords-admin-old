import React from "react";

const MessageReport: React.FC = () => {
  return (
    <>
      <div className="listing-grid w-100 float-left m-t-0">
        <form className="m-b-10">
          <div className="header">
            <h1>Message Report</h1>
          </div>
          <div className="datepicker-wrapper d-inline-block col-md-2 form-group v-t p-l-0 p-r-5">
            <label className="p-l-5">From</label>
            <input type="date" className="form-control" />
            <span className="text-danger error-report"></span>
          </div>
          <div className="datepicker-wrapper form-group d-inline-block col-md-2 v-t p-l-0 p-r-5">
            <label className="p-l-5">To</label>
            <input type="date" className="form-control" />
            <span className="text-danger error-report"></span>
          </div>
          <div className="d-inline-block v-t p-l-0 p-r-5">
            <label className="p-l-5 d-block">&nbsp;</label>
            <button type="submit" className="btn btn-primary btn-load-c v-t">
              Load
            </button>
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
                aria-busy="false"
                aria-colcount="6"
                className="table b-table table table-striped b-table-stacked-md"
              >
                <thead role="rowgroup">
                  <tr role="row">
                    <th
                      role="columnheader"
                      scope="col"
                      tabIndex={0}
                      aria-colindex="1"
                      aria-sort="none"
                      className="position-relative text-left"
                    >
                      <div>file</div>
                      <span className="sr-only">
                        {" "}
                        (Click to sort ascending)
                      </span>
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      tabIndex={0}
                      aria-colindex="2"
                      aria-sort="none"
                      className="position-relative text-left"
                    >
                      <div>User Name</div>
                      <span className="sr-only">
                        {" "}
                        (Click to sort ascending)
                      </span>
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      tabIndex={0}
                      aria-colindex="3"
                      aria-sort="none"
                      className="position-relative text-left"
                    >
                      <div>Event Name</div>
                      <span className="sr-only">
                        {" "}
                        (Click to sort ascending)
                      </span>
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      tabIndex={0}
                      aria-colindex="4"
                      aria-sort="none"
                      className="position-relative text-left"
                    >
                      <div>Event Date</div>
                      <span className="sr-only">
                        {" "}
                        (Click to sort ascending)
                      </span>
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      tabIndex={0}
                      aria-colindex="5"
                      aria-sort="none"
                      className="position-relative text-left"
                    >
                      <div>Remark</div>
                      <span className="sr-only">
                        {" "}
                        (Click to sort ascending)
                      </span>
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      tabIndex={0}
                      aria-colindex="6"
                      aria-sort="none"
                      className="position-relative text-right"
                    >
                      <div>Amount</div>
                      <span className="sr-only">
                        {" "}
                        (Click to sort ascending)
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  <tr role="row" className="b-table-empty-row">
                    <td colSpan={6} role="cell">
                      <div>
                        <div role="alert" aria-live="polite">
                          <p className="text-center">No Record Found.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="my-1 p-m-l col">
              <ul
                role="menubar"
                aria-disabled="false"
                aria-label="Pagination"
                className="pagination my-0 b-pagination justify-content-end"
              >
                <li
                  role="presentation"
                  aria-hidden="true"
                  className="page-item disabled"
                >
                  <span
                    role="menuitem"
                    aria-label="Go to first page"
                    aria-disabled="true"
                    className="page-link"
                  >
                    «
                  </span>
                </li>
                <li
                  role="presentation"
                  aria-hidden="true"
                  className="page-item disabled"
                >
                  <span
                    role="menuitem"
                    aria-label="Go to previous page"
                    aria-disabled="true"
                    className="page-link"
                  >
                    ‹
                  </span>
                </li>
                <li role="presentation" className="page-item active">
                  <button
                    role="menuitemradio"
                    type="button"
                    aria-label="Go to page 1"
                    aria-checked="true"
                    aria-posinset="1"
                    aria-setsize="1"
                    tabIndex={0}
                    className="page-link"
                  >
                    1
                  </button>
                </li>
                <li
                  role="presentation"
                  aria-hidden="true"
                  className="page-item disabled"
                >
                  <span
                    role="menuitem"
                    aria-label="Go to next page"
                    aria-disabled="true"
                    className="page-link"
                  >
                    ›
                  </span>
                </li>
                <li
                  role="presentation"
                  aria-hidden="true"
                  className="page-item disabled"
                >
                  <span
                    role="menuitem"
                    aria-label="Go to last page"
                    aria-disabled="true"
                    className="page-link"
                  >
                    »
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageReport;
