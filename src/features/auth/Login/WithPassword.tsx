import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from 'app/store';
import ViaSocial from '../ViaSocial';
import emailImg from 'assets/images/email-ico.svg';
import passwordImg from 'assets/images/password.svg';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { LoginForm, LogInSchema, Login } from '../authSlice';

const WithPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(LogInSchema),
  });
  const dispatch = useAppDispatch();
  const { status, message } = useAppSelector((state: RootState) => state.auth);

  const submitForm = (formData: LoginForm) => dispatch(Login(formData));

  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 col-md-8 offset-lg-3 offset-md-2'>
            <div className='loginForm mt-5 mb-5'>
              {status === 'failed' && <div className='alert alert-danger'>{message}</div>}
              <form onSubmit={handleSubmit(submitForm)}>
                <div className='heading mb-4'>Log in to hieq</div>
                <div className='form-group'>
                  <label className='label mb-0'>Email Address</label>
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <img src={emailImg} height='18' alt='' />
                      </span>
                    </div>
                    <input
                      type='text'
                      {...register('email')}
                      className='form-control'
                      placeholder='Enter email address'
                    />
                  </div>
                  {errors.email && (
                    <div className='text-danger error mt-1'>{errors.email?.message}</div>
                  )}
                </div>
                <div className='form-group'>
                  <label className='label d-flex mb-0'>
                    <span className='flex-grow-1'>Password</span>
                    <span>
                      <Link to='/forgotPassword' className='mlink fw-500'>
                        Forgot Password?
                      </Link>
                    </span>
                  </label>
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <img src={passwordImg} height='18' alt='' />
                      </span>
                    </div>
                    <input
                      type='password'
                      {...register('password')}
                      className='form-control'
                      placeholder='Enter password'
                    />
                  </div>
                  {errors.password && (
                    <div className='text-danger error mt-1'>{errors.password?.message}</div>
                  )}
                </div>
                <input type='hidden' {...register('type')} value='with-password' />
                <button type='submit' className='btn btn-blue w-100 mt-2'>
                  {status === 'loading' && <span className='spinner-border' role='status'></span>}
                  {status !== 'loading' && <span>Log In</span>}
                </button>
                <div className='mt-3 text-center mb-4 pb-3'>
                  <span className='fw-500'>or</span>
                  <div>
                    <Link to='/login/otp' className='mlink'>
                      Login with OTP
                    </Link>
                  </div>
                </div>
                <ViaSocial
                  googleButtonText='Log In with Gmail'
                  linkedInButtonText='Log In with LinkedIn'
                />
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

export default WithPassword;
