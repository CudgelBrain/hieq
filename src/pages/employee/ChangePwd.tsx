import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface ChangePwdProps {}

interface ChangePwdState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  error: string | null;
}

const ChangePwd: React.FC<ChangePwdProps> = () => {

  const [state, setState] = useState<ChangePwdState>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    error: null,
  });

  // Handle input changes
  const handleOldPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, oldPassword: event.target.value });
  };

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, newPassword: event.target.value });
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, confirmPassword: event.target.value });
  };

  // Handle form submission
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Validate password inputs
    if (state.newPassword !== state.confirmPassword) {
      setState({ ...state, error: "Passwords do not match." });
      return;
    }

    // Make API request
    axios
      .post("/auth/change-password", {
        email: "your-email@example.com",
        password: state.oldPassword,
        newPassword: state.newPassword,
      })
      .then((response) => {
        // Password change successful
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        setState({ ...state, error: "Failed to change password. Please try again." });
        console.error(error);
      });
  };


  return (
    <div className="dash-wrapper empl-panel">
      <main>
        <section className="main-wrapper">
          <div className="container-fluid">
            <div className="row position-relative">
              {/* Rest of your component code */}
              <div className="col-md-12 pt-4 pb-2" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                <div className="text-left d-flex mb-4">
                  <div className="pg-title flex-grow-1">Change password</div>
                </div>
                <div className="box-container mb-4 p-4">
                  <div className="box-container-inner p-0 pt-4">
                    <div className="row align-items-center mb-4">
                      <div className="col-md-12">
                        <div className="form-group col-6 mb-4">
                          <label className="label mb-1">Old Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Old Password"
                            value={state.oldPassword}
                            onChange={handleOldPasswordChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group col-6 mb-4">
                          <label className="label mb-1">New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter New Password"
                            value={state.newPassword}
                            onChange={handleNewPasswordChange}
                          />
                          <div className="note pt-1">
                            Note: Password must contain at least 8 characters, one uppercase and one number
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group col-6 mb-4">
                          <label className="label mb-1">Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Confirm Password"
                            value={state.confirmPassword}
                            onChange={handleConfirmPasswordChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group col-6 mb-4">
                        <button type="button" className="btn btn-yl btn-lg mw-250" onClick={handleSubmit}>
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
  
}

export default ChangePwd;