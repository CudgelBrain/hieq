import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import { formatDate } from 'utils';
import ManageItem from './ManageItem';
import { RootState } from 'app/store';
import { HIEQ_SERVICE_URL } from 'constant';
import CSVReader from 'components/CSVReader';
import Table, { SelectFilter } from 'components/Table';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Company, DeleteCompany, AddCompany, EditCompany, ListCompanies } from './itemSlice';

const ListItems = () => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<string>('list');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [underAction, setUnderAction] = useState<Company>();
  const { companies, status, message } = useAppSelector((state: RootState) => state.company);

  useEffect(() => {
    dispatch(ListCompanies(handleComplete));
  }, [dispatch]);

  const handleParse = (data: any, onComplete: () => void) => {
    const companies = data.map((row: any) => ({ name: row[0] }));
    setAction('csv');
    dispatch(AddCompany(companies, handleComplete));
    onComplete();
  };

  const handleEdit = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('edit');
      setUnderAction(companies[ID]);
    },
    [companies],
  );

  const handleDelete = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('delete');
      setUnderAction(companies[ID]);
    },
    [companies],
  );

  const handleOnHomepage = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('homepage');
      setUnderAction(companies[ID]);
    },
    [companies],
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

  const onHomepage = useCallback(
    (ID: string, showOnHomepage: boolean) => {
      return (
        <Link
          to='#'
          title='edit'
          onClick={() => handleOnHomepage(ID)}
          className={showOnHomepage ? 'toggleOff' : 'toggleOn'}
        >
          <FontAwesomeIcon
            icon={showOnHomepage ? faToggleOn : faToggleOff}
            className='mr-2 font20'
          />
        </Link>
      );
    },
    [handleOnHomepage],
  );

  const logoColumns = useMemo(
    () => [
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>S.No</div>,
        accessor: 'sr',
        Cell: (row: any) => <div>{row.value}</div>,
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Company Name</div>,
        accessor: 'name',
        Cell: (row: any) => <div className='text-left'>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Company Logo</div>,
        accessor: 'fileName',
        Cell: (row: any) => (
          <div className='text-left'>
            <a
              href={`${HIEQ_SERVICE_URL}/companyLogo/${row.value}`}
              target='_blank'
              rel='noreferrer'
            >
              <img
                className='img-fluid'
                src={`${HIEQ_SERVICE_URL}/companyLogo/${row.value}`}
                width='200'
                alt={row.value}
              />
            </a>
          </div>
        ),
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Show On Homepage</div>,
        accessor: 'showOnHomepage',
        Cell: (row: any) => (
          <div className='d-flex align-items-center justify-content-center'>{row.value}</div>
        ),
        disableFilters: true,
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

  const logoData = useMemo(
    () =>
      companies &&
      Object.values(companies).map((item, key) => {
        const { ID, name, showOnHomepage, fileName, isActive, createdAt } = item;
        return {
          sr: (key + 1).toString(),
          name,
          fileName,
          isActive,
          createdAt,
          showOnHomepage: onHomepage(ID, showOnHomepage),
          addedBy: 'Admin',
          action: actionButtons(ID),
        };
      }),
    [companies, onHomepage, actionButtons],
  );

  const exportCSV = useMemo(
    () =>
      companies &&
      Object.values(companies).map((logo) => {
        const { name, isActive, createdAt } = logo;
        return {
          Name: name,
          status: isActive,
          addedBy: 'Admin',
          'Added On': formatDate(createdAt),
        };
      }),
    [companies],
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
              tableTitle='Company List'
              columns={logoColumns}
              data={logoData ?? []}
              exportCSV={exportCSV ?? []}
              status={action === 'list' ? status : ''}
              className='grid bg-white box-shadow-light br-20'
            />
          </div>
        </div>
      </div>
      <Modal
        className='customModal'
        show={action === 'homepage' && showModal}
        onHide={handleComplete}
        backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title>{`Are you sure you want to ${
            underAction?.showOnHomepage ? 'unpublish' : 'publish'
          } this banner from homepage?`}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() =>
              dispatch(
                EditCompany(
                  underAction!,
                  { ...underAction!, showOnHomepage: !underAction?.showOnHomepage },
                  handleComplete,
                ),
              )
            }
          >
            {action === 'homepage' && status === 'loading' && (
              <span className='spinner-border' role='status'></span>
            )}
            {action === 'homepage' && status !== 'loading' && (
              <span>{underAction?.showOnHomepage ? 'Unpublish' : 'Publish'}</span>
            )}
          </Button>
        </Modal.Body>
      </Modal>
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
            company={underAction}
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
          <Modal.Title>Are you sure you want to delete this company?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => dispatch(DeleteCompany(underAction!, handleComplete))}
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
