import React from 'react';
import cloud from 'assets/images/upload-cloud.svg'
import view from 'assets/images/view.svg'
import trash from 'assets/images/trash.svg'
import downCloud from 'assets/images/download-cloud.svg'
import resume from 'assets/images/my-resumes.svg'
import tick from 'assets/images/green-tick.svg'

const MyResumes = () => { 
    return(
    <>
        <div className="dash-wrapper empl-panel">
    <main>
      <section className="main-wrapper">
        <div className="container-fluid">
          <div className="row position-relative">
          <div className="col-md-12 pt-4 pb-2" style={{paddingLeft:"0px",paddingRight:"0px"}}>
              <div className="text-left d-flex mb-4">
                <div className="pg-title flex-grow-1">My resumes</div>
              </div>
              <div className="box-container mb-4 p-4">
                <div className="list list-horizontal bg-grey font16">
                  <span className="fw-600"><img className="mr-3" width="33" height="40" src={resume} alt=""/></span>
                    <span className="fw-600">Nived Developer</span>
                  <span>Uploaded on : 20 - 12 -2022</span>
                  <span>
                    <button type="button" className="btn-link"><img src={view} height="50" alt=""/></button>
                    <button type="button" className="btn-link ml-3" data-toggle="modal" data-target="#resumeModal"><img src={downCloud} height="40" alt=""/></button>
                    <button type="button" className="btn-link ml-3"><img src={trash} height="40" alt=""/></button>
                  </span>
                  <span></span>
                </div>
                <div className="list list-horizontal bg-grey font16">
                  <span className="fw-600"><img className="mr-3" width="33" height="40" src={resume} alt=""/></span>
                    <span className="fw-600">Nived Developer</span>
                  <span>Uploaded on : 20 - 12 -2022</span>
                  <span>
                    <button type="button" className="btn-link"><img src={view} height="50" alt=""/></button>
                    <button type="button" className="btn-link ml-3" data-toggle="modal" data-target="#resumeModal"><img src={downCloud} height="40" alt=""/></button>
                    <button type="button" className="btn-link ml-3"><img src={trash} height="40" alt=""/></button>
                  </span>
                  <span><img src={tick} height="50" alt=""/></span>
                </div>
                <div className="list list-horizontal bg-grey font16">
                  <span className="fw-600"><img className="mr-3" width="33" height="40" src={resume} alt=""/></span>
                    <span className="fw-600">Nived Developer</span>
                  <span>Uploaded on : 20 - 12 -2022</span>
                  <span>
                    <button type="button" className="btn-link"><img src={view} height="50" alt=""/></button>
                    <button type="button" className="btn-link ml-3" data-toggle="modal" data-target="#resumeModal"><img src={downCloud} height="40" alt=""/></button>
                    <button type="button" className="btn-link ml-3"><img src={trash} height="40" alt=""/></button>
                  </span>
                  <span></span>
                </div>
                <div className="list list-horizontal bg-grey font16">
                  <span className="fw-600"><img className="mr-3" width="33" height="40" src={resume} alt=""/></span>
                    <span className="fw-600">Nived Developer</span>
                  <span>Uploaded on : 20 - 12 -2022</span>
                  <span>
                    <button type="button" className="btn-link"><img src={view} height="50" alt=""/></button>
                    <button type="button" className="btn-link ml-3" data-toggle="modal" data-target="#resumeModal"><img src={downCloud} height="40" alt=""/></button>
                    <button type="button" className="btn-link ml-3"><img src={trash} height="40" alt=""/></button>
                  </span>
                  <span></span>
                </div>
                <div className="list list-horizontal bg-grey font16">
                  <span className="fw-600"><img className="mr-3" width="33" height="40" src={resume} alt=""/></span>
                    <span className="fw-600">Nived Developer</span>
                  <span>Uploaded on : 20 - 12 -2022</span>
                  <span>
                    <button type="button" className="btn-link"><img src={view} height="50" alt=""/></button>
                    <button type="button" className="btn-link ml-3" data-toggle="modal" data-target="#resumeModal"><img src={downCloud} height="40" alt=""/></button>
                    <button type="button" className="btn-link ml-3"><img src={trash} height="40" alt=""/></button>
                  </span>
                  <span></span>
                </div>
                <div className="mt-5 mb-5 text-center">
                  <button type="submit" className="btn btn-yl">Upload Resume</button>
                </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
  <div className="modal fade empl-panel" id="resumeModal" tabIndex={-1} role="dialog" aria-labelledby="resumeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header modal-header-custom">
          <h5 className="modal-title" id="resumeModalLabel"></h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body modal-body-custom">
          <div className="mb-4">
          <h2 className="font18 fw-600 mb-2">Upload Resume</h2>
          <p className="lead">Click on the icon below to upload your resume(.pdf format only)</p>
          </div>
          <div className="text-center">
            <div className="browseImg"><label htmlFor="file-input"><img src={cloud} height="120" alt=""/></label></div>
          </div>
          <div className="text-left">
            <input type="text" className="form-control bg-grey lg-input mb-2" placeholder="Name of resume"/>
            <span className="note">Naming your resume helps you to access it faster while applying for the next job or internship.</span>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-md btn-yl btn-grey mr-3">Cancel</button>
            <button type="submit" className="btn btn-md btn-yl">Upload</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
    )
}

export default MyResumes;