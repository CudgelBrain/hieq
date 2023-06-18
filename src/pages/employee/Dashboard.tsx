import React from 'react'
import Tittle from 'features/employer/Tittle';
import { useAppQuery } from 'app/hooks';
import { history } from 'utils';
import Stats from '../../components/Employee/Stats'
import Opportunities from 'features/employee/dashboard/Opportunity'
import RangeSelector from 'components/RangeSelector';
import 'assets/styles/employee/style.css'
import search from 'assets/images/search.svg';
import { hieqService } from 'utils';
import Select from 'react-select';
import SearchBox from './SearchBox';

function EmployeeDashboard() {
  const [data, setData] = React.useState([]);
  const [searchType, setSearchType] = React.useState(1)
  const [searchText, setSearchText] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [activeStatus, setActiveStatus] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [activeCategory, setActiveCategory] = React.useState(
    useAppQuery().get('category') || 'job',
  );

  const getdata = async (text:any) => {
    try {

      let res = await hieqService.get(
        `/opportunity/search?q=${text}`,
      );
      console.log(res.data.items);
      setData(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (searchText === "") 
    {
      getdata(searchText);
    }
  }, [searchText]);

  // React.useEffect(() => {
  //   getdata();
  // }, [])


  const allJobs = [
    {value:"All jobs",label:"All jobs"},
    {value:"Applied",label:"Applied"},
    {value:"Awaiting",label:"Awaiting"},
    {value:"In-Progress",label:"In-Progress"},
    {value:"Selected",label:"Selected"},
    {value:"Withdrawn",label:"Withdrawn"},
    {value:"Rejected",label:"Rejected"}
  ]

  return (
    <div className='col-md-12 pt-4 pb-2' style={{
      backgroundColor: '#F5F5F5'
    }}>
      <div className="text-left d-flex mb-4">
        <div className="pg-title flex-grow-1">Dashboard</div>
        <div className="text-right">
          <span className="label">50% Complete Profile</span>
          <span className="progress-bar mt-1 bg-white"><span className="bg-green" style={{ width: "50%" }}></span></span>
        </div>
      </div>

      <div className='box-container mb-4 p-4 sidebar-container scrollbar'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='d-flex'>
              <button
                type='button'
                onClick={() => {
                  setCurrentPage(1);
                  setActiveCategory('job');
                  history.push('/employee/postopportunity');
                }}
                className={`employee-tabs-btn ${activeCategory === 'job' ? 'employee_active' : ''}`}
              >
                Jobs
              </button>
              <button
                type='button'
                onClick={() => {
                  setCurrentPage(1);
                  setActiveCategory('internship');
                }}
                className={`employee-tabs-btn ${activeCategory === 'internship' ? 'employee_active' : ''}`}
              >
                Internships
              </button>
          
            </div>
          </div>
        </div>
        <div className='box-container-inner p-0 pt-4'>
          <div className='form-row mb-4'>
            <div className='col-5'>
            <div className="input-group group-prepend-wrapper">
                            <div className="input-group-prepend"><span className="input-group-text">
                                <button type="submit" className="icon-btn"><img src={search} height="20"
                                    alt=""/></button>
                              </span></div>
                              <SearchBox />
                            {/* <input type="text" className="form-control pl-0" placeholder="Enter search here..." value={input} onChange={(e) => handleSearch()}/> */}
                          </div>
                        </div>
            <div className='col-3'>
              <Select options={allJobs} placeholder='All Jobs'/>
            </div>  
            <div className='col-4'>
              <RangeSelector setStartDate={setStartDate} setEndDate={setEndDate} />
            </div>
          </div>
          <Stats setActiveStatus={setActiveStatus} category={activeCategory} />
          <Opportunities
            category={activeCategory}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            activeStatus={activeStatus}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard