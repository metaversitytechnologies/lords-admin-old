import React, { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { updatePwLord } from "../api/auth";
import FlashMessage from "./FlashMessage";
import ReusableModal from "./ReusableModal";

interface ChangePasswordModalProps {
  user: any;
  show: boolean;
  handleClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  user,
  show,
  handleClose
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();
  const [flashMessage, setFlashMessage] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const onSubmit = async (data: FieldValues) => {
    const payload = {
      userId: user.userName,
      newPassword: data.password,
      lupassword: data.masterPassword
    };

    try {
      const res = await updatePwLord(payload);
      if (res.status === false) {
        setFlashMessage({
          message: res.message || "An error occurred.",
          type: "error"
        });
        return;
      }
      setFlashMessage({
        message: "Password updated successfully!",
        type: "success"
      });
      setTimeout(() => {
        reset();
        handleClose();
      }, 1000);
    } catch (error) {
      setFlashMessage({
        message: error instanceof Error ? error.message : "An error occurred.",
        type: "error"
      });
    }
  };

  return (
    <ReusableModal
      show={show}
      position="top"
      handleClose={handleClose}
      title="Change Password"
    >
      <div>
        {flashMessage && (
          <FlashMessage
            message={flashMessage.message}
            type={flashMessage.type}
            onClose={() => setFlashMessage(null)}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="form-group v-t col-md-12 m-b-20">
              <label>New Password</label>
              <input
                placeholder="New Password"
                type="password"
                {...register("password", {
                  required: "New Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  },
                  maxLength: {
                    value: 30,
                    message: "Password must be at most 30 characters"
                  }
                })}
                maxLength={30}
                className="form-control"
              />
              {errors.password && (
                <span className="text-danger error">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="form-group v-t col-md-12 m-b-20">
              <label>Re Type Password</label>
              <input
                placeholder="Re Type Password"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm the new password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match"
                })}
                maxLength={30}
                className="form-control"
              />
              {errors.confirmPassword && (
                <span className="text-danger error">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="form-group v-t col-md-12 m-b-20">
              <label>Master Password</label>
              <input
                placeholder="Master Password"
                type="password"
                {...register("masterPassword", {
                  required: "Master Password is required",
                  minLength: {
                    value: 6,
                    message: "Master Password must be 6 characters"
                  },
                  maxLength: {
                    value: 6,
                    message: "Master Password must be 6 characters"
                  }
                })}
                maxLength={6}
                className="form-control"
              />
              {errors.masterPassword && (
                <span className="text-danger error">
                  {errors.masterPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="row form-group m-b-5">
            <div className="col-md-12 text-right">
              <button type="submit" className="btn btn-submit btn-bs">
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </ReusableModal>
  );
};

export default ChangePasswordModal;
