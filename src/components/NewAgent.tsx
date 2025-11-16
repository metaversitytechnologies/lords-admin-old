import React from "react";

const NewAgent: React.FC = () => {
  return (
    <div className="apl-section">
      <form>
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
                    name="LoginId"
                    aria-required="true"
                    aria-invalid="false"
                  />
                  <span className="text-danger error-account"></span>
                </span>
              </div>
              <div className="apl-form-row m-b-40">
                <label>Password</label>
                <span>
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    aria-required="true"
                    aria-invalid="false"
                  />
                  <span className="text-danger error-account"></span>
                </span>
              </div>
              <div className="apl-form-row m-b-40">
                <label>Repeat Password</label>
                <span>
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    aria-required="true"
                    aria-invalid="false"
                  />
                  <span className="text-danger error-account"></span>
                </span>
              </div>
              <div className="apl-form-row m-b-30">
                <label>User Status</label>
                <div className="custom-control custom-radio d-inline-block">
                  <div className="custom-control custom-radio">
                    <input
                      id="userstatustrue"
                      type="radio"
                      name="userstatus"
                      className="custom-control-input"
                      value="1"
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
                      name="userstatus"
                      className="custom-control-input"
                      value="0"
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
                      name="betstatus"
                      className="custom-control-input"
                      value="1"
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
                      name="betstatus"
                      className="custom-control-input"
                      value="0"
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
                  name="creditReference"
                  maxLength={21}
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
                  name="userRate"
                  maxLength={21}
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
                        name="level"
                        className="form-control"
                        aria-required="true"
                        aria-invalid="false"
                      >
                        <option value="">Select Level</option>
                        <option value="7"> User </option>
                      </select>
                    </span>
                    <span className="text-danger error-account"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="apl-form-row m-b-30">
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
            </div>
          </div>
        </section>
        <section className="d-inline-block v-t">
          <div className="apl-section-inner">
            <legend className="p-b-10">Notes</legend>
            <textarea
              name="Notes"
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
              name="MasterPassword"
              aria-required="true"
              aria-invalid="false"
            />
            <p className="text-danger m-b-0 m-t-5 error-account"></p>
          </div>
          <button className="btn btn-link">Cancel</button>
          <button className="btn btn-primary m-l-5">Create</button>
        </div>
      </form>
    </div>
  );
};

export default NewAgent;
