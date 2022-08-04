import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Table, { SelectFilter } from 'components/Table';
import { RootState } from 'app/store';
import ManageCollege from './ManageFaqSubject';
import { formatDate } from 'utils';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { listFaqSubjects, deleteFaqSubject, FaqSubject, FaqSubjectForm } from './faqSubjectSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const defaultFormValue: FaqSubjectForm = {
  name: '',
  topics: [{ name: '' }],
  isActive: false,
};

const ListFaqSubject = () => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<string>('list');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [underAction, setUnderAction] = useState<FaqSubject>();
  const { subjects, status, message } = useAppSelector((state: RootState) => state.faqSubject);

  const handleComplete = useCallback(() => {
    setAction('add');
    setShowModal(false);
    setUnderAction(undefined);
  }, []);

  useEffect(() => {
    dispatch(listFaqSubjects(handleComplete));
  }, [dispatch, handleComplete]);

  const handleEdit = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('edit');
      setUnderAction(subjects[ID]);
    },
    [subjects],
  );

  const handleDelete = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('delete');
      setUnderAction(subjects[ID]);
    },
    [subjects],
  );

  const actionButtons = useCallback(
    (ID: string) => {
      return (
        <React.Fragment>
          <Link to='#' title='edit' onClick={() => handleEdit(ID)}>
            <FontAwesomeIcon icon={faEdit} className='mr-2' />
          </Link>
          <Link to='#' title='delete' onClick={() => handleDelete(ID)}>
            <FontAwesomeIcon icon={faTrash} className='text-danger' />
          </Link>
        </React.Fragment>
      );
    },
    [handleEdit, handleDelete],
  );

  const faqSubjectColumns = useMemo(
    () => [
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>S.No</div>,
        accessor: 'sr',
        Cell: (row: any) => <div>{row.value}</div>,
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Subject Name</div>,
        accessor: 'name',
        Cell: (row: any) => <div className='text-left'>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 pr-2'>Status</div>,
        accessor: 'status',
        Cell: (row: any) => (
          <div style={{ textAlign: 'center' }}>
            <span className={row.value === 'Active' ? 'active-btn' : 'inactive-btn'}>
              {row.value}
            </span>
          </div>
        ),
        Filter: SelectFilter,
        filter: 'equals',
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

  const faqSubjectData = useMemo(
    () =>
      subjects &&
      Object.values(subjects).map((subject, key) => {
        const { ID, name, isActive, createdAt } = subject;
        return {
          sr: (key + 1).toString(),
          name,
          status: isActive ? 'Active' : 'Inactive',
          addedOn: createdAt,
          action: actionButtons(ID),
        };
      }),
    [subjects, actionButtons],
  );

  const exportCSV = useMemo(
    () =>
      subjects &&
      Object.values(subjects).map((subject) => {
        const { name, createdAt } = subject;
        return {
          Name: name,
          'Added On': createdAt,
        };
      }),
    [subjects],
  );

  return (
    <React.Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <ManageCollege
              status={action === 'add' ? status : ''}
              message={action === 'add' ? message : ''}
              actionType={action}
              subject={defaultFormValue}
              onComplete={handleComplete}
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
              tableTitle='FAQ Subject List'
              columns={faqSubjectColumns}
              data={faqSubjectData ?? []}
              // exportCSV={exportCSV ?? []}
              status={action === 'list' ? status : ''}
              className='grid bg-white box-shadow-light br-20'
            />
          </div>
        </div>
      </div>
      <Modal
        className='customModal'
        show={action === 'edit' && showModal}
        onHide={handleComplete}
        backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit/Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ManageCollege
            status={action === 'edit' ? status : ''}
            message={action === 'edit' ? message : ''}
            actionType={action}
            subject={underAction}
            onComplete={handleComplete}
          />
        </Modal.Body>
      </Modal>
      <Modal
        className='customModal'
        show={action === 'delete' && showModal}
        onHide={handleComplete}
        backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this Subject?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => dispatch(deleteFaqSubject(underAction!, handleComplete))}
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

export default ListFaqSubject;
