import React, {useState} from 'react';
import calender from 'assets/images/calendar.svg';
import profile from 'assets/images/profile.jpg';
import downArrow from 'assets/images/down-arrow.svg'

interface Props {
    name:string;
    email:string;
    phno:number;
    gender:any
    dob:any;
    summary:any;
}

const PersonalInfo :React.FC<Props> = ({name,email,phno,gender,dob,summary}) => {
    console.log(name);
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => setIsOpen(!isOpen);

    return(
        <>
              <div className="mb-4 hide">
              <button className="plus-btn" type="button" onClick={toggleAccordion}><img src={downArrow} width="20"
                    height="20" alt=""/></button>
                         {isOpen && <div className="col-md-8">
                        <div className="row">
                            <div className="row">
                              <div className="form-group col-12">
                                <label className="label mb-1">Full Name <span className="required">*</span></label>
                                <input type="text" className="form-control" value={name} disabled/>
                              </div>
                              <div className="col-12">
                                <div className="form-row">
                                  <div className="form-group col-sm-6">
                                    <label className="label mb-1">Email Address<span className="required">*</span></label>
                                    <input type="text" className="form-control" value={email} disabled/>
                                  </div>
                                  <div className="form-group col-sm-6">
                                    <label className="label mb-1">Contact Number<span className="required">*</span></label>
                                    <input type="text" className="form-control" value={phno} disabled/>
                                  </div>
                                  <div className="form-group col-sm-6">
                                    <label className="label mb-1">Gender<span className="required">*</span></label>
                                    <select className="selectpicker form-control"
                                        name="[gender]"
                                        value={gender}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="not">Prefer don't say</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-sm-6">
                                    <label className="label mb-1">Date of Birth<span className="required">*</span></label>
                                    <div className="input-group input-append disabled">
                                      <input type="text" className="form-control" value={dob} disabled/>
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
                            <textarea rows={4} className="form-control">{summary}</textarea>
                          </div>
                        </div>}
                      </div> 
        </>
    )
}


export default PersonalInfo;