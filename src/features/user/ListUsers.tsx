import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Table, { SelectFilter } from 'components/Table';
import CSVReader from 'components/CSVReader';
import { ListUsers } from './userSlice';
import { RootState } from 'app/store';
import { formatDate } from 'utils';
import { UserEnum } from '../auth/authSlice';

const ListAllUsers = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const { profiles } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(ListUsers());
  }, [dispatch]);

  const handleCSVSuccess = (response: any) => {
    console.log(response);
  };

  const profileColumns = useMemo(
    () => [
      {
        Header: () => <div className='flex-grow-1 pr-2'>Full Name</div>,
        accessor: 'name',
        Cell: (row: any) => <div>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 pr-2'>Email Address</div>,
        accessor: 'email',
        Cell: (row: any) => <div>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 pr-2'>Contact Number</div>,
        accessor: 'phone',
        Cell: (row: any) => <div>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 pr-2'>User Type</div>,
        accessor: 'userType',
        Cell: (row: any) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        Filter: SelectFilter,
      },
      {
        Header: () => <div className='flex-grow-1 pr-2'>Company Name</div>,
        accessor: 'employerName',
        Cell: (row: any) => <div>{row.value}</div>,
      },
      {
        Header: () => <div className='flex-grow-1 pr-2'>Proof</div>,
        accessor: 'proof',
        Cell: (row: any) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 pr-2'>Verification Status</div>,
        accessor: 'verified',
        Cell: (row: any) => <div style={{ textAlign: 'center' }}>{row.value}</div>,
        disableFilters: true,
      },
      {
        Header: () => <div className='flex-grow-1 pr-2'>Registration Date</div>,
        accessor: 'createdAt',
        Cell: (row: any) => <div>{row.value}</div>,
      },
    ],
    [],
  );

  const verificationStatus = (verified: boolean, isActive: boolean) => {
    return (
      <React.Fragment>
        <span className={verified ? 'active-btn' : 'inactive-btn'}>Verified</span>
        <span className={isActive ? 'active-btn mt-2' : 'inactive-btn mt-2'}>Inactive</span>
      </React.Fragment>
    );
  };

  const profileData = useMemo(
    () =>
      profiles &&
      Object.values(profiles).map((profile) => {
        const {
          ID,
          name,
          email,
          phone,
          userType,
          verified,
          isActive,
          createdAt,
          userMeta: { employerName, otherName },
        } = profile;
        return {
          name,
          email,
          phone,
          userType,
          verified: verificationStatus(verified, isActive),
          employerName:
            userType === UserEnum.Employer
              ? employerName !== 'others'
                ? employerName
                : otherName
              : 'N/A',
          createdAt: formatDate(createdAt),
        };
      }),
    [profiles],
  );

  const exportCSV = useMemo(
    () =>
      profiles &&
      Object.values(profiles).map((profile) => {
        const {
          name,
          email,
          phone,
          userType,
          verified,
          isActive,
          createdAt,
          userMeta: { employerName, otherName },
        } = profile;
        return {
          Name: name,
          'Email Address': email,
          'Contact Number': phone,
          'User Type': userType,
          'Company Name':
            userType === UserEnum.Employer
              ? employerName !== 'others'
                ? employerName
                : otherName
              : 'N/A',
          'User Status': isActive ? 'Active' : 'Inactive',
          'Verification Status': verified ? 'Verified' : 'Unverified',
          'Registration Date': createdAt,
        };
      }),
    [profiles],
  );

  return (
    <React.Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-5'>
            <CSVReader
              sampleLink='#'
              status={status}
              message={message}
              onParse={handleCSVSuccess}
              className='grid bg-white box-shadow-light br-20'
            />
          </div>
          <div className='col-md-7'>
            <div className='grid bg-white box-shadow-light br-20'>
              <table width='100%' className='table table-bordered table-hover'>
                <tbody>
                  <tr>
                    <th>&nbsp;</th>
                    <th>
                      <strong>Verified</strong>
                    </th>
                    <th>
                      <strong>Unverified</strong>
                    </th>
                    <th>
                      <strong>Total</strong>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <strong>Employers</strong>
                    </td>
                    <td>1000</td>
                    <td>40</td>
                    <td>1040</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Organizers</strong>
                    </td>
                    <td>500</td>
                    <td>10</td>
                    <td>510</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Applicants/Employees</strong>
                    </td>
                    <td>2500</td>
                    <td>18</td>
                    <td>2518</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>4000</td>
                    <td>68</td>
                    <td>
                      <strong>4068</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <Table
              status={status}
              filter={true}
              sorting={true}
              paginate={true}
              itemCount={true}
              exportCSV={exportCSV}
              tableTitle='Users List'
              columns={profileColumns}
              data={profileData ?? []}
              className='grid bg-white box-shadow-light br-20'
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ListAllUsers;
