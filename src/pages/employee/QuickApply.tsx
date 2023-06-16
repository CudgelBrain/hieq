import React from 'react';
import tcsImg from 'assets/images/tcs.jpg'
import leftArrow from 'assets/images/left-chevron.svg';
import { useHistory } from 'react-router-dom';

const QuickApply = () => {
  const history = useHistory(); 

  const backButton = () => {
    history.push("/employee/searchForJobsAndInternships")
  }

     return (
        <>
            <div className="dash-wrapper empl-panel">
    <main>
      <section className="main-wrapper">
        <div className="container-fluid">
          <div className="row position-relative">
            <div className="d-flex align-items-start lt-wrapper">
            </div>
            <div className="col-md-12 lt-sec-pd pt-4 pb-2" style={{paddingLeft:"0px",paddingRight:"0px"}}>
              <div className="box-container mb-4">
                <div className="box-container-inner">
                  <div className="mb-4 text-right">
                    <button type="button" className="btn btn-link cc-green" onClick={backButton}><img className="mr-1"
                        src={leftArrow} width="13" height="11"/>Back</button>
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
                            <a href='/employee/JobDescription' className="btn btn-link">Review job profile</a>
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