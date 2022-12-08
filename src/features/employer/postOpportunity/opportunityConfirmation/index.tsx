import React, { useState, useEffect } from 'react';
import { history } from 'utils';
import { capitalize, forEach, isEmpty, map, orderBy, debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Opportunity, EditOpportunity, FinishOpportunity } from '../postOpportunitySlice';
import { getOpportunity } from '../postOpportunityAPI';
import { useParams } from 'react-router-dom';
import { WorkLocationSchema } from 'features/admin/workLocation/itemSlice';
import { url } from 'inspector';
// interface Props {
//     category: string;
//     opportunity: Record<string, any>;
//     ref: React.RefObject<HTMLFormElement>;
//   }
const oppConfirmation = React.forwardRef<HTMLFormElement>(() => {
    const [opportunity, setOpportunity] = useState<Opportunity>()
    const { ID } = useParams<{ ID?: string }>();
    useEffect(() => {
        if (ID !== undefined) {
            getData(ID)
        }
    }, [ID]);
    const getData = async (id: string) => {
        let data = await getOpportunity(id);
        if (!isEmpty(data) && !isEmpty(data.data)) {
            setOpportunity(data.data)
        }
    }
    const handleEditButton = () => {
        history.push(`/employer/postOpportunity/${opportunity?.category}/${ID}`)
    }
    const dispatch = useAppDispatch();
    const handleOnSubmit = () => {
        if (ID) {
            dispatch(
                FinishOpportunity(ID),
            );

        }
    };

    return (
        <div className="col-md-12 pt-4 pb-2">
            <div className="text-left mb-4">
                <div className="pg-title">Post a Job</div>
                <div className="lead">Need assistance? Please visit <a href="#" className="link">Help Center</a></div>
            </div>
            <div className="box-container mb-4">
                <div className="box-container-inner pb-3">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="bc-heading fw-500 txt-yl mb-3">1. Basic Details
                                <button type="button" onClick={handleEditButton}
                                    className="text-link edit-btn ico-yl ml-2"><svg width="16" height="16" viewBox="0 0 16 16"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.10988 10.51L6.14088 12.26L9.64088 6.19796L6.61088 4.44796L3.11088 10.511L3.10988 10.51ZM2.73688 11.45L3.25088 13.767L5.51488 13.053L2.73688 11.45ZM7.10988 3.58196L10.1399 5.33196L11.0259 3.79896L7.99488 2.04896L7.10988 3.58196V3.58196ZM1.62988 11.075L7.62988 0.68396L12.3919 3.43296L6.39288 13.825H6.39388L2.51188 15.049L1.62988 11.075ZM7.62988 15.048V14.048H14.6299V15.048H7.62988V15.048Z"
                                            fill="white" />
                                    </svg> Edit</button></h2>
                        </div>
                        <div className="col-12 mb-5">
                            <ul className="nolist">
                                <li>
                                    <div className="tb-head">Job Title</div>
                                    <div className="tb-data">{opportunity?.stepOne.opportunityTitle}</div>
                                </li>
                                <li>
                                    <div className="tb-head">Job Domain</div>
                                    <div className="tb-data">{opportunity?.stepOne.opportunityDomain}</div>
                                </li>
                                <li>
                                    <div className="tb-head">Job Type</div>
                                    <div className="tb-data">{opportunity?.stepOne.opportunityType}</div>
                                </li>
                                <li>
                                    <div className="tb-head">Location Type</div>
                                    <div className="tb-data">{opportunity?.stepOne.locationType}</div>
                                </li>
                                {
                                    opportunity?.stepOne.locationType !== "WFH" ?
                                        <li>
                                            <div className="tb-head">Job Location</div>
                                            <div className="tb-data">{opportunity?.stepOne.locations.map((item: string, index: number) => (index !== opportunity?.stepOne.locations.length - 1) ? `${item}, ` : `${item}`)}</div>
                                        </li> : ""
                                }
                                <li>
                                    <div className="tb-head">No. of Openings</div>
                                    <div className="tb-data">{opportunity?.stepOne.openings}</div>
                                </li>
                                <li>
                                    <div className="tb-head">Start Date & Time</div>
                                    <div className="tb-data">{opportunity?.opportunityStartDate}</div>
                                </li>
                                <li>
                                    <div className="tb-head">End Date & Time</div>
                                    <div className="tb-data">{opportunity?.opportunityEndDate}</div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12">
                            <h2 className="bc-heading fw-500 txt-yl mb-3">2. Job Description
                                <button type="button" onClick={handleEditButton}
                                    className="text-link edit-btn ico-yl ml-2"><svg width="16" height="16" viewBox="0 0 16 16"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.10988 10.51L6.14088 12.26L9.64088 6.19796L6.61088 4.44796L3.11088 10.511L3.10988 10.51ZM2.73688 11.45L3.25088 13.767L5.51488 13.053L2.73688 11.45ZM7.10988 3.58196L10.1399 5.33196L11.0259 3.79896L7.99488 2.04896L7.10988 3.58196V3.58196ZM1.62988 11.075L7.62988 0.68396L12.3919 3.43296L6.39288 13.825H6.39388L2.51188 15.049L1.62988 11.075ZM7.62988 15.048V14.048H14.6299V15.048H7.62988V15.048Z"
                                            fill="white" />
                                    </svg> Edit</button></h2>
                        </div>
                        <div className="col-12 mb-5">
                            <ul className="nolist">
                                <li>
                                    <div className="tb-head">Job Description</div>
                                    {/* <div className="tb-data"><button className="text-link">click here to view or download</button></div> */}
                                    <div className="tb-data"><a href={opportunity?.jobDescriptionFile.url} target="_blank" className="text-link">click here to view or download</a></div>
                                </li>
                                <li>
                                    <div className="tb-head">Roles and Responsibilities</div>
                                    <div className="tb-data" dangerouslySetInnerHTML={{ __html: opportunity?.stepTwo.description ? opportunity?.stepTwo.description : "" }}>
                                        {/* {opportunity?.stepTwo.description} */}
                                    </div>

                                </li>
                                {!isEmpty(opportunity?.stepTwo.salaryDetail) ?
                                    <>
                                        <li>
                                            <div className="tb-head">Do you want to show salary details?</div>
                                            <div className="tb-data">{opportunity?.stepTwo.salaryDetail.showSalary ? "Yes" : "No"}</div>
                                        </li>
                                        <li>
                                            <div className="tb-head">Salary Details</div>
                                            {opportunity?.stepTwo.salaryDetail.salaryType == "fixed" ?
                                                <div className="tb-data">{`${opportunity?.stepTwo.salaryDetail.fixedAmount} (Per ${opportunity?.stepTwo.salaryDetail.cycle})`}</div>
                                                :
                                                <div className="tb-data">{`${opportunity?.stepTwo.salaryDetail.minAmount} To ${opportunity?.stepTwo.salaryDetail.maxAmount} (Per ${opportunity?.stepTwo.salaryDetail.cycle})`}</div>
                                            }
                                        </li>
                                        <li>
                                            <div className="tb-head">Currency</div>
                                            <div className="tb-data">{opportunity?.stepTwo.salaryDetail.currency}</div>
                                        </li>
                                        <li>
                                            <div className="tb-head">Does it include variable component?</div>
                                            {opportunity?.stepTwo.salaryDetail.variableType == "fixed" ?
                                                <div className="tb-data">{opportunity?.stepTwo.salaryDetail.variablePercentage} (Per {opportunity?.stepTwo.salaryDetail.variableCycle}) {opportunity?.stepTwo.salaryDetail.variableCurrency}</div>
                                                :
                                                <div className="tb-data">{opportunity?.stepTwo.salaryDetail.variableMin} To {opportunity?.stepTwo.salaryDetail.variableMax} (Per {opportunity?.stepTwo.salaryDetail.variableCycle}) {opportunity?.stepTwo.salaryDetail.variableCurrency}</div>
                                            }
                                        </li>
                                        {/* <li>
                                            <div className="tb-head">Total CTC</div>
                                            <div className="tb-data">4,50,000</div>
                                        </li> */}
                                        <li>
                                            <div className="tb-head">Additional Details such as Flexible Work Hours</div>
                                            <div className="tb-data" dangerouslySetInnerHTML={{ __html: opportunity?.stepTwo.salaryDetail.additionalDetail ? opportunity?.stepTwo.salaryDetail.additionalDetail : "" }}>
                                                {/* <ul className="list">
                                            {opportunity?.stepTwo.salaryDetail.additionalDetail}
                                        </ul> */}
                                            </div>
                                        </li>
                                    </> : ""
                                }
                                {!isEmpty(opportunity?.stepTwo.stipendDetail) ?
                                    <>
                                        <li>
                                            <div className="tb-head">Do you want to show stipend details?</div>
                                            <div className="tb-data">{opportunity?.stepTwo.stipendDetail.showSalary ? "Yes" : "No"}</div>
                                        </li>
                                        <li>
                                            <div className="tb-head">Stipend Details</div>
                                            {opportunity?.stepTwo.stipendDetail.stipendType == "fixed" ?
                                                <div className="tb-data">{`${opportunity?.stepTwo.stipendDetail.fixedAmount} (Per ${opportunity?.stepTwo.stipendDetail.cycle})`}</div>
                                                : opportunity?.stepTwo.stipendDetail.stipendType == "negotiable" ?
                                                    <div className="tb-data">{`${opportunity?.stepTwo.stipendDetail.minAmount}-${opportunity?.stepTwo.stipendDetail.maxAmount} (Per ${opportunity?.stepTwo.stipendDetail.cycle})`}</div>
                                                    : opportunity?.stepTwo.stipendDetail.stipendType == "performanceBased" ?
                                                        <div className="tb-data">{`${opportunity?.stepTwo.stipendDetail.minAssuredAmount}-${opportunity?.stepTwo.stipendDetail.maxAssuredAmount} (Per ${opportunity?.stepTwo.stipendDetail.cycle}) based on ${opportunity?.stepTwo.stipendDetail.scale}`}</div>
                                                        : ""

                                            }
                                        </li>
                                        <li>
                                            <div className="tb-head">Currency</div>
                                            <div className="tb-data">{opportunity?.stepTwo.stipendDetail.currency}</div>
                                        </li>
                                        {/* <li>
                                    <div className="tb-head">Does it include variable component?</div>
                                    <div className="tb-data">{opportunity?.stepTwo.stipendDetail.variablePercentage} (Yes)</div>
                                </li> */}
                                        <li>
                                            <div className="tb-head">Total CTC</div>
                                            <div className="tb-data">4,50,000</div>
                                        </li>
                                        {/* <li>
                                    <div className="tb-head">Additional Details such as Flexible Work Hours</div>
                                    <div className="tb-data" dangerouslySetInnerHTML={{ __html: opportunity?.stepTwo.stipendDetail.additionalDetail ? opportunity?.stepTwo.stipendDetail.additionalDetail : "" }}>
                                        <ul className="list">
                                            {opportunity?.stepTwo.salaryDetail.additionalDetail}
                                        </ul>
                                    </div>
                                </li> */}
                                    </> : ""
                                }
                                {/* <li>
                                    <div className="tb-head">Compensation visible to candidates</div>
                                    <div className="tb-data">{opportunity?.stepTwo.salaryDetail.visibleToCandidate ? "Yes" : "No"}</div>
                                </li> */}
                                <li>
                                    <div className="tb-head">Contact Information</div>
                                    <div className="tb-data">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Contact</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {opportunity?.stepTwo.contacts.map((item: { name: string, email: string, number: string }) => {
                                                    return (<tr>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.number}</td>
                                                    </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                                <li>
                                    <div className="tb-head">External Links </div>
                                    <div className="tb-data">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Link Title</th>
                                                    <th>Link Url</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {opportunity?.stepTwo.externalLinks && opportunity?.stepTwo.externalLinks.map((item: { url: string, title: string }) => {
                                                    return (<tr>
                                                        <td>{item.title}</td>
                                                        <td><a href={item.url} className="text-link">{item.url}</a></td>
                                                    </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                                <li>
                                    <div className="tb-head">Attachments</div>
                                    <div className="tb-data">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Attachment Title</th>
                                                    <th>Upload File</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {opportunity?.stepTwo.attachments && opportunity?.stepTwo.attachments.map((item: { file: string, title: string, url: string }) => {
                                                    return (<tr>
                                                        {console.log(item)
                                                        }
                                                        <td>{item.title}</td>
                                                        {/* <td><button className="text-link" >click here to view or download</button></td> */}
                                                        <td><a href={item.url ? item.url : item.file} target="_blank" className="text-link">click here to view or download</a></td>
                                                    </tr>
                                                        // file remainign
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12">
                            <h2 className="bc-heading fw-500 txt-yl mb-3">3. Experience & Skills
                                <button type="button" onClick={handleEditButton}
                                    className="text-link edit-btn ico-yl ml-2"><svg width="16" height="16" viewBox="0 0 16 16"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.10988 10.51L6.14088 12.26L9.64088 6.19796L6.61088 4.44796L3.11088 10.511L3.10988 10.51ZM2.73688 11.45L3.25088 13.767L5.51488 13.053L2.73688 11.45ZM7.10988 3.58196L10.1399 5.33196L11.0259 3.79896L7.99488 2.04896L7.10988 3.58196V3.58196ZM1.62988 11.075L7.62988 0.68396L12.3919 3.43296L6.39288 13.825H6.39388L2.51188 15.049L1.62988 11.075ZM7.62988 15.048V14.048H14.6299V15.048H7.62988V15.048Z"
                                            fill="white" />
                                    </svg> Edit</button></h2>
                        </div>
                        <div className="col-12 mb-5">
                            <ul className="nolist">
                                <li>
                                    <div className="tb-head">Minimum Work Experience</div>
                                    <div className="tb-data">{opportunity?.stepThree.workExperience.min.year} years {opportunity?.stepThree.workExperience.min.month} months</div>
                                </li>
                                <li>
                                    <div className="tb-head">Maximum Work Experience</div>
                                    <div className="tb-data">{opportunity?.stepThree.workExperience.max.year} years {opportunity?.stepThree.workExperience.max.month} months</div>
                                </li>
                                <li>
                                    <div className="tb-head">Preferred Educational Background</div>
                                    <div className="tb-data">{opportunity?.stepThree.qualifications.map((item: string, index: number) => (index !== opportunity?.stepThree.qualifications.length - 1) ? `${item}, ` : item)}</div>
                                </li>
                                <li>
                                    <div className="tb-head">Personal Skills</div>
                                    <div className="tb-data">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Skills Name</th>
                                                    <th>Proficiency Level</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {opportunity?.stepThree.skills.personal_skills.map((item: { title: string, level: string }) => {
                                                    return (<tr>
                                                        <td>{item.title}</td>
                                                        <td>{item.level}</td>
                                                    </tr>)

                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                                <li>
                                    <div className="tb-head">Technical Skills</div>
                                    <div className="tb-data">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Skills Name</th>
                                                    <th>Proficiency Level</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {opportunity?.stepThree.skills.technical_skills.map((item: { title: string, level: string }) => {
                                                    return (<tr>
                                                        <td>{item.title}</td>
                                                        <td>{item.level}</td>
                                                    </tr>)

                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                                <li>
                                    <div className="tb-head">Public Skills</div>
                                    <div className="tb-data">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Skills Name</th>
                                                    <th>Proficiency Level</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {opportunity?.stepThree.skills.public_skills.map((item: { title: string, level: string }) => {
                                                    return (<tr>
                                                        <td>{item.title}</td>
                                                        <td>{item.level}</td>
                                                    </tr>)

                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                                <li>
                                    <div className="tb-head">Video Resume</div>
                                    <div className="tb-data">{opportunity?.stepThree.videoResume ? "Yes" : "No"}</div>
                                </li>
                                <li>
                                    <div className="tb-head">Cover Letter</div>
                                    <div className="tb-data">{opportunity?.stepThree.coverLetter ? "Yes" : "No"}</div>
                                </li>
                                {/* <li>
                                    <div className="tb-head">Assessments</div>
                                    <div className="tb-data">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Scores</th>
                                                    <th>Behavioural</th>
                                                    <th>Cognitive</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Min.</td>
                                                    <td>{opportunity?.stepThree.assessmentScore.behavioural.min}</td>
                                                    <td>{opportunity?.stepThree.assessmentScore.cognitive.min}</td>
                                                </tr>
                                                <tr>
                                                    <td>Max.</td>
                                                    <td>{opportunity?.stepThree.assessmentScore.behavioural.max}</td>
                                                    <td>{opportunity?.stepThree.assessmentScore.cognitive.max}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={handleOnSubmit} type="submit" className="btn btn-yl btn-full btn-dn-curve">Finish & Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
})
export default oppConfirmation