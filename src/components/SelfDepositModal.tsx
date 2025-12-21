import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { selfDeposit } from "../api/auth";
import FlashMessage from "./FlashMessage";

interface SelfDepositModalProps {
  show: boolean;
  handleClose: () => void;
}

type SelfDepositFormInputs = {
  amount: string;
  lupassword: string;
};

const SelfDepositModal: React.FC<SelfDepositModalProps> = ({
  show,
  handleClose
}) => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SelfDepositFormInputs>({
    mode: "onBlur"
  });

  useEffect(() => {
    if (!show) {
      reset();
      setError(null);
      setSuccessMessage(null);
    }
  }, [show, reset]);

  const onSubmit = async (data: SelfDepositFormInputs) => {
    setError(null);
    setSuccessMessage(null);

    const amount = Number(data.amount);
    if (Number.isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }

    try {
      const response = await selfDeposit({
        amount,
        lupassword: data.lupassword
      });
      if (response.status) {
        setSuccessMessage(response.message || "Deposit submitted");
        setTimeout(() => {
          handleClose();
        }, 800);
      } else {
        setError(response.message || "Failed to submit deposit.");
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
              <div className="">
                <div className="apl-section-inner">
                  <h4 className="self-deposit-title m-b-20">Self Deposit</h4>
                  <div className="default-flash-message m-b-10">
                    {error && <FlashMessage type="error" message={error} />}
                    {successMessage && (
                      <FlashMessage type="success" message={successMessage} />
                    )}
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group m-b-25">
                      <input
                        type="number"
                        placeholder="Enter Coins"
                        className="form-control"
                        step="any"
                        min="0"
                        {...register("amount", {
                          required: "Amount is required"
                        })}
                      />
                      {errors.amount && (
                        <span className="text-danger error-login">
                          {errors.amount.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group m-b-25">
                      <input
                        type="password"
                        placeholder="Master Password"
                        className="form-control"
                        {...register("lupassword", {
                          required: "Master Password is required",
                          minLength: {
                            value: 6,
                            message: "Master Password must be 6 characters long"
                          },
                          maxLength: {
                            value: 6,
                            message: "Master Password must be 6 characters long"
                          }
                        })}
                      />
                      {errors.lupassword && (
                        <span className="text-danger error-login">
                          {errors.lupassword.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group text-right m-b-0 self-deposit-actions">
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={handleClose}
                        disabled={isSubmitting}
                      >
                        Return
                      </button>
                      <button
                        type="submit"
                        className="btn btn-submit m-l-5"
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
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

export default SelfDepositModal;
