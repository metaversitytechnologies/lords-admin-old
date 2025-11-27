import React, { useEffect, useState } from "react";
import ReusableModal from "./ReusableModal";
import { useForm, type FieldValues } from "react-hook-form";
import { updatePwStatus } from "../api/auth";
import FlashMessage from "./FlashMessage";

interface UserStatusModalProps {
  show: boolean;
  handleClose: () => void;
  user: any;
}

const UserStatusModal: React.FC<UserStatusModalProps> = ({
  show,
  handleClose,
  user
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const [flashMessage, setFlashMessage] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (user) {
      reset({
        active: user.active // Assuming 'user.active' holds the current status
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: FieldValues) => {
    const payload = {
      userId: user.userName,
      active: data.active,
      lupassword: data.masterPassword
    };

    try {
      await updatePwStatus(payload);
      setFlashMessage({
        message: "User status updated successfully!",
        type: "success"
      });
      setTimeout(() => {
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
      title="User Status"
    >
      {flashMessage && (
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          onClose={() => setFlashMessage(null)}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <p className="username">{user?.userName}</p>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      id="useractive"
                      type="checkbox"
                      {...register("active")}
                      className="custom-control-input"
                    />
                    <label
                      htmlFor="useractive"
                      className="custom-control-label"
                    >
                      Active
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12 m-b-20 form-group">
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
                  className="form-control"
                />
                {errors.masterPassword && (
                  <span className="text-danger error">
                    {errors.masterPassword.message}
                  </span>
                )}
              </div>
              <div className="col-md-12 text-right float-right">
                <div className="d-inline-block submit-button m-l-10">
                  <button type="submit" className="btn btn-primary btn-bs">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </ReusableModal>
  );
};

export default UserStatusModal;
