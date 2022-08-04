import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AsEmployee from './AsEmployee';
import AsEmployer from './AsEmployer';
import personImg from 'assets/images/person-fill.svg';

const components = {
  employee: AsEmployee,
  employer: AsEmployer,
};

const Register = () => {
  const history = useHistory();
  const { type } = useParams<{ type: string }>();
  const ToRender = components[type as keyof typeof components];
  return (
    <React.Fragment>
      {(!type || !ToRender) && (
        <React.Fragment>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-6 col-md-8 offset-lg-3 offset-md-2'>
                <div className='loginForm mt-5 mb-5'>
                  <button
                    type='button'
                    className='btn w-100 btn-gmail d-inline-flex'
                    onClick={() => {
                      history.push('register/employer');
                    }}
                  >
                    <img className='ml-2' src={personImg} height='20' alt='' />
                    <span className='flex-grow-1'>Register As Employer</span>
                  </button>
                  <button
                    type='button'
                    className='btn w-100 btn-linkedin d-inline-flex mt-2'
                    onClick={() => {
                      history.push('register/employee');
                    }}
                  >
                    <img className='ml-2' src={personImg} height='18' alt='' />
                    <span className='flex-grow-1'>Register As Employee</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      {type && <ToRender />}
    </React.Fragment>
  );
};

export default Register;
