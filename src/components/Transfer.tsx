const Transfer = () => {
  return (
    <div className="listing-grid w-100 float-left bank">
      {/* Flash message wrapper */}
      <div className="master-flash-message">
        <div className="flash__wrapper"></div>
      </div>

      {/* Header and Transfer All */}
      <div className="m-t-10">
        <div className="header">
          <h1>Transfer</h1>
        </div>

        <div className="col-md-12 text-right">
          <div className="form-group v-t">
            <label className="d-inline-block p-l-0 p-r-5 m-l-5 v-m">
              Master Password
            </label>
            <input
              type="password"
              name="masterPassword"
              placeholder="Master Password"
              className="master-input"
            />
            <button className="btn btn-primary v-t m-l-5 p-l-5 p-r-5">
              Transfer All
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="m-t-10">
        <div className="col-md-12 p-l-0 p-r-5">
          <div className="table-responsvie">
            <table id="bankdatahtmladmin" className="table table-striped">
              <thead>
                <tr>
                  <th>UserName</th>
                  <th>Account Type</th>
                  <th className="text-right">Credit</th>
                  <th className="text-right">Exposure</th>
                  <th className="text-right">Available Balance</th>
                  <th className="text-right">G/T</th>
                  <th></th>
                  <th className="bank-row-width">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>clishak</td>
                  <td>User</td>
                  <td className="text-right">
                    <span>2000.00</span>
                  </td>
                  <td className="text-right">
                    <span>0.00</span>
                  </td>
                  <td className="text-right">
                    <span>2193.00</span>
                  </td>
                  <td className="text-right">
                    <span>193.00</span>
                  </td>
                  <td className="text-center">
                    <a href="javascript:void(0)" className="text-success">
                      All <i className="fas fa-arrow-right"></i>
                    </a>
                    <input type="text" name="amount" placeholder="0" />
                    <button className="btn btn-primary">Submit</button>
                  </td>
                  <td className="bank-row-width"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
