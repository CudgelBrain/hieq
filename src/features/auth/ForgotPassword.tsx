import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from 'app/hooks';
import emailImg from 'assets/images/email-ico.svg';
import { ForgotPasswordForm, ForgotPasswordSchema } from './authSlice';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(ForgotPasswordSchema),
  });
  const dispatch = useAppDispatch();

  const submitForm = (formData: ForgotPasswordForm) => null;

  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 col-md-8 offset-lg-3 offset-md-2'>
            <div className='loginForm mt-5 mb-5'>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className='heading mb-4'>Recover your password?</div>
                <p>
                  Please enter your email to reset your password. You’ll receive an email with
                  instructions. If you are experiencing problems with remembering your email, please
                  contact us at{' '}
                  <Link to='#' className='mlink'>
                    Hieq Support
                  </Link>
                  .
                </p>
                <div className='form-group'>
                  <label className='label mb-0'>Email Address</label>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      {' '}
                      <span className='input-group-text'>
                        <img src={emailImg} height='18' alt='' />
                      </span>{' '}
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
                <button type='submit' className='btn btn-blue w-100 mt-2'>
                  Recover
                </button>
              </form>
              <div className='mt-3 text-center'>
                <Link to='/login/password' className='mlink'>
                  Back to login
                </Link>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
