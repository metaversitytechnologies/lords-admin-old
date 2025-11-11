const AccountSection = () => {
  return (
    <section className="apl-section">
      <div>
        <div className="create-account">
          <div className="m-t-10">
            <form name="createAccountForm">
              <div className="header">
                <h1 className="d-inline-block">Personal Information</h1>
              </div>

              {/* Personal Info Fields */}
              <div className="w-100 float-left">
                <div className="row">
                  <div className="form-group col-md-3 v-t m-b-20">
                    <label>Client ID *</label>
                    <input
                      placeholder="Login Id"
                      type="text"
                      name="LoginId"
                      className="form-control"
                      maxLength={15}
                    />
                    <span className="text-danger error-account"></span>
                  </div>

                  <div className="form-group v-t col-md-3 m-b-20">
                    <label>Full Name *</label>
                    <input
                      placeholder="Full Name"
                      type="text"
                      name="FullName"
                      className="form-control"
                      maxLength={50}
                    />
                    <span className="text-danger error-account"></span>
                  </div>

                  <div className="form-group v-t col-md-3 m-b-20">
                    <label>Password *</label>
                    <input
                      placeholder="Password"
                      type="password"
                      name="password"
                      className="form-control"
                    />
                    <span className="text-danger error-account"></span>
                  </div>

                  <div className="form-group v-t col-md-3 m-b-20">
                    <label>Confirm Password *</label>
                    <input
                      placeholder="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                    />
                    <span className="text-danger error-account"></span>
                  </div>
                </div>
              </div>

              {/* Privileges Section */}
              <div className="w-100 float-left">
                <div className="col-md-12 p-l-0">
                  <div className="game-title m-b-10">
                    <h5 className="d-inline-block m-b-0 theme1font">
                      Privileges
                    </h5>
                  </div>

                  <div className="listing-grid prev-user-chk m-b-5 checkbox-container-wd">
                    {[
                      "Market Analysis",
                      "Client List",
                      "Withdraw",
                      "Deposit",
                      "User Status",
                      "User Update",
                      "Change Password",
                      "Bank List",
                      "Account Statement",
                      "My Bets",
                      "Casino Report",
                      "User Logs",
                      "Game Report",
                      "Fraud Report",
                      "Casino List",
                      "Game List",
                      "Credit Reference",
                      "Exposure Limit",
                      "User Create"
                    ].map((label) => {
                      const id = label.toLowerCase().replace(/\s+/g, "");
                      return (
                        <div
                          key={id}
                          className="[ form-group ] checkbox-account d-inline-block m-l-5"
                        >
                          <div className="custom-control custom-checkbox">
                            <input
                              id={id}
                              type="checkbox"
                              name={id}
                              className="custom-control-input"
                              value="true"
                            />
                            <label
                              htmlFor={id}
                              className="custom-control-label"
                            >
                              {label}
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Master Password + Submit */}
              <div className="text-right">
                <div className="d-inline-block p-l-0 p-r-5 m-b-30">
                  <label className="d-inline-block">Master Password</label>
                  <input
                    placeholder="Master Password"
                    type="password"
                    name="MasterPassword"
                    className="form-control input-master-password"
                  />
                  <p className="text-danger m-b-0 m-t-5 error-account"></p>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-bs v-t p-l-0 p-r-5"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Table Section */}
          <div className="m-t-10">
            <div className="col-md-12 p-l-0">
              <div className="table-responsvie">
                <div className="col-sm-12 p-l-0 p-r-5">
                  <div className="prev-wrapper">
                    <div className="prev-scroller">
                      <table
                        role="table"
                        aria-busy={false}
                        aria-colcount={23}
                        className="table b-table table chackbox-align b-table-stacked-md"
                      >
                        <thead>
                          <tr>
                            {[
                              "Action",
                              "User Name",
                              "Full Name",
                              "Market Analysis",
                              "Client List",
                              "Withdraw",
                              "Deposit",
                              "User Status",
                              "User Update",
                              "Change Password",
                              "Bank List",
                              "Account Statement",
                              "My Bets",
                              "Casino Report",
                              "User Log",
                              "Game Report",
                              "Fraudt",
                              "Casino List",
                              "Game List",
                              "User Active",
                              "Credit Reference",
                              "Exposure Limit",
                              "User Create"
                            ].map((col) => (
                              <th
                                key={col}
                                className="position-relative text-center"
                                scope="col"
                              >
                                <div>{col}</div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="b-table-empty-row">
                            <td colSpan="23">
                              <div className="text-center my-2">
                                There are no records to show
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountSection;
