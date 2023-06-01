import React, { useState } from "react";
import leftArrow from 'assets/images/left-chevron.svg';
import pencil from 'assets/images/pencil.svg';
import tcsImg from 'assets/images/tcs.jpg';
import PersonalInfo from "./Accordions/PersonalInfo";
import Education from "./Accordions/Education"
import WorkExp from "./Accordions/WorkExp";
import SkillsNPort from './Accordions/SkillsNPort';
import Documents from "./Accordions/Documents";

const ReviewApplication:React.FC = () => {

  const [personalOpen, setPersonalOpen] = useState<any>(false);
  const [educationOpen,setEducationOpen] = useState<any>(false);
  const [workExpOpen,setWorkExp] = useState<any>(false);
  const [skillsOpen,setSkillsOpen] = useState<any>(false);
  const [docOpen,setDocOpen] = useState<any>(false);

    return(
        <>
             <div className="dash-wrapper empl-panel">
    
    <main>
      <section className="main-wrapper">
        <div className="container-fluid">
          <div className="row position-relative">
        
            <div className="col-md-12 lt-sec-pd pt-4 pb-2" style={{paddingLeft: "0px",paddingRight: "0px"}}>
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
                          <h2 className="bc-heading bc-heading-sm" onClick={() =>{setPersonalOpen(!personalOpen)}}>1. Personal Information <button type="button" className="btn btn-pencil" title="Edit"><img width="12" src={pencil}/></button></h2>
                        </div>
                       <PersonalInfo open={personalOpen}/>

                        <div className="text-left mb-4">
                          <h2 className="bc-heading bc-heading-sm" onClick={() =>{setEducationOpen(!educationOpen)}}>2. Educational Background  <button type="button" className="btn btn-pencil" title="Edit"><img width="12" src={pencil}/></button></h2>
                        </div>
                        <Education open={educationOpen}/>

                        <div className="text-left mb-4">
                          <h2 className="bc-heading bc-heading-sm" onClick={() => {setWorkExp(!workExpOpen)}}>3. Work Experience <button type="button" className="btn btn-pencil" title="Edit"><img width="12" src={pencil}/></button></h2>
                        </div>
                      <WorkExp open={workExpOpen}/>

                        <div className="text-left mb-4">
                          <h2 className="bc-heading bc-heading-sm" onClick={() => {setSkillsOpen(!skillsOpen)}}>4. Skills and Portfolio <button type="button" className="btn btn-pencil" title="Edit"><img width="12" src={pencil}/></button></h2>
                        </div>
                      <SkillsNPort open={skillsOpen}/>

                        <div className="text-left mb-4">
                          <h2 className="bc-heading bc-heading-sm" onClick={() => {setDocOpen(!docOpen)}}>5. Documents <button type="button" className="btn btn-pencil" title="Edit"><img width="12" src={pencil}/></button></h2>
                        </div>
                       <Documents open={docOpen}/>

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

export default ReviewApplication;