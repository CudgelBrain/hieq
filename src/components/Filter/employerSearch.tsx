import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { listDomains } from 'features/admin/domain/itemAPI';
import { capitalize, forEach, isEmpty, map, orderBy, debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ListSearchFilteredOpportunities, } from 'features/employer/postOpportunity/postOpportunitySlice';


let opportunityDomains: readonly String[] = [];
const getOpportunityDomains = async () => {
    const { data } = await listDomains();
    opportunityDomains = map(data.items, ({ name }) => name);
};
const EmployerSearchFilter = () => {
    const dispatch = useAppDispatch();
    const [employType, setEmployType] = React.useState<string[]>([])
    const [category, setCategory] = React.useState<string[]>([])
    const [domain, setDomain] = React.useState<string[]>([])
    // const [salary, setSalary] = React.useState<string[]>([])
    const [status, setStatus] = React.useState<string[]>([])
    const [percentage, setPercentage] = React.useState({
        experience: 0,
        salary: 0,
    });
    const { experience, salary } = percentage;
    React.useEffect(() => {
        getOpportunityDomains();
    }, []);
    React.useEffect(
        () => dispatch(ListSearchFilteredOpportunities(category, domain, status, employType, salary, experience)),
        [dispatch, category, employType, domain, salary, status, experience],
    );
    const handleJob = (e: React.FormEvent<EventTarget>): void => {
        let target = e.target as HTMLInputElement;
        if (target.checked) {
            setCategory([...category, target.value])
        } else {
            setCategory(category.filter((item) => item !== target.value))
        }
    }
    const handleEmployType = (e: React.FormEvent<EventTarget>): void => {
        let target = e.target as HTMLInputElement;
        if (target.checked) {
            setEmployType([...employType, target.value])
        } else {
            setEmployType(employType.filter((item) => item !== target.value))
        }
    }
    // const handleSalary = (e: React.FormEvent<EventTarget>): void => {
    //     let target = e.target as HTMLInputElement;
    //     if (target.checked) {
    //         setSalary([...salary, target.value])
    //     } else {
    //         setSalary(salary.filter((item) => item !== target.value))
    //     }
    // }
    const handleDomain = (e: React.FormEvent<EventTarget>): void => {
        let target = e.target as HTMLInputElement;
        if (target.checked) {
            setDomain([...domain, target.value])
        } else {
            setDomain(domain.filter((item) => item !== target.value))
        }
    }
    const handleStatus = (e: React.FormEvent<EventTarget>): void => {
        let target = e.target as HTMLInputElement;
        if (target.checked) {
            setStatus([...status, target.value])
        } else {
            setStatus(status.filter((item) => item !== target.value))
        }
    }
    const setInitialState = () => {
        // setSalary([])
        setEmployType([])
        setStatus([])
        setCategory([])
        setDomain([])
        setPercentage({ experience: 0, salary: 0 })
    }
    // console.log("hello", experience, category, employType, domain, salary, status);

    return (
        <div className='rt-part'>
            <div className='filter-wrapper'>
                <div className='filter-heading'>
                    <span>Filters</span>
                    <button type='submit' className='reset-txt-btn' onClick={setInitialState}>
                        Reset
                    </button>
                </div>
                <div className='filter-widget mt-4 pb-1 sr-green'>
                    <h3 className='filter-widget-heading mb-2'>Experience</h3>
                    <div className='slidecontainer'>
                        <Slider
                            min={0}
                            max={100}
                            value={experience}
                            onChange={(value) => setPercentage({ ...percentage, experience: value as number })}
                        />
                        <span>{experience}</span>
                        <div className='rg-slider-text'>
                            <span className='small'>0</span>
                            <span className='small'>100</span>
                        </div>
                    </div>
                </div>
                <div className="filter-widget mt-4 pb-1">
                    <h3 className="filter-widget-heading mb-2">Opportunity Type</h3>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="ot1" name="" checked={category.includes("job")} value="job" onClick={handleJob} />
                        <label className="custom-control-label" htmlFor="ot1">Job</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="ot2" name="" checked={category.includes("internship")} value="internship" onClick={handleJob} />
                        <label className="custom-control-label" htmlFor="ot2">Internship</label>
                    </div>
                    {/* <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="ot3" name="" />
                        <label className="custom-control-label" htmlFor="ot3">Competitions</label>
                    </div> */}
                </div>
                <div className="filter-widget mt-4 pb-1">
                    <h3 className="filter-widget-heading mb-2">Employment Type</h3>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="et1" name="" checked={employType.includes("fullTime")} value="fullTime" onClick={handleEmployType} />
                        <label className="custom-control-label" htmlFor="et1">Full-time (4)</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="et2" name="" checked={employType.includes("partTime")} value="partTime" onClick={handleEmployType} />
                        <label className="custom-control-label" htmlFor="et2">Part-time (4)</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="et3" name="" checked={employType.includes("contract")} value="contract" onClick={handleEmployType} />
                        <label className="custom-control-label" htmlFor="et3">Contract (4)</label>
                    </div>
                </div>
                <div className="filter-widget mt-4 pb-1">
                    <h3 className="filter-widget-heading mb-2">Domain(s)</h3>
                    {opportunityDomains.map((item) => (
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="dmn1" name="" checked={domain.includes(item + "")} value={item + ""} onClick={handleDomain} />
                            <label className="custom-control-label" htmlFor="dmn1">{item}</label>
                        </div>
                    ))}
                    {/* <button className="text-link mt-1">+3 more</button> */}
                    {/* <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="dmn2" name="" value="ProductManagement" onClick={handleDomain} />
                        <label className="custom-control-label" htmlFor="dmn2">Product Management</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="dmn3" name="" value="DevOps" onClick={handleDomain} />
                        <label className="custom-control-label" htmlFor="dmn3">DevOps &amp; Tech.</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="dmn4" name="" value="Finanace" onClick={handleDomain} />
                        <label className="custom-control-label" htmlFor="dmn4">Finance</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="dmn5" name="" value="HR" onClick={handleDomain} />
                        <label className="custom-control-label" htmlFor="dmn5">HR</label>
                    </div> */}
                </div>
                <div className="filter-widget mt-4 pb-1">
                    <h3 className="filter-widget-heading mb-2">Status</h3>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="st1" name="" checked={status.includes("active")} value="active" onClick={handleStatus} />
                        <label className="custom-control-label" htmlFor="st1">Active</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="st2" name="" checked={status.includes("draft")} value="draft" onClick={handleStatus} />
                        <label className="custom-control-label" htmlFor="st2">Under Review</label>
                    </div>
                    {/* <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="st3" name="" value="rejected" onClick={handleStatus} />
                        <label className="custom-control-label" htmlFor="st3">Rejected</label>
                    </div> */}
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="st4" name="" checked={status.includes("closed")} value="closed" onClick={handleStatus} />
                        <label className="custom-control-label" htmlFor="st4">Closed</label>
                    </div>
                </div>
                <div className='filter-widget mt-4 pb-1 sr-green'>
                    <h3 className='filter-widget-heading mb-2'>Experience</h3>
                    <div className='slidecontainer'>
                        <Slider
                            min={0}
                            max={1000000}
                            value={salary}
                            onChange={(value) => setPercentage({ ...percentage, salary: value as number })}
                        />
                        <span>{salary}</span>
                        <div className='rg-slider-text'>
                            <span className='small'>0</span>
                            <span className='small'>10 Lack</span>
                        </div>
                    </div>
                </div>
                {/* <div className="filter-widget mt-4 pb-1">
                    <h3 className="filter-widget-heading mb-2">Salary Range</h3>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="sr1" name="" value="0-3" onClick={handleSalary} />
                        <label className="custom-control-label" htmlFor="sr1">0-3 Lakhs</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="sr2" name="" value="3-6" onClick={handleSalary} />
                        <label className="custom-control-label" htmlFor="sr2">3-6 Lakhs</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="sr3" name="" value="6-10" onClick={handleSalary} />
                        <label className="custom-control-label" htmlFor="sr3">6-10 Lakhs</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="sr4" name="" value="10-15" onClick={handleSalary} />
                        <label className="custom-control-label" htmlFor="sr4">10-15 Lakhs</label>
                    </div>
                    <button className="text-link mt-1">+3 more</button>
                </div> */}
            </div>
        </div>
    );
};

export default EmployerSearchFilter;
