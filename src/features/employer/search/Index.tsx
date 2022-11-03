import React from 'react';
import { size } from 'lodash';
import Tittle from '../Tittle';
// import BriefIntro from './BriefIntro';
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

const Search = () => {
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
        <div className='col-md-12 lt-sec-pd pt-4 pb-2'>
            <Tittle title='Functional' subTitle='(Sales &amp; Marketing)' />
            <div className='box-container mb-4'>
                <div className='box-container-inner'>
                    <div className='row align-items-center mb-4'>
                        <div className='col-md-5 bc-heading'>{`Total Applications: ${size(applicants)}`}</div>
                        <div className='col-md-7'>
                            <div className='d-flex align-items-center cc-cal justify-content-end'>
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
                    <div className='row mb-4'>

                        <div className="col-md-12">
                            <table className="table custom-table table-br opport-table"
                                cellPadding='0'
                                cellSpacing='0'>
                                <thead>
                                    <tr>
                                        <th>Opportunity Title</th>
                                        <th>Domain</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Expires On</th>
                                        <th >Applications</th>
                                        <th ></th>
                                        {/* <th width={100}>Applications</th>
                          <th width={10}></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="fw-500">Screenwriter</td>
                                        <td>Jobs</td>
                                        <td className="fw-500">DevOps</td>
                                        <td className="fw-500"><span className="cc-blue">Need Actions <span data-toggle="tooltip" data-placement="top" title="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."><img src="assets/images/question.svg" height="14" alt="" /></span></span></td>
                                        <td className="fw-500">Oct 25, 2022</td>
                                        <td className="fw-500"><a href="#" className="cc-link"><img className="mr-1" src="assets/images/view-dark.svg" height="15" alt="" />10</a></td>
                                        <td><button className="text-link"><img src="assets/images/dots-three.svg" height="24" alt="" /></button></td>
                                    </tr>
                                    <tr>
                                        <td className="fw-500">Content Development</td>
                                        <td>Internship</td>
                                        <td className="fw-500">Product Management</td>
                                        <td className="fw-500"><span className="cc-green">Active</span></td>
                                        <td className="fw-500">Jul 12, 2022</td>
                                        <td className="fw-500"><a href="#" className="cc-link"><img className="mr-1" src="assets/images/view-dark.svg" height="15" alt="" />10</a></td>
                                        <td className="th-dt-wrapper"><button className="th-dt-btn"><img src="assets/images/dots-three.svg" height="24" alt="" /></button>
                                            <div className="th-dt-list show">
                                                <button>Edit</button>
                                                <button>Delete</button>
                                            </div></td>
                                    </tr>
                                    <tr>
                                        <td className="fw-500">Email Marketing &amp; Copywriting</td>
                                        <td>Competitions</td>
                                        <td className="fw-500">Sales &amp; Marketing</td>
                                        <td className="fw-500"><span className="cc-yellow">Under Review</span></td>
                                        <td className="fw-500">Jul 12, 2022</td>
                                        <td className="fw-500"><a href="#" className="cc-link"><img className="mr-1" src="assets/images/view-dark.svg" height="15" alt="" />10</a></td>
                                        <td><button className="text-link"><img src="assets/images/dots-three.svg" height="24" alt="" /></button></td>
                                    </tr>
                                    <tr>
                                        <td className="fw-500">Full Stack Developer</td>
                                        <td>Jobs</td>
                                        <td className="fw-500">Sales &amp; Marketing</td>
                                        <td className="fw-500"><span className="cc-red">Rejected</span></td>
                                        <td className="fw-500">Jul 12, 2022</td>
                                        <td className="fw-500"><a href="#" className="cc-link"><img className="mr-1" src="assets/images/view-dark.svg" height="15" alt="" />10</a></td>
                                        <td><button className="text-link"><img src="assets/images/dots-three.svg" height="24" alt="" /></button></td>
                                    </tr>
                                    <tr>
                                        <td className="fw-500">Business Development</td>
                                        <td>Jobs</td>
                                        <td className="fw-500">Finance</td>
                                        <td className="fw-500"><span className="cc-green">Active</span></td>
                                        <td className="fw-500">Jul 12, 2022</td>
                                        <td className="fw-500"><a href="#" className="cc-link"><img className="mr-1" src="assets/images/view-dark.svg" height="15" alt="" />10</a></td>
                                        <td><button className="text-link"><img src="assets/images/dots-three.svg" height="24" alt="" /></button></td>
                                    </tr>
                                    <tr className="cc-light bg-light">
                                        <td className="fw-500">Ops. &amp; Logistics</td>
                                        <td>Jobs</td>
                                        <td className="fw-500">Sales Execuitve</td>
                                        <td className="fw-500"><span className="cc-light">closed</span></td>
                                        <td className="fw-500">Jul 12, 2022</td>
                                        <td className="fw-500"><a href="#" className="cc-link"><img className="mr-1" src="assets/images/view-dark.svg" height="15" alt="" />10</a></td>
                                        <td><button className="text-link"><img src="/assets/images/dots-three.svg" height="24" alt="" /></button></td>
                                    </tr>
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

export default Search;
