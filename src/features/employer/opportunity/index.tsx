import React from 'react';
import Tittle from '../Tittle';
import { history } from 'utils';
import { useAppQuery } from 'app/hooks';
import RangeSelector from 'components/RangeSelector';

const Opportunity = () => {
  const [activeCategory, setActiveCategory] = React.useState(
    useAppQuery().get('category') || 'job',
  );

  return (
    <div className='col-md-12 pt-4 pb-2'>
      <Tittle title='Select Category' />
      <div className='box-container mb-4'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='d-flex'>
              <button
                type='button'
                onClick={() => {
                  // setActiveCategory('job');
                  history.push('/employer/postOpportunity/job')
                }}
                className={`tabs-btn active`}
              >
                Jobs
              </button>
              <button
                type='button'
                onClick={() => {
                  // setActiveCategory('internship');
                  history.push('/employer/postOpportunity/internship')
                }}
                className={`tabs-btn active`}
              >
                Internships
              </button>
              {/* <button
                type='button'
                onClick={() => {
                  setCurrentPage(1);
                  setActiveCategory('competition');
                  history.push('/employer/dashboard/?category=competition');
                }}
                className={`tabs-btn ${activeCategory === 'competition' ? 'active' : ''}`}
              >
                Competitions
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opportunity;
