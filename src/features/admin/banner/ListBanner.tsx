import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { RootState } from 'app/store';
import Table, { SelectFilter } from 'components/Table';
import { formatDate } from 'utils';
import { HIEQ_SERVICE_URL } from 'constant';
import ManageBanner from './ManageBanner';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff, faTrash } from '@fortawesome/free-solid-svg-icons';
import { addBanner, Banner, deleteBanner, editBanner, listBanners } from './bannerSlice';

const ListBanners = () => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<string>('list');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [underAction, setUnderAction] = useState<Banner>();
  const { banners, status, message } = useAppSelector((state: RootState) => state.banner);

  useEffect(() => {
    dispatch(listBanners(handleComplete));
  }, [dispatch]);

  const handleUpload = (file: FormData, onComplete: () => void) => {
    setAction('upload');
    dispatch(addBanner(file, handleComplete));
    onComplete();
  };

  const handleEdit = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('edit');
      setUnderAction(banners[ID]);
    },
    [banners],
  );

  const handleDelete = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('delete');
      setUnderAction(banners[ID]);
    },
    [banners],
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

  const bannerColumns = useMemo(
    () => [
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>S.No</div>,
        accessor: 'sr',
        Cell: (row: any) => <div>{row.value}</div>,
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Banner (Desktop)</div>,
        accessor: 'desktopFilename',
        Cell: (row: any) => (
          <div className='text-left'>
            <a href={`${HIEQ_SERVICE_URL}/banner/${row.value}`} target='_blank' rel='noreferrer'>
              <img
                className='img-fluid'
                src={`${HIEQ_SERVICE_URL}/banner/${row.value}`}
                width='200'
                alt={row.value}
              />
            </a>
          </div>
        ),
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Banner (Mobile)</div>,
        accessor: 'mobileFilename',
        Cell: (row: any) => (
          <div className='text-left'>
            <a href={`${HIEQ_SERVICE_URL}/banner/${row.value}`} target='_blank' rel='noreferrer'>
              <img
                className='img-fluid'
                src={`${HIEQ_SERVICE_URL}/banner/${row.value}`}
                width='200'
                alt={row.value}
              />
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
        accessor: 'isActive',
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
        accessor: 'createdAt',
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

  const bannerData = useMemo(
    () =>
      banners &&
      Object.values(banners).map((banner, key) => {
        const { ID, desktopFilename, mobileFilename, isActive, createdAt } = banner;
        return {
          sr: (key + 1).toString(),
          desktopFilename,
          mobileFilename,
          isActive,
          createdAt,
          addedBy: 'Admin',
          action: actionButtons(ID, isActive),
        };
      }),
    [banners, actionButtons],
  );

  return (
    <React.Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <ManageBanner
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
              tableTitle='Banner List'
              columns={bannerColumns}
              data={bannerData ?? []}
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
          } this banner?`}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => dispatch(editBanner(underAction!, handleComplete))}
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
          <Modal.Title>Are you sure you want to delete this banner?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => dispatch(deleteBanner(underAction!, handleComplete))}
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

export default ListBanners;
