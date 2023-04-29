import { useAppQuery } from 'app/hooks'
import React, { useState } from 'react'
import { hieqService } from 'utils'
import camera from 'assets/images/camara.svg'
import profile from 'assets/images/profile.svg'
import { Formik, Field, ErrorMessage, Form, FieldArray } from 'formik'
import star from 'assets/images/star-solid.svg'
import starBlank from 'assets/images/star-grey.svg'
import plus from 'assets/images/plus.svg'
import deleteImg from 'assets/images/employee/delete.svg'
import plusDark from 'assets/images/plus-fill.svg'

function Profile() {

  const [mode, setMode] = useState<string | null>('view')
  const query = useAppQuery().get('mode')
  const [isExperience, setIsExprience] = useState(false)
  const [index, setIndex] = useState(0)
  const [userProfile, setUserProfile]= useState({})


  React.useEffect(() => setMode(query ?? 'view'), [query]);


  React.useEffect(() => {
    getUserProfile()
  }, [])
  
  const getUserProfile =async () =>{
    const response:any = await hieqService.get('/employeeProfile')
    console.log(response)
    if(response.status === 'success'){
    setUserProfile(response?.data)
    }
  }

  console.log(userProfile)


  console.log(index)


  return (
    <>
      <Formik initialValues={{
        stepOne: {
          firstName: "",
          email: "",
          mobile: "",
          gender: "",
          dob: "",
          profile_summary: ""
        },
        stepTwo: [{
          standard: "",
          board: "",
          yearOfCompletion: "",
          school: "",
          percentage: "",
        }],
        stepThree: [{
          degree: "",
          specialization: "",
          yearOfCompletion: "",
          institute: "",
          percentage: "",
        }],
        totalWorkMonth: "",
        totalWorkYear: "",
        stepFour: [{

          organization: "",
          designation: "",
          employmentType: "",
          fromMonth: "",
          toMonth: "",
          fromYear: "",
          toYear: "",
          description: ""
        }],
        stepFive: {
          skills: [{
            skill: "",
            rating: ""
          },
          {
            skill: "",
            rating: ""
          },
          {
            skill: "",
            rating: ""
          },],
          links: [
            {
              social: "",
              link: ""
            },
            {
              social: "",
              link: ""
            },
            {
              social: "",
              link: ""
            },],
          additionalInformation: [{
            certification: "",
            insititute: "",
            domain: "",
            certificationDateMonthFrom: "",
            certificationDateYearFrom: "",
            certificationDateMonthTo: "",
            certificationDateYearTo: "",
          }],
          postionsOfResponsibility: "",
          projectPublications: "",
          extraCirricular: "",
          achievment: ""
        },
        stepSix: {

        }
      }

      }
        onSubmit={async (values) => {
          let data = {}
          if (index === 1) {
            data = values.stepOne;
            console.log(data)
            const response: any = await hieqService.post('/employeeProfile', data)
            if (response?.status === 'success') {
              alert('Data saved successfully')
            }
            return;
          }
          else if (index === 2) {
            data = {
              stepTwo: values.stepTwo,
              stepThree: values.stepThree
            };
          } else if (index === 3) {
            data = values.stepFour;
          }
          else if (index === 4) {
            data = values.stepFive
          }
          const response: any = await hieqService.put('/employeeProfile', data)
          if (response?.status === 'success') {
            alert('Data saved successfully')
          }
        }}>
        {({ values, handleChange, handleBlur, handleSubmit }) => <Form>
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
                        <Field type="text" className="form-control" placeholder="Enter full name"
                          disabled={mode === 'view'}
                          name="[stepOne.firstName]"
                          value={values.stepOne.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-12">
                        <div className="form-row">
                          <div className="form-group col-sm-6">
                            <label className="label mb-1">Email Address<span className="required">*</span></label>
                            <Field type="text" className="form-control" placeholder="Enter email address"
                              disabled={mode === 'view'}
                              name="[stepOne.email]"
                              value={values.stepOne.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group col-sm-6">
                            <label className="label mb-1">Contact Number<span className="required">*</span></label>
                            <input type="text" className="form-control" placeholder="Enter phone number" disabled={mode === 'view'}
                              name="[stepOne.mobile]"
                              value={values.stepOne.mobile}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group col-sm-6">
                            <label className="label mb-1">Gender<span className="required">*</span></label>
                            <select className="selectpicker form-control" disabled={mode === 'view'}
                              name="[stepOne.gender]"
                              value={values.stepOne.gender}
                              onChange={handleChange}
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
                                onChange={handleChange}
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
                      <div className="browseImg"><img src={camera} width="25" alt="" /></div>
                      <div className="featured"><img src={profile} width="150" height="150"
                        alt="" /></div>
                    </div>
                  </div>
                  <div className="form-group col-12">
                    <label className="label mb-1">Profile Summary</label>
                    <textarea rows={4} cols={2} className="form-control" disabled={mode === 'view'}
                      name="[stepOne.profile_summary]"
                      onChange={handleChange}
                    />
                    <div className="text-right"><span className="note">250 words limit</span></div>
                  </div>
                  <div className="col-12 mt-4">
                    <div className="form-row">
                      <div className="col-md-6">
                        <button className="btn btn-gr btn-sm">BACK</button>
                      </div>
                      <div className="col-md-6 text-right">
                        <button className="btn btn-gr btn-sm" type="submit" onClick={() => { setIndex(1); handleSubmit() }}>SAVE</button>
                        <button className="btn btn-gr btn-sm ml-3" onClick={() => { setIndex(1); handleSubmit() }}>NEXT</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-container mb-4">
              <div className="box-container-inner">
                <FieldArray name="stepTwo">
                  {({ insert, remove, push }) => (
                    <>
                      <div className="text-left mb-4">
                        <h2 className="bc-heading">2. Education</h2>
                      </div>
                      <div className="row">
                        {values.stepTwo.map((el, index) => <div className="col-12">
                          <div className="form-row">
                            <div className="form-group col-sm-4">
                              <label className="label mb-1">Class<span className="required">*</span></label>
                              <Field type="text" className="form-control" placeholder="High School (10th)" disabled={mode === 'view'}
                                name={`stepTwo.${index}.standard`}
                                value={el.standard}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group col-sm-4">
                              <label className="label mb-1">Board<span className="required">*</span></label>
                              <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                name={`stepTwo.${index}.board`}
                                value={el.board}
                              >
                                <option value="">CBSE</option>
                              </select>
                            </div>
                            <div className="form-group col-sm-4">
                              <label className="label mb-1">Year of Completion<span className="required">*</span></label>
                              <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                name={`stepTwo.${index}.yearOfCompletion`}
                                value={el.yearOfCompletion}
                              >
                                <option value="2002">2022</option>
                              </select>
                            </div>
                            <div className="form-group col-sm-8">
                              <label className="label mb-1">School<span className="required">*</span></label>
                              <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                name={`stepTwo.${index}.school`}
                                value={el.school}
                              >
                                <option value="">Kendriya Vidyalaya No.1</option>
                              </select>
                            </div>
                            <div className="form-group col-sm-4">
                              <label className="label mb-1">CGPA/Percentage<span className="required">*</span><span className="ml-1"
                                data-toggle="tooltip" data-placement="top" title="Tooltip on top"><img
                                  src="assets/images/employee/info.svg" width="16" height="16" alt="" /></span></label>
                              <Field type="text" className="form-control" placeholder="7.46" disabled={mode === 'view'}
                                name={`stepTwo.${index}.percentage`}
                                value={el.percentage}
                              />
                            </div>
                          </div>
                        </div>)}

                        <div className="col-12 mb-4">
                          <div className="row">
                            <div className="col-6">
                              <button className="plus-btn btn btn-gr" type="button" onClick={() => push({
                                standard: "",
                                board: "",
                                yearOfCompletion: "",
                                school: "",
                                percentage: "",
                              })}><img src={plus} width="20"

                                height="20" alt="" /><span className="ml-1">Add Senior Secondary details</span></button>
                            </div>
                            {values?.stepTwo.length > 1 && <div className="col-6 text-right pr-3">
                              <button className="plus-btn btn btn-gr" type="button"><img src={deleteImg} width="16"
                                height="18" alt="" /></button>
                            </div>}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </FieldArray>
                <FieldArray name="stepThree">
                  {({ insert, remove, push }) => (
                    <>
                      <div className="row pt-4">
                        <div className="col-md-12 pt-4 bt-1">&nbsp;</div>

                        {values.stepThree.map((el, index) => <div className="col-12">
                          <div className="form-row">
                            <div className="form-group col-sm-4">
                              <label className="label mb-1">Degree<span className="required">*</span></label>
                              <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                name={`stepThree.${index}.degree`}
                                value={el.degree}
                                onChange={handleChange}
                              >
                                <option value="ccc">MBA</option>
                                <option value="aaa">MBA</option>
                              </select>
                            </div>
                            <div className="form-group col-sm-4">
                              <label className="label mb-1">Specialization<span className="required">*</span></label>
                              <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                name={`stepThree.${index}.specialization`}
                                value={el.specialization}
                                onChange={handleChange}
                              >
                                <option value="">General Management</option>
                              </select>
                            </div>
                            <div className="form-group col-sm-4">
                              <label className="label mb-1">Year of Completion<span className="required">*</span></label>
                              <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                name={`stepThree.${index}.yearOfCompletion`}
                                value={el.yearOfCompletion}
                                onChange={handleChange}
                              >
                                <option value="">2022</option>
                              </select>
                            </div>
                            <div className="form-group col-sm-8">
                              <label className="label mb-1">Institute<span className="required">*</span></label>
                              <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                name={`stepThree.${index}.institute`}
                                value={el.institute}
                                onChange={handleChange}
                              >
                                <option value="">Indian Institute of Mangement, Kashipur</option>
                              </select>
                            </div>
                            <div className="form-group col-sm-4">
                              <label className="label mb-1">CGPA/Percentage<span className="required">*</span><span className="ml-1"
                                data-toggle="tooltip" data-placement="top" title="Tooltip on top"><img
                                  src="assets/images/employee/info.svg" width="16" height="16" alt="" /></span></label>
                              <input type="text" className="form-control" placeholder="7.46" disabled={mode === 'view'} name={`stepThree.${index}.percentage`}
                                value={el.percentage}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>)}

                        <div className="col-12 mb-4">
                          <div className="row">
                            <div className="col-6">
                              <button className="plus-btn btn btn-gr" onClick={() => push({
                                degree: "",
                                specialization: "",
                                yearOfCompletion: "",
                                institute: "",
                                percentage: ""
                              })}><img src={plus} width="20"
                                height="20" alt="" /><span className="ml-1">Add More</span></button>
                            </div>
                            {values?.stepThree.length > 1 && <div className="col-6 text-right pr-3">
                              <button className="plus-btn btn btn-gr" type="button" ><img src={deleteImg} width="16"
                                height="18" alt="" /></button>
                            </div>}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </FieldArray>
                <div className="row">
                  <div className="col-12 mt-4">
                    <div className="form-row">
                      <div className="col-md-6">
                        <button className="btn btn-gr btn-sm" type="button">BACK</button>
                      </div>
                      <div className="col-md-6 text-right">
                        <button className="btn btn-gr btn-sm" onClick={() => { setIndex(2); handleSubmit() }}>SAVE</button>
                        <button className="btn btn-gr btn-sm ml-3" onClick={() => { setIndex(2); handleSubmit() }}>NEXT</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FieldArray name="stepFour">
              {({ insert, remove, push }) => (
                <>
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
                              <input type="checkbox" className="custom-control-input" id="switchVariable" disabled={mode === 'view'}
                                checked={isExperience}
                                onChange={(e) => setIsExprience(!isExperience)}
                              />
                              <label className="custom-control-label">Experienced</label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-inline-flex align-items-center pr-0 col-2 pt-2">
                          <label className="label mb-0">Total Work Experience<span className="required">*</span></label>
                        </div>
                        <div className="form-group col-4 pt-2">
                          <div className="form-row">
                            <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'} name="totalWorkYear"
                              value={values.totalWorkYear}
                              onChange={handleChange}
                            >
                              <option value="">Year</option>
                            </select></div>
                            <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                              name="totalWorkMonth"
                              onChange={handleChange}
                              value={values.totalWorkMonth}
                            >
                              <option value="">Month</option>
                            </select></div>
                          </div>
                        </div>
                      </div>

                      <div className="row pt-2">
                        {values.stepFour.map((el, index) => <>
                          <div className="col-12">
                            <div className="form-row">
                              <div className="form-group col-4">
                                <label className="label mb-1">Organization<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                  name={`stepFour.${index}.organization`}
                                  onChange={handleChange}
                                  value={el.organization}
                                >
                                  <option value="">Tata Consultancy Services (TCS)</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <label className="label mb-1">Designation<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                  name={`stepFour.${index}.designation`}
                                  onChange={handleChange}
                                  value={el.designation}
                                >
                                  <option value="">Systems Engineer</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <label className="label mb-1">Employment Type<span className="required">*</span></label>
                                <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                  name={`stepFour.${index}.employmentType`}
                                  onChange={handleChange}
                                  value={el.employmentType}
                                >
                                  <option value="">Full-Time Job</option>
                                </select>
                              </div>
                              <div className="form-group col-4">
                                <label className="label mb-1">From<span className="required">*</span></label>
                                <div className="form-row">
                                  <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                    name={`stepFour.${index}.fromMonth`}
                                    onChange={handleChange}
                                    value={el.fromMonth}
                                  >
                                    <option value="">Month</option>
                                  </select></div>
                                  <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                    name={`stepFour.${index}.fromYear`}
                                    onChange={handleChange}
                                    value={el.fromYear}
                                  >
                                    <option value="">Year</option>
                                  </select></div>
                                </div>
                              </div>
                              <div className="form-group col-4">
                                <label className="label mb-1">To<span className="required">*</span></label>
                                <div className="form-row">
                                  <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                    name={`stepFour.${index}.toMonth`}
                                    onChange={handleChange}
                                    value={el.toMonth}
                                  >
                                    <option value="">Month</option>
                                  </select></div>
                                  <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                    name={`stepFour.${index}.toYear`}
                                    onChange={handleChange}
                                    value={el.toYear}
                                  >
                                    <option value="">Year</option>
                                  </select></div>
                                </div>
                              </div>
                              <div className="col-4 d-flex align-items-center">
                                <div className="custom-inline">
                                  <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="loctype1" name="loctype" disabled={mode === 'view'}
                                    />
                                    <label className="custom-control-label pl-1">I currently work here</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <label className="label mb-1">Description (Role, responsibilities, achievements etc.)</label>
                            <textarea rows={8} className="form-control" disabled={mode === 'view'}
                              name={`stepFour.${index}.description`}
                              onChange={handleChange}
                              value={el.description}
                            ></textarea>
                            <div className="text-right"><span className="note">250 words limit</span></div>
                          </div>
                        </>)}
                        <div className="col-12 mb-4">
                          <div className="row">
                            <div className="col-6">
                              <button className="plus-btn btn btn-gr" type="button" onClick={() => push({
                                organization: "",
                                designation: "",
                                employmentType: "",
                                fromMonth: "",
                                toMonth: "",
                                fromYear: "",
                                toYear: "",
                                description: ""
                              })}><img src={plus} width="20"
                                height="20" alt="" /><span className="ml-1">Add More</span></button>
                            </div>
                            {values?.stepFour.length > 1 && <div className="col-6 text-right pr-3">
                              <button className="plus-btn btn btn-gr" type="button"><img src={deleteImg} width="16"
                                height="18" alt="" /></button>
                            </div>}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 mt-4">
                          <div className="form-row">
                            <div className="col-md-6">
                              <button className="btn btn-gr btn-sm" type="button">BACK</button>
                            </div>
                            <div className="col-md-6 text-right">
                              <button className="btn btn-gr btn-sm" onClick={() => { setIndex(3); handleSubmit() }}>SAVE</button>
                              <button className="btn btn-gr btn-sm ml-3" onClick={() => { setIndex(3); handleSubmit() }}>NEXT</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>)}
            </FieldArray>

            <div className="box-container mb-4">
              <div className="box-container-inner">
                <div className="text-left mb-4">
                  <h2 className="bc-heading">4. Skills</h2>
                </div>
                <div className="row pt-2">
                  <FieldArray name="stepFive.skills">
                    {({ insert, remove, push }) => (
                      <>
                        {values.stepFive.skills.map((el, index) => <div className="col-12">
                          <div className="form-row align-items-center">
                            <div className="form-group col-3">
                              <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                name={`stepFive.${index}.skill`}
                                value={el.skill}
                                onChange={handleChange}
                              >
                                <option value="">HTML</option>
                              </select>
                            </div>
                            <div className="form-group col-4"
                            //  name={`stepThree.${index}.rating`}
                            //  value={el.rating}
                            //  onChange={handleChange}
                            >
                              <div className="star-rating d-flex align-items-center">
                                <img src={star} width="18" height="18" alt="" />
                                <img src={starBlank} width="18" height="18" alt="" />
                                <img src={starBlank} width="18" height="18" alt="" />
                                <img src={starBlank} width="18" height="18" alt="" />
                                <img src={starBlank} width="18" height="18" alt="" />
                                <button className="plus-btn btn ml-4" type="button" onClick={() => remove(index)}><img src={deleteImg}
                                  width="16" height="18" alt="" /></button>
                              </div>
                            </div>
                          </div>
                        </div>)}

                        <div className="col-12 mb-4">
                          <div className="row">
                            <div className="col-6">
                              <button className="plus-btn btn btn-gr" type="button" onClick={() => push({
                                skill: "",
                                rating: ""
                              })}><img src={plus} width="20"
                                height="20" alt="" /><span className="ml-1" >Add More</span></button>
                            </div>
                          </div>
                        </div>
                      </>)}
                  </FieldArray>
                </div>


                <>
                  <FieldArray name="stepFive.links">
                    {({ insert, remove, push }) => (
                      <>
                        <div className="row">
                          <div className="col-md-12 pt-3 bt-1">&nbsp;</div>
                          <div className="col-12">
                            <label className="label mb-2 heading-xs">Social Media Links and Work Portfolio</label>
                          </div>
                          {values.stepFive.links.map((el, index) => <div className="col-12">
                            <div className="form-row align-items-center">
                              <div className="form-group col-2">
                                <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                  name={`stepFive.${index}.social`}
                                  value={el.social}
                                  onChange={handleChange}
                                >
                                  <option value="">Facebook</option>
                                </select>
                              </div>
                              <div className="form-group d-flex align-items-center col-5">
                                <input type="text" className="form-control" placeholder="Enter or Paste link here" disabled={mode === 'view'}
                                  name={`stepFive.${index}.link`}
                                  value={el.link}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group col-1">
                                <button className="plus-btn btn ml-2" type="button" onClick={() => remove(index)}><img src={deleteImg}
                                  width="16" height="18" alt="" /></button>
                              </div>

                            </div>
                          </div>)}
                          <div className="col-12 mb-4">
                            <div className="row">
                              <div className="col-6">
                                <button className="plus-btn btn btn-gr" type="button" onClick={() => push({
                                  link: "",
                                  social: ""
                                })}><img src={plus} width="20"
                                  height="20" alt="" /><span className="ml-1">Add More</span></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>)}
                  </FieldArray>
                </>


                <div className="row">
                  <div className="col-md-12 pt-3 bt-1">&nbsp;</div>
                  <div className="col-12">
                    <label className="label mb-2 heading-xs">Additional Information</label>
                  </div>
                  <div className="col-12 mt-3">
                    <button className="plus-btn btn"><img src={plusDark} width="20"
                      height="20" alt="" /><span className="ml-1 cc-dark">Certifications/Licenses</span></button>
                  </div>
                  <div className="col-12 mb-4">
                    <>
                      <FieldArray name="stepFive.additionalInformation">
                        {({ insert, remove, push }) => (
                          <>
                            <div className="row pt-4">
                              {values.stepFive.additionalInformation.map((el, index) => <div className="col-12">
                                <div className="form-row">
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Certification<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                      name={`stepFive.${index}.certification`}
                                      value={el.certification}
                                      onChange={handleChange}
                                    >
                                      <option value="">Scrum Master</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Institute<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                      name={`stepFive.${index}.institute`}
                                      value={el.insititute}
                                      onChange={handleChange}
                                    >
                                      <option value="">Project Management Institute</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Domain<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                      name={`stepFive.${index}.Domain`}
                                      value={el.domain}
                                      onChange={handleChange}
                                    >
                                      <option value="">Project Management</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Certification Date<span className="required">*</span></label>
                                    <div className="form-row">
                                      <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                        name={`stepFive.${index}.certificationDateMonthFrom`}
                                        value={el.certificationDateMonthFrom}
                                        onChange={handleChange}
                                      >
                                        <option value="">Month</option>
                                      </select></div>
                                      <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                        name={`stepFive.${index}.certificationDateMonthFrom`}
                                        value={el.certificationDateMonthFrom}
                                        onChange={handleChange}
                                      >
                                        <option value="">Year</option>
                                      </select></div>
                                    </div>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Valid till<span className="required">*</span></label>
                                    <div className="form-row">
                                      <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                        name={`stepFive.${index}.certificationDateYearTo`}
                                        value={el.certificationDateYearTo}
                                        onChange={handleChange}
                                      >
                                        <option value="">Month</option>
                                      </select></div>
                                      <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                        name={`stepFive.${index}.certificationDateYearTo`}
                                        value={el.certificationDateYearTo}
                                        onChange={handleChange}
                                      >
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
                              </div>)}
                              <div className="col-12 mb-4">
                                <div className="row">
                                  <div className="col-6">
                                    <button className="plus-btn btn btn-gr" type="button" onClick={() => push({
                                      certification: "",
                                      insititute: "",
                                      domain: "",
                                      certificationDateMonthFrom: "",
                                      certificationDateYearFrom: "",
                                      certificationDateMonthTo: "",
                                      certificationDateYearTo: "",
                                    })}><img src={plus} width="20"
                                      height="20" alt="" /><span className="ml-1" >Add More</span></button>
                                  </div>
                                  <div className="col-6 text-right pr-3">
                                    <button className="plus-btn btn" type="button"><img src={deleteImg}
                                      width="16" height="18" alt="" /></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>)}
                      </FieldArray>
                    </>

                    <div className="row">
                      <div className="col-12 mt-3">
                        <button className="plus-btn btn"><img src={plusDark} width="20"
                          height="20" alt="" /><span className="ml-1 cc-dark">Positions of Responsibility</span></button>
                      </div>
                      <div className="col-12 mt-2">
                        <textarea rows={4} className="form-control" disabled={mode === 'view'}></textarea>
                        <div className="text-right"><span className="note">250 words limit</span></div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 mt-3">
                        <button className="plus-btn btn"><img src={plusDark} width="20"
                          height="20" alt="" /><span className="ml-1 cc-dark">Projects, Publications</span></button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 mt-3">
                        <button className="plus-btn btn"><img src={plusDark} width="20"
                          height="20" alt="" /><span className="ml-1 cc-dark">EXTRA-curriculars</span></button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 mt-3">
                        <button className="plus-btn btn"><img src={plusDark} width="20"
                          height="20" alt="" /><span className="ml-1 cc-dark">ACHIEVEMENTS</span></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-4">
                    <div className="form-row">
                      <div className="col-md-6">
                        <button className="btn btn-gr btn-sm" type="button">BACK</button>
                      </div>
                      <div className="col-md-6 text-right">
                        <button className="btn btn-gr btn-sm" type="submit" onClick={() => { setIndex(4); handleSubmit() }}>SAVE</button>
                        <button className="btn btn-gr btn-sm ml-3" type='submit' onClick={() => { setIndex(4); handleSubmit() }}>NEXT</button>
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
                      className="btn-link ml-2" type="button">view</button>
                  </div>
                  <div className="col-3 d-flex align-items-center">
                    <button className="plus-btn btn ml-2 " type="button"><img src={deleteImg}
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
                          className="btn-link ml-2" type="button">view</button>
                      </div>
                      <div className="col-3 d-flex align-items-center">
                        <button className="plus-btn btn ml-2" type="button"><img src={deleteImg}
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
                          className="btn-link ml-2" type="button">view</button>
                      </div>
                      <div className="col-3 d-flex align-items-center">
                        <button className="plus-btn btn ml-2" type="button"><img src={deleteImg}
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
                          className="btn-link ml-2" type="button">view</button>
                      </div>
                      <div className="col-3 d-flex align-items-center">
                        <button className="plus-btn btn ml-2" type="button"><img src={deleteImg}
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
                          className="btn-link ml-2" type="button">view</button>
                      </div>
                      <div className="col-3 d-flex align-items-center">
                        <button className="plus-btn btn ml-2" type="button"><img src={deleteImg}
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
                          className="btn-link ml-2" type="button">view</button>
                      </div>
                      <div className="col-3 d-flex align-items-center">
                        <button className="plus-btn btn ml-2" type="button"><img src={deleteImg}
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
                          className="btn-link ml-2" type="button">view</button>
                      </div>
                      <div className="col-3 d-flex align-items-center">
                        <button className="plus-btn btn ml-2" type="button"><img src={deleteImg}
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
                          className="btn-link ml-2" type="button">view</button>
                      </div>
                      <div className="col-3 d-flex align-items-center">
                        <button className="plus-btn btn ml-2" type="button" ><img src={deleteImg}
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
                    <button className="btn btn-gr btn-sm" type="submit">BACK</button>
                  </div>
                  <div className="col-md-6 text-right">
                    <button className="btn btn-gr btn-sm">SAVE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>}
      </Formik>
    </>
  )
}

export default Profile