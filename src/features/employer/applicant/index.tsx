import React from 'react';
import Tittle from '../Tittle';
import avatar from 'assets/images/avatar.png';
import fbIcon from 'assets/images/fb-ico.svg';
import pdfIcon from 'assets/images/pdf-ico.svg';
import thumbUp from 'assets/images/thumb-up.svg';
import starGrey from 'assets/images/star-grey.svg';
import tweetIcon from 'assets/images/tweet-ico.svg';
import thumbDown from 'assets/images/thumb-down.svg';
import starSolid from 'assets/images/star-solid.svg';
import linkedIcon from 'assets/images/linked-ico.svg';
import warningIcon from 'assets/images/warning-ico.svg';

const Applicant = () => {
  return (
    <div className='col-md-12 lt-sec-pd pt-4 pb-2' style={{ paddingLeft: '70px' }}>
      <Tittle
        title='Nilesh Ahujha'
        subTitle='(Sales &amp; Marketing)'
        desc='Mumbai, India'
        classes='cf-medium'
        showLink={false}
      />
      <div className='box-container mb-4'>
        <div className='box-container-inner'>
          <div className='row applicant-open applicant-profile mb-4'>
            <div className='col-md-8'>
              <div className='d-flex w-100'>
                <div className='lt w-auto bg-none p-0 mr-3'>
                  <div className='flex-grow-1'>
                    <div className='lt18 mb-4'>
                      <figure className='apt-img'>
                        <img className='img-fluid' src={avatar} width='400' height='400' alt='' />
                      </figure>
                      <div className='name'>Nilesh Ahujha</div>
                      <div className='designation'>Mumbai, India</div>
                    </div>
                    <button className='cb-btn cb-green btn-small d-block'>
                      <img className='mr-2' src={thumbUp} height='22' alt='' />
                      Shortlist
                    </button>
                    <button className='cb-btn cb-red btn-small mt-1'>
                      <img className='mr-2' src={thumbDown} height='22' alt='' />
                      Not a Fit
                    </button>
                  </div>
                </div>
                <div className='rt w-auto ml-3 p-0'>
                  <div className='list'>
                    <div className='heading'>Skills</div>
                    <ul className='grid-2 starlist'>
                      <li>
                        <div className='d-flex align-items-center'>
                          <div className='star-rating star-5'>
                            <span>
                              <img src={starSolid} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starSolid} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starSolid} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starSolid} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starSolid} height='16' alt='' />
                            </span>
                          </div>
                          <span className='ml-2'>HTML</span>
                        </div>
                      </li>
                      <li>
                        <div className='d-flex align-items-center'>
                          <div className='star-rating star-5'>
                            <span>
                              <img src={starSolid} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starSolid} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starSolid} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starGrey} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starGrey} height='16' alt='' />
                            </span>
                          </div>
                          <span className='ml-2'>CSS 3.0</span>
                        </div>
                      </li>
                      <li>
                        <div className='d-flex align-items-center'>
                          <div className='star-rating star-5'>
                            <span>
                              <img src={starSolid} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starSolid} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starGrey} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starGrey} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starGrey} height='16' alt='' />
                            </span>
                          </div>
                          <span className='ml-2'>jQuery</span>
                        </div>
                      </li>
                      <li>
                        <div className='d-flex align-items-center'>
                          <div className='star-rating star-5'>
                            <span>
                              <img src={starSolid} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starSolid} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starSolid} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starGrey} height='16' alt='' />
                            </span>
                            <span>
                              <img src={starGrey} height='16' alt='' />
                            </span>
                          </div>
                          <span className='ml-2'>Bootstrap</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className='list mt-2'>
                    <div className='heading'>Experience</div>
                    <p>
                      Campus Ambassadorat EdC IIT Delhi <span>(Mar&apos21-Present 1month)</span>
                    </p>
                    <p>
                      DSCC atalystat Google&aposs Developer Student Clubs, Rait
                      <span>(Sep&apos20-Present 6months)</span>
                    </p>
                  </div>
                  <div className='list'>
                    <div className='heading'>Experience</div>
                    <p>
                      Computer Science, Bachelorof Engineering B.E (2019-2023)
                      <span>Dr. Patil College Of Engineering</span>
                    </p>
                    <p>
                      Senior Secondary (XII) - Science (2019)<span>CBSE board</span>
                    </p>
                  </div>
                  <div className='list'>
                    <div className='heading'>Additional Information</div>
                    <p>
                      Won Query Hunters 2020 - SQL which was basically an SQL quiz competition in
                      our college
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='asst-graph asst-graph-small'>
                <div className='heading mb-3 text-center'>Assessment Score</div>
                <div className='d-flex justify-content-center'>
                  <div className='graph-list green-graph'>
                    <ul className='chart-skills'>
                      <li style={{ animationName: 'rotate-three' }}></li>
                    </ul>
                    <div className='score-graph'>
                      <div className='txt-large'>85</div>
                      <div className='txt-medium'>Behavioural</div>
                    </div>
                  </div>
                  <div className='graph-list yellow-graph'>
                    <ul className='chart-skills'>
                      <li style={{ animationName: 'rotate-two' }}></li>
                    </ul>
                    <div className='score-graph'>
                      <div className='txt-large'>65</div>
                      <div className='txt-medium'>Cognitive</div>
                    </div>
                  </div>
                  <div className='graph-list blue-graph'>
                    <ul className='chart-skills'>
                      <li style={{ animationName: 'rotate-three' }}></li>
                    </ul>
                    <div className='score-graph'>
                      <div className='txt-large'>85</div>
                      <div className='txt-medium'>Functional</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='list mt-4 sm-list'>
                <div className='heading'>Social Media</div>
                <button className='text-link'>
                  <img src={fbIcon} height='22' alt='' />
                </button>
                <button className='text-link'>
                  <img src={tweetIcon} height='22' alt='' />
                </button>
                <button className='text-link'>
                  <img src={linkedIcon} height='22' alt='' />
                </button>
              </div>
            </div>
            <div className='col-md-12 mt-5 bt-1 pt-4'>
              <div className='text-right'>
                <button className='text-link' title='Report'>
                  <img className='mr-1' src={warningIcon} height='20' alt='' />
                </button>
                <button className='btn btn-square cb-red ml-2'>
                  <img className='mr-1' src={pdfIcon} height='20' alt='' />
                  Download
                </button>
                <button className='btn btn-trans btn-square cb-green ml-2'>Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicant;
