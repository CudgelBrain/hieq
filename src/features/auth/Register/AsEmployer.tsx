import React from 'react';
import { map, debounce } from 'lodash';
import { Link } from 'react-router-dom';
import { SingleValue } from 'react-select';
import { matchSorter } from 'match-sorter';
import AsyncSelect from 'react-select/async';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Imported from project
import { RootState } from 'app/store';
import phoneImg from 'assets/images/phone.svg';
import emailImg from 'assets/images/email-ico.svg';
import passwordImg from 'assets/images/password.svg';
import buildingImg from 'assets/images/building.svg';
import personImg from 'assets/images/person-fill.svg';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { listColleges } from 'features/admin/college/itemAPI';
import { listCompanies } from 'features/admin/company/itemAPI';
import { OptionType, createOption } from 'features/employer/common';
import { RegisterationForm, RegistrationSchema, Register, EmployerEnum } from '../authSlice';

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

let colleges: readonly OptionType[] = [];
const getColleges = async () => {
  const { data } = await listColleges();
  colleges = map(data.items, ({ name }) => createOption(name));
};

let companies: readonly OptionType[] = [];
const getCompanies = async () => {
  const { data } = await listCompanies();
  companies = map(data.items, ({ name }) => createOption(name));
};

if (typeof window !== 'undefined' && window.location.pathname.includes('/register/employer')) {
  getColleges();
  getCompanies();
}

const defaultValues: RegisterationForm = {
  employerType: EmployerEnum.Company,
}

const AsEmployer = () => {
  const {
    watch,
    control,
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterationForm>({
    resolver: yupResolver(RegistrationSchema),
    defaultValues: React.useMemo(() => defaultValues, []),
  });
  const dispatch = useAppDispatch();
  const employerType = watch('employerType');
  const [showOthers, setShowOthers] = React.useState<boolean>(false);
  const { status, message } = useAppSelector((state: RootState) => state.auth);

  const loadCompanies = debounce((value: string, callback) => {
    const options = matchSorter(companies, value, { keys: ['label'] });
    callback([...options, { value: 'others', label: 'Others' }]);
  }, 500);

  const loadColleges = debounce((value: string, callback) => {
    const options = matchSorter(colleges, value, { keys: ['label'] });
    callback([...options, { value: 'others', label: 'Others' }]);
  }, 500);

  const handleOnSubmit = (formData: RegisterationForm) => dispatch(Register(formData));

  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 col-md-8 offset-lg-3 offset-md-2'>
            <div className='loginForm mt-5 mb-5'>
              <div className='heading mb-4'>Sign Up and Start Your Journey</div>
              <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className='form-group'>
                  <label className='label mb-0'>
                    Full Name<span className='required'>*</span>
                  </label>
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <img src={personImg} height='18' alt='' />
                      </span>
                    </div>
                    <input
                      type='text'
                      {...register('name')}
                      className='form-control'
                      placeholder='Enter Full Name'
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
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <img src={emailImg} height='18' alt='' />
                      </span>
                    </div>
                    <input
                      type='email'
                      {...register('email')}
                      className='form-control'
                      placeholder='Enter Email Address'
                    />
                  </div>
                  {errors.email && (
                    <div className='text-danger error mt-1'>{errors.email?.message}</div>
                  )}
                </div>
                <div className='form-group'>
                  <label className='label mb-0'>
                    Mobile Number<span className='required'>*</span>
                  </label>
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <img src={phoneImg} height='18' alt='' />
                      </span>
                    </div>
                    <input
                      type='tel'
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      {...register('phone')}
                      className='form-control'
                      placeholder='Enter Mobile Number'
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
                      placeholder='Enter Password'
                    />
                  </div>
                  {errors.password && (
                    <div className='text-danger error mt-1'>{errors.password?.message}</div>
                  )}
                </div>
                <div className='form-group custom-inline'>
                  <label className='label mb-0'>
                    Tell us who you are?<span className='required'>*</span>
                  </label>
                  <div className='custom-control custom-radio'>
                    <input
                      type='radio'
                      id='company'
                      value='Company'                      
                      {...register('employerType')}
                      className='custom-control-input'
                    />
                    <label className='custom-control-label' htmlFor='company'>
                      Company
                    </label>
                  </div>
                  <div className='custom-control custom-radio'>
                    <input
                      type='radio'
                      id='eventOrganisers'
                      value='Event Organizer'
                      {...register('employerType')}
                      className='custom-control-input'
                    />
                    <label className='custom-control-label' htmlFor='eventOrganisers'>
                      Event Organisers
                    </label>
                  </div>
                  {errors.employerType && (
                    <div className='text-danger error mt-1'>{errors.employerType?.message}</div>
                  )}
                </div>
                {employerType && (
                  <div className='form-group'>
                    <label className='label mb-0'>
                      Choose Company<span className='required'>*</span>
                    </label>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>
                          <img src={buildingImg} height='18' alt='' />
                        </span>
                      </div>
                      <Controller
                        name='employerName'
                        control={control}
                        render={({ field: { onChange, value, name, ref } }) => {
                          const handleOnchange = (option: SingleValue<OptionType>) => {
                            const currentValue = option?.value;
                            onChange(currentValue);
                            setShowOthers(currentValue === 'others');
                            if (currentValue !== 'others') unregister('otherName');
                          };
                          return (
                            <AsyncSelect
                              isClearable
                              cacheOptions
                              styles={customStyles}
                              onChange={handleOnchange}
                              placeholder={`Select ${employerType}`}
                              components={{ IndicatorSeparator: () => null }}
                              loadOptions={
                                employerType === 'Company' ? loadCompanies : loadColleges
                              }
                            />
                          );
                        }}
                      />
                    </div>
                    {errors.employerName && (
                      <div className='text-danger error mt-1'>{errors.employerName?.message}</div>
                    )}
                  </div>
                )}
                {showOthers && (
                  <div className='form-group'>
                    <input
                      type='text'
                      {...register('otherName')}
                      className='form-control'
                      placeholder='Others'
                    />
                    {errors.otherName && (
                      <div className='text-danger error mt-1'>{errors.otherName?.message}</div>
                    )}
                  </div>
                )}
                <input type='hidden' {...register('userType')} value='Employer' />
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

export default AsEmployer;
