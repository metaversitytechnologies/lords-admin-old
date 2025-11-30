import { useEffect, useState } from "react";
import { getChildListLord } from "../api/user";
import { useAuth } from "../context/AuthContext";

interface User {
  userId: string;
  accountType: string;
  creditLimit: number;
  netExposure: number;
  availabeCredit: number;
}

const Transfer = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const payload = {
        userId: user.userId,
        index: 0,
        noOfRecords: 20,
        username: ""
      };
      getChildListLord(payload)
        .then((response) => {
          if (response.data) {
            setUsers(response.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch child list:", error);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="apl-section">
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
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : users.length > 0 ? (
                    users.map((childUser) => (
                      <tr key={childUser.userId}>
                        <td>{childUser.userId}</td>
                        <td>{childUser.accountType}</td>
                        <td className="text-right">
                          <span>{childUser.creditLimit.toFixed(2)}</span>
                        </td>
                        <td className="text-right">
                          <span>{childUser.netExposure.toFixed(2)}</span>
                        </td>
                        <td className="text-right">
                          <span>{childUser.availabeCredit.toFixed(2)}</span>
                        </td>
                        <td className="text-right">
                          <span>
                            {(
                              childUser.creditLimit - childUser.availabeCredit
                            ).toFixed(2)}
                          </span>
                        </td>
                        <td className="text-center">
                          <a
                            href="javascript:void(0)"
                            className="text-success"
                          >
                            All <i className="fas fa-arrow-right"></i>
                          </a>
                          <input type="text" name="amount" placeholder="0" />
                          <button className="btn btn-primary" disabled>
                            Submit
                          </button>
                        </td>
                        <td className="bank-row-width"></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
