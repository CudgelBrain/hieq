import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { flatten } from 'lodash';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Table from 'components/Table';
import { RootState } from 'app/store';
import ManageItem from './ManageItem';
import CSVReader from 'components/CSVReader';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  AddInstituteGroup,
  ListInstituteGroups,
  InstituteGroup,
  DeleteInstituteGroup,
} from './itemSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListItems = () => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<string>('list');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [underAction, setUnderAction] = useState<InstituteGroup>();
  const { instituteGroups, status, message } = useAppSelector(
    (state: RootState) => state.instituteGroup,
  );

  useEffect(() => {
    dispatch(ListInstituteGroups(handleComplete));
  }, [dispatch]);

  const handleParse = (data: any, onComplete: () => void) => {
    setAction('csv');
    dispatch(AddInstituteGroup(flatten(data), handleComplete));
    onComplete();
  };

  const handleEdit = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('edit');
      setUnderAction(instituteGroups[ID]);
    },
    [instituteGroups],
  );

  const handleDelete = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('delete');
      setUnderAction(instituteGroups[ID]);
    },
    [instituteGroups],
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

  const instituteGroupColumns = useMemo(
    () => [
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>S.No</div>,
        accessor: 'sr',
        Cell: (row: any) => <div>{row.value}</div>,
        disableFilters: true,
      },
      {
        Header: () => (
          <div className='flex-grow-1 text-left pr-2'>Institute Group / Group Name</div>
        ),
        accessor: 'instituteGroup',
        Cell: (row: any) => <div className='text-left'>{row.value}</div>,
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

  const instituteGroupData = useMemo(
    () =>
      instituteGroups &&
      Object.values(instituteGroups).map((instituteGroup, key) => {
        return {
          sr: (key + 1).toString(),
          instituteGroup: instituteGroup.name,
          action: actionButtons(instituteGroup.ID),
        };
      }),
    [instituteGroups, actionButtons],
  );

  const exportCSV = useMemo(
    () =>
      instituteGroups &&
      Object.values(instituteGroups).map((instituteGroup) => {
        const { name, createdAt } = instituteGroup;
        return {
          Name: name,
          'Added On': createdAt,
        };
      }),
    [instituteGroups],
  );

  return (
    <React.Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6'>
            <ManageItem
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
              tableTitle='Institute Group / Group List'
              columns={instituteGroupColumns}
              data={instituteGroupData ?? []}
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
          <ManageItem
            status={action === 'edit' ? status : ''}
            message={action === 'edit' ? message : ''}
            actionType={action}
            instituteGroup={underAction}
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
          <Modal.Title>Are you sure you want to delete this Institute Group / Group?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => dispatch(DeleteInstituteGroup(underAction!, handleComplete))}
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
