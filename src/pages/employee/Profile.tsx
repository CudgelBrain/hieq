import { useAppQuery } from 'app/hooks'
import React, { useState, useRef, useEffect } from 'react'
import { hieqService } from 'utils'
import camera from 'assets/images/camara.svg'
import profile from 'assets/images/profile.svg'
import { Formik, Field, ErrorMessage, Form, FieldArray } from 'formik'
import star from 'assets/images/star-solid.svg'
import starBlank from 'assets/images/star-grey.svg'
import deleteImg from 'assets/images/employee/delete.svg'
import plusDark from 'assets/images/employee/plus.svg'
import 'assets/styles/employee/style.css'
import info from 'assets/images/employee/info.svg'
import profileImg from 'assets/images/profile.png'
import Accordion from 'components/Accordian/Accordian'
import * as Yup from 'yup'
import plusFilled from 'assets/images/employee/plus_fille.svg'
import StarRating from './RatingBar'

function Profile() {
  const [mode, setMode] = useState<string | null>('view')
  const query = useAppQuery().get('mode')
  const [isExperience, setIsExprience] = useState(false)
  const [index, setIndex] = useState(0)
  const [userProfile, setUserProfile] = useState<any | null>({})
  const [isPresent, steIsPresent] = useState(false);
  const [isValidLiftime, setIsValidLifeTime] = useState(false)
  const [profileImage, setProfileImage] = useState({ uri: "" })


  const personalRef = useRef(null)
  const educationRef = useRef(null)
  const workRef = useRef(null)
  const skillsRef = useRef(null)
  const documentsRef = useRef(null)


  React.useEffect(() => setMode(query ?? 'view'), [query]);
  console.log(profileImage)

  const [stepOneIntialValues, setStepOneInitialValues] = useState({
    firstName: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    profile_summary: ""
  })
  const [stepTwoIntialValues, setStepTwoInitialValues] = useState({
    // stepTwo: [{
    //   standard: "",
    //   board: "",
    //   yearOfCompletion: "",
    //   school: "",
    //   percentage: "",
    // }],
    stepThree: [{
      degree: "",
      specialization: "",
      yearOfCompletion: "",
      institute: "",
      percentage: "",
    }],
  })

  const [stepFourIntialValues, setStepFourInitialValues] = useState({

    totalWorkMonth: "" || userProfile?.totalWorkMonth,
    totalWorkYear: "" || userProfile?.totalWorkYear,
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
  })

  const [stepFiveIntialValues, setStepFiveIntialValues] = useState({
    stepFive:
    {
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
      achievment: "",

    },

  });

  console.log(stepOneIntialValues)



  React.useEffect(() => {
    getUserProfile()
  }, [])

  const getUserProfile = async () => {
    const response: any = await hieqService.get('/employeeProfile')
    if (response.status === 'success') {
      let data = response?.data;
      console.log(data, "data")
      if (data?.user) {
        setStepOneInitialValues({
          firstName: data?.user.name || "",
          email: data?.user?.email || "",
          mobile: data?.user?.phone || "",
          gender: data?.user?.gender || "",
          dob: data?.user?.dob || "",
          profile_summary: data?.user?.profile_summary || data?.stepOne.profile_summary || "",
        })
      } else {
        setStepOneInitialValues({
          firstName: data?.stepOne.firstName || "",
          email: data?.stepOne.email || "",
          mobile: data?.stepOne.mobile || "",
          gender: data?.stepOne.gender || "",
          dob: data?.stepOne.dob || "",
          profile_summary: data?.stepOne.profile_summary || "",
        })
      }

      setStepTwoInitialValues({
        // stepTwo: data && data?.stepTwo && data?.stepTwo?.length > 0 && data?.stepTwo?.map((item?: any) => ({
        //   standard: item.standard || "",
        //   board: item.board || "",
        //   yearOfCompletion: item.yearOfCompletion || "",
        //   school: item.school || "",
        //   percentage: item.percentage || "",
        // })) || [
        //     {
        //       standard: "",
        //       board: "",
        //       yearOfCompletion: "",
        //       school: "",
        //       percentage: "",
        //     },
        //   ],
        stepThree: data && data?.stepThree && data?.stepThree?.length > 0 && data?.stepThree?.map((item?: any) => ({
          degree: item.degree || "",
          specialization: item.specialization || "",
          yearOfCompletion: item.yearOfCompletion || "",
          institute: item.institute || "",
          percentage: item.percentage || "",
        })) || [
            {
              degree: "",
              specialization: "",
              yearOfCompletion: "",
              institute: "",
              percentage: "",
            },
          ],
      })
      setStepFourInitialValues({
        totalWorkMonth: "" || userProfile?.totalWorkMonth,
        totalWorkYear: "" || userProfile?.totalWorkYear,
        stepFour: data && data?.stepFour && data?.stepFour?.length > 0 && data?.stepFour?.map((item?: any) => ({
          organization: data.stepFour?.organization || "",
          designation: data.stepFour?.designation || "",
          employmentType: data.stepFour?.employmentType || "",
          fromMonth: data.stepFour?.fromMonth || "",
          toMonth: data.stepFour?.toMonth || "",
          fromYear: data.stepFour?.fromYear || "",
          toYear: data.stepFour?.toYear || "",
          description: data.stepFour?.description || "",
        })) || [{
          organization: "",
          designation: "",
          employmentType: "",
          fromMonth: "",
          toMonth: "",
          fromYear: "",
          toYear: "",
          description: ""
        }],
      })

      setStepFiveIntialValues({
        stepFive: {
          skills:
            data && data?.stepFive && data?.stepFive?.skills && data?.stepFive?.skills?.length > 0 && data?.stepFive?.skills?.map((item?: any) => ({
              skill: item.skill || "",
              rating: item.rating || "",
            })) || [
              {
                skill: "",
                rating: "",
              },
              {
                skill: "",
                rating: ""
              },
              {
                skill: "",
                rating: ""
              },
            ],
          links:
            data && data?.stepFive && data?.stepFive?.links && data?.stepFive?.links?.length > 0 &&
            data.stepFive?.links?.map((item?: any) => ({
              social: item.social || "",
              link: item.link || "",
            })) || [
              {
                social: "",
                link: "",
              },
              {
                social: "",
                link: "",
              },
              {
                social: "",
                link: "",
              },
            ],
          additionalInformation:
            data && data?.stepFive && data?.stepFive?.additionalInformation && data?.stepFive?.additionalInformation.length > 0 &&
            data.stepFive?.additionalInformation?.map((item?: any) => ({
              certification: item.certification || "",
              insititute: item.insititute || "",
              domain: item.domain || "",
              certificationDateMonthFrom:
                item.certificationDateMonthFrom || "",
              certificationDateYearFrom: item.certificationDateYearFrom || "",
              certificationDateMonthTo: item.certificationDateMonthTo || "",
              certificationDateYearTo: item.certificationDateYearTo || "",
            })) || [
              {
                certification: "",
                insititute: "",
                domain: "",
                certificationDateMonthFrom: "",
                certificationDateYearFrom: "",
                certificationDateMonthTo: "",
                certificationDateYearTo: "",
              },
            ],
          postionsOfResponsibility: data?.stepFive?.postionsOfResponsibility || "",
          projectPublications: data?.stepFive?.projectPublications || "",
          extraCirricular: data?.stepFive?.extraCirricular || "",
          achievment: data?.stepFive?.achievment || ""
        },
      });

      setUserProfile(response?.data)
    }
  }

  //scroll beviours
  const scrollToSection = (ref: any) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  console.log(userProfile)




  const stepOneSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    mobile: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    // dob: Yup.string().required("Required"),
  });

  const stepTwoSchema = Yup.object().shape({
    stepTwo: Yup.array().of(
      Yup.object({
        standard: Yup.string().required("Required"),
        board: Yup.string().required("Required"),
        yearOfCompletion: Yup.string().required("Required"),
        school: Yup.string().required("Required"),
        percentage: Yup.string().required("Required"),
      }))
  }
  );
  const stepThreeSchema = Yup.object().shape({
    stepThree: Yup.array().of(
      Yup.object({
        degree: Yup.string().required("Required"),
        specialization: Yup.string().required("Required"),
        yearOfCompletion: Yup.string().required("Required"),
        institute: Yup.string().required("Required"),
        percentage: Yup.string().required("Required"),
      })
    )
  });

  // const combinedSchema = Yup.object().shape({
  //   // ...stepTwoSchema.fields,
  //   ...stepThreeSchema.fields,
  // });


  const stepFourSchema = Yup.array().of(
    Yup.object({
      organization: Yup.string().required("Required"),
      designation: Yup.string().required("Required"),
      employmentType: Yup.string().required("Required"),
      fromMonth: Yup.string().required("Required"),
      toMonth: Yup.string().required("Required"),
      fromYear: Yup.string().required("Required"),
      toYear: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    })
  );

  const stepFiveSchema = Yup.object({
    skills: Yup.array()
      .of(
        Yup.object({
          skill: Yup.string().required("Required"),
          rating: Yup.string().required("Required"),
        })
      )
      .min(3, "Minimum of 3 skills are required"),
    links: Yup.array()
      .of(
        Yup.object({
          social: Yup.string().required("Required"),
          link: Yup.string().required("Required"),
        })
      )
      .min(3, "Minimum of 3 links are required"),
    additionalInformation: Yup.array().of(
      Yup.object({
        certification: Yup.string().required("Required"),
        insititute: Yup.string().required("Required"),
        domain: Yup.string().required("Required"),
        certificationDateMonthFrom: Yup.string().required("Required"),
        certificationDateYearFrom: Yup.string().required("Required"),
        certificationDateMonthTo: Yup.string().required("Required"),
        certificationDateYearTo: Yup.string().required("Required"),
      })
    ),
    postionsOfResponsibility: Yup.string().required("Required"),
    projectPublications: Yup.string().required("Required"),
    extraCirricular: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="col-md-12 pt-4 pb-5">
        <Formik
          enableReinitialize={true}
          initialValues={
            stepOneIntialValues
          }
          validationSchema={stepOneSchema}
          onSubmit={async (values) => {
            console.log(values)
            let data = values;
            const response: any = await hieqService.post('/employeeProfile', data)
            if (response?.status === 'success') {
              alert('Data saved successfully')
            }
            return;
          }

          }>
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) =>

            <Form>
              <div className="box-container mb-4" ref={personalRef}>
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
                            name="[firstName]"
                            value={values.firstName}
                            onChange={handleChange}
                          />
                          {touched?.firstName && errors?.firstName ? (
                            <div className="errors">{errors?.firstName}</div>
                          ) : null}
                        </div>
                        <div className="col-12">
                          <div className="form-row">
                            <div className="form-group col-sm-6">
                              <label className="label mb-1">Email Address<span className="required">*</span></label>
                              <Field type="text" className="form-control" placeholder="Enter email address"
                                disabled={mode === 'view'}
                                name="[email]"
                                value={values.email}
                                onChange={handleChange}
                              />
                              {touched?.email && errors?.email ? (
                                <div className="errors">{errors?.email}</div>
                              ) : null}
                            </div>
                            <div className="form-group col-sm-6">
                              <label className="label mb-1">Contact Number<span className="required">*</span></label>
                              <input type="text" className="form-control" placeholder="Enter phone number" disabled={mode === 'view'}
                                name="[mobile]"
                                value={values.mobile}
                                onChange={handleChange}
                              />
                              {touched?.mobile && errors?.mobile ? (
                                <div className="errors">{errors?.mobile}</div>
                              ) : null}
                            </div>
                            <div className="form-group col-sm-6">
                              <label className="label mb-1">Gender<span className="required">*</span></label>
                              <select className="selectpicker form-control" disabled={mode === 'view'}
                                name="[gender]"
                                value={values.gender}
                                onChange={handleChange}
                              >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="not">Prefer dont say</option>
                              </select>
                              {touched?.gender && errors?.gender ? (
                                <div className="errors">{errors?.gender}</div>
                              ) : null}
                            </div>
                            <div className="form-group col-sm-6">
                              <label className="label mb-1">Date of Birth<span className="required">*</span></label>
                              <div className="input-group">
                                <input type="date" className="form-control" placeholder="dd-mm-yyy" value={values.dob} disabled={mode === 'view'}
                                  name="dob"
                                  onChange={handleChange}
                                />
                                <div className="input-group-append"> <span className="input-group-text"><img
                                  src="assets/images/calendar.svg" height="20" alt="" /></span> </div>
                              </div>
                              {touched?.dob && errors?.dob ? (
                                <div className="errors">{errors?.dob}</div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="col-4 text-center">
                      <div className="change-img">
                        <div className="browseImg" id="#file">
                          <label htmlFor="file-input">
                            <img src={camera} width="25" alt="" />
                          </label>
                        </div>
                        <input type='file' id='file-input' multiple={false} hidden onChange={(e: any) => setProfileImage(e.target.files[0])} />
                        <div className="featured">
                          <img src={profileImage && profileImage?.uri ? profileImage?.uri : profileImg} width={280} height={235}
                            alt="" /></div>
                      </div>
                    </div>
                    <div className="form-group col-12">
                      <label className="label mb-1">Profile Summary</label>
                      <textarea rows={4} cols={2} className="form-control" disabled={mode === 'view'}
                        name="[profile_summary]"
                        value={values.profile_summary}
                        onChange={handleChange}
                      />
                      {touched?.profile_summary && errors?.profile_summary ? (
                        <div className="errors">{errors?.profile_summary}</div>
                      ) : null}
                      <div className="text-right"><span className="note">250 words limit</span></div>
                    </div>
                    <div className="col-12 mt-4">
                      <div className="form-row">
                        <div className="col-md-6">
                          <button className="btn btn-yl btn-sm" type='button' onClick={() => scrollToSection(personalRef)}>BACK</button>
                        </div>
                        <div className="col-md-6 text-right">
                          <button className="btn btn-yl btn-sm" type="submit" onClick={() => handleSubmit()}>SAVE</button>
                          <button className="btn btn-yl btn-sm ml-3" type="button" onClick={() => scrollToSection(educationRef)}>NEXT</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>}
        </Formik>
        {/* <ToastContainer/> */}
        <Formik
          enableReinitialize={true}
          initialValues={
            stepTwoIntialValues
          }
          validationSchema={stepThreeSchema}
          onSubmit={async (values) => {
            console.log(values)
            let data = {
              stepThree: values.stepThree
            };

            const response: any = await hieqService.put('/employeeProfile', data)
            if (response?.status === 'success') {
              alert('Data saved successfully')
            }
          }}>
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) =>

            <Form>
              <div className="box-container mb-4" ref={educationRef}>
                <div className="box-container-inner">
                        <div className="text-left mb-4">
                          <h2 className="bc-heading">2. Education</h2>
                        </div>
                  {/* <FieldArray name="stepTwo">
                    {({ insert, remove, push }) => (
                      <> */}
                        {/* <div className="row">
                          {values?.stepTwo?.map((el?: any, index?: any, row?: any) =>
                            values.stepTwo &&
                            <>
                              <div className="col-12">
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
                                      <option value="asdfdasf">CBSE</option>
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
                                      <option value="afasdfdsa">Kendriya Vidyalaya No.1</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-sm-4">
                                    <label className="label mb-1">CGPA/Percentage<span className="required">*</span><span className="ml-1"
                                      data-toggle="tooltip" data-placement="top" title="Tooltip on top"><img
                                        src={info} width="16" height="16" alt="" /></span></label>
                                    <Field type="text" className="form-control" placeholder="7.46" disabled={mode === 'view'}
                                      name={`stepTwo.${index}.percentage`}
                                      value={el.percentage}
                                    />
                                  </div>
                                </div>

                              </div>
                              <div className="col-12 mb-4">
                                <div className="row">
                                  <div className="col-6">
                                    {index === row.length - 1 && <button className="plus-btn" type="button" onClick={() => push({
                                      standard: "",
                                      board: "",
                                      yearOfCompletion: "",
                                      school: "",
                                      percentage: "",
                                    })}><img src={plusDark} width="20"

                                      height="20" alt="" /><span className="ml-1">Add Senior Secondary details</span></button>}
                                  </div>
                                  {values?.stepTwo.length > 1 && <div className="col-6 text-right pr-3">
                                    <button className="plus-btn" type="button"
                                      onClick={() => remove(index)}
                                    ><img src={deleteImg} width="16"
                                      height="18" alt="" /></button>
                                  </div>}
                                </div>
                              </div>
                            </>
                          )}


                        </div> */}
                      {/* </>
                    )}
                  </FieldArray> */}
                  <FieldArray name="stepThree">
                    {({ insert, remove, push }) => (
                      <>
                        <div className="row pt-4">
                          {/* <div className="col-md-12 pt-4 bt-1">&nbsp;</div> */}

                          {values?.stepThree?.map((el?: any, index?: any, row?: any) =>
                            <>
                              <div className="col-12">
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
                                        src={info} width="16" height="16" alt="" /></span></label>
                                    <input type="text" className="form-control" placeholder="7.46" disabled={mode === 'view'} name={`stepThree.${index}.percentage`}
                                      value={el.percentage}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 mb-4">
                                <div className="row">
                                  <div className="col-6">
                                    {index === row.length - 1 && <button className="plus-btn ml-0" onClick={() => push({
                                      degree: "",
                                      specialization: "",
                                      yearOfCompletion: "",
                                      institute: "",
                                      percentage: ""
                                    })}><img src={plusDark} width="20"
                                      height="20" alt="" /><span className="ml-1">Add More</span></button>}
                                  </div>
                                  {values?.stepThree.length > 1 && <div className="col-6 text-right pr-3">
                                    <button className="plus-btn" type="button" onClick={() => remove(index)} ><img src={deleteImg} width="16"
                                      height="18" alt="" /></button>
                                  </div>}
                                </div>
                              </div>
                            </>
                          )}


                        </div>
                      </>
                    )}
                  </FieldArray>
                  <div className="row">
                    <div className="col-12 mt-4">
                      <div className="form-row">
                        <div className="col-md-6">
                          <button className="btn btn-yl btn-sm" type="button" onClick={() => scrollToSection(personalRef)}>BACK</button>
                        </div>
                        <div className="col-md-6 text-right">
                          <button className="btn btn-yl btn-sm" onClick={() => { setIndex(2); handleSubmit() }}>SAVE</button>
                          <button className="btn btn-yl btn-sm ml-3" type="button" onClick={() => scrollToSection(workRef)}>NEXT</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>}
        </Formik>
        <Formik
          enableReinitialize={true}
          initialValues={
            stepFourIntialValues
          }
          validationSchema={stepFourSchema}
          onSubmit={async (values) => {
            console.log(values)
            let data = {}
            data = {
              stepFour: values.stepFour
            }

            const response: any = await hieqService.put('/employeeProfile', data)
            if (response?.status === 'success') {
              alert('Data saved successfully')
            }
          }}>
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) =>

            <Form>
              <FieldArray name="stepFour">
                {({ insert, remove, push }) => (
                  <>
                    <div className="box-container mb-4">
                      <div className="box-container-inner" ref={workRef}>
                        <div className="text-left mb-4">
                          <h2 className="bc-heading">3. Work Experience</h2>
                        </div>

                        <div className="row">
                          <div className="form-group col-12">
                            <div className="d-flex align-items-center txt-md">
                              <span className="mr-2">Fresher</span>
                              <div className="custom-control custom-switch custom-switch-lg" onClick={() => setIsExprience(!isExperience)}>
                                <input type="checkbox" className="custom-control-input" id="switchVariable" disabled={mode === 'view'}
                                  checked={isExperience}
                                />
                                <label className="custom-control-label">Experienced</label>
                              </div>
                            </div>
                          </div>
                          {isExperience && <>
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
                          </>
                          }
                        </div>

                        <div className="row pt-2">
                          {values?.stepFour?.map((el: any, index: any, row: any) => <>
                            <div className="col-12">
                              <div className="form-row">
                                <div className="form-group col-4">
                                  <label className="label mb-1">Organization<span className="required">*</span></label>
                                  <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                    name={`stepFour.${index}.organization`}
                                    onChange={handleChange}
                                    value={el.organization}
                                  >
                                    <option value="tcs">Tata Consultancy Services (TCS)</option>
                                  </select>
                                </div>
                                <div className="form-group col-4">
                                  <label className="label mb-1">Designation<span className="required">*</span></label>
                                  <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                    name={`stepFour.${index}.designation`}
                                    onChange={handleChange}
                                    value={el.designation}
                                  >
                                    <option value="sys">Systems Engineer</option>
                                  </select>
                                </div>
                                <div className="form-group col-4">
                                  <label className="label mb-1">Employment Type<span className="required">*</span></label>
                                  <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                    name={`stepFour.${index}.employmentType`}
                                    onChange={handleChange}
                                    value={el.employmentType}
                                  >
                                    <option value="fulltime">Full-Time Job</option>
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
                                      <option value="aug">Month</option>
                                    </select></div>
                                    <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                      name={`stepFour.${index}.fromYear`}
                                      onChange={handleChange}
                                      value={el.fromYear}
                                    >
                                      <option value="2022">Year</option>
                                    </select></div>
                                  </div>
                                </div>
                                {!isPresent && <div className="form-group col-4">
                                  <label className="label mb-1">To<span className="required">*</span></label>
                                  <div className="form-row">
                                    <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                      name={`stepFour.${index}.toMonth`}
                                      onChange={handleChange}
                                      value={el.toMonth}
                                    >
                                      <option value="aug">Month</option>
                                    </select></div>
                                    <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                      name={`stepFour.${index}.toYear`}
                                      onChange={handleChange}
                                      value={el.toYear}
                                    >
                                      <option value="2022">Year</option>
                                    </select></div>
                                  </div>
                                </div>}
                                <div className="col-4 d-flex align-items-center">
                                  <div className="custom-inline">
                                    <div className="custom-control custom-checkbox" onClick={() => steIsPresent(!isPresent)}>
                                      <input type="checkbox" className="custom-control-input" id="loctype1" name="loctype" disabled={mode === 'view'}
                                        checked={isPresent}

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
                            <div className="col-12 mb-4">
                              <div className="row">
                                <div className="col-6">
                                  {index === row.length - 1 && <button className="plus-btn" type="button" onClick={() => push({
                                    organization: "",
                                    designation: "",
                                    employmentType: "",
                                    fromMonth: "",
                                    toMonth: "",
                                    fromYear: "",
                                    toYear: "",
                                    description: ""
                                  })}><img src={plusDark} width="20"
                                    height="20" alt="" /><span className="ml-1">Add More</span></button>}
                                </div>
                                {values?.stepFour.length > 1 && <div className="col-6 text-right pr-3">
                                  <button className="plus-btn" type="button" onClick={() => remove(index)}><img src={deleteImg} width="16"
                                    height="18" alt="" /></button>
                                </div>}
                              </div>
                            </div>
                          </>)}

                        </div>

                        <div className="row">
                          <div className="col-12 mt-4">
                            <div className="form-row">
                              <div className="col-md-6">
                                <button className="btn btn-yl btn-sm" type="button" onClick={() => scrollToSection(educationRef)}>BACK</button>
                              </div>
                              <div className="col-md-6 text-right">
                                <button className="btn btn-yl btn-sm" onClick={() => { setIndex(3); handleSubmit() }}>SAVE</button>
                                <button className="btn btn-yl btn-sm ml-3" type='button' onClick={() => scrollToSection(skillsRef)}>NEXT</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>)}
              </FieldArray>
            </Form>}
        </Formik>

        <Formik
          enableReinitialize={true}
          initialValues={
            stepFiveIntialValues
          }
          validationSchema={stepFiveSchema}
          onSubmit={async (values) => {
            console.log(values)
            let data = {}

            data = {
              stepFive: values.stepFive
            }
            const response: any = await hieqService.put('/employeeProfile', data)
            if (response?.status === 'success') {
              alert('Data saved successfully')
            }
          }}>
          {({ values, handleChange, setFieldValue, handleBlur, handleSubmit, errors, touched }) =>

            <Form>
              <div className="box-container mb-4" ref={skillsRef}>
                <div className="box-container-inner">
                  <div className="text-left mb-4">
                    <h2 className="bc-heading">4. Skills Portfolio</h2>
                  </div>
                  <div className="row pt-2">
                    <FieldArray name="stepFive.skills">
                      {({ insert, remove, push }) => (
                        <>
                          {values?.stepFive?.skills?.map((el: any, index: any, row: any) =>
                            <>
                              <div className="col-12" key={index}>

                                <div className="form-row align-items-center">
                                  <div className="form-group col-3">
                                    <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                      name={`stepFive.skills.${index}.skill`}
                                      value={el.skill}
                                      onChange={handleChange}
                                    >
                                      <option value="Hmtl">HTML</option>
                                      <option value="Hmtl">HTML</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <StarRating name={`stepFive.skills.${index}.rating`} itemIndex={index} setFieldValue={setFieldValue} key={index} remove={remove} />

                                  </div>
                                </div>
                              </div>

                              {index < 5 && index === row.length - 1 && <div className="col-12 mb-4">
                                <div className="row">
                                  <div className="col-6">
                                    <button className="plus-btn" type="button" onClick={() => push({
                                      skill: "",
                                      rating: ""
                                    })}><img src={plusDark} width="20"
                                      height="20" alt="" /><span className="ml-1" >Add More</span></button>
                                  </div>
                                </div>
                              </div>}
                            </>)}
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
                            {values?.stepFive?.links?.map((el: any, index: any, row: any) => <>
                              <div className="col-12">
                                <div className="form-row align-items-center">
                                  <div className="form-group col-2">
                                    <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                      name={`stepFive.links.${index}.social`}
                                      value={el.social}
                                      onChange={handleChange}
                                    >
                                      <option value="">Facebook</option>
                                    </select>
                                  </div>
                                  <div className="form-group d-flex align-items-center col-5">
                                    <input type="text" className="form-control" placeholder="Enter or Paste link here" disabled={mode === 'view'}
                                      name={`stepFive.links.${index}.link`}
                                      value={el.link}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="form-group col-1">
                                    <button className="plus-btn ml-2" type="button" onClick={() => remove(index)}
                                      disabled={index < 3}
                                    ><img src={deleteImg}
                                      width="16" height="18" alt="" /></button>
                                  </div>

                                </div>
                              </div>
                              {index < 9 && index === row.length - 1 && <div className="col-12 mb-4">
                                <div className="row">
                                  <div className="col-6">
                                    <button className="plus-btn" type="button" onClick={() => push({
                                      link: "",
                                      social: ""
                                    })}><img src={plusDark} width="20"
                                      height="20" alt="" /><span className="ml-1">Add More</span></button>
                                  </div>
                                </div>
                              </div>}
                            </>)}
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
                      <button className="plus-btn"><img src={plusDark} width="20"
                        height="20" alt="" /><span className="ml-1 cc-dark">Certifications/Licenses</span></button>
                    </div>
                    <div className="col-12 mb-4">
                      <>
                        <FieldArray name="stepFive.additionalInformation">
                          {({ insert, remove, push }) => (
                            <>
                              <div className="row pt-4">
                                {values?.stepFive?.additionalInformation?.map((el: any, index: any, row: any) =>
                                  <>
                                    <div className="col-12">
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
                                        {!isValidLiftime && <div className="form-group col-4">
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
                                        </div>}
                                        <div className="col-4 d-flex align-items-center">
                                          <div className="custom-inline">
                                            <div className="custom-control custom-checkbox" onClick={() => setIsValidLifeTime(!isValidLiftime)}>
                                              <input type="checkbox" className="custom-control-input" id="loctype1" name="loctype" disabled={mode === 'view'} checked={isValidLiftime} />

                                              <label className="custom-control-label pl-1">Valid for Lifetime</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-12 mb-4">
                                      <div className="row">
                                        <div className="col-6">
                                          {index === row.length - 1 && <button className="plus-btn" type="button" onClick={() => push({
                                            certification: "",
                                            insititute: "",
                                            domain: "",
                                            certificationDateMonthFrom: "",
                                            certificationDateYearFrom: "",
                                            certificationDateMonthTo: "",
                                            certificationDateYearTo: "",
                                          })}><img src={plusDark} width="20"
                                            height="20" alt="" /><span className="ml-1" >Add More</span></button>}
                                        </div>
                                        <div className="col-6 text-right pr-3">
                                          <button className="plus-btn" type="button" onClick={() => remove(index)}><img src={deleteImg}
                                            width="16" height="18" alt="" /></button>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}

                              </div>
                            </>)}
                        </FieldArray>
                      </>

                      <Accordion icon={plusFilled} mode={mode} title="Positions of Responsibility"
                        name="[stepFive.postionsOfResponsibility]"
                        value={values.stepFive.postionsOfResponsibility}
                        handleChange={handleChange}
                      />
                      <Accordion icon={plusFilled} mode={mode} title="Projects, Publications"
                        name="[stepFive.projectPublications]"
                        value={values.stepFive.projectPublications}
                        handleChange={handleChange}
                      />
                      <Accordion icon={plusFilled} mode={mode} title="EXTRA-curriculars"
                        name="[stepFive.extraCirricular]"
                        value={values.stepFive.extraCirricular}
                        handleChange={handleChange} />
                      <Accordion icon={plusFilled} mode={mode}
                        name="[stepFive.achievment]"
                        value={values.stepFive.achievment}
                        handleChange={handleChange}
                        title="Acheivements" />


                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mt-4">
                      <div className="form-row">
                        <div className="col-md-6">
                          <button className="btn btn-yl btn-sm" type="button" onClick={() => scrollToSection(workRef)}>BACK</button>
                        </div>
                        <div className="col-md-6 text-right">
                          <button className="btn btn-yl btn-sm" type="submit" onClick={() => { setIndex(4); handleSubmit() }}>SAVE</button>
                          <button className="btn btn-yl btn-sm ml-3" type='button' onClick={() => scrollToSection(documentsRef)}>NEXT</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>}
        </Formik>

        <Formik
          enableReinitialize={true}
          initialValues={
            {}
          }
          onSubmit={async (values) => {
            // console.log(values)
            // let data = {}
            // if (index === 1 && !userProfile?.stepOne) {
            //   data = values.stepOne;
            //   console.log(data)
            //   const response: any = await hieqService.post('/employeeProfile', data)
            //   if (response?.status === 'success') {
            //     alert('Data saved successfully')
            //   }
            //   return;
            // }
            // else if (index === 1 && userProfile?.firstName && userProfile?.email) {
            //   data = { stepOne: values.stepOne };
            //   console.log(data)
            //   const response: any = await hieqService.put('/employeeProfile', data)
            //   if (response?.status === 'success') {
            //     alert('Data saved successfully')
            //   }
            //   return;
            // }
            // else if (index === 2) {
            //   data = {
            //     stepTwo: values.stepTwo,
            //     stepThree: values.stepThree
            //   };
            // } else if (index === 3) {
            //   data = {
            //     stepFour: values.stepFour
            //   }
            // }
            // else if (index === 4) {
            //   data = {
            //     stepFive: values.stepFive
            //   }
            // }
            // const response: any = await hieqService.put('/employeeProfile', data)
            // if (response?.status === 'success') {
            //   alert('Data saved successfully')
            // }
          }}>
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) =>

            <Form>
              <div className="box-container mb-4" ref={documentsRef}>
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
                      <button className="plus-btn ml-2 " type="button"><img src={deleteImg}
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
                          <button className="plus-btn ml-2" type="button"><img src={deleteImg}
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
                          <button className="plus-btn ml-2" type="button"><img src={deleteImg}
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
                          <button className="plus-btn ml-2" type="button"><img src={deleteImg}
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
                          <button className="plus-btn ml-2" type="button"><img src={deleteImg}
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
                          <button className="plus-btn ml-2" type="button"><img src={deleteImg}
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
                          <button className="plus-btn ml-2" type="button"><img src={deleteImg}
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
                          <button className="plus-btn ml-2" type="button" ><img src={deleteImg}
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
                      <button className="btn btn-yl btn-sm" type="button" onClick={() => scrollToSection(skillsRef)}>BACK</button>
                    </div>
                    <div className="col-md-6 text-right">
                      <button className="btn btn-yl btn-sm">SAVE</button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>}
        </Formik>
      </div>


    </>
  )
}

export default Profile