import React from 'react';
import { getOpportunityStatus } from 'features/employer/postOpportunity/postOpportunityAPI';
interface status {
  active: { count: string, week: string },
  draft: { count: string, week: string },
  closed: { count: string, week: string },
}

interface Props {
  setActiveStatus: React.Dispatch<React.SetStateAction<string>>;
  category: string;
}
const Stats: React.FC<Props> = ({ setActiveStatus, category }) => {
  const [status, setStatus] = React.useState<status>({
    active: { count: "0", week: "0" },
    draft: { count: "0", week: "0" },
    closed: { count: "0", week: "0" },
  })
  React.useEffect(() => {
    getOpportunityStat();
  }, [category]);
  const getOpportunityStat = async () => {
    const { data } = await getOpportunityStatus(category);
    setStatus({ ...data })
  };
  return (
    <div className='row mb-4'>
      <div className='col-md-12'>
        <ul className='analytics-list'>
          <li onClick={() => setActiveStatus("active")} style={{ cursor: 'pointer' }}>
            <div className='cf-medium cc-grey'>Active</div>
            <div className='cf-large cc-green fw-600'>{status?.active.count ? status?.active.count : 0}</div>
            <div className='cf-medium cc-grey'>{status?.active.week ? status?.active.week : 0} from last week</div>
          </li>
          <li onClick={() => setActiveStatus("draft")} style={{ cursor: 'pointer' }}>
            <div className='cf-medium cc-grey'>Draft</div>
            <div className='cf-large cc-yellow fw-600'>{status?.draft.count ? status?.draft.count : 0}</div>
            <div className='cf-medium cc-grey'>{status?.draft.week ? status?.draft.week : 0} from last week</div>
          </li>
          <li onClick={() => setActiveStatus("closed")} style={{ cursor: 'pointer' }}>
            <div className='cf-medium cc-grey'>Closed</div>
            <div className='cf-large cc-dark fw-600'>{status?.closed.count ? status?.closed.count : 0}</div>
            <div className='cf-medium cc-grey'>{status?.closed.week ? status?.closed.week : 0} from last week</div>
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
