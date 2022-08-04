import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { RootState } from 'app/store';
import Table, { SelectFilter } from 'components/Table';
import { formatDate } from 'utils';
import { HIEQ_SERVICE_URL } from 'constant';
import ManageResume from './ManageResume';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addResume, Resume, deleteResume, editResume, listResumes } from './resumeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListResumes = () => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<string>('list');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [underAction, setUnderAction] = useState<Resume>();
  const { resumes, status, message } = useAppSelector((state: RootState) => state.resume);

  useEffect(() => {
    dispatch(listResumes(handleComplete));
  }, [dispatch]);

  const handleUpload = (file: FormData, onComplete: () => void) => {
    setAction('upload');
    dispatch(addResume(file, handleComplete));
    onComplete();
  };

  const handleEdit = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('edit');
      setUnderAction(resumes[ID]);
    },
    [resumes],
  );

  const handleDelete = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('delete');
      setUnderAction(resumes[ID]);
    },
    [resumes],
  );

  const handleComplete = () => {
    setAction('upload');
    setShowModal(false);
    setUnderAction(undefined);
  };

  const actionButtons = useCallback(
    (ID: string, isActive: boolean) => {
      return (
        <React.Fragment>
          <Link
            to='#'
            title='edit'
            onClick={() => handleEdit(ID)}
            className={underAction?.isActive ? 'toggleOff' : 'toggleOn'}
          >
            <FontAwesomeIcon icon={isActive ? faToggleOn : faToggleOff} className='mr-2 font20' />
          </Link>
          <Link to='#' title='delete' onClick={() => handleDelete(ID)}>
            <FontAwesomeIcon icon={faTrash} className='text-danger font16' />
          </Link>
        </React.Fragment>
      );
    },
    [handleEdit, handleDelete, underAction?.isActive],
  );

  const resumeColumns = useMemo(
    () => [
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>S.No</div>,
        accessor: 'sr',
        Cell: (row: any) => <div>{row.value}</div>,
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Resume</div>,
        accessor: 'resume',
        Cell: (row: any) => (
          <div className='text-left'>
            <a href={`${HIEQ_SERVICE_URL}/resume/${row.value}`} target='_blank' rel='noreferrer'>
              {row.value}
            </a>
          </div>
        ),
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Added By</div>,
        accessor: 'addedBy',
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
        Cell: (row: any) => (
          <div className='d-flex align-items-center justify-content-center'>{row.value}</div>
        ),
        disableFilters: true,
      },
    ],
    [],
  );

  const resumeData = useMemo(
    () =>
      resumes &&
      Object.values(resumes).map((resume, key) => {
        const { ID, name, isActive, createdAt } = resume;
        return {
          sr: (key + 1).toString(),
          resume: name,
          status: isActive ? 'Active' : 'Inactive',
          addedBy: 'Admin',
          addedOn: createdAt,
          action: actionButtons(ID, isActive),
        };
      }),
    [resumes, actionButtons],
  );

  return (
    <React.Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <ManageResume
              onUpload={handleUpload}
              status={action === 'upload' ? status : ''}
              message={action === 'upload' ? message : ''}
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
              tableTitle='Resume List'
              columns={resumeColumns}
              data={resumeData ?? []}
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
          <Modal.Title>{`Are you sure you want to ${
            underAction?.isActive ? 'unpublish' : 'publish'
          } this resume?`}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => dispatch(editResume(underAction!, handleComplete))}
          >
            {action === 'edit' && status === 'loading' && (
              <span className='spinner-border' role='status'></span>
            )}
            {action === 'edit' && status !== 'loading' && (
              <span>{underAction?.isActive ? 'Unpublish' : 'Publish'}</span>
            )}
          </Button>
        </Modal.Body>
      </Modal>
      <Modal
        className='customModal'
        show={action === 'delete' && showModal}
        onHide={handleComplete}
        backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this resume?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => dispatch(deleteResume(underAction!, handleComplete))}
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

export default ListResumes;
