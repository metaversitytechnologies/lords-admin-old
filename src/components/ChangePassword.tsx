import React, { useState } from 'react';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle password change logic here
        console.log({
            oldPassword,
            newPassword,
            confirmPassword,
        });
    };

    return (
        <section className="apl-section">
            <div className="listing-grid w-100 float-left">
                <div className="col-md-10 page-container">
                    <div>
                        <div className="container container-changepasseword-login100">
                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-6 change-password-box">
                                    <form onSubmit={handleSubmit}>
                                        <div className="card">
                                            <div className="card-header">
                                                <h5 className="m-b-0">Change Password</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="form-group m-b-35">
                                                    <input
                                                        type="password"
                                                        name="oldPassword"
                                                        placeholder="Enter old password"
                                                        className="form-control"
                                                        value={oldPassword}
                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                        required
                                                    />
                                                    <span className="text-danger error-login"></span>
                                                </div>
                                                <div className="form-group m-b-35">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        placeholder="Enter new password"
                                                        className="form-control"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        required
                                                    />
                                                    <span className="text-danger error-login"></span>
                                                </div>
                                                <div className="form-group m-b-35">
                                                    <input
                                                        type="password"
                                                        name="confirmpassword"
                                                        placeholder="Enter confirm password"
                                                        className="form-control"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        required
                                                    />
                                                    <span className="text-danger error-login"></span>
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-secondary btn-block">
                                                        Change Password
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
            </div>
        </section>
    );
};

export default ChangePassword;
