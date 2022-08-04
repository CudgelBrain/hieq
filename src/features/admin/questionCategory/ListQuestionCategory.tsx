import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { upperFirst, isEmpty } from 'lodash';
import { Modal, Button } from 'react-bootstrap';
import Table, { SelectFilter } from 'components/Table';
import { RootState } from 'app/store';
import { formatDate } from 'utils';
import ManageCompany from './ManageQuestionCategory';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  listQuestionCategories,
  QuestionCategory,
  deleteQuestionCategory,
} from './questionCategorySlice';

const ListQuestionCategory = () => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<string>('list');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [underAction, setUnderAction] = useState<QuestionCategory>();
  const { categories, status, message } = useAppSelector(
    (state: RootState) => state.questionCategory,
  );

  useEffect(() => {
    dispatch(listQuestionCategories(handleComplete));
  }, [dispatch]);

  const handleEdit = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('edit');
      setUnderAction(categories[ID]);
    },
    [categories],
  );

  const handleDelete = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('delete');
      setUnderAction(categories[ID]);
    },
    [categories],
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

  const categoryColumns = useMemo(
    () => [
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>S.No</div>,
        accessor: 'sr',
        Cell: (row: any) => <div>{row.value}</div>,
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Category Name</div>,
        accessor: 'name',
        Cell: (row: any) => <div className='text-left'>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Module Type</div>,
        accessor: 'moduleType',
        Cell: (row: any) => <div className='text-left'>{upperFirst(row.value)}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Functional Type</div>,
        accessor: 'functionalType',
        Cell: (row: any) => (
          <div className='text-left'>{isEmpty(row.value) ? 'N/A' : row.value}</div>
        ),
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
            <span className={row.value ? 'active-btn' : 'inactive-btn'}>
              {row.value ? 'Active' : 'Inactive'}
            </span>
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

  const categoryData = useMemo(
    () =>
      categories &&
      Object.values(categories).map((category, key) => {
        const { ID, name, moduleType, functionalType, isActive, createdAt } = category;
        return {
          sr: (key + 1).toString(),
          name,
          moduleType,
          functionalType,
          isActive,
          createdAt,
          addedBy: 'Admin',
          action: actionButtons(ID),
        };
      }),
    [categories, actionButtons],
  );

  const exportCSV = useMemo(
    () =>
      categories &&
      Object.values(categories).map((category) => {
        const { name, moduleType, functionalType, isActive, createdAt } = category;
        return {
          Name: name,
          'Module Type': moduleType,
          'Functional Type': functionalType,
          status: isActive,
          addedBy: 'Admin',
          'Added On': formatDate(createdAt),
        };
      }),
    [categories],
  );

  return (
    <React.Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <ManageCompany
              status={action === 'add' ? status : ''}
              message={action === 'add' ? message : ''}
              actionType={action}
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
              tableTitle='Category List'
              columns={categoryColumns}
              data={categoryData ?? []}
              exportCSV={exportCSV ?? []}
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
          <ManageCompany
            status={action === 'edit' ? status : ''}
            message={action === 'edit' ? message : ''}
            actionType={action}
            questionCategory={underAction}
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
          <Modal.Title>Are you sure you want to delete this category?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => dispatch(deleteQuestionCategory(underAction!, handleComplete))}
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
