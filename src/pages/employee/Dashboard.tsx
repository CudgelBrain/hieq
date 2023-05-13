import React from 'react'
import Tittle from 'features/employer/Tittle';
import { useAppQuery } from 'app/hooks';
import { history } from 'utils';
import Stats from '../../components/Employee/Stats'
import Opportunities from 'features/employee/dashboard/Opportunity'
import RangeSelector from 'components/RangeSelector';
import 'assets/styles/employee/style.css'

function EmployeeDashboard() {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [activeStatus, setActiveStatus] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [activeCategory, setActiveCategory] = React.useState(
    useAppQuery().get('category') || 'job',
  );

  return (
    <div className='col-md-12 pt-4 pb-2' style={{
      backgroundColor: '#F5F5F5'
    }}>
      <div className="text-left d-flex mb-4">
        <div className="pg-title flex-grow-1">Dashboard</div>
        <div className="text-right">
          <span className="label">50% Complete Profile</span>
          <span className="progress-bar mt-1 bg-white"><span className="bg-green" style={{ width: "50%" }}></span></span>
        </div>
      </div>

      <div className='box-container mb-4'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='d-flex'>
              <button
                type='button'
                onClick={() => {
                  setCurrentPage(1);
                  setActiveCategory('job');
                  history.push('/employee/postopportunity');
                }}
                className={`employee-tabs-btn ${activeCategory === 'job' ? 'employee_active' : ''}`}
              >
                Jobs
              </button>
              <button
                type='button'
                onClick={() => {
                  setCurrentPage(1);
                  setActiveCategory('internship');
                  // history.push('/employer/dashboard/?category=internship');
                }}
                className={`employee-tabs-btn ${activeCategory === 'internship' ? 'employee_active' : ''}`}
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
            <div className='col-lg-4 col-xl-4 col-md-4'>
              <div> <input type="search" className="form-control" placeholder="Enter search here" />

              </div>
            </div>
            <div className='col-lg-4 col-xl-4 col-md-4'>
              <select className="selectpicker form-control" data-live-search="true">
                <option value="">All Jobs</option>
                <option value="">Select one</option>
                <option value="">Select one</option>
                <option value="">Select one</option>
              </select>
            </div>
            <div className='col-lg-4 col-xl-4 col-md-4'>
              <RangeSelector setStartDate={setStartDate} setEndDate={setEndDate} />
            </div>
          </div>
          <Stats setActiveStatus={setActiveStatus} category={activeCategory} />
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
  )
}

export default EmployeeDashboard