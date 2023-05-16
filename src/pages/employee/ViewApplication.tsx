import React from 'react';
import profile from 'assets/images/profile.jpg'
import tcsImg from 'assets/images/tcs.jpg'
import starSolid from 'assets/images/star-solid.svg'
import starBlank from 'assets/images/star-blank.svg'
import leftArrow from 'assets/images/left-chevron.svg'

const ViewApplication = () => {
  return (
    <>
      <div className='dash-wrapper empl-panel'>
        <main>
          <section className='main-wrapper'>
            <div className='container-fluid'>
              <div className='row position-relative'>
                <div
                  className='col-md-12 lt-sec-pd pt-4 pb-2'
                  style={{ paddingLeft: '0px', paddingRight: '0px' }}
                >
                  <div className='box-container mb-4'>
                    <div className='box-container-inner'>
                      <div className='mb-4 text-right'>
                        <button type='button' className='btn btn-link cc-green'>
                          <img
                            className='mr-1'
                            src={leftArrow}
                            width='13'
                            height='11'
                          />
                          Back
                        </button>
                      </div>
                      <div className='row'>
                        <div className='col-md-8'>
                          <div className='text-left mb-4'>
                            <h2 className='bc-heading bc-heading-sm'>1. Personal Information</h2>
                          </div>
                          <div className='mb-4 view-input'>
                            <div className='row'>
                              <div className='col-md-8'>
                                <div className='row'>
                                  <div className='form-group col-12'>
                                    <label className='label mb-1'>Full Name</label>
                                    <div>Samar Dhiman</div>
                                  </div>
                                  <div className='col-12'>
                                    <div className='form-row'>
                                      <div className='form-group col-sm-6'>
                                        <label className='label mb-1'>Email Address</label>
                                        <div>samar.dhiman36@gmail.com</div>
                                      </div>
                                      <div className='form-group col-sm-6'>
                                        <label className='label mb-1'>Contact Number</label>
                                        <div>8010501201</div>
                                      </div>
                                      <div className='form-group col-sm-6'>
                                        <label className='label mb-1'>Gender</label>
                                        <div>Male</div>
                                      </div>
                                      <div className='form-group col-sm-6'>
                                        <label className='label mb-1'>Date of Birth</label>
                                        <div>02-02-2022</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-4 text-center'>
                                <div className='change-img'>
                                  <div className='featured'>
                                    <img
                                      src={profile}
                                      width='150'
                                      height='150'
                                      alt=''
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='form-group col-12'>
                                <label className='label mb-1'>Profile Summary</label>
                                <div>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                  efficitur luctus justo. Ut a tempus nulla. Aenean sed rhoncus
                                  eros. Nam et eleifend libero. Duis gravida lacus vitae enim
                                  viverra, ac sollicitudin massa pharetra. Vestibulum ante ipsum
                                  primis in faucibus orci luctus et ultrices posuere cubilia curae;
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et
                                  neque diam. Phasellus quis massa massa. Proin volutpat mollis
                                  accumsan. Quisque id mauris varius augue sollicitudin consequat.
                                  Curabitur ullamcorper ipsum nec erat dictum auctor.
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='text-left mb-4'>
                            <h2 className='bc-heading bc-heading-sm'>2. Education</h2>
                          </div>
                          <div className='mb-4 view-input'>
                            <div className='row'>
                              <div className='col-12'>
                                <div className='form-row'>
                                  <div className='form-group col-sm-4'>
                                    <label className='label mb-1'>Class</label>
                                    <div>High School (10th)</div>
                                  </div>
                                  <div className='form-group col-sm-4'>
                                    <label className='label mb-1'>Board</label>
                                    <div>CBSE</div>
                                  </div>
                                  <div className='form-group col-sm-4'>
                                    <label className='label mb-1'>Year of Completion</label>
                                    <div>2022</div>
                                  </div>
                                  <div className='form-group col-sm-8'>
                                    <label className='label mb-1'>School</label>
                                    <div>Kendriya Vidyalaya No.1</div>
                                  </div>
                                  <div className='form-group col-sm-4'>
                                    <label className='label mb-1'>CGPA/Percentage</label>
                                    <div>7.46</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='row pt-4'>
                              <div className='col-md-12 pt-4 bt-1'>&nbsp;</div>
                              <div className='col-12'>
                                <div className='form-row'>
                                  <div className='form-group col-sm-4'>
                                    <label className='label mb-1'>Degree</label>
                                    <div>MBA</div>
                                  </div>
                                  <div className='form-group col-sm-4'>
                                    <label className='label mb-1'>Specialization</label>
                                    <div>General Management</div>
                                  </div>
                                  <div className='form-group col-sm-4'>
                                    <label className='label mb-1'>Year of Completion</label>
                                    <div>2022</div>
                                  </div>
                                  <div className='form-group col-sm-8'>
                                    <label className='label mb-1'>Institute</label>
                                    <div>Indian Institute of Mangement, Kashipur</div>
                                  </div>
                                  <div className='form-group col-sm-4'>
                                    <label className='label mb-1'>CGPA/Percentage</label>
                                    <div>7.46</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='text-left mb-4'>
                            <h2 className='bc-heading bc-heading-sm'>3. Work Experience</h2>
                          </div>
                          <div className='mb-4 view-input'>
                            <div className='row'>
                              <div className='form-group d-inline-flex align-items-center pr-0 col-3 pt-2'>
                                <label className='label mb-0 mt-0'>Total Work Experience</label>
                              </div>
                              <div className='form-group d-inline-flex align-items-center pr-0 col-8 pt-2'>
                                <div className='col-6'>3 year 4 month</div>
                              </div>
                            </div>
                            <div className='row pt-2'>
                              <div className='col-12'>
                                <div className='form-row'>
                                  <div className='form-group col-4'>
                                    <label className='label mb-1'>Organization</label>
                                    <div>Tata Consultancy Services (TCS)</div>
                                  </div>
                                  <div className='form-group col-4'>
                                    <label className='label mb-1'>Designation</label>
                                    <div>Systems Engineer</div>
                                  </div>
                                  <div className='form-group col-4'>
                                    <label className='label mb-1'>Employment Type</label>
                                    <div>Full-Time Job</div>
                                  </div>
                                  <div className='form-group col-4'>
                                    <label className='label mb-1'>From</label>
                                    <div className='form-row'>
                                      <div className='col-6'>June 2022</div>
                                    </div>
                                  </div>
                                  <div className='form-group col-4'>
                                    <label className='label mb-1'>To</label>
                                    <div className='form-row'>
                                      <div className='col-6'>Present</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='form-group col-12'>
                                <label className='label mb-1'>
                                  Description (Role, responsibilities, achievements etc.)
                                </label>
                                <div>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                  efficitur luctus justo. Ut a tempus nulla. Aenean sed rhoncus
                                  eros. Nam et eleifend libero. Duis gravida lacus vitae enim
                                  viverra, ac sollicitudin massa pharetra. Vestibulum ante ipsum
                                  primis in faucibus orci luctus et ultrices posuere cubilia curae;
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et
                                  neque diam. Phasellus quis massa massa. Proin volutpat mollis
                                  accumsan. Quisque id mauris varius augue sollicitudin consequat.
                                  Curabitur ullamcorper ipsum nec erat dictum auctor.
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='text-left mb-4'>
                            <h2 className='bc-heading bc-heading-sm'>4. Skills</h2>
                          </div>
                          <div className='mb-4 view-input'>
                            <div className='row pt-2'>
                              <div className='col-12'>
                                <div className='form-row align-items-center'>
                                  <div className='form-group col-2'>
                                    <div>HTML</div>
                                  </div>
                                  <div className='form-group col-4'>
                                    <div className='star-rating d-flex align-items-center'>
                                      <img
                                        src={starSolid}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                      <img
                                        src={starBlank}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                      <img
                                        src={starBlank}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                      <img
                                        src={starBlank}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                      <img
                                        src={starBlank}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-12'>
                                <div className='form-row align-items-center'>
                                  <div className='form-group col-2'>
                                    <div>CSS 3.0</div>
                                  </div>
                                  <div className='form-group col-4'>
                                    <div className='star-rating d-flex align-items-center'>
                                      <img
                                        src={starSolid}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                      <img
                                        src={starBlank}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                      <img
                                        src={starBlank}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                      <img
                                        src={starBlank}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                      <img
                                        src={starBlank}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-12'>
                                <div className='form-row align-items-center'>
                                  <div className='form-group col-2'>
                                    <div>Bootstrap</div>
                                  </div>
                                  <div className='form-group col-4'>
                                    <div className='star-rating d-flex align-items-center'>
                                      <img
                                        src={starSolid}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                      <img
                                        src={starBlank}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                      <img
                                        src={starBlank}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                      <img
                                        src={starBlank}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                      <img
                                        src={starBlank}
                                        width='18'
                                        height='18'
                                        alt=''
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-md-12 pt-3 bt-1'>&nbsp;</div>
                              <div className='col-12'>
                                <label className='label mb-4 heading-xs'>
                                  Social Media Links and Work Portfolio
                                </label>
                              </div>
                              <div className='col-12'>
                                <div className='form-row align-items-center'>
                                  <div className='form-group col-2'>
                                    <div>Facebook</div>
                                  </div>
                                  <div className='form-group col-8'>
                                    https://www.facebook.com/hieq
                                  </div>
                                </div>
                              </div>
                              <div className='col-12'>
                                <div className='form-row align-items-center'>
                                  <div className='form-group col-2'>
                                    <div>Twitter</div>
                                  </div>
                                  <div className='form-group col-8'>
                                    https://www.twitter.com/hieq
                                  </div>
                                </div>
                              </div>
                              <div className='col-12'>
                                <div className='form-row align-items-center'>
                                  <div className='form-group col-2'>
                                    <div>LinkedIn</div>
                                  </div>
                                  <div className='form-group col-8'>
                                    https://www.linkedin.com/hieq
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-md-12 pt-3 bt-1'>&nbsp;</div>
                              <div className='col-12'>
                                <label className='label mb-2 heading-xs'>
                                  Additional Information
                                </label>
                              </div>
                              <div className='col-12 mt-3'>
                                <button type='submit' className='plus-btn'>
                                  <span className='cc-grey'>Certifications/Licenses</span>
                                </button>
                              </div>
                              <div className='col-12 mb-4'>
                                <div className='row pt-4'>
                                  <div className='col-12'>
                                    <div className='form-row'>
                                      <div className='form-group col-4'>
                                        <label className='label mb-1'>Certification</label>
                                        <div>Scrum Master</div>
                                      </div>
                                      <div className='form-group col-4'>
                                        <label className='label mb-1'>Institute</label>
                                        <div>Project Management Institute</div>
                                      </div>
                                      <div className='form-group col-4'>
                                        <label className='label mb-1'>Domain</label>
                                        <div>Project Management</div>
                                      </div>
                                      <div className='form-group col-4'>
                                        <label className='label mb-1'>Certification Date</label>
                                        <div className='form-row'>
                                          <div className='col-6'>June 2022</div>
                                        </div>
                                      </div>
                                      <div className='form-group col-4'>
                                        <label className='label mb-1'>Valid till</label>
                                        <div className='form-row'>
                                          <div className='col-6'>June 2028</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='row'>
                                  <div className='col-12 mt-3'>
                                    <button type='submit' className='plus-btn'>
                                      <span className='cc-grey'>Positions of Responsibility</span>
                                    </button>
                                  </div>
                                  <div className='col-12 mt-2'>
                                    <div>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                      efficitur luctus justo. Ut a tempus nulla. Aenean sed rhoncus
                                      eros. Nam et eleifend libero. Duis gravida lacus vitae enim
                                      viverra, ac sollicitudin massa pharetra. Vestibulum ante ipsum
                                      primis in faucibus orci luctus et ultrices posuere cubilia
                                      curae; Lorem ipsum dolor sit amet, consectetur adipiscing
                                      elit. In et neque diam. Phasellus quis massa massa. Proin
                                      volutpat mollis accumsan. Quisque id mauris varius augue
                                      sollicitudin consequat. Curabitur ullamcorper ipsum nec erat
                                      dictum auctor.
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='text-left mb-4'>
                            <h2 className='bc-heading bc-heading-sm'>5. Documents</h2>
                          </div>
                          <div className='mb-4 view-input'>
                            <div className='row'>
                              <div className='col-12'>
                                <label className='label mb-2 heading-xs'>Resume</label>
                              </div>
                              <div className='col-4'>
                                <div>nived general</div>
                              </div>
                            </div>
                            <div className='row pt-4'>
                              <div className='col-12'>
                                <label className='label mb-2 heading-xs'>Visume</label>
                              </div>
                              <div className='col-6'>
                                <label className='label mb-1'>Visume Drive Link</label>
                                <div>www.googledrive.com/1234</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-4 text-center pl-5'>
                          <div className='jb-box-section jb-box-center bg-light p-5 pos-sticky tp-100'>
                            <div className='jb-box-inner text-center flex-grow-1 first'>
                              <figure className='jb-logo'>
                                <img src={tcsImg} width='100' height='100' alt='' />
                              </figure>
                              <h2 className='heading'>Software Engineer</h2>
                              <h3 className='heading-sm'>TCS</h3>
                            </div>
                            <div className='d-flex flex-column justify-content-center mt-2'>
                              <button type='button' className='btn btn-link'>
                                Review job profile
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-12 text-center mt-5 mb-4'>
                          <button type='submit' className='btn btn-wt btn-lg'>
                            Print
                          </button>
                          <button type='submit' className='btn btn-yl btn-lg ml-2'>
                            Download
                          </button>
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
  );
};

export default ViewApplication;
