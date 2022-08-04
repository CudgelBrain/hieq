import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from 'utils';
import { RootState } from 'app/store';
import Table, { SelectFilter } from 'components/Table';
import ManageQuestionBank from './ManageQuestionBank';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { DefaultFormValue, deleteQuestion, listQuestions, QuestionBank } from './questionBankSlice';

const ListQuestionCategory = () => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<string>('list');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [underAction, setUnderAction] = useState<QuestionBank>();
  const { questions, status, message } = useAppSelector((state: RootState) => state.questionBank);

  useEffect(() => {
    dispatch(listQuestions(handleComplete));
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

  const questionBankColumns = useMemo(
    () => [
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>S.No</div>,
        accessor: 'sr',
        Cell: (row: any) => <div>{row.value}</div>,
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Module Type</div>,
        accessor: 'moduleType',
        Cell: (row: any) => <div className='text-left'>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Functional Type</div>,
        accessor: 'functionalType',
        Cell: (row: any) => <div className='text-left'>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Question Category</div>,
        accessor: 'category',
        Cell: (row: any) => <div className='text-left'>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Question Level</div>,
        accessor: 'level',
        Cell: (row: any) => <div className='text-left'>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Question Type</div>,
        accessor: 'type',
        Cell: (row: any) => <div className='text-left'>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Uploaded By</div>,
        accessor: 'addedBy',
        Cell: (row: any) => <div className='text-left'>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 pr-2'>Status</div>,
        accessor: 'isActive',
        Cell: (row: any) => (
          <div style={{ textAlign: 'center' }}>
            <span className={row.value ? 'active-btn' : 'inactive-btn'}>{row.value}</span>
          </div>
        ),
        Filter: SelectFilter,
        filter: 'equals',
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Added On</div>,
        accessor: 'createdAt',
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

  const questionBankData = useMemo(
    () =>
      questions &&
      Object.values(questions).map((question, key) => {
        const { ID, moduleType, functionalType, category, level, type, isActive, createdAt } =
          question;
        return {
          sr: (key + 1).toString(),
          moduleType,
          functionalType: functionalType ?? 'N/A',
          category,
          level,
          type,
          isActive,
          createdAt,
          addedBy: 'Admin',
          action: actionButtons(ID),
        };
      }),
    [questions, actionButtons],
  );

  const exportCSV = useMemo(
    () =>
      questions &&
      Object.values(questions).map((question, key) => {
        const { moduleType, functionalType, category, level, type, isActive, createdAt } = question;
        return {
          sr: (key + 1).toString(),
          'Module Type': moduleType,
          'Functional Type': functionalType ?? 'N/A',
          'Question Category': category,
          'Question Level': level,
          'Question Type': type,
          Status: isActive ? 'Active' : 'Inactive',
          'Added By': 'Admin',
          'Added On': formatDate(createdAt),
        };
      }),
    [questions],
  );

  return (
    <React.Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <ManageQuestionBank
              actionType={action}
              onComplete={handleComplete}
              underAction={DefaultFormValue}
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
              tableTitle='Question List'
              exportCSV={exportCSV ?? []}
              columns={questionBankColumns}
              data={questionBankData ?? []}
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
          <ManageQuestionBank
            actionType={action}
            underAction={underAction}
            onComplete={handleComplete}
            status={action === 'edit' ? status : ''}
            message={action === 'edit' ? message : ''}
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
            onClick={() => dispatch(deleteQuestion(underAction!, handleComplete))}
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

export default ListQuestionCategory;
