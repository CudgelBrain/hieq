import React from 'react';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from 'react-bootstrap';
import { RootState } from 'app/store';
import phoneImg from 'assets/images/phone.svg';
import passwordImg from 'assets/images/password.svg';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { LoginOTPForm, LogInOTPSchema, Login, RequestOTP } from '../authSlice';

const WithOtp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginOTPForm>({
    resolver: yupResolver(LogInOTPSchema),
  });
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const { status, message } = useAppSelector((state: RootState) => state.auth);

  const requestOTP = () => {
    const pattern = /^([0]|\+91)?\d{10}/;
    if (pattern.test(phoneNumber)) dispatch(RequestOTP(phoneNumber));
    else setErrorMessage('Please enter valid phone number');
  };

  const submitForm = (formData: LoginOTPForm) => dispatch(Login(formData));

  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 col-md-8 offset-lg-3 offset-md-2'>
            <div className='loginForm mt-5 mb-5'>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className='heading mb-4'>Log in to hieq</div>
                {!isEmpty(message) && status === 'success' && (
                  <Alert color='danger'>{message}</Alert>
                )}
                <div className='form-group'>
                  <label className='label mb-0'>Mobile Number</label>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <img src={phoneImg} height='18' alt='' />
                      </span>
                    </div>
                    <input
                      type='text'
                      {...register('phone')}
                      className='form-control'
                      placeholder='Enter phone number'
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  {(errors.phone || errorMessage) && (
                    <div className='text-danger error mt-1'>
                      {errors.phone?.message || errorMessage}
                    </div>
                  )}
                </div>
                <div className='form-group'>
                  <label className='label d-flex mb-0'>
                    <span className='flex-grow-1'>OTP</span>
                  </label>
                  <div className='input-group mb-3'>
                    <Link to='#' className='mlink'>
                      Resend
                    </Link>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <img src={passwordImg} height='18' alt='' />
                      </span>
                    </div>
                    <input
                      type='text'
                      {...register('otp')}
                      className='form-control'
                      placeholder='Enter OTP'
                    />
                  </div>
                  <button type='button' className='mlink' onClick={requestOTP}>
                    Request OTP
                  </button>
                  {errors.otp && (
                    <div className='text-danger error mt-1'>{errors.otp?.message}</div>
                  )}
                </div>
                <input type='hidden' {...register('type')} value='with-otp' />
                <button type='submit' className='btn btn-blue w-100 mt-2'>
                  {status === 'loading' && <span className='spinner-border' role='status'></span>}
                  {status !== 'loading' && <span>Log In</span>}
                </button>
                <div className='mt-3 text-center mb-4 pb-3'>
                  <span className='fw-500'>or</span>
                  <div>
                    <Link to='/login/password' className='mlink'>
                      Login with Password
                    </Link>
                  </div>
                </div>
              </form>
              <div className='mt-4 pt-3'>
                {' '}
                By continue to login, you accept our company’s <br />
                <Link to='/terms-and-conditions' className='mlink'>
                  Terms &amp; conditions
                </Link>{' '}
                and{' '}
                <Link to='/privacy-policies' className='mlink'>
                  Privacy policies
                </Link>
                .{' '}
              </div>
              <div className='mt-5'>
                Don&apost have an account?{' '}
                <Link to='/register' className='mlink'>
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WithOtp;
