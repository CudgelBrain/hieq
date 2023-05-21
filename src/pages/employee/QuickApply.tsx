import React from 'react';
import tcsImg from 'assets/images/tcs.jpg'
import leftArrow from 'assets/images/left-chevron.svg';
import { useHistory } from 'react-router-dom';

const QuickApply = () => {
  const history = useHistory(); 
     return (
        <>
            <div className="dash-wrapper empl-panel">
    <main>
      <section className="main-wrapper">
        <div className="container-fluid">
          <div className="row position-relative">
            <div className="d-flex align-items-start lt-wrapper">
              {/* <div className="lt-sec lt-sec-short">
                <div className="lt-part">
                  <div className="lt-top">
                    <div className="comp-img mb-5">
                      <div className="cover-img" style={{backgroundImage: "url(assets/images/student.jpg)"}}></div>
                      <div className="profile-img"><img src="assets/images/mbatrek.svg" height="70" alt="" /></div>
                    </div>
                    <div className="text-center pt-4">
                      <div className="hd-16 fw-500 cl-dark mb-1">MBAtrek Pvt Ltd</div>
                      <div>Since 2007</div>
                    </div>
                    <div className="text-center pt-4 mb-3">
                      <button type="submit" className="btn btn-wt img-reflect"><img className="mr-2"
                          src="assets/images/view.svg" alt="" />View</button>
                      <button type="submit" className="btn btn-yl ml-2"><img className="mr-2" src="assets/images/edit.svg"
                          alt="" />Edit</button>
                    </div>
                  </div>
                  <div className="lt-navigation mb-5">
                    <ul className="nav pb-5">
                      <li> <a href="#" className="img-reflect"><img className="mr-2" src="assets/images/home.svg"
                            alt="" /><span>Dashboard</span></a> </li>
                      <li> <a href="#" className="img-reflect"><img className="mr-2" src="assets/images/jobs.svg"
                            alt="" /><span>Search jobs, internships</span></a> </li>
                      <li> <a href="#" className="img-reflect"><img className="mr-2" src="assets/images/saved-opportunities.svg"
                            alt="" /><span>Saved opportunities</span></a> </li>
                      <li> <a href="#" className="img-reflect"><img className="mr-2" src="assets/images/plus-fill.svg"
                            alt="" /><span>Assessments</span></a> </li>
                      <li> <a href="#" className="img-reflect"><img className="mr-2" src="assets/images/my-resumes.svg"
                            alt="" /><span>My Resumes</span></a> </li>
                      <li> <a href="#" className="img-reflect"><img className="mr-2" src="assets/images/support.svg"
                            alt="" /><span>Support Desk</span></a> </li>
                      <li> <a href="#" className="img-reflect"><img className="mr-2" src="assets/images/change-password.svg"
                            alt="" /><span>Change Password</span></a> </li>

                      <li> <a href="#" className="img-reflect"><img className="mr-2" src="assets/images/help-dark.svg"
                            alt="" /><span>Help</span></a> </li>
                    </ul>
                  </div>
                  <div className="ft-rel">
                    <div className="ft-fixed hd-14 cl-dark">
                      <div className="fw-500 mb-1">Need Help ?</div>
                      <div>+91 9821948334, +91 9821948335</div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-md-12 lt-sec-pd pt-4 pb-2" style={{paddingLeft:"0px",paddingRight:"0px"}}>
              <div className="box-container mb-4">
                <div className="box-container-inner">
                  <div className="mb-4 text-right">
                    <button type="button" className="btn btn-link cc-green"><img className="mr-1"
                        src={leftArrow} width="13" height="11" />Back</button>
                  </div>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <div className="jb-box-section jb-box-center">
                        <div className="jb-box-inner text-center flex-grow-1 first">
                          <figure className="jb-logo">
                            <img src={tcsImg} width="100" height="100" alt=""/>
                          </figure>
                          <h2 className="heading">Software Engineer</h2>
                          <h3 className="heading-sm">TCS</h3>
                        </div>
                        <div className="d-flex flex-column justify-content-center mt-2">
                            <button type="button" className="btn btn-link">Review job profile</button>
                          </div>
                        <div className="d-flex flex-column text-center mt-5 margin-auto">
                          <div className="mw-200"><button  className="btn btn-yl btn-lg w-100" >Quick Apply</button></div>
                          <div className="mw-200 mt-3"><button className="btn btn-yl btn-lg w-100" onClick={() => history.push('/employee/reviewApplication')}>Review and
                              Apply</button></div>
                        </div>
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

export default QuickApply;