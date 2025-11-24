import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import FlashMessage from "./FlashMessage";
type FormValues = {
  userId: string;
  password: string;
  confirmPassword: string;
  userStatus: string;
  betStatus: string;
  creditRef: string;
  userRate: string;
  userLevel: string;
  lupassword: string;
  notes: string;
};

const NewAgent: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues: {
      userStatus: "1",
      betStatus: "1",
      userLevel: "",
      userRate: "1",
      creditRef: "0"
    }
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const password = watch("password");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload = {
      userId: data.userId,
      password: data.password,
      userStatus: data.userStatus === "1",
      betStatus: data.betStatus === "1",
      creditRef: parseFloat(data.creditRef) || 0,
      userRate: parseFloat(data.userRate) || 0,
      userLevel: data.userLevel,
      lupassword: data.lupassword,
      notes: data.notes
    };

    try {
      const response = await createUser(payload);
      if (response.status) {
        setSuccess(response.message || "Agent created successfully");
        setError(null);
        reset();
      }
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="apl-section">
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="d-inline-block v-t">
          <div className="apl-section-inner">
            <legend className="p-b-10">Information</legend>
            <div>
              <div className="apl-form-row m-b-30">
                <label>Login Name</label>
                <span>
                  <input
                    placeholder="Login Id"
                    type="text"
                    maxLength={15}
                    {...register("userId", {
                      required: "The LoginId field is required"
                    })}
                    aria-required="true"
                    aria-invalid={!!errors.userId}
                  />
                  {errors.userId && (
                    <span className="text-danger error-account">
                      {errors.userId.message}
                    </span>
                  )}
                </span>
              </div>
              <div className="apl-form-row m-b-40">
                <label>Password</label>
                <span>
                  <input
                    placeholder="Password"
                    type="password"
                    {...register("password", {
                      required: "Password field is required.",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long"
                      },
                      maxLength: {
                        value: 15,
                        message: "Password must be at most 15 characters long"
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                      }
                    })}
                    aria-required="true"
                    aria-invalid={!!errors.password}
                  />
                  {errors.password && (
                    <span className="text-danger error-account">
                      {errors.password.message}
                    </span>
                  )}
                </span>
              </div>
              <div className="apl-form-row m-b-40">
                <label>Repeat Password</label>
                <span>
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    {...register("confirmPassword", {
                      required: "The confirmPassword field is required",
                      validate: (value) =>
                        value === password || "The passwords do not match"
                    })}
                    aria-required="true"
                    aria-invalid={!!errors.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <span className="text-danger error-account">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </span>
              </div>
              <div className="apl-form-row m-b-30">
                <label>User Status</label>
                <div className="custom-control custom-radio d-inline-block">
                  <div className="custom-control custom-radio">
                    <input
                      id="userstatustrue"
                      type="radio"
                      className="custom-control-input"
                      value="1"
                      {...register("userStatus")}
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
                      className="custom-control-input"
                      value="0"
                      {...register("userStatus")}
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
              <div className="apl-form-row m-b-30">
                <label>Bet Status</label>
                <div className="custom-control custom-radio d-inline-block">
                  <div className="custom-control custom-radio">
                    <input
                      id="betstatustrue"
                      type="radio"
                      className="custom-control-input"
                      value="1"
                      {...register("betStatus")}
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
                      className="custom-control-input"
                      value="0"
                      {...register("betStatus")}
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
          </div>
        </section>
        <section className="d-inline-block v-t">
          <div className="apl-section-inner">
            <legend className="p-b-10">Credit</legend>
            <div className="apl-form-row m-b-30">
              <label>Credit Limit</label>
              <span>
                <input
                  placeholder="Credit Reference"
                  type="text"
                  maxLength={21}
                  {...register("creditRef")}
                  aria-required="true"
                  aria-invalid="false"
                />
                <span className="text-danger error-account"></span>
                <span className="float-right cref-height">
                  &gt;=0
                  <br />
                  &lt;= 42.00
                </span>
              </span>
            </div>
            <div className="apl-form-row m-b-30">
              <label>User Rate</label>
              <span>
                <input
                  placeholder="User Rate"
                  type="text"
                  maxLength={21}
                  {...register("userRate")}
                  aria-required="true"
                  aria-invalid="false"
                />
                <span className="text-danger error-account"></span>
              </span>
            </div>
          </div>
        </section>
        <section className="d-inline-block v-t">
          <div className="apl-section-inner">
            <legend className="p-b-10">Account Detais</legend>
            <div>
              <div className="apl-form-row">
                <div className="d-inline-block">
                  <div>
                    <label>Select Level</label>
                    <span>
                      <select
                        className="form-control"
                        {...register("userLevel", {
                          required: "The level field is required"
                        })}
                        aria-required="true"
                        aria-invalid={!!errors.userLevel}
                      >
                        <option value="" disabled selected hidden>
                          Select Level
                        </option>
                        <option value="ADMIN"> Admin </option>
                        <option value="SUBADMIN"> Sub Admin </option>
                        <option value="USER"> User </option>
                      </select>
                    </span>
                    {errors.userLevel && (
                      <span className="text-danger error-account">
                        {errors.userLevel.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="apl-form-row m-b-30">
              <label>Expouser Limit</label>
              <input
                placeholder="Exposurer Limit"
                type="text"
                maxLength={21}
                name="esposurLimit"
                aria-required="true"
                aria-invalid="false"
              />
              <span className="text-danger error-account"></span>
            </div> */}
          </div>
        </section>
        <section className="d-inline-block v-t">
          <div className="apl-section-inner">
            <legend className="p-b-10">Notes</legend>
            <textarea
              {...register("notes")}
              aria-required="false"
              aria-invalid="false"
            ></textarea>
            <span className="text-danger error-account"></span>
          </div>
        </section>
        <div className="form-group text-right">
          <div className="apl-form-row master-pass m-b-30">
            <label>Master Password</label>
            <input
              placeholder="Master Password"
              type="password"
              {...register("lupassword", {
                required: "The MasterPassword field is required"
              })}
              aria-required="true"
              aria-invalid={!!errors.lupassword}
            />
            {errors.lupassword && (
              <p className="text-danger m-b-0 m-t-5 error-account">
                {errors.lupassword.message}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-link"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary m-l-5">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAgent;
