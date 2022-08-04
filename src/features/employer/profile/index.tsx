import React, { KeyboardEventHandler } from 'react';
import { matchSorter } from 'match-sorter';
import { debounce, forEach, map, orderBy, isEmpty } from 'lodash';
import { getYear } from 'date-fns';
import Select, { SingleValue, OnChangeValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Imported from project
import { cityList } from 'constant';
import { RootState } from 'app/store';
import SocialMedia from './SocialMedia';
import { useAppDispatch, useAppSelector, useAppQuery, useAppProfile } from 'app/hooks';
import Tittle from 'features/employer/Tittle';
import VerificationDocument from './VerificationDocument';
import {
  document,
  GetEmployerProfile,
  AddEmployerProfile,
  EmployerProfileForm,
  EmployerProfileSchema,
} from './profileSlice';
import { OptionType, selectStyle, createOption } from 'features/employer/common';

const roles: readonly OptionType[] = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Others', label: 'Others' },
];

const typeOfCompany: readonly OptionType[] = [
  { value: 'Public Company', label: 'Public Company' },
  { value: 'Educational', label: 'Educational' },
  { value: 'Self Employed', label: 'Self Employed' },
  { value: 'Agency', label: 'Agency' },
  { value: 'Non Profit', label: 'Non Profit' },
  { value: 'Self Owned', label: 'Self Owned' },
  { value: 'Privately Held', label: 'Privately Held' },
  { value: 'Partnership', label: 'Partnership' },
];

const companySize: readonly OptionType[] = [
  { value: 'Myself', label: 'Myself' },
  { value: '1-10', label: '1-10' },
  { value: '11-50', label: '11-50' },
  { value: '51-200', label: '51-200' },
  { value: '201-500', label: '201-500' },
  { value: '501-1000', label: '501-1000' },
  { value: '1001-5000', label: '1001-5000' },
  { value: '5001-10000', label: '5001-10000' },
  { value: '10001+', label: '10001+' },
];

const years: OptionType[] = [];
for (let year = 1950; year < getYear(new Date()); year++) {
  years.push(createOption(year.toString()));
}

const cities: readonly OptionType[] = orderBy(
  map(cityList, ({ city }) => createOption(city)),
  'label',
);

