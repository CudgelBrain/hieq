import { useAppQuery } from 'app/hooks'
import React, { useState } from 'react'
import { hieqService } from 'utils'


function Profile() {

  const [mode, setMode] = useState<string | null>('view')
  const query = useAppQuery().get('mode')
  const [stepOne, setStepOne] = useState<object>({
    firstName: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    profile_summary: ""
  })
  React.useEffect(() => setMode(query ?? 'view'), [query]);

  const handleChange = (step: number, name: string, value: string) => {
    if (step === 1) {
      setStepOne({ ...stepOne, [name]: value })
    }
  }
  console.log(stepOne)
  const handleSubmit = async (step: number, event: any) => {
    let data = {}
    event?.preventDefault()
    if (step === 1) {
      data = stepOne
     const response = await hieqService.post('/employeeProfile', data);
     console.log(await response.status)
    }
  }



  return (
    <>
      <form>
        <div className="col-md-12 pt-4 pb-5">
          <div className="box-container mb-4">
            <div className="box-container-inner">
              <div className="text-left mb-4">
                <h2 className="bc-heading">1. Personal Information</h2>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="row">
                    <div className="form-group col-12">
                      <label className="label mb-1">Full Name<span className="required">*</span></label>
                      <input type="text" className="form-control" placeholder="Enter full name"
                        disabled={mode === 'view'}
                        name='firstName'
                        onChange={(e) => handleChange(1, e.target.name, e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <div className="form-row">
                        <div className="form-group col-sm-6">
                          <label className="label mb-1">Email Address<span className="required">*</span></label>
                          <input type="text" className="form-control" placeholder="Enter email address"
                            disabled={mode === 'view'}
                            name="email"
                            onChange={(e) => handleChange(1, e.target.name, e.target.value)}
                          />
                        </div>
                        <div className="form-group col-sm-6">
                          <label className="label mb-1">Contact Number<span className="required">*</span></label>
                          <input type="text" className="form-control" placeholder="Enter phone number" disabled={mode === 'view'}
                            name="mobile"
                            onChange={(e) => handleChange(1, e.target.name, e.target.value)}
                          />
                        </div>
                        <div className="form-group col-sm-6">
                          <label className="label mb-1">Gender<span className="required">*</span></label>
                          <select className="selectpicker form-control" disabled={mode === 'view'}
                            name="gender"
                            onChange={(e) => handleChange(1, e.target.name, e.target.value)}
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="not">Prefer dont say</option>
                          </select>
                        </div>
                        <div className="form-group col-sm-6">
                          <label className="label mb-1">Date of Birth<span className="required">*</span></label>
                          <div className="input-group">
                            <input type="date" className="form-control" placeholder="dd-mm-yyy" value="" disabled={mode === 'view'}
                              name="dob"
                              onChange={(e) => handleChange(1, e.target.name, e.target.value)}
                            />
                            <div className="input-group-append"> <span className="input-group-text"><img
                              src="assets/images/calendar.svg" height="20" alt="" /></span> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4 text-center">
                  <div className="change-img">
                    <div className="browseImg"><img src="assets/images/employee/camera.svg" width="25" alt="" /></div>
                    <div className="featured"><img src="assets/images/employee/profile.jpg" width="150" height="150"
                      alt="" /></div>
                  </div>
                </div>
                <div className="form-group col-12">
                  <label className="label mb-1">Profile Summary</label>
                  <textarea rows={4} cols={2} className="form-control" disabled={mode === 'view'}
                    name="profile_summary"
                    onChange={(e) => handleChange(1, e.target.name, e.target.value)}
                  />
                  <div className="text-right"><span className="note">250 words limit</span></div>
                </div>
                <div className="col-12 mt-4">
                  <div className="form-row">
                    <div className="col-md-6">
                      <button className="btn btn-yl btn-sm">BACK</button>
                    </div>
                    <div className="col-md-6 text-right">
                      <button className="btn btn-yl btn-sm" onClick={(event) => handleSubmit(1, event)}>SAVE</button>
                      <button className="btn btn-yl btn-sm ml-3" onClick={(event) => handleSubmit(1, event)}>NEXT</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-container mb-4">
            <div className="box-container-inner">
              <div className="text-left mb-4">
                <h2 className="bc-heading">2. Education</h2>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-row">
                    <div className="form-group col-sm-4">
                      <label className="label mb-1">Class<span className="required">*</span></label>
                      <input type="text" className="form-control" placeholder="High School (10th)" disabled={mode === 'view'} />
                    </div>
                    <div className="form-group col-sm-4">
                      <label className="label mb-1">Board<span className="required">*</span></label>
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">CBSE</option>
                      </select>
                    </div>
                    <div className="form-group col-sm-4">
                      <label className="label mb-1">Year of Completion<span className="required">*</span></label>
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">2022</option>
                      </select>
                    </div>
                    <div className="form-group col-sm-8">
                      <label className="label mb-1">School<span className="required">*</span></label>
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">Kendriya Vidyalaya No.1</option>
                      </select>
                    </div>
                    <div className="form-group col-sm-4">
                      <label className="label mb-1">CGPA/Percentage<span className="required">*</span><span className="ml-1"
                        data-toggle="tooltip" data-placement="top" title="Tooltip on top"><img
                          src="assets/images/employee/info.svg" width="16" height="16" alt="" /></span></label>
                      <input type="text" className="form-control" placeholder="7.46" disabled={mode === 'view'} />
                    </div>
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <div className="row">
                    <div className="col-6">
                      <button className="plus-btn"><img src="assets/images/employee/plus.svg" width="20"
                        height="20" alt="" /><span className="ml-1">Add Senior Secondary details</span></button>
                    </div>
                    <div className="col-6 text-right pr-3">
                      <button className="plus-btn"><img src="assets/images/employee/delete.svg" width="16"
                        height="18" alt="" /></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-4">
                <div className="col-md-12 pt-4 bt-1">&nbsp;</div>
                <div className="col-12">
                  <div className="form-row">
                    <div className="form-group col-sm-4">
                      <label className="label mb-1">Degree<span className="required">*</span></label>
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">MBA</option>
                      </select>
                    </div>
                    <div className="form-group col-sm-4">
                      <label className="label mb-1">Specialization<span className="required">*</span></label>
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">General Management</option>
                      </select>
                    </div>
                    <div className="form-group col-sm-4">
                      <label className="label mb-1">Year of Completion<span className="required">*</span></label>
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">2022</option>
                      </select>
                    </div>
                    <div className="form-group col-sm-8">
                      <label className="label mb-1">Institute<span className="required">*</span></label>
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">Indian Institute of Mangement, Kashipur</option>
                      </select>
                    </div>
                    <div className="form-group col-sm-4">
                      <label className="label mb-1">CGPA/Percentage<span className="required">*</span><span className="ml-1"
                        data-toggle="tooltip" data-placement="top" title="Tooltip on top"><img
                          src="assets/images/employee/info.svg" width="16" height="16" alt="" /></span></label>
                      <input type="text" className="form-control" placeholder="7.46" disabled={mode === 'view'} />
                    </div>
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <div className="row">
                    <div className="col-6">
                      <button className="plus-btn"><img src="assets/images/employee/plus.svg" width="20"
                        height="20" alt="" /><span className="ml-1">Add More</span></button>
                    </div>
                    <div className="col-6 text-right pr-3">
                      <button className="plus-btn"><img src="assets/images/employee/delete.svg" width="16"
                        height="18" alt="" /></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 mt-4">
                  <div className="form-row">
                    <div className="col-md-6">
                      <button className="btn btn-yl btn-sm">BACK</button>
                    </div>
                    <div className="col-md-6 text-right">
                      <button className="btn btn-yl btn-sm">SAVE</button>
                      <button className="btn btn-yl btn-sm ml-3">NEXT</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-container mb-4">
            <div className="box-container-inner">
              <div className="text-left mb-4">
                <h2 className="bc-heading">3. Work Experience</h2>
              </div>
              <div className="row">
                <div className="form-group col-12">
                  <div className="d-flex align-items-center txt-md">
                    <span className="mr-2">Fresher</span>
                    <div className="custom-control custom-switch custom-switch-lg">
                      <input type="checkbox" className="custom-control-input" id="switchVariable" disabled={mode === 'view'} />
                      <label className="custom-control-label">Experienced</label>
                    </div>
                  </div>
                </div>
                <div className="form-group d-inline-flex align-items-center pr-0 col-2 pt-2">
                  <label className="label mb-0">Total Work Experience<span className="required">*</span></label>
                </div>
                <div className="form-group col-4 pt-2">
                  <div className="form-row">
                    <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}>
                      <option value="">Year</option>
                    </select></div>
                    <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}>
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
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">Tata Consultancy Services (TCS)</option>
                      </select>
                    </div>
                    <div className="form-group col-4">
                      <label className="label mb-1">Designation<span className="required">*</span></label>
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">Systems Engineer</option>
                      </select>
                    </div>
                    <div className="form-group col-4">
                      <label className="label mb-1">Employment Type<span className="required">*</span></label>
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">Full-Time Job</option>
                      </select>
                    </div>
                    <div className="form-group col-4">
                      <label className="label mb-1">From<span className="required">*</span></label>
                      <div className="form-row">
                        <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}>
                          <option value="">Month</option>
                        </select></div>
                        <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}>
                          <option value="">Year</option>
                        </select></div>
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <label className="label mb-1">To<span className="required">*</span></label>
                      <div className="form-row">
                        <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}>
                          <option value="">Month</option>
                        </select></div>
                        <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}>
                          <option value="">Year</option>
                        </select></div>
                      </div>
                    </div>
                    <div className="col-4 d-flex align-items-center">
                      <div className="custom-inline">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="loctype1" name="loctype" disabled={mode === 'view'} />
                          <label className="custom-control-label pl-1">I currently work here</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group col-12">
                  <label className="label mb-1">Description (Role, responsibilities, achievements etc.)</label>
                  <textarea rows={8} className="form-control" disabled={mode === 'view'}></textarea>
                  <div className="text-right"><span className="note">250 words limit</span></div>
                </div>
                <div className="col-12 mb-4">
                  <div className="row">
                    <div className="col-6">
                      <button className="plus-btn"><img src="assets/images/employee/plus.svg" width="20"
                        height="20" alt="" /><span className="ml-1">Add More</span></button>
                    </div>
                    <div className="col-6 text-right pr-3">
                      <button className="plus-btn"><img src="assets/images/employee/delete.svg" width="16"
                        height="18" alt="" /></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 mt-4">
                  <div className="form-row">
                    <div className="col-md-6">
                      <button className="btn btn-yl btn-sm">BACK</button>
                    </div>
                    <div className="col-md-6 text-right">
                      <button className="btn btn-yl btn-sm">SAVE</button>
                      <button className="btn btn-yl btn-sm ml-3">NEXT</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-container mb-4">
            <div className="box-container-inner">
              <div className="text-left mb-4">
                <h2 className="bc-heading">4. Skills</h2>
              </div>
              <div className="row pt-2">
                <div className="col-12">
                  <div className="form-row align-items-center">
                    <div className="form-group col-3">
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">HTML</option>
                      </select>
                    </div>
                    <div className="form-group col-4">
                      <div className="star-rating d-flex align-items-center">
                        <img src="assets/images/employee/star-solid.svg" width="18" height="18" alt="" />
                        <img src="assets/images/employee/star-blank.svg" width="18" height="18" alt="" />
                        <img src="assets/images/employee/star-blank.svg" width="18" height="18" alt="" />
                        <img src="assets/images/employee/star-blank.svg" width="18" height="18" alt="" />
                        <img src="assets/images/employee/star-blank.svg" width="18" height="18" alt="" />
                        <button className="plus-btn ml-4"><img src="assets/images/employee/delete.svg"
                          width="16" height="18" alt="" /></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-row align-items-center">
                    <div className="form-group col-3">
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">HTML</option>
                      </select>
                    </div>
                    <div className="form-group col-4">
                      <div className="star-rating d-flex align-items-center">
                        <img src="assets/images/employee/star-solid.svg" width="18" height="18" alt="" />
                        <img src="assets/images/employee/star-blank.svg" width="18" height="18" alt="" />
                        <img src="assets/images/employee/star-blank.svg" width="18" height="18" alt="" />
                        <img src="assets/images/employee/star-blank.svg" width="18" height="18" alt="" />
                        <img src="assets/images/employee/star-blank.svg" width="18" height="18" alt="" />
                        <button className="plus-btn ml-4"><img src="assets/images/employee/delete.svg"
                          width="16" height="18" alt="" /></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-row align-items-center">
                    <div className="form-group col-3">
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">HTML</option>
                      </select>
                    </div>
                    <div className="form-group col-4">
                      <div className="star-rating d-flex align-items-center">
                        <img src="assets/images/employee/star-solid.svg" width="18" height="18" alt="" />
                        <img src="assets/images/employee/star-blank.svg" width="18" height="18" alt="" />
                        <img src="assets/images/employee/star-blank.svg" width="18" height="18" alt="" />
                        <img src="assets/images/employee/star-blank.svg" width="18" height="18" alt="" />
                        <img src="assets/images/employee/star-blank.svg" width="18" height="18" alt="" />
                        <button className="plus-btn ml-4"><img src="assets/images/employee/delete.svg"
                          width="16" height="18" alt="" /></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <div className="row">
                    <div className="col-6">
                      <button className="plus-btn">
                        <img src="assets/images/employee/plus.svg" width="20"
                          height="20" alt="" /><span className="ml-1">Add More</span></button>
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
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">Facebook</option>
                      </select>
                    </div>
                    <div className="form-group d-flex align-items-center col-5">
                      <input type="text" className="form-control" placeholder="Enter or Paste link here" disabled={mode === 'view'} />
                    </div>
                    <div className="form-group col-1">
                      <button className="plus-btn ml-2"><img src="assets/images/employee/delete.svg"
                        width="16" height="18" alt="" /></button>
                    </div>

                  </div>
                </div>
                <div className="col-12">
                  <div className="form-row align-items-center">
                    <div className="form-group col-2">
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">Facebook</option>
                      </select>
                    </div>
                    <div className="form-group d-flex align-items-center col-5">
                      <input type="text" className="form-control" placeholder="Enter or Paste link here" disabled={mode === 'view'} />
                    </div>
                    <div className="form-group col-1">
                      <button className="plus-btn ml-2"><img src="assets/images/employee/delete.svg"
                        width="16" height="18" alt="" /></button>
                    </div>

                  </div>
                </div>
                <div className="col-12">
                  <div className="form-row align-items-center">
                    <div className="form-group col-2">
                      <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                        <option value="">Facebook</option>
                      </select>
                    </div>
                    <div className="form-group d-flex align-items-center col-5">
                      <input type="text" className="form-control" placeholder="Enter or Paste link here" disabled={mode === 'view'} />
                    </div>
                    <div className="form-group col-1">
                      <button className="plus-btn ml-2"><img src="assets/images/employee/delete.svg"
                        width="16" height="18" alt="" /></button>
                    </div>

                  </div>
                </div>


                <div className="col-12 mb-4">
                  <div className="row">
                    <div className="col-6">
                      <button className="plus-btn"><img src="assets/images/employee/plus.svg" width="20"
                        height="20" alt="" /><span className="ml-1">Add More</span></button>
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
                  <button className="plus-btn"><img src="assets/images/plus-dark.svg" width="20"
                    height="20" alt="" /><span className="ml-1 cc-dark">Certifications/Licenses</span></button>
                </div>
                <div className="col-12 mb-4">
                  <div className="row pt-4">
                    <div className="col-12">
                      <div className="form-row">
                        <div className="form-group col-4">
                          <label className="label mb-1">Certification<span className="required">*</span></label>
                          <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                            <option value="">Scrum Master</option>
                          </select>
                        </div>
                        <div className="form-group col-4">
                          <label className="label mb-1">Institute<span className="required">*</span></label>
                          <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                            <option value="">Project Management Institute</option>
                          </select>
                        </div>
                        <div className="form-group col-4">
                          <label className="label mb-1">Domain<span className="required">*</span></label>
                          <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}>
                            <option value="">Project Management</option>
                          </select>
                        </div>
                        <div className="form-group col-4">
                          <label className="label mb-1">Certification Date<span className="required">*</span></label>
                          <div className="form-row">
                            <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}>
                              <option value="">Month</option>
                            </select></div>
                            <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}>
                              <option value="">Year</option>
                            </select></div>
                          </div>
                        </div>
                        <div className="form-group col-4">
                          <label className="label mb-1">Valid till<span className="required">*</span></label>
                          <div className="form-row">
                            <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}>
                              <option value="">Month</option>
                            </select></div>
                            <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}>
                              <option value="">Year</option>
                            </select></div>
                          </div>
                        </div>
                        <div className="col-4 d-flex align-items-center">
                          <div className="custom-inline">
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input" id="loctype1" name="loctype" disabled={mode === 'view'} />
                              <label className="custom-control-label pl-1">Valid for Lifetime</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-4">
                      <div className="row">
                        <div className="col-6">
                          <button className="plus-btn"><img src="assets/images/employee/plus.svg"
                            width="20" height="20" alt="" /><span className="ml-1">Add More</span></button>
                        </div>
                        <div className="col-6 text-right pr-3">
                          <button className="plus-btn"><img src="assets/images/employee/delete.svg"
                            width="16" height="18" alt="" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mt-3">
                      <button className="plus-btn"><img src="assets/images/plus-dark.svg" width="20"
                        height="20" alt="" /><span className="ml-1 cc-dark">Positions of Responsibility</span></button>
                    </div>
                    <div className="col-12 mt-2">
                      <textarea rows={4} className="form-control" disabled={mode === 'view'}></textarea>
                      <div className="text-right"><span className="note">250 words limit</span></div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mt-3">
                      <button className="plus-btn"><img src="assets/images/plus-dark.svg" width="20"
                        height="20" alt="" /><span className="ml-1 cc-dark">Projects, Publications</span></button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mt-3">
                      <button className="plus-btn"><img src="assets/images/plus-dark.svg" width="20"
                        height="20" alt="" /><span className="ml-1 cc-dark">EXTRA-curriculars</span></button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mt-3">
                      <button className="plus-btn"><img src="assets/images/plus-dark.svg" width="20"
                        height="20" alt="" /><span className="ml-1 cc-dark">ACHIEVEMENTS</span></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 mt-4">
                  <div className="form-row">
                    <div className="col-md-6">
                      <button className="btn btn-yl btn-sm">BACK</button>
                    </div>
                    <div className="col-md-6 text-right">
                      <button className="btn btn-yl btn-sm">SAVE</button>
                      <button className="btn btn-yl btn-sm ml-3">NEXT</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-container mb-4">
            <div className="box-container-inner">
              <div className="text-left mb-4">
                <h2 className="bc-heading">5. Documents</h2>
              </div>
              <div className="row">
                <div className="col-12">
                  <label className="label mb-2 heading-xs">Resume</label>
                </div>
                <div className="col-4">
                  <label className="label mb-1">Upload File<span className="required">*</span> <span className="note">(.pdf
                    format only)</span></label>
                  <div className="custom-file">
                    <input type="file" className="custom-file-input form-control" id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                    <label className="custom-file-label mb-0 form-control">Choose file</label>
                  </div>
                  <span className="note fw-400">File must be less than 1MB</span><button
                    className="btn-link ml-2">view</button>
                </div>
                <div className="col-3 d-flex align-items-center">
                  <button className="plus-btn ml-2"><img src="assets/images/employee/delete.svg"
                    width="16" height="18" alt="" /></button>
                </div>
              </div>
              <div className="row pt-4">
                <div className="col-12">
                  <label className="label mb-2 heading-xs">Visume</label>
                </div>
                <div className="col-6">
                  <label className="label mb-1">Visume Drive Link</label>
                  <input type="text" className="form-control" placeholder="Enter or Paste Google Drive / YouTube Link" disabled={mode === 'view'} />
                </div>
              </div>
              <div className="row pt-4">
                <div className="col-md-12 pt-3 bt-1">&nbsp;</div>
                <div className="col-12">
                  <label className="label mb-2 heading-xs">ID Proof <span className="note">(Aadhar or PAN
                    Card)</span></label>
                </div>
                <div className="col-12">
                  <div className="row mt-3">
                    <div className="col-4">
                      <label className="label mb-1">Upload File<span className="required">*</span> <span className="note">(.pdf
                        format only)</span></label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input form-control" id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                        <label className="custom-file-label mb-0 form-control">Choose
                          file</label>
                      </div>
                      <span className="note fw-400">File must be less than 1MB</span><button
                        className="btn-link ml-2">view</button>
                    </div>
                    <div className="col-3 d-flex align-items-center">
                      <button className="plus-btn ml-2"><img src="assets/images/employee/delete.svg"
                        width="16" height="18" alt="" /></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-4">
                <div className="col-md-12 pt-3 bt-1">&nbsp;</div>
                <div className="col-12">
                  <label className="label mb-2 heading-xs">Educational Certificates <span className="note">(.pdf format
                    only)</span></label>
                </div>
                <div className="col-12">
                  <div className="row mt-3">
                    <div className="col-4">
                      <label className="label mb-1">PG Certificate<span className="required">*</span> </label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input form-control" id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                        <label className="custom-file-label mb-0 form-control">Choose
                          file</label>
                      </div>
                      <span className="note fw-400">File must be less than 1MB</span><button
                        className="btn-link ml-2">view</button>
                    </div>
                    <div className="col-3 d-flex align-items-center">
                      <button className="plus-btn ml-2"><img src="assets/images/employee/delete.svg"
                        width="16" height="18" alt="" /></button>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-4">
                      <label className="label mb-1">UG Certificate<span className="required">*</span> </label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input form-control" id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                        <label className="custom-file-label mb-0 form-control">Choose
                          file</label>
                      </div>
                      <span className="note fw-400">File must be less than 1MB</span><button
                        className="btn-link ml-2">view</button>
                    </div>
                    <div className="col-3 d-flex align-items-center">
                      <button className="plus-btn ml-2"><img src="assets/images/employee/delete.svg"
                        width="16" height="18" alt="" /></button>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-4">
                      <label className="label mb-1">XII Marksheet<span className="required">*</span> </label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input form-control" id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                        <label className="custom-file-label mb-0 form-control" >Choose
                          file</label>
                      </div>
                      <span className="note fw-400">File must be less than 1MB</span><button
                        className="btn-link ml-2">view</button>
                    </div>
                    <div className="col-3 d-flex align-items-center">
                      <button className="plus-btn ml-2"><img src="assets/images/employee/delete.svg"
                        width="16" height="18" alt="" /></button>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-4">
                      <label className="label mb-1">X Marksheet<span className="required">*</span> </label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input form-control" id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                        <label className="custom-file-label mb-0 form-control" >Choose
                          file</label>
                      </div>
                      <span className="note fw-400">File must be less than 1MB</span><button
                        className="btn-link ml-2">view</button>
                    </div>
                    <div className="col-3 d-flex align-items-center">
                      <button className="plus-btn ml-2"><img src="assets/images/employee/delete.svg"
                        width="16" height="18" alt="" /></button>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-4">
                      <label className="label mb-1">Other Degree<span className="required">*</span> </label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input form-control" id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                        <label className="custom-file-label mb-0 form-control" >Choose
                          file</label>
                      </div>
                      <span className="note fw-400">File must be less than 1MB</span><button
                        className="btn-link ml-2">view</button>
                    </div>
                    <div className="col-3 d-flex align-items-center">
                      <button className="plus-btn ml-2"><img src="assets/images/employee/delete.svg"
                        width="16" height="18" alt="" /></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-4">
                <div className="col-md-12 pt-3 bt-1">&nbsp;</div>
                <div className="col-12">
                  <label className="label mb-2 heading-xs">Employment Proof <span className="note">(.pdf format
                    only)</span></label>
                </div>
                <div className="col-12">
                  <div className="row mt-3">
                    <div className="col-4">
                      <label className="label mb-1">Experience letter, appointment letter, etc. <span
                        className="required">*</span> </label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input form-control" id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                        <label className="custom-file-label mb-0 form-control" >Choose
                          file</label>
                      </div>
                      <span className="note fw-400">File must be less than 1MB</span><button
                        className="btn-link ml-2">view</button>
                    </div>
                    <div className="col-3 d-flex align-items-center">
                      <button className="plus-btn ml-2"><img src="assets/images/employee/delete.svg"
                        width="16" height="18" alt="" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-1">
              <div className="form-row">
                <div className="col-md-6">
                  <button className="btn btn-yl btn-sm">BACK</button>
                </div>
                <div className="col-md-6 text-right">
                  <button className="btn btn-yl btn-sm">SAVE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Profile