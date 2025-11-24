import React, { useState, useEffect } from "react";
import { updateUserLord, getDetailForUpdateLord } from "../api/auth";
import FlashMessage from "./FlashMessage";

interface UpdateUserProps {
  isOpen: boolean;
  onClose: () => void;
  agent: any;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ isOpen, onClose, agent }) => {
  const [formData, setFormData] = useState({
    password: "",
    userStatus: true,
    betStatus: true,
    creditRef: 0,
    givenCreditLimit: 0,
    minCreditLimit: 0,
    maxCreditLimit: 0,
    userRate: 0,
    notes: "",
    lupassword: ""
  });
  const [newCreditRef, setNewCreditRef] = useState<number | string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && agent) {
      const fetchUserDetails = async () => {
        setLoading(true);
        try {
          const response = await getDetailForUpdateLord({
            userId: agent.userId
          });
          const userDetails = response.data;
          setFormData({
            password: "",
            userStatus: userDetails.userStatus,
            betStatus: userDetails.betStatus,
            creditRef: userDetails.givenCreditLimit,
            userRate: userDetails.userRate,
            notes: userDetails.notes,
            lupassword: "",
            givenCreditLimit: userDetails.givenCreditLimit,
            minCreditLimit: userDetails.minCreditLimit,
            maxCreditLimit: userDetails.maxCreditLimit
          });
          setNewCreditRef(userDetails.givenCreditLimit);
          setConfirmPassword("");
        } catch (error) {
          console.error("Failed to fetch user details for update:", error);
          setError(
            `Failed to load user details: ${
              error instanceof Error ? error.message : "Unknown error"
            }`
          );
        } finally {
          setLoading(false);
        }
      };
      fetchUserDetails();
    }
  }, [isOpen, agent]);

  if (!isOpen || !agent) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value === "true" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password && formData.password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const payload = {
      userId: agent.userId,
      password: formData.password,
      userStatus: formData.userStatus,
      betStatus: formData.betStatus,
      creditRef: Number(newCreditRef),
      userRate: Number(formData.userRate),
      userLevel: agent.accountType.toUpperCase(),
      lupassword: formData.lupassword,
      notes: formData.notes
    };

    try {
      await updateUserLord(payload);
      setSuccess("User updated successfully!");
      setError(null);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error: any) {
      setError(`Failed to update user: ${error.message}`);
      setSuccess(null);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          zIndex: 1040,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      >
        <div
          className="modal fade show"
          role="dialog"
          aria-modal="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">Loading...</div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1040,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      }}
    >
      <div
        className="modal fade show"
        role="dialog"
        aria-modal="true"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              {(error || success) && (
                <FlashMessage
                  message={error || success}
                  type={error ? "error" : "success"}
                  onClose={() => {
                    setError(null);
                    setSuccess(null);
                  }}
                />
              )}
              <button type="button" className="close" onClick={onClose}>
                <i className="fas fa-times"></i>
              </button>
              <div id="HelpScreenModal" className="update-agent">
                <div>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <section>
                        <div className="apl-section-inner">
                          <legend>Information</legend>
                          <div className="apl-form-row">
                            <label>Username</label>
                            <span>{agent.userId}</span>
                          </div>
                          <div className="apl-form-row row m-t-25">
                            <div className="col-4">
                              <label>User Rate</label>
                              <input
                                placeholder=" User Rate"
                                type="text"
                                name="userRate"
                                value={formData.userRate}
                                onChange={handleChange}
                                onKeyPress={(e) => {
                                  if (e.currentTarget.value.length === 10)
                                    e.preventDefault();
                                }}
                                className="form-control"
                                aria-required="true"
                                aria-invalid="false"
                              />
                              <span className="text-danger error"></span>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section>
                        <div className="apl-section-inner">
                          <legend>Change Password</legend>
                          <div className="apl-form-row row m-t-25">
                            <div className="col-4">
                              <label>Password</label>
                              <input
                                placeholder="New Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                maxLength={18}
                                className="w-100"
                                aria-required="false"
                                aria-invalid="false"
                              />
                              <span className="text-danger error"></span>
                            </div>
                            <div className="col-4">
                              <label>Repeat Password</label>
                              <input
                                placeholder="Re Type Password"
                                name="confirmpassword"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                type="password"
                                maxLength={18}
                                className="w-100"
                                aria-required="false"
                                aria-invalid="false"
                              />
                              <span className="text-danger error"></span>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section>
                        <div className="apl-section-inner">
                          <legend>Change Status</legend>
                          <div className="apl-form-row m-t-25">
                            <label>User Status</label>
                            <div className="custom-control custom-radio d-inline-block">
                              <div className="custom-control custom-radio">
                                <input
                                  id="userstatustrue"
                                  type="radio"
                                  name="userStatus"
                                  className="custom-control-input"
                                  value="true"
                                  checked={formData.userStatus === true}
                                  onChange={handleChange}
                                />
                                <label
                                  htmlFor="userstatustrue"
                                  className="custom-control-label"
                                >
                                  ACTIVE
                                </label>
                              </div>
                            </div>
                            <div className="custom-control custom-radio d-inline-block m-l-10">
                              <div className="custom-control custom-radio">
                                <input
                                  id="userstatusfalse"
                                  type="radio"
                                  name="userStatus"
                                  className="custom-control-input"
                                  value="false"
                                  checked={formData.userStatus === false}
                                  onChange={handleChange}
                                />
                                <label
                                  htmlFor="userstatusfalse"
                                  className="custom-control-label"
                                >
                                  INACTIVE
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="apl-form-row m-t-25">
                            <label>Bet Status</label>
                            <div className="custom-control custom-radio d-inline-block">
                              <div className="custom-control custom-radio">
                                <input
                                  id="betstatustrue"
                                  type="radio"
                                  name="betStatus"
                                  className="custom-control-input"
                                  value="true"
                                  checked={formData.betStatus === true}
                                  onChange={handleChange}
                                />
                                <label
                                  htmlFor="betstatustrue"
                                  className="custom-control-label"
                                >
                                  ACTIVE
                                </label>
                              </div>
                            </div>
                            <div className="custom-control custom-radio d-inline-block m-l-10">
                              <div className="custom-control custom-radio">
                                <input
                                  id="betstatusfalse"
                                  type="radio"
                                  name="betStatus"
                                  className="custom-control-input"
                                  value="false"
                                  checked={formData.betStatus === false}
                                  onChange={handleChange}
                                />
                                <label
                                  htmlFor="betstatusfalse"
                                  className="custom-control-label"
                                >
                                  INACTIVE
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section>
                        <div className="apl-section-inner">
                          <legend className="p-b-10">Credit</legend>
                          <div className="apl-form-row">
                            <div className="d-inline-block">
                              <div className="apl-form-row">
                                <label>Credit Limit</label>
                                <span>
                                  <input
                                    placeholder="Credit"
                                    type="text"
                                    disabled
                                    value={formData.givenCreditLimit}
                                  />
                                </span>
                              </div>
                              <div className="apl-form-row">
                                <label> New Credit Limit</label>
                                <span>
                                  <input
                                    placeholder="Credit Limit"
                                    type="text"
                                    name="newCreditRef"
                                    value={newCreditRef}
                                    onChange={(e) =>
                                      setNewCreditRef(e.target.value)
                                    }
                                    onKeyPress={(e) => {
                                      if (e.currentTarget.value.length === 14)
                                        e.preventDefault();
                                    }}
                                    aria-required="false"
                                    aria-invalid="false"
                                  />
                                </span>

                                <span
                                  className="d-inline-block v-m"
                                  style={{ marginLeft: "3px" }}
                                >
                                  &gt;={formData.minCreditLimit}
                                  <br /> &lt;= {formData.maxCreditLimit}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section>
                        <div className="apl-section-inner">
                          <legend className="p-b-10">Notes</legend>
                          <textarea
                            onKeyPress={(e) => {
                              if (e.currentTarget.value.length === 50)
                                e.preventDefault();
                            }}
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            aria-required="false"
                            aria-invalid="false"
                          ></textarea>
                          <span className="text-danger error-account"></span>
                        </div>
                      </section>
                      <section>
                        <div className="apl-section-inner">
                          <legend className="p-b-10">Master Password</legend>
                          <div className="apl-form-row">
                            <div className="d-inline-block">
                              <div className="apl-form-row">
                                <input
                                  placeholder=" Master Password"
                                  type="password"
                                  name="lupassword"
                                  value={formData.lupassword}
                                  onChange={handleChange}
                                  className="form-control"
                                  aria-required="true"
                                  aria-invalid="false"
                                />
                                <span className="text-danger error"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <div className="text-right">
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-update scroll-top"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
};

export default UpdateUser;
