import React, { useCallback, useEffect, useState } from "react";
import ReusableModal from "./ReusableModal";
import UpdatePwUserForm from "./UpdatePwUserForm";
import FlashMessage from "./FlashMessage";
import { useForm, type FieldValues } from "react-hook-form";
import { createPwLord, listPwUserLord } from "../api/auth";
import UserStatusModal from "./UserStatusModal";
import ChangePasswordModal from "./ChangePasswordModal";

interface MpwUser {
  userId: string;
  password?: string;
  permissionList: string[];
  lupassword?: string;
  fullName?: string;
}

interface User {
  userName: string;
  fullName: string;
  permission: string[];
}

const CreateUserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();
  const [flashMessage, setFlashMessage] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isUserStatusModalOpen, setIsUserStatusModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const handleOpenChangePasswordModal = (user: User) => {
    setSelectedUser(user);
    setIsChangePasswordModalOpen(true);
  };

  const handleCloseChangePasswordModal = () => {
    setSelectedUser(null);
    setIsChangePasswordModalOpen(false);
  };

  const handleOpenUpdateModal = (user: User) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedUser(null);
    setIsUpdateModalOpen(false);
  };

  const handleOpenUserStatusModal = (user: User) => {
    setSelectedUser(user);
    setIsUserStatusModalOpen(true);
  };

  const handleCloseUserStatusModal = () => {
    setSelectedUser(null);
    setIsUserStatusModalOpen(false);
  };

  const fetchUsers = useCallback(async () => {
    try {
      const response = await listPwUserLord();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onSubmit = async (data: FieldValues) => {
    const permissionList = Object.keys(data.privileges).filter(
      (key) => data.privileges[key]
    );

    const payload: MpwUser = {
      userId: data.userId,
      password: data.password,
      permissionList,
      lupassword: data.masterPassword,
      fullName: data.fullName
    };

    try {
      const response = await createPwLord(payload);
      setFlashMessage({
        message: "User created successfully!",
        type: "success"
      });
      reset();
      fetchUsers(); // Refresh the user list
      console.log("User created successfully:", response);
      // Handle success (e.g., show a success message, reset form)
    } catch (error) {
      setFlashMessage({
        message: error instanceof Error ? error.message : "An error occurred.",
        type: "error"
      });
      console.error("Error creating user:", error);
      // Handle error (e.g., show an error message)
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 15) {
      e.preventDefault();
    }
  };
  const handleFullNameKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 50) {
      e.preventDefault();
    }
  };

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

  return (
    <div>
      <div className="create-account">
        {flashMessage && (
          <FlashMessage
            message={flashMessage.message}
            type={flashMessage.type}
            onClose={() => setFlashMessage(null)}
          />
        )}
        <div className="m-t-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="header">
              <h1 className="d-inline-block">Personal Information</h1>
            </div>
            <div className="w-100 float-left">
              <div className="row">
                <div className="form-group col-md-3 v-t m-b-20">
                  <label>Client ID *</label>
                  <input
                    placeholder="Login Id"
                    type="text"
                    {...register("userId", {
                      required: "User ID is required",
                      minLength: {
                        value: 4,
                        message: "User ID must be at least 4 characters"
                      },
                      maxLength: {
                        value: 2147483647,
                        message: "User ID is too long"
                      }
                    })}
                    onKeyPress={handleKeyPress}
                    className="form-control"
                    aria-required="true"
                    aria-invalid={errors.userId ? "true" : "false"}
                  />
                  {errors.userId && (
                    <span className="text-danger error-account">
                      {errors.userId.message as string}
                    </span>
                  )}
                </div>
                <div className="form-group v-t col-md-3 m-b-20">
                  <label>Full Name *</label>
                  <input
                    placeholder="Full Name"
                    type="text"
                    {...register("fullName", {
                      required: "Full Name is required",
                      minLength: {
                        value: 2,
                        message: "Full Name must be at least 2 characters"
                      },
                      maxLength: {
                        value: 2147483647,
                        message: "Full Name is too long"
                      }
                    })}
                    onKeyPress={handleFullNameKeyPress}
                    className="form-control"
                    aria-required="true"
                    aria-invalid={errors.fullName ? "true" : "false"}
                  />
                  {errors.fullName && (
                    <span className="text-danger error-account">
                      {errors.fullName.message as string}
                    </span>
                  )}
                </div>
                <div className="form-group v-t col-md-3 m-b-20">
                  <label>Password *</label>
                  <input
                    placeholder="Password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      },
                      maxLength: {
                        value: 12,
                        message: "Password must be at most 12 characters"
                      }
                    })}
                    className="form-control"
                    aria-required="true"
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  {errors.password && (
                    <span className="text-danger error-account">
                      {errors.password.message as string}
                    </span>
                  )}
                </div>
                <div className="form-group v-t col-md-3 m-b-20">
                  <label>Confirm Password *</label>
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match"
                    })}
                    className="form-control"
                    aria-required="true"
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                  />
                  {errors.confirmPassword && (
                    <span className="text-danger error-account">
                      {errors.confirmPassword.message as string}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="w-100 float-left">
              <div>
                <div className="col-md-12 p-l-0">
                  <div className="game-title m-b-10">
                    <h5 className="d-inline-block m-b-0 theme1font">
                      Privileges
                    </h5>
                  </div>
                  <div>
                    <div className="listing-grid prev-user-chk m-b-5 checkbox-container-wd">
                      {privileges?.map((privilege) => (
                        <div
                          key={privilege.id}
                          className="[ form-group ] checkbox-account d-inline-block m-l-5"
                        >
                          <div className="custom-control custom-checkbox">
                            <input
                              id={privilege.id}
                              type="checkbox"
                              {...register(`privileges.${privilege.id}`)}
                              className="custom-control-input"
                            />
                            <label
                              htmlFor={privilege.id}
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
            <div>
              <div className="text-right">
                <div className="text-right">
                  <div className="d-inline-flex align-items-center p-l-0 p-r-5">
                    <label className="m-t-10">Master Password</label>
                    <input
                      style={{ width: "200px" }}
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
                      className="form-control input-master-password m-l-5 m-t-5"
                      aria-required="true"
                      aria-invalid={errors.masterPassword ? "true" : "false"}
                    />
                    {errors.masterPassword && (
                      <p className="text-danger m-b-0 m-t-5 error-account">
                        {errors.masterPassword.message as string}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="btn btn-primary m-l-5 m-t-5"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="m-t-10">
          <div className="col-md-12 p-l-0">
            <div className="table-responsive">
              <div className="col-sm-12 p-l-0 p-r-5">
                <div className="prev-wrapper">
                  <div className="prev-scroller">
                    <table
                      role="table"
                      aria-busy="false"
                      aria-colcount="22"
                      className="table table checkbox-align"
                      id="__BVID__61"
                    >
                      <thead role="rowgroup" className="">
                        <tr role="row" className="">
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="1"
                            aria-sort="none"
                            className="position-relative action-buttons text-center"
                          >
                            <div>Action</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="2"
                            aria-sort="none"
                            className="position-relative text-left"
                          >
                            <div>User Name</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="3"
                            aria-sort="none"
                            className="position-relative text-left"
                          >
                            <div>Full Name</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="4"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Market Analysis</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="5"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Client List</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="6"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Withdraw</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="7"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Deposit</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="8"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>User Status</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="9"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>User Update</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="10"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Change Password</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="11"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Bank List</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="12"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Account Statement</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="13"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>My Bets</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="14"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Casino Report</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="15"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>User Log</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="16"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Game Report</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="17"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Fraud Report</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="18"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Casino List</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="19"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Game List</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="20"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Credit Reference</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="21"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>Exposure Limit</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            tabIndex={0}
                            aria-colindex="22"
                            aria-sort="none"
                            className="position-relative text-center"
                          >
                            <div>User Create</div>
                            <span className="sr-only">
                              {" "}
                              (Click to sort ascending)
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody role="rowgroup">
                        {users?.map((user, index) => (
                          <tr key={index} role="row">
                            <td
                              aria-colindex="1"
                              data-label="Action"
                              role="cell"
                              className="action-buttons text-center"
                            >
                              <div>
                                <span
                                  className="text-white btn btn-info"
                                  onClick={() => handleOpenUpdateModal(user)}
                                >
                                  U
                                </span>{" "}
                                <span
                                  className="text-white btn btn-warning"
                                  onClick={() =>
                                    handleOpenUserStatusModal(user)
                                  }
                                >
                                  S
                                </span>{" "}
                                <span
                                  className="text-white btn btn-dark"
                                  onClick={() =>
                                    handleOpenChangePasswordModal(user)
                                  }
                                >
                                  P
                                </span>
                              </div>
                            </td>
                            <td
                              aria-colindex="2"
                              data-label="User Name"
                              role="cell"
                              className="text-left"
                            >
                              <div>{user.userName}</div>
                            </td>
                            <td
                              aria-colindex="3"
                              data-label="Full Name"
                              role="cell"
                              className="text-left"
                            >
                              <div>{user.fullName}</div>
                            </td>
                            {privileges?.map((privilege, i) => (
                              <td
                                key={privilege.id}
                                aria-colindex={i + 4}
                                data-label={privilege.label}
                                role="cell"
                                className="text-center"
                              >
                                <div>
                                  <span>
                                    <div className="form-group list-client m-b-0">
                                      <input
                                        type="checkbox"
                                        name="fancy-checkbox-success"
                                        autoComplete="off"
                                        checked={user.permission.includes(
                                          privilege.id
                                        )}
                                        readOnly
                                      />
                                      <div
                                        className={`btn-group ${
                                          !user.permission.includes(
                                            privilege.id
                                          )
                                            ? "text-center"
                                            : ""
                                        }`}
                                      >
                                        <label
                                          htmlFor="fancy-checkbox-success"
                                          className="btn btn-secondary fancy-check"
                                        >
                                          {user.permission.includes(
                                            privilege.id
                                          ) ? (
                                            <span className="fas fa-check chk-bx-ht"></span>
                                          ) : (
                                            <span>&nbsp;</span>
                                          )}
                                          <span>&nbsp;</span>
                                        </label>
                                      </div>
                                    </div>
                                  </span>
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReusableModal
        show={isUpdateModalOpen}
        handleClose={handleCloseUpdateModal}
        title="Update User Information"
        size="xl"
        position="top"
      >
        {selectedUser && (
          <UpdatePwUserForm
            user={selectedUser}
            onClose={() => {
              handleCloseUpdateModal();
              fetchUsers();
            }}
          />
        )}
      </ReusableModal>
      <UserStatusModal
        show={isUserStatusModalOpen}
        handleClose={() => {
          handleCloseUserStatusModal();
          fetchUsers();
        }}
        user={selectedUser}
      />
      {selectedUser && (
        <ChangePasswordModal
          show={isChangePasswordModalOpen}
          handleClose={handleCloseChangePasswordModal}
          user={selectedUser}
        />
      )}
    </div>
  );
};
export default CreateUserForm;
