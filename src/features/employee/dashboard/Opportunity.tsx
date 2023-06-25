import React from 'react';
import { capitalize, map, isEmpty, size } from 'lodash';
import { RootState } from 'app/store';
import { formatDate, history } from 'utils';
import viewIcon from 'assets/images/view-dark.svg';
import questionIcon from 'assets/images/question.svg';
import threeDotsIcon from 'assets/images/dots-three.svg';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ListOpportunities, ListFilteredOpportunities, DeleteOpportunity } from '../../employer/postOpportunity/postOpportunitySlice';

interface Props {
  category: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  activeStatus: string;
  startDate: string;
  endDate: string;
}

const Opportunities: React.FC<Props> = ({ category, currentPage, setCurrentPage, activeStatus, startDate, endDate }) => {
  const dispatch = useAppDispatch();
  const {
    status,
    opportunities,
    currentAction,
    pagination: { totalPages },
  } = useAppSelector((state: RootState) => state.postOpportunity);
  const [actionButtons, setActionButtons] = React.useState<boolean[]>(
    new Array(size(opportunities)).fill(false),
  );

  React.useEffect(
    () => setActionButtons(new Array(size(opportunities)).fill(false)),
    [opportunities],
  );

  React.useEffect(
    () => dispatch(ListFilteredOpportunities(category, currentPage, 6, activeStatus, startDate, endDate)),
    [dispatch, category, currentPage, activeStatus, startDate, endDate],
  );

  const handleActionButton = (index: number) => {
    setActionButtons(
      Object.assign([...new Array(size(opportunities))], {
        [index as unknown as number]: !actionButtons[index as unknown as number],
      }),
    );
  };

  const handleDelete = (index: number, ID: string, category: string) => {
    handleActionButton(index);
    dispatch(DeleteOpportunity(category, ID));
  };

  return (
    <div className='row mb-4'>
      <div className='col-md-12'>
        <table className='table custom-table table-br' cellPadding='0' cellSpacing='0'>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Status</th>
              <th>Applied on</th>
            </tr>
          </thead>
          <tbody>
            {status == "loading" ?
              <tr className="cc-light bg-light">
                <td colSpan={6} className="fw-500 text-center br-none"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></td>
              </tr> :
              (!isEmpty(opportunities) ? map(opportunities, ({ ID, stepOne, opportunityEndDate, category, status, view }, index) => (
                <tr key={index}>
                  <td
                    className='fw-500'
                    onClick={() => history.push(`/employer/postOpportunity/${category}/${ID}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    {stepOne.opportunityTitle}
                  </td>
                  <td className='fw-500' >{stepOne.opportunityDomain}</td>
                  <td className='fw-500'>
                    <span className='cc-blue text-underline'>{capitalize("Awating")}</span>
                  </td>
                  <td className='fw-500 d-flex justify-content-between' >
                    <div>{opportunityEndDate ? formatDate(opportunityEndDate, 'LLL d yyyy') : ""}</div>
                    <div className='th-dt-wrapper'>
                      <button
                        type='button'
                        className='th-dt-btn'
                        onClick={() => handleActionButton(index as unknown as number)}
                      >
                        {status === 'loading' && currentAction === 'deleteOpportunity' && (
                          <span className='spinner-border' role='status'></span>
                        )}
                        {status !== 'loading' && currentAction === '' && (
                          <img src={threeDotsIcon} height='24' alt='' />
                        )}
                      </button>
                      {actionButtons[index as unknown as number] && (
                        <div className='th-dt-list'>
                          <button
                            type='button' className='btn1'
                            // onClick={() => history.push(`/employer/postOpportunity/${category}/${ID}`)}
                          >
                            Withdraw
                          </button>
                          <button
                            type='button'
                            // onClick={() => handleDelete(index as unknown as number, ID, category)}
                          >
                            View
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                  {/* <td className='fw-500'>{formatDate(stepOne.opportunityEndDate, 'LLL d yyyy')}</td> */}

                </tr>
              )) : <tr className='fw-500 text-center' >
                <td colSpan={6}>
                  Not Found
                </td>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
              </tr>)}
          </tbody>
        </table>
      </div>
      {!isEmpty(opportunities) && totalPages == currentPage && (
        <div className='col-md-12 text-center pt-3'>
          <button className='cb-btn cb-green' onClick={() => history.push('/employer/search')}>
            {status === 'loading' && currentAction === 'listOpportunities' && (
              <span className='spinner-border' role='status'></span>
            )}
            {status !== 'loading' && currentAction === '' && <span>More Details</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default Opportunities;
