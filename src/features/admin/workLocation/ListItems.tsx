import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Table from 'components/Table';
import { RootState } from 'app/store';
import ManageItem from './ManageItem';
import CSVReader from 'components/CSVReader';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
    AddWorkLocation,
    ListWorkLocations,
    WorkLocation,
    DeleteWorkLocation,
} from './itemSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListItems = () => {
    const dispatch = useAppDispatch();
    const [action, setAction] = useState<string>('list');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [underAction, setUnderAction] = useState<WorkLocation>();
    const { worklocations, status, message } = useAppSelector(
        (state: RootState) => state.workLocation,
    );

    useEffect(() => {
        dispatch(ListWorkLocations(handleComplete));
    }, [dispatch]);

    const handleParse = (data: any, onComplete: () => void) => {
        const worklocations = data.map((row: any) => ({ name: row[0], degree: row[1] }));
        setAction('csv');
        dispatch(AddWorkLocation(worklocations, handleComplete));
        onComplete();
    };

    const handleEdit = useCallback(
        (ID: string) => {
            setShowModal(true);
            setAction('edit');
            setUnderAction(worklocations[ID]);
        },
        [worklocations],
    );

    const handleDelete = useCallback(
        (ID: string) => {
            setShowModal(true);
            setAction('delete');
            setUnderAction(worklocations[ID]);
        },
        [worklocations],
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

    const worklocationColumns = useMemo(
        () => [
            {
                Header: () => <div className='flex-grow-1 text-left pr-2'>S.No</div>,
                accessor: 'sr',
                Cell: (row: any) => <div>{row.value}</div>,
                disableFilters: true,
            },
            {
                Header: () => <div className='flex-grow-1 text-left pr-2'>Location</div>,
                accessor: 'location',
                Cell: (row: any) => <div className='text-left'>{row.value}</div>,
            },
            {
                Header: () => <div className='flex-grow-1 text-left pr-2'>Country</div>,
                accessor: 'country',
                Cell: (row: any) => <div className='text-left'>{row.value}</div>,
            },
            // {
            //     Header: () => <div className='flex-grow-1 text-left pr-2'>Created At</div>,
            //     accessor: 'createdAt',
            //     Cell: (row: any) => <div className='text-left'>{row.value}</div>,
            // },
            // {
            //     Header: () => <div className='flex-grow-1 text-left pr-2'>Status</div>,
            //     accessor: 'isActive',
            //     Cell: (row: any) => <div className='text-left'>{row.value}</div>,
            // },
            {
                Header: () => <div className='flex-grow-1 pr-2'>Action</div>,
                accessor: 'action',
                Cell: (row: any) => <div>{row.value}</div>,
                disableFilters: true,
            },
        ],
        [],
    );

    const worklocationData = useMemo(
        () =>
            worklocations &&
            Object.values(worklocations).map((item, key) => {
                const { ID, location, country } = item;
                return {
                    sr: (key + 1).toString(),
                    location,
                    country,
                    action: actionButtons(ID),
                };
            }),
        [worklocations, actionButtons],
    );

    const exportCSV = useMemo(
        () =>
            worklocations &&
            Object.values(worklocations).map((item) => {
                const { location, createdAt } = item;
                return {
                    Name: location,
                    'Added On': createdAt,
                };
            }),
        [worklocations],
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
                            tableTitle='WorkLocation List'
                            columns={worklocationColumns}
                            data={worklocationData ?? []}
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
                        worklocation={underAction}
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
                    <Modal.Title>Are you sure you want to delete this WorkLocation?</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-right'>
                    <Button variant='default outline-secondary' onClick={handleComplete}>
                        Cancel
                    </Button>
                    <Button
                        variant='danger'
                        onClick={() => dispatch(DeleteWorkLocation(underAction!, handleComplete))}
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
