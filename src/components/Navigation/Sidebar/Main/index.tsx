import React from 'react';
import { NavLink } from 'react-router-dom';
import { history } from 'utils';
import Filter from 'components/Filter';
import viewIMg from 'assets/images/view.svg';
import editIMg from 'assets/images/edit.svg';
import homeImg from 'assets/images/home.svg';
import jobsImg from 'assets/images/jobs.svg';
import mbaIMg from 'assets/images/mbatrek.svg';
import helpImg from 'assets/images/help-dark.svg';
import messageImg from 'assets/images/message.svg';
import supportImg from 'assets/images/support.svg';
import plusFillImg from 'assets/images/plus-fill.svg';

interface Props {
  isOpen: boolean;
  showFilter: boolean;
}

const Sidebar: React.FC<Props> = ({ isOpen = false, showFilter = false }) => {
  return (
    <div className={`d-flex align-items-start ${!isOpen ? 'lt-wrapper' : ''}`}>
      <div className={`lt-sec ${!isOpen ? 'lt-sec-short' : ''}`}>
        {isOpen && (
          <>
            <div className='comp-img mb-5'>
              <div className='cover-img'></div>
              <div className='profile-img'>
                <img src={mbaIMg} height='70' alt='' />
              </div>
            </div>
            <div className='text-center pt-4'>
              <div className='hd-16 fw-500 cl-dark mb-1'>MBAtrek Pvt Ltd</div>
              <div>Since 2007</div>
            </div>
            <div className='text-center pt-4 mb-3'>
              <button
                type='button'
                className='btn btn-wt img-reflect'
                onClick={() => history.push('/employer/profile')}
              >
                <img className='mr-2' src={viewIMg} alt='' />
                View
              </button>
              <button
                type='button'
                className='btn btn-yl ml-2'
                onClick={() => history.push('/employer/profile?mode=edit')}
              >
                <img className='mr-2' src={editIMg} alt='' />
                Edit
              </button>
            </div>
          </>
        )}
        <div className='lt-navigation mb-5'>
          <ul className='nav pb-5'>
            <li>
              <NavLink className='img-reflect' to={'/employer/dashboard'}>
                <img className='mr-2' src={homeImg} alt='' />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink className='img-reflect selected' to={'/employer/postOpportunity'}>
                <img className='mr-2' src={plusFillImg} alt='' />
                <span>Post Opportunity/Jobs</span>
              </NavLink>
            </li>
            <li>
              <NavLink className='img-reflect' to={'/employer/jobs'}>
                <img className='mr-2' src={jobsImg} alt='' />
                <span>Jobs</span>
              </NavLink>
            </li>
            <li>
              <NavLink className='img-reflect' to={'/employer/messaging'}>
                <img className='mr-2' src={messageImg} alt='' />
                <span>Messaging</span>
              </NavLink>
            </li>
            <li>
              <NavLink className='img-reflect' to={'/employer/supportDesk'}>
                <img className='mr-2' src={supportImg} alt='' />
                <span>Support Desk</span>
              </NavLink>
            </li>
            <li>
              <NavLink className='img-reflect' to={'/employer/help'}>
                <img className='mr-2' src={helpImg} alt='' />
                <span>Help</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='ft-rel'>
          <div className='ft-fixed hd-14 cl-dark'>
            <div className='fw-500 mb-1'>Need Help ?</div>
            <div>+91 9821948334, +91 9821948335</div>
          </div>
        </div>
      </div>
      {showFilter && <Filter />}
    </div>
  );
};

export default Sidebar;
