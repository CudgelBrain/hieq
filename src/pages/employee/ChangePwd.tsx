import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { hieqService } from "utils";

const ChangePwd = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [data,setData] = useState<any>(null);

  const handleOldPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    let getEmail = localStorage.getItem("email")

    axios
    .post("http://beta.hieq.in:9000/auth/change-password", 
      {getEmail,newPassword}
      ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_token')}`
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        setError("Failed to change password. Please try again.");
        console.error(error);
      });
      console.log(localStorage.getItem('_token'))
  };

  return (
    <div className="dash-wrapper empl-panel">
      <main>
        <section className="main-wrapper">
          <div className="container-fluid">
            <div className="row position-relative">
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
                            value={oldPassword}
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
                            value={newPassword}
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
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group col-6 mb-4">
                          <button type="submit" className="btn btn-yl btn-lg mw-250" onClick={handleSubmit}>
                            Update
                          </button>
                        </div>
                      </div>
                      {error && <div className="col-md-12">{error}</div>}
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
};

export default ChangePwd;


