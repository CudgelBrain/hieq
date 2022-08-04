import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Table, { SelectFilter } from 'components/Table';
import { RootState } from 'app/store';
import { formatDate } from 'utils';
import { HIEQ_SERVICE_URL } from 'constant';
import ManageCompany from './ManageItem';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ListDomains, MultipleDomain, DeleteDomain } from './itemSlice';

const ListItems = () => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<string>('list');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [underAction, setUnderAction] = useState<MultipleDomain>();
  const { domains, status, message } = useAppSelector((state: RootState) => state.domain);

  useEffect(() => {
    dispatch(ListDomains(handleComplete));
  }, [dispatch]);

  const handleEdit = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('edit');
      setUnderAction(domains[ID]);
    },
    [domains],
  );

  const handleDelete = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('delete');
      setUnderAction(domains[ID]);
    },
    [domains],
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

  const domainColumns = useMemo(
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
              href={`${HIEQ_SERVICE_URL}/multipleDomain/${row.value}`}
              target='_blank'
              rel='noreferrer'
            >
              <img
                className='img-fluid'
                src={`${HIEQ_SERVICE_URL}/multipleDomain/${row.value}`}
                width='200'
                alt={row.value}
              />
            </a>
          </div>
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

  const domainData = useMemo(
    () =>
      domains &&
      Object.values(domains).map((domain, key) => {
        const { ID, name, fileName, isActive, createdAt } = domain;
        return {
          sr: (key + 1).toString(),
          name,
          fileName,
          isActive,
          createdAt,
          addedBy: 'Admin',
          action: actionButtons(ID),
        };
      }),
    [domains, actionButtons],
  );

  const exportCSV = useMemo(
    () =>
      domains &&
      Object.values(domains).map((domain) => {
        const { name, isActive, createdAt } = domain;
        return {
          Name: name,
          status: isActive,
          addedBy: 'Admin',
          'Added On': formatDate(createdAt),
        };
      }),
    [domains],
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
              tableTitle='Multiple Domain List'
              columns={domainColumns}
              data={domainData ?? []}
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
            multipleDomain={underAction}
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
          <Modal.Title>Are you sure you want to delete this domain?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => dispatch(DeleteDomain(underAction!, handleComplete))}
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
