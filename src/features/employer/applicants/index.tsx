import React from 'react';
import { size } from 'lodash';
import Tittle from '../Tittle';
import BriefIntro from './BriefIntro';
import searchIcon from 'assets/images/search.svg';
import excelIcon from 'assets/images/excel-ico.svg';
import playIcon from 'assets/images/play-resume.svg';
import downArrowIcon from 'assets/images/down-arrow.svg';

const applicants = [
  {
    name: 'Nilesh Ahujha',
    behavioural: '85',
    cognitive: '65',
    functional: '85',
    status: 'Shortlisted',
  },
  {
    name: 'Rahul Ahujha',
    behavioural: '85',
    cognitive: '65',
    functional: '85',
    status: 'Shortlisted',
  },
  {
    name: 'Abhishek Ahujha',
    behavioural: '85',
    cognitive: '65',
    functional: '85',
    status: 'Shortlisted',
  },
  {
    name: 'Ayu Ahujha',
    behavioural: '85',
    cognitive: '65',
    functional: '85',
    status: 'Shortlisted',
  },
];

const Applicants = () => {
  const [showDetail, setShowDetail] = React.useState<boolean[]>(
    new Array(applicants.length).fill(false),
  );
  const [checkedState, setCheckedState] = React.useState<boolean[]>(
    new Array(applicants.length).fill(false),
  );

  const handleShowDetail = (index: number) => {
    const newState = [...showDetail];
    newState[index] = !newState[index];
    setShowDetail(newState);
  };

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { id, checked } = event.target;
    if (id === 'applicants' && index === undefined) {
      const newCheckedState = [...checkedState];
      newCheckedState.fill(checked);
      setCheckedState(newCheckedState);
    } else {
      const newCheckedState = [...checkedState];
      newCheckedState[index!] = !checkedState[index!];
      setCheckedState(newCheckedState);
    }
  };

  return (
    <div className='col-md-12 pt-4 pb-2'>
      <Tittle title='Functional' subTitle='(Sales &amp; Marketing)' />
      <div className='box-container mb-4'>
        <div className='box-container-inner'>
          <div className='row align-items-center mb-4'>
            <div className='col-md-5 bc-heading'>{`Total Applications: ${size(applicants)}`}</div>
            <div className='col-md-7'>
              <div className='d-flex align-items-center cc-cal justify-content-end'>
                <button type='submit' className='cb-btn btn-excel'>
                  <img className='mr-2' src={excelIcon} height='22' alt='' />
                  Export
                </button>
                <div className='input-group ml-2'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <button type='submit' className='icon-btn'>
                        <img src={searchIcon} height='20' alt='' />
                      </button>
                    </span>
                  </div>
                  <input
                    type='text'
                    className='form-control pl-0'
                    placeholder='Enter search here...'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row align-items-center mb-4'>
            <div className='col-md-12'>
              <ul className='applicant-list'>
                <li>
                  <div className='block'>
                    <div className='cf-large fw-600'>19</div>
                    <div className='cf-xs-small fw-500 text-uppercase'>Applied</div>
                  </div>
                </li>
                <li>
                  <div className='block bc-purple'>
                    <div className='cf-large fw-600'>07</div>
                    <div className='cf-xs-small fw-500 text-uppercase'>Shortlisted</div>
                  </div>
                </li>
                <li>
                  <div className='block bc-blue'>
                    <div className='cf-large fw-600'>04</div>
                    <div className='cf-xs-small fw-500 text-uppercase'>Interviewed</div>
                  </div>
                </li>
                <li>
                  <div className='block bc-green'>
                    <div className='cf-large fw-600'>02</div>
                    <div className='cf-xs-small fw-500 text-uppercase'>Selected</div>
                  </div>
                </li>
                <li>
                  <div className='block bc-yellow'>
                    <div className='cf-large fw-600'>05</div>
                    <div className='cf-xs-small fw-500 text-uppercase'>On Hold</div>
                  </div>
                </li>
                <li>
                  <div className='block bc-red'>
                    <div className='cf-large fw-600'>03</div>
                    <div className='cf-xs-small fw-500 text-uppercase'>Rejected</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='row mb-4'>
            <div className='col-md-12'>
              <table
                cellPadding='0'
                cellSpacing='0'
                className='table custom-table table-br applicant-table'
              >
                <thead>
                  <tr>
                    <th>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='checkbox'
                          id='applicants'
                          onChange={(event) => {
                            handleChecked(event);
                          }}
                          className='custom-control-input'
                          checked={checkedState.every((item) => item)}
                        />
                        <label className='custom-control-label pl-0' htmlFor='applicants'></label>
                      </div>
                    </th>
                    <th>Name</th>
                    <th className='text-center'>Behavioural</th>
                    <th className='text-center'>Cognitive</th>
                    <th className='text-center'>Functional</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((applicant, index) => (
                    <React.Fragment key={index + 1}>
                      <tr>
                        <td className='fw-500'>
                          <div className='custom-control custom-checkbox'>
                            <input
                              type='checkbox'
                              id={`applicant-${index + 1}}`}
                              checked={checkedState[index]}
                              className='custom-control-input'
                              onChange={(event) => handleChecked(event, index)}
                            />
                            <label
                              htmlFor={`applicant-${index + 1}}`}
                              className='custom-control-label pl-0'
                            ></label>
                          </div>
                        </td>
                        <td className='fw-600 text-dark'>
                          <div className='d-flex align-items-center'>
                            <button className='text-link'>
                              <img src={playIcon} height='25' alt='' />
                            </button>
                            <span className='ml-2'>{applicant.name}</span>
                          </div>
                        </td>
                        <td className='fw-500 text-center'>{applicant.behavioural}</td>
                        <td className='fw-500 text-center'>{applicant.cognitive}</td>
                        <td className='fw-500 text-center'>{applicant.functional}</td>
                        <td className='fw-500'>
                          <span className='cc-green'>{applicant.status}</span>
                        </td>
                        <td>
                          <button
                            className='text-link'
                            onClick={() => {
                              handleShowDetail(index);
                            }}
                          >
                            <img src={downArrowIcon} height='20' alt='' />
                          </button>
                        </td>
                      </tr>
                      {showDetail[index] && <BriefIntro />}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='col-md-12 text-center pt-3'>
              <button className='cb-btn cb-yellow mr-1'>1</button>
              <button className='cb-btn cb-lightgrey mr-1'>2</button>
              <button className='cb-btn cb-lightgrey mr-1'>3</button>
              <button className='cb-btn cb-lightgrey mr-1'>4</button>
              <button className='cb-btn cb-lightgrey mr-1'>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
