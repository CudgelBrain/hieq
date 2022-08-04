import React from 'react';
import { Link } from 'react-router-dom';

const VerifyOtp = () => {
  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 col-md-8 offset-lg-3 offset-md-2'>
            <div className='loginForm mt-5 mb-5'>
              <form>
                <div className='heading mb-2'>
                  Please enter the one time password to verify your account
                </div>
                <p className='text-center'>A code has been sent to *******9897</p>
                <div className='form-group'>
                  <div id='otp' className='inputs d-flex flex-row justify-content-center mt-2'>
                    <input
                      className='m-2 text-center form-control rounded'
                      type='text'
                      id='first'
                    />
                    <input
                      className='m-2 text-center form-control rounded'
                      type='text'
                      id='second'
                    />
                    <input
                      className='m-2 text-center form-control rounded'
                      type='text'
                      id='third'
                    />
                    <input
                      className='m-2 text-center form-control rounded'
                      type='text'
                      id='fourth'
                    />
                    <input
                      className='m-2 text-center form-control rounded'
                      type='text'
                      id='fifth'
                    />
                    <input
                      className='m-2 text-center form-control rounded'
                      type='text'
                      id='sixth'
                    />
                  </div>
                </div>
                <button className='btn btn-blue w-100 mt-2'>Validate</button>
                <div className='mt-3 text-center'>
                  Didn&apost get the code{' '}
                  <Link to='#' className='mlink'>
                    Resend
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VerifyOtp;
