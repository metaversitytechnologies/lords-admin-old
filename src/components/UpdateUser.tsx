import React from 'react';

interface UpdateUserProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ isOpen, onClose, username }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div style={{ position: 'fixed', zIndex: 1040, top: 0, left: 0, width: '100%', height: '100%' }}>
      <div className="modal fade show" role="dialog" aria-modal="true" style={{ display: 'block' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" onClick={onClose}>
                <i className="fas fa-times"></i>
              </button>
              <div id="HelpScreenModal" className="update-agent">
                <div>
                  <div>
                    <form>
                      <section>
                        <div className="apl-section-inner">
                          <legend>Information</legend>
                          <div className="apl-form-row">
                            <label>Username</label>
                            <span>{username}</span>
                          </div>
                          <div className="apl-form-row row m-t-25">
                            <div className="col-4">
                              <label>User Rate</label>
                              <input
                                placeholder=" User Rate"
                                type="text"
                                name="UserRate"
                                onKeyPress={(e) => { if (e.currentTarget.value.length === 10) e.preventDefault(); }}
                                className="form-control"
                                aria-required="true"
                                aria-invalid="false"
                              />
                              <span className="text-danger error"></span>
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
                                name="password"
                                maxLength={18}
                                className="w-100"
                                aria-required="false"
                                aria-invalid="false"
                              />
                              <span className="text-danger error"></span>
                            </div>
                            <div className="col-4">
                              <label>Repeat Password</label>
                              <input
                                placeholder="Re Type Password"
                                name="confirmpassword"
                                type="password"
                                maxLength={18}
                                className="w-100"
                                aria-required="false"
                                aria-invalid="false"
                              />
                              <span className="text-danger error"></span>
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
                              <div className="custom-control custom-radio">
                                <input
                                  id="userstatustrue"
                                  type="radio"
                                  name="userstatus"
                                  className="custom-control-input"
                                  value="true"
                                />
                                <label htmlFor="userstatustrue" className="custom-control-label">
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
                                <label htmlFor="userstatusfalse" className="custom-control-label">
                                  INACTIVE
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="apl-form-row m-t-25">
                            <label>Bet Status</label>
                            <div className="custom-control custom-radio d-inline-block">
                              <div className="custom-control custom-radio">
                                <input
                                  id="betstatustrue"
                                  type="radio"
                                  name="betstatus"
                                  className="custom-control-input"
                                  value="true"
                                />
                                <label htmlFor="betstatustrue" className="custom-control-label">
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
                                <label htmlFor="betstatusfalse" className="custom-control-label">
                                  INACTIVE
                                </label>
                              </div>
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
                                  <input placeholder="Credit" type="text" disabled />
                                </span>
                              </div>
                              <div className="apl-form-row">
                                <label> New Credit Limit</label>
                                <span>
                                  <input
                                    placeholder="Credit Limit"
                                    type="text"
                                    name="Credit Limit"
                                    onKeyPress={(e) => { if (e.currentTarget.value.length === 14) e.preventDefault(); }}
                                    aria-required="false"
                                    aria-invalid="false"
                                  />
                                  <span className="d-inline-block v-m">
                                    &gt;=2000.00
                                    <br /> &lt;= 8249.50
                                  </span>
                                </span>
                              </div>
                              <span className="text-danger error-account d-inline-block"></span>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section></section>
                      <section>
                        <div className="apl-section-inner">
                          <legend className="p-b-10">Notes</legend>
                          <textarea
                            onKeyPress={(e) => { if (e.currentTarget.value.length === 50) e.preventDefault(); }}
                            name="Notes"
                            aria-required="false"
                            aria-invalid="false"
                          ></textarea>
                          <span className="text-danger error-account"></span>
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
                                  type="Password"
                                  name="masterPassword"
                                  className="form-control"
                                  aria-required="true"
                                  aria-invalid="false"
                                />
                                <span className="text-danger error"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <div className="text-right">
                        <button className="btn btn-link" onClick={onClose}>Cancel</button>
                        <button className="btn btn-update scroll-top">Save</button>
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
