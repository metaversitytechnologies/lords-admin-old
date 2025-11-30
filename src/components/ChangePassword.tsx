import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { changePasswordApi } from "../api/auth";
import FlashMessage from "./FlashMessage";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type ChangePasswordFormInputs = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const auth = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<ChangePasswordFormInputs>({
    mode: "onBlur"
  });
  const newPasswordValue = watch("newPassword");

  const onSubmit = async (data: ChangePasswordFormInputs) => {
    setFlash(null);
    setLoading(true);

    try {
      const payload = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        token: auth.token,
        userid: auth.user?.userId
      };
      const response = await changePasswordApi(payload);

      if (response.status) {
        const logoutType = auth.user?.passwordtype === "old" ? "soft" : "full";
        navigate(`/change-password-success/${response.message}`, {
          state: { logoutType }
        });
      } else {
        setFlash({
          message: response.message || "Failed to change password.",
          type: "error"
        });
      }
    } catch (error: any) {
      setFlash({
        message: error.message || "An error occurred.",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="apl-section">
      <div className="listing-grid w-100 float-left">
        <div className="col-md-10 page-container">
          {flash && (
            <FlashMessage
              message={flash.message}
              type={flash.type}
              onClose={() => setFlash(null)}
            />
          )}
          <div className="container container-changepasseword-login100">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 change-password-box">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="card">
                    <div className="card-header">
                      <h5 className="m-b-0">Change Password</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group m-b-35">
                        <input
                          type="password"
                          placeholder="Enter old password"
                          className="form-control"
                          {...register("oldPassword", {
                            required: "Old password is required"
                          })}
                        />
                        {errors.oldPassword && (
                          <span className="text-danger error-login">
                            {errors.oldPassword.message}
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
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-secondary btn-block"
                          disabled={loading}
                        >
                          {loading
                            ? "Changing Password..."
                            : "Change Password"}
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
    </section>
  );
};

export default ChangePassword;
