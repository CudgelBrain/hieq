import React from 'react';
import { RootState } from 'app/store';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { formatDate, history } from 'utils';
import { size } from 'lodash';
import Tittle from '../Tittle';
// import BriefIntro from './BriefIntro';
import searchIcon from 'assets/images/search.svg';
import viewDark from "assets/images/view-dark.svg";
import threeDots from "assets/images/dots-three.svg"
import excelIcon from 'assets/images/excel-ico.svg';
import playIcon from 'assets/images/play-resume.svg';
import downArrowIcon from 'assets/images/down-arrow.svg';
import Opportunities from '../dashboard/Opportunity';
import moment from 'moment';
import { DeleteOpportunity } from '../postOpportunity/postOpportunitySlice';
import { setPageNo, setStatus } from 'features/employer/search/searchFilterSlice';

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
    const dispatch = useAppDispatch();
    const {
        status,
        opportunities,
        currentAction,
        pagination: { totalPages, totalItems },
    } = useAppSelector((state: RootState) => state.postOpportunity);
    const [showDetail, setShowDetail] = React.useState<boolean[]>(
        new Array(applicants.length).fill(false),
    );
    const [showOption, setShowOption] = React.useState<string>("")
    const [statuss, setStatuss] = React.useState<string>("")
    const [actionButtons, setActionButtons] = React.useState<boolean[]>(
        new Array(size(opportunities)).fill(false),
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
    const handleActionButton = (index: number) => {
        setActionButtons(
            Object.assign([...new Array(size(opportunities))], {
                [index as unknown as number]: !actionButtons[index as unknown as number],
            }),
        );
    };
    const handleDelete = (index: number, ID: string, category: string) => {
        handleActionButton(index);
        dispatch(DeleteOpportunity(category, ID));
    };
    const handleOptions = (id: string) => {
        if (showOption == id) {
            setShowOption("")
        } else {
            setShowOption(id)
        }
    }
    const handleStatusChange = (e: React.FormEvent<EventTarget>): void => {
        let target = e.target as HTMLInputElement;
        setStatuss(target.value)
        if (target.value == "") {
            dispatch(setStatus([]))
        } else {
            dispatch(setStatus([target.value]))
        }
    }

    return (
        <div className='col-md-12 pt-4 pb-2'>
            <Tittle title='Opportunity Search' subTitle='' />
            <div className='box-container mb-4'>
                <div className='box-container-inner'>
                    <div className='row align-items-center mb-4'>
                        <div className='col-md-5 bc-heading'>{`Total Applications: ${totalItems}`}</div>
                        <div className='col-md-7'>
                            <div className='d-flex align-items-center cc-cal justify-content-end'>
                                {/* <button type='submit' className='cb-btn btn-excel'>
                                    <img className='mr-2' src={excelIcon} height='22' alt='' />
                                    Export
                                </button> */}
                                {/* <div>
                                    <select className='btn-yl btn' value={statuss} onChange={handleStatusChange}>
                                        <option value="">select status</option>
                                        <option value="active">Active</option>
                                        <option value="draft">Draft</option>
                                        <option value="closed">Closed</option>
                                    </select>

                                </div> */}
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
                                    {Object.keys(opportunities).map((opp: string, index) => (
                                        <tr key={index} className={opportunities[opp].status == "closed" ? "cc-light bg-light" : ""}>
                                            <td className="fw-500">{opportunities[opp].stepOne.opportunityTitle}</td>
                                            <td>{opportunities[opp].category}</td>
                                            <td className="fw-500">{opportunities[opp].stepOne.opportunityDomain}</td>
                                            <td className="fw-500"><span className="cc-green">{opportunities[opp].status} <span data-toggle="tooltip" data-placement="top" title="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."><img src="assets/images/question.svg" height="14" alt="" /></span></span></td>
                                            <td className="fw-500">{moment(opportunities[opp].opportunityEndDate).format("MMM DD, YYYY")}</td>
                                            <td className="fw-500"><a href="#" className="cc-link"><img className="mr-1" src={viewDark} height="15" alt="" />{opportunities[opp].stepOne.openings}</a></td>
                                            <td className="th-dt-wrapper"><button className="text-link" onClick={() => handleActionButton(index as unknown as number)}><img src={threeDots} height="24" alt="" /></button>
                                                {actionButtons[index as unknown as number] && (
                                                    <div className='th-dt-list'>
                                                        <button
                                                            type='button'
                                                            onClick={() => history.push(`/employer/postOpportunity/${opportunities[opp].category}/${opp}`)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type='button'
                                                            onClick={() => handleDelete(index as unknown as number, opp, opportunities[opp].category)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>)}
                                            </td>
                                        </tr>

                                    ))}
                                    {/*<tr>
                                        <td className="fw-500">Content Development</td>
                                        <td>Internship</td>
                                        <td className="fw-500">Product Management</td>
                                        <td className="fw-500"><span className="cc-green">Active</span></td>
                                        <td className="fw-500">Jul 12, 2022</td>
                                        <td className="fw-500"><a href="#" className="cc-link"><img className="mr-1" src={viewDark} height="15" alt="" />10</a></td>
                                        <td className="th-dt-wrapper"><button className="th-dt-btn"><img src={threeDots} height="24" alt="" /></button>
                                            <div className="th-dt-list">
                                                <button>Edit</button>
                                                <button>Delete</button>
                                            </div></td>
                                    </tr>*/}
                                </tbody>
                            </table>
                        </div>
                        <div className='col-md-12 text-center pt-3'>
                            {Array.from(Array(totalPages), (e, i) => (
                                <button className='cb-btn cb-yellow mr-1'>{i + 1}</button>
                            ))}
                            {/* <button className='cb-btn cb-lightgrey mr-1'>2</button>
                            <button className='cb-btn cb-lightgrey mr-1'>3</button>
                            <button className='cb-btn cb-lightgrey mr-1'>4</button> */}
                            {totalPages > 1 ?
                                <button className='cb-btn cb-lightgrey mr-1'>Next</button> : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
