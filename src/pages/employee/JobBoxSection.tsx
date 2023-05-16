import React from 'react';
import hclBrandImg from 'assets/images/hcl.jpg';
import rupee from 'assets/images/rupee.svg';
import locationImg from 'assets/images/location.svg';
import file from 'assets/images/file.svg';
import { useHistory } from 'react-router-dom';
import star from 'assets/images/star.svg';

const JobBoxSection = () => {
  const navigate = useHistory();
  return (
    <>
      {/* <div className="row align-items-center mb-4" > */}
      <div className='col-md-12 mt-4'>
        <div className='jb-box-section'>
          <div className='jb-box-inner text-center flex-grow-1 first'>
            <figure className='jb-logo'>
              <img src={hclBrandImg} width='100' height='100' alt='' />
            </figure>
            <h2 className='heading'>Software Engineer</h2>
            <h3 className='heading-sm'>HCL Technologies</h3>
          </div>
          <div className='jb-box-inner pl-4 second'>
            <div className='tag tag-fl bg-blue text-uppercase'>strategic solver</div>
            <div className='tag tag-fl bg-blue text-uppercase'>very high</div>
            <div className='tag bg-grey'>Java</div>
            <div className='tag bg-grey'>HTML 5</div>
            <div className='tag bg-grey'>React</div>
            <div className='tag bg-grey'>Oracle</div>
          </div>
          <div className='jb-box-inner pl-4 flex-grow-1 third'>
            <div className='list d-flex align-items-center'>
              <span className='ico mr-2'>
                <img src={locationImg} width='20' height='20' alt='' />
              </span>
              Gurgaon, Haryana
            </div>
            <div className='list d-flex align-items-center'>
              <span className='ico mr-2'>
                <img src={file} width='20' height='20' alt='' />
              </span>
              7-12 Yrs
            </div>
            <div className='list d-flex align-items-center'>
              <span className='ico mr-2'>
                <img src={rupee} width='20' height='20' alt='' />
              </span>
              Not available
            </div>
            <div className='list'>
              <strong>Education : </strong> Bachelors, Masters
            </div>
            <div className='list'>
              <strong>Specialization : </strong> Computer Science, IT
            </div>
          </div>
          <div className='jb-box-inner d-flex flex-column fourth'>  
            <span className='note text-uppercase'>5 Days ago</span>
            <button type='submit' className='btn btn-link btn-md'>
              <img src={star} width='24' alt='' />
            </button>
          </div>
          {/* </div> */}
        </div>
            <div className='d-flex justify-content-end mt-4'>
              <button
                type='submit'
                className='btn btn-wt btn-md img-reflect'
                onClick={() => navigate.push('/employee/jobDescription')}
              >
                EXPLORE
              </button>
              <button
                className='btn btn-yl btn-md ml-2'
                onClick={() => navigate.push('/employee/quickApply')}
              >
                APPLY
              </button>
            </div>
      </div>
    </>
  );
};

export default JobBoxSection;
