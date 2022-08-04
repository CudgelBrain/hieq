import React from 'react';
import thumbUp from 'assets/images/thumb-up.svg';
import thumbDown from 'assets/images/thumb-down.svg';

const BriefIntro = () => {
  return (
    <tr>
      <td colSpan={7} className='p-0'>
        <div className='applicant-open'>
          <div className='lt pb-3'>
            <div className='d-flex'>
              <div className='flex-grow-1'>
                <div className='lt18 mb-4'>
                  <div className='name'>Nilesh Ahujha</div>
                  <div className='designation'>Mumbai, Kolkata</div>
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
              <div className='asst-graph pr-4'>
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
          </div>
          <div className='rt pb-4'>
            <div className='list'>
              <div className='heading'>Skills</div>
              <p>Bootstrap, CSS, HTML, Ms Excel and 2 more</p>
            </div>
            <div className='list'>
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
            </div>
            <div className='text-right mt-5'>
              <button className='text-link text-underline'>View full application</button>
              <button className='btn btn-trans btn-square cb-green ml-2'>Send Message</button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default BriefIntro;
