import React from 'react';
import greenTick from 'assets/images/green-tick.svg'

const Applied = () => {
    return(
        <>
             <div className="dash-wrapper empl-panel">
    <main>
      <section className="main-wrapper">
        <div className="container-fluid">
          <div className="row position-relative">
            <div className="d-flex align-items-start lt-wrapper">
            </div>
            <div className="col-md-12 pt-4 pb-2" style={{paddingLeft:"0px", paddingRight:"0px"}}>
              <div className="box-container mb-4">
                <div className="box-container-inner">
                  <div className="text-center fw-600 p-5">
                    <img src={greenTick} height="100" alt=""/>
                    <div className="font18 mt-2">Your application has been submitted successfully.</div>                         
                      <div className="font22 mt-2">All the best, buddy!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
  <div className="modal fade empl-panel" id="quickapplyModal" tabIndex={-1} role="dialog" aria-labelledby="quickapplyModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header modal-header-custom">
          <h5 className="modal-title" id="quickapplyModalLabel"></h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body modal-body-custom">
          <div className="mb-4">
          <h2 className="font18 fw-600 mb-2">Apply with your current profile and primary resume. </h2>
          <div className="custom-control custom-checkbox pb-3">
            <input type="checkbox" className="custom-control-input" id="customCheck1" checked={true}/>
            <label className="custom-control-label" htmlFor="customCheck1">Don't remind me again.</label>
          </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-md btn-yl btn-grey mr-3">Cancel</button>
            <button type="submit" className="btn btn-md btn-yl">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
        </>
    )
}

export default Applied;