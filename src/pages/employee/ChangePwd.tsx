import React from "react";

const ChangePwd = () => {
    return(
        <>
            <div className="dash-wrapper empl-panel">
    <main>
      <section className="main-wrapper">
        <div className="container-fluid">
          <div className="row position-relative">
            {/* <div className="lt-sec">
              <div className="comp-img mt-4">
                <div className="profile-img"><img src="assets/images/employee/profile.jpg" width="150" height="150"
                    alt="" /></div>
              </div>
              <div className="text-center pt-2">
                <div className="hd-16 fw-500 cl-dark">Samar Dhiman</div>
                <div>Web Designer</div>
              </div>
              <div className="text-center pt-4 mb-4">
                <button type="submit" className="btn btn-wt btn-md img-reflect"><img className="mr-2"
                    src="assets/images/view.svg" alt="" />View</button>
                <button type="submit" className="btn btn-yl btn-md ml-1"><img className="mr-2" src="assets/images/edit.svg"
                    alt="" />Edit</button>
              </div>
              <div className="lt-navigation mb-5">
                <ul className="nav pb-5">
                  <li> <a href="#" className="img-reflect"><img className="mr-2" width="16" src="assets/images/home.svg"
                        alt="" /><span>Dashboard</span></a> </li>
                  <li> <a href="#" className="img-reflect"><img className="mr-2" width="16" src="assets/images/jobs.svg"
                        alt="" /><span>Search jobs, internships</span></a> </li>
                  <li> <a href="#" className="img-reflect"><img className="mr-2" width="16" src="assets/images/star.svg"
                        alt="" /><span>Saved opportunities</span></a> </li>
                  <li> <a href="#" className="img-reflect"><img className="mr-2" width="16"src="assets/images/plus-fill.svg"
                        alt="" /><span>Badges</span></a> </li>
                  <li> <a href="#" className="img-reflect"><img className="mr-2" width="16" src="assets/images/my-resumes.svg"
                        alt="" /><span>My Resumes</span></a> </li>
                  <li> <a href="#" className="img-reflect"><img className="mr-2" width="16" src="assets/images/change-password.svg"
                        alt="" /><span>Change Password</span></a> </li>

                  <li> <a href="#" className="img-reflect"><img className="mr-2" width="16" src="assets/images/help-dark.svg"
                        alt="" /><span>Help</span></a> </li>
                </ul>
              </div>
              <div className="ft-rel">
                <div className="ft-fixed hd-14 cl-dark">
                  <div className="fw-500 mb-1">Need Help ?</div>
                  <div>+91 9821948334, +91 9821948335</div>
                </div>
              </div>
            </div> */}
            <div className="col-md-12 pt-4 pb-2" style={{paddingLeft: "0px",paddingRight:"0px"}}>
              <div className="text-left d-flex mb-4">
                <div className="pg-title flex-grow-1">Change password</div>
              </div>
              <div className="box-container mb-4 p-4">
                <div className="box-container-inner p-0 pt-4">
                  <div className="row align-items-center mb-4">
                    <div className="col-md-12">
                      <div className="form-group col-6 mb-4">
                        <label className="label mb-1">Old Password</label>
                        <input type="text" className="form-control" placeholder="Enter Old Password"/>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group col-6 mb-4">
                        <label className="label mb-1">New Password</label>
                        <input type="text" className="form-control" placeholder="Enter New Password"/>
                        <div className="note pt-1">Note: Password must contain at least 8 characters, one uppercase and one number</div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group col-6 mb-4">
                        <label className="label mb-1">Confirm Password</label>
                        <input type="text" className="form-control" placeholder="Enter Confirm Password"/>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group col-6 mb-4">
                      <button type="submit" className="btn btn-yl btn-lg mw-250">Update</button>
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
        </>
    )
}

export default ChangePwd;