import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { RootState } from 'app/store';
import Table, { SelectFilter } from 'components/Table';
import { formatDate } from 'utils';
import ManageQuestionAnswer from './ManageFaqQuestion';
import { FaqQuestion, listFaqQuestions, deleteFaqQuestion } from './faqQuestionSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListFaqs = () => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<string>('list');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [underAction, setUnderAction] = useState<FaqQuestion>();
  const { questions, status, message } = useAppSelector((state: RootState) => state.faqQuestion);

  useEffect(() => {
    dispatch(listFaqQuestions(handleComplete));
  }, [dispatch]);

  const handleEdit = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('edit');
      setUnderAction(questions[ID]);
    },
    [questions],
  );

  const handleDelete = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('delete');
      setUnderAction(questions[ID]);
    },
    [questions],
  );

  const handleComplete = () => {
    setAction('add');
    setShowModal(false);
    setUnderAction(undefined);
  };

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

  const faqQuestionColumns = useMemo(
    () => [
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>S.No</div>,
        accessor: 'sr',
        Cell: (row: any) => <div>{row.value}</div>,
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>For Whom</div>,
        accessor: 'forWhom',
        Cell: (row: any) => <div className='text-left'>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Subject</div>,
        accessor: 'subject',
        Cell: (row: any) => {
          const value = row.value.split('::');
          return <div className='text-left'>{value[1]}</div>;
        },
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Topic</div>,
        accessor: 'topic',
        Cell: (row: any) => <div className='text-left'>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Question</div>,
        accessor: 'question',
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

  const faqQuestionData = useMemo(
    () =>
      questions &&
      Object.values(questions).map((item, key) => {
        const { ID, for: forWhom, subject, topic, question, isActive, createdAt } = item;
        return {
          sr: (key + 1).toString(),
          forWhom,
          subject,
          topic,
          question,
          addedOn: createdAt,
          action: actionButtons(ID),
          status: isActive ? 'Active' : 'Inactive',
        };
      }),
    [questions, actionButtons],
  );

  return (
    <React.Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <ManageQuestionAnswer
              actionType={action}
              onComplete={handleComplete}
              status={action === 'add' ? status : ''}
              message={action === 'add' ? message : ''}
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
              tableTitle='Question and Answer List'
              columns={faqQuestionColumns}
              data={faqQuestionData ?? []}
              status={action === 'list' ? status : ''}
              className='grid bg-white box-shadow-light br-20'
            />
          </div>
        </div>
      </div>
      <Modal
        size='lg'
        className='customModal'
        show={action === 'edit' && showModal}
        onHide={handleComplete}
        backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit/Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ManageQuestionAnswer
            status={action === 'edit' ? status : ''}
            message={action === 'edit' ? message : ''}
            actionType={action}
            faqQuestion={underAction}
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
          <Modal.Title>Are you sure you want to delete this question?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => dispatch(deleteFaqQuestion(underAction!, handleComplete))}
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

export default ListFaqs;
