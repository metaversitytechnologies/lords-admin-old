import React, { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { updateUserLord, getDetailForUpdateLord } from "../api/auth";
import FlashMessage from "./FlashMessage";

type FormValues = {
  password?: string;
  confirmPassword?: string;
  userStatus: string;
  betStatus: string;
  userRate: number;
  notes: string;
  lupassword: string;
  newCreditRef: number | string;
};

interface UpdateUserProps {
  isOpen: boolean;
  onClose: () => void;
  agent: any;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ isOpen, onClose, agent }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [creditLimits, setCreditLimits] = useState({
    given: 0,
    min: 0,
    max: 0
  });

  const password = watch("password");

  useEffect(() => {
    if (isOpen && agent) {
      const fetchUserDetails = async () => {
        setLoading(true);
        try {
          const response = await getDetailForUpdateLord({
            userId: agent.userId
          });
          const userDetails = response.data;
          // Use reset to populate the form with fetched data
          reset({
            userStatus: userDetails.userStatus.toString(),
            betStatus: userDetails.betStatus.toString(),
            userRate: userDetails.userRate,
            notes: userDetails.notes,
            newCreditRef: userDetails.givenCreditLimit,
            password: "",
            confirmPassword: "",
            lupassword: ""
          });
          setCreditLimits({
            given: userDetails.givenCreditLimit,
            min: userDetails.minCreditLimit,
            max: userDetails.maxCreditLimit
          });
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
  }, [isOpen, agent, reset]);

  if (!isOpen || !agent) {
    return null;
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload: any = {
      userId: agent.userId,
      userStatus: data.userStatus === "true",
      betStatus: data.betStatus === "true",
      creditRef: Number(data.newCreditRef),
      userRate: Number(data.userRate),
      userLevel: agent.accountType.toUpperCase(),
      lupassword: data.lupassword,
      notes: data.notes
    };
    if (data.password) {
      payload.password = data.password;
    }

    try {
      await updateUserLord(payload);
      setSuccess("User updated successfully!");
      setError(null);
      setTimeout(() => {
        onClose();
        reset(); // Reset form after successful submission
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
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                {...register("userRate")}
                                className="form-control"
                              />
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
                                {...register("password", {
                                  minLength: {
                                    value: 8,
                                    message:
                                      "Password must be at least 8 characters long"
                                  },
                                  maxLength: {
                                    value: 15,
                                    message:
                                      "Password must be at most 15 characters long"
                                  },
                                  pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                    message:
                                      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                                  }
                                })}
                                className="w-100"
                              />
                              {errors.password && (
                                <span className="text-danger error">
                                  {errors.password.message}
                                </span>
                              )}
                            </div>
                            <div className="col-4">
                              <label>Repeat Password</label>
                              <input
                                placeholder="Re Type Password"
                                type="password"
                                {...register("confirmPassword", {
                                  validate: (value) =>
                                    value === password ||
                                    "The passwords do not match"
                                })}
                                className="w-100"
                              />
                              {errors.confirmPassword && (
                                <span className="text-danger error">
                                  {errors.confirmPassword.message}
                                </span>
                              )}
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
                              <input
                                id="userstatustrue"
                                type="radio"
                                {...register("userStatus")}
                                value="true"
                                className="custom-control-input"
                              />
                              <label
                                htmlFor="userstatustrue"
                                className="custom-control-label"
                              >
                                ACTIVE
                              </label>
                            </div>
                            <div className="custom-control custom-radio d-inline-block m-l-10">
                              <input
                                id="userstatusfalse"
                                type="radio"
                                {...register("userStatus")}
                                value="false"
                                className="custom-control-input"
                              />
                              <label
                                htmlFor="userstatusfalse"
                                className="custom-control-label"
                              >
                                INACTIVE
                              </label>
                            </div>
                          </div>
                          <div className="apl-form-row m-t-25">
                            <label>Bet Status</label>
                            <div className="custom-control custom-radio d-inline-block">
                              <input
                                id="betstatustrue"
                                type="radio"
                                {...register("betStatus")}
                                value="true"
                                className="custom-control-input"
                              />
                              <label
                                htmlFor="betstatustrue"
                                className="custom-control-label"
                              >
                                ACTIVE
                              </label>
                            </div>
                            <div className="custom-control custom-radio d-inline-block m-l-10">
                              <input
                                id="betstatusfalse"
                                type="radio"
                                {...register("betStatus")}
                                value="false"
                                className="custom-control-input"
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
                                    value={creditLimits.given}
                                  />
                                </span>
                              </div>
                              <div className="apl-form-row">
                                <label> New Credit Limit</label>
                                <span>
                                  <input
                                    placeholder="Credit Limit"
                                    type="text"
                                    {...register("newCreditRef")}
                                  />
                                </span>

                                <span
                                  className="d-inline-block v-m"
                                  style={{ marginLeft: "3px" }}
                                >
                                  &gt;={creditLimits.min}
                                  <br /> &lt;= {creditLimits.max}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section>
                        <div className="apl-section-inner">
                          <legend className="p-b-10">Notes</legend>
                          <textarea {...register("notes")}></textarea>
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
                                  {...register("lupassword", {
                                    required:
                                      "The MasterPassword field is required",
                                    minLength: {
                                      value: 6,
                                      message:
                                        "Master Password must be 6 characters long"
                                    },
                                    maxLength: {
                                      value: 6,
                                      message:
                                        "Master Password must be 6 characters long"
                                    }
                                  })}
                                  className="form-control"
                                />
                                {errors.lupassword && (
                                  <span className="text-danger error">
                                    {errors.lupassword.message}
                                  </span>
                                )}
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
