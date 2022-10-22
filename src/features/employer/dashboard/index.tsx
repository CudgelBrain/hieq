import React from 'react';

import Stats from './Stats';
import Tittle from '../Tittle';
import { history } from 'utils';
import { useAppQuery } from 'app/hooks';
import Opportunities from './Opportunity';
import RangeSelector from 'components/RangeSelector';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [activeStatus, setActiveStatus] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [activeCategory, setActiveCategory] = React.useState(
    useAppQuery().get('category') || 'job',
  );

  return (
    <div className='col-md-12 lt-sec-pd pt-4 pb-2'>
      <Tittle title='Dashboard' />
      <div className='box-container mb-4'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='d-flex'>
              <button
                type='button'
                onClick={() => {
                  setCurrentPage(1);
                  setActiveCategory('job');
                  history.push('/employer/dashboard/?category=job');
                }}
                className={`tabs-btn ${activeCategory === 'job' ? 'active' : ''}`}
              >
                Jobs
              </button>
              <button
                type='button'
                onClick={() => {
                  setCurrentPage(1);
                  setActiveCategory('internship');
                  history.push('/employer/dashboard/?category=internship');
                }}
                className={`tabs-btn ${activeCategory === 'internship' ? 'active' : ''}`}
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
        <div className='box-container-inner'>
          <div className='row mb-4'>
            <div className='col-md-4 offset-md-8'>
              <RangeSelector setStartDate={setStartDate} setEndDate={setEndDate} />
            </div>
          </div>
          <Stats setActiveStatus={setActiveStatus} />
          <Opportunities
            category={activeCategory}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            activeStatus={activeStatus}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
