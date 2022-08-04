import React from 'react';
import { capitalize, map, isEmpty, size } from 'lodash';

import { RootState } from 'app/store';
import { formatDate, history } from 'utils';
import viewIcon from 'assets/images/view-dark.svg';
import questionIcon from 'assets/images/question.svg';
import threeDotsIcon from 'assets/images/dots-three.svg';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ListOpportunities, DeleteOpportunity } from '../postOpportunity/postOpportunitySlice';

interface Props {
  category: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Opportunities: React.FC<Props> = ({ category, currentPage, setCurrentPage }) => {
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
    () => dispatch(ListOpportunities(category, currentPage, 6)),
    [dispatch, category, currentPage],
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
              <th>Opportunity Title</th>
              <th>Domain</th>
              <th>Status</th>
              <th>Expires On</th>
              <th>Applications</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {map(opportunities, ({ ID, stepOne, category, status, view }, index) => (
              <tr key={index}>
                <td
                  className='fw-500'
                  onClick={() => history.push(`/employer/postOpportunity/${category}/${ID}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {stepOne.opportunityTitle}
                </td>
                <td className='fw-500'>{stepOne.opportunityDomain}</td>
                <td className='fw-500'>
                  <span className='cc-blue'>{capitalize(status)}</span>
                </td>
                <td className='fw-500'>{formatDate(stepOne.opportunityEndDate, 'LLL d yyyy')}</td>
                <td className='fw-500'>
                  <button type='button' className='cc-link btn bg-transparent'>
                    <img className='mr-1' src={viewIcon} height='15' alt='' />
                    {view ?? 0}
                  </button>
                </td>
                <td className='th-dt-wrapper'>
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
                        type='button'
                        onClick={() => history.push(`/employer/postOpportunity/${category}/${ID}`)}
                      >
                        Edit
                      </button>
                      <button
                        type='button'
                        onClick={() => handleDelete(index as unknown as number, ID, category)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!isEmpty(opportunities) && totalPages !== currentPage && (
        <div className='col-md-12 text-center pt-3'>
          <button className='cb-btn cb-yellow' onClick={() => setCurrentPage(currentPage + 1)}>
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