const Profile = () => {
  const dispatch = useAppDispatch();
  const {
    profile: { name, email, phone },
  } = useAppProfile();
  const query = useAppQuery().get('mode');
  const [mode, setMode] = React.useState<string | null>('view');
  const [showOthers, setShowOthers] = React.useState<boolean>(false);
  const [branchLocation, setBranchLocation] = React.useState<string>('');
  const [branchLocations, setBranchLocations] = React.useState<OptionType[]>([]);
  const { status, profile } = useAppSelector((state: RootState) => state.employerProfile);
  const defaultValues: EmployerProfileForm = React.useMemo(
    () => ({
      fullName: !isEmpty(profile) && !isEmpty(profile.fullName) ? profile.fullName : name,
      companyName: !isEmpty(profile) && !isEmpty(profile.companyName) ? profile.companyName : '',
      phone: !isEmpty(profile) && !isEmpty(profile.phone) ? profile.phone : phone,
      email: !isEmpty(profile) && !isEmpty(profile.email) ? profile.email : email,
      roleInHiring: !isEmpty(profile) && !isEmpty(profile.roleInHiring) ? profile.roleInHiring : '',
      yearOfIncorporation:
        !isEmpty(profile) && !isEmpty(profile.yearOfIncorporation)
          ? profile.yearOfIncorporation
          : '',
      description: !isEmpty(profile) && !isEmpty(profile.description) ? profile.description : '',
      headOffice: !isEmpty(profile) && !isEmpty(profile.headOffice) ? profile.headOffice : '',
      branchOffices:
        !isEmpty(profile) && !isEmpty(profile.branchOffices) ? profile.branchOffices : [''],
      numberOfEmployees:
        !isEmpty(profile) && !isEmpty(profile.numberOfEmployees) ? profile.numberOfEmployees : '',
      companyType: !isEmpty(profile) && !isEmpty(profile.companyType) ? profile.companyType : '',
      industryType: !isEmpty(profile) && !isEmpty(profile.industryType) ? profile.industryType : '',
      documents:
        !isEmpty(profile) && !isEmpty(profile.documents)
          ? profile.documents
          : [{ name: '', file: '', toBeValidated: true }],
      socials:
        !isEmpty(profile) && !isEmpty(profile.socials) ? profile.socials : [{ name: '', url: '' }],
    }),
    [email, name, phone, profile],
  );
  const {
    reset,
    watch,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployerProfileForm>({
    resolver: yupResolver(EmployerProfileSchema),
    defaultValues: React.useMemo(() => defaultValues, [defaultValues]),
  });

  React.useEffect(() => dispatch(GetEmployerProfile()), [dispatch]);

  React.useEffect(() => setMode(query ?? 'view'), [query]);

  React.useEffect(() => {
    if (!isEmpty(profile)) {
      reset(defaultValues);
      setBranchLocations(
        map(profile.branchOffices, (office: unknown) => createOption(office as string)),
      );
    }
  }, [defaultValues, profile, reset]);

  const loadCities = debounce((value: string, callback) => {
    callback(matchSorter(cities, value, { keys: ['label'] }));
  }, 500);

  const submitForm = (data: EmployerProfileForm) => {
    const formData = new FormData();
    forEach(data, (value, key) => {
      if (key === 'documents') {
        const documents: Record<string, string>[] = [];
        forEach(value as document[], ({ name, file }) => {
          if (typeof file !== 'string') {
            formData.append('documentFiles', file[0], name);
          } else {
            documents.push({ name, file });
          }
        });
        formData.append('documents', JSON.stringify(documents));
      } else if (['object', 'array'].includes(typeof value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string);
      }
    });
    dispatch(AddEmployerProfile(formData));
  };

  //console.log({ errors, defaultValues });

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className='col-md-12 lt-sec-pd pt-4 pb-2'>
        <Tittle title='Company Profile' />
        <div className='box-container mb-4'>
          <div className='box-container-inner'>
            <div className='row'>
              <div className='form-group col-sm-6'>
                <label className='label mb-1'>Fullname</label>
                <input
                  type='text'
                  disabled={mode === 'view'}
                  {...register('fullName')}
                  className='form-control'
                  placeholder='Enter fullname'
                />
                {errors.fullName && (
                  <div className='text-danger error mt-1'>{errors.fullName?.message}</div>
                )}
              </div>
              <div className='form-group col-sm-6'>
                <label className='label mb-1'>Company Name</label>
                <input
                  type='text'
                  disabled={mode === 'view'}
                  {...register('companyName')}
                  className='form-control'
                  placeholder='Enter company name'
                />
                {errors.companyName && (
                  <div className='text-danger error mt-1'>{errors.companyName?.message}</div>
                )}
              </div>
              <div className='form-group col-sm-6'>
                <label className='label mb-1'>Contact Number</label>
                <input
                  type='text'
                  disabled={mode === 'view'}
                  {...register('phone')}
                  className='form-control'
                  placeholder='Enter contact number'
                />
                {errors.phone && (
                  <div className='text-danger error mt-1'>{errors.phone?.message}</div>
                )}
              </div>
              <div className='form-group col-sm-6'>
                <label className='label mb-1'>Official Email Address</label>
                <input
                  type='text'
                  disabled={mode === 'view'}
                  {...register('email')}
                  className='form-control'
                  placeholder='Enter email address'
                />
                {errors.email && (
                  <div className='text-danger error mt-1'>{errors.email?.message}</div>
                )}
              </div>
              <div className='form-group col-sm-6'>
                <label className='label mb-1'>Role in the Hiring Process</label>
                <Controller
                  name='roleInHiring'
                  control={control}
                  render={({ field: { onChange, value, name } }) => {
                    const handleOnchange = (option: SingleValue<OptionType>) =>
                      onChange(option?.value);
                    return (
                      <Select
                        options={roles}
                        styles={selectStyle}
                        onChange={handleOnchange}
                        placeholder='Select role'
                        isDisabled={mode === 'view'}
                        components={{ IndicatorSeparator: () => null }}
                        value={roles.find((c) => c.value === value)}
                      />
                    );
                  }}
                />
                {errors.roleInHiring && (
                  <div className='text-danger error mt-1'>{errors.roleInHiring?.message}</div>
                )}
              </div>
              <div className='form-group col-sm-6'>
                <label className='label mb-1'>Year of Incorporation</label>
                <Controller
                  name='yearOfIncorporation'
                  control={control}
                  render={({ field: { onChange, value, name } }) => {
                    const handleOnchange = (option: SingleValue<OptionType>) =>
                      onChange(option?.value);
                    return (
                      <Select
                        styles={selectStyle}
                        options={years.reverse()}
                        onChange={handleOnchange}
                        placeholder='Select year'
                        isDisabled={mode === 'view'}
                        components={{ IndicatorSeparator: () => null }}
                        value={years.find((c) => c.value === value)}
                      />
                    );
                  }}
                />
                {errors.yearOfIncorporation && (
                  <div className='text-danger error mt-1'>
                    {errors.yearOfIncorporation?.message}
                  </div>
                )}
              </div>
              <div className='form-group col-sm-12'>
                <label className='label mb-1'>Short Descrpition</label>
                <textarea
                  className='form-control'
                  disabled={mode === 'view'}
                  {...register('description')}
                  placeholder='Enter company description'
                />
                {errors.description && (
                  <div className='text-danger error mt-1'>{errors.description?.message}</div>
                )}
                {!errors.description && (
                  <div className='text-right'>
                    <span className='note'>250 words limit</span>
                  </div>
                )}
              </div>
              <div className='form-group col-sm-12'>
                <label className='label mb-1'>Head Office Location</label>
                <input
                  type='text'
                  disabled={mode === 'view'}
                  {...register('headOffice')}
                  className='form-control'
                  placeholder='Enter head office location'
                />
                {errors.headOffice && (
                  <div className='text-danger error mt-1'>{errors.headOffice?.message}</div>
                )}
              </div>
              <div className='form-group col-sm-6'>
                <label className='label mb-1'>Office Location(s)</label>
                <Controller
                  name='branchOffices'
                  control={control}
                  render={({ field: { onChange, name } }) => {
                    const handleChange = (value: OnChangeValue<OptionType, true>) => {
                      setBranchLocations([...value]);
                      onChange(value.map((v) => v.value));
                    };
                    const handleInputChange = (inputValue: string) => setBranchLocation(inputValue);
                    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
                      if (!branchLocation) return;
                      switch (event.key) {
                        case 'Tab':
                        case 'Enter':
                          setBranchLocation('');
                          onChange([...branchLocations.map((v) => v.value), branchLocation]);
                          setBranchLocations([...branchLocations, createOption(branchLocation)]);
                          event.preventDefault();
                      }
                    };
                    return (
                      <AsyncSelect
                        isMulti
                        isClearable
                        cacheOptions
                        styles={selectStyle}
                        value={branchLocations}
                        onChange={handleChange}
                        loadOptions={loadCities}
                        onKeyDown={handleKeyDown}
                        inputValue={branchLocation}
                        isDisabled={mode === 'view'}
                        onInputChange={handleInputChange}
                        components={{ DropdownIndicator: null }}
                        placeholder='Select location and press enter or tab'
                      />
                    );
                  }}
                />
                {errors.branchOffices && (
                  <div className='text-danger error mt-1'>{errors.branchOffices[0]?.message}</div>
                )}
              </div>
              <div className='form-group col-sm-6'>
                <label className='label mb-1'>Number of Employees</label>
                <Controller
                  name='numberOfEmployees'
                  control={control}
                  render={({ field: { onChange, value, name } }) => {
                    const handleOnchange = (option: SingleValue<OptionType>) =>
                      onChange(option?.value);
                    return (
                      <Select
                        styles={selectStyle}
                        options={companySize}
                        onChange={handleOnchange}
                        isDisabled={mode === 'view'}
                        placeholder='Select number of employees'
                        components={{ IndicatorSeparator: () => null }}
                        value={companySize.find((c) => c.value === value)}
                      />
                    );
                  }}
                />
                {errors.numberOfEmployees && (
                  <div className='text-danger error mt-1'>{errors.numberOfEmployees?.message}</div>
                )}
              </div>
              <div className='form-group col-sm-6'>
                <label className='label mb-1'>Type of Company</label>
                <Controller
                  name='companyType'
                  control={control}
                  render={({ field: { onChange, value, name } }) => {
                    const handleOnchange = (option: SingleValue<OptionType>) => {
                      const currentValue = option?.value;
                      onChange(currentValue);
                      setShowOthers(currentValue === 'Others' ? true : false);
                    };
                    return (
                      <Select
                        styles={selectStyle}
                        options={typeOfCompany}
                        onChange={handleOnchange}
                        isDisabled={mode === 'view'}
                        placeholder='Select type of company'
                        components={{ IndicatorSeparator: () => null }}
                        value={typeOfCompany.find((c) => c.value === value)}
                      />
                    );
                  }}
                />
                {errors.companyType && (
                  <div className='text-danger error mt-1'>{errors.companyType?.message}</div>
                )}
                {showOthers && (
                  <>
                    <div className='mt-2'>
                      <input type='text' className='form-control' placeholder='Others Option' />
                    </div>
                    {errors.otherName && (
                      <div className='text-danger error mt-1'>{errors.otherName?.message}</div>
                    )}
                  </>
                )}
              </div>
              <div className='form-group col-sm-6'>
                <label className='label mb-1'>Industry</label>
                <Controller
                  name='industryType'
                  control={control}
                  render={({ field: { onChange, value, name } }) => {
                    const handleOnchange = (option: SingleValue<OptionType>) =>
                      onChange(option?.value);
                    return (
                      <Select
                        options={roles}
                        styles={selectStyle}
                        onChange={handleOnchange}
                        isDisabled={mode === 'view'}
                        placeholder='Select industry'
                        components={{ IndicatorSeparator: () => null }}
                        value={roles.find((c) => c.value === value)}
                      />
                    );
                  }}
                />
                {errors.industryType && (
                  <div className='text-danger error mt-1'>{errors.industryType?.message}</div>
                )}
              </div>
              <div className='form-group col-sm-12'>
                <div className='form-subheading mb-4 mt-3 pt-3 bt-1'>Document Verification</div>
                <div className='form-group form-row mb-2'>
                  <div className='col-3'>
                    <label className='label mb-1'>Type</label>
                  </div>
                  <div className='col-4'>
                    <label className='label mb-1'>
                      Upload File <span className='note'>(.jpg and .pdf format only)</span>
                    </label>
                  </div>
                  <div className='col-1'>
                    <label className='label mb-1'>&nbsp;</label>
                  </div>
                </div>
                <VerificationDocument {...{ control, register, errors, setValue, mode, watch }} />
              </div>
              <div className='form-group col-sm-12'>
                <div className='form-subheading mb-4 mt-3 pt-3 bt-1'>Social Links</div>
                <div className='form-group form-row mb-2'>
                  <div className='col-2'>
                    <label className='label mb-1'>Social Media Type</label>
                  </div>
                  <div className='col-5'>
                    <label className='label mb-1'>Social Links(https)</label>
                  </div>
                </div>
                <SocialMedia {...{ control, register, errors, mode }} />
              </div>
              <div className='col-md-12 mt-3 pt-3 bt-1'>
                <button
                  type='submit'
                  className='btn btn-yl btn-lg float-right'
                  disabled={mode === 'view'}
                >
                  {status === 'loading' && <span className='spinner-border' role='status'></span>}
                  {status !== 'loading' && <span>Save</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Profile;
