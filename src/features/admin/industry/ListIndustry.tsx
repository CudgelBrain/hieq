import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { flatten } from 'lodash';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Table from 'components/Table';
import { RootState } from 'app/store';
import ManageIndustry from './ManageIndustry';
import CSVReader from 'components/CSVReader';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  addIndustry,
  listIndustrys,
  Industry,
  deleteIndustry,
} from './industrySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListIndustrys = () => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<string>('list');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [underAction, setUnderAction] = useState<Industry>();
  const { industrys, status, message } = useAppSelector(
    (state: RootState) => state.industry,
  );

  useEffect(() => {
    dispatch(listIndustrys(handleComplete));
  }, [dispatch]);

  const handleParse = (data: any, onComplete: () => void) => {
    setAction('csv');
    dispatch(addIndustry(flatten(data), handleComplete));
    onComplete();
  };

  const handleEdit = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('edit');
      setUnderAction(industrys[ID]);
    },
    [industrys],
  );

  const handleDelete = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('delete');
      setUnderAction(industrys[ID]);
    },
    [industrys],
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

  const industryColumns = useMemo(
    () => [
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>S.No</div>,
        accessor: 'sr',
        Cell: (row: any) => <div>{row.value}</div>,
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Industry Name</div>,
        accessor: 'industry',
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

  const industryData = useMemo(
    () =>
      industrys &&
      Object.values(industrys).map((industry, key) => {
        return {
          sr: (key + 1).toString(),
          industry: industry.name,
          action: actionButtons(industry.ID),
        };
      }),
    [industrys, actionButtons],
  );

  const exportCSV = useMemo(
    () =>
      industrys &&
      Object.values(industrys).map((industry) => {
        const { name, createdAt } = industry;
        return {
          Name: name,
          'Added On': createdAt,
        };
      }),
    [industrys],
  );

  return (
    <React.Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6'>
            <ManageIndustry
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
              tableTitle='Industry List'
              columns={industryColumns}
              data={industryData ?? []}
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
          <ManageIndustry
            status={action === 'edit' ? status : ''}
            message={action === 'edit' ? message : ''}
            actionType={action}
            industry={underAction}
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
          <Modal.Title>Are you sure you want to delete this Industry?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => dispatch(deleteIndustry(underAction!, handleComplete))}
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

export default ListIndustrys;
