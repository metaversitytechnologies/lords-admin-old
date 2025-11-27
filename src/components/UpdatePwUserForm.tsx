import React, { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { updatePwUserPermission } from "../api/auth"; // Assuming this function exists
import FlashMessage from "./FlashMessage";

interface UpdatePwUserFormProps {
  user: any;
  onClose: () => void;
}

const UpdatePwUserForm: React.FC<UpdatePwUserFormProps> = ({
  user,
  onClose
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues
  } = useForm();
  const [flashMessage, setFlashMessage] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (user) {
      const initialValues: any = {
        fullName: user.fullName,
        privileges: {}
      };
      privileges.forEach((p) => {
        initialValues.privileges[p.id] = user.permission.includes(p.id);
      });
      reset(initialValues);
    }
  }, [user, reset]);

  const privileges = [
    { id: "Market Analysis", label: "Market Analysis" },
    { id: "Client List", label: "Client List" },
    { id: "Withdraw", label: "Withdraw" },
    { id: "Deposit", label: "Deposit" },
    { id: "User Status", label: "User Status" },
    { id: "User Update", label: "User Update" },
    { id: "Change Password", label: "Change Password" },
    { id: "Bank List", label: "Bank List" },
    { id: "Account Statement", label: "Account Statement" },
    { id: "My Bets", label: "My Bets" },
    { id: "Casino Report", label: "Casino Report" },
    { id: "User Logs", label: "User Logs" },
    { id: "Game Report", label: "Game Report" },
    { id: "Fraud Report", label: "Fraud Report" },
    { id: "Casino List", label: "Casino List" },
    { id: "Game List", label: "Game List" },
    { id: "Credit Reference", label: "Credit Reference" },
    { id: "Exposure Limit", label: "Exposure Limit" },
    { id: "User Create", label: "Create User" }
  ];

  const onSubmit = async (data: FieldValues) => {
    const permissionList = Object.keys(data.privileges).filter(
      (key) => data.privileges[key]
    );

    const payload = {
      userId: user.userName,
      fullName: data.fullName,
      permissionList: permissionList,
      lupassword: data.masterPassword
    };

    try {
      const res = await updatePwUserPermission(payload);

      if (!res.status) {
        setFlashMessage({
          message: res.message || "Something went wrong!",
          type: "error"
        });
        return;
      }

      setFlashMessage({
        message: "User updated successfully!",
        type: "success"
      });

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      setFlashMessage({
        message: error instanceof Error ? error.message : "An error occurred.",
        type: "error"
      });
    }
  };

  return (
    <div>
      {flashMessage && (
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          onClose={() => setFlashMessage(null)}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-12 p-0">
          <div className="game-title m-b-0">
            <h5 className="d-inline-block m-b-0 theme1font">
              Personal Information
            </h5>
          </div>
        </div>
        <div className="listing-grid p-0 col-md-12 m-b-10">
          <div className="form-group col-md-3 p-0 v-t m-b-30">
            <label>Full Name</label>
            <input
              placeholder="Full Name"
              type="text"
              {...register("fullName")}
              className="form-control"
            />
          </div>
        </div>
        <div>
          <div className="col-md-12 m-t-5">
            <div className="row">
              <div className="col-md-12 p-l-0 m-b-10">
                <div className="game-title">
                  <h5 className="d-inline-block m-b-0">Privileges</h5>
                </div>
                <input
                  type="hidden"
                  {...register("privileges_validation", {
                    validate: () => {
                      const privileges = getValues("privileges");
                      return (
                        (privileges &&
                          Object.values(privileges).some((v) => v)) ||
                        "At least one privilege must be selected"
                      );
                    }
                  })}
                />
                {errors.privileges_validation && (
                  <p className="text-danger">
                    {errors.privileges_validation.message}
                  </p>
                )}
                <div className="chackbox-align">
                  <div className="listing-grid checkbox-container-wd">
                    {privileges.map((privilege) => (
                      <div
                        key={privilege.id}
                        className="form-group checkbox-account d-inline-block"
                      >
                        <div className="custom-control custom-checkbox">
                          <input
                            id={`${privilege.id}-${user.userId}`}
                            type="checkbox"
                            {...register(`privileges.${privilege.id}`)}
                            className="custom-control-input"
                          />
                          <label
                            htmlFor={`${privilege.id}-${user.userId}`}
                            className="custom-control-label"
                          >
                            {privilege.label}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="text-right">
            <div className="text-right">
              <div className="d-inline-block p-l-0 p-r-5 m-b-30">
                <label className="d-inline-block">Master Password</label>
                <input
                  placeholder="Master Password"
                  type="password"
                  {...register("masterPassword", {
                    required: "Master password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    },
                    maxLength: {
                      value: 6,
                      message: "Master Password must be 6 characters long"
                    }
                  })}
                  className="form-control input-master-password"
                />
                {errors.masterPassword && (
                  <p className="text-danger">{errors.masterPassword.message}</p>
                )}
              </div>
              <button type="submit" className="btn btn-secondary btn-bs v-t">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePwUserForm;
