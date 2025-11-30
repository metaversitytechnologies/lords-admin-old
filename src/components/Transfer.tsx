import { useEffect, useState } from "react";
import { getChildListLord } from "../api/user";
import { useAuth } from "../context/AuthContext";

interface User {
  userId: string;
  accountType: string;
  creditLimit: number;
  netExposure: number;
  availabeCredit: number;
  gt: number;
}

const Transfer = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [amountValues, setAmountValues] = useState<Record<string, string>>({});

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
          if (response.data) setUsers(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch child list:", error);
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    if (users.length > 0) {
      const initialAmounts: Record<string, string> = {};

      users.forEach((u) => {
        initialAmounts[u.userId] = "0";
      });

      setAmountValues(initialAmounts);
    }
  }, [users]);

  // Flip GT when clicking "All"
  const handleFlipGT = (childUser: User) => {
    const flipped = childUser.gt > 0 ? -childUser.gt : Math.abs(childUser.gt);

    setAmountValues((prev) => ({
      ...prev,
      [childUser.userId]: flipped.toFixed(2)
    }));
  };

  return (
    <div className="apl-section">
      <div className="listing-grid w-100 float-left bank">
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

        <div>
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
                          {childUser.creditLimit.toFixed(2)}
                        </td>

                        <td className="text-right">
                          {childUser.netExposure.toFixed(2)}
                        </td>

                        <td className="text-right">
                          {childUser.availabeCredit.toFixed(2)}
                        </td>

                        <td className="text-right">
                          {childUser.gt.toFixed(2)}
                        </td>

                        <td className="text-center">
                          {/* REPLACEMENT: Safe button instead of javascript:void(0) */}
                          <a
                            className="text-success link-btn p-r-5"
                            onClick={() => handleFlipGT(childUser)}
                          >
                            All <i className="fas fa-arrow-right"></i>
                          </a>

                          <input
                            type="text"
                            name="amount"
                            value={amountValues[childUser.userId] || ""}
                            onChange={(e) =>
                              setAmountValues({
                                ...amountValues,
                                [childUser.userId]: e.target.value
                              })
                            }
                            placeholder="0"
                          />

                          <button className="btn btn-primary m-l-5">
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
