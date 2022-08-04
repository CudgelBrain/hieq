import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import ViaSocial from './ViaSocial';
import emailImg from 'assets/images/email-ico.svg';

const JoinHieq = () => {
  const history = useHistory();

  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 col-md-8 offset-lg-3 offset-md-2'>
            <div className='loginForm mt-5 mb-5'>
              <div className='heading mb-2'>Join hieq</div>
              <div className='text-center mt-3 mb-4'>
                <div className='font18 fw-500'>Hire the best talent</div>
                <div>Register and post your internship for free now!</div>
              </div>
              <button
                className='btn w-100 btn-blue d-inline-flex'
                onClick={() => {
                  history.push('/register');
                }}
              >
                <img className='ml-2' src={emailImg} height='20' alt='' />
                <span className='flex-grow-1'>Continue with Email</span>
              </button>
              <ViaSocial
                googleButtonText='Continue with Gmail'
                linkedInButtonText='Continue with LinkedIn'
              />
              <div className='custom-control custom-checkbox mt-4 ml-1'>
                <input
                  type='checkbox'
                  className='custom-control-input'
                  id='customCheck'
                  name='example1'
                />
                <label className='custom-control-label' htmlFor='customCheck'>
                  I agree to the{' '}
                  <Link to='#' className='mlink'>
                    Terms &amp; conditions
                  </Link>{' '}
                  and
                  <Link to='#' className='mlink'>
                    Privacy policies
                  </Link>
                  .
                </label>
              </div>
              <div className='mt-5'>
                Already have an account?{' '}
                <Link to='/login/password' className='mlink'>
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default JoinHieq;
