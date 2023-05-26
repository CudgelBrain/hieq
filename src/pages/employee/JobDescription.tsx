import React from "react";
import locationImg from 'assets/images/location.svg';
import file from 'assets/images/file.svg';
import rupee from 'assets/images/rupee.svg'
import tcsImg from 'assets/images/tcs.jpg';
import share from 'assets/images/share.svg';
import leftArrow from 'assets/images/left-chevron.svg';
import flag from 'assets/images/flag.svg';
import pdf from 'assets/images/pdf-ico.svg';
import { useLocation } from "react-router-dom";

const JobDescription = () =>{

  const {state} = useLocation()

   const jobDescription:any = state;
  console.log(jobDescription,"location")


    return(
        <>
             <div className="dash-wrapper empl-panel">
      {/* <div className="container-fluid">
        <div className="row position-relative align-items-center">
          <div className="lt-sec"> <img src="assets/images/hieq.svg" height="40" alt="" />
            <div className="nav-bar"><img src="assets/images/bar.svg" height="20" alt="" /></div>
          </div>
          <div className="col-6 pt-3 pb-3 lt-sec-pd">
            <button type="submit" className="btn btn-yl"><img className="mr-3" src="assets/images/search-white.svg" height="20"
                alt="" /> Jobs, internships</button>
          </div>
          <div className="col-6 pt-3 pb-3 text-right">
            <div className="tprt-link"> <button type="button" className="text-link" title="Dark Mode"><img
                  src="assets/images/dark-mode.svg" height="28" alt="" /></button> <button type="button"
                className="text-link" title="Notifications"><img src="assets/images/notifications.svg" height="28"
                  alt="" /></button> <button type="button" className="text-link" title="Help"><img
                  src="assets/images/help.svg" height="23" alt="" /></button> <button type="button" className="text-link"
                title="Logout"><img src="assets/images/logout.svg" height="21" alt="" /></button> </div>
          </div>
        </div>
      </div> */}
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
            <div className="col-md-12 pt-4 pb-2" style={{paddingLeft: "0px",paddingRight:"0px"}}>
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
                        <div className="jb-box-inner mt-4 flex-grow-1 third">
                          <div className="list d-flex align-items-center"><span className="ico mr-2"><img
                                src={locationImg} width="20" height="20" alt=""/></span>Gurgaon, Haryana
                          </div>
                          <div className="list d-flex align-items-center"><span className="ico mr-2"><img
                                src={file} width="20" height="20" alt=""/></span>7-12 Yrs</div>
                          <div className="list d-flex align-items-center"><span className="ico mr-2"><img
                                src={rupee} width="20" height="20" alt=""/></span>Not available</div>
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                          <button type="submit" className="btn btn-wt btn-lg img-reflect">Save</button>
                          <button type="submit" className="btn btn-yl btn-lg ml-2">APPLY</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 mt-4">
                      <div className="bg-light p-4 br-10">
                        <div className="content">
                          <h2>What you will do :</h2>
                          <ul>
                            <li>Must have good working experience in Photoshop,CorelDraw,and HTML</li>
                            <li>Candidate must have good experience in web designing</li>
                            <li> Good understanding of front-end optimization techniques,cross-browser compatibility,and
                              Responsive web design</li>
                            <li> Good working Knowledge of pixel-perfect conversion of PSD into HTML document with the
                              Responsive view</li>
                          </ul>
                          <br />
                          <h2>Who we need :</h2>
                          <ul>
                            <li>Candidate must have good experience in web designing.</li>
                            <li>Must have good working experience in Photoshop, CorelDraw, and HTML.</li>
                            <li>Experience in App based company prefers.</li>
                            <li>Good communication skill, presentable, smart.</li>
                            <li>Good working Knowledge of pixel-perfect conversion of PSD into HTML document with the
                              Responsive view</li>
                            <li>Good understanding of front-end optimization techniques, cross-browser compatibility,
                              and Responsive web design.</li>
                            <li>Develop templates for mailers and websites using the design software.</li>
                            <li>Ability to solve problems creatively and effectively.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mt-4">
                      <div className="bg-lightdark p-4 br-10">
                        <div className="content content-fade">
                          <h2>About us</h2>
                          <p>HCL Technologies Limited, d/b/a HCLTech, is an Indian multinational information technology
                            services and consulting company headquartered in Noida. It emerged as an independent company
                            in 1991 when HCL entered into the software services business. The company has offices in 52
                            countries and over 210,966 employees. <a href="#" className="btn-link cc-black">Know more</a>
                          </p>
                        </div>
                        <div className="mt-4">
                          <div className="content content-fade">
                            <h2>Links</h2>
                            <a href="#" className="btn-link cc-black">www.hcltechnologies.com/about</a>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="content content-fade">
                            <h2>Attachments</h2>
                            <a href="#" className="tag pdf-attach"><span className="mr-1"><img src={pdf}/></span>Job Description</a>
                            <a href="#" className="tag pdf-attach"><span className="mr-1"><img src={pdf}/></span>Job Description</a>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="content content-fade ul-w50">
                            <h2>Job Highlights</h2>
                            <ul>
                              <li>
                                Industry Type</li>
                              <li> Functional Area</li>
                              <li> Employment Type</li>
                              <li> Type of organization
                              </li>
                              <li>
                                IT Services & Consulting</li>
                              <li> UX, Design & Architecture</li>
                              <li>Full Time</li>
                              <li> Large scale
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="content content-fade">
                            <h2>Qualifications</h2>
                            <p>Bachelors Degree in Computer Science</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="content content-fade">
                            <h2>Key Skills</h2>
                            <div className="tag">HTML 5</div>
                            <div className="tag">CSS 3.0</div>
                            <div className="tag">PHP</div>
                            <div className="tag">Bootstrap</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 mb-4">
                        <div className="d-flex">
                          <div className="w-50">
                            <button type="button" className="btn-link cc-green"><img className="mr-2"
                                src={share} height="20" />Share this job</button>
                          </div>
                          <div className="w-50 text-right">
                            <button type="button" className="btn-link cc-red"><img className="mr-2" src={flag}
                                height="20"/>Report this job</button>
                          </div>
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

export default JobDescription;