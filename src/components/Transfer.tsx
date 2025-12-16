import { useEffect, useState } from "react";
import { getChildListLord, bankDepositWithdraw } from "../api/user";
import { useAuth } from "../context/AuthContext";

interface User {
  userId: string;
  accountType: string;
  creditLimit: number;
  netExposure: number;
  availabeCredit: number;
  gt: number;
}

interface Status {
  loading: boolean;
  message: string;
  type: "success" | "error" | "";
}

const Transfer = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [masterPassword, setMasterPassword] = useState("");

  const [amountValues, setAmountValues] = useState<Record<string, string>>({});
  const [statuses, setStatuses] = useState<Record<string, Status>>({});

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
      const initialStatuses: Record<string, Status> = {};

      users.forEach((u) => {
        initialAmounts[u.userId] = "0";
        initialStatuses[u.userId] = {
          loading: false,
          message: "",
          type: ""
        };
      });

      setAmountValues(initialAmounts);
      setStatuses(initialStatuses);
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

  const handleSubmit = async (childUser: User) => {
    const userId = childUser.userId;

    if (!masterPassword) {
      setStatuses((prev) => ({
        ...prev,
        [userId]: {
          loading: false,
          message: "Password is empty.",
          type: "error"
        }
      }));
      setTimeout(() => {
        setStatuses((prev) => ({
          ...prev,
          [userId]: { loading: false, message: "", type: "" }
        }));
      }, 3000);
      return;
    }

    setStatuses((prev) => ({
      ...prev,
      [userId]: { loading: true, message: "", type: "" }
    }));

    try {
      const response = await bankDepositWithdraw({
        userid: userId,
        amount: amountValues[userId],
        lupassword: masterPassword
      });

      if (response.status) {
        setStatuses((prev) => ({
          ...prev,
          [userId]: {
            loading: false,
            message: "Success!",
            type: "success"
          }
        }));
      } else {
        const message =
          response.message === "invalid password"
            ? "Enter Master Password Correct"
            : response.message || "An error occurred.";
        setStatuses((prev) => ({
          ...prev,
          [userId]: {
            loading: false,
            message,
            type: "error"
          }
        }));
      }
    } catch (error: any) {
      const message =
        error.message === "invalid password"
          ? "Enter Master Password Correct"
          : error.message || "An error occurred.";
      setStatuses((prev) => ({
        ...prev,
        [userId]: {
          loading: false,
          message,
          type: "error"
        }
      }));
    } finally {
      setTimeout(() => {
        setStatuses((prev) => ({
          ...prev,
          [userId]: { loading: false, message: "", type: "" }
        }));
      }, 3000);
    }
  };

  return (
    <div>
      <div className="w-100 float-left bank">
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
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
              />
              {/* <button className="btn btn-primary v-t m-l-5 p-l-5 p-r-5">
                Transfer All
              </button> */}
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

                          <button
                            className="btn btn-primary m-l-5"
                            onClick={() => handleSubmit(childUser)}
                            disabled={statuses[childUser.userId]?.loading}
                          >
                            {statuses[childUser.userId]?.loading
                              ? "..."
                              : "Submit"}
                          </button>
                        </td>

                        <td className="bank-row-width">
                          {statuses[childUser.userId] && (
                            <span
                              className={
                                statuses[childUser.userId].type === "success"
                                  ? "text-success"
                                  : "text-danger"
                              }
                            >
                              {statuses[childUser.userId].message}
                            </span>
                          )}
                        </td>
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
