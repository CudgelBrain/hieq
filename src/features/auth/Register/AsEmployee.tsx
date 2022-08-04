import React from 'react';
import Select, { SingleValue } from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from 'app/store';
import phoneImg from 'assets/images/phone.svg';
import emailImg from 'assets/images/email-ico.svg';
import passwordImg from 'assets/images/password.svg';
import personImg from 'assets/images/person-fill.svg';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { OptionType, Register, RegisterationForm, RegistrationSchema } from '../authSlice';

const gender: readonly OptionType[] = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Others', label: 'Others' },
];

const customStyles = {
  container: (provided: any) => ({
    ...provided,
    width: '88%',
  }),

  control: (provided: any) => ({
    ...provided,
    borderRadius: '0px 4px 4px 0px',
    cursor: 'pointer',
  }),

  menu: (provided: any) => ({
    ...provided,
  }),

  option: () => ({
    cursor: 'pointer',
    padding: '15px',
    ':hover': {
      background: '#75BEBF',
    },
  }),

  singleValue: (provided: any, state: { isDisabled: any }) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  },
};

const AsEmployee = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterationForm>({
    resolver: yupResolver(RegistrationSchema),
  });
  const dispatch = useAppDispatch();
  const { status, message } = useAppSelector((state: RootState) => state.auth);
  const submitForm = (formData: RegisterationForm) => dispatch(Register(formData));

  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 col-md-8 offset-lg-3 offset-md-2'>
            <div className='loginForm mt-5 mb-5'>
              <div className='heading mb-4'>Sign Up and Start Your Journey</div>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className='form-group'>
                  <label className='label mb-0'>
                    Fullname<span className='required'>*</span>
                  </label>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <img src={personImg} height='18' alt='' />
                      </span>
                    </div>
                    <input
                      type='text'
                      {...register('name')}
                      className='form-control'
                      placeholder='Enter Fullname'
                    />
                  </div>
                  {errors.name && (
                    <div className='text-danger error mt-1'>{errors.name?.message}</div>
                  )}
                </div>
                <div className='form-group'>
                  <label className='label mb-0'>
                    Email Address<span className='required'>*</span>
                  </label>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <img src={emailImg} height='18' alt='' />
                      </span>
                    </div>
                    <input
                      type='email'
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
                  <label className='label mb-0'>
                    Contact Number<span className='required'>*</span>
                  </label>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <img src={phoneImg} height='18' alt='' />
                      </span>
                    </div>
                    <input
                      type='tel'
                      {...register('phone')}
                      className='form-control'
                      placeholder='Enter contact number'
                    />
                  </div>
                  {errors.phone && (
                    <div className='text-danger error mt-1'>{errors.phone?.message}</div>
                  )}
                </div>
                <div className='form-group'>
                  <label className='label mb-0'>
                    Password<span className='required'>*</span>
                  </label>
                  <div className='input-group mb-3'>
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
                <div className='form-group'>
                  <label className='label mb-0'>
                    Choose Gender<span className='required'>*</span>
                  </label>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <img src={personImg} height='18' alt='' />
                      </span>
                    </div>
                    <Controller
                      name='gender'
                      control={control}
                      render={({ field: { onChange, value, name } }) => {
                        const handleOnchange = (option: SingleValue<OptionType>) =>
                          onChange(option?.value);
                        return (
                          <Select
                            name={name}
                            options={gender}
                            styles={customStyles}
                            onChange={handleOnchange}
                            placeholder='Select Gender'
                            components={{ IndicatorSeparator: () => null }}
                            value={gender.find((c) => c.value === value)}
                          />
                        );
                      }}
                    />
                  </div>
                  {errors.gender && (
                    <div className='text-danger error mt-1'>{errors.gender?.message}</div>
                  )}
                </div>
                <input type='hidden' {...register('userType')} value='Employee' />
                <button type='submit' className='btn w-100 btn-blue mt-2'>
                  {status === 'loading' && <span className='spinner-border' role='status'></span>}
                  {status !== 'loading' && <span>Register Now</span>}
                </button>
              </form>
              <div className='mt-4'>
                Already have an account?{' '}
                <Link to='/login/password' className='mlink'>
                  Log in
                </Link>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AsEmployee;
