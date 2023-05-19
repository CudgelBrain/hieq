import React from "react";
import locationImg from 'assets/images/location.svg';
import play from 'assets/images/play-resume.svg';
import rupee from 'assets/images/rupee.svg'
import tcsImg from 'assets/images/tcs.jpg';
import share from 'assets/images/share.svg';
import leftArrow from 'assets/images/left-chevron.svg';
import flag from 'assets/images/flag.svg';


const Assessments = () => {
    return(
        <>
            <div className="dash-wrapper empl-panel">
            <main>
      <section className="main-wrapper">
        <div className="container-fluid">
          <div className="row position-relative">
            <div className="d-flex align-items-start lt-wrapper">
            </div>
            <div className="col-md-12 pt-4 pb-2" style={{paddingLeft: "0px",paddingRight:"0px"}}>
              <div className="box-container mb-4">
                <div className="box-container-inner">
                  <div className="mb-4 text-right">
                    <button type="button" className="btn btn-link cc-green">
                        <img className="mr-1"
                        src={leftArrow} width="13" height="11" />
                        Back</button>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mt-4">
                      <div className="mt-3 mb-4">
                        <div className="d-flex">
                          <div className="w-50">
                            <button type="submit" className="btn btn-yl btn-lg mw-250">Begin Assessment<img src={play} style={{color:"#f5f5f5"}} width="25" height="25" alt=""/></button>
                          </div>
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

export default Assessments;
