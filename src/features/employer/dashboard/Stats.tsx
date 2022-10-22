import React from 'react';
interface Props {
  setActiveStatus: React.Dispatch<React.SetStateAction<string>>;
}
const Stats: React.FC<Props> = ({ setActiveStatus }) => {
  return (
    <div className='row mb-4'>
      <div className='col-md-12'>
        <ul className='analytics-list'>
          <li onClick={() => setActiveStatus("active")} style={{ cursor: 'pointer' }}>
            <div className='cf-medium cc-grey'>Active</div>
            <div className='cf-large cc-green fw-600'>12</div>
            <div className='cf-medium cc-grey'>4 from last week</div>
          </li>
          <li onClick={() => setActiveStatus("draft")} style={{ cursor: 'pointer' }}>
            <div className='cf-medium cc-grey'>Draft</div>
            <div className='cf-large cc-yellow fw-600'>25</div>
            <div className='cf-medium cc-grey'>14 from last week</div>
          </li>
          <li onClick={() => setActiveStatus("closed")} style={{ cursor: 'pointer' }}>
            <div className='cf-medium cc-grey'>Closed</div>
            <div className='cf-large cc-dark fw-600'>05</div>
            <div className='cf-medium cc-grey'>14 from last week</div>
          </li>
          {/* <li>
            <div className='cf-medium cc-grey'>Reviews</div>
            <div className='cf-large cc-blue fw-600'>05</div>
            <div className='cf-medium cc-grey'>14 from last week</div>
          </li>
          <li>
            <div className='cf-medium cc-grey'>Rejected</div>
            <div className='cf-large cc-red fw-600'>05</div>
            <div className='cf-medium cc-grey'>14 from last week</div>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Stats;
