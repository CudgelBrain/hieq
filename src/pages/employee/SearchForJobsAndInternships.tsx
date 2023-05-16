import React from 'react';
import Select from 'react-select';
import JobBoxSection from './JobBoxSection';
import searchWhite from 'assets/images/search-white.svg';
import filter from 'assets/images/filter.svg';

const SearchForJobsAndInternships = () => {
 
  const datePosted = [
    { value: 'Today',label:'Today'},
  { value: 'Yesterday',label:'Yesterday'},
  { value: 'This Week' ,label:'This Week'},
  { value: 'This Month' ,label:'This Month'}
  ]

  const oppotunityType =[
    { value: 'Full TIme', label: 'Full TIme' },
    { value: 'Part-Time', label: 'Part-Time' },
    { value: 'Hybrid', label: 'Hybrid' },
    { value: 'Work from Home', label: 'Work from Home' }
  ]

  const location =[
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Gurgaon, Haryana', label: 'Gurgaon, Haryana' },
    { value: 'Jaipur', label: 'Jaipur' },
    { value: 'Banglore', label: 'Banglore' }
  ]
  
  const domain =[
    { value: 'Software Development', label: 'Software Development' },
    { value: 'Ui & UX Designer', label: 'Ui & UX Designer' },
  ]

  const industry =[
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Research Technology', label: 'Research Technology' }
  ]

  const skills =[
    { value: 'Java', label: 'Java' },
    { value: 'HTML5', label: 'HTML5' },
    { value: 'SCSS', label: 'SCSS' },
    { value: 'CSS 3.0', label: 'CSS 3.0' }
  ]
  
  const organisationType =[
    { value: 'Medium Scale', label: 'Medium Scale' },
    { value: 'Large Scale', label: 'Large Scale' },
  ]
  
  const education =[
    { value: 'B.Tech', label: 'B.Tech' },
    { value: 'BBA', label: 'BBA' },
    { value: 'MBA', label: 'MBA' },
    { value: 'M.Tech', label: 'M.Tech' }
  ]

  const salaryRange =[
    { value: '8-12 Lakhs', label: '8-12 Lakhs' },
    { value: '15-18 Lakhs', label: '15-18 Lakhs' },
  ]

  const workMode =[
    {value:"Hybrid", label:"Hybrid"}
  ]

  const recommended =[
    {value:"Recommended", label:"Recommended"},
    {value:"Low to High", label:"Low to High"},
    {value:"High to Low", label:"High to Low"}
  ]


  return (
    <>
      <div className='dash-wrapper empl-panel'>
        <main>
          <section className='main-wrapper'>
            <div className='container-fluid'>
              <div className='row position-relative'>
                <div className='col-md-'>
                  <div className='d-flex align-items-start lt-wrapper'>
                    <div className='rt-part'>
                      <div className='filter-wrapper'>
                        <div className='filter-heading'>
                          {' '}
                          <span>Filters</span>
                          <button type='submit' className='reset-txt-btn'>
                            Reset
                          </button>
                        </div>
                        <div className='filter-widget mt-3 pb-1'>
                          <h3 className='filter-widget-heading mb-2'>Experience</h3>
                          <div className='slidecontainer'>
                            <input
                              type='range'
                              min='1'
                              max='100'
                              value='15'
                              className='slider'
                              id='myRange'
                              onChange  ={e => console.log(e)}
                            />
                            <div className='rg-slider-text'>
                              {' '}
                              <span className='small'>0 yrs</span>
                              <span className='small'>30+ yrs</span>
                            </div>
                          </div>
                        </div>
                        <div className='filter-widget mt-3 pb-1'>
                          <h3 className='filter-widget-heading'>Date Posted</h3>
                          <Select options={datePosted} placeholder="Today" />
                        </div>
                        <div className='filter-widget mt-3 pb-1'>
                          <h3 className='filter-widget-heading'>Opportunity type</h3>
                          <Select options={oppotunityType} placeholder="Nothing-Selected"/>
                        </div>
                        <div className='filter-widget mt-3 pb-1'>
                          <h3 className='filter-widget-heading'>Location</h3>
                          <Select options={location} placeholder="Nothing-Selected"/>
                        </div>
                        <div className='filter-widget mt-3 pb-1'>
                          <h3 className='filter-widget-heading'>Domain</h3>
                          <Select options={domain} placeholder="Nothing-Selected"/>
                        </div>
                        <div className='filter-widget mt-3 pb-1'>
                          <h3 className='filter-widget-heading'>Industry</h3>
                          <Select options={industry} placeholder="Nothing-Selected"/>
                        </div>
                        <div className='filter-widget mt-3 pb-1'>
                          <h3 className='filter-widget-heading'>Skills</h3>
                          <Select options={skills} placeholder="Nothing-Selected"/>
                        </div>
                        <div className='filter-widget mt-3 pb-1'>
                          <h3 className='filter-widget-heading'>Organization type</h3>
                          <Select options={organisationType} placeholder="Nothing-Selected"/>
                        </div>
                        <div className='filter-widget mt-3 pb-1'>
                          <h3 className='filter-widget-heading'>Education</h3>
                          <Select options={education} placeholder="Nothing-Selected"/>
                        </div>
                        <div className='filter-widget mt-3 pb-1'>
                          <h3 className='filter-widget-heading'>Salary Range</h3>
                          <Select options={salaryRange} placeholder="Nothing-Selected"/>
                        </div>
                        <div className='filter-widget mt-3 pb-1'>
                          <h3 className='filter-widget-heading'>Work Mode</h3>
                          <Select options={workMode} placeholder="Nothing-Selected"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-md-10 pt-4 pb-2' style={{ marginLeft: '15% ' }}>
                  <div className='box-container mb-4'>
                    <div className='box-container-inner'>
                      <div className='text-left mb-4'>
                        <h2 className='bc-heading'>Search for jobs and internships.</h2>
                      </div>
                      <div className='text-center d-flex align-items-center mb-4'>
                        <div className='job-search-group flex-grow-1'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Job title, skills, company'
                            onChange  ={e => console.log(e)}
                          />
                          <input type='text' className='form-control' placeholder='Location' onChange  ={e => console.log(e)}
/>
                          <button type='submit' className='btn btn-yl btn-rd-37h'>
                            <img src={searchWhite} width='30' alt='' />
                          </button>
                        </div>
                        <button type='submit' title='Filter' className='btn btn-link btn-md ml-3'>
                          <img src={filter} width='30' alt='' />
                        </button>
                      </div>
                      <div className='mb-4'>
                        <div className='d-flex align-items-center font14 bt-1 pt-3'>
                          <div className='flex-grow-1'>1 - 11 of 11 Software Engineer jobs</div>
                          <div className='d-flex align-items-center'>
                            <span className='flex-grow-1 white-space-pre'>Sort by:</span>
                            <Select options={recommended} placeholder="Recommended"/>
                          </div>
                        </div>
                      </div>
                      <JobBoxSection/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default SearchForJobsAndInternships;
