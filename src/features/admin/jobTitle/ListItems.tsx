import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { flatten } from 'lodash';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

// imported from project
import { formatDate } from 'utils';
import { RootState } from 'app/store';
import ManageJobTitle from './ManageItem';
import CSVReader from 'components/CSVReader';
import Table, { SelectFilter } from 'components/Table';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AddJobTitle, ListJobTitles, JobTitle, DeleteJobTitle, EditJobTitle } from './itemSlice';

const ListItems = () => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<string>('list');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [underAction, setUnderAction] = useState<JobTitle>();
  const { jobTitles, status, message } = useAppSelector((state: RootState) => state.jobTitle);

  const handleComplete = () => {
    setAction('add');
    setShowModal(false);
    setUnderAction(undefined);
  };

  useEffect(() => {
    dispatch(ListJobTitles(handleComplete));
  }, [dispatch]);

  const handleParse = (data: any, onComplete: () => void) => {
    setAction('csv');
    dispatch(AddJobTitle(flatten(data), handleComplete));
    onComplete();
  };

  const handleEdit = useCallback(
    (ID: string, actionType: string) => {
      setShowModal(true);
      setAction(actionType);
      setUnderAction(jobTitles[ID]);
    },
    [jobTitles],
  );

  const handleDelete = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('delete');
      setUnderAction(jobTitles[ID]);
    },
    [jobTitles],
  );

  const actionButtons = useCallback(
    (ID: string, isActive: boolean) => {
      return (
        <React.Fragment>
          <Link
            to='#'
            title='Change item status'
            onClick={() => handleEdit(ID, 'changeStatus')}
            className={isActive ? 'toggleOff' : 'toggleOn'}
          >
            <FontAwesomeIcon icon={isActive ? faToggleOn : faToggleOff} className='mr-2 font20' />
          </Link>
          <Link to='#' title='Edit item' onClick={() => handleEdit(ID, 'edit')}>
            <FontAwesomeIcon icon={faEdit} className='mr-2' />
          </Link>
          <Link to='#' title='Delete item' onClick={() => handleDelete(ID)}>
            <FontAwesomeIcon icon={faTrash} className='text-danger' />
          </Link>
        </React.Fragment>
      );
    },
    [handleEdit, handleDelete],
  );

  const jobTitleColumns = useMemo(
    () => [
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>S.No</div>,
        accessor: 'sr',
        Cell: (row: any) => <div>{row.value}</div>,
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Job Title</div>,
        accessor: 'title',
        Cell: (row: any) => <div className='text-left'>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 pr-2'>Status</div>,
        accessor: 'isActive',
        Cell: (row: any) => (
          <div style={{ textAlign: 'center' }}>
            <span className={row.value ? 'active-btn' : 'inactive-btn'}>
              {row.value ? 'Active' : 'Inactive'}
            </span>
          </div>
        ),
        Filter: SelectFilter,
        filter: 'equals',
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Added By</div>,
        accessor: 'addedBy',
        Cell: (row: any) => <div className='text-left'>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Added On</div>,
        accessor: 'addedOn',
        Cell: (row: any) => <div className='text-left'>{formatDate(row.value)}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 pr-2'>Action</div>,
        accessor: 'action',
        Cell: (row: any) => <div>{row.value}</div>,
        disableFilters: true,
      },
    ],
    [],
  );

  const jobTitleData = useMemo(
    () =>
      jobTitles &&
      Object.values(jobTitles).map((jobTitle, key) => {
        return {
          sr: (key + 1).toString(),
          title: jobTitle.title,
          isActive: jobTitle.isActive,
          addedBy: jobTitle.createdBy,
          addedOn: jobTitle.createdAt,
          action: actionButtons(jobTitle.ID, jobTitle.isActive),
        };
      }),
    [jobTitles, actionButtons],
  );

  const exportCSV = useMemo(
    () =>
      jobTitles &&
      Object.values(jobTitles).map((jobTitle) => {
        const { title, createdBy, createdAt } = jobTitle;
        return {
          'Job Title': title,
          'Added By': createdBy,
          'Added On': createdAt,
        };
      }),
    [jobTitles],
  );

  return (
    <React.Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6'>
            <ManageJobTitle
              status={action === 'add' ? status : ''}
              message={action === 'add' ? message : ''}
              actionType={action}
              onComplete={handleComplete}
            />
          </div>
          <div className='col-md-6'>
            <CSVReader
              sampleLink='#'
              status={action === 'csv' ? status : ''}
              message={action === 'csv' ? message : ''}
              onParse={handleParse}
              className='grid bg-white box-shadow-light br-20'
            />
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <Table
              filter={true}
              sorting={true}
              paginate={true}
              itemCount={true}
              tableTitle='Job Title List'
              columns={jobTitleColumns}
              data={jobTitleData ?? []}
              exportCSV={exportCSV ?? []}
              status={action === 'list' ? status : ''}
              className='grid bg-white box-shadow-light br-20'
            />
          </div>
        </div>
      </div>
      <Modal
        backdrop='static'
        className='customModal'
        onHide={handleComplete}
        show={action === 'edit' && showModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit/Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ManageJobTitle
            status={action === 'edit' ? status : ''}
            message={action === 'edit' ? message : ''}
            actionType={action}
            jobTitle={underAction}
            onComplete={handleComplete}
          />
        </Modal.Body>
      </Modal>
      <Modal
        backdrop='static'
        className='customModal'
        onHide={handleComplete}
        show={action === 'changeStatus' && showModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{`Are you sure you want to ${
            underAction?.isActive ? 'unpublish' : 'publish'
          } this job title?`}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() =>
              dispatch(
                EditJobTitle(
                  underAction!,
                  {
                    title: underAction!.title,
                    isActive: !underAction!.isActive,
                  },
                  handleComplete,
                ),
              )
            }
          >
            {action === 'changeStatus' && status === 'loading' && (
              <span className='spinner-border' role='status'></span>
            )}
            {action === 'changeStatus' && status !== 'loading' && (
              <span>{underAction?.isActive ? 'Unpublish' : 'Publish'}</span>
            )}
          </Button>
        </Modal.Body>
      </Modal>
      <Modal
        backdrop='static'
        className='customModal'
        onHide={handleComplete}
        show={action === 'delete' && showModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this job title?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}></Button>
          <Button
            variant='danger'
            onClick={() => dispatch(DeleteJobTitle(underAction!, handleComplete))}
          >
            {action === 'delete' && status === 'loading' && (
              <span className='spinner-border' role='status'></span>
            )}
            {action === 'delete' && status !== 'loading' && <span>Delete</span>}
          </Button>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ListItems;
