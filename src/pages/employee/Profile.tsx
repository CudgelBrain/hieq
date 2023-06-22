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
import getYear from 'date-fns/getYear'
import { OptionType, createOption } from 'features/employer/common'
import calender from 'assets/images/calendar.svg'
import DatePicker from 'react-datepicker'
import { ToastContainer, toast } from 'react-toastify'




function Profile() {
  const [mode, setMode] = useState<string | null>('view')
  const query = useAppQuery().get('mode')
  const [isExperience, setIsExprience] = useState(false)
  const [index, setIndex] = useState(0)
  const [userProfile, setUserProfile] = useState<any | null>({})
  const [isPresent, steIsPresent] = useState(false);
  const [isValidLiftime, setIsValidLifeTime] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [degree, setDegree] = useState([])
  const [skills, setSkills] = useState([])
  const [college, setCollege] = useState([])
  const [company, setCompany] = useState([])
  const [certification, setcertification] = useState([])
  const [isInternship, setIsInternship] = useState(false)
  const [userData, setData] = useState<any | null>({})

  const expyears: readonly OptionType[] = [
    { value: '', label: 'Select Years' },
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
    { value: '25+', label: '25+' },
  ];

  const months: readonly OptionType[] = [
    { value: '', label: 'Select Months' },
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
  ];

  const monthsName: readonly OptionType[] = [
    { value: '', label: 'Select Month' },
    { value: 'jan', label: 'January' },
    { value: 'feb', label: 'Febraury' },
    { value: 'mar', label: 'March' },
    { value: 'apr', label: 'April' },
    { value: 'may', label: 'May' },
    { value: 'jun', label: 'June' },
    { value: 'jul', label: 'July' },
    { value: 'aug', label: 'August' },
    { value: 'sep', label: 'September' },
    { value: 'oct', label: 'October' },
    { value: 'nov', label: 'November' },
    { value: 'dec', label: 'December' },

  ];

  const getDegree = async () => {
    const response: any = await hieqService.get('/specialization/list')
    if (response?.status === 'success') {
      setDegree(response?.data?.items)
    }
  }

  const getSkills = async () => {
    const response: any = await hieqService.get('/skill/list')
    if (response?.status === 'success') {
      setSkills(response?.data?.items)
    }
  }

  const getCollege = async () => {
    const response: any = await hieqService.get('/college/list')
    if (response?.status === 'success') {
      setCollege(response?.data?.items)
    }
  }

  const getCompany = async () => {
    const response: any = await hieqService.get('/company/list')
    if (response?.status === 'success') {
      setCompany(response?.data?.items)
    }
  }

  const getCertification = async () => {
    const response: any = await hieqService.get('/certification/list')
    if (response?.status === 'success') {
      setcertification(response?.data?.items)
    }
  }

  const years: OptionType[] = [];
  for (let year = getYear(new Date()); year > 1950; year--) {
    years.push(createOption(year.toString()));
  }

  const links: readonly OptionType[] = [
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Twitter', label: 'Twitter' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'Github', label: 'Github' },
  ];

  const personalRef = useRef(null)
  const educationRef = useRef(null)
  const workRef = useRef(null)
  const skillsRef = useRef(null)
  const documentsRef = useRef(null)

  React.useEffect(() => setMode(query ?? 'view'), [query]);

  const [stepOneIntialValues, setStepOneInitialValues] = useState({
    firstName: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    profile_summary: ""
  })
  const [stepTwoIntialValues, setStepTwoInitialValues] = useState({
    stepThree: [{
      degree: "",
      specialization: "",
      yearOfCompletion: "",
      institute: "",
      percentage: "",
    }],
  })

  const [stepFourIntialValues, setStepFourInitialValues] = useState({

    totalWorkMonth: "",
    totalWorkYear: "",
    experienced: isExperience,
    internshiped: isInternship,
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
    internship: [{
      organization: "",
      designation: "",
      employmentType: "",
      fromMonth: "",
      toMonth: "",
      fromYear: "",
      toYear: "",
      description: ""
    }]
  })

  console.log(stepFourIntialValues)

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


  const [resume, setResume] = useState<any | null>({})
  const [visumeLink, setVisuemeLink] = useState<any | null>({})
  const [idProof, setIdProof] = useState<any | null>({})
  const [pgCertificate, setPgCertificate] = useState<any | null>({})
  const [ugCertificate, setUgCertificate] = useState<any | null>({})
  const [twelfthMarksheet, setTwelftheMarksheet] = useState<any | null>({})
  const [tenthMarksheet, setTenthMarkSheet] = useState<any | null>({})
  const [otherDegree, setOtherDegree] = useState<any | null>({})
  const [experienceLetter, setExperienceLetter] = useState<any | null>({})
  const [loading, setIsLoading] = useState(false)



  console.log(userData?.stepFour);



  React.useEffect(() => {
    getDegree();
    getSkills(); getCollege();
    getCompany();
    getCertification();
  }, [])


  React.useEffect(() => {
    getUserProfile()
  }, [])
  const getUserProfile = async () => {
    setIsLoading(true)
    const response: any = await hieqService.get('/employeeProfile')
    if (response.status === 'success') {
      let data = response?.data;
      setData(data);

      if (data?.user) {
        setStepOneInitialValues({
          firstName: data?.user.name || "",
          email: data?.user?.email || "",
          mobile: data?.user?.phone || "",
          gender: data?.user?.gender || "",
          dob: data?.user?.dob || data?.stepOne.dob || "",
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


      if (data && data?.stepFour && data?.stepFour?.experienced) {
        setIsExprience(true)
      } else {
        setIsExprience(false)
      }

      if (data && data?.stepFour && data?.stepFour?.internshiped) {
        setIsInternship(true)
      } else {
        setIsInternship(false)
      }

      setStepFourInitialValues({
        totalWorkMonth: "" || data?.stepFour?.totalWorkMonth,
        totalWorkYear: "" || data?.stepFour?.totalWorkYear,
        experienced: isExperience || data?.stepFour?.experienced,
        internshiped: data?.stepFour?.isIntershiped || isInternship,
        internship: data && data?.stepFour && data?.stepFour?.insternship && data?.stepFour?.internship.length > 0 && data?.stepFour?.intership?.map((item?: any) => ({
          organization: item?.organization || "",
          designation: item?.designation || "",
          employmentType: item?.employmentType || "",
          fromMonth: item?.fromMonth || "",
          toMonth: item?.toMonth,
          fromYear: item?.fromYear || "",
          toYear: item?.toYear || "",
          description: item?.description || "",
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
        stepFour: data && data?.stepFour && data?.stepFour?.stepFour && data?.stepFour?.stepFour.length > 0 && data?.stepFour?.stepFour?.map((item?: any) => ({
          organization: item?.organization || "",
          designation: item?.designation ||"",
          employmentType: item?.employmentType ||"",
          fromMonth: item?.fromMonth || "",
          toMonth: item?.toMonth || "",
          fromYear: item?.fromYear || "",
          toYear: item?.toYear || "",
          description: item?.description || "",
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
    setIsLoading(false)
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



  const stepOneSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    mobile: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    dob: Yup.string().required("Required"),
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


  //Issue fixed


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


  function isFileSizeValid(file: any) {
    const maxSize = 1024 * 1024; // 1MB
    return file.size <= maxSize;
  }


  const [fileError, setFileError] = useState<null | any>({
    resumeError: false,
    idProofError: false,
    ugCertificateError: false,
    pgCertificateError: false,
    twelfthMarksheetError: false,
    tenthMarksheetError: false,
    otherDegreeError: false,
    experienceLetterError: false
  });



  const submitDocuments = async () => {

    const formData = new FormData();
    if (resume && resume.size > 0) {
      if (!isFileSizeValid(resume)) {
        setFileError((pre: any) => ({
          ...pre, resumeError: true
        }))
        return;
      }
      formData.append('resume', resume);
    }
    if (idProof && idProof.size > 0) {
      if (!isFileSizeValid(idProof)) {
        setFileError((pre: any) => ({
          ...pre, idProofError: true
        }))
        return;
      }
      formData.append('proof', idProof);
    }
    if (ugCertificate && ugCertificate.size > 0) {
      if (!isFileSizeValid(ugCertificate)) {
        setFileError((pre: any) => ({
          ...pre, ugCertificateError: true
        }))
        return;
      }
      formData.append('ug_certificate', ugCertificate);
    }
    if (pgCertificate && pgCertificate.size > 0) {
      if (!isFileSizeValid(pgCertificate)) {
        setFileError((pre: any) => ({
          ...pre, pgCertificateError: true
        }))
        return;
      }
      formData.append('pg_certificate', pgCertificate);
    }
    if (twelfthMarksheet && twelfthMarksheet.size > 0) {
      if (!isFileSizeValid(twelfthMarksheet)) {
        setFileError((pre: any) => ({
          ...pre, twelfthMarksheetError: true
        }))
        return;
      }
      formData.append('xii_certificate', twelfthMarksheet);
    }
    if (tenthMarksheet && tenthMarksheet.size > 0) {
      if (!isFileSizeValid(tenthMarksheet)) {
        setFileError((pre: any) => ({
          ...pre, tenthMarksheetError: true
        }))
        return;
      }
      formData.append('x_certificate', tenthMarksheet);
    }
    if (otherDegree && otherDegree.size > 0) {
      if (!isFileSizeValid(otherDegree)) {
        setFileError((pre: any) => ({
          ...pre, otherDegreeError: true
        }))
        return;
      }
      formData.append('other_certificate', otherDegree);
    }
    if (experienceLetter && experienceLetter.size > 0) {
      if (!isFileSizeValid(experienceLetter)) {
        setFileError((pre: any) => ({
          ...pre, experienceLetterError: true
        }))
        return;
      }

      formData.append('employeement_certificate', experienceLetter);
    }


    const response: any = await hieqService.put('/employeeProfile', formData);
    if (response?.status === 'success') {
      toast.success('Data saved successfully',
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

        });
    }


  }

  const hanldeProfileUpload = async (img: any) => {
    // if (!img) {
    //   toast.success('Image not selected', {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   return;
    // }

    const formData = new FormData();
    formData.append('profilePic', img);
    const response: any = await hieqService.put('/employeeProfile', formData);

    if (response.status === 'success') {
      setProfileImage(null)
      toast.success('Profile picture uploading successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

console.log(stepFourIntialValues);
if(loading){
  return <div className='d-flex justify-content-center'>
    Loading
  </div>
}

  return (
    <>
      <ToastContainer />
      <div className="col-md-12 pt-4 pb-5">
        <Formik
          enableReinitialize={true}
          initialValues={
            stepOneIntialValues
          }
          validationSchema={stepOneSchema}
          onSubmit={async (values) => {
            const formData = new FormData()
            formData.append("stepOne", JSON.stringify(values))
            const response: any = await hieqService.post('/employeeProfile', formData)
            if (response?.status === 'success') {
              toast.success('Data saved successfully',
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",

                });
            }
            return;
          }

          }>
          {({ values, handleChange, handleBlur, setFieldValue, handleSubmit, errors, touched }) =>

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
                            name="[firstName]"
                            disabled={mode === 'view' || mode === 'edit'}
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
                                disabled={mode === 'view' || mode === 'edit'}
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
                              <input type="text" className="form-control" placeholder="Enter phone number"
                                name="[mobile]"
                                disabled={mode === 'view' || mode === 'edit'}
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
                                onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="not">Prefer don't say</option>
                              </select>
                              {touched?.gender && errors?.gender ? (
                                <div className="errors">{errors?.gender}</div>
                              ) : null}
                            </div>
                            <div className="form-group col-sm-6">
                              <label className="label mb-1">Date of Birth<span className="required">*</span></label>
                              <div className="input-group">
                                <input type="date" className="form-control" placeholder="dd-mm-yyy"
                                  value={values.dob}
                                  disabled={mode === 'view'}
                                  name="dob"

                                  onChange={handleChange}
                                />

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
                        <input type='file' id='file-input' multiple={false} hidden accept='image/jpeg' onChange={(e: any) => {
                          setProfileImage(e.target.files[0]); hanldeProfileUpload(profileImage)
                        }}
                        />
                        <div className="featured">
                          <img src={userData && userData.profilePic ? `http://beta.hieq.in/${userData?.profilePic[0]?.filepath}` : "https://idronline.org/wp-content/themes/wphidr/images/person-dummy.jpg"} width={280} height={235}
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

            const formData = new FormData();
            formData.append('stepThree', JSON.stringify(values.stepThree))

            const response: any = await hieqService.put('/employeeProfile', formData)
            if (response?.status === 'success') {
              toast.success('Data saved successfully',
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",

                });
            }
          }}>
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) =>

            <Form>
              <div className="box-container mb-4" ref={educationRef}>
                <div className="box-container-inner">
                  <div className="text-left mb-4">
                    <h2 className="bc-heading">2. Education</h2>
                  </div>

                  <FieldArray name="stepThree">
                    {({ insert, remove, push }) => (
                      <>
                        <div className="row">

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
                                      {degree.length > 0 && degree.map((el: any) => <option key={el.ID} value={el.degree}>{el.degree.toUpperCase()}</option>
                                      )}
                                    </select>
                                    <ErrorMessage name={`stepThree.${index}.degree`} />

                                  </div>
                                  <div className="form-group col-sm-4">
                                    <label className="label mb-1">Specialization<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                      name={`stepThree.${index}.specialization`}
                                      value={el.specialization}
                                      onChange={handleChange}
                                    >
                                      {degree.length > 0 && degree.map((el: any) => <option key={el.ID} value={el.name}>{el.name.toUpperCase()}</option>
                                      )}
                                    </select>
                                    <ErrorMessage name={`stepThree.${index}.specialization`} />
                                  </div>
                                  <div className="form-group col-sm-4">
                                    <label className="label mb-1">Year of Completion<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                      name={`stepThree.${index}.yearOfCompletion`}
                                      value={el.yearOfCompletion}
                                      onChange={handleChange}
                                    >
                                      {years.length > 0 && years.map((el: any) => <option value={el.value}>{el.label}</option>)}
                                    </select>
                                    <ErrorMessage name={`stepThree.${index}.yearOfCompletion`} />
                                  </div>
                                  <div className="form-group col-sm-8">
                                    <label className="label mb-1">Institute<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                      name={`stepThree.${index}.institute`}
                                      value={el.institute}
                                      onChange={handleChange}
                                    >
                                      {college.length > 0 && college.map((el: any) => <option key={el.ID} value={el.name}>{el.name}</option>)}
                                    </select>
                                    <ErrorMessage name={`stepThree.${index}.institute`} />
                                  </div>
                                  <div className="form-group col-sm-4">
                                    <label className="label mb-1">CGPA/Percentage<span className="required">*</span><span className="ml-1"
                                      data-toggle="tooltip" data-placement="top" title="Tooltip on top"><img
                                        src={info} width="16" height="16" alt="" /></span></label>
                                    <input type="number" className="form-control" placeholder="7.46" disabled={mode === 'view'} name={`stepThree.${index}.percentage`}
                                      pattern='[0-9]'
                                      value={el.percentage}
                                      onChange={handleChange}
                                    />
                                    <ErrorMessage name={`stepThree.${index}.percentage`} />
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
          onSubmit={async (values) => {
            console.log(values, 'data hai cb');
            values.experienced = isExperience;
            values.internshiped = isInternship;

            const formData = new FormData();
            formData.append('stepFour', JSON.stringify(values))

            const response: any = await hieqService.put('/employeeProfile', formData)
            if (response?.status === 'success') {
              toast.success('Data saved successfully',
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",

                });
            }
          }}>
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) =>

            <Form>




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
                    {isExperience ? <>
                      <div className="form-group d-inline-flex align-items-center pr-0 col-2 pt-2">
                        <label className="label mb-0">Total Work Experience<span className="required">*</span></label>
                      </div>
                      <div className="form-group col-4 pt-2">
                        <div className="form-row">
                          <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'} name="totalWorkYear"
                            value={values.totalWorkYear}
                            onChange={handleChange}
                          >
                            {expyears.length > 0 && expyears.map((el: any) => <option value={el.value}>{el.label}</option>)}
                          </select>
                          </div>
                          <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                            name="totalWorkMonth"
                            onChange={handleChange}
                            value={values.totalWorkMonth}
                          >
                            {months.length > 0 && months.map((el: any) => <option value={el.value}>{el.label}</option>)}
                          </select></div>
                        </div>
                      </div>
                    </> : <div className="col-4 d-flex align-items-center mb-2">
                      <div className="custom-inline">
                        <div className="custom-control custom-checkbox" onClick={() => setIsInternship(!isInternship)}>
                          <input type="checkbox" className="custom-control-input" id="loctype1" name="loctype" disabled={mode === 'view'}
                            checked={isInternship}
                          />

                          <label className="custom-control-label pl-1">Have any internship experience ?</label>
                        </div>
                      </div>
                    </div>
                    }
                  </div>


                  <FieldArray name="stepFour">
                    {({ insert, remove, push }) => (
                      <>

                        {(isExperience) && <div className="row pt-2">
                          {values?.stepFour?.map((el: any, index: any, row: any) =>
                            <>
                              <div className="col-12">
                                <div className="form-row">
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Organization<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                      name={`stepFour.[${index}].organization`}
                                      onChange={handleChange}
                                      value={el.organization}
                                    >
                                      {company.length > 0 && company.map((el: any) => <option value={el.name}>{el?.name}</option>)}
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Designation<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                      name={`stepFour.[${index}].designation`}
                                      onChange={handleChange}
                                      value={el.designation}
                                    >
                                      <option value="sys">Systems Engineer</option>
                                      <option value="sys">Systems Engineera 2</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Employment Type<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                      name={`stepFour.[${index}].employmentType`}
                                      onChange={handleChange}
                                      value={el.employmentType}
                                    >
                                      <option value="full-time">Full-Time Job</option>
                                      <option value="part-time">Part-Time Job</option>
                                      <option value="hybrid">Hybrid Job</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">From<span className="required">*</span></label>
                                    <div className="form-row">
                                      <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                        name={`stepFour.[${index}].fromMonth`}
                                        onChange={handleChange}
                                        value={el.fromMonth}
                                      >
                                        {monthsName.length > 0 && monthsName.map((el: any) => <option key={el.label} value={el.value}>{el.label}</option>)}
                                      </select></div>
                                      <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                        name={`stepFour.[${index}].fromYear`}
                                        onChange={handleChange}
                                        value={el.fromYear}
                                      >
                                        {years.length > 0 && years.map((el: any) => <option value={el.value}>{el.label}</option>)}
                                      </select></div>
                                    </div>
                                  </div>
                                  {!isPresent && <div className="form-group col-4">
                                    <label className="label mb-1">To<span className="required">*</span></label>
                                    <div className="form-row">
                                      <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                        name={`stepFour.[${index}].toMonth`}
                                        onChange={handleChange}
                                        value={el.toMonth}
                                      >
                                        {monthsName.length > 0 && monthsName.map((el: any) => <option value={el.value}>{el.label}</option>)}
                                      </select></div>
                                      <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                        name={`stepFour.[${index}].toYear`}
                                        onChange={handleChange}
                                        value={el.toYear}
                                      >
                                        {years.length > 0 && years.map((el: any) => <option value={el.value}>{el.label}</option>)}
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
                                  name={`stepFour.[${index}].description`}
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
                        </div>}
                      </>)}
                  </FieldArray>
                  <FieldArray name="internship">
                    {({ insert, remove, push }) => (
                      <>
                        {(isInternship) && <div className="row pt-2">
                          {values?.internship?.map((el: any, index: any, row: any) =>
                            <>
                              <div className="col-12">
                                <div className="form-row">
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Organization<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                      name={`internship.[${index}].organization`}
                                      onChange={handleChange}
                                      value={el.organization}
                                    >
                                      {company.length > 0 && company.map((el: any) => <option value={el.name}>{el?.name}</option>)}
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Designation<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                      name={`internship.[${index}].designation`}
                                      onChange={handleChange}
                                      value={el.designation}
                                    >
                                      <option value="sys">Systems Engineer</option>
                                      <option value="sys">Systems Engineera 2</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">Employment Type<span className="required">*</span></label>
                                    <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                      name={`internship.[${index}].employmentType`}
                                      onChange={handleChange}
                                      value={el.employmentType}
                                    >
                                      <option value="full-time">Full-Time Job</option>
                                      <option value="part-time">Part-Time Job</option>
                                      <option value="hybrid">Hybrid Job</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <label className="label mb-1">From<span className="required">*</span></label>
                                    <div className="form-row">
                                      <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                        name={`internship.[${index}].fromMonth`}
                                        onChange={handleChange}
                                        value={el.fromMonth}
                                      >
                                        {monthsName.length > 0 && monthsName.map((el: any) => <option key={el.label} value={el.value}>{el.label}</option>)}
                                      </select></div>
                                      <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                        name={`internship.[${index}].fromYear`}
                                        onChange={handleChange}
                                        value={el.fromYear}
                                      >
                                        {years.length > 0 && years.map((el: any) => <option value={el.value}>{el.label}</option>)}
                                      </select></div>
                                    </div>
                                  </div>
                                  {!isPresent && <div className="form-group col-4">
                                    <label className="label mb-1">To<span className="required">*</span></label>
                                    <div className="form-row">
                                      <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                        name={`internship.[${index}].toMonth`}
                                        onChange={handleChange}
                                        value={el.toMonth}
                                      >
                                        {monthsName.length > 0 && monthsName.map((el: any) => <option value={el.value}>{el.label}</option>)}
                                      </select></div>
                                      <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                        name={`internship.[${index}].toYear`}
                                        onChange={handleChange}
                                        value={el.toYear}
                                      >
                                        {years.length > 0 && years.map((el: any) => <option value={el.value}>{el.label}</option>)}
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
                                  name={`internship.[${index}].description`}
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
                                  {values?.internship.length > 1 && <div className="col-6 text-right pr-3">
                                    <button className="plus-btn" type="button" onClick={() => remove(index)}><img src={deleteImg} width="16"
                                      height="18" alt="" /></button>
                                  </div>}
                                </div>
                              </div>
                            </>)}

                        </div>}
                      </>)}
                  </FieldArray>

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

            </Form>}
        </Formik>

        <Formik
          enableReinitialize={true}
          initialValues={
            stepFiveIntialValues
          }
          // validationSchema={stepFiveSchema}
          onSubmit={async (values) => {


            const formData = new FormData()
            formData.append("stepFive", JSON.stringify(values.stepFive))
            const response: any = await hieqService.put('/employeeProfile', formData)
            if (response?.status === 'success') {
              toast.success('Data saved successfully',
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",

                });
            }
          }}>
          {({ values, handleChange, setFieldValue, handleBlur, handleSubmit, errors, touched }) =>

            <Form>
              <div className="box-container mb-4" ref={skillsRef}>
                <div className="box-container-inner">
                  <div className="text-left mb-4">
                    <h2 className="bc-heading">4. Skills</h2>
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
                                      {skills.length > 0 && skills.map((el: any) => <option key={el.ID} value={el.name}>{el.name.toUpperCase()}</option>)}
                                    </select>
                                  </div>
                                  <div className="form-group col-4">
                                    <StarRating name={`stepFive.skills.${index}.rating`} itemIndex={index} setFieldValue={setFieldValue} key={index} remove={remove}
                                      defaultRating={el.rating}
                                    />

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
                                      {links.length > 0 && links.map((el: any) => <option value={el.value}>{el.label}</option>)}
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
                                {values?.stepFive?.additionalInformation?.map((item: any, index: any, row: any) =>
                                  <>
                                    <div className="col-12">
                                      <div className="form-row">
                                        <div className="form-group col-4">
                                          <label className="label mb-1">Certification<span className="required">*</span></label>
                                          <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                            name={`stepFive.additionalInformation.${index}.certification`}
                                            value={item.certification}
                                            onChange={handleChange}
                                          >
                                            {certification.length > 0 && certification.map((el: any) => <option value={el.name}>{el.name}</option>)}
                                          </select>
                                        </div>
                                        <div className="form-group col-4">
                                          <label className="label mb-1">Institute<span className="required">*</span></label>
                                          <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                            name={`stepFive.additionalInformation.${index}.institute`}
                                            value={item.insititute}
                                            onChange={handleChange}
                                          >
                                            {college.length > 0 && college.map((el: any) => <option value={el.name}>{el.name}</option>)}
                                          </select>
                                        </div>
                                        <div className="form-group col-4">
                                          <label className="label mb-1">Domain<span className="required">*</span></label>
                                          <select className="selectpicker form-control" data-live-search="true" disabled={mode === 'view'}
                                            name={`stepFive.additionalInformation.${index}.Domain`}
                                            value={item.domain}
                                            onChange={handleChange}
                                          >
                                            <option value="">Project Management</option>
                                          </select>
                                        </div>
                                        <div className="form-group col-4">
                                          <label className="label mb-1">Certification Date<span className="required">*</span></label>
                                          <div className="form-row">
                                            <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                              name={`stepFive.additionalInformation.${index}.certificationDateMonthFrom`}
                                              value={item.certificationDateMonthFrom}
                                              onChange={handleChange}
                                            >
                                              {monthsName.length > 0 && monthsName.map((el: any) => <option value={el.value}>{el.label}</option>)}
                                            </select>
                                            </div>
                                            <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                              name={`stepFive.additionalInformation.${index}.certificationDateYearFrom`}
                                              value={item.certificationDateYearFrom}
                                              onChange={handleChange}
                                            >
                                              {years.length > 0 && years.map((el: any) => <option value={el.value}>{el.label}</option>)}
                                            </select>
                                            </div>
                                          </div>
                                        </div>
                                        {!isValidLiftime && <div className="form-group col-4">
                                          <label className="label mb-1">Valid till<span className="required">*</span></label>
                                          <div className="form-row">
                                            <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                              name={`stepFive.additionalInformation.${index}.certificationDateMonthTo`}
                                              value={item.certificationDateMonthTo}
                                              onChange={handleChange}
                                            >
                                              {monthsName.length > 0 && monthsName.map((el: any) => <option key={el.value} value={el.value}>{el.label}</option>)}
                                            </select>
                                            </div>
                                            <div className="col-6"><select className="selectpicker form-control" disabled={mode === 'view'}
                                              name={`stepFive.additionalInformation.${index}.certificationDateYearTo`}
                                              value={item.certificationDateYearTo}
                                              onChange={handleChange}
                                            >
                                              {years.length > 0 && years.map((el: any) => <option value={el.value}>{el.label}</option>)}
                                            </select>
                                            </div>
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
                                          <button className="plus-btn" type="button" onClick={() => remove(index)}
                                            disabled={index === 0}
                                          ><img src={deleteImg}
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

        {/* Doucment Form Component */}
        <form onSubmit={(event) => {
          event.preventDefault();
          submitDocuments();
        }}>
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
                  <label className="label mb-1" htmlFor="inputGroupFile01">Upload File<span className="required">*</span> <span className="note">(.pdf
                    format only)</span></label>
                  <div className="custom-file">
                    <input type="file" accept='application/pdf'
                      name="resume"
                      onChange={(e: any) => setResume(e.target.files[0])}
                      className="custom-file-input form-control" id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'}
                    />
                    {/* <input type="text" value={resume ? resume.name : ''} readOnly /> */}
                    <label className="custom-file-label mb-0 form-control"> {
                      resume && resume?.name || userProfile?.resume && userProfile?.resume.length > 0 ? userProfile?.resume[0]?.filename : "Choose File"
                    }</label>
                  </div>
                  <span className="note fw-400">File must be less than 1MB</span>
                  {userProfile && userProfile.resume && userProfile?.resume.length > 0 && <a
                    className="btn-link ml-2" target="blank" type="button"
                    href={`http://beta.hieq.in/${userProfile.resume[0].filepath}`}
                  >view</a>}
                  {fileError.resumeError && <div className=" note errors">Files must be less than 1MB</div>}
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
                  <input type="text" className="form-control"
                    onChange={(e: any) => setVisuemeLink(e.target.value)}
                    placeholder="Enter or Paste Google Drive / YouTube Link" disabled={mode === 'view'} />
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
                      <label className="label mb-1">Upload File <span className="note">(.pdf
                        format only)</span></label>
                      <div className="custom-file">
                        <input type="file" accept='application/pdf'
                          onChange={(e: any) => setIdProof(e.target.files[0])}
                          className="custom-file-input form-control" id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                        <label className="custom-file-label mb-0 form-control">
                          {
                            idProof && idProof?.name || userProfile?.proof && userProfile?.proof.length > 0 ? userProfile?.proof[0]?.filename : "Choose File"
                          }
                        </label>
                      </div>
                      <span className="note fw-400">File must be less than 1MB</span>
                      {userProfile && userProfile.proof && userProfile?.proof.length > 0 && <a
                        className="btn-link ml-2" target="blank" type="button"
                        href={`http://beta.hieq.in/${userProfile.proof[0].filepath}`}
                      >view</a>}
                      {fileError.idProofError && <div className=" note errors">Files must be less than 1MB</div>}

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
                      <label className="label mb-1">PG Certificate </label>
                      <div className="custom-file">
                        <input type="file" accept='application/pdf'

                          onChange={(e: any) => setPgCertificate(e.target.files[0])}

                          className="custom-file-input form-control" id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                        <label className="custom-file-label mb-0 form-control"> {
                          pgCertificate && pgCertificate?.name || userProfile?.pg_certificate && userProfile?.pg_certificate.length > 0 ? userProfile?.pg_certificate[0]?.filename : "Choose File"
                        }</label>
                      </div>
                      <span className="note fw-400">File must be less than 1MB</span>{userProfile && userProfile.pg_certificate && userProfile?.pg_certificate.length > 0 && <a
                        className="btn-link ml-2" target="blank" type="button"
                        href={`http://beta.hieq.in/${userProfile.pg_certificate[0].filepath}`}
                      >view</a>}
                      {fileError.pgCertificateError && <div className=" note errors">Files must be less than 1MB</div>}
                    </div>
                    <div className="col-3 d-flex align-items-center">
                      <button className="plus-btn ml-2" type="button"><img src={deleteImg}
                        width="16" height="18" alt="" /></button>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-4">
                      <label className="label mb-1">UG Certificate </label>
                      <div className="custom-file">
                        <input type="file" accept='application/pdf'
                          onChange={(e: any) => setUgCertificate(e.target.files[0])}
                          className="custom-file-input form-control" id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                        <label className="custom-file-label mb-0 form-control">
                          {
                            ugCertificate && ugCertificate?.name || userProfile?.ug_certificate && userProfile?.ug_certificate.length > 0 ? userProfile?.ug_certificate[0]?.filename : "Choose File"
                          }
                        </label>
                      </div>
                      <span className="note fw-400">File must be less than 1MB</span>
                      {userProfile && userProfile.ug_certificate && userProfile?.ug_certificate.length > 0 && <a
                        className="btn-link ml-2" target="blank" type="button"
                        href={`http://beta.hieq.in/${userProfile.ug_certificate[0].filepath}`}
                      >view</a>}
                      {fileError.ugCertificateError && <div className=" note errors">Files must be less than 1MB</div>}

                    </div>
                    <div className="col-3 d-flex align-items-center">
                      <button className="plus-btn ml-2" type="button"><img src={deleteImg}
                        width="16" height="18" alt="" /></button>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-4">
                      <label className="label mb-1">XII Marksheet </label>
                      <div className="custom-file">
                        <input type="file" accept='application/pdf'
                          onChange={(e: any) => setTwelftheMarksheet(e.target.files[0])}
                          className="custom-file-input form-control" id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                        <label className="custom-file-label mb-0 form-control" >
                          {
                            twelfthMarksheet && twelfthMarksheet?.name || userProfile?.xii_certificate && userProfile?.xii_certificate.length > 0 ? userProfile?.xii_certificate[0]?.filename : "Choose File"
                          }
                        </label>
                      </div>
                      <span className="note fw-400">File must be less than 1MB</span>
                      {userProfile && userProfile.xii_certificate && userProfile?.xii_certificate.length > 0 && <a
                        className="btn-link ml-2" target="blank" type="button"
                        href={`http://beta.hieq.in/${userProfile.xii_certificate[0].filepath}`}
                      >view</a>}

                      {fileError.twelfthMarksheetError && <div className=" note errors">Files must be less than 1MB</div>}

                    </div>
                    <div className="col-3 d-flex align-items-center">
                      <button className="plus-btn ml-2" type="button"><img src={deleteImg}
                        width="16" height="18" alt="" /></button>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-4">
                      <label className="label mb-1">X Marksheet </label>
                      <div className="custom-file">
                        <input type="file" accept='application/pdf'
                          onChange={(e: any) => setTenthMarkSheet(e.target.files[0])}
                          className="custom-file-input form-control" id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                        <label className="custom-file-label mb-0 form-control" >
                          {
                            tenthMarksheet && tenthMarksheet?.name || userProfile?.x_certificate && userProfile?.x_certificate.length > 0 ? userProfile?.x_certificate[0]?.filename : "Choose File"
                          }
                        </label>
                      </div>
                      <span className="note fw-400">File must be less than 1MB</span>
                      {userProfile && userProfile.x_certificate && userProfile?.x_certificate.length > 0 && <a
                        className="btn-link ml-2" target="blank" type="button"
                        href={`http://beta.hieq.in/${userProfile.x_certificate[0].filepath}`}
                      >view</a>}
                      {fileError.tenthMarksheetError && <div className=" note errors">Files must be less than 1MB</div>}

                    </div>
                    <div className="col-3 d-flex align-items-center">
                      <button className="plus-btn ml-2" type="button"><img src={deleteImg}
                        width="16" height="18" alt="" /></button>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-4">
                      <label className="label mb-1">Other Degree </label>
                      <div className="custom-file">
                        <input type="file" accept='application/pdf'
                          onChange={(e: any) => setOtherDegree(e.target.files[0])}
                          className="custom-file-input form-control" id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                        <label className="custom-file-label mb-0 form-control" >
                          {
                            otherDegree && otherDegree?.name || userProfile?.other_certificate && userProfile?.other_certificate.length > 0 ? userProfile?.other_certificate[0]?.filename : "Choose File"
                          }
                        </label>
                      </div>
                      <span className="note fw-400">File must be less than 1MB</span>
                      {userProfile && userProfile.other_certificate && userProfile?.other_certificate.length > 0 && <a
                        className="btn-link ml-2" target="blank" type="button"
                        href={`http://beta.hieq.in/${userProfile.other_certificate[0].filepath}`}
                      >view</a>}
                      {fileError.otherDegreeError && <div className=" note errors">Files must be less than 1MB</div>}

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
                        <input type="file" accept='application/pdf'
                          onChange={(e: any) => setExperienceLetter(e.target.files[0])}
                          className="custom-file-input form-control" id="inputGroupFile01"

                          aria-describedby="inputGroupFileAddon01" disabled={mode === 'view'} />
                        <label className="custom-file-label mb-0 form-control" > {
                          experienceLetter && experienceLetter?.name || userProfile?.employeement_certificate && userProfile?.employeement_certificate.length > 0 ? userProfile?.employeement_certificate[0]?.filename : "Choose File"
                        }
                        </label>
                      </div>
                      <span className="note fw-400">File must be less than 1MB</span>
                      {userProfile && userProfile.employeement_certificate && userProfile?.employeement_certificate.length > 0 && <a
                        className="btn-link ml-2" target="blank" type="button"
                        href={`http://beta.hieq.in/${userProfile.employeement_certificate[0].filepath}`}
                      >view</a>}
                      {fileError.experienceLetterError && <div className=" note errors">Files must be less than 1MB</div>}

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
        </form>
      </div>
    </>
  )
}

export default Profile