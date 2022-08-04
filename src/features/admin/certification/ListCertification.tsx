import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { flatten } from 'lodash';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Table from 'components/Table';
import { RootState } from 'app/store';
import ManageCertification from './ManageCertification';
import CSVReader from 'components/CSVReader';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  addCertification,
  listCertifications,
  Certification,
  deleteCertification,
} from './certificationSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListCertifications = () => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<string>('list');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [underAction, setUnderAction] = useState<Certification>();
  const { certifications, status, message } = useAppSelector(
    (state: RootState) => state.certification,
  );

  useEffect(() => {
    dispatch(listCertifications(handleComplete));
  }, [dispatch]);

  const handleParse = (data: any, onComplete: () => void) => {
    setAction('csv');
    dispatch(addCertification(flatten(data), handleComplete));
    onComplete();
  };

  const handleEdit = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('edit');
      setUnderAction(certifications[ID]);
    },
    [certifications],
  );

  const handleDelete = useCallback(
    (ID: string) => {
      setShowModal(true);
      setAction('delete');
      setUnderAction(certifications[ID]);
    },
    [certifications],
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

  const certificationColumns = useMemo(
    () => [
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>S.No</div>,
        accessor: 'sr',
        Cell: (row: any) => <div>{row.value}</div>,
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 text-left pr-2'>Certification Name</div>,
        accessor: 'certification',
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

  const certificationData = useMemo(
    () =>
      certifications &&
      Object.values(certifications).map((certification, key) => {
        return {
          sr: (key + 1).toString(),
          certification: certification.name,
          action: actionButtons(certification.ID),
        };
      }),
    [certifications, actionButtons],
  );

  const exportCSV = useMemo(
    () =>
      certifications &&
      Object.values(certifications).map((certification) => {
        const { name, createdAt } = certification;
        return {
          Name: name,
          'Added On': createdAt,
        };
      }),
    [certifications],
  );

  return (
    <React.Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6'>
            <ManageCertification
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
              tableTitle='Certification List'
              columns={certificationColumns}
              data={certificationData ?? []}
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
          <ManageCertification
            status={action === 'edit' ? status : ''}
            message={action === 'edit' ? message : ''}
            actionType={action}
            certification={underAction}
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
          <Modal.Title>Are you sure you want to delete this Certification?</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-right'>
          <Button variant='default outline-secondary' onClick={handleComplete}>
            Cancel
          </Button>
          <Button
            variant='danger'
            onClick={() => dispatch(deleteCertification(underAction!, handleComplete))}
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

export default ListCertifications;
