import React from 'react';
import leftArrow from 'assets/images/left-chevron.svg'
import tcsImg from 'assets/images/tcs.jpg'
import calender from 'assets/images/calendar.svg'
import pencil from 'assets/images/pencil.svg'
import profile from 'assets/images/profile.jpg'
import info from 'assets/images/info.svg'
import deleteIcon from 'assets/images/delete-ico.svg'
import plusDark from 'assets/images/plus-dark.svg'
import plus from "assets/images/employee/plus.svg"
import starSolid from "assets/images/employee/star-solid.svg"
import starBlank from "assets/images/star-blank.svg"
import plusGrey from "assets/images/plus-grey.svg"
import greenTick from "assets/images/green-tick.svg"

const FullView = () => {
    return(
        <>
         <div className="dash-wrapper empl-panel">
    <main>
      <section className="main-wrapper">
        <div className="container-fluid">
          <div className="row position-relative">
            <div className="col-md-12 pt-4 pb-2" style={{paddingLeft: "0px",paddingRight:"0px"}}>
              <div className="box-container mb-4">
                <div className="box-container-inner">
                  <div className="mb-4 text-right">
                    <button type="button" className="btn btn-link cc-green"><img className="mr-1"
                        src={leftArrow} width="13" height="11"/>Back</button>
                  </div>
                  <div className="text-left mb-4 bb-1 pb-2">
                    <h2 className="bc-heading">Review your application</h2>
                  </div>
                  <div className="row">
                    <div className="col-md-8">                      
                        <div className="text-left mb-4">
                          <h2 className="bc-heading bc-heading-sm">1. Personal Information <button type="button" className="btn btn-pencil" title="Edit"><img width="12" src={pencil} alt=''/ ></button></h2>
                        </div>
                        <div className="mb-4">
                        <div className="row">
                          <div className="col-md-8">
                            <div className="row">
                              <div className="form-group col-12">
                                <label className="label mb-1">Full Name<span className="required">*</span></label>
                                <input type="text" className="form-control" value="Samar Dhiman" disabled/>
                              </div>
                              <div className="col-12">
                                <div className="form-row">
                                  <div className="form-group col-sm-6">
                                    <label className="label mb-1">Email Address<span className="required">*</span></label>
                                    <input type="text" className="form-control" value="samar.dhiman36@gmail.com" disabled/>
                                  </div>
                                  <div className="form-group col-sm-6">
                                    <label className="label mb-1">Contact Number<span className="required">*</span></label>
                                    <input type="text" className="form-control" value="8010501201" disabled/>
                                  </div>
                                  <div className="form-group col-sm-6">
                                    <label className="label mb-1">Gender<span className="required">*</span></label>
                                    <select className="selectpicker form-control" disabled>
                                      <option value="" selected>Male</option>
                                      <option value="">Female</option>
                                      <option value="">Prefer dont say</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-sm-6">
                                    <label className="label mb-1">Date of Birth<span className="required">*</span></label>
                                    <div className="input-group input-append disabled">
                                      <input type="text" className="form-control" value="02-02-2022" disabled/>
                                      <div className="input-group-append"> <span className="input-group-text"><img
                                            src={calender} height="20" alt=""/></span> </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-4 text-center">
                            <div className="change-img">
                              <div className="featured"><img src={profile} width="150" height="150"
                                  alt="" /></div>
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <label className="label mb-1">Profile Summary</label>
                            <textarea rows={4} className="form-control">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur luctus justo. Ut a tempus nulla. Aenean sed rhoncus eros. Nam et eleifend libero. Duis gravida lacus vitae enim viverra, ac sollicitudin massa pharetra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et neque diam. Phasellus quis massa massa. Proin volutpat mollis accumsan. Quisque id mauris varius augue sollicitudin consequat. Curabitur ullamcorper ipsum nec erat dictum auctor.</textarea>
                            <div className="text-right"><span className="note">250 words limit</span></div>
                          </div>
                        </div>
                      </div>                      
                        <div className="text-left mb-4">
                          <h2 className="bc-heading bc-heading-sm">2. Educational background <button type="button" className="btn btn-pencil" title="Edit"><img width="12" src={pencil} alt=''/></button></h2>
                        </div>
                        <div className="mb-4">
                        <div className="row">
                          <div className="col-12">
                            <div className="form-row">
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">Degree<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">MBA</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">Specialization<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">General Management</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">Year of Completion<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">2022</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-8">
                                <label className="label mb-1">Institute<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Indian Institute of Mangement, Kashipur</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">CGPA/Percentage<span className="required">*</span><span className="ml-1"
                                    data-toggle="tooltip" data-placement="top" title="Tooltip on top"><img
                                      src={info} width="16" height="16" alt=""/></span></label>
                                <input type="text" className="form-control" placeholder="7.46"/>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 mb-4">
                            <div className="row">
                              <div className="col-6">
                                
                              </div>
                              <div className="col-6 text-right pr-3">
                                <button type="submit" className="plus-btn"><img src={deleteIcon} width="16"
                                    height="18" alt=""/></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row pt-4 bt-1">
                          <div className="col-12">
                            <div className="form-row">
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">Degree<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">MBA</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">Specialization<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">General Management</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">Year of Completion<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">2022</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-8">
                                <label className="label mb-1">Institute<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Indian Institute of Mangement, Kashipur</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-4">
                                <label className="label mb-1">CGPA/Percentage<span className="required">*</span><span className="ml-1"
                                    data-toggle="tooltip" data-placement="top" title="Tooltip on top"><img
                                      src={info} width="16" height="16" alt=""/></span></label>
                                <input type="text" className="form-control" placeholder="7.46"/>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 mb-4">
                            <div className="row">
                              <div className="col-6">
                                <button type="submit" className="plus-btn"><img src={plus} width="20"
                                    height="20" alt=""/><span className="ml-1">Add More</span></button>
                              </div>
                              <div className="col-6 text-right pr-3">
                                <button type="submit" className="plus-btn"><img src={deleteIcon} width="16"
                                    height="18" alt=""/></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                        <div className="text-left mb-4">
                          <h2 className="bc-heading bc-heading-sm">3. Work Experience <button type="button" className="btn btn-pencil" title="Edit"><img width="12" src={pencil} alt=''/></button></h2>
                        </div>
                        <div className="mb-4">
                        <div className="row">
                          <div className="form-group col-12">
                            <div className="d-flex align-items-center txt-md">
                              <span className="mr-2">Fresher</span>
                              <div className="custom-control custom-switch custom-switch-lg">
                                <input type="checkbox" className="custom-control-input" id="switchVariable" checked={true}/>
                                <label className="custom-control-label" htmlFor="switchVariable">Experienced</label>
                              </div>
                            </div>
                          </div>
                          <div className="form-group d-inline-flex align-items-center pr-0 col-3 pt-2">
                            <label className="label mb-0">Total Work Experience<span className="required">*</span></label>
                          </div>
                          <div className="form-group col-5 pt-2">
                            <div className="form-row">
                              <div className="col-6"><select className="selectpicker form-control">
                                  <option value="">Year</option>
                                </select></div>
                              <div className="col-6"><select className="selectpicker form-control">
                                  <option value="">Month</option>
                                </select></div>
                            </div>
                          </div>
                        </div>
                        <div className="row pt-2">
                          <div className="col-12">
                            <div className="form-row">
                              <div className="form-group col-4">
                                <label className="label mb-1">Organization<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Tata Consultancy Services (TCS)</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <label className="label mb-1">Designation<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Systems Engineer</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <label className="label mb-1">Employment Type<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Full-Time Job</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <label className="label mb-1">From<span className="required">*</span></label>
                                <div className="form-row">
                                  <div className="col-6"><select className="selectpicker form-control">
                                      <option value="">Month</option>
                                    </select></div>
                                  <div className="col-6"><select className="selectpicker form-control">
                                      <option value="">Year</option>
                                    </select></div>
                                </div>
                              </div>
                              <div className="form-group col-4">
                                <label className="label mb-1">To<span className="required">*</span></label>
                                <div className="form-row">
                                  <div className="col-6"><select className="selectpicker form-control">
                                      <option value="">Month</option>
                                    </select></div>
                                  <div className="col-6"><select className="selectpicker form-control">
                                      <option value="">Year</option>
                                    </select></div>
                                </div>
                              </div>
                              <div className="col-4 d-flex align-items-center">
                                <div className="custom-inline">
                                  <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="loctype1" name="loctype"/>
                                    <label className="custom-control-label pl-1" htmlFor="loctype1">I currently work here</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <label className="label mb-1">Description (Role, responsibilities, achievements etc.)</label>
                            <textarea rows={8} className="form-control"></textarea>
                            <div className="text-right"><span className="note">250 words limit</span></div>
                          </div>
                          <div className="col-12 mb-4">
                            <div className="row">
                              <div className="col-6">
                                <button type="submit" className="plus-btn"><img src={plus} width="20"
                                    height="20" alt=""/><span className="ml-1">Add More</span></button>
                              </div>
                              <div className="col-6 text-right pr-3">
                                <button type="submit" className="plus-btn"><img src={deleteIcon} width="16"
                                    height="18" alt=""/></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                        <div className="text-left mb-4">
                          <h2 className="bc-heading bc-heading-sm">4. Skills and Portfolio <button type="button" className="btn btn-pencil" title="Edit"><img width="12" src={pencil} alt='' /></button></h2>
                        </div>
                        <div className="mb-4">
                        <div className="row pt-2">
                          <div className="col-12">
                            <div className="form-row align-items-center">
                              <div className="form-group col-3">
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">HTML</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <div className="star-rating d-flex align-items-center">
                                  <img src={starSolid} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <button type="submit" className="plus-btn ml-4"><img src={deleteIcon}
                                      width="16" height="18" alt=""/></button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-row align-items-center">
                              <div className="form-group col-3">
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">HTML</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <div className="star-rating d-flex align-items-center">
                                  <img src={starSolid} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <button type="submit" className="plus-btn ml-4"><img src={deleteIcon}
                                      width="16" height="18" alt=""/></button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-row align-items-center">
                              <div className="form-group col-3">
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">HTML</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <div className="star-rating d-flex align-items-center">
                                  <img src={starSolid} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <img src={starBlank} width="18" height="18" alt=""/>
                                  <button type="submit" className="plus-btn ml-4"><img src={deleteIcon}
                                      width="16" height="18" alt=""/></button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 mb-4">
                            <div className="row">
                              <div className="col-6">
                                <button type="submit" className="plus-btn"><img src={plus} width="20"
                                    height="20" alt=""/><span className="ml-1">Add More</span></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 pt-3 bt-1">&nbsp;</div>
                          <div className="col-12">
                            <label className="label mb-2 heading-xs">Social Media Links and Work Portfolio</label>
                          </div>
                          <div className="col-12">
                            <div className="form-row align-items-center">
                              <div className="form-group col-2">
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Facebook</option>
                                </select>
                              </div>
                              <div className="form-group d-flex align-items-center col-5">
                                <input type="text" className="form-control" placeholder="Enter or Paste link here"/>
                              </div>
                              <div className="form-group col-1">
                                <button type="submit" className="plus-btn ml-2"><img src={deleteIcon}
                                    width="16" height="18" alt=""/></button>
                              </div>
      
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-row align-items-center">
                              <div className="form-group col-2">
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Facebook</option>
                                </select>
                              </div>
                              <div className="form-group d-flex align-items-center col-5">
                                <input type="text" className="form-control" placeholder="Enter or Paste link here"/>
                              </div>
                              <div className="form-group col-1">
                                <button type="submit" className="plus-btn ml-2"><img src={deleteIcon}
                                    width="16" height="18" alt=""/></button>
                              </div>
      
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-row align-items-center">
                              <div className="form-group col-2">
                                <select className="selectpicker form-control" data-live-search="true">
                                  <option value="">Facebook</option>
                                </select>
                              </div>
                              <div className="form-group d-flex align-items-center col-5">
                                <input type="text" className="form-control" placeholder="Enter or Paste link here"/>
                              </div>
                              <div className="form-group col-1">
                                <button type="submit" className="plus-btn ml-2"><img src={deleteIcon}
                                    width="16" height="18" alt=""/></button>
                              </div>
      
                            </div>
                          </div>
      
      
                          <div className="col-12 mb-4">
                            <div className="row">
                              <div className="col-6">
                                <button type="submit" className="plus-btn"><img src={plus} width="20"
                                    height="20" alt=""/><span className="ml-1">Add More</span></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 pt-3 bt-1">&nbsp;</div>
                          <div className="col-12">
                            <label className="label mb-2 heading-xs">Additional Information</label>
                          </div>
                          <div className="col-12 mt-3">
                            <button type="submit" className="plus-btn"><img src={plusDark} width="20"
                                height="20" alt=""/><span className="ml-1 cc-grey">Certifications/Licenses</span></button>
                          </div>
                          <div className="col-12 mb-4">
                            <div className="row pt-4">
                              <div className="col-12">
                                <div className="form-row">
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Certification<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true">
                                      <option value="">Scrum Master</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Institute<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true">
                                      <option value="">Project Management Institute</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Domain<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true">
                                      <option value="">Project Management</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Certification Date<span className="required">*</span></label>
                                    <div className="form-row">
                                      <div className="col-6"><select className="selectpicker form-control">
                                          <option value="">Month</option>
                                        </select></div>
                                      <div className="col-6"><select className="selectpicker form-control">
                                          <option value="">Year</option>
                                        </select></div>
                                    </div>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Valid till<span className="required">*</span></label>
                                    <div className="form-row">
                                      <div className="col-6"><select className="selectpicker form-control">
                                          <option value="">Month</option>
                                        </select></div>
                                      <div className="col-6"><select className="selectpicker form-control">
                                          <option value="">Year</option>
                                        </select></div>
                                    </div>
                                  </div>
                                  <div className="col-4 d-flex align-items-center">
                                    <div className="custom-inline">
                                      <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="loctype1" name="loctype"/>
                                        <label className="custom-control-label pl-1" htmlFor="loctype1">Valid for Lifetime</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 mb-4">
                                <div className="row">
                                  <div className="col-6">
                                    <button type="submit" className="plus-btn"><img src={plus}
                                        width="20" height="20" alt=""/><span className="ml-1">Add More</span></button>
                                  </div>
                                  <div className="col-6 text-right pr-3">
                                    <button type="submit" className="plus-btn"><img src={deleteIcon}
                                        width="16" height="18" alt=""/></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 mt-3">
                                <button type="submit" className="plus-btn"><img src={plusDark} width="20"
                                    height="20" alt=""/><span className="ml-1 cc-grey">Positions of Responsibility</span></button>
                              </div>
                              <div className="col-12 mt-2">
                                <textarea rows={4} className="form-control"></textarea>
                                <div className="text-right"><span className="note">250 words limit</span></div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 mt-3">
                                <button type="submit" className="plus-btn"><img src={plusDark} width="20"
                                    height="20" alt=""/><span className="ml-1 cc-grey">Projects, Publications</span></button>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 mt-3">
                                <button type="submit" className="plus-btn"><img src={plusDark} width="20"
                                    height="20" alt=""/><span className="ml-1 cc-grey">EXTRA-curriculars</span></button>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 mt-3">
                                <button type="submit" className="plus-btn"><img src={plusDark} width="20"
                                    height="20" alt=""/><span className="ml-1 cc-grey">ACHIEVEMENTS</span></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                        <div className="text-left mb-4">
                          <h2 className="bc-heading bc-heading-sm">5. Documents <button type="button" className="btn btn-pencil" title="Edit"><img width="12" src={pencil} alt=''/></button></h2>
                        </div>
                        <div className="mb-4">
                        <div className="row">
                          <div className="col-12">
                            <label className="label mb-2 heading-xs">Resume</label>
                          </div>
                          <div className="col-4">
                            <label className="label mb-1">Choose a resume</label>
                            <div className="input-group input-append mb-2 cursor">
                              <input type="text" className="form-control" value="nived general" readOnly/>
                              <div className="input-group-append"> <span className="input-group-text"></span> </div>
                            </div>
                            <div className="input-group input-append mb-2 cursor">
                              <input type="text" className="form-control" value="nived software" readOnly/>
                              <div className="input-group-append"> <span className="input-group-text"><img src={greenTick} height="25" alt=""/></span> </div>
                            </div>
                            <button type="submit" className="plus-btn"><img src={plusGrey} width="20"
                              height="20" alt=""/><span className="ml-1 cc-grey text-normal">Upload a new resume</span></button>
                          </div>
                        </div>
                        <div className="row pt-4">
                          <div className="col-12">
                            <label className="label mb-2 heading-xs">Visume</label>
                          </div>
                          <div className="col-6">
                            <label className="label mb-1">Visume Drive Link</label>
                            <input type="text" className="form-control" placeholder="Enter or Paste Google Drive / YouTube Link"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 text-center pl-5">
                      <div className="jb-box-section jb-box-center bg-light p-5 pos-sticky tp-100">
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
                      </div>
                    </div>
                    <div className="col-md-12 mt-5 text-center mb-4">
                      <button type="submit" className="btn btn-yl btn-lg mw-250">Submit Application</button>
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

export default FullView;