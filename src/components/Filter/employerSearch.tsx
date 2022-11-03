import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const EmployerSearchFilter = () => {
    const [percentage, setPercentage] = React.useState({
        behavioral: 0,
        cognitive: 0,
        functional: 0,
        experience: 0,
    });

    const { behavioral, cognitive, functional, experience } = percentage;

    return (
        <div className='rt-part'>
            <div className='filter-wrapper'>
                <div className='filter-heading'>
                    <span>Filters</span>
                    <button type='submit' className='reset-txt-btn'>
                        Reset
                    </button>
                </div>
                <div className='filter-widget mt-4 pb-1 sr-green'>
                    <h3 className='filter-widget-heading mb-2'>Experience</h3>
                    <div className='slidecontainer'>
                        <Slider
                            min={0}
                            max={100}
                            value={behavioral}
                            onChange={(value) => setPercentage({ ...percentage, behavioral: value as number })}
                        />
                        <span>{behavioral}</span>
                        <div className='rg-slider-text'>
                            <span className='small'>0</span>
                            <span className='small'>100</span>
                        </div>
                    </div>
                </div>
                <div className='filter-widget mt-4 pb-1'>
                    <h3 className='filter-widget-heading mb-2'>Opportunity Type</h3>
                    <div className='custom-control custom-checkbox'>
                        <input type='checkbox' className='custom-control-input' id='st1' name='' />
                        <label className='custom-control-label' htmlFor='st1'>
                            Job
                        </label>
                    </div>
                    <div className='custom-control custom-checkbox'>
                        <input type='checkbox' className='custom-control-input' id='st2' name='' />
                        <label className='custom-control-label' htmlFor='st2'>
                            Internship
                        </label>
                    </div>
                    {/* <div className='custom-control custom-checkbox'>
                        <input type='checkbox' className='custom-control-input' id='st3' name='' />
                        <label className='custom-control-label' htmlFor='st3'>
                            Competition
                        </label>
                    </div> */}
                </div>
                <div className="filter-widget mt-4 pb-1">
                    <h3 className="filter-widget-heading mb-2">Opportunity Type</h3>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="ot1" name="" />
                        <label className="custom-control-label" htmlFor="ot1">Job</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="ot2" name="" />
                        <label className="custom-control-label" htmlFor="ot2">Internship</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="ot3" name="" />
                        <label className="custom-control-label" htmlFor="ot3">Competitions</label>
                    </div>
                </div>
                <div className="filter-widget mt-4 pb-1">
                    <h3 className="filter-widget-heading mb-2">Employment Type</h3>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="et1" name="" />
                        <label className="custom-control-label" htmlFor="et1">Full-time (4)</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="et2" name="" />
                        <label className="custom-control-label" htmlFor="et2">Part-time (4)</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="et3" name="" />
                        <label className="custom-control-label" htmlFor="et3">Contract (4)</label>
                    </div>
                </div>
                <div className="filter-widget mt-4 pb-1">
                    <h3 className="filter-widget-heading mb-2">Domain(s)</h3>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="dmn1" name="" />
                        <label className="custom-control-label" htmlFor="dmn1">Sales &amp; Marketing</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="dmn2" name="" />
                        <label className="custom-control-label" htmlFor="dmn2">Product Management</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="dmn3" name="" />
                        <label className="custom-control-label" htmlFor="dmn3">DevOps &amp; Tech.</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="dmn4" name="" />
                        <label className="custom-control-label" htmlFor="dmn4">Finance</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="dmn5" name="" />
                        <label className="custom-control-label" htmlFor="dmn5">HR</label>
                    </div>
                    <button className="text-link mt-1">+3 more</button>
                </div>
                <div className="filter-widget mt-4 pb-1">
                    <h3 className="filter-widget-heading mb-2">Status</h3>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="st1" name="" />
                        <label className="custom-control-label" htmlFor="st1">Active</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="st2" name="" />
                        <label className="custom-control-label" htmlFor="st2">Under Review</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="st3" name="" />
                        <label className="custom-control-label" htmlFor="st3">Rejected</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="st4" name="" />
                        <label className="custom-control-label" htmlFor="st4">Need Actions</label>
                    </div>
                </div>
                <div className="filter-widget mt-4 pb-1">
                    <h3 className="filter-widget-heading mb-2">Salary Range</h3>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="sr1" name="" />
                        <label className="custom-control-label" htmlFor="sr1">0-3 Lakhs</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="sr2" name="" />
                        <label className="custom-control-label" htmlFor="sr2">3-6 Lakhs</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="sr3" name="" />
                        <label className="custom-control-label" htmlFor="sr3">6-10 Lakhs</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="sr4" name="" />
                        <label className="custom-control-label" htmlFor="sr4">10-15 Lakhs</label>
                    </div>
                    <button className="text-link mt-1">+3 more</button>
                </div>
            </div>
        </div>
    );
};

export default EmployerSearchFilter;
