import React from 'react';
import arrows from 'assets/images/right-trans-arrow.svg'
import leftArrow from 'assets/images/left-chevron.svg';
import persona from 'assets/images/work-persona.svg';

const BehavioralAssessment = () => {
    return (
        <>
            <div className="dash-wrapper empl-panel">
       <main>
      <section className="main-wrapper">
        <div className="container-fluid">
          <div className="row position-relative">
            <div className="d-flex align-items-start lt-wrapper">
            </div>
            <div className="col-md-12 pt-4 pb-2" style={{paddingLeft:"0px", paddingRight:'0px'}}>
              <div className="box-container mb-4">
                <div className="box-container-inner">
                  <div className="mb-4 text-right">
                    <button type="button" className="btn btn-link cc-green"><img className="mr-1"
                        src={leftArrow} width="13" height="11"/>Back</button>
                  </div>
                  <div className="text-left bb-1 fw-600 pb-3 mb-3">
                    <div className="font18">Instructions</div>
                  </div>
                  <div className="content pt-3 font16">
                    <p>1. <strong>There are a total of 50 Questions.</strong> Each question taps into either your
                      personal or behavioural attribute and scores you on a parameter of assessment. Therefore it is
                      mandatory for you to answer all the questions. </p>
                    <p> 2. <strong>You must complete the assessment in one go.</strong> You may take about 30-40 minutes
                      to complete. In case you have answered a few questions and have the assessment left, it will
                      expire after a particular time limit has elapsed. Therefore, please ensure you start only when you
                      are sure you can complete it in one go.
                    </p>
                    <p>

                      3. <strong>In case of a power/network failure during your attempt</strong>, your responses will be
                      saved up to the last question you responded. You can resume from the next question by clicking the
                      test link again.
                    </p>
                    <p>

                      4. <strong>Always answer the questions on the basis of First Reaction.</strong> Do not give too
                      much thought to any question. Respond honestly and true to yourself.
                    </p>
                    <p>

                      5. <strong>You must respond to the questions sequentially.</strong> For questions which you may
                      not understand/know how to respond to, please put the best answer that comes to mind. For few
                      questions, there will be an 'i' button for a hint on the top right corner of the statement. The
                      test can arrest your ability to fake and provide socially desirable responses to questions, so
                      respond carefully.
                    </p>
                    <p>

                      6. <strong>Take the assessment in a quiet and interruption-free corner.</strong> Please understand
                      that environmental factors influence your responding pattern, thereby leading to erroneous
                      results. </p>
                  </div>
                  <div className="text-left font16 pb-5">
                    <button type="button" className="btn-link txt-yl fw-600" data-toggle="modal" data-target="#instructionsModal">Why should I take this assessment?</button>  
                  </div>
                  <div className="text-center mt-5 mb-5">
                    <button type="submit" className="btn btn-lg btn-right-arrow btn-yl" >Begin Assessments 
                        <img className="ml-2" src={arrows} height="30" alt=""/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>

  <div className="modal fade empl-panel" id="instructionsModal" tabIndex={-1} role="dialog" aria-labelledby="instructionsModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header modal-header-custom">
          <h5 className="modal-title" id="instructionsModalLabel"></h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body modal-body-custom">
          <div className="mb-4 text-center">
          <h2 className="font18 fw-600 mb-4">Assessment I -  Your Work Persona</h2>
          <img src={persona} height="250" alt=""/>
          </div>
          <div className="content font16">
            <p>


Finding the best match between career and personality is paramount to career success and job satisfaction. Choosing and progressing in a career is directly related to your behaviour at work and in planning your actions and decisions regarding the same. 
</p><p>
Not only should professionals know how to make use of their abilities but also the use the right modes and platforms for assessing the same to gauge suitability in a job role. Having the right attitude and developing the most important behaviour at work is imperative to job success and exercising the right attitude for delivering one's work can help them benefit and excel in the long term in this field. 
</p><p>
Hence, this section shall help with a preliminary analysis of behaviour and personality which not only provides a fair judgement of readiness for a job but also provides additional scope for developing relevant skills, going ahead.  
</p><p>
This part assesses your work persona through a two-fold approach:
</p>
<ol>
<li><strong>By assessing your Personal Attributes -</strong> They are personality traits/qualities one has naturally that makes them unique and helps determine their effectiveness in a certain job role. These qualities can used combined with skills acquired in a job.
</li>
<li><strong>By assessing your Behavioural Attributes -</strong> These on the other hand are made up of a range of behavioural manifestations - motives, skills, and knowledge. In a situation these tap how an individual behaves and that can be a significant predictor of job performance.
</li></ol>
          </div>
          <div className="text-center mt-5 mb-3">
            <button type="submit" className="btn btn-lg btn-yl">Okay!</button>
          </div>
        </div>
      </div>
    </div>
  </div>

        </>
    )
}

export default BehavioralAssessment;