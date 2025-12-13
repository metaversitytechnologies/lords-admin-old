import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { changePasswordSelf } from "../api/auth";
import FlashMessage from "./FlashMessage";

interface ChangePasswordSelfModalProps {
  show: boolean;
  handleClose: () => void;
}

type ChangePasswordFormInputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordSelfModal: React.FC<ChangePasswordSelfModalProps> = ({
  show,
  handleClose
}) => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<ChangePasswordFormInputs>({
    mode: "onBlur"
  });
  const newPasswordValue = watch("newPassword");

  useEffect(() => {
    if (!show) {
      reset();
      setError(null);
      setSuccessMessage(null);
    }
  }, [show, reset]);

  const onSubmit = async (data: ChangePasswordFormInputs) => {
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await changePasswordSelf({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      if (response.status) {
        setSuccessMessage("Password changed successfully!.");
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setError(response.message || "Failed to change password.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <React.Fragment>
      <div
        className="modal fade show changePasswordForm"
        role="dialog"
        aria-modal="true"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-m">
          <span tabIndex={0}></span>
          <div className="modal-content" tabIndex={-1}>
            <div className="modal-body">
              <button
                type="button"
                data-dismiss="modal"
                className="close"
                onClick={handleClose}
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="apl-section-inner">
                <div className="row">
                  <div className="col-md-12 change-password-box m-t-15">
                    <form
                      data-vv-scope="changePasswordForm"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div>
                        <div>
                          <div className="default-flash-message m-b-10">
                            {error && (
                              <FlashMessage type="error" message={error} />
                            )}
                            {successMessage && (
                              <FlashMessage
                                type="success"
                                message={successMessage}
                              />
                            )}
                          </div>
                          <div className="form-group m-b-20">
                            <input
                              type="password"
                              placeholder="Enter old password"
                              className="form-control"
                              {...register("currentPassword", {
                                required: "Old password is required"
                              })}
                            />
                            {errors.currentPassword && (
                              <span className="text-danger error-login">
                                {errors.currentPassword.message}
                              </span>
                            )}
                          </div>
                          <div className="form-group m-b-35">
                            <input
                              type="password"
                              placeholder="Enter new password"
                              className="form-control"
                              {...register("newPassword", {
                                required: "New password is required",
                                minLength: {
                                  value: 8,
                                  message:
                                    "Password must be at least 8 characters"
                                },
                                maxLength: {
                                  value: 12,
                                  message:
                                    "Password must be at most 12 characters"
                                },
                                pattern: {
                                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                  message:
                                    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                                }
                              })}
                            />
                            {errors.newPassword && (
                              <span className="text-danger error-login">
                                {errors.newPassword.message}
                              </span>
                            )}
                          </div>
                          <div className="form-group m-b-35">
                            <input
                              type="password"
                              placeholder="Enter confirm password"
                              className="form-control"
                              {...register("confirmPassword", {
                                required: "Please confirm your new password",
                                validate: (value) =>
                                  value === newPasswordValue ||
                                  "The passwords do not match"
                              })}
                            />
                            {errors.confirmPassword && (
                              <span className="text-danger error-login">
                                {errors.confirmPassword.message}
                              </span>
                            )}
                          </div>
                          <div className="form-group text-right">
                            <button
                              type="button"
                              className="btn btn-link"
                              onClick={handleClose}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-submit m-l-5"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span tabIndex={0}></span>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </React.Fragment>
  );
};

export default ChangePasswordSelfModal;
